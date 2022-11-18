import { useUserAuth } from "../../Context/UserAuthContext";
import { usePagination, useTable } from "react-table";
import { useMemo } from "react";
import { doc, deleteDoc, getDocs, orderBy} from "firebase/firestore";
import { useGlobalFilter } from "react-table";
import { db } from "../../Context/firebase";
import { collection, getDoc} from "firebase/firestore";
import { propertyColumns } from "./PropertyColumns";
import "./Table.css";
import { useSortBy } from "react-table";
import { GlobalFilter } from "./GlobalFIlter";
import { jsPDF } from "jspdf";
export const PropertyTable = (props) => {
  const { userData, userDataUpdated, setUserDataUpdated, user } = useUserAuth();

  const pTableColumns = useMemo(() => propertyColumns, []);
  const data = useMemo(() => userData, [userData]);

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
      columns: pTableColumns,
      data: data,
      initialState: {
        sortBy: [
          {
            id: "Name",
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
          <td>-</td>
        </tr>
      );
    });
  };

  async function handleDownloadItems() {
    try {
      const data = await getDocs(
        collection(db, "Users", `${user.uid}`, "Personal Items"),
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
      items.push({UserId: user.uid});
      const doc = new jsPDF()
      doc.setFontSize(10);
      for(let i = 0; i < items.length ; i++) {
        doc.text(JSON.stringify(items[i]), 20, 10 + i * 5);
      }
      doc.save("a4.pdf");
    } catch (error) {
      console.log(error.message);
    }
    return;
  }


  async function handleDeleteItem(id) {
    try {
      const query = await doc(db, "Users", `${user.uid}`);
      const colRef = await collection(query, "Personal Items");
      await deleteDoc(doc(colRef, id));
      setUserDataUpdated(!userDataUpdated);
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  async function handleEditButton(id) {
    try {
      const docRef = await doc(db, "Users", `${user.uid}`, "Personal Items", `${id}`);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists){
        props.setSelectedItem({...docSnap.data(), id: docSnap.id})
        props.setEditing(true)
      }
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  return (
    <>
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
                    <button
                      onClick={() => {
                        handleEditButton(row.original.id)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteItem(row.original.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        handleDownloadItems();
                      }}
                    >
                      Download
                    </button>
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
