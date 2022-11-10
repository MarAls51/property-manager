import { useUserAuth } from "../../Context/UserAuthContext";

export const PropertyOverview = () => {
  const { itemsCount, itemsValue } = useUserAuth();
  return (
    <div className="row">
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Overview</h2>
        <div className="row">
          <div className="col">
            <div className="dashboard-box p-2 pt-3 pb-3">
              <div className="row">
                <div className="col text-start">
                  <h3>Total Items</h3>
                  {itemsCount <= 99999999 && <h4>{itemsCount}</h4>}
                  {itemsCount > 99999999 && <h4>99999999+</h4>}
                </div>
                <div className="col text-start">
                  <h3>Total Value</h3>
                  {itemsValue <= 9999999.99 && (
                    <h4>${itemsValue.toFixed(2)}</h4>
                  )}
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
