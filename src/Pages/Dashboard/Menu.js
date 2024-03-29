import React from "react";
import "./Dashboard.css";
import { useUserAuth } from "../../Context/UserAuthContext";
import admin from "../../Assets/admin.svg";
import property from "../../Assets/property.svg";
import users from "../../Assets/users.svg";
import shared from "../../Assets/shared.svg";
import account from "../../Assets/account.svg";
export const Menu = () => {
  const { adminAccount, setSelectedItem} = useUserAuth();
  return (
    <>
        <div className="row justify-content-center align-items-center">
          <div className="col mb-3">
            <button
              onClick={() => {
                setSelectedItem("property");
              }}
              className="dashboard-button login-btn btn"
            >
              <img alt="" src={property}></img>
              <h3>Property</h3>
            </button>
          </div>
          <div className="col mb-3">
            <button onClick={() => {
                setSelectedItem("users");
              }} className="dashboard-button login-btn btn">
              <img alt="" src={users}></img>
              <h3>Users</h3>
            </button>
          </div>
        </div>
        <div className="row justify-content-center align-items-center">
        {!adminAccount && 
          <div className="col  mb-3">
            <button onClick={()=>{setSelectedItem("shared")}} className="dashboard-button login-btn btn">
              <img alt="" src={shared}></img>
              <h3>Shared</h3>
            </button>
       
          </div>
           }
            {adminAccount && (
        
        <div className="col-6 mb-3">
          <button className="dashboard-button login-btn btn" onClick={() => {
            setSelectedItem("admin");
          }}>
            <img alt="" src={admin}></img>
            <h3>Admin</h3>
          </button>
        </div>
   
    )}
          <div className="col  mb-3">
            <button className="dashboard-button login-btn btn" onClick={()=>setSelectedItem("account")}>
              <img alt="" src={account}></img>
              <h3>Account</h3>
            </button>
          </div>
        </div>
    </>
  );
};
