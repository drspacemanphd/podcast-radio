provider "aws" {
    region = var.aws_region
}

resource "aws_dynamodb_table" "podcast_table" {
    name = "PODCAST"
    billing_mode = "PROVISIONED"
    hash_key = "GUID"
    range_key = "DOWNLOADS"
    read_capacity = 10
    write_capacity = 10

    attribute {
        name = "GUID"
        type = "S"
    }

    attribute {
        name = "TITLE"
        type = "S"
    }

    attribute {
        name = "AUTHOR"
        type = "S"
    }

    attribute {
        name = "CATEGORY"
        type = "S"
    }

    attribute {
        name = "DOWNLOADS"
        type = "N"
    }

    global_secondary_index {
        name = "TITLE_INDEX"
        hash_key = "TITLE"
        range_key = "DOWNLOADS"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    global_secondary_index {
        name = "AUTHOR_INDEX"
        hash_key = "AUTHOR"
        range_key = "DOWNLOADS"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    global_secondary_index {
        name = "CATEGORY_INDEX"
        hash_key = "CATEGORY"
        range_key = "DOWNLOADS"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    tags = var.tags

}