resource "aws_s3_bucket" "podcast-radio-mobile" {
    bucket = "podcast-radio-mobile-dev"
    acl = "authenticated-read"
    tags = var.tags
}