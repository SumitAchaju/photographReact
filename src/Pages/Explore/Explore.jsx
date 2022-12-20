import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../context/DataContext";

export default function Explore() {
  const{category} = useContext(DataContext)
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
