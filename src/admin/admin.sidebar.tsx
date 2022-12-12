import {
    Button,
    Col,
    Container,
    Image,
    Row,
    styled,
    Text
} from "@nextui-org/react";
import {
    IconBrandBooking, IconUsers
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bucket } from "../api/coomon.api";
import { useTitleStore } from "../data/store";

const SidebarLayout = styled(Container, {
  backgroundColor: "#252525",
  color: "#fff",
});

const SideRowHead = styled(Row, {
  marginTop: "$18",
  padding: "0",
});

const SideRowMenu = styled(Row, {
  marginTop: "$5",
  padding: "0",
});

const Sidebar = () => {
  const { storeTitle } = useTitleStore();
  const [first, setfirst] = useState("");
  const [second, setsecond] = useState("");
  const logo = `${Bucket}images/salon.png`;
  let { pathname } = useLocation();
  useEffect(() => {
    if (pathname == "/") {
      setfirst("active");
      setsecond("");
    }
    if (pathname == "/manage") {
      setfirst("");
      setsecond("active");
    }
  }, [pathname]);

  let nevigate = useNavigate();
  return (
    <SidebarLayout css={{ padding: "$0" }}>
      <SideRowHead>
        <Col
          span={12}
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Image height={80} src={logo} alt="Logo" objectFit="cover" />
          <Text h2 color="#fff" css={{ mt: "$5" }}>
            Salon Admin
          </Text>
        </Col>
      </SideRowHead>
      <SideRowMenu>
        <Col
          span={12}
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            className={first}
            light
            css={{
              mt: "$4",
              color: "#fff",

              "&:hover": {
                background: "$gray200",
                color: "#252525",
              },
              "&.active": {
                background: "$selection",
                color: "#252525",
              },
            }}
            icon={<IconUsers />}
            onPress={() => {
              storeTitle("Barber Detail");
              nevigate("/");
            }}
          >
            Barber Detail
          </Button>
          <Button
            className={second}
            light
            css={{
              mt: "$4",
              color: "#fff",
              "&:hover": {
                background: "$gray200",
                color: "#252525",
              },
              "&.active": {
                background: "$selection",
                color: "#252525",
              },
            }}
            icon={<IconBrandBooking />}
            onPress={() => {
              storeTitle("Booking Manage");
              nevigate("/manage");
            }}
          >
            Booking Manage
          </Button>
        </Col>
      </SideRowMenu>
    </SidebarLayout>
  );
};

export default Sidebar;
