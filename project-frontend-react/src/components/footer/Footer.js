import React from "react";
import { Container, Navbar } from "react-bootstrap";

function Footer(props) {
  return (
    <Navbar fixed="bottom" className="bg-secondary text-white">
      <Container>
        <Navbar.Brand className="p-3 text-white">
          <p>Created by : Jonayed Bugdady</p>
          <p>Contact : ( +880 ) 1752932555</p>
          <p>Email: jonayed.bugdady@bjitgroup.com</p>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className=" text-white">
            Software Engineer @{" "}
            <a className=" text-warning" href="https://bjitgroup.com">
              BJIT limited
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;
