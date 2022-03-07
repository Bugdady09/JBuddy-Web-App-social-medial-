import "./App.css";
import Header from "./components/headers/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/signIn/SignIn";
import Signout from "./components/signout/Signout";
import { UserContext } from "./components/context/UseContext";
import React, { useState } from "react";

function App() {
  const [isLogin, setIslogin] = useState(false);

  return (
    <div className="full-body">
      <BrowserRouter>
        <UserContext.Provider value={{ isLogin, setIslogin }}>
          <Header></Header>
          <div className="content-gap"></div>
          <div>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signout">
              <Signout />
            </Route>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
