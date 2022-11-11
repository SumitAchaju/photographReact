import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Slider (props) {
    const baseUrlImg = "http://127.0.0.1:8000";
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true,type:'fraction' }}
    >
        {props.images.map(image=>
        <SwiperSlide key={image.id}>
            <img
                    src={baseUrlImg + image.image}
                    alt=""
                  />
        </SwiperSlide>
        )}
    </Swiper>
  );
};