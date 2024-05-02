## Ki take home test - TS version

### Getting started

1. Clone the repository
2. Ensure your node version is `>=18.18.0` and yarn version is `>=1.22.19`
3. Install the dependencies by running `yarn install`
4. Build the project using `yarn build`
5. Run the tests using `yarn test`
6. Run the project
   using `yarn dev --filePath=<payments_file_path> --paymentSource=<payment_source> --sharePrice=<share_price>`

Example:

```bash
yarn dev --filePath=./data/raw/card_payments_example.csv --paymentSource=card --sharePrice=1.20
```

## Background

The Ki website allows customers to open an account and purchase shares in one or more funds. Before a customer can buy
shares, they top up their account with a desired amount, using a debit card.

The website is supported by an underlying investment platform, consisting of modules that each perform a specific role.
Each module is a separate package, installed on the platform as a dependency. One of these modules is tasked with
processing an incoming payments CSV file, then generating a share order CSV, consumed by another module.

This report contains the `customer_id` and the number of shares their payment(s) will purchase, given the share price.

```
"customer_id","shares"
"123","100"
"987","3400"
```

### Exercise

Some customers have indicated they would prefer to top up their account by making a bank transfer, rather than using
their debit card.

Update the `PaymentProcessor` class to support both card and bank transfer payments. We will receive a separate CSV file
from our payment provider, in a similar format to card payments:

```
customer_id,date,amount,bank_account_id
789,2018-10-25,900,20
345,2018-11-03,900,60
```

Unlike card payments, our payment provider will only update us once a bank transfer has been successfully processed.
Remember, the module is installed on the platform as a dependency, therefore the API to both the `PaymentProcessor`
and `ShareEngine` service classes must not change.
You can check your implementation by using the example CSV:

```bash
yarn dev --filePath=./data/raw/bank_payments_example.csv --paymentSource=bank --sharePrice=1.20
```

This should produce the result:

```
"customer_id","shares"
"789","735"
"345","735"
```

### Tests

You can run the tests from the root of the project with:

```
yarn test
```

### Dev notes

1. The project is built using `tsc` with related config defined in `tsconfig.json`
2. The project is compiled using `tsx` during the dev phase.
3. The project is tested using `vitest`.
4. The command line args are read using `command-line-args` package.
5. The unprocessed payments data (csv files) are stored in the `data/raw` folder.
