"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  const ImagSlider = [
    {
      image: "/pexels-chokniti-khongchum-1197604-2280547.jpg",
      title: "Modern Medical Labs",
      description:
        "Advanced equipment and expert care for precise diagnostics.",
    },
    {
      image: "/pexels-shvetsa-4225880.jpg",
      title: "Professional Doctors",
      description: "Meet our highly qualified team of medical specialists.",
    },
    {
      image: "/pexels-jonathanborba-3259624.jpg",
      title: "Patient-Focused Care",
      description: "We prioritize your comfort and health every step of the way.",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full h-[92vh] ">
      <Slider {...settings}>
        {ImagSlider.map((item, index) => (
          <div key={index} className="relative w-full h-[92vh] mt-20">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover w-full h-full rounded-lg"
            />

            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-6">
<h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
  {item.title}
</h2>
              <p className="max-w-2xl text-lg">{item.description}</p>
               {/* <button className="bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip bg-transparent">
              Get Startd
              <button/> */}
            </div>
           
          </div>
          
        ))}
      </Slider>
    </div>
  );
}
