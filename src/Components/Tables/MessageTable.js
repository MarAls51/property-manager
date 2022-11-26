import { useUserAuth } from "../../Context/UserAuthContext";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import { doc, getDoc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";
import { useGlobalFilter } from "react-table";
import { db } from "../../Context/firebase";
import { usersColumns } from "./UsersColumns";
import "./Table.css";
import { useSortBy } from "react-table";
import { GlobalFilter } from "./GlobalFIlter";
import { useState } from "react";
import { propertyColumns } from "./PropertyColumns";
import back from "../../Assets/backarrow.svg";
import forward from "../../Assets/forwardarrow.svg";
import message from "../../Assets/mail.svg";
import grant from "../../Assets/unlock.svg";
import revoke from "../../Assets/lock.svg";

export const MessageTable = (props) => {
  const { user, usersData, adminAccount, email } = useUserAuth();

  const [access, setAccess] = useState(true);
  const [selectedUsersData, setSelectedUsersData] = useState();

  const columns = useMemo(() => {
    if (selectedUsersData) {
      return propertyColumns;
    } else return usersColumns;
  }, [selectedUsersData]);
  const data = useMemo(() => {
    if (selectedUsersData) {
      return selectedUsersData;
    } else return usersData;
  }, [usersData, selectedUsersData]);
  const {
    getTableProps,
    getTableBodyProps,
    canNextPage,
    pageOptions,
    state,
    canPreviousPage,
    headerGroups,
    nextPage,
    previousPage,
    page,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: {
        sortBy: [
          {
            id: "id",
            desc: false,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  const Test = (props) => {
    var maxSize = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    for (var i = 0; i < props.length; i++) {
      maxSize.pop();
    }
    return maxSize.map((tr) => {
      return (
        <tr>
          <td>-</td>
          <td>-</td>
          {selectedUsersData && <td>-</td>}
        </tr>
      );
    });
  };

  const handleMessage = async (id, email) => {
    try {
     
      
      

    
      let docCollection2 = "Users";
      const data = await getDoc(doc(db, "Admins", `${id}`));
      if (data.exists()) {
        docCollection2 = "Admins";
      }
    

      props.setSelectedItem({ usersType: docCollection2, id: id, Email: email });
      props.setMessaging(true);
      props.setViewing(false);
    } catch (error) {
      console.log(error.message);
    }
    return;
  };

  const grantAccess = async (id) => {
    try {
      const docRef2 = await doc(db, "Users", `${id}`);
      const colRef2 = await collection(docRef2, "AccessedAccounts");
      const query = await getDocs(await collection(docRef2, "AccessedAccounts"));
      let queryExists = false;
      query.forEach(async (document) => {
      if(document.data().id === user.uid){
        console.log("Already has access");
        queryExists = true;
        return;
        }
      });
      if(queryExists){
        return;
      }
      
        await addDoc(colRef2, {
          Email: email,
          User: true,
          id: user.uid,
        });
        console.log("Access Granted");
    } catch (error) {
      console.log(error.message);
    }
    setAccess(!access);
    return;
  };

  const revokeAccess = async (id) => {
    try {
      const docRef2 = await doc(db, "Users", `${id}`);
      const colRef2 = await collection(docRef2, "AccessedAccounts");
        const query = await getDocs(await collection(docRef2, "AccessedAccounts"));
        query.forEach(async (document) => {
        if(document.data().id === user.uid){
          await deleteDoc(doc(colRef2, document.id));
          }
        });
        console.log("Access Revoked");
    } catch (error) {
      console.log(error.message);
    }
    setAccess(!access);
    return;
  };

  return (
    <>
      {selectedUsersData && (
        <span
          onClick={() => {
            setSelectedUsersData();
          }}
        >
          Back
        </span>
      )}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        onClick={() => {
                          console.log(cell);
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.column.Header === "Price" && "$"}
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td>
                    <>
                      <button
                        onClick={() => {
                          handleMessage(row.original.id, row.original.Email);
                        }}
                        style={{
                          backgroundColor: "inherit",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <img alt="message" src={message}/>
                      </button>
                     {!adminAccount && <button
                        onClick={() => {
                          grantAccess(row.original.id);
                        }}
                        style={{
                          backgroundColor: "inherit",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        <img alt="grant access" src={grant}/>
                      </button>}
                      {!adminAccount && <button
                        onClick={() => {
                          revokeAccess(row.original.id);
                        }}
                        style={{
                          backgroundColor: "inherit",
                          border: "none",
                          outline: "none",
                        }}
                      >
                      <img alt="revoke access" src={revoke}/>
                      </button> }
                    </>
                  </td>
                </tr>
              </>
            );
          })}
          {page.length < 10 && <Test length={page.length} />}
        </tbody>
      </table>
      <div className="p-3" style={{ backgroundColor: "#a7a4e0" }}>
        <div className="text-center"></div>
        <div className="text-center">
          <button
            style={{
              backgroundColor: "#a7a4e0",
              border: "none",
              outline: "none",
              visibility: !canPreviousPage ? "hidden" : "visible",
            }}
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            <img alt="previous" src={back} />
          </button>
          <span>
            Page {state.pageIndex + 1} of{" "}
            {pageOptions.length !== 0 && pageOptions.length}{" "}
            {pageOptions.length === 0 && 1}
          </span>
          <button
            style={{
              backgroundColor: "#a7a4e0",
              border: "none",
              outline: "none",
              visibility: !canNextPage ? "hidden" : "visible",
            }}
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            <img alt="next" src={forward} />
          </button>
        </div>
      </div>
    </>
  );
};
