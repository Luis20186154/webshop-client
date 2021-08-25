
export interface CreditCard {
    hasCreditCard: boolean;
    creditCardInformation: {
        personalInformation: {
            name: string;
            lastName: string;
            location: {
                postalCode: string;
                addres: string;
                city: string;
                province: string;
                country: string;
            }
        };
        paymentDetails: {
            cardOwner: string;
            cardNumber: string;
            expiryDate: string;
            cvv: string;
        };
    }
}