import React from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

export default function PopUpModel() {
  let { editId, edited, setEdited, Message } = useContext(AuthContext);
  const [postData, setPostData] = useState({});
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const api = useAxios();

  const closePopUp = () => {
    setPostData({});
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.getElementById("popupedit").style.display = "block";
    document.getElementById("popupdelete").style.display = "block";
  };

  window.addEventListener("click", function (event) {
    let modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
      setPostData({});
      document.getElementById("popupedit").style.display = "block";
      document.getElementById("popupdelete").style.display = "block";
    }
  });
  const editPost = () => {
    console.log(editId);
    api.get(`/Post/${editId}`).then((res) => {
      setPostData(res.data);
      setCategoryId(res.data.category.map((data) => data.id));
    });
    api.get("/postcategory/").then((res) => setCategory(res.data));
    document.getElementById("popupedit").style.display = "none";
    document.getElementById("popupdelete").style.display = "none";
  };
  const deletePost = () => {
    api.get(`deletepost/${editId}`).then((res) => {
      if (res.data.status === "success") {
        if (edited) {
          setEdited(false);
        } else {
          setEdited(true);
        }
        closePopUp();
        Message("Successfully deleted Post");
      }
    });
  };
  const updatePost = (e) => {
    e.preventDefault();
    let checkedbox = document.querySelectorAll("input[type=checkbox]:checked");
    if (checkedbox.length === 0) {
      alert("you must select atleast one category!");
      return;
    }
    let categoryid = [];
    for (let i = 0; i < checkedbox.length; i++) {
      if (checkedbox[i].value === "on") {
        continue;
      }
      categoryid.push(checkedbox[i].value);
    }
    let data = {
      discription: e.target.discrip.value,
      category: categoryid,
    };
    api.post(`updatepost/${editId}`, data).then((res) => {
      if (res.data.status === "success") {
        if (edited) {
          setEdited(false);
        } else {
          setEdited(true);
        }
        closePopUp();
        Message("Successfully Updated Post");
      }
    });
  };

  return (
    <>
      <div className="popup">
        {/* Trigger/Open The Modal */}
        {/* <button onClick={popUp} id="myBtn">Open Modal</button> */}
        {/* The Modal */}
        <div id="myModal" className="modal">
          {/* Modal content */}
          <div className="modal-content">
            <div className="modal-header">
              <span onClick={closePopUp} className="close">
                ×
              </span>
              <h2>Edit Post</h2>
            </div>
            <div className="modal-body">
              <button id="popupedit" onClick={editPost}>
                Edit
              </button>
              {postData.id ? (
                <form onSubmit={updatePost}>
                  <label htmlFor="diseditpost">Description:</label>
                  <textarea
                    defaultValue={postData.caption}
                    name="discrip"
                    id="diseditpost"
                    rows="4"
                    required
                  />
                  <label className="selectimagecat" htmlFor="catform">
                    Select Image Category:
                  </label>
                  <div id="catform">
                    {category.map((data) => (
                      <label key={data.id} className="catform">
                        {data.title}
                        <input
                          value={data.id}
                          type="checkbox"
                          defaultChecked={
                            categoryId.includes(data.id) ? "checked" : null
                          }
                        />
                        <span className="checkmark" />
                      </label>
                    ))}
                  </div>
                  <button>update</button>
                </form>
              ) : null}
              <button id="popupdelete" onClick={deletePost}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
