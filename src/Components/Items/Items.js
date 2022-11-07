import { db } from "../../Context/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { addDoc, collection, doc } from "firebase/firestore";
export const Items = () => {
  const { user, setUserDataUpdated, userDataUpdated, userData } = useUserAuth();
  async function addItem() {
    try {
      const query = await doc(db, "Users", `${user.uid}`);
      const colRef = await collection(query, "Personal Items");
      await addDoc(colRef, {
        Name: "Porsche",
        Price: 100000,
      });
      setUserDataUpdated(!userDataUpdated);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Items</h2>
        <div className="row">
          <div className="col">
            <div className="dashboard-box p-2 pt-3 pb-3">
              <div className="row">
                <div className="col-12 text-end">
                  <button
                    onClick={() => {
                      addItem();
                    }}
                  >
                    Add Item
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h4>Name</h4>
                </div>
                <div className="col">
                  <h4>Price</h4>
                </div>
              </div>
              {userData &&
            userData.map((items) => {
              return (
                <div className="row"key={items.id}>
                  <div className="col">
                    <h4>{items.Name}</h4>
                  </div>
                  <div className="col">
                    <h4>${items.Price.toFixed(2)}</h4>
                  </div>
                </div>
              );
            })}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
