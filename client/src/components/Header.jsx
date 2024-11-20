import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header>
      <Navbar variant="dark" className="header">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand className="logo">
              <img
                alt="MMD Statistica Logo"
                src={logo}
                style={{
                  width: "40px",
                  height: "40px",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
              MMD Statistica
            </Navbar.Brand>
          </LinkContainer>

          {!isAuthPage && (
            <Nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 mx-auto">
              <div className="relative group hidden sm:block">
                <Nav.Link className="nav-link">Statistics &#x25BE;</Nav.Link>
                <div className="custom-dropdown-nav">
                  <LinkContainer to="/statistics/demographic-statistics">
                    <NavDropdown.Item className="nav-item">
                      Demographic Statistics
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/health-diet">
                    <NavDropdown.Item className="nav-item">
                      Health and Diet-Related Statistics
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/economic-and-social">
                    <NavDropdown.Item className="nav-item">
                      Economic and Social Statistics
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/dietary-preferences">
                    <NavDropdown.Item className="nav-item">
                      Dietary Preferences and Frequency
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/nutritional-insights">
                    <NavDropdown.Item className="nav-item">
                      Nutritional Insights
                    </NavDropdown.Item>
                  </LinkContainer>
                </div>
              </div>

              <LinkContainer to="/reports">
                <Nav.Link className="nav-link hidden sm:inline">
                  Reports
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="nav-link hidden md:inline">
                  About
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/survey">
                <Nav.Link className="nav-link hidden md:inline">
                  Survey
                </Nav.Link>
              </LinkContainer>
            </Nav>
          )}

          <Nav className="flex items-center space-x-4">
            {userInfo ? (
              <NavDropdown
                title={userInfo.name}
                id="username"
                className="hidden sm:inline"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item className="nav-item">Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item className="nav-item" onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              
             
            ) : (
              <LinkContainer to="/login">
                <Nav.Link >
                  <FaSignInAlt className="inline-block mr-1" /> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
