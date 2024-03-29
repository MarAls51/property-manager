import { useUserAuth } from "../../Context/UserAuthContext";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import { getDocs, orderBy, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useGlobalFilter } from "react-table";
import { db } from "../../Context/firebase";
import { collection } from "firebase/firestore";
import { usersColumns } from "./UsersColumns";
import "./Table.css";
import { useSortBy } from "react-table";
import { GlobalFilter } from "./GlobalFIlter";
import { useState } from "react";
import { propertyColumns } from "./PropertyColumns";
import { jsPDF } from "jspdf";
import back from "../../Assets/backarrow.svg";
import forward from "../../Assets/forwardarrow.svg";
import view from "../../Assets/view.svg";
import trash from "../../Assets/trash.svg";
import download from "../../Assets/download.svg";
import autoTable from 'jspdf-autotable'
export const UsersTable = () => {
  const { usersData, userDataUpdated, setUserDataUpdated, adminAccount} =
    useUserAuth();
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
            id: "email",
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
          
        </tr>
      );
    });
  };

  async function handleDeleteUser(id) {
    try {
      const query = await doc(db, "Users", `${id}`);
      await deleteDoc(query);
      const date = new Date()
     setDoc(doc(db, "DeletedUsers", `${id}`), {
        DeleteDate: date.toString(),
      });
      setUserDataUpdated(!userDataUpdated);
    } catch (error) {
      console.log('Failed to delete user.');
    }
    return;
  }

  async function handleDownloadUser(id) {
    try {
      const data = await getDocs(
        collection(db, "Users", `${id}`, "Personal Items"),
        orderBy("Name", "desc")
      );
      var sum = 0
      const items = await Promise.all(
        data.docs.map(async (doc) => {
          sum += doc.data().Price
          return {
            ...doc.data()
          };
        })
      );
      var outputData = items.map( ({ Name, Price }) => ([Name, Price]) );
      const doc = new jsPDF()
      doc.setFontSize(10);
  
      autoTable(doc, {
        head: [['Name', 'Price (Dollars)']],
        body: outputData.map((el) => {
          return el;
        }),
        foot: [['Total', sum ]],
        showFoot: "lastPage",
      })
      doc.save("Properties.pdf");
    } catch (error) {
      console.log('Failed to download.');
    }
    return;
  }

  async function handleViewItem(id) {
    try {
      const data = await getDocs(
        collection(db, "Users", `${id}`, "Personal Items"),
        orderBy("Name", "asc")
      );
      const items = await Promise.all(
        data.docs.map(async (doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
      await setSelectedUsersData(items);
    } catch (error) {
      console.log('Failed to select user.');
    }

  }

  return (
    <>
      {selectedUsersData && (
        <div style={{
          backgroundColor: "#a7a4e0",
        }} className="p-2">
        <button
            style={{
              backgroundColor: "#a7a4e0",
              border: "none",
              outline: "none",
            }}
            onClick={() => {
             setSelectedUsersData();
            }}
          >
            <img alt="back" src={back} />
          </button>
        </div>
      )}
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
               {!selectedUsersData &&
              <th>Actions</th>}
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
                        {...cell.getCellProps()}
                      >
                       {cell.column.Header === "Price" && "$"}
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                     {!selectedUsersData && 
                  <td>
                 
                      <>
                        <button
                          onClick={() => {
                            handleViewItem(row.original.id);
                          }}
                          style={{
                            backgroundColor: "inherit",
                            border: "none",
                            outline: "none",
                          }}
                        >
                         <img alt="view" src={view}/>
                        </button>
                       {adminAccount && <button
                          onClick={() => {
                            handleDeleteUser(row.original.id);
                          }}
                          style={{
                            backgroundColor: "inherit",
                            border: "none",
                            outline: "none",
                          }}
                        >
                          <img alt="delete" src={trash}/>
                        </button>}
                        <button
                          onClick={() => {
                            handleDownloadUser(row.original.id);
                          }}
                          style={{
                            backgroundColor: "inherit",
                            border: "none",
                            outline: "none",
                          }}
                        >
                         <img alt="download" src={download}/>
                        </button>
                      </>
                  
                  </td>}
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
