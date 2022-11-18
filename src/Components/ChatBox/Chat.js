
import { useState } from 'react';
import { DisplayMessages } from './DisplayMessages';
import { ChatBox } from './ChatBox';
export const Chat = () => {
  const [viewing, setViewing] = useState(true);
  const [messaging, setMessaging] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})

  return (
    <div className="row">
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Users</h2>
        <div className="row">
          <div className="col">
           
              {(viewing && !messaging) && <DisplayMessages setSelectedItem={setSelectedItem} setViewing={setViewing} setMessaging={setMessaging}  />}
              {( messaging && !viewing) && <ChatBox selectedItem={selectedItem} setViewing={setViewing} setMessaging={setMessaging} />}
            </div>
          </div>
     
      </div>
    </div>
  );
};