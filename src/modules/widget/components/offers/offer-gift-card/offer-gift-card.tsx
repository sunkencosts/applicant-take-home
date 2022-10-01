import React from 'react';
import { useAppSelector } from '../../../../../hooks';
import { selectCheckoutOffer } from '../../../../../slices/checkout-slice';
import Classnames from 'classnames';
import { GiftCard, BonusTag } from '../../../../../components/common/';
import { PrizeoutOffer } from '../../../../../slices/offers-slice';

import './offer-gift-card.less';

interface OfferGiftCardProps {
    offer: PrizeoutOffer;
    onClickHandler: () => void;
}

export const OfferGiftCard: React.FC<OfferGiftCardProps> = ({ offer, onClickHandler }): React.ReactElement => {
    const activeOfferId = useAppSelector(selectCheckoutOffer)?.giftcard_list[0]?.checkout_value_id;
    const firstGiftCard = offer.giftcard_list[0];
    const offerType = firstGiftCard.display_monetary_bonus ? 'monetary' : 'percentage';
    const offerValue = firstGiftCard.display_bonus;
    const classes: string = Classnames('offer-gift-card', {
        'selected-offer-gift-card': activeOfferId === firstGiftCard.checkout_value_id,
    });

    return (
        <div className={classes} onClick={() => onClickHandler()}>
            <GiftCard name={offer.name} imgUrl={offer.image_url} altText={offer.name} className="offer" />
            {offerValue > 0 && <BonusTag type={offerType} value={offerValue} size="small" />}
        </div>
    );
};
