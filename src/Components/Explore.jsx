import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';

export default function Explore() {
    const [category,setCategory] = useState([]);
    const api = useAxios()

    useEffect(()=>{
        api.get("/postcategory/").then(res=>setCategory(res.data))
    },[])

  return (
    <>
            <div id="explore">
        <div className="container-mine flex">
            {category.map(data=>
                            <div key={data.id} className="content">
                            <Link to={`/explore/${data.id}`}>
                            <div className="explore-img">
                                <img src={data.image} alt="travelimg"/>
                            </div>
                            <h4>{data.title}</h4>
                            <p>{data.discription}</p>
                            </Link>
                        </div>
                )}

            {/* <div className="content">
            <Link to="">
                <div className="explore-img">
                    <img src={require("../Gui/media/food.jpg")} alt="travelimg"/>
                </div>
                <h4>FOOD</h4>
                <p>Explore the different food items</p>
                </Link>
            </div>
            <div className="content">
            <Link to="">
                <div className="explore-img">
                    <img src={require("../Gui/media/tiger.jpg")} alt="travelimg"/>
                </div>
                <h4>WILDLIFE</h4>
                <p>Explore the animals</p>
                </Link>
            </div>
            <div className="content">
            <Link to="">
                <div className="explore-img">
                    <img src={require("../Gui/media/house.jpg")} alt="travelimg"/>
                </div>
                <h4>HOUSE</h4>
                <p>Explore the houses</p>
                </Link>
            </div>
            <div className="content">
            <Link to="">
                <div className="explore-img">
                    <img src={require("../Gui/media/fashion.jpg")} alt="travelimg"/>
                </div>
                <h4>FASHION</h4>
                <p>Explore the fashions </p>
                </Link>
            </div>
            <div className="content">
            <Link to="">
                <div className="explore-img">
                    <img src={require("../Gui/media/nature.jpg")} alt="travelimg"/>
                </div>
                <h4>NATURE</h4>
                <p>Explore the beauty of nature</p>
                </Link>
            </div> */}
        </div>
    </div>
    </>
  )
}
