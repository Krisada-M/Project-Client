import { UserOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Col,
  Grid,
  Input,
  Row,
  Spacer,
  Text
} from "@nextui-org/react";
import { Avatar, Timeline } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { barberProfile } from "../../api/barber.api";
import { useTitleStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";
import { Motion } from "../../styles/ui/Layout";
import { userProfile } from "../../types/user.type";

const ProfileBarber = ({ data }: any) => {
  const [selected, setSelected] = useState(false);
  const { storeTitle } = useTitleStore();
  const [barberData, setBarberData] = useState<userProfile>();
  const navigate = useNavigate();
  const params = useLocation();
  const baberService = [
    barberData?.service1,
    barberData?.service2,
    barberData?.service3,
    barberData?.service4,
  ];
  const items = [
    {
      timeStart: "10:00",
      timeEnd: "11:00",
      serviceName: "ตัดผม",
      status: "Bookked",
    },
    {
      timeStart: "13:00",
      timeEnd: "14:00",
      serviceName: "ตัดผม",
      status: "Paddding",
    },
  ];

  useEffect(() => {
    storeTitle("BarberProfile");
    barberProfile(params.state.numB).then((res) => {
      setBarberData(res.data.Data.barber_detail);
    });
  }, []);

  return (
    <Motion>
      <Main
        css={{
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <Grid.Container
          css={{ position: "relative", marginBlock: "$5", marginLeft: "$2" }}
          gap={3}
          justify="flex-start"
        >
          <Row gap={2}>
            <Col span={3}>
              <Grid css={{ p: "$0" }}>
                <Card>
                  <Card.Body
                    css={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Row
                      css={{
                        paddingInline: "$10",
                        paddingBlock: "$10",
                      }}
                      justify="center"
                      align="center"
                    >
                      <Avatar size={200} icon={<UserOutlined />} />
                    </Row>
                    <Text
                      size={20}
                      css={{
                        display: "flex",
                        justifyContent: "center",
                        mb: "$0",
                      }}
                    >
                      {` ช่าง ${barberData?.name}`}
                    </Text>
                    <Row>
                      <Col>
                        <Text
                          size={14}
                          color={
                            barberData?.status == "online"
                              ? "success"
                              : "default"
                          }
                          css={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: "$8",
                            mb: "$0",
                          }}
                        >
                          <Badge
                            variant="dot"
                            enableShadow
                            size="sm"
                            css={{ mr: "$5" }}
                            color={
                              barberData?.status == "online"
                                ? "success"
                                : "default"
                            }
                          />
                          {barberData?.status}
                        </Text>
                      </Col>
                      <Col>
                        <Text
                          color="$gray700"
                          size={14}
                          css={{
                            display: "flex",
                            justifyContent: "center",
                            mt: "$8",
                            mb: "$0",
                          }}
                        >
                          {`เพศ: ${barberData?.gender}`}
                        </Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Grid>
              <Grid css={{ p: "$0", mt: "$10" }}>
                <Card>
                  <Card.Body>
                    <Grid css={{ py: "$0" }}>
                      <Text>บริการที่โดดเด่น</Text>
                      {baberService.map((item, index) => {
                        return (
                          <Text size={10} key={index} css={{ mb: "$1" }}>
                            {item}
                          </Text>
                        );
                      })}
                    </Grid>
                  </Card.Body>
                </Card>
              </Grid>
            </Col>
            <Col span={9}>
              <Card css={{ mb: "$12", minHeight: "550px" }}>
                <Card.Header css={{ justifyContent: "flex-end" }}>
                  <Input
                    width="186px"
                    type="date"
                    aria-label="date"
                    initialValue="2022-12-03"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                </Card.Header>
                <Card.Body>
                  <Grid.Container gap={2} justify="flex-start">
                    <Grid xs direction="column">
                      <Text b size={36}>
                        ตารางคิวงาน
                      </Text>
                      <Spacer y={1} />
                      <Timeline mode="left">
                        {items.map((data, index) => {
                          return (
                            <Timeline.Item
                              key={index}
                              color={
                                data.status == "Bookked" ? "green" : "orange"
                              }
                            >
                              <Row>
                                <Col span={4}>
                                  <Text
                                    b
                                    color={
                                      data.status == "Bookked"
                                        ? "$blue600"
                                        : "$yellow600"
                                    }
                                  >
                                    {`${data.timeStart} - ${data.timeEnd}`}
                                  </Text>
                                </Col>
                                <Col>
                                  <Text
                                    b
                                    color={
                                      data.status == "Bookked"
                                        ? "$blue600"
                                        : "$yellow600"
                                    }
                                  >
                                    {data.serviceName}
                                  </Text>
                                </Col>
                              </Row>
                            </Timeline.Item>
                          );
                        })}
                      </Timeline>
                    </Grid>
                    <Grid xs>
                      <Grid.Container direction="column">
                        <Grid xs>
                          <Input placeholder="Select Service" />
                        </Grid>
                        <Grid xs>
                          <Input placeholder="Select Time" />
                        </Grid>
                        <Grid xs justify="flex-end">
                          <Button size="sm">Book</Button>
                        </Grid>
                      </Grid.Container>
                    </Grid>
                  </Grid.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Grid.Container>
      </Main>
    </Motion>
  );
};

export default ProfileBarber;
