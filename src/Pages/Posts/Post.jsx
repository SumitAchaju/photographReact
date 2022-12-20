import React from "react";
import { useState } from "react";
import useAxios from "../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import DataContext from "../../context/DataContext";

export default function Post() {
  const [Preview, setPreview] = useState(() => []);
  const api = useAxios();
  const go = useNavigate();
  let { Message } = useContext(AuthContext);
  const {categoryPost} = useContext(DataContext)
  function clearPreview() {
    setPreview([]);
  }

  const removeDuplicates = (arr) => {
    let unique = [];
    let uniquename = [];
    arr.forEach((element) => {
      if (!uniquename.includes(element.name)) {
        unique.push(element);
        uniquename.push(element.name);
      }
    });
    return unique;
  };

  const preview = (e) => {
    const files = e.target.files;
    if (files) {
      let pattern = /image-*/;
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.match(pattern)) {
          Message("Invalid image format!!");
          return;
        }
      }
    }
    setPreview(removeDuplicates([...Preview, ...files]));
  };

  const uploadPost = (e) => {
    e.preventDefault();
    if (Preview.length === 0) {
      Message("no image is selected");
      return;
    }
    let checkedbox = document.querySelectorAll("input[type=checkbox]:checked");
    if (checkedbox.length === 0) {
      Message("you must select atleast one category!");
      return;
    }
    let categoryid = [];
    for (let i = 0; i < checkedbox.length; i++) {
      categoryid.push(checkedbox[i].value);
    }
    let data = {
      images: Preview,
      discription: e.target.discription.value,
      category: categoryid,
    };
    go(`/loading`);
    api
      .post("uploadpost/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.status === "success") {
          Message("Successfully Uploaded Post!!");
          go(`/singlepost/${res.data.postid}`);
          return;
        } else {
          Message("Something went wrong!!");
        }
      });
  };
  return (
    <>
      <div className="container-mine flex">
        <div className="content uploadpost">
          <p>Upload Posts</p>
          <div
            style={
              Preview.length === 0 ? { display: "none" } : { display: "block" }
            }
            className="imagepreview"
          >
            <p>Selected Image</p>
            <div className="imagepreviewbox">
              {Preview.map((p) => (
                <img
                  key={Preview.indexOf(p)}
                  src={URL.createObjectURL(p)}
                  alt=""
                />
              ))}
              <button className="clearpreview" onClick={clearPreview}>
                Clear All
              </button>
            </div>
          </div>
          <div className="selectimageform">
            <form>
              <label htmlFor="uploadimage">
                Select Image
                <input
                  name="image"
                  onChange={preview}
                  id="uploadimage"
                  accept="image/*"
                  type="file"
                  required
                  multiple
                />
                <i className="bi bi-camera-fill"></i>
              </label>
            </form>
          </div>
          <div className="imageuploadguide">
            <p>
              Select image by pressing "ctrl" for selection of multiple images..
            </p>
            <p>
              Please try to upload images of same aspect ratio while uploading
              multiple images otherwise all the images will be croped according
              to size of first selected image
            </p>
          </div>
          <div className="discatform">
            <form onSubmit={uploadPost}>
              <label className="discatformlabel" htmlFor="disform">
                Description:
              </label>
              <textarea name="discription" id="disform" required rows="4" />
              <label className="selectimagecat" htmlFor="catform">
                Select Image Category:
              </label>
              <div id="catform">
                {categoryPost.map((data) => (
                  <label key={data.id} className="catform">
                    {data.title}
                    <input
                      value={data.id}
                      type="checkbox"
                      defaultChecked={data.id === 1 ? "checked" : null}
                      readOnly={data.id === 1 ? true : null}
                    />
                    <span className="checkmark" />
                  </label>
                ))}
              </div>
              <button>Upload</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
