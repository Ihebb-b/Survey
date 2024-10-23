import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";


  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect style={{ margin: '0 auto', maxHeight: '55px' }}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Statistics observatory</Navbar.Brand>
          </LinkContainer>
          {!isAuthPage && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                  <LinkContainer to="/statistics">
                    <Nav.Link className="me-4">Statistics</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/reports">
                    <Nav.Link className="me-4">Reports</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <Nav.Link className="me-4">About</Nav.Link>
                  </LinkContainer>
                </Nav>

                <Nav className="ms-auto">
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <FaSignInAlt /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  )}
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
