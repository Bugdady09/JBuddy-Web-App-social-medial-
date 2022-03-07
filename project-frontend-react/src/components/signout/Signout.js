import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UseContext";
import { useHistory } from "react-router-dom";

function Signout(props) {
  const { isLogin, setIslogin } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    localStorage.clear();
    setIslogin(false);
    history.push("/signin");
  });

  return <div></div>;
}

export default Signout;
