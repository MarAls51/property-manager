import { DisplayItems } from "./DisplayItems";
import { useState } from "react";
import { AddItems } from "./AddItems";
import { EditItems } from "./EditItems";
export const Items = () => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Items</h2>
        <div className="row">
          <div className="col">
            <div>
              {(!adding && !editing) && <DisplayItems setSelectedItem={setSelectedItem} setAdding={setAdding} setEditing={setEditing}  />}
              {( adding && !editing) && <AddItems setAdding={setAdding} />}
              {( !adding && editing) && <EditItems selectedItem={selectedItem} setEditing={setEditing}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
