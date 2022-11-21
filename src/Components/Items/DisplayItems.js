import { useUserAuth } from "../../Context/UserAuthContext";
import { PropertyTable } from "../Tables/PropertyTable";
import add from "../../Assets/add.svg"
import { orderBy } from "firebase/firestore";
import { db } from "../../Context/firebase";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import autoTable from 'jspdf-autotable'
import jsPDF from "jspdf";
import download from "../../Assets/download.svg";
export const DisplayItems = (props) => {
  const { userData, itemsValue } = useUserAuth();

  async function handleDownloadUser(id) {
    try {
      
     
      var outputData = userData.map( ({ Name, Price }) => ([Name, Price]) );
      const doc = new jsPDF()
      doc.setFontSize(10);
  
      autoTable(doc, {
        head: [['Name', 'Price (Dollars)']],
        body: outputData.map((el) => {
          return el;
        }),
        foot: [['Total', itemsValue  ]],
        showFoot: "lastPage",
      })
      doc.save("Properties.pdf");
    } catch (error) {
      console.log(error.message);
    }
    return;
  }
  return (

    
    <>
      
        <div className="text-end"style={{backgroundColor: " #a7a4e0"}}>
        <button style={{backgroundColor: "#a7a4e0", border: "none", outline: "none"}}
            onClick={() => {
              handleDownloadUser()
            }}
          >
            <img src={download}></img>
          </button>
          
          <button style={{backgroundColor: "#a7a4e0", border: "none", outline: "none"}}
            onClick={() => {
              props.setAdding(true);
            }}
          >
            <img src={add}></img>
          </button>
        </div>
     
      {userData && <PropertyTable setSelectedItem={props.setSelectedItem} setEditing={props.setEditing} />}
    </>
  );
};
