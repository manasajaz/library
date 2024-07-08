import React, { useEffect } from "react";

const PayPalButton = () => {
    useEffect(() => {
        // Load the PayPal script
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=test";
        script.addEventListener("load", () => {
            // Render PayPal buttons after the script is loaded
            window.paypal.Buttons().render("#paypal-button-container");
        });
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div id="paypal-button-container"></div>;
};

export default PayPalButton;



