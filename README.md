# SealCred frontend code

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder

## Environment variables

| Name                              | Description                                                           |
| --------------------------------- | --------------------------------------------------------------------- |
| `VITE_ENCRYPT_KEY`                | Secret key to encrypt local storage                                   |
| `VITE_FORTMATIC_KEY`              | Create a project and get one [here](https://dashboard.fortmatic.com/) |
| `VITE_APP_NAME`                   | App name which is displayed in some wallets                           |
| `VITE_ETH_NETWORK`                | Eth network for your providers and contract                           |
| `VITE_ETH_WS`                     | Ethereum node websocket URI                                           |
| `VITE_ETH_RPC`                    | Ethereum node RPC URI                                                 |
| `VITE_BITSKI_CLIENT_ID`           | Bitski client ID                                                      |
| `VITE_SC_LEDGER_CONTRACT_ADDRESS` | SealCred Ledger contract address                                      |

Also, please, consider looking at `.env.sample`.

## Obtain Bitski client ID

[Register a wallet](https://wallet.bitski.com/), confirm your email and [create a project](https://developer.bitski.com/). Use `localhost` as homepage in your app + redirect to `localhost/callback.html` in auth section.

## CD

`main` branch gets deployed to [sealcred.xyz](https://sealcred.xyz) automatically.
