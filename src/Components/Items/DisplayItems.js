import { useUserAuth } from "../../Context/UserAuthContext";
import { PropertyTable } from "../Tables/PropertyTable";
import { getDocs, orderBy } from "firebase/firestore";
import { db } from "../../Context/firebase";
import { collection } from "firebase/firestore";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import add from "../../Assets/add.svg";
import download from "../../Assets/download.svg";
export const DisplayItems = (props) => {
  const { user, userData } = useUserAuth();
  async function handleDownloadUser() {
    try {
      let data;
        data = await getDocs(
          collection(db, "Users", `${user.uid}`, "Personal Items"),
          orderBy("Name", "desc")
        );
      var sum = 0;
      const items = await Promise.all(
        data.docs.map(async (doc) => {
          sum += doc.data().Price;
          return {
            ...doc.data(),
          };
        })
      );
      var outputData = items.map(({ Name, Price }) => [Name, Price]);
      const doc = new jsPDF();
      doc.setFontSize(10);

      autoTable(doc, {
        head: [["Name", "Price (Dollars)"]],
        body: outputData.map((el) => {
          return el;
        }),
        foot: [["Total", sum]],
        showFoot: "lastPage",
      });
      doc.save("Properties.pdf");
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  return (
    <>
      <div className="text-end" style={{ backgroundColor: " #a7a4e0" }}>
        <button
          style={{
            backgroundColor: "#a7a4e0",
            border: "none",
            outline: "none",
          }}
          onClick={() => {
            props.setAdding(true);
          }}
        >
          <img alt="add item" height={"30px"} width={"30px"}src={add}></img>
        </button>
        <button
          onClick={() => {
            handleDownloadUser()
          }}
          style={{
            backgroundColor: "inherit",
            border: "none",
            outline: "none",
          }}
        >
          <img alt="download" height={"30px"} width={"30px"} src={download} />
        </button>
      </div>

      {userData && (
        <PropertyTable
          setSelectedItem={props.setSelectedItem}
          setEditing={props.setEditing}
        />
      )}
    </>
  );
};
