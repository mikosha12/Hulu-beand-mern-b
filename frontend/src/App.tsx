import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";
import ReviewForm from "./forms/ReviewForm/reviewForm";
import ManageAccount from './pages/ManageAccount/ManageAccount';
import PersonalDetails from './pages/ManageAccount/PersonalDetails';
import Security from './pages/ManageAccount/Security';
import PaymentDetails from './pages/ManageAccount/PaymentDetails';
import Privacy from './pages/ManageAccount/Privacy';
import EmailNotifications from './pages/ManageAccount/EmailNotifications';


function App() {
  const { isLoggedIn } = useAppContext();
  return (
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
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />

        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
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
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />

            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />

            <Route
              path="/hotel/:hotelId/:bookingId/review"
              element={
              <Layout>
                <ReviewForm />
              </Layout>}
            />
            <Route path="/manage-account" element={<ManageAccount />} />
            <Route path="/manage-account/personal-details" element={<PersonalDetails />} />
            <Route path="/manage-account/security" element={<Security />} />
            <Route path="/manage-account/payment-details" element={<PaymentDetails />} />
            <Route path="/manage-account/privacy" element={<Privacy />} />
            <Route path="/manage-account/email-notifications" element={<EmailNotifications />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
