variable "tags" {
    type = object({ application_name = string, environment = string })
    default = {
        application_name = "podcast-radio-mobile"
        environment = "dev"
    }
}