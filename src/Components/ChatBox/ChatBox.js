import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import back from "../../Assets/backarrow.svg";
export const ChatBox = (props) => {
  const { adminAccount } = useUserAuth();

  const docCollection = adminAccount ? "Admins" : "Users";
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const sendMesssage = async (e) => {
    e.preventDefault();
    const chatObject1 = {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: user.uid,
      id: props.selectedItem.id,
      type: "sent",
    };
    const docRef = await doc(db, docCollection, `${user.uid}`);
    const colRef = await collection(docRef, "Messages");
    await addDoc(colRef, chatObject1);

    const chatObject2 = {
      text: formValue,
      createdAt: serverTimestamp(),
      uid: props.selectedItem.id,
      id: user.uid,
      type: "received",
    };

    const docRef2 = await doc(
      db,
      props.selectedItem.usersType,
      `${props.selectedItem.id}`
    );
    const colRef2 = await collection(docRef2, "Messages");
    await addDoc(colRef2, chatObject2);

    setMessageSent(!messageSent);
    setFormValue("");
  };

  useEffect(() => {
    const getMessages = async () => {
      const data = await getDocs(
        collection(db, docCollection, `${user.uid}`, "Messages")
      );
      let chatBoxMessages = [];
      data.docs.forEach(
        async (doc) => {
          if (doc.data().id === props.selectedItem.id) {
            chatBoxMessages.push(doc.data());
          }
        },
      );
      chatBoxMessages.sort(function(a,b){
        return a.createdAt - b.createdAt;
      })
      setMessages(chatBoxMessages)
    };
    getMessages();
  }, [messageSent]);

  const { user } = useUserAuth();

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
              props.setViewing(true);
              props.setMessaging(false);
            }}
          >
            <img src={back} />
          </button>
        </div>
        <div className="p-5">
          <div style={{height: "500px", border: "1px solid black", overflowY: "scroll"}} className="p-3">
        {messages.map(({ type, text }) => (
          <div key={text}>
            <p>
              {type}: {text}
            </p>
          </div>
        ))}
        </div>

        <Form onSubmit={sendMesssage}>
          <Form.Group className="d-grid">
            <Form.Control
              type="text"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type your message here"
              className="mb-4 mt-4"
            />
            <button className="mb-4 btn login-btn" type="Submit">
              Send
            </button>
          </Form.Group>
        </Form>
      </div>
      </div>
    </>
  );
};
