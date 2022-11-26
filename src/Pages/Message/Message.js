import React from "react";
import "./Message.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Chat } from "../../Components/ChatBox/Chat";
export const Message = () => {
  const { user, userDataUpdated, adminAccount, setUsersData, usersData } = useUserAuth();

  useEffect(
    () => {
      const fetchUsers = async () => {

        try {
          const data = await getDocs(collection(db, "Users"));
          const userAccounts = await Promise.all(
            data.docs.map(async (doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
          );
         
          let adminAccounts = [];
          if (adminAccount !== true) {
            const data2 = await getDocs(collection(db, "Admins"));
             adminAccounts = await Promise.all(
              data2.docs.map(async (doc) => {
                if (doc.id !== user.uid) {
                  return {
                    ...doc.data(),
                    id: doc.id,
                  };
                }
              })
            );
          }
          let allUsers = userAccounts;
          for(let i = 0; i < allUsers.length; i++){
            if(allUsers[i].id === user.uid){
              allUsers.splice(i, 1);
            }
          }
          if(adminAccount !== true){
          allUsers = userAccounts.concat(adminAccounts);
          }

          await setUsersData(allUsers);
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
    
    
          <>
           {usersData && <Chat></Chat>}
          </>
     
    
    </>
  );
};
