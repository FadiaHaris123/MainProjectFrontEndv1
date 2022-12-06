
import GooglePayButton from "@google-pay/button-react";
import React from "react";
import './Gpay.css'

function Gpay() {
  return (
    <div className="App">
     <h2> Complete your payment here 👇</h2>
     <div className="Google">
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: "CARD",
              parameters: {
                allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                allowedCardNetworks: ["MASTERCARD", "VISA"],
              },
              tokenizationSpecification: {
                type: "PAYMENT_GATEWAY",
                parameters: {
                  gateway: "example",
                  gatewayMerchantId: "exampleGatewayMerchantId",
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: "12345678901234567890",
            merchantName: "Anagha Rajeev",
          },
          transactionInfo: {
            totalPriceStatus: "FINAL",
            totalPriceLabel: "Total",
            totalPrice: "1",
            currencyCode: "USD",
            countryCode: "US",
          },
          shippingAddressRequired: true,
          callbackIntents: ["PAYMENT_AUTHORIZATION"],
        }}
        onLoadPaymentData={(paymentRequest) => {
          console.log(paymentRequest);
        }}
        onPaymentAuthorized={paymentData =>{
          console.log('paymentData ' + paymentData);
          return { transactionState: 'SUCCESS'}
        }}
        existingPaymentMethodRequired='false'
        buttonColor="black"
        buttonType="pay"
      ></GooglePayButton>
      </div>
    </div>
  );
}

export default Gpay;
