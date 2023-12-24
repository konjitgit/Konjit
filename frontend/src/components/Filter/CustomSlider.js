import React, { useRef, useState, useEffect } from "react";

const CustomSlider = ({ currentValue, handelPriceChange,reset }) => {
  const sliderRef = useRef(null);

  const [value, setValue] = useState(currentValue);

  useEffect(() => {
    sliderRef.current.min = 0;
    sliderRef.current.max = 1000;
    sliderRef.current.step = 1;
  }, []);
 useEffect(() => {
   if (reset) {
     setValue(0);
   }
 }, [reset]);
  const handleChange = (e) => {
    const newValue = e.target.value;

    setValue(newValue);
    handelPriceChange([0, Number(newValue)]);

    document.documentElement.style.setProperty(
      "--thumb-position",
      `${newValue}%`
    );
  };

  const handleReset = () => {
    setValue(0);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-4/5">
        <span className="min text-brown pr-2 text-sm">0</span>
        <input
          type="range"
          ref={sliderRef}
          value={value}
          onChange={handleChange}
          className="slider w-full h-2.5 bg-f4d7ca rounded cursor-pointer"
        />
        <span className="max text-brown pl-2 text-sm">1k</span>
      </div>

      <div className="slider-label pt-2 text-brown text-lg">{value} $</div>
    </div>
  );
};

export default CustomSlider;
