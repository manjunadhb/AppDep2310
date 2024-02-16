import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let [profilePicPath, setProfilePicPath] = useState("./images/noImage.png");

  let onSignupUsingJSON = async () => {
    let dataToSend = {
      fn: firstNameInputRef.current.value,
      ln: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };

    let JSONDataToSend = JSON.stringify(dataToSend);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      body: JSONDataToSend,
      headers: myHeader,
    };

    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);
  };

  let onSignupUsingURLE = async () => {
    let myHeader = new Headers();
    myHeader.append("Content-type", "application/x-www-form-urlencoded");

    let dataToSend = new URLSearchParams();

    dataToSend.append("fn", firstNameInputRef.current.value);
    dataToSend.append("ln", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);

    let reqOptions = {
      method: "POST",
      header: myHeader,
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  let onSignupUsingFD = async () => {
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
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);

    let JSOData = await JSONData.json();
    if (JSOData.status == "success") {
      alert(JSOData.msg);
    }
    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Sign Up</h2>
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
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
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
            onSignupUsingFD();
          }}
        >
          Sign Up(FD)
        </button>
      </form>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
