import React from "react";
import { CustomNav } from "../../Components/Navbar/Navbar";
import "./AccessedProperty.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { CustomFooter } from "../../Components/Footer/Footer";
import { Users } from "../../Components/Users/Users";
export const AccessedProperty = () => {
  const { user, userDataUpdated, adminAccount, setUsersData } = useUserAuth();

  useEffect(
    () => {
      const fetchUsers = async () => {

        try {
       
          let accessedAccountList = [];

          if (!adminAccount) {
            let accessedAccounts = await getDocs(
              collection(db, "Users", `${user.uid}`, "AccessedAccounts")
            );
            if (accessedAccounts.docs.length > 0) {
              accessedAccounts.forEach(async (doc) => {
                await accessedAccountList.push(doc.data());
                });
              }
            }

          await setUsersData(accessedAccountList);

        } catch (error) {
          console.log(error.message);
        }
      };

      if (user) {
        fetchUsers();
      }
    },

    // eslint-disable-next-line
    [user, userDataUpdated]
  );

  return (
    <>
      <CustomNav></CustomNav>
      <div className="dashboard-wrapper pt-5 pb-5">
        <div className="container">
              <Users />       
        </div>
      </div>
      <CustomFooter></CustomFooter>
    </>
  );
};
