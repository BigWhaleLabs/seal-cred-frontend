# SealCred frontend code

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder

## Environment variables

| Name                             | Description                                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| `VITE_ENCRYPT_KEY`               | Secret key to encrypt local storage                                      |
| `VITE_APP_NAME`                  | App name which is displayed in some wallets                              |
| `VITE_ETH_NETWORK`               | Eth network for your providers and contract (defaults to @bwl/constants) |
| `VITE_ETH_RPC`                   | Ethereum node RPC URI (defaults to @bwl/constants)                       |
| `VITE_SCLEDGER_CONTRACT_ADDRESS` | SealCred Ledger contract address (defaults to @bwl/constants)            |
| `VITE_VERIFY_URL`                | Proof verification URL                                                   |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch gets deployed to [sealcred.xyz](https://sealcred.xyz) automatically.
