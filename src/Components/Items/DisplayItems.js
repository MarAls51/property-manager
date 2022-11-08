import { useUserAuth } from "../../Context/UserAuthContext";
import { Table } from "../Table/Table";
export const DisplayItems = (props) => {
  const { userData } = useUserAuth();
  return (
    <>
      <div className="row">
        <div className="col-12 text-end">
          <button
            onClick={() => {
              props.setAdding(true);
            }}
          >
            Add Item
          </button>
        </div>
      </div>
      { userData &&
<Table minRows={10}/>
}
    </>
  );
};
