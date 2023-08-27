import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function PopUpMsg() {
  let { msg, trigger, setTrigger } = useContext(AuthContext);
  const closePopUp = () => {
    let modal = document.getElementById("myModal1");
    modal.style.display = "none";
    setTrigger(false);
  };
  window.addEventListener("click", function (event) {
    let modal = document.getElementById("myModal1");
    if (event.target === modal) {
      setTrigger(false);
      modal.style.display = "none";
    }
  });
  return (
    <>
      <div className="popup">
        <div id="myModal1" className="modal">
          {trigger ? (
            <div className="modal-content">
              <div className="modal-header">
                <span onClick={closePopUp} className="close">
                  ×
                </span>
                <h2>Message</h2>
              </div>
              <div className="modal-body">
                <p className="popupmsg">{msg}</p>
                <button id="popupmsgdelete" onClick={closePopUp}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
