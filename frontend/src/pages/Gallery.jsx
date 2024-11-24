import React from 'react';
import "./Gallery.css";
import d3 from "../assets/images/d3.jpg";
import pic from "../assets/images/pic.jpg";
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";

const imgArray = [d3, pic, pic1, pic2, d3, pic, pic1, pic2, d3, pic, pic1, pic2, d3, pic, pic1, pic2];

export default function Gallery() {

  return (
    <main>
        {imgArray.map((imgSrc, index) => (
            <div key={index} className='image_container'>
                <img src={imgSrc} alt="img" />
            </div>
        ))}
    </main>
  )
}
