import { useUserAuth } from "../../Context/UserAuthContext";

export const UsersOverview = () => {
  const { usersCount } = useUserAuth();
  return (
    <div className="row mb-5">
      <div className="col-12">
        <h2 style={{ color: "#4f43ae", fontWeight: "bold" }}>Overview</h2>
        <div className="row">
          <div className="col">
            <div className="dashboard-box p-2 pt-3 pb-3">
              <div className="row">
                <div className="col text-start">
                  <h3>Total Users</h3>
                  <h4>{usersCount}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
