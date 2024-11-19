import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../slices/authSlice";
import logo from '../assets/logo.png';

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
    <header >
      <Navbar
        variant="dark"
        className="header"
      >
        <Container fluid >
          <LinkContainer to="/">       
          <div className="flex items-center"> {/* Added a div to wrap the image and brand */}
          <img
            alt="MMD Statistica Logo"
            style={{ width: "40px", height: "40px", marginLeft: "5px", backgroundImage: `url(${logo})`}} // Adjust width, height, and spacing as needed
          />
          <Navbar.Brand className="text-lg text-white sm:text-xl md:text-2xl">
            Statistics Observatory
          </Navbar.Brand>
        </div>
          </LinkContainer>

          {!isAuthPage && (
            <Nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 mx-auto">
              <div className="relative group hidden sm:block">
                <Nav.Link className="text-white">Statistics</Nav.Link>
                <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 mt-1 w-64 sm:w-72 md:w-80 lg:w-96 z-50">
                  <LinkContainer to="/statistics/demographic-statistics">
                    <NavDropdown.Item className="p-2 hover:bg-white rounded">
                      Demographic Statistics
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/health-diet">
                    <NavDropdown.Item className="p-2 hover:bg-white rounded">
                      Health and Diet-Related Statistics
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/economic-and-social">
                    <NavDropdown.Item className="p-2 hover:bg-white rounded">
                      Economic and Social Statistics
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/dietary-preferences">
                    <NavDropdown.Item className="p-2 hover:bg-white rounded">
                      Dietary Preferences and Frequency
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/statistics/nutritional-insights">
                    <NavDropdown.Item className="p-2 hover:bg-white rounded">
                      Nutritional Insights
                    </NavDropdown.Item>
                  </LinkContainer>
                </div>
              </div>

              <LinkContainer to="/reports">
                <Nav.Link className="text-white hidden sm:inline">
                  Reports
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="text-white hidden md:inline">
                  About
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/survey">
                <Nav.Link className="text-white hidden md:inline">
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
                className="hidden sm:inline text-white"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="text-white">
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
