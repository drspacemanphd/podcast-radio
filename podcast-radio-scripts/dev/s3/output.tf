output "bucket_name" {
    value = aws_s3_bucket.podcast-radio-mobile.id
}

output "arn" {
    value = aws_s3_bucket.podcast-radio-mobile.arn
}