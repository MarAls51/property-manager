import { useUserAuth } from "../../Context/UserAuthContext";
import { PropertyTable } from "../Tables/PropertyTable";
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
      {userData && <PropertyTable />}
    </>
  );
};
