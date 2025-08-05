terraform {
  backend "s3" {
    bucket = "bagato-devsecops"
    key    = "statefile/terraform.tfstate"
    region = "us-east-1"
    ## dynamodb_table = "eksdb" depreacted 
    use_lockfile = true
    encrypt = true
  }
}