import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Avatar, Skeleton } from "@mui/material";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Grid,
  Input,
  Row,
  Text,
  Textarea
} from "@nextui-org/react";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { barberProfile } from "../../api/barber.api";
import { bookingServiceAPI, serviceListAPI } from "../../api/service.api";
import { useSignupModal, useTitleStore, useUserStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";
import { Motion } from "../../styles/ui/Layout";
import { Booking, userProfile } from "../../types/user.type";

const ProfileBarber = () => {
  const { storeOpen } = useSignupModal();
  const [selected, setSelected] = useState<any>(new Set(["Select"]));
  const { initAuth } = useUserStore();
  const [textBookBTN, setTextBookBTN] = useState("Book");
  const [timeStart, setTimeStart] = useState<string>("");
  const [lengthHair, setLengthHair] = useState<string>("");
  const [uniqueHair, setUniqueHair] = useState<string>("");
  const [hairThickness, setHairThickness] = useState<string>("");
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [serviceListData, setServiceListData] = useState([
    {
      service_name: "",
    },
  ]);
  const { storeTitle } = useTitleStore();
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const maxDate = moment().add(14, "days").format("YYYY-MM-DD");
  const [date, setdate] = useState(currentDate);
  const [bookingDetail, setBookingDetail] = useState<Booking[]>([]);
  const [barberData, setBarberData] = useState<userProfile>({
    Books: [],
    CreatedAt: "",
    DeletedAt: "",
    ID: 0,
    UpdatedAt: "",
    gender: "",
    name: "",
    service1: "",
    service2: "",
    service3: "",
    service4: "",
    status: "",
  });
  const navigate = useNavigate();
  const params = useLocation();
  const barberID = params.state.numB;
  const baberService = [
    barberData.service1,
    barberData.service2,
    barberData.service3,
    barberData.service4,
  ];

  useEffect(() => {
    storeTitle("BarberProfile");
    serviceListAPI().then((res) => {
      setServiceListData(res.data.Data.service_list);
    });
  }, []);

  useEffect(() => {
    if (barberID > 0) {
      barberProfile(barberID, date).then((res) => {
        const dataBarber = res.data.Data;
        setBarberData(dataBarber.barber_detail);
        setBookingDetail(dataBarber.booking_detail);
      });
    }
  }, [date]);
  const Check = (data: string, obj: any) => {
    if (data == "") {
      return <Skeleton variant="text" sx={{ fontSize: "14px" }} />;
    } else {
      return obj;
    }
  };
  const BookingService = () => {
    if (initAuth.ID == 0 || initAuth.ID < 1) {
      storeOpen(true);
    } else {
      bookingServiceAPI({
        service_name: selectedValue,
        date: date,
        time_start: timeStart,
        barber_id: barberID,
        user_id: initAuth.ID,
        length_hair: lengthHair,
        hair_thickness: hairThickness,
        uniqueness_of_hair: uniqueHair,
      }).then((_res) => {
        setTextBookBTN("Wait Admin");
      });
    }
  };
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
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    bounce: 0.2,
                  }}
                >
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
                        <Avatar sx={{ width: 200, height: 200 }} />
                      </Row>
                      {Check(
                        barberData.name,
                        <Text
                          size={20}
                          css={{
                            display: "flex",
                            justifyContent: "center",
                            mb: "$0",
                          }}
                        >
                          {` ช่าง ${barberData.name}`}
                        </Text>
                      )}
                      <Row>
                        <Col
                          css={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: "$8",
                            mb: "$0",
                          }}
                        >
                          {Check(
                            barberData.status,
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
                              }}
                            >
                              <Badge
                                variant="dot"
                                enableShadow
                                size="sm"
                                css={{ mr: "$5" }}
                                color={
                                  barberData.status == "online"
                                    ? "success"
                                    : "default"
                                }
                              />
                              {barberData.status}
                            </Text>
                          )}
                        </Col>
                        <Col
                          css={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: "$8",
                            mb: "$0",
                          }}
                        >
                          {Check(
                            barberData.gender,
                            <Text
                              color="$gray700"
                              size={14}
                              css={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {`เพศ: ${barberData.gender}`}
                            </Text>
                          )}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Grid>
              <Grid css={{ p: "$0", mt: "$10" }}>
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 100,
                    bounce: 0.2,
                  }}
                >
                  <Card>
                    <Card.Body>
                      <Grid css={{ py: "$0" }}>
                        <Text h5>บริการที่โดดเด่น</Text>
                        {Check(barberData.service1, "")}
                        {baberService.map((item, index) => {
                          if (item == null) {
                            return;
                          }
                          return (
                            <Badge
                              color="primary"
                              variant="flat"
                              key={index}
                              isSquared
                            >
                              {item}
                            </Badge>
                          );
                        })}
                      </Grid>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Grid>
            </Col>
            <Col span={9}>
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 100,
                  bounce: 0.2,
                }}
              >
                <Card css={{ mb: "$12", h: "550px" }}>
                  <Card.Body>
                    <Grid.Container gap={2} justify="flex-start">
                      <Grid xs={6} direction="column">
                        <Text b size={36} css={{ ml: "$2", mb: "$10" }}>
                          ตารางคิวงาน
                        </Text>

                        {bookingDetail.length == 0 ? (
                          <Text size={16} css={{ ml: "$5" }}>
                            ไม่มีข้อมูลการจองคิว
                          </Text>
                        ) : (
                          <Timeline
                            sx={{
                              [`& .${timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0,
                              },
                            }}
                            nonce={undefined}
                            onResize={undefined}
                            onResizeCapture={undefined}
                          >
                            {bookingDetail.map((data, index) => {
                              return (
                                <TimelineItem key={index}>
                                  <TimelineSeparator>
                                    <TimelineDot color="primary" />
                                    {bookingDetail.length - 1 == index ? (
                                      ""
                                    ) : (
                                      <TimelineConnector />
                                    )}
                                  </TimelineSeparator>
                                  <TimelineContent>
                                    {`${data.time_start} - ${data.time_end} ${data.service}`}
                                  </TimelineContent>
                                </TimelineItem>
                              );
                            })}
                          </Timeline>
                        )}
                      </Grid>
                      <Grid xs={6} css={{ h: "500px" }}>
                        <Grid.Container alignItems="flex-start">
                          <Grid
                            xs={12}
                            justify="flex-end"
                            css={{ mt: "$5", mb: "$5" }}
                          >
                            <Input
                              width="186px"
                              type="date"
                              aria-label="date"
                              min={currentDate}
                              max={maxDate}
                              initialValue={date}
                              onChange={(e) => {
                                setdate(e.target.value);
                              }}
                            />
                          </Grid>

                          <Grid xs={12}>
                            <Grid.Container gap={2}>
                              <Grid
                                xs={6}
                                justify="flex-end"
                                alignItems="flex-start"
                                direction="column"
                              >
                                <label
                                  className="nextui-input-block-label"
                                  style={{
                                    fontSize: "0.875rem",
                                    marginBottom: "0.375rem",
                                  }}
                                >
                                  เลือก บริการ
                                </label>
                                <Dropdown>
                                  <Dropdown.Button
                                    color="default"
                                    flat
                                    css={{ w: "100%" }}
                                  >
                                    {selectedValue}
                                  </Dropdown.Button>
                                  <Dropdown.Menu
                                    aria-label="Choice"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selected}
                                    onSelectionChange={setSelected}
                                  >
                                    {serviceListData.map((item, index) => {
                                      return (
                                        <Dropdown.Item key={item.service_name}>
                                          {item.service_name}
                                        </Dropdown.Item>
                                      );
                                    })}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </Grid>
                              <Grid xs={6}>
                                <Input
                                  required
                                  label="เลือก เวลา"
                                  fullWidth
                                  placeholder="เลือก เวลา"
                                  type="time"
                                  aria-label="1"
                                  initialValue="09:00"
                                  max="18:00"
                                  onChange={({ target }) => {
                                    setTimeStart(target.value);
                                  }}
                                />
                              </Grid>
                              <Grid xs={6}>
                                <Input
                                  label="ลักษณะของเส้นผม"
                                  fullWidth
                                  placeholder="e.g. ผมหนา ผมบาง ผมหยักศก"
                                  aria-label="1"
                                  onChange={({ target }) => {
                                    setHairThickness(target.value);
                                  }}
                                />
                              </Grid>
                              <Grid xs={6}>
                                <Input
                                  label="ความยาวของเส้นผม"
                                  fullWidth
                                  placeholder="e.g. เป็นเซนติเมตรหรือ ประบ่า"
                                  aria-label="1"
                                  onChange={({ target }) => {
                                    setLengthHair(target.value);
                                  }}
                                />
                              </Grid>
                              <Grid xs={6}>
                                <Textarea
                                  label="ลักษณะทรงผมปัจจุบัน"
                                  fullWidth
                                  placeholder="ลักษณะทรงผมปัจจุบัน"
                                  onChange={({ target }) => {
                                    setUniqueHair(target.value);
                                  }}
                                />
                              </Grid>
                            </Grid.Container>
                          </Grid>
                          <Grid xs={12} justify="flex-end" css={{ mt: "$10" }}>
                            <Button size="sm" onPress={BookingService} disabled={textBookBTN=="Wait Admin"}>
                              {textBookBTN}
                            </Button>
                          </Grid>
                        </Grid.Container>
                      </Grid>
                    </Grid.Container>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Grid.Container>
      </Main>
    </Motion>
  );
};

export default ProfileBarber;
