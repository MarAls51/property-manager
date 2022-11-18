import { useUserAuth } from "../../Context/UserAuthContext";
import { PropertyTable } from "../Tables/PropertyTable";
import add from "../../Assets/add.svg"
export const DisplayItems = (props) => {
  const { userData } = useUserAuth();
  return (
    <>
      
        <div className="text-end"style={{backgroundColor: " #a7a4e0"}}>
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
