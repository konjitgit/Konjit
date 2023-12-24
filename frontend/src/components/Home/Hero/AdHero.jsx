import React, { useState, useEffect, useMemo } from "react";

function AdHero() {
  const [imageIndex, setImageIndex] = useState(0);
  const images = useMemo(
    () => ["/images/ad1.jpg", "/images/ad2.jpg", "/images/SellerSignUp.jpg"],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);
  return (
    <div className="mx-auto w-[90%] h-[50v] mt-[130px]">
      <img
        src={images[imageIndex]}
        alt="Dynamic"
        className="w-full h-[400px] rounded-lg mt-10 object-cover"
      />
    </div>
  );
}

export default AdHero;
