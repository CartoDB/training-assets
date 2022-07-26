# Perform API calls with CARTO

## Step 1. Create an application & copy client id and secret pair

Client ID: `rOD0YoUr4rJBclIentIdRWSAq3SBZBmkP0G21H`
Client Secret: `Ju8YI3rbLeD8gcyxX57Y0uRcl1entS3cr3tfCdHI0-Qgnno5g8wwR1105SsDA_`

## Step 2. Retrieve access token

```bash
curl --request POST \
  --url 'https://auth.carto.com/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'grant_type=client_credentials' \
  --data 'client_id=rOD0YoUr4rJBclIentIdRWSAq3SBZBmkP0G21H' \
  --data 'client_secret=Ju8YI3rbLeD8gcyxX57Y0uRcl1entS3cr3tfCdHI0-Qgnno5g8wwR1105SsDA_' \
  --data 'audience=carto-cloud-native-api'
```

```json
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRVNGNZTHAwaThjYnVMNkd0LTE0diJ9.eyJodHRwOi8vYXBwLmYoUrAccessTokencm1pc3Npb25zIjpbInJlYWQ6dG9rZW5zIiwid3JpdGU6dG9rZW5zIiwicmVhZDppbXBvcnRzIiwid3JpdGU6aW1wb3J0cyIsInJlYWQ6Y29ubmVjdGlvbnMiLCJ3cml0ZTpjb25uZWN0aW9ucyJdfQ.Ojb_eGHz3gpaz97u-rCZGm1_CmUc9wcREicoh0JRA9vtlAaA6JbnrTcZu0uCpas12BnRbhCyUSfvBP9FFEWTUTEt2Wy0FLbKZt4_j_O8Jko6ANO2sWogRiElcNQi0u1XYZ-8W4pnCRcAuFBZbWCxWNLVNExXAvRU9hsWddI7cZXe8rZ1JTn6f1VAaP8cwc7ZxIdG0Qf26DnTkrVivv2nZ6M5oy9CiwW2gw3Ru2XhGtqTX2ckKtobRQ6rfNua9Lsp36Mtha5ju2UPyoi4kYyAjkv-4FhOecswYTCYz8vS_ikfIHi0C__foRNHVqZpOFSvUDSinobqrSwddvy2gvipYA","scope":"read:tokens write:tokens read:imports write:imports read:connections write:connections","expires_in":86400,"token_type":"Bearer"}
```

## Step 3. Perform API requests

```bash
curl --location --request GET 'https://gcp-us-east1.api.carto.com/v3/lds/geocoding/geocode?address=calle%20ebro%2C%201%20sevilla&country=ES&limit=1&access_token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRVNGNZTHAwaThjYnVMNkd0LTE0diJ9.eyJodHRwOi8vYXBwLmYoUrAccessTokencm1pc3Npb25zIjpbInJlYWQ6dG9rZW5zIiwid3JpdGU6dG9rZW5zIiwicmVhZDppbXBvcnRzIiwid3JpdGU6aW1wb3J0cyIsInJlYWQ6Y29ubmVjdGlvbnMiLCJ3cml0ZTpjb25uZWN0aW9ucyJdfQ.Ojb_eGHz3gpaz97u-rCZGm1_CmUc9wcREicoh0JRA9vtlAaA6JbnrTcZu0uCpas12BnRbhCyUSfvBP9FFEWTUTEt2Wy0FLbKZt4_j_O8Jko6ANO2sWogRiElcNQi0u1XYZ-8W4pnCRcAuFBZbWCxWNLVNExXAvRU9hsWddI7cZXe8rZ1JTn6f1VAaP8cwc7ZxIdG0Qf26DnTkrVivv2nZ6M5oy9CiwW2gw3Ru2XhGtqTX2ckKtobRQ6rfNua9Lsp36Mtha5ju2UPyoi4kYyAjkv-4FhOecswYTCYz8vS_ikfIHi0C__foRNHVqZpOFSvUDSinobqrSwddvy2gvipYA'
```

```json
[{"error":null,"value":[{"latitude":37.35547,"longitude":-5.98312,"country":"España","city":"Sevilla","state":"Andalucía","streetName":"Calle Ebro","streetNumber":"1","countryCode":"ES","provider":"tomtom"}]}]
```
