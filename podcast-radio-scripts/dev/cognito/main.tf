resource "aws_cognito_user_pool" "user_pool" {
    name = var.user_pool_name
    username_attributes = ["email"]
    auto_verified_attributes = ["email"]

    password_policy {
        minimum_length = 8
        require_lowercase = true
        require_numbers = true
        require_symbols = true
        require_uppercase = true
    }

    admin_create_user_config {
        allow_admin_create_user_only = false
        unused_account_validity_days = 7
    }

    verification_message_template {
        default_email_option = "CONFIRM_WITH_CODE"
        email_message = "Thank you for signing up for Podcast Radio (alpha edition). To verify your account, please enter the verification code in the prompt: {####}"
        email_subject = "Thanks for signing up!"
    }

    tags = var.tags
} 

resource "aws_cognito_user_pool_client" "pool_client" {
    name = "${var.user_pool_name}_client"
    user_pool_id = aws_cognito_user_pool.user_pool.id
    explicit_auth_flows = ["USER_PASSWORD_AUTH"]
}

resource "aws_cognito_user_pool_domain" "pool_domain" {
  domain = "podcast-radio-dev-a1b2c3d4"
  user_pool_id = "${aws_cognito_user_pool.user_pool.id}"
}

resource "aws_cognito_identity_pool" "identity_pool" {
    identity_pool_name = "PodcastRadioDev"
    allow_unauthenticated_identities = false

    cognito_identity_providers {
        client_id = aws_cognito_user_pool_client.pool_client.id
        provider_name = aws_cognito_user_pool.user_pool.endpoint
        server_side_token_check = false
    }

    tags = var.tags
}

resource "aws_iam_role" "identity_pool_auth_role" {
    name = "identity_pool_authenticated_role-DEV"
    tags = var.tags
    assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "cognito-identity.amazonaws.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "identity_pool_auth_policy" {
    name = "identity_pool_authenticated_role-DEV"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*",
        "execute-api:Invoke",
        "execute-api:ManageConnections",
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "cognito-identity:*"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attachment" {
  role       = "${aws_iam_role.identity_pool_auth_role.name}"
  policy_arn = "${aws_iam_policy.identity_pool_auth_policy.arn}"
}

resource "aws_cognito_identity_pool_roles_attachment" "pool_attachment" {
  identity_pool_id = "${aws_cognito_identity_pool.identity_pool.id}"
  roles = {
    "authenticated" = "${aws_iam_role.identity_pool_auth_role.arn}"
  }
}