
import { useState } from "react";
import { AddItems } from "./AddItems";
import { DisplayUsers } from "./DisplayUsers";
export const Users = () => {
  const [adding, setAdding] = useState(false);
  


  return (
    <div className="row mt-5">
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Items</h2>
        <div className="row">
          <div className="col">
            <div className="dashboard-box p-2 pt-3 pb-3" style={{minHeight: "792px"}}>
              {(!adding) && <DisplayUsers  setAdding={setAdding} />}
              {( adding) && <AddItems setAdding={setAdding} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};