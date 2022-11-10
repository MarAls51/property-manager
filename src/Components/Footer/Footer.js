import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.css";

export const CustomFooter = () => {
  return (
    <Navbar bg="light" className="custom-nav">
      <Container>
        <h1 style={{color: "black"}}>Footer Placeholder</h1>
      </Container>
    </Navbar>
  );
};
