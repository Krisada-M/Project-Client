import { Route, Routes } from "react-router-dom";
import Barber from "./pages/barber/barber";
import ForgotPassword from "./pages/forgot-password/forgotPassword";
import Home from "./pages/home/home";
import ProfileBarber from "./pages/profileBarber/profileBarber";
import ProfileUser from "./pages/profileUser/profileUser";
import SetPassword from "./pages/set-password/setPassword";
import { Layout } from "./styles/ui/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="profile" element={<ProfileUser />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="set-password" element={<SetPassword />} />
        </Route>
        <Route path="/barber">
          <Route index element={<Barber />} />
          <Route path="profile" element={<ProfileBarber />} />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
