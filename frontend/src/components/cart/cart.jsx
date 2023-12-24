import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import CartSingle from "./CartSingle";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };
  const getTotalPrice = () => {
    const totalPrice = cart.reduce((accumulator, product) => {
      const productPrice = product.discountPrice; // Assuming the price property exists in the product object
      return accumulator + productPrice;
    }, 0);

    return totalPrice;
  };

  const total = getTotalPrice();
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-10 bg-black bg-opacity-90">
      <div className="overflow-y-scroll fixed top-0 right-0 w-full sm:w-[65%] md:w-[50%] lg:w-[40%]  h-full flex flex-col  bg-white shadow-sm">
        <ion-icon
          name="close-outline"
          class="z-10 absolute top-2 right-2  cursor-pointer w-6 h-8 hover:rotate-90 transition-all "
          onClick={() => setOpenCart(false)}
        ></ion-icon>

        <div className=" pt-4 flex flex-col gap-">
          <div className=" p-4 flex flex-col">
            <p className="text-3xl p-2 py-4 font-medium drop-shadow-xl">Your Bag</p>
            <div className="bg-beige w-full h-fit flex justify-between py-4 px-6 rounded-sm shadow-lg">
              <p>Item</p>
              <p>Price</p>
            </div>
          </div>

          <div className="w-full  min-h-[450px]">
            <div>
              {cart &&
                cart.map((i, index) => {
                  console.log(index);
                  return (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  );
                })}
            </div>
          </div>
          <div className=" p-4  flex flex-col">
            <div className="bg-beige w-full h-fit flex justify-center gap-2 items-end py-4 px-6 rounded-sm shadow-lg">
              <p>Total Price : </p>
              <p className="text-xl font-bold">{total} ETB</p>
            </div>
          </div>
          <div className="px-5 mb-3">
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-pink rounded-[5px] shadow-black shadow-md hover:bg-black transition-all`}
              >
                <h1 className="text-white text-[20px] font-[600]">Checkout</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};




export default Cart;
