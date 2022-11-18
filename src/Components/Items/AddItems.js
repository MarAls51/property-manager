import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
export const AddItems = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState();

   
  
    const handleAddItem = async (e) => {
       e.preventDefault();
        if(name !== "" && !isNaN(price))
        try {
            const query = await doc(db, "Users", `${user.uid}`);
            const colRef = await collection(query, "Personal Items");
            await addDoc(colRef, {
              Name: name,
              Price: Number(price),
            });
            setUserDataUpdated(!userDataUpdated);
          } catch (error) {
            console.log(error.message);
          }
    };
  
  const { user, setUserDataUpdated, userDataUpdated} = useUserAuth();

  return (
   <>
              <div className="p-3" style={{backgroundColor: "white"}}>
                <span onClick={()=>{props.setAdding(false)}}>Back</span>
              <Form onSubmit={handleAddItem}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <label for="formBasicName">Item Name</label>
                      <Form.Control
                        type="text"
                        placeholder="Item Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPrice">
                      <label for="formBasicPrice">Price</label>
                      <Form.Control
                        type="text"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <div className="d-grid">
                      <button className="mb-4 btn login-btn" type="Submit">
                        Add Item
                      </button>
                    </div>
                  </Form>
                 
              </div>
              
</>
  );
};