import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from './offers-slice';

export interface CheckoutSlice {
    isSide: boolean;
    loading: boolean;
    view: ViewEnum;
    offer: PrizeoutOffer;
    option: PrizeoutOfferValueOptions;
    showAlert: boolean;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isSide: true,
    loading: false,
    offer: null,
    option: null,
    showAlert: false,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutOffer(state, action: PayloadAction<PrizeoutOffer>) {
            const currentOffer = state.offer?.giftcard_list[0]?.checkout_value_id;
            const newOffer = action.payload.giftcard_list[0].checkout_value_id;
            //allow the offer to be unselected
            state.option = null;
            state.offer = currentOffer == newOffer ? null : action.payload;
        },
        setCheckoutOfferOption(state, action: PayloadAction<PrizeoutOfferValueOptions>) {
            state.option = action.payload;
        },
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        setShowAlert(state, action: PayloadAction<boolean>) {
            state.showAlert = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        toggleIsSide(state) {
            // TODO: Check screen size to determine if it's side or bottom
            state.isSide = !state.isSide;
        },
    },
});

export const {
    setCheckoutOffer,
    setCheckoutOfferOption,
    setCheckoutView,
    toggleIsLoading,
    toggleIsSide,
    setShowAlert,
} = checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectCheckoutIsSide = ({ checkout }: RootState): boolean => {
    return checkout.isSide;
};
export const selectShowAlert = ({ checkout }: RootState): boolean => {
    return checkout.showAlert;
};

export const selectCheckoutOffer = ({ checkout }: RootState): PrizeoutOffer => {
    return checkout.offer;
};
export const selectCheckoutOfferOption = ({ checkout }: RootState): PrizeoutOfferValueOptions => {
    return checkout.option;
};

export default checkoutSlice.reducer;
