import React from "react";

function Bgvideo() {
  return (
    <div
      className="fixed left-0 top-0  w-full  "
      style={{
        zIndex: -1,
        backgroundColor: "rgba(7, 7, 7, 0.7)",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="w-full h-full object-cover "
      >
        <source src="/bgVideo.mp4" type="video/mp4" />
      </video>

      
    </div>
  );
}

export default Bgvideo;
