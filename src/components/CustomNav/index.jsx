import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

import { toast } from "react-toastify";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("persist:root"); // Clear the persisted state
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="justify-end fixed top-0 left-0 right-0">
      <Container>
        <Navbar
          color="faded"
          light
          expand="md"
          className="bg-slate-200 shadow-md"
        >
          <NavbarBrand
            href="/"
            className="text-black mr-auto font-bold text-sm sm:text-xl flex flex-wrap"
          >
            Chat App
          </NavbarBrand>
          <NavbarToggler onClick={toggle} className="mr-2" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>
                  <span
                    onClick={handleSignOut}
                    className="text-black cursor-pointer"
                  >
                    Logout
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
