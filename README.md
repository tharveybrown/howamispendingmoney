# smarter spending

React fromtend for a personal finance application to track expenses and donations. Connects to a Ruby on Rails [backend](https://github.com/tharveybrown/donations-backend), which should be run in parallel.

This app integrates with [Plaid](https://plaid.com/) to allow users to link their bank account(s). You will need to register an application with Plaid and include the following in a `.env` file within the root directory:

```yml
REACT_APP_API_URL="http://localhost:3001"
REACT_APP_PLAID_PUBLIC_KEY=<yourPlaidPublicKey>
REACT_APP_PLAID_ENV="sandbox"
```

## Available Scripts

In the project directory, you can run:

- `yarn` or `npm install` to install the dependencies
- `yarn start` or `npm start` runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This application is deployed on heroku and can be found [here](https://enigmatic-dawn-22027.herokuapp.com/).
