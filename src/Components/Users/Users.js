
import { useState } from "react";
import { AddItems } from "./AddItems";
import { DisplayUsers } from "./DisplayUsers";
export const Users = () => {
  const [adding, setAdding] = useState(false);
  


  return (
   
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Items</h2>
        <div className="row">
          <div className="col">
          
              {(!adding) && <DisplayUsers  setAdding={setAdding} />}
              {( adding) && <AddItems setAdding={setAdding} />}
        
          </div>
        </div>
      </div>
  );
};