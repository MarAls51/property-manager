
import { useUserAuth } from "../../Context/UserAuthContext";
import { Form } from "react-bootstrap";
import { useState } from "react";
export const EditItems = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();

  const { user, setUserDataUpdated, userDataUpdated } = useUserAuth();

  return (
    <>
      <div className="row">
        <span
          onClick={() => {
            props.setEditing(false);
          }}
        >
          Back
        </span>
        <Form>
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
        </Form>
        <div className="d-grid">
          <button className="mb-4 btn login-btn" type="Submit">
            Add Item
          </button>
        </div>
      </div>
    </>
  );
};
