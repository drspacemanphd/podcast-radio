output "aws_cognito_user_pool" {
  value = aws_cognito_user_pool.user_pool.id
}

output "aws_cognito_user_pool_client" {
  value = aws_cognito_user_pool_client.pool_client.id
}

output "aws_cognito_user_pool_domain" {
  value = aws_cognito_user_pool_domain.pool_domain.id
}

output "aws_cognito_identity_pool" {
  value = aws_cognito_identity_pool.identity_pool.id
}