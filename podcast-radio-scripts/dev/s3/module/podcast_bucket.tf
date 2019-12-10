provider "aws" {
    region = var.aws_region
}

resource "aws_s3_bucket" "podcast-radio-mobile" {
    bucket = "podcast-radio-mobile-development"
    acl = "authenticated-read"
    tags = var.tags
}