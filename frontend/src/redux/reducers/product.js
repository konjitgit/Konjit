const initialState = {
  allProducts: [],
  isLoading: false,
  error: null,
  success:false
};
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "PRODUCT_LIST_SUCCESS":
      return {
        ...state,
        allProducts: action.payload,
        isLoading: false,
      };
    case "PRODUCT_LIST_FAIL":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "productCreateRequest":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "productCreateSuccess":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        success: true,
      };
    case "productCreateFail":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "getAllProductsShopRequest":
      return {
        ...state,
        loading: true,
      };
    case "getAllProductsShopSuccess":
      return {
        ...state,
        allProducts: action.payload,
        loading: false,
      };
    case "getAllProductsShopFailed":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "deleteProductRequest":
      return {
        ...state,
        isLoading: true,
      };
    case "deleteProductSuccess":
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    case "deleteProductFailed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "addReviewRequest":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "addReviewSuccess":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case "addReviewFail":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
