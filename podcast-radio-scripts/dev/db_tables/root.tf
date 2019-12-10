module "db_tables" {
  source  = "./module"
  aws_region = "us-east-1"
  tags = {
      environment = "dev"
      application_name = "podcast-radio-mobile"
  }
}