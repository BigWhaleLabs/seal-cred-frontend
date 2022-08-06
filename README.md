# SealCred frontend code

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder

## Environment variables

| Name                                              | Description                                                                   |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `VITE_ENCRYPT_KEY`                                | Secret key to encrypt local storage                                           |
| `VITE_APP_NAME`                                   | App name which is displayed in some wallets                                   |
| `VITE_ETH_NETWORK`                                | Eth network for your providers and contract (defaults to @bwl/constants)      |
| `VITE_CHAIN_ID`                                   | Id of the testnet, you can check them inside MetaMask                         |
| `VITE_ETH_RPC`                                    | Ethereum node RPC URI (defaults to @bwl/constants)                            |
| `VITE_ETH_RPC_MAINNET`                            | Ethereum node RPC URI mainnet (defaults to @bwl/constants)                    |
| `VITE_EXTERNAL_SC_ERC721_LEDGER_CONTRACT_ADDRESS` | External SealCred ERC721 Ledger contract address (defaults to @bwl/constants) |
| `VITE_SC_ERC721_LEDGER_CONTRACT_ADDRESS`          | SealCred ERC721 Ledger contract address (defaults to @bwl/constants)          |
| `VITE_SC_EMAIL_LEDGER_CONTRACT_ADDRESS`           | SealCred Email Ledger contract address (defaults to @bwl/constants)           |
| `VITE_PAYMASTER_CONTRACT_ADDRESS`                 | Relay paymaster contract address                                              |
| `VITE_RELAY_HUB_CONTRACT_ADDRESS`                 | Relay hub contract address                                                    |
| `VITE_GSN_RELAY_MANAGER_ADDRESS`                  | Relay manager address                                                         |
| `VITE_GSN_SC_RELAY`                               | Relay url                                                                     |
| `VITE_VERIFY_URL`                                 | Proof verification URL                                                        |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch gets deployed to [sealcred.xyz](https://sealcred.xyz) automatically.
