import React from "react";
import "./Gui/scss/style.scss";
import { Routes,Route } from "react-router-dom";
import  PrivateRoutes  from "./utils/PrivateRouter";
import { AuthProvider } from "./context/AuthContext";

import Main from "./Components/Main";
import Login from "./Components/login";
import Register from "./Components/Register"
import Explore from './Components/Explore';
import Home from './Components/Home';
import Follow from "./Components/Follow";
import ExploreInner from "./Components/ExploreInner";



function App() {

  return (
    <>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<PrivateRoutes/>}>
        <Route path="/" element={<Main/>} exact={true}>
          <Route index element={<Home/>} />
          <Route path='/explore' element={<Explore/>} />
          <Route path='/follow' element={<Follow/>} />
          <Route path='/explore/:id' element={<ExploreInner/>} />
        </Route>
      </Route>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
