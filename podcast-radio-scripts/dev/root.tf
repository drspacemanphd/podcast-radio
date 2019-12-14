provider "aws" {
    region = "us-east-1"
}

module "application_bucket" {
    source = "./s3"
    tags = {
        application_name = "podcast-radio-mobile"
        environment = "dev"
    }
}

module "db_tables" {
    source  = "./db_tables"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "crooked-media-scraper" {
    source  = "./crooked-media-scraper"
    function_name = "crooked-media-scraper-DEV"
    bucket_name = "${module.application_bucket.bucket_name}"
    podcast_table_arn = "${module.db_tables.podcast_table_arn}"
    episode_table_arn = "${module.db_tables.episode_table_arn}"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}