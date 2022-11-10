import { useUserAuth } from "../../Context/UserAuthContext";

export const Overview = () => {
  const { itemsCount, itemsValue, userPrivilege, numberOfUsers } = useUserAuth();
  const value = userPrivilege ? numberOfUsers : itemsValue;
  return (
    <div className="row">
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Overview</h2>
        <div className="row">
          <div className="col">
            <div className="dashboard-box p-2 pt-3 pb-3">
              <div className="row">
                <div className="col text-start">
                  {userPrivilege ? <h3>Number Of Users</h3> : <h3>Total Items</h3>}
                  {itemsCount <= 99999999 && <h4>{value}</h4>}
                  {itemsCount > 99999999 && <h4>99999999+</h4>}
                </div>
                <div className="col text-start">
                  {userPrivilege ?  null : <h3>Total Value</h3> }
                  {userPrivilege ?  null : itemsValue <= 9999999.99 && ( <h4>${itemsValue.toFixed(2)}</h4> )}
                  {itemsValue > 9999999.99 && <h4>$9999999.99+</h4>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
