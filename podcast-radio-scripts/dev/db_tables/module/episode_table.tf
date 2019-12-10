resource "aws_dynamodb_table" "episode_table" {
    name = "EPISODE"
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
        name = "PODCAST_GUID"
        type = "S"
    }

    attribute {
        name = "DOWNLOADS"
        type = "N"
    }

    global_secondary_index {
        name = "PODCAST_INDEX"
        hash_key = "GUID"
        range_key = "PODCAST_GUID"
        read_capacity = 10
        write_capacity = 10
        projection_type = "ALL"
    }

    tags = var.tags

}