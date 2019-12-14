// CloudWatch Resources
resource "aws_cloudwatch_log_group" "crooked_media_scraper_log_group" {
    name = "/aws/lambda/${var.function_name}"
    retention_in_days = 7
    tags = var.tags
}

resource "aws_cloudwatch_event_rule" "crooked_media_scheduler" {
    name = "${var.function_name}-poller"
    schedule_expression = "cron(*/5 * * * ? *)"
}

resource "aws_cloudwatch_event_target" "crooked_media_scheduler_target" {
  rule = aws_cloudwatch_event_rule.crooked_media_scheduler.name
  arn = aws_lambda_function.crooked_media_scraper.arn
}

resource "aws_lambda_permission" "crooked_media_scheduler_permission" {
    statement_id = "AllowExecutionFromCloudWatch"
    action = "lambda:InvokeFunction"
    function_name = "${aws_lambda_function.crooked_media_scraper.function_name}"
    principal = "events.amazonaws.com"
    source_arn = "${aws_cloudwatch_event_rule.crooked_media_scheduler.arn}"
}

// IAM Roles
resource "aws_iam_role" "crooked_media_scraper_iam_role" {
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

resource "aws_iam_policy" "crooked_media_scraper_cloudwatch_policy" {
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
      "Resource": "${aws_cloudwatch_log_group.crooked_media_scraper_log_group.arn}",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "crooked_media_scraper_cloudwatch_policy_attachment" {
    role = "${aws_iam_role.crooked_media_scraper_iam_role.name}"
    policy_arn = "${aws_iam_policy.crooked_media_scraper_cloudwatch_policy.arn}"
}

resource "aws_iam_policy" "crooked_media_scraper_dynamodb_podcast_policy" {
    name = "${var.function_name}_dynamodb_podcast_policy"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
          "dynamodb:*"
      ],
      "Resource": "${var.podcast_table_arn}",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "crooked_media_scraper_dynamodb_podcast_policy_attachment" {
    role = "${aws_iam_role.crooked_media_scraper_iam_role.name}"
    policy_arn = "${aws_iam_policy.crooked_media_scraper_dynamodb_podcast_policy.arn}"
}

resource "aws_iam_policy" "crooked_media_scraper_dynamodb_episode_policy" {
    name = "${var.function_name}_dynamodb_episode_policy"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
          "dynamodb:*"
      ],
      "Resource": "${var.episode_table_arn}",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "crooked_media_scraper_dynamodb_episode_policy_attachment" {
    role = "${aws_iam_role.crooked_media_scraper_iam_role.name}"
    policy_arn = "${aws_iam_policy.crooked_media_scraper_dynamodb_episode_policy.arn}"
}

resource "aws_lambda_function" "crooked_media_scraper" {
    filename      = "${path.module}/index.zip"
    function_name = "${var.function_name}"
    role          = "${aws_iam_role.crooked_media_scraper_iam_role.arn}"
    handler       = "index.handler"
    runtime       = "nodejs8.10"
    tags          = var.tags
}