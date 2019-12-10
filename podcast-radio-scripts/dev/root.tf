module "db_tables" {
    source = "./db_tables"
}

module "s3_podcast_bucket" {
    source = "./s3"
}