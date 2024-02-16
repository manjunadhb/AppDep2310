import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicPath, setProfilePicPath] = useState("./images/noImage.png");

  let storeObj = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    firstNameInputRef.current.value =
      storeObj.loginReducer.userDetails.firstName;
    lastNameInputRef.current.value = storeObj.loginReducer.userDetails.lastName;
    ageInputRef.current.value = storeObj.loginReducer.userDetails.age;
    emailInputRef.current.value = storeObj.loginReducer.userDetails.email;

    mobileNoInputRef.current.value = storeObj.loginReducer.userDetails.mobileNo;
    let profilePicPath = `/${storeObj.loginReducer.userDetails.profilePic}`;
    setProfilePicPath(profilePicPath);
  }, []);

  let onUpdateProfile = async () => {
    let dataToSend = new FormData();

    dataToSend.append("fn", firstNameInputRef.current.value);
    dataToSend.append("ln", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "PUT",
      body: dataToSend,
    };

    let JSONData = await fetch(
      "/updateProfile",
      reqOptions
    );

    let JSOData = await JSONData.json();
    if (JSOData.status == "success") {
      alert(JSOData.msg);
    }
    console.log(JSOData);
  };

  return (
    <div className="App">
      <TopNavigation />
      <form>
        <h2>Edit Profile</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef} type="number"></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef} readOnly></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No.</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            onChange={(e) => {
              let selectedImagePath = URL.createObjectURL(e.target.files[0]);

              setProfilePicPath(selectedImagePath);
            }}
          ></input>
          <br></br>
          <img src={profilePicPath} className="profilePicPreview"></img>
        </div>

        {/* <button
          type="button"
          onClick={() => {
            onSignupUsingJSON();
          }}
        >
          Login(JSON)
        </button>

        <button
          type="button"
          onClick={() => {
            onSignupUsingURLE();
          }}
        >
          Login(URLE)
        </button> */}

        <button
          type="button"
          onClick={() => {
            onUpdateProfile();
          }}
        >
          Update Profile
        </button>
      </form>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default EditProfile;
