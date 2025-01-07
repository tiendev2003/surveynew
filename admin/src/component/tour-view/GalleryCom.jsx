import React, { useState, useEffect } from "react";
import axios from "axios";
import GalleryCard from "../cards/GalleryCard";
import LightBox from "./LightBox";

function GalleryCom({ images }) {
  const [openImg, setOpenImg] = useState(false);

  return (
    <div className="row">
      {images.map((image, index) => (
        <GalleryCard
          image={image}
          openImg={setOpenImg}
          id={index}
          className={image.width}
          key={index}
        />
      ))}

    </div>
  );
}


{/* <div className="gallery-container">
{images.map((image, index) => (
  <img key={index} src={image} alt={`Gallery Image ${index}`} />
))}
</div> */}

export default GalleryCom;
