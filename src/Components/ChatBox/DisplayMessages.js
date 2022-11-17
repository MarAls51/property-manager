import { useUserAuth } from "../../Context/UserAuthContext";
import { MessageTable } from "../Tables/MessageTable";

export const DisplayMessages = (props) => {
  const { userData } = useUserAuth();
  console.log("called DisplayMessages");
  console.log(userData, "userData");
  return (
    <>
      {userData && <MessageTable setSelectedItem={props.setSelectedItem} setMessaging={props.setMessaging} setViewing={props.setViewing} />}
    </>
  );
};
