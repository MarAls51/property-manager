import React from "react";
import { Items } from "../../Components/Items/Items";
import { CustomNav } from "../../Components/Navbar/Navbar";
import { Overview } from "../../Components/Overview/Overview";
import "./Dashboard.css";
import { collection, getDocs} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { CustomFooter } from "../../Components/Footer/Footer";
import { orderBy } from "firebase/firestore";
export const Dashboard = () => {
  const { user, setUsers, setUserData, userDataUpdated, setItemsCount, setItemsValue, setNumberOfUsers} = useUserAuth();

  useEffect(
    () => {
      const fetchUsers = async () => { 
        const users = await getDocs(collection(db, "Users"));
        let usersArray = [];
        users.forEach((doc) => {
          usersArray.push({Id: doc.id});
        });
        await setUsers(usersArray);
        await setNumberOfUsers(usersArray.length);
      }

      const fetchUserData = async () => {
        try {
          const data = await getDocs(
            collection(db, "Users", `${user.uid}`, "Personal Items"), orderBy("Name", "asc")
          );
          var count = 0
          var value = 0
          const items = await Promise.all(
            data.docs.map(async (doc) => {
                count++
                value += doc.data().Price
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
          );
          await setItemsCount(count)
          await setItemsValue(value)
          await setUserData(items)
        } catch (error) {
          console.log(error.message);
        }
      };

      if (Object.keys(user).length > 0) {
        fetchUserData();
      }

      fetchUsers();
    },
    // eslint-disable-next-line
    [user, userDataUpdated]
  );

  return (
    <>
      <CustomNav></CustomNav>
      <div className="dashboard-wrapper pt-5 pb-5">
        <div className="container">
          <Overview></Overview>
          <Items></Items>
        </div>
      </div>
      <CustomFooter></CustomFooter>
    </>
  );
};
