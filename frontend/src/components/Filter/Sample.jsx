function ProductCard({key,name,price,gender,category}){
    return (
      <div className="w-[259.89px] h-[477.99px] ">
        <div className="w-[258.87px] h-[477.99px] left-[1.02px] top-0 ">
          <div className="w-[258.87px] h-[460.98px] left-0 top-0  " />
          <div className="w-[199px] h-[148.15px] left-[0.08px] top-[329.84px] ">
            <div className="w-[84px] h-[59px] left-0 top-0  text-pink-800 text-md font-normal leading-[80px]">
              {category}
            </div>
            <div className="w-[72.08px] h-[59.15px] left-0 top-[89px]  text-stone-500 text-lg font-normal line-through leading-10">
              $40.00
            </div>
            <div className="w-[72.08px] h-[59.15px] left-[62.94px] top-[89px]  text-black text-xl font-bold leading-10">
              {price}
            </div>
            <div className="w-[199px] h-[42px] left-0 top-[48px]  text-black text-lg font-bold leading-10">
              {name}
            </div>
          </div>
        </div>
        <img
          className="w-[258.87px] h-[327.37px] left-0 top-[3.06px] "
          src="../assets/images/FragranceProducts.jpg"
          alt="lipstick"
        />
      </div>
    );
}
export default ProductCard;