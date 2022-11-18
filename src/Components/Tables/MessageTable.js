import { useUserAuth } from "../../Context/UserAuthContext";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useGlobalFilter } from "react-table";
import { db } from "../../Context/firebase";
import { usersColumns } from "./UsersColumns";
import "./Table.css";
import { useSortBy } from "react-table";
import { GlobalFilter } from "./GlobalFIlter";
import { useState } from "react";
import { propertyColumns } from "./PropertyColumns";

export const MessageTable = (props) => {
  const { user, usersData, adminAccount, email} = useUserAuth();
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

  const handleMessage = async (id) => {
    try {
      const docCollection1 = adminAccount ? "Admins" : "Users";
      const docRef = await doc(db, docCollection1, `${user.uid}`);
      const colRef = await collection(docRef, "Messages");
      const date = await new Date();

      await addDoc(colRef, {
        text: `${email} opened a conversation on ${date.toString()}`,
        createdAt: new Date(),
        uid: user.uid,
        id: id,
        type: "Console",
      });

      let docCollection2 = "Users";
      const data = await getDoc(doc(db, "Admins", `${id}`));
      if (data.exists()) {
        docCollection2 = "Admins";
      }
      const docRef2 = await doc(db, docCollection2, `${id}`);
      const colRef2 = await collection(docRef2, "Messages");
      await addDoc(colRef2, {
        text: `${email} opened a conversation on ${date.toString()}`,
        createdAt: new Date(),
        uid: id,
        id: user.uid,
        type: "Console",
      });

      props.setSelectedItem({usersType: docCollection2,id:id});
      props.setMessaging(true);
      props.setViewing(false);
    } catch (error) {
      console.log(error.message);
    }
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
                          handleMessage(row.original.id);
                        }}
                      >
                        Message
                      </button>
                    </>
                  </td>
                </tr>
              </>
            );
          })}
          {page.length < 10 && <Test length={page.length} />}
        </tbody>
      </table>
      <div className="text-center">
        <span>
          Page {state.pageIndex + 1} of{" "}
          {pageOptions.length !== 0 && pageOptions.length}{" "}
          {pageOptions.length === 0 && 1}
        </span>
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => {
            nextPage();
          }}
          disabled={!canNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};
