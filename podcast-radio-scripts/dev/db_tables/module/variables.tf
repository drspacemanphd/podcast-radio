variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "aws region, defaulting to us-east-1"
}

variable "tags" {
    type    = object({ environment = string, application_name = string})
    default = {
        environment: "dev"
        application_name: "podcast-radio-mobile"
    }
    description = "tags to be applied to resources"
}