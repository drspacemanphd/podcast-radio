// Cloudwatch Logs
resource "aws_cloudwatch_log_group" "scraper_log_group" {
    name = "/aws/lambda/${var.function_name}"
    retention_in_days = 7
    tags = var.tags
}

// IAM Roles
resource "aws_iam_role" "scraper_iam_role" {
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

resource "aws_iam_policy" "scraper_cloudwatch_policy" {
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
      "Resource": "${aws_cloudwatch_log_group.scraper_log_group.arn}",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "scraper_cloudwatch_policy_attachment" {
    role = "${aws_iam_role.scraper_iam_role.name}"
    policy_arn = "${aws_iam_policy.scraper_cloudwatch_policy.arn}"
}

resource "aws_iam_policy" "scraper_dynamodb_policy" {
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

resource "aws_iam_role_policy_attachment" "scraper_dynamodb_policy_attachment" {
    role = "${aws_iam_role.scraper_iam_role.name}"
    policy_arn = "${aws_iam_policy.scraper_dynamodb_policy.arn}"
}

resource "aws_iam_policy" "s3_policy" {
    name = "${var.function_name}_s3_policy"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
          "s3:*"
      ],
      "Resource": "${var.s3_arn}/*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "s3_policy_attachment" {
    role = "${aws_iam_role.scraper_iam_role.name}"
    policy_arn = "${aws_iam_policy.s3_policy.arn}"
}

resource "aws_lambda_function" "scraper" {
    filename      = "${path.module}/index.zip"
    function_name = "${var.function_name}"
    role          = "${aws_iam_role.scraper_iam_role.arn}"
    handler       = "index.handler"
    runtime       = "nodejs12.x"
    timeout       = 180
    memory_size   = 512
    tags          = var.tags
}