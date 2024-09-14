import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import User from "./pages/User";
import Hotel from "./pages/Hotel";
import AddHotel from "./pages/AddHotel";
import Hoteldetail from "./pages/Hoteldetail";
import AdminPendingHotelsPage from "./pages/AdminPendingHotelsPage";
import { AuthProvider } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../src/theme";
import Notifcation from "./pages/Notification";
import Userdetail from "./pages/Userdetail";
import HotelEdit from "./pages/HotelEdit";
import EditHotel from "./pages/EditHotel";
import Transaction from "./pages/Transaction";
import Room from "./pages/Room";
import AddUser from "./components/AddUser";
import Login from "./pages/Login";

const App: React.FC = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = getTheme(isDarkMode);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <AuthProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route
                path="/users"
                element={
                  <Layout>
                    <User />
                  </Layout>
                }
              />
              <Route
                path="/hotels"
                element={
                  <Layout>
                    <Hotel />
                  </Layout>
                }
              />
              <Route
                path="/add-hotel"
                element={
                  <Layout>
                    <AddHotel />
                  </Layout>
                }
              />
              <Route
                path="/hotels/:hotelId"
                element={
                  <Layout>
                    <Hoteldetail />
                  </Layout>
                }
              />
              <Route
                path="/hotels/edit/:hotelId"
                element={
                  <Layout>
                    <EditHotel />
                  </Layout>
                }
              />
              <Route
                path="/users/:userId"
                element={
                  <Layout>
                    <Userdetail />
                  </Layout>
                }
              />

              <Route
                path="/pending-hotels"
                element={
                  <Layout>
                    <AdminPendingHotelsPage />
                  </Layout>
                }
              />
              <Route
                path="/transaction"
                element={
                  <Layout>
                    <Transaction />
                  </Layout>
                }
              />
              <Route path="/admin-login" element={<Login />} />
              <Route
                path="/notification"
                element={
                  <Layout>
                    <Notifcation />
                  </Layout>
                }
              />
              <Route
                path="/rooms"
                element={
                  <Layout>
                    <Room />
                  </Layout>
                }
              />
              <Route
                path="/add-user"
                element={
                  <Layout>
                    <AddUser />
                  </Layout>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
