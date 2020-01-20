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

module "feedburner_scraper" {
    source  = "./scrapers"
    function_name = "feedburner-scraper-DEV"
    bucket_name = "${module.application_bucket.bucket_name}"
    podcast_table_arn = "${module.db_tables.podcast_table_arn}"
    episode_table_arn = "${module.db_tables.episode_table_arn}"
    s3_arn = "${module.application_bucket.arn}"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "art19_scraper" {
    source  = "./scrapers"
    function_name = "art19-scraper-DEV"
    bucket_name = "${module.application_bucket.bucket_name}"
    podcast_table_arn = "${module.db_tables.podcast_table_arn}"
    episode_table_arn = "${module.db_tables.episode_table_arn}"
    s3_arn = "${module.application_bucket.arn}"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "npr_scraper" {
    source  = "./scrapers"
    function_name = "npr-scraper-DEV"
    bucket_name = "${module.application_bucket.bucket_name}"
    podcast_table_arn = "${module.db_tables.podcast_table_arn}"
    episode_table_arn = "${module.db_tables.episode_table_arn}"
    s3_arn = "${module.application_bucket.arn}"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "nbcnews_scraper" {
    source  = "./scrapers"
    function_name = "nbcnews-scraper-DEV"
    bucket_name = "${module.application_bucket.bucket_name}"
    podcast_table_arn = "${module.db_tables.podcast_table_arn}"
    episode_table_arn = "${module.db_tables.episode_table_arn}"
    s3_arn = "${module.application_bucket.arn}"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "crooked_media_poller" {
    source = "./poller"
    function_name = "feedburner-scraper-DEV"
    lambda_arn = "${module.feedburner_scraper.aws_lambda_function_arn}"
    cloud_watch_target_input = <<EOT
        { "podcasts": 
            [ 
                { 
                    "title": "Pod Save America", 
                    "author": "Crooked Media",
                    "dns": "pod-save-america",
                    "rssUrl": "http://feeds.feedburner.com/pod-save-america"
                },
                { 
                    "title": "Pod Save the World", 
                    "author": "Crooked Media",
                    "dns": "pod-save-the-world",
                    "rssUrl": "http://feeds.feedburner.com/pod-save-the-world"
                },
                { 
                    "title": "Lovett or Leave It", 
                    "author": "Crooked Media",
                    "dns": "lovett-or-leave-it",
                    "rssUrl": "http://feeds.feedburner.com/lovett-or-leave-it"
                }
            ]
        }
    EOT
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "nyt_poller" {
    source = "./poller"
    function_name = "art19-scraper-DEV"
    lambda_arn = "${module.art19_scraper.aws_lambda_function_arn}"
    cloud_watch_target_input = <<EOT
        { "podcasts": 
            [ 
                { 
                    "title": "The Daily", 
                    "author": "The New York Times",
                    "dns": "the-daily",
                    "rssUrl": "http://rss.art19.com/the-daily"
                }
            ]
        }
    EOT
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "npr_poller" {
    source = "./poller"
    function_name = "npr-scraper-DEV"
    lambda_arn = "${module.npr_scraper.aws_lambda_function_arn}"
    cloud_watch_target_input = <<EOT
        { "podcasts": 
            [ 
                { 
                    "title": "Fresh Air", 
                    "author": "NPR",
                    "dns": "fresh-air",
                    "rssUrl": "https://www.npr.org/rss/podcast.php?id=381444908"
                },
                { 
                    "title": "The NPR Politics Podcast", 
                    "author": "NPR",
                    "dns": "npr-politics",
                    "rssUrl": "https://www.npr.org/rss/podcast.php?id=510310"
                }
            ]
        }
    EOT
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "nbcnews_poller" {
    source = "./poller"
    function_name = "nbcnews-scraper-DEV"
    lambda_arn = "${module.nbcnews_scraper.aws_lambda_function_arn}"
    cloud_watch_target_input = <<EOT
        { "podcasts": 
            [ 
                { 
                    "title": "The Rachel Maddow Show", 
                    "author": "Rachel Maddow, MSNBC",
                    "dns": "the-rachel-maddow-show",
                    "rssUrl": "https://podcastfeeds.nbcnews.com/msnbc-rachel-maddow"
                }
            ]
        }
    EOT
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "podcast_api" {
    source  = "./api"
    function_name = "podcast-api-DEV"
    podcast_table_arn = "${module.db_tables.podcast_table_arn}"
    episode_table_arn = "${module.db_tables.episode_table_arn}"
    api_name = "podcast-api-DEV"
    stage_name = "dev"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

module "cognito_pool" {
    source  = "./cognito"
    user_pool_name = "podcast-radio-mobile-DEV"
    tags = {
        environment = "dev"
        application_name = "podcast-radio-mobile"
    }
}

output "aws_cognito_user_pool" {
  value = module.cognito_pool.aws_cognito_user_pool
}

output "aws_cognito_user_pool_client" {
  value = module.cognito_pool.aws_cognito_user_pool_client
}

output "aws_cognito_user_pool_domain" {
  value = module.cognito_pool.aws_cognito_user_pool_domain
}

output "aws_cognito_identity_pool" {
  value = module.cognito_pool.aws_cognito_identity_pool
}