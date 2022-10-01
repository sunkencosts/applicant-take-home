import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { selectCheckoutOffer, selectCheckoutOfferOption, setCheckoutOfferOption } from '../../../slices/checkout-slice';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import { AppDispatch } from '../../../store';

import { GiftCard } from '../../common';
import checkoutPanelViewWrapper from '../view-wrapper';

import CheckoutButton from './checkout-button';

import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const checkoutOffer = useAppSelector(selectCheckoutOffer);
    const checkoutOfferOption = useAppSelector(selectCheckoutOfferOption);
    const dispatch = useDispatch<AppDispatch>();

    const onOptionChange = (option: PrizeoutOfferValueOptions) => {
        dispatch(setCheckoutOfferOption(option));
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item no-scrollbars">
                    <section className="checkout__brand">Selected Gift Card</section>
                    {checkoutOffer && (
                        <GiftCard
                            name={checkoutOffer.name}
                            imgUrl={checkoutOffer.image_url}
                            altText={checkoutOffer.name}
                            className="offer"
                        />
                    )}
                    {checkoutOffer && (
                        <div className="checkout_selection_label">
                            <p>Select the value you would like to purchase</p>
                        </div>
                    )}
                    <div className="checkout_options">
                        {/*TODO - check with team to see if I can add a new component to the /common folder.
                        New component to take giftcard_list as prop and display options */}
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
                                    <input
                                        type="radio"
                                        key={index}
                                        name="value-option"
                                        value={option.checkout_value_id}
                                        checked={option.checkout_value_id === checkoutOfferOption?.checkout_value_id}
                                        onChange={() => onOptionChange(option)}
                                    />
                                    Cost: {cost}, value:{value} <br />
                                </label>
                            );
                        })}
                    </div>
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
