output "podcast_table_arn" {
  value = aws_dynamodb_table.podcast_table.arn
}

output "episode_table_arn" {
  value = aws_dynamodb_table.episode_table.arn
}