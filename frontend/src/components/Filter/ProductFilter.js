import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { CSSTransition } from "react-transition-group";
import CustomSlider from "./CustomSlider";
import Collapsible from "react-collapsible";

const checkboxes = document.querySelectorAll(
  'input[type="checkbox"][name="sortby"]'
);
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
  });
});
const sortByOptions = [
  { name: "latest", label: "Latest" },
  { name: "bestSelling", label: "Best Selling" },
  { name: "lowToHigh", label: "Price: Low to High" },
  { name: "highToLow", label: "Price: High to Low" },
  { name: "topRated", label: "Top Rated" },
];
const locationOptions = [
  { name: "Addis Ababa", label: "Addis Ababa" },
  { name: "hawassa", label: "Hawassa" },
  { name: "diredawa", label: "Dire Dawa" },
  { name: "adama", label: "Adama" },
  { name: "mojo", label: "Mojo" },
  { name: "ziway", label: "Ziway" },
];

const genderOptions = [
  { name: "female", label: "Female" },
  { name: "male", label: "Male" },
  { name: "unisex", label: "UniSex" },
];
const ratingOptions = [
  { name: "oneStar", label: "⭐" },
  { name: "twoStars", label: "⭐⭐" },
  { name: "threeStars", label: "⭐⭐⭐" },
  { name: "fourStars", label: "⭐⭐⭐⭐" },
  { name: "fiveStars", label: "⭐⭐⭐⭐⭐" },
];

const useFilter = (initialFilter) => {
  const filterReducer = (state, action) => {
    switch (action.type) {
      case "UPDATE":
        return { ...state, [action.name]: action.value };
      case "RESET":
        return initialFilter;
      case "SET_MIN_PRICE":
        return {
          ...state,
          price: {
            ...state.price,
            minPrice: action.payload,
          },
        };

      case "SET_MAX_PRICE":
        return {
          ...state,
          price: {
            ...state.price,
            maxPrice: action.payload,
          },
        };
      default:
        return state;
    }
  };

  const [filter, dispatch] = useReducer(filterReducer, initialFilter);

  return [filter, dispatch];
};

