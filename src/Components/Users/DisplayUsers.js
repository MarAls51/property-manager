import { useUserAuth } from "../../Context/UserAuthContext";
import { UsersTable } from "../Tables/UsersTable";
export const DisplayUsers = (props) => {
  const { userData } = useUserAuth();
  return (
    <>
      {userData && <UsersTable />}
    </>
  );
};
