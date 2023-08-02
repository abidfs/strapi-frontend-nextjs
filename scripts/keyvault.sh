#!/bin/bash

#
# Fetch secrets for local development from Azure KeyVault
# and print them to stdout as a bunch of env var exports.
# These secrets should be added to your local .env file
# to enable running integration tests locally.
#
KEY_VAULT=$1

function set_secret_as_env_var() {
    local SECRET_NAME=$1
    local SECRET_VALUE=$(az keyvault secret show --vault-name "${KEY_VAULT}" --name "${SECRET_NAME}" --query value | sed 's/"//g')
    export ${SECRET_NAME}=${SECRET_VALUE}
}

echo "# Loading secrets from ${KEY_VAULT} on "`date`
set_secret_as_env_var SECRET1
set_secret_as_env_var SECRET2
