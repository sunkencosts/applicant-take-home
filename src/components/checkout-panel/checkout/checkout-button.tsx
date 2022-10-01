//import React, { useState } from 'react';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { selectCheckoutOffer, selectCheckoutOfferOption } from '../../../slices/checkout-slice';
import { Alert, Button } from '../../common';
import * as giftcardService from '../../../utils/services/giftcardService';

import './checkout-button.less';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const [buttonText, setButtonText] = useState('Prizeout Gift Card');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState('success');
    const selectedOfferOption = useAppSelector(selectCheckoutOfferOption);
    const selectedOffer = useAppSelector(selectCheckoutOffer);

    const buttonHandler = async () => {
        console.log(selectedOffer);
        if (selectedOffer) {
            setShowAlert(false);
            setButtonText('...Purchasing Prizeout Giftcard');
            const [messageResponse, typeResponse] = await giftcardService.purchaseGiftcard(
                selectedOfferOption,
                selectedOffer.name,
            );
            setType(typeResponse);
            setMessage(messageResponse);
            setShowAlert(true);
            setButtonText('Prizeout Gift Card');
        }
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`confirm`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
            {showAlert && <Alert message={message} type={type === 'success' ? 'success' : 'error'} />}
        </>
    );
};

export default CheckoutButton;
