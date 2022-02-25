# StreetCred frontend code

[![StreetCred](public/favicons/android-chrome-192x192.png)](https://streetcred.one/)

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder

## Environment variables

| Name                    | Description                                                                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_BACKEND`          | API root URL                                                                                                                                                                           |
| `VITE_DOSU_BACKEND`     | Dosu API root URL                                                                                                                                                                      |
| `VITE_DOSU_FRONTEND`    | Dosu frontend URL                                                                                                                                                                      |
| `VITE_ENCRYPT_KEY`      | Secret key to encrypt local storage                                                                                                                                                    |
| `VITE_FORTMATIC_KEY`    | Create a project and get one [here][formatic-dev]                                                                                                                                      |
| `VITE_BITSKI_CLIENT_ID` | [Register][bitski-wallet], confirm your email and [get one][bitski-dev]. Use `localhost` as homepage in [your app][bitski-dev] + redirect to `localhost/callback.html` in auth section |
| `VITE_ETH_NETWORK`      | Eth network for your providers and contract                                                                                                                                            |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch gets deployed to [streetcred.one](https://streetcred.one) automatically.

[infura-dev]: https://infura.io/dashboard
[formatic-dev]: https://dashboard.fortmatic.com/
[bitski-wallet]: https://wallet.bitski.com/
[bitski-dev]: https://developer.bitski.com/
