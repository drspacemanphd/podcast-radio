resource "aws_dynamodb_table" "episode_table" {
    name = "EPISODE_DEV"
    billing_mode = "PROVISIONED"
    hash_key = "TITLE"
    range_key = "PODCAST"
    read_capacity = 10
    write_capacity = 10

    attribute {
        name = "TITLE"
        type = "S"
    }

    attribute {
        name = "PODCAST"
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

    attribute {
        name = "PUBLICATION_DATE"
        type = "S"
    }

    global_secondary_index {
        name = "PODCAST_INDEX"
        hash_key = "PODCAST"
        range_key = "CATEGORY"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    global_secondary_index {
        name = "DOWNLOADS_INDEX"
        hash_key = "PODCAST"
        range_key = "DOWNLOADS"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    global_secondary_index {
        name = "PUBLICATION_INDEX"
        hash_key = "PODCAST"
        range_key = "PUBLICATION_DATE"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    tags = var.tags

}

resource "aws_dynamodb_table" "podcast_table" {
    name = "PODCAST_DEV"
    billing_mode = "PROVISIONED"
    hash_key = "TITLE"
    range_key = "AUTHOR"
    read_capacity = 10
    write_capacity = 10

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

    global_secondary_index {
        name = "CATEGORY_INDEX"
        hash_key = "TITLE"
        range_key = "CATEGORY"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    tags = var.tags

}