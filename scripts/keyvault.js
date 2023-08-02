const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const loadSecrets = async () => {
  try {
    const keyvaultUrl = `https://${process.env.KEYVAULT_NAME}.vault.azure.net`;
    if (keyvaultUrl) {
      const credential = new DefaultAzureCredential();
      const client = new SecretClient(keyvaultUrl, credential);

      for await (const secret of client.listPropertiesOfSecrets()) {
        if (secret.enabled) {
          const key = secret.name;
          const value = await client.getSecret(key);
          console.log(".................", key, value);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

loadSecrets();

module.exports = loadSecrets;
