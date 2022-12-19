import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

export default function More() {
  let { userId, Message } = useContext(AuthContext);
  const api = useAxios();
  const go = useNavigate();
  function Search(e) {
    e.preventDefault();
    let value = e.target.searchbox.value;
    if (value) {
      go(`/friendsearch/${value}`);
    }
  }
  function improveSugg(e) {
    e.preventDefault();
    let data = e.target.suggestion.value;
    if (data) {
      api
        .post("improvesuggestion/", { sugg: data })
        .then((res) => {
          if (res.data.status === "success") {
            Message(
              "Your Message has been successfully sent... Thank You!! for sending your suggestion..."
            );
            e.target.suggestion.value = "";
          }
        })
        .catch((error) => {
          Message(`${error}`);
        });
    }
  }
  function feedBack(e) {
    e.preventDefault();
    let data = e.target.feedback.value;
    if (data) {
      api
        .post("feedback/", { feedback: data })
        .then((res) => {
          if (res.data.status === "success") {
            Message(
              "Your Message has been successfully sent... Thank You!! for sending your suggestion..."
            );
            e.target.feedback.value = "";
          }
        })
        .catch((error) => {
          Message(`${error}`);
        });
    }
  }
  return (
    <>
      <div id="more">
        <div className="container-mine flex">
          <div className="content">
            <div className="moresearch">
              <form onSubmit={Search}>
                <label htmlFor="more-search">Search People:</label>
                <input
                  type="text"
                  name="searchbox"
                  id="more-search"
                  placeholder="Search..."
                  required
                />
                <button>
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
            <div className="links">
              <div className="moreviewprofile">
                <span>View Profile</span>
                <Link to={`/profile/${userId}`}>Show</Link>
              </div>
              <div className="moreditprofile">
                <span>Edit Profile</span>
                <Link to="/profile/edits">Edit</Link>
              </div>
              <div className="moresaved">
                <span>Saved Posts</span>
                <Link to="/savedpost">Show</Link>
              </div>
            </div>
            <div className="moresuggestion">
              <form onSubmit={improveSugg}>
                <label htmlFor="more-sugg">
                  Your Suggestion for Improvement:
                </label>
                <div>
                  <textarea
                    cols="4"
                    type="text"
                    name="suggestion"
                    id="more-sugg"
                    placeholder="Your Suggestions..."
                    required
                  />
                  <button>Send</button>
                </div>
              </form>
            </div>
            <div className="moresuggestion">
              <form onSubmit={feedBack}>
                <label htmlFor="more-fed">FeedBack:</label>
                <div>
                  <textarea
                    cols="4"
                    type="text"
                    name="feedback"
                    id="more-fed"
                    placeholder="Your Feedback..."
                    required
                  />
                  <button>Send</button>
                </div>
              </form>
            </div>
          </div>
          <div className="content">
            <div className="help">
              <h4>Help</h4>
              <p>
                You can view friend post in home and you can view category wised
                post from explore section but this section is not limited to
                your friends post.you can post your images from post section but
                be carefull with multiple images if images aspect ratio is not
                same all the images is cropped according to first selected image
                and you can edit post by clicking three dots icon at top right
                corner...
              </p>
            </div>
            <div className="contactus">
              <h4>Contact</h4>
              <p>
                If you find any kind of bug or issue you can report us on
                sumitaachaju@gmail.com or you can report bug from suggestion box
                for improvement...
              </p>
            </div>
            <div className="terms">
              <h4>Terms and Conditions</h4>
              <p>
                By using this website you have agreed to show your post and
                profile information to all user across this website...{" "}
              </p>
              <p style={{ textAlign: "center" }}>Thank You...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
