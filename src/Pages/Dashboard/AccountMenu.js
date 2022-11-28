import React from "react";
import "./Dashboard.css";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import shared from "../../Assets/shared.svg";
import { useNavigate } from "react-router-dom";
export const AccountMenu = () => {
  const { user, adminAccount, setEmail, setUserData, setSelectedItem, setUsersData, setItemsCount, setItemsValue, setUsersCount, logOut, setAdminMode, setAdminAccount } = useUserAuth();
  const navigate = useNavigate()
  async function handleDeleteUser() {
    try {
    let query;
    if(adminAccount) {
       query = await doc(db, "Admins", `${user.uid}`);
    } else {
       query = await doc(db, "Users", `${user.uid}`);
    }
      await deleteDoc(query);
      const date = new Date()
     setDoc(doc(db, "DeletedUsers", `${user.uid}`), {
        DeleteDate: date.toString(),
      });
      await handleLogout();
    } catch (error) {
      console.log('Failed to logout');
    }
    return;
  }

  const handleLogout = async () => {
    try {
      await logOut();
      setAdminMode(false);
      setAdminAccount(false);
      setItemsCount(0);
      setItemsValue(0);
      setUserData([]);
      setEmail("");
      setUsersData([]);
      setUsersCount(0);
      setSelectedItem("")
      navigate("/");
    } catch (error) {
      console.log('Failed to logout.');
    }
  };
  return (
    <>
        <div className="row mt-2 justify-content-center align-items-center">
          <div className="col  mb-3">
            <button onClick={()=> handleDeleteUser()} className="dashboard-button login-btn btn">
              <img alt="" src={shared}></img>
              <h3>Delete Account</h3>
            </button>
          </div> 
        <div className="col-6 mb-3">
          <button className="dashboard-button login-btn btn" onClick={() => {
            handleLogout();
          }}>
            <img alt="" src={shared}></img>
            <h3>Logout</h3>
          </button>
        </div>
        </div>
    </>
  );
};
