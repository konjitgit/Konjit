import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { productReducer } from "./reducers/product";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { orderReducer } from "./reducers/order";
import { requestReducer } from "./reducers/request";
const Store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productReducer,
    user: userReducer,
    seller: sellerReducer,
    order: orderReducer,
    requests: requestReducer,
  },
});

export default Store;
