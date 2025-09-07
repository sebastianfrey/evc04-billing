# EVC04 Billing Utility

Small web-based application to create charging invoices for the E.ON Wallbox EVC04 for submission to
the employer.

This app was created, because the E.ON Wallbox EVC04 has no billing module. It only supports exporting
charging sessions as CSV.

## Features

* Grouping charging session by month
* RFID selection
* Custom address data
* Custom gross and net electricity prices

## Getting Started

1. Clone this repository
2. Open the project folder
3. Run `npm i`
4. Run `npm run dev`
5. Upload the exported charging session CSV from your wallbox
6. Select the month you want to create an invoice
7. Provide your address data and your gross and net electricity prices
8. Save the PDF

## Configuration

You can configure some initial fields through a `.env` file:

```ini
VITE_APP_ADDRESS_NAME=<address-name>
VITE_APP_ADDRESS_STREET=<address-street>
VITE_APP_ADDRESS_HOUSE_NUMBER=<address-house-number>
VITE_APP_ADDRESS_CITY=<address-city>
VITE_APP_ADDRESS_ZIP_CODE=<address-zip-code>
VITE_APP_ELECTRICITY_GROSS_PRICE=<electricity-gross-price>
VITE_APP_ELECTRICITY_NET_PRICE=<electricity-net-price>
```