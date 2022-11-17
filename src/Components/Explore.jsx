import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../utils/useAxios";

export default function Explore() {
  const [category, setCategory] = useState([]);
  const api = useAxios();

  useEffect(() => {
    api.get("/postcategory/").then((res) => setCategory(res.data));
  }, []);

  return (
    <>
      <div id="explore">
        <div className="container-mine flex">
          {category.map((data) => (
            <div key={data.id} className="content">
              <Link to={`/explore/${data.id}/`}>
                <div className="explore-img">
                  <img src={data.image} alt="travelimg" />
                </div>
                <h4>{data.title}</h4>
                <p>{data.discription}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
