resource "aws_cloudwatch_event_rule" "scheduler" {
    name = "${var.function_name}-poller"
    schedule_expression = "cron(0 * * * ? *)"
}

resource "aws_cloudwatch_event_target" "scheduler_target" {
    rule = aws_cloudwatch_event_rule.scheduler.name
    arn = "${var.lambda_arn}"
    input = "${var.cloud_watch_target_input}"
}

resource "aws_lambda_permission" "scheduler_permission" {
    statement_id = "AllowExecutionFromCloudWatch"
    action = "lambda:InvokeFunction"
    function_name = "${var.function_name}"
    principal = "events.amazonaws.com"
    source_arn = "${aws_cloudwatch_event_rule.scheduler.arn}"
}