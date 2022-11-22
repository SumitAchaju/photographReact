export const profile_dropdown = ()=>{
    if(document.getElementsByClassName("show-dropdown")[0]){
        document.getElementsByClassName("header-profile-dropdown")[0].classList.remove("show-dropdown")
    }
    else{
    document.getElementsByClassName("header-profile-dropdown")[0].classList.add("show-dropdown");
}
}