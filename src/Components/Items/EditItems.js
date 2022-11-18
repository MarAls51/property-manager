
import { useUserAuth } from "../../Context/UserAuthContext";
import { Form } from "react-bootstrap";
import { useState } from "react";
import back from "../../Assets/backarrow.svg";
export const EditItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();

  const { user, setUserDataUpdated, userDataUpdated } = useUserAuth();

  return (
    <>
   <div style={{ backgroundColor: "white" }}>
   <div className="p-3" style={{backgroundColor: "#a7a4e0"}}>
   <button
            style={{
              backgroundColor: "#a7a4e0",
              border: "none",
              outline: "none",
            }}
            onClick={() => {
              props.setEditing(false);
            }}
          >
            <img src={back} />
          </button>
        </div>
        <Form className="p-5">
          <Form.Group className="mb-3" controlId="formBasicName">
            <label for="formBasicName">Item Name</label>
            <Form.Control
              type="text"
              placeholder={props.selectedItem.Name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPrice">
            <label for="formBasicPrice">Price</label>
            <Form.Control
              type="text"
              placeholder={props.selectedItem.Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid">
          <button className="mb-4 btn login-btn" type="Submit">
            Add Item
          </button>
        </div>
        </Form>
      </div>
      <div className="p-3" style={{backgroundColor: "#a7a4e0"}}/>
    </>
  );
};
