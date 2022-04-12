# StreetCred frontend code

[![StreetCred](public/favicons/android-chrome-192x192.png)](https://streetcred.one/)

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder

## Environment variables

| Name                              | Description                                                                                                                                                                                                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_ENCRYPT_KEY`                | Secret key to encrypt local storage                                                                                                                                                                                        |
| `VITE_FORTMATIC_KEY`              | Create a project and get one [here](https://dashboard.fortmatic.com/)                                                                                                                                                      |
| `VITE_ETH_NETWORK`                | Eth network for your providers and contract                                                                                                                                                                                |
| `VITE_INFURA_ID`                  | Create an app and get one [here](https://infura.io/dashboard)                                                                                                                                                              |
| `VITE_APP_NAME`                   | App name which is displayed in some wallets                                                                                                                                                                                |
| `VITE_BITSKI_CLIENT_ID`           | [Register a wallet](https://wallet.bitski.com/), confirm your email and [create a project](https://developer.bitski.com/). Use `localhost` as homepage in your app + redirect to `localhost/callback.html` in auth section |
| `VITE_INVITES_CONTRACT_ADDRESS`   | https://invites.dosu.io/ contract address                                                                                                                                                                                  |
| `VITE_SC_DERIVATIVE_ADDRESS`      | https://streetcred.one/ derivative contract address                                                                                                                                                                        |
| `VITE_SC_LEDGER_CONTRACT_ADDRESS` | StreetCred Ledger contract address                                                                                                                                                                                         |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch gets deployed to [streetcred.one](https://streetcred.one) automatically.
