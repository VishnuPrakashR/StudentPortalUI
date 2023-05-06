import {  Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const SidebarBox = styled(Nav)`
  min-height: 89vh !important;
  width: auto;
  z-index: 100;
  padding: 12px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
`;
const Sidebar = () => {
  return (
        <Navbar className="flex-grow-1">
          <Navbar.Toggle />
            <SidebarBox
              className="d-none d-md-block bg-light sidebar flex-grow-1"
              activeKey="/dashboard"
            >
              <div className="sidebar-sticky"></div>
              
              <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/my-course">My Course</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/fees">Fees</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/signout">Signout</Nav.Link>
              </Nav.Item>
            </SidebarBox>
        </Navbar>
  );
};
export default Sidebar;
