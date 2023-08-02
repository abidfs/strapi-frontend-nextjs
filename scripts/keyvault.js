const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const loadSecrets = async () => {
  try {
    const keyvaultUrl = `https://${process.env.VAULT_NAME}.vault.azure.net`;
    console.log('..............keyvault url', keyvaultUrl)
    if (keyvaultUrl) {
      const credential = new DefaultAzureCredential();
      console.log('credentials created');
      const client = new SecretClient(keyvaultUrl, credential);
      console.log("SecretClient created");

      for await (const secret of client.listPropertiesOfSecrets()) {
        if (secret.enabled) {
          const key = secret.name;
          console.log("loading secret ", key);
          const value = await client.getSecret(key);
          console.log("secret value", value);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

loadSecrets();

module.exports = loadSecrets;
