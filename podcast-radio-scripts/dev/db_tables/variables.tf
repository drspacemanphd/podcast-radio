variable "tags" {
    type    = object({ environment = string, application_name = string})
    default = {
        environment: "dev"
        application_name: "podcast-radio-mobile"
    }
    description = "tags to be applied to resources"
}