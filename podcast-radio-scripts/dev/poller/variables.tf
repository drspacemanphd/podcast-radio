variable "function_name" {
    type = string
}

variable "lambda_arn" {
    type = string
    default = ""
}

variable "cloud_watch_target_input" {
    type = string
    default = ""
}

variable "tags" {
    type = object({ application_name = string, environment = string })
    default = {
        environment: "dev"
        application_name: "podcast-radio-mobile"
    }
    description = "tags to be applied"
}