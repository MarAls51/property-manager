import { useUserAuth } from "../../Context/UserAuthContext";
import { MessageTable } from "../Tables/MessageTable";

export const DisplayMessages = (props) => {
  const { userData } = useUserAuth();
  return (
    <>
      {userData && <MessageTable setSelectedItem={props.setSelectedItem} setMessaging={props.setMessaging} setViewing={props.setViewing} />}
    </>
  );
};
