import { useState } from "react";
import { Navigation, Pagination, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

export default function Slider(props) {
  const baseUrlImg = "https://sumitachaju.pythonanywhere.com";
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  let img = new Image();
  img.onload = () => {
    // let imgheight = img.height;
    // let imgwidth = img.width;
    // let aspectratio = imgwidth / imgheight;
    // let height = document.querySelector(".content").offsetWidth / aspectratio;
    // if (imgheight > imgwidth) {
    //   height = height - height / 15;
    // }
    // setHeight(height);
    setWidth(img.width);
    setHeight(img.height);
  };
  img.src = baseUrlImg + props.images[0].image;
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true, type: "fraction" }}
    >
      {props.images.map((image) => (
        <SwiperSlide key={image.id}>
          <img
            style={{ objectFit: "cover",aspectRatio:`${width}:${height}` }}
            // height={`${height}px`}
            src={baseUrlImg + image.image}
            alt=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
