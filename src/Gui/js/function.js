export const profile_dropdown = () => {
  if (document.getElementById("profile_menu").style.display==="block") {
    document.getElementById("profile_menu")
      .style.display="none"
  } else {
    document
      .getElementsByClassName("header-profile-dropdown")[0]
      .style.display="block"
  }
};
