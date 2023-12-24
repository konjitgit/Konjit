import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/actions/product";
import { categories } from "../Dropdown/categories";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import Collapsible from "react-collapsible";
function Rating({ value }) {
  // Round the value to the nearest 0.5
  const roundedValue = Math.round(value * 2) / 2;

  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (i < roundedValue) {
      return <FaStar className="full" style={{ color: "yellow" }} />;
    } else if (i === roundedValue && value % 1 !== 0) {
      return <FaStar className="half" style={{ color: "yellow" }} />;
    } else {
      return <FaStar className="empty" style={{ color: "yellow" }} />;
    }
  });

  console.log(stars);
  return <p className="rating flex">{stars}</p>;
}

const CreateProduct = () => {
  const { success, error,isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState({
    name: "",
    items: [{ title: "", subItems: [] }],
  });
  const [gender, setGender] = useState("");
  const [selection, setSelection] = useState("");
  const [selectionItem, setSelectionItem] = useState("");
  const [item, setItem] = useState("");
  const [subItem, setSubItem] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory((prevCategory) => ({
      ...prevCategory,
      name: selectedCategory,
    }));
    setSelection(selectedCategory);
    setItem("");
    setSubItem("");
  };

  const handleItemChange = (e) => {
    const selectedItem = e.target.value;
    setSelectionItem(selectedItem);
    setItem(selectedItem);
    setCategory((prevCategory) => {
      const updatedCategory = { ...prevCategory };
      const updatedItems = [...updatedCategory.items];
      updatedItems[0] = { ...updatedItems[0], title: selectedItem };
      updatedCategory.items = updatedItems;
      return updatedCategory;
    });
    setSubItem("");
  };

  const handleSubItemChange = (e) => {
    setSubItem(e.target.value);
    setCategory((prevCategory) => {
      const updatedCategory = { ...prevCategory };
      const updatedItems = [...updatedCategory.items];
      const updatedFirstItem = { ...updatedItems[0] };
      const updatedSubItems = [...updatedFirstItem.subItems];
      updatedSubItems[0] = e.target.value;
      updatedFirstItem.subItems = updatedSubItems;
      updatedItems[0] = updatedFirstItem;
      updatedCategory.items = updatedItems;
      return updatedCategory;
    });
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(
      addProduct({
        name,
        description,
        gender,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };
  const handlePreview = () => {
    setPreview(true);
  };
  return (
    <div className=" bg-white shadow rounded-[4px] p-3 ">
      <h5 className="text-3xl font-bold p-2 pt-3 pb-10 text-center">
        Sell your item
      </h5>
      {/* create product form */}
      <div className="flex justify-evenly flex-col items-center gap-11 md:gap-0 md:flex-row ">
        <form
          onSubmit={handleSubmit}
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          className="w-[95%] md:w-[40%] flex flex-col gap-8 shadow-lg p-10 rounded-md "
        >
          <div>
            <label className="pb-2  text-sm text-gray-500">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="mt-2 appearance-none block w-full  h-[35px] border-b border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-pink sm:text-sm"
              onChange={(e) => setName(e.target.value)}
              placeholder="Product name..."
              required
            />
          </div>

          <div>
            <label className="pb-2 text-sm text-gray-500">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              cols="3"
              required
              rows="5"
              type="text"
              name="description"
              value={description}
              className="mt-2 appearance-none block w-full pt-2 px-1 border border-gray-300  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-pink sm:text-sm rounded-lg"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your product description..."
            ></textarea>
          </div>

          <div>
            <label className="pb-2 text-sm text-gray-500">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px] cursor-pointer"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <optgroup>
                <option value="Choose gender">Choose gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="UniSex">Unisex</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="pb-2 text-sm text-gray-500">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={category.name}
              onChange={handleCategoryChange}
              required
            >
              <option value="Choose a category">Choose a category</option>
              {categories.map((category) => (
                <option value={category.name} key={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {category && (
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                value={item}
                onChange={handleItemChange}
              >
                <option value="">Choose an item</option>
                {categories
                  .find((cat) => cat.name === selection)
                  ?.items.map((item) => (
                    <option value={item.title} key={item.title}>
                      {item.title}
                    </option>
                  ))}
              </select>
            )}
            {item && (
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                value={subItem}
                onChange={handleSubItemChange}
              >
                <option value="">Choose a sub item</option>
                {categories
                  .find((cat) => cat.name === selection)
                  .items.find((itm) => itm.title === selectionItem)
                  ?.subItems.map((subItem) => (
                    <option value={subItem} key={subItem}>
                      {subItem}
                    </option>
                  ))}
              </select>
            )}
          </div>

          <div>
            <label className="pb-2 text-sm text-gray-500">Original Price</label>
            <input
              type="number"
              name="price"
              value={originalPrice}
              className="mt-2 appearance-none block w-full h-[35px] border-b border-gray-700  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-pink sm:text-sm"
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter your product price..."
            />
          </div>

          <div>
            <label className="pb-2 text-sm text-gray-500">
              Price (With Discount) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={discountPrice}
              className="mt-2 appearance-none block w-full h-[35px] border-b border-gray-700  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-pink sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter your product price with discount..."
              required
            />
          </div>

          <div>
            <label className="pb-2 text-sm text-gray-500">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={stock}
              className="mt-2 appearance-none block w-full h-[35px] border-b border-gray-700  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-pink sm:text-sm"
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter your product stock..."
            />
          </div>

          <div>
            <label className="pb-2">
              Upload Images <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name=""
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {images &&
                images.map((i) => (
                  <img
                    src={i}
                    key={i}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
            <br />
            <div>
              <input
                type="submit"
                value="Create"
                className="mt-2 bg-pink text-xl shadow-md hover:bg-[#3f0519] rounded-lg py-2 text-white cursor-pointer appearance-none text-center block w-full h-[45px] border border-gray-300  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-pink "
              />
            </div>
          </div>
          <div>
            <button
              onClick={handlePreview}
              className="mt-2 md:hidden bg-pink text-xl shadow-md hover:bg-[#3f0519] rounded-lg py-2 text-white cursor-pointer appearance-none text-center block w-full h-[45px] border border-gray-300  placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-pink "
            >
              Preview
            </button>
          </div>
        </form>

        <div
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          className=" flex-col border-2 border-pink p-5 w-[40%] h-fit bg-beige rounded-2xl  shadow-xl hidden md:flex"
        >
          <div>
            <div className="w-[50%]bg-green-100 flex flex-col items-center container gap-10">
              <img
                src={images[0]}
                key={images[0]}
                alt=""
                className="h-[120px] w-[120px] object-cover m-2"
              />
              <div className="w-full gap-2 grid md:grid-cols-4 grid-cols-2 justify-center items-center">
                <img
                  src={images[1]}
                  key={images[1]}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
                <img
                  src={images[2]}
                  key={images[2]}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
                <img
                  src={images[3]}
                  key={images[3]}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
                <img
                  src={images[4]}
                  key={images[4]}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              </div>
            </div>
          </div>
          <div className="pl-5 ">
            <p className="text-2xl font-bold pb-3">
              {name} <span className="opacity-0">ffff</span>
            </p>
            <div className="text-gray-600 ">
              {category.name}, {item}, {subItem}
              <span className="opacity-0">ffff</span>
            </div>
            <hr className="pb-3" />
            <div className="flex gap-3 items-center">
              <p>
                <span className="text-red-500 line-through">
                  $ {originalPrice}
                </span>
                <span className="opacity-0">f</span>
              </p>
              <p className="text-lg font-bold">
                ${discountPrice} <span className="opacity-0">ffff</span>
              </p>
            </div>
            <hr className="pb-3" />
            <div className="text-gray-600 ">
              {gender}
              <span className="opacity-0">ffff</span>
            </div>
            <hr className="pb-3" />
            <p className="text-xl text-gray-400">Stock {stock}</p>
            <hr className="pb-3" />
            <div className="flex  gap-4 items-center">
              <p className="text-3l">5 </p>
              <Rating value={5} />
            </div>
            <div className="flex justify-center py-5 items-center gap-2">
              <div className="addMinus border-2 px-10 py-3 w-1/3 border-black flex items-center justify-center gap-4">
                <div className=" border-black border-2 rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
                  <HiPlus size={18} />
                </div>
                <span>1</span>
                <div className=" border-gray-800 border-2 rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
                  <HiOutlineMinus size={16} />
                </div>
              </div>

              <div
                className={`cursor-pointer bg-pink w-2/3 rounded-[5px] px-10 py-3`}
              >
                <h1 className="text-white text-xl text-center font-[600]">
                  Add to cart
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-6 py-2">
              <AiFillHeart size={30} color="red" title="Remove from wishlist" />

              <span className="cursor-pointer">Add to wishlist</span>
            </div>

            <div className="description w-11/12 py-4">
              <div className="pt-6  border-b-2 border-rose-100">
                <Collapsible
                  triggerStyle={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  trigger={
                    <>
                      <span className="font-bold mb-3">Description</span>
                      <span className="plus-sign">
                        <ion-icon
                          name="add-outline"
                          class="w-6 h-8 "
                          style={{
                            transition: "transform 1s",
                          }}
                        ></ion-icon>
                      </span>
                    </>
                  }
                  triggerClassName="collapsible-trigger"
                >
                  <div className="description">{description}</div>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
        {preview && (
          <div
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            className=" flex-col border-2 border-pink p-5 w-[95%] h-fit bg-beige rounded-2xl  shadow-xl flex md:hidden"
          >
            <div>
              <div className="w-[90%] flex flex-col items-center  justify-center container mx-auto gap-10">
                <img
                  src={images[0]}
                  key={images[0]}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
                <div className="w-full gap-2 grid md:grid-cols-4 grid-cols-2 justify-center items-center place-items-center">
                  <img
                    src={images[1]}
                    key={images[1]}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                  <img
                    src={images[2]}
                    key={images[2]}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                  <img
                    src={images[3]}
                    key={images[3]}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                  <img
                    src={images[4]}
                    key={images[4]}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                </div>
              </div>
            </div>
            <div className="pl-5 ">
              <p className="text-2xl font-bold pb-3">
                {name} <span className="opacity-0">ffff</span>
              </p>
              <div className="text-gray-600 ">
                {category.name}, {item}, {subItem}
                <span className="opacity-0">ffff</span>
              </div>
              <hr className="pb-3" />
              <div className="flex gap-3 items-center">
                <p>
                  <span className="text-red-500 line-through">
                    $ {originalPrice}
                  </span>
                  <span className="opacity-0">f</span>
                </p>
                <p className="text-lg font-bold">
                  ${discountPrice} <span className="opacity-0">ffff</span>
                </p>
              </div>
              <hr className="pb-3" />
              <div className="text-gray-600 ">
                {gender}
                <span className="opacity-0">ffff</span>
              </div>
              <hr className="pb-3" />
              <p className="text-xl text-gray-400">Stock {stock}</p>
              <hr className="pb-3" />
              <div className="flex  gap-4 items-center">
                <p className="text-3l">5 </p>
                <Rating value={5} />
              </div>
              <div className="flex justify-center py-5 items-center gap-2 ">
                <div className="addMinus border-2 px-10 py-3 w-1/3 h-[48px] border-black flex items-center justify-center gap-4 rounded-[5px]">
                  <div className=" border-black border-2 rounded-full w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
                    <HiPlus size={15} />
                  </div>
                  <span>1</span>
                  <div className=" border-gray-800 border-2 rounded-full w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
                    <HiOutlineMinus size={15} />
                  </div>
                </div>

                <div
                  className={`cursor-pointer bg-pink w-2/3 rounded-[5px] px-10 py-3`}
                >
                  <h1 className="text-white text-base text-center  font-[600]">
                    Add to cart
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-6 py-2">
                <AiFillHeart
                  size={30}
                  color="red"
                  title="Remove from wishlist"
                />

                <span className="cursor-pointer">Add to wishlist</span>
              </div>

              <div className="description w-11/12 py-4">
                <div className="pt-6  border-b-2 border-rose-100">
                  <Collapsible
                    triggerStyle={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    trigger={
                      <>
                        <span className="font-bold mb-3">Description</span>
                        <span className="plus-sign">
                          <ion-icon
                            name="add-outline"
                            class="w-6 h-8 "
                            style={{
                              transition: "transform 1s",
                            }}
                          ></ion-icon>
                        </span>
                      </>
                    }
                    triggerClassName="collapsible-trigger"
                  >
                    <div className="description">{description}</div>
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
