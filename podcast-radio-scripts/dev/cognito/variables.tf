variable "user_pool_name" {
    type = string
}

variable "tags" {
    type = object({ application_name = string, environment = string })
}