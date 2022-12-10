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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTitleStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";

const Home = () => {
  const { storeTitle } = useTitleStore();
  useEffect(() => {
    storeTitle("Home");
  }, []);
  let navigate = useNavigate();
  const SalonImg1 =
    "https://salonstore.s3.ap-southeast-1.amazonaws.com/images/salonImg1.jpg";
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
              <Card.Body>
                <Grid.Container
                  css={{ mt: "$15" }}
                  alignItems="center"
                  justify="center"
                >
                  <Grid xs={12} alignItems="center" justify="center">
                    <Badge variant="dot" enableShadow size="lg" />
                    <Text
                      color="#889096"
                      css={{ ml: "$5", mb: "$0" }}
                      size={36}
                      b
                    >
                      ปิดปรับปรุง
                    </Text>
                  </Grid>
                  <Grid
                    xs={12}
                    alignItems="center"
                    justify="center"
                    css={{
                      mt: "60px",
                      p: "$10 $15 $0 $15",
                      flexWrap: "wrap",
                    }}
                  >
                    <Row justify="space-between">
                      <Col span={12}>
                        <Text size={18} b>
                          สระ ยืด
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
                          บาท
                        </Text>
                      </Col>
                    </Row>
                    <Spacer y={0.5} />
                    <Row justify="space-between">
                      <Col span={12}>
                        <Text size={18} b>
                          ทำสีผม
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
                          บาท
                        </Text>
                      </Col>
                    </Row>
                    <Spacer y={0.5} />
                    <Row justify="space-between">
                      <Col span={12}>
                        <Text size={18} b>
                          ตัดผม
                        </Text>
                      </Col>
                      <Col
                        span={4}
                        css={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Text size={18} b>
                          บาท
                        </Text>
                      </Col>
                    </Row>
                    <Spacer y={0.5} />
                    <Row justify="space-between">
                      <Col span={12}>
                        <Text size={18} b>
                          ทำเล็บ
                        </Text>
                      </Col>
                      <Col
                        span={4}
                        css={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Text size={18} b>
                          บาท
                        </Text>
                      </Col>
                    </Row>
                  </Grid>
                </Grid.Container>
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
