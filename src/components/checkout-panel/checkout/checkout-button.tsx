//import React, { useState } from 'react';
import React from 'react';
import { Button } from '../../common';

import './checkout-button.less';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const buttonHandler = () => {
        console.log('button clicked');
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
        </>
    );
};

export default CheckoutButton;
