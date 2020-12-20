const ADD_ITEM_TO_BASKET = "main-rducer/ADD_ITEM_TO_BASKET";
const REMOVE_ITEM_FROM_BASKET = "main-rducer/REMOVE_ITEM_FROM_BASKET";
const SET_USER = "main-rducer/SET_USER";
const EMPTY_BASKET = "main-rducer/EMPTY_BASKET";

export const initialState = {
  basket: [],
  user: null,
};

//Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

//Reducer

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_BASKET:
      return { ...state, basket: [...state.basket, action.item] };
    case REMOVE_ITEM_FROM_BASKET:
      const index = state.basket.findIndex((e) => e.id === action.id);
      const newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as its not in basket`
        );
      }
      return { ...state, basket: newBasket };
    case SET_USER:
      return { ...state, user: action.user };
    case EMPTY_BASKET:
      return { ...state, basket: [] };
    default:
      return state;
  }
};

export const addItemToBasketAC = (item) => ({
  type: ADD_ITEM_TO_BASKET,
  item,
});
export const removeItemFromBasketAC = (id) => ({
  type: REMOVE_ITEM_FROM_BASKET,
  id,
});
export const setUserAC = (user) => ({
  type: SET_USER,
  user,
});
export const emptyBasket = () => ({
  type: EMPTY_BASKET,
});
