import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

export default function ProfileEdits() {
  const [userInfo, setUserInfo] = useState();
  const api = useAxios();
  let { userId, setUserData, Message } = useContext(AuthContext);
  useEffect(() => {
    api.get(`user/${userId}`).then((res) => setUserInfo(res.data));
  }, [userId]);

  const profileInfoSave = (e) => {
    e.preventDefault();
    if (
      e.target.firstname.value === e.target.firstname.defaultValue &&
      e.target.lastname.value === e.target.lastname.defaultValue &&
      e.target.email.value === e.target.email.defaultValue &&
      e.target.dob.value === e.target.dob.defaultValue &&
      e.target.skill.value === e.target.skill.defaultValue &&
      e.target.bio.value === e.target.bio.defaultValue
    ) {
      return;
    }
    const data = {
      first_name: e.target.firstname.value,
      last_name: e.target.lastname.value,
      email: e.target.email.value,
      date_of_birth: e.target.dob.value,
      skill: e.target.skill.value,
      bio: e.target.bio.value,
    };
    api.patch("updateprofile/", data).then((res) => {
      if (res.data.status === "success") {
        api.get(`user/${userId}`).then((res) => {
          setUserData(res.data);
          Message("profileInfo sucessfully updated!!");
        });
      } else if (res.data.status === "email exists") {
        Message("account with this email already exists!!");
      } else if (res.data.status === "error") {
        Message("invalid email");
      }
    });
  };

  const changeUsername = (e) => {
    e.preventDefault();
    if (e.target.username.value === e.target.username.defaultValue) {
      return;
    }
    api
      .patch("updateprofile/", {
        username: e.target.username.value
      })
      .then((res) => {
        if (res.data.status === "error") {
          Message("Username already taken!!");
        } else {
          Message("Username successfully updated");
        }
      });
  };

  const updateProfileImage = (e) => {
    e.preventDefault();
    const [file] = e.target.image.files;
    if (file) {
      let pattern = /image-*/;
      if (!file.type.match(pattern)) {
        Message("Invalid image format!!");
        return;
      }}
    if (e.target.image.files) {
      api
        .patch(
          "updateprofile/",
          { profile_image: e.target.image.files[0] },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          if (res.data.status === "error") {
            Message("Something went wrong!!");
          } else if (res.data.status === "success") {
            api.get(`user/${userId}`).then((res) => {
              setUserData(res.data);
              Message("Profile Picture sucessfully updated!!");
            });
          }
        });
    }
  };

  const changePassword = (e) => {
    e.preventDefault();
    if (e.target.newpass.value === e.target.confirmpass.value) {
      const data = {
        current_password: e.target.currentpass.value,
        password: e.target.newpass.value,
      };
      if (e.target.newpass.value.length < 8) {
        Message("password must be atleast 8 characters");
        return;
      }
      api.patch("changepassword/", data).then((res) => {
        if (res.data.status === "success") {
          Message("password sucessfully changed");
          e.target.currentpass.value = "";
          e.target.newpass.value = "";
          e.target.confirmpass.value = "";
        } else if (res.data.status === "wrong_current_password") {
          Message("Wrong Current Password");
        } else if (res.data.status === "Invalid_password") {
          Message("Too Comman Password !!");
        }
      });
    } else {
      Message("New Password and Confirm Password didnot Match!!");
      e.target.confirmpass.value = "";
      e.target.newpass.value = "";
    }
  };

  const preview = (e) => {
    const [file] = e.target.files;
    if (file) {
      let pattern = /image-*/;
      if (!file.type.match(pattern)) {
        Message("Invalid image format!!");
        return;
      }
      document.getElementById("preview").src = URL.createObjectURL(file);
    }
  };
  function showpassword(event) {
    let element = document.querySelector("#pe-np");
    if (element.type === "password") {
      element.type = "text";
      if (event.target.classList.contains("bi-eye-fill")) {
        event.target.classList.remove("bi-eye-fill");
        event.target.classList.add("bi-eye-slash-fill");
      }
    } else {
      element.type = "password";
      if (event.target.classList.contains("bi-eye-slash-fill")) {
        event.target.classList.add("bi-eye-fill");
        event.target.classList.remove("bi-eye-slash-fill");
      }
    }
  }
  function showcppassword(event) {
    let element = document.querySelector("#pe-cfp");
    if (element.type === "password") {
      element.type = "text";
      if (event.target.classList.contains("bi-eye-fill")) {
        event.target.classList.remove("bi-eye-fill");
        event.target.classList.add("bi-eye-slash-fill");
      }
    } else {
      element.type = "password";
      if (event.target.classList.contains("bi-eye-slash-fill")) {
        event.target.classList.add("bi-eye-fill");
        event.target.classList.remove("bi-eye-slash-fill");
      }
    }
  }
  if (!userInfo) {
    return null;
  }
  return (
    <>
      <div className="profile-edits">
        <div className="container-mine flex">
          <div className="content">
            <div className="profile-dis">
              <form onSubmit={profileInfoSave}>
                <h4>Profile Info</h4>
                <label htmlFor="pe-fm">First Name</label>
                <input
                  id="pe-fm"
                  name="firstname"
                  defaultValue={userInfo.first_name}
                  type="text"
                  required
                />
                <label htmlFor="pe-lm">Last Name</label>
                <input
                  id="pe-lm"
                  name="lastname"
                  defaultValue={userInfo.last_name}
                  type="text"
                  required
                />
                <label htmlFor="pe-em">Email</label>
                <input
                  id="pe-em"
                  name="email"
                  defaultValue={userInfo.email}
                  type="email"
                  required
                />
                <label htmlFor="pe-dob">Date Of Birth</label>
                <input
                  id="pe-dob"
                  name="dob"
                  defaultValue={userInfo.date_of_birth}
                  type="date"
                  required
                />
                <label htmlFor="pe-sk">Skills</label>
                <input
                  id="pe-sk"
                  name="skill"
                  defaultValue={userInfo.skill}
                  type="text"
                />
                <label htmlFor="pe-bio">Bio</label>
                <textarea
                  id="pe-bio"
                  name="bio"
                  defaultValue={userInfo.bio}
                  type="text area"
                />
                <button type="sumbit">Save</button>
              </form>
            </div>
          </div>
          <div className="content">
            <div className="profile-pic">
              <form onSubmit={changeUsername}>
                <h4>Change username</h4>
                <label htmlFor="pe-un">UserName</label>
                <input
                  name="username"
                  defaultValue={userInfo.username}
                  id="pe-un"
                  type="text"
                  required
                />
                <button type="sumbit">Change</button>
              </form>
              <form encType="multipart/form-data" onSubmit={updateProfileImage}>
                <label>Profile Picture</label>
                <img id="preview" src={userInfo.profile_image} alt="" />
                <label id="labelforprofile" htmlFor="pe-pp">
                  {" "}
                  Select Image
                  <input
                    name="image"
                    onChange={preview}
                    id="pe-pp"
                    accept="image/*"
                    type="file"
                    required
                  />
                  <i className="bi bi-camera-fill"></i>
                </label>
                <button type="sumbit">Change</button>
              </form>
            </div>
          </div>
          <div className="content">
            <div className="profile-password">
              <form onSubmit={changePassword}>
                <h4>Change Password</h4>
                <label htmlFor="pe-cp">Current Password</label>

                <input
                  id="pe-cp"
                  placeholder="previous password..."
                  name="currentpass"
                  type="text"
                  required
                />
                <label htmlFor="pe-np">New Password</label>
                <div className="showpassword">
                  <input
                    id="pe-np"
                    placeholder="enter password..."
                    name="newpass"
                    type="password"
                    required
                  />
                  <span
                    className="showpasswordtext"
                    onClick={(event) => showpassword(event)}
                  >
                    <i className="bi bi-eye-fill"></i>
                  </span>
                </div>
                <label htmlFor="pe-cfp">Confirm Password</label>
                <div className="showpassword">
                  <input
                    id="pe-cfp"
                    placeholder="enter password again..."
                    name="confirmpass"
                    type="password"
                    required
                  />
                  <span
                    className="showpasswordtext"
                    onClick={(event) => showcppassword(event)}
                  >
                    <i className="bi bi-eye-fill"></i>
                  </span>
                </div>
                <button type="sumbit">Change</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