const ProductFilter = ({ onFilterChange, filterData }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [miniPrice, setMinPrice] = useState("");
  const [maxiPrice, setMaxPrice] = useState("");
  const [filter, dispatch] = useFilter(
    {
      sortby: [],
      location: [],
      gender: [],
      rating: [],
      price: { minPrice: "", maxPrice: "" },
    },
    onFilterChange
  );
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      let filteredData = filterData;
      console.log(filter);
      const filterDataByLocation = (data, location) => {
        return data.filter((item) =>
          item.shop.address.toLowerCase().includes(location.toLowerCase())
        );
      };
      const sortDataByDiscountPrice = (data, sortOrder) => {
        return data.sort((a, b) => {
          return sortOrder === "lowToHigh"
            ? a.discountPrice - b.discountPrice
            : b.discountPrice - a.discountPrice;
        });
      };
      const sortDataByCreationDate = (data, sortOrder) => {
        return data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortOrder === "latest" ? dateB - dateA : 0;
        });
      };
      const filterDataByPriceRange = (data, minPrice, maxPrice) => {
        return data.filter(
          (item) =>
            item.discountPrice >= minPrice && item.discountPrice <= maxPrice
        );
      };
      if (filter.gender.length > 0) {
        filteredData = filteredData.filter((product) =>
          filter.gender.includes(product.gender.toLowerCase())
        );
      } 
      if (filter.sortby.length > 0) {
        const sortOption = filter.sortby[0];
        if (sortOption === "lowToHigh" || sortOption === "highToLow") {
          filteredData = sortDataByDiscountPrice(filteredData, sortOption);
          console.log(
            sortOption === "lowToHigh" ? "low to high" : "high to low"
          );
        } else if (sortOption === "latest") {
          filteredData = sortDataByCreationDate(filteredData, sortOption);
          console.log("latest");
        }
      } 
      if (filter.location.length > 0) {
        const validLocations = [
          "Addis Ababa",
          "Ziway",
          "Mojo",
          "Diredawa",
          "Adama",
          "Hawassa",
        ];
        filteredData = filteredData.filter((item) =>
          validLocations.some((location) =>
            item.shop.address.toLowerCase().includes(location.toLowerCase())
          )
        );
      }
      if (filter.price.minPrice !== "" && filter.price.maxPrice !== "") {
        console.log("innnn");
        const minPrice = filter.price.minPrice;
        const maxPrice = filter.price.maxPrice;
        filteredData = filterDataByPriceRange(filteredData, minPrice, maxPrice);
      }
      setMaxPrice("");
      setMinPrice("");
      onFilterChange(filteredData);
      dispatch({ type: "RESET" });
    },
    [filter, filterData, onFilterChange, dispatch]
  );

  const [priceRange, setPriceRange] = useState([(0, 0)]);
  const dropDownRef = useRef(null);

  const handelOnClick = () => {
    setShowFilter((prevState) => !prevState);
  };
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    const newMinPrice = e.target.value;
    dispatch({ type: "SET_MIN_PRICE", payload: newMinPrice });
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
    const newMaxPrice = event.target.value;
    dispatch({ type: "SET_MAX_PRICE", payload: newMaxPrice });
  };

  const handleClickOutside = (event, ref, setShowFilter) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowFilter(false);
    }
  };
  useEffect(() => {
    const handleClick = (event) =>
      handleClickOutside(event, dropDownRef, setShowFilter);
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  const renderCheckboxes = useMemo(
    () => (optionsArray, legendText) => {
      return optionsArray.map((option) => {
        const isSelected = filter[legendText.toLowerCase()]?.includes(
          option.name
        );
        return (
          <div
            key={option.name}
            className="list-reset leading-loose flex items-center"
          >
            <input
              type="checkbox"
              id={option.name}
              name={legendText.toLowerCase()}
              value={option.name}
              checked={isSelected}
              onChange={() =>
                dispatch({
                  type: "UPDATE",
                  name: legendText.toLowerCase(),
                  value: [option.name],
                })
              }
            />
            <svg viewBox="0 0 64 64" height="1em" width="1em">
              <path
                d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                pathLength="575.0541381835938"
                class="path"
              ></path>
            </svg>
            <label htmlFor={option.name} className="container1">
              {option.label}
            </label>
          </div>
        );
      });
    },
    [dispatch, filter]
  );

  const renderSelectedValues = (optionsArray, legendText) => {
    const selectedValues = filter[legendText.toLowerCase()];
    if (selectedValues && selectedValues.length > 0) {
      const labels = selectedValues.map(
        (value) =>
          optionsArray.find((option) => option.name === value)?.label || value
      );
      return (
        <p className="border-2 border-solid border-pink text-pink rounded px-2 py-1">
          {labels}
        </p>
      );
    } else {
      return "";
    }
  };
  const [isRotated, setIsRotated] = useState(false);

  const handleIconClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="">
      <div
        onClick={handelOnClick}
        className="filter  cursor-pointer bg-beige flex items-center justify-center w-fit p-1 rounded-xl"
      >
        <ion-icon name="filter-circle-outline" class="w-8 h-11"></ion-icon>
        <span>Filter</span>
      </div>
      <CSSTransition
        in={showFilter}
        timeout={300}
        classNames="overlay"
        unmountOnExit
        onEnter={() => setShowFilter(true)}
        onExited={() => setShowFilter(false)}
      >
        <div>
          <div ref={dropDownRef} className="drop-down relative bg-beige p-3">
            <ion-icon
              name="close-outline"
              class="z-10 absolute top-1 right-1  cursor-pointer w-6 h-8 hover:rotate-90 transition-all "
              onClick={handelOnClick}
            ></ion-icon>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="mx-auto flex flex-wrap justify-around ">
                <div className="container1 filter-group w-full md:w-1/5 px-4">
                  <legend className="font-bold md:block hidden mb-3 ">
                    Sort By
                  </legend>
                  <div className="checkboxes md:block hidden">
                    {" "}
                    {renderCheckboxes(sortByOptions, "sortby")}{" "}
                  </div>{" "}
                  <div className="collapsible  my-2 md:hidden block">
                    {" "}
                    <Collapsible
                      triggerTagName="span"
                      triggerStyle={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      trigger={
                        <>
                          {" "}
                          <span className="font-bold mb-3">Sort By</span>{" "}
                          <span className="plus-sign">
                            <ion-icon
                              name="add-outline"
                              class="w-6 h-8 "
                              style={{
                                transition: "transform 1s",
                                transform: isRotated ? "rotate(45deg)" : "none",
                              }}
                              onClick={handleIconClick}
                            ></ion-icon>
                          </span>{" "}
                        </>
                      }
                      triggerClassName="collapsible-trigger"
                    >
                      {" "}
                      <div className="collapsible-content">
                        {" "}
                        {renderCheckboxes(sortByOptions, "sortby")}{" "}
                      </div>{" "}
                    </Collapsible>{" "}
                  </div>
                  <hr className="h-0.5 bg-pink md:hidden" />
                </div>
                <div className="container1 filter-group w-full md:w-1/5 px-4">
                  <legend className="font-bold md:block hidden mb-3 ">
                    Location
                  </legend>
                  <div className="checkboxes md:block hidden">
                    {renderCheckboxes(locationOptions, "Location")}
                  </div>
                  <div className="collapsible my-2 md:hidden block">
                    <Collapsible
                      triggerClassName="collapsible-trigger"
                      triggerStyle={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      trigger={
                        <>
                          {" "}
                          <span className="font-bold mb-3">Location</span>{" "}
                          <span className="plus-sign">
                            <ion-icon
                              name="add-outline"
                              class="w-6 h-8 "
                              style={{
                                transition: "transform 1s",
                                transform: isRotated ? "rotate(45deg)" : "none",
                              }}
                              onClick={handleIconClick}
                            ></ion-icon>
                          </span>{" "}
                        </>
                      }
                    >
                      <div className="collapsible-content">
                        {renderCheckboxes(locationOptions, "Location")}
                      </div>
                    </Collapsible>{" "}
                  </div>
                  <hr className="h-0.5 bg-pink md:hidden" />
                </div>
                <div className="container1 filter-group w-full md:w-1/5 px-4">
                  <legend className="font-bold md:block hidden mb-3 ">
                    Gender
                  </legend>
                  <div className="checkboxes md:block hidden">
                    {renderCheckboxes(genderOptions, "Gender")}
                  </div>
                  <div className="collapsible my-2 md:hidden block">
                    <Collapsible
                      triggerStyle={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      trigger={
                        <>
                          {" "}
                          <span className="font-bold mb-3">Gender</span>{" "}
                          <span className="plus-sign">
                            <ion-icon
                              name="add-outline"
                              class="w-6 h-8 "
                              style={{
                                transition: "transform 1s",
                                transform: isRotated ? "rotate(45deg)" : "none",
                              }}
                              onClick={handleIconClick}
                            ></ion-icon>
                          </span>{" "}
                        </>
                      }
                      triggerClassName="collapsible-trigger"
                    >
                      <div className="collapsible-content">
                        {renderCheckboxes(genderOptions, "Gender")}
                      </div>
                    </Collapsible>{" "}
                  </div>
                  <hr className="h-0.5 bg-pink md:hidden" />
                </div>
                <div className="container1 filter-group w-full md:w-1/5 px-4">
                  <legend className="font-bold md:block hidden mb-3 ">
                    Rating
                  </legend>
                  <div className="checkboxes md:block hidden">
                    {renderCheckboxes(ratingOptions, "Rating")}
                  </div>
                  <div className="collapsible my-2 md:hidden block">
                    <Collapsible
                      triggerStyle={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      trigger={
                        <>
                          {" "}
                          <span className="font-bold mb-3">Rating</span>{" "}
                          <span className="plus-sign">
                            <ion-icon
                              name="add-outline"
                              class="w-6 h-8 "
                              style={{
                                transition: "transform 1s",
                                transform: isRotated ? "rotate(45deg)" : "none",
                              }}
                              onClick={handleIconClick}
                            ></ion-icon>
                          </span>{" "}
                        </>
                      }
                      triggerClassName="collapsible-trigger"
                    >
                      <div className="collapsible-content">
                        {renderCheckboxes(ratingOptions, "Rating")}
                      </div>
                    </Collapsible>{" "}
                  </div>
                  <hr className="h-0.5 bg-pink md:hidden" />
                </div>

                <div className="filter-group my-3 w-full md:w-1/5 px-4 ">
                  <legend className="font-bold mb-3">Price</legend>
                  <div>
                    <label htmlFor="minPrice">Minimum Price:</label>
                    <input
                      type="number"
                      id="minPrice"
                      onChange={handleMinPriceChange}
                      className=""
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice">Maximum Price:</label>
                    <input
                      type="number"
                      id="maxPrice"
                      onChange={handleMaxPriceChange}
                      className=""
                    />
                  </div>
                </div>
              </div>
              <div className="selected-values w-fit m-auto items-center justify-center flex flex-wrap gap-3">
                {renderSelectedValues(sortByOptions, "SortBy")}
                {renderSelectedValues(locationOptions, "Location")}
                {renderSelectedValues(genderOptions, "Gender")}
                {renderSelectedValues(ratingOptions, "Rating")}
                <p className="border-2 border-solid border-pink text-pink rounded px-2 py-1">
                  {miniPrice} - {maxiPrice}
                </p>
              </div>
              <button
                className="filter-submit-button w-fit rounded m-auto bg-pink px-3 py-1 text-white font-semibold hover:bg-black hover:scale-100 transition-all duration-500 "
                type="submit"
                onClick={handelOnClick}
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default ProductFilter;
