import { useLocation, useNavigate } from "react-router-dom";

// In the component containing the Sign In button
const SignInButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // Redirect to login with "from" parameter set to the current location
    navigate("/login", { state: { from: location } });
  };

  return <button onClick={handleSignInClick}>Sign In</button>;
};

export default SignInButton;
