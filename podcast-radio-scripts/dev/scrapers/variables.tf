variable "function_name" {
    type = string
}

variable "bucket_name" {
    type = string
}

variable "podcast_table_arn" {
    type = string
}

variable "episode_table_arn" {
    type = string
}

variable "s3_arn" {
    type = string
}

variable "tags" {
    type = object({ application_name = string, environment = string })
    default = {
        environment: "dev"
        application_name: "podcast-radio-mobile"
    }
    description = "tags to be applied"
}