import React from "react";
import "./AccessedProperty.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";

import { Users } from "../../Components/Users/Users";
export const AccessedProperty = () => {
  const { user, usersData, userDataUpdated, adminAccount, setUsersData, setUsersCount } = useUserAuth();

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

  useEffect(
    () => {
      const fetchUsers = async () => {
        if (adminAccount) {
          try {
            const data = await getDocs(collection(db, "Users"));
            var count = 0;
            const items = await Promise.all(
              data.docs.map(async (doc) => {
                count++;
                return {
                  ...doc.data(),
                  id: doc.id,
                  email: doc.data().Email,
                };
              })
            );
            await setUsersCount(count);
            await setUsersData(items);
          } catch (error) {
            console.log(error.message);
          }
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
    
              {usersData && <Users />}       
     
    </>
  );
};
