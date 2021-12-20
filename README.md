# StreetCred frontend code

[![StreetCred](public/favicons/android-chrome-192x192.png)](https://streetcred.one/)

## Local launch

1. Install dependencies with `yarn`
2. Run the server with `yarn start`

## Available Scripts

- `yarn start` — runs the app in the development mode
- `yarn build` — builds the app for production to the `docs` folder

## Environment variables

| Name                 | Description       |
| -------------------- | ----------------- |
| `VITE_BACKEND`       | API root URL      |
| `VITE_DOSU_BACKEND`  | Dosu API root URL |
| `VITE_DOSU_FRONTEND` | Dosu frontend URL |

Also, please, consider looking at `.env.sample`.

## CD

`main` branch gets deployed to [streetcred.one](https://streetcred.one) automatically.
