import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import SearchResults from "./screens/SearchResult.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import Survey from "./screens/Survey.jsx";
import ReactDOM from "react-dom/client"
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import DemographicStatistics from "./screens/statistics/DemographicStatistics.jsx";
import DietaryPreferences from "./screens/statistics/DietaryPreferences.jsx";
import EconomicAndSocial from "./screens/statistics/EconomicAndSocial.jsx";
import HealthAndDiet from "./screens/statistics/HealthAndDiet.jsx";
import NutritionalInsights from "./screens/statistics/NutritionalInsights.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/search-results" element={<SearchResults />} />
      {/* <Route path="/detail/:id" element={<ItemDetail />} />  */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/survey" element={<Survey />} />
       {/* Stats Routes */}
      <Route path="/statistics/demographic-statistics" element={<DemographicStatistics />} />
      <Route path="/statistics/dietary-preferences" element={<DietaryPreferences />} />
      <Route path="/statistics/economic-and-social" element={<EconomicAndSocial />} />
      <Route path="/statistics/health-diet" element={<HealthAndDiet />} />
      <Route path="/statistics/nutritional-insights" element={<NutritionalInsights />} />

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute/>}>
      <Route path="/profile" element={<ProfileScreen />} />
    </Route>
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
