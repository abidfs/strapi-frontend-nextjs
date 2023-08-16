#!/bin/bash

echo $VAULT_NAME
echo $ACCESS_TOKEN

source ./scripts/keyvault.sh $VAULT_NAME $ACCESS_TOKEN

echo "# Starting application"
# echo $SECRET1
# echo $SECRET2

yarn build
yarn start
