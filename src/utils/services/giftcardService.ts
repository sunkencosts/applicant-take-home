// This service will mock a post request to the Prizeout API to purchase a gift card.

import { PrizeoutOfferValueOptions } from '../../slices/offers-slice';

export const purchaseGiftcard = (option: PrizeoutOfferValueOptions, name: string) => {
    console.log('sending http request to purchase:', option);
    // const requestOptions = {
    //     body: JSON.stringify({
    //         checkout_value_id: option.checkout_value_id,
    //         cost_in_cents: option.cost_in_cents,
    //         name: name,
    //         value_in_cents: option.value_in_cents,
    //     }),
    //     headers: { 'Content-Type': 'application/json' },
    //     method: 'POST',
    // };
    // return fetch('https://prizeout.com/api/purchase', requestOptions)
    //     .then((response) => {
    //         if (response.status >= 400) {
    //             throw new Error('server error, could not save, show message to user');
    //         }
    //         return response.json();
    //     })
    //     .then(
    //         (data) => {
    //                 return {
    //                     message: 'Purchase complete!',
    //                     type: 'success',
    //                 };
    //         },
    //         (err) => {
    //                 return {
    //                     message: 'Purchase failed',
    //                     type: 'error',
    //                 };
    //         },
    //     );
    return new Promise((resolve) => setTimeout(resolve, 2500)).then(() => {
        return ['Purchase complete!', 'success'];
    });
};
