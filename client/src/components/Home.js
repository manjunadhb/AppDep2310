import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function Home() {
  let storeObj = useSelector((store) => {
    console.log(store);
    return store;
  });

  return (
    <div>
      <TopNavigation />
      <h1>
        Welcome {storeObj.loginReducer.userDetails.firstName}{" "}
        {storeObj.loginReducer.userDetails.lastName}
      </h1>
      <img src={`/${storeObj.loginReducer.userDetails.profilePic}`}></img>
    </div>
  );
}

export default Home;
