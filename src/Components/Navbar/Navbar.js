import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";
import "./Navbar.css";

export const CustomNav = () => {
  const navigate = useNavigate();
  const {
    logOut,
    setUserData,
    setItemsCount,
    setItemsValue,
    setUsersData,
    setUsersCount,
    adminAccount,
    setAdminMode,
    adminMode,
    setAdminAccount,
  } = useUserAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      setAdminMode(false);
      setAdminAccount(false);
      setItemsCount(0);
      setItemsValue(0);
      setUserData([]);
      setUsersData([]);
      setUsersCount(0);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Navbar bg="light" className="custom-nav" expand="sm">
      <Container>
        <h1 style={{ color: "black" }}>Property Manager</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/messages");
              }}
            >
              Messages
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Nav.Link>
            {adminAccount && (
              <Nav.Link
                onClick={() => {
                  setAdminMode(!adminMode);
                }}
              >
                {adminMode && <span>AdminMode</span>}
                {!adminMode && <span>UserMode</span>}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
