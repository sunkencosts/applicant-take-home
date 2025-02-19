//import React, { useState } from 'react';
import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import {
    selectCheckoutOffer,
    selectCheckoutOfferOption,
    selectShowAlert,
    setShowAlert,
} from '../../../slices/checkout-slice';
import { Alert, Button } from '../../common';
import * as giftcardService from '../../../utils/services/giftcardService';

import './checkout-button.less';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const [buttonText, setButtonText] = useState('Purchase Prizeout Gift Card');
    const [message, setMessage] = useState('');
    const showAlert = useAppSelector(selectShowAlert);
    const dispatch = useDispatch<AppDispatch>();
    const [type, setType] = useState('success');
    const selectedOfferOption = useAppSelector(selectCheckoutOfferOption);
    const selectedOffer = useAppSelector(selectCheckoutOffer);

    const buttonHandler = async () => {
        if (selectedOfferOption) {
            setButtonText('...Purchasing Prizeout Giftcard');
            const [messageResponse, typeResponse] = await giftcardService.purchaseGiftcard(
                selectedOfferOption,
                selectedOffer.name,
            );
            setType(typeResponse);
            setMessage(messageResponse);
            dispatch(setShowAlert(true));
            setButtonText('Purchase Prizeout Gift Card');
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
                isDisabled={!selectedOfferOption}
            />
            {showAlert && <Alert message={message} type={type === 'success' ? 'success' : 'error'} />}
        </>
    );
};

export default CheckoutButton;
