import {
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
} from "react-bootstrap";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../services/auth";
import { signout } from "../Redux/slices/auth";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const signOutHandler = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      return;
    }
    try {
      const data = await signOut();
      dispatch(signout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <NavbarBrand href="/">Logo</NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <NavLink>Home</NavLink>
              </LinkContainer>
              {currentUser ? (
                <>
                  {currentUser.roles.includes("admin") && (
                    <LinkContainer to="/admin">
                      <NavLink>
                        <FaTachometerAlt />
                        Dashboard
                      </NavLink>
                    </LinkContainer>
                  )}
                  <LinkContainer to="/profile">
                    <NavLink>
                      <FaUser /> Profile
                    </NavLink>
                  </LinkContainer>
                  <LinkContainer to="/signout">
                    <NavLink onClick={signOutHandler}>
                      <FaSignOutAlt /> Sign Out
                    </NavLink>
                  </LinkContainer>
                </>
              ) : (
                <>
                  {location.pathname === "/signin" ? (
                    <LinkContainer to="/signup">
                      <NavLink>
                        <FaUser /> Sign Up
                      </NavLink>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/signin">
                      <NavLink>
                        <FaSignInAlt /> Sign In
                      </NavLink>
                    </LinkContainer>
                  )}
                </>
              )}
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
