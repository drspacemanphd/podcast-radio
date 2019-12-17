// CloudWatch Resources
resource "aws_cloudwatch_log_group" "api_lambda_log_group" {
    name = "/aws/lambda/${var.function_name}"
    retention_in_days = 7
    tags = var.tags
}

resource "aws_iam_role" "api_lambda_iam_role" {
    name = "${var.function_name}_iam_role"
    assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF
    tags = var.tags
}

resource "aws_iam_policy" "api_lambda_cloudwatch_policy" {
    name = "${var.function_name}_cloudwatch_policy"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "${aws_cloudwatch_log_group.api_lambda_log_group.arn}",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "api_lambda_cloudwatch_policy_attachment" {
    role = "${aws_iam_role.api_lambda_iam_role.name}"
    policy_arn = "${aws_iam_policy.api_lambda_cloudwatch_policy.arn}"
}

resource "aws_iam_policy" "dynamodb_policy" {
    name = "${var.function_name}_dynamodb_policy"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
          "dynamodb:*"
      ],
      "Resource": [
        "${var.podcast_table_arn}",
        "${var.episode_table_arn}",
        "${var.podcast_table_arn}/index/*",
        "${var.episode_table_arn}/index/*"
      ],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "dynamodb_policy_attachment" {
    role = "${aws_iam_role.api_lambda_iam_role.name}"
    policy_arn = "${aws_iam_policy.dynamodb_policy.arn}"
}

resource "aws_lambda_function" "api_lambda" {
    filename      = "${path.module}/index.zip"
    function_name = "${var.function_name}"
    role          = "${aws_iam_role.api_lambda_iam_role.arn}"
    handler       = "index.handler"
    runtime       = "nodejs8.10"
    tags          = var.tags
}





resource "aws_api_gateway_rest_api" "api_gateway" {
    name = var.api_name
    tags = var.tags
}

resource "aws_api_gateway_resource" "api_gateway_proxy_resource" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    parent_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    path_part = "{proxy+}"
}

resource "aws_api_gateway_method" "api_gateway_proxy_method" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    resource_id = aws_api_gateway_resource.api_gateway_proxy_resource.id
    http_method = "ANY"
    authorization = "AWS_IAM"
}

resource "aws_api_gateway_integration" "api_gateway_proxy_method_integration" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    resource_id = aws_api_gateway_method.api_gateway_proxy_method.resource_id
    http_method = aws_api_gateway_method.api_gateway_proxy_method.http_method

    type = "AWS_PROXY"
    integration_http_method = "POST"
    uri = aws_lambda_function.api_lambda.invoke_arn
}

resource "aws_api_gateway_method" "api_gateway_root_method" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    resource_id = aws_api_gateway_rest_api.api_gateway.root_resource_id
    http_method = "ANY"
    authorization = "AWS_IAM"
}

resource "aws_api_gateway_integration" "api_gateway_root_method_integration" {
    rest_api_id = aws_api_gateway_rest_api.api_gateway.id
    resource_id = aws_api_gateway_method.api_gateway_root_method.resource_id
    http_method = aws_api_gateway_method.api_gateway_root_method.http_method

    type = "AWS_PROXY"
    integration_http_method = "POST"
    uri = aws_lambda_function.api_lambda.invoke_arn
}

resource "aws_lambda_permission" "gateway_permission" {
    statement_id  = "AllowAPIGatewayInvoke"
    action = "lambda:InvokeFunction"
    function_name = "${aws_lambda_function.api_lambda.function_name}"
    principal = "apigateway.amazonaws.com"
    source_arn = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*"
}

resource "null_resource" "deploy" {
    depends_on = [
        aws_api_gateway_integration.api_gateway_proxy_method_integration,
        aws_api_gateway_integration.api_gateway_root_method_integration
    ]

    triggers = {
        hash = "${md5(file("${path.module}/main.tf"))}"
    }

    provisioner "local-exec" {
        command = "aws apigateway create-deployment --region us-east-1 --rest-api-id ${aws_api_gateway_rest_api.api_gateway.id} --stage-name ${var.stage_name} --description with-iam"
    }
}