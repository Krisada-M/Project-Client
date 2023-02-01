import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Grid,
  Row,
  Spacer,
  Text
} from "@nextui-org/react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Bucket } from "../../api/coomon.api";
import { statusSalon } from "../../api/service.api";
import { useAdminOpen, useTitleStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";

type data = {
  text: string;
  textColor: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "error";
};

const Home = () => {
  const { storeTitle } = useTitleStore();
  const { open, setOpen } = useAdminOpen();

  useEffect(() => {
    storeTitle("Home");
    statusSalon().then((res) => {
      setOpen(true);
    });
  }, []);
  const useOpen: data = useMemo(() => {
    return {
      text: open ? "Opening" : "Closed",
      textColor: open ? "success" : "#889096",
      color: open ? "success" : "default",
    };
  }, [open]);
  let navigate = useNavigate();
  const SalonImg1 = `${Bucket}images/salonImg1.jpg`;
  const serverList = [
    {
      service: "ตัดผม",
      rate: 80,
    },
    {
      service: "ทำสีผม",
      rate: 300,
    },
    {
      service: "ทำเล็บ",
      rate: 100,
    },
    {
      service: "ทาสีเล็บ",
      rate: 300,
    },
    {
      service: "สระผม+ไดร์",
      rate: "-",
    },
    {
      service: "ยืดผม",
      rate: 400,
    },
    {
      service: "บำรุงเส้นผม",
      rate: 300,
    },
    {
      service: "ต่อผม",
      rate: "-",
    },
    {
      service: "อบไอน้ำ",
      rate: 200,
    },
  ];
  return (
    <Main css={{ position: "relative" }}>
      <Container xl css={{ position: "relative", h: "85vh" }}>
        <Row
          css={{
            position: "relative",
          }}
        >
          <Col>
            <Card css={{ mw: "100vw", maxHeight: "80vh" }}>
              <Card.Header
                css={{
                  position: "absolute",
                  zIndex: 50,
                  top: 5,
                  mt: "20vh",
                  ml: "20px",
                }}
              >
                <Row justify="center" align="center">
                  <Col>
                    <Text
                      size={72}
                      weight="bold"
                      transform="uppercase"
                      color="#f9f9f9be"
                    >
                      Welcome To salon
                    </Text>
                    <Text h3 color="#f9f9f9be">
                      เปิดบริการ 9:00-19:00
                    </Text>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  objectFit="cover"
                  src={SalonImg1}
                  css={{ filter: "brightness(0.5)" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          css={{
            position: "absolute",
            zIndex: "50",
            top: "0",
          }}
        >
          <Col
            css={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "$20",
              marginTop: "$10",
            }}
          >
            <Card css={{ mw: "25vw", h: "60vh" }}>
              <Card.Body css={{ oy: "hidden" }}>
                <Grid xs={12} alignItems="center" justify="center">
                  <Badge
                    variant="dot"
                    enableShadow
                    size="lg"
                    color={`${useOpen.color}`}
                  />
                  <Text
                    color={`${useOpen.textColor}`}
                    css={{ ml: "$5", mb: "$0" }}
                    size={36}
                    b
                  >
                    {useOpen.text}
                  </Text>
                </Grid>
                <Grid
                  xs={12}
                  alignItems="center"
                  justify="center"
                  css={{
                    padding: "$10 $15",
                    flexWrap: "wrap",
                  }}
                >
                  {serverList.map((item: typeof serverList[0], index) => {
                    return (
                      <>
                        <Row justify="space-between">
                          <Col span={12}>
                            <Text size={18} b>
                              {item.service}
                            </Text>
                          </Col>
                          <Col span={4}>
                            <Text
                              size={18}
                              b
                              css={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              {`${item.rate} บาท`}
                            </Text>
                          </Col>
                        </Row>
                        <Spacer y={0.5} />
                      </>
                    );
                  })}
                </Grid>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          css={{
            position: "absolute",
            zIndex: "50",
            bottom: "0",
          }}
        >
          <Col
            css={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "$20",
              marginBottom: "$20",
            }}
          >
            <Card css={{ mw: "25vw", mh: "10vh" }}>
              <Card.Body>
                <Button
                  // disabled={!open}
                  color={useOpen.color}
                  onPress={() => {
                    navigate("/barber");
                  }}
                >
                  Go
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Home;
