module "podcast_bucket" {
    source = "./module"
    aws_region = "us-east-1"
    tags = {
        application_name = "podcast-radio-mobile"
        environment = "dev"
    }
}