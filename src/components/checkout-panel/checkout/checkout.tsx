import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectCheckoutOffer } from '../../../slices/checkout-slice';
import { GiftCard } from '../../common';
import checkoutPanelViewWrapper from '../view-wrapper';

import CheckoutButton from './checkout-button';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const checkoutOffer = useAppSelector(selectCheckoutOffer);

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item no-scrollbars">
                    <section className="checkout__brand">Display Gift Card Here</section>
                    {checkoutOffer && (
                        <GiftCard
                            name={checkoutOffer.name}
                            imgUrl={checkoutOffer.image_url}
                            altText={checkoutOffer.name}
                            className="offer"
                        />
                    )}

                    {checkoutOffer?.giftcard_list.map((option, index) => {
                        const cost = (option.cost_in_cents / 100).toLocaleString('en-US', {
                            currency: 'USD',
                            style: 'currency',
                        });
                        const value = (option.value_in_cents / 100).toLocaleString('en-US', {
                            currency: 'USD',
                            style: 'currency',
                        });

                        return (
                            <label key={index}>
                                <input type="radio" key={index} name="value-option" value={option.checkout_value_id} />
                                Cost: {cost}, value:{value} <br />
                            </label>
                        );
                    })}
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
