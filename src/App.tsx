import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminDetail from "./admin/admin.detail";
import { AdminLayout } from "./admin/admin.layout";
import AdminManage from "./admin/admin.manage";
import { Auth } from "./api/coomon.api";
import { useTokenStore, useUserStore } from "./data/store";
import Barber from "./pages/barber/barber";
import ForgotPassword from "./pages/forgot-password/forgotPassword";
import Home from "./pages/home/home";
import ProfileBarber from "./pages/profileBarber/profileBarber";
import ProfileUser from "./pages/profileUser/profileUser";
import SetPassword from "./pages/set-password/setPassword";
import { Layout } from "./styles/ui/Layout";

function separate(params: string) {
  switch (params) {
    case "ADMIN":
      return (
        <AdminLayout>
          <Routes>
            <Route path="/">
              <Route index element={<AdminDetail />} />
              <Route path="manage" element={<AdminManage />} />
            </Route>
          </Routes>
        </AdminLayout>
      );
    case "USER":
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      );
  }
}

const App = () => {
  const [cookies] = useCookies(["Salon"]);
  const [type, settype] = useState("");
  let navigate = useNavigate();
  const { storeToken } = useTokenStore();
  const { storeInitAuth } = useUserStore();
  console.log(type);
  useEffect(() => {
    const getType = async (token: string) => {
      return await Auth(token).get("checktype");
    };
    if (cookies.Salon != undefined) {
      getType(cookies.Salon).then((res) => {
        const userType = res.data.type;
        if (userType == "ADMIN") {
          settype(userType);
        } else {
          settype(userType);
          storeInitAuth("/user/", cookies.Salon);
        }
      });
      storeToken(cookies.Salon);
    } else {
      settype("USER");
    }
  }, [cookies]);

  return <>{separate(type)}</>;
};

export default App;
