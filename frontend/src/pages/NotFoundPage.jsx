import React from 'react'

function NotFoundPage() {
  return (
    <div className=" bg-beige">
      {/* <video
        autoPlay
        muted
        className="mx-auto  w-screen h-screen object-contain"
      >
        <source src="/images/404.mp4" type="video/mp4" className="" />
      </video> */}
      <img
        src="/images/404err1.svg"
        className="mx-auto w-screen h-screen pt-10  object-contain"
      />
    </div>
  );
}

export default NotFoundPage
