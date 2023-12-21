## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:dev
```

## Unit Tests

```bash
$ npm run test
```

## Endpoint

- GET   /api/auth/generate-token
  - Description: generate a token
  - Response:
    
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzAyNjY1MDcyfQ.mnh-7qwQSJ-sk_U_A79ryVah2qDRhOHP7UwiD5WthHw"
    }
    ```
  - Postman: Generate token - 200 OK
  ![generate-token_OK](./img-postman/generate-token_ok.png)
  
- POST  /api/currency
  - Description: register and update currencies
  - Body
  
    ```json
    {
    "currency_origin": "EUR",
    "currencies": {
      "USD": 4.5,
      "GBP": 1.1,
      "ILS": 1.6,
      "CNY": 7.2,
      "JPY": 130,
      "CAD": 1.25,
      "AUD": 1.6,
      "PEN": 4.2
      }
    }
    ```

  - Response
  
    ```json
    {
      "EUR": {
        "USD": 4.5,
        "GBP": 1.1,
        "ILS": 1.6,
        "CNY": 7.2,
        "JPY": 130,
        "CAD": 1.25,
        "AUD": 1.6,
        "PEN": 4.2
      }
    }
    ```
  
  - Postman: Register and Update currencies - 201 Created
  ![register-update-currencies_created](img-postman/register-currency_created.png)
  
- GET   /api/currency/:currency_origin
  - Description: get the currencies of a currency of origin type, the currency of origin is set as parameter
  - Param: :currency_origin
  - Response

    ```json
    {
      "USD": 4.5,
      "GBP": 1.1,
      "ILS": 1.6,
      "CNY": 7.2,
      "JPY": 130,
      "CAD": 1.25,
      "AUD": 1.6,
      "PEN": 4.2
    }
    ```
  - Postman: get the currencies by currency of origin
  ![get-currency_OK](img-postman/get-currency_ok.png)
  ![get-currency_not-found](img-postman/get-currency_not-found.png)

- POST  /api/currency-exchange
  - Description: calculates the exchange rate from one currency to another
  - Headers: Bearer Token
  - Body
  
    ```json
    {
      "quote_amount": 123,
      "currency_origin": "EUR",
      "currency_destination": "USD"
    }
    ```

  - Response
   
    ```json
    {
      "quote_amount": 123,
      "quote_amount_changed": 553.5,
      "currency_origin": "EUR",
      "currency_destination": "USD",
      "exchange_rate": 4.5
    }
    ```
  - Postman: calculates the exchange
  ![currency-exchange_created](img-postman/currency-exchange_created.png)
  ![currency-exchange_not-found](img-postman/currency-exchange_not-found-1.png)
  ![currency-exchange_not-found](img-postman/currency-exchange_not-found-2.png)
