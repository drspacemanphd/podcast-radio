variable "aws_region" {
    type = string
    default = "us-east-1"
}

variable "tags" {
    type = object({ application_name = string, environment = string })
    default = {
        application_name = "podcast-radio-mobile"
        "environment" = "dev"
    }
}