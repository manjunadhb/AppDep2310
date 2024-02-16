import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });

  useEffect(() => {
    if (storeObj.loginReducer.userDetails.email) {
    } else {
      navigate("/");
    }
  }, []);

  let onDeleteAccount = async () => {
    localStorage.clear();
    let dataToSend = new FormData();
    dataToSend.append("email", storeObj.loginReducer.userDetails.email);

    let reqOptions = {
      method: "delete",
      body: dataToSend,
    };

    let JSONData = await fetch("/deleteProfile", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      alert(JSOData.msg);
    } else {
      alert(JSOData.msg);
    }
  };

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/leaves">Leaves</NavLink>
      <NavLink to="/editProfile">Edit Profile</NavLink>
      <NavLink
        to="/"
        onClick={() => {
          onDeleteAccount();
        }}
      >
        Delete Profile
      </NavLink>
      <NavLink
        to="/"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Logout
      </NavLink>
    </nav>
  );
}

export default TopNavigation;
