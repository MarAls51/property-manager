import React from "react";
import { Items } from "../../Components/Items/Items";
import { CustomNav } from "../../Components/Navbar/Navbar";
import { PropertyOverview } from "../../Components/Overview/PropertyOverview";
import "./Dashboard.css";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { CustomFooter } from "../../Components/Footer/Footer";
import { orderBy } from "firebase/firestore";
import { UsersOverview } from "../../Components/Overview/UsersOverview";
import { Users } from "../../Components/Users/Users";
export const Dashboard = () => {
  const {
    user,
    setUserData,
    userDataUpdated,
    setItemsCount,
    setItemsValue,
    adminMode,
    adminAccount,
    setUsersCount,
    setUsersData,
  } = useUserAuth();
  useEffect(
    () => {
      const fetchUserData = async () => {
        try {
          const data = await getDocs(
            collection(db, "Users", `${user.uid}`, "Personal Items"),
            orderBy("Name", "asc")
          );
          var count = 0;
          var value = 0;
          const items = await Promise.all(
            data.docs.map(async (doc) => {
              count++;
              value += doc.data().Price;
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
          );
          await setItemsCount(count);
          await setItemsValue(value);
          await setUserData(items);
        } catch (error) {
          console.log(error.message);
        }
      };

      if (Object.keys(user).length > 0) {
        fetchUserData();
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

      if (Object.keys(user).length > 0) {
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
          {!adminAccount && !adminMode && (
            <>
              <PropertyOverview></PropertyOverview>
              <Items></Items>
            </>
          )}
          {adminAccount && !adminMode && (
            <>
              <PropertyOverview></PropertyOverview>
              <Items></Items>
            </>
          )}

          {adminAccount && adminMode && (
            <>
              <UsersOverview />
              <Users />
            </>
          )}
        </div>
      </div>
      <CustomFooter></CustomFooter>
    </>
  );
};
