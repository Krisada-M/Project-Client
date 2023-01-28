import {
  Button,
  Col,
  Grid,
  Input,
  Loading,
  Popover,
  Row,
  Spacer,
  Table,
  Text
} from "@nextui-org/react";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { getBooking, removeBooking, updateStatusBooking } from "./admin.api";
import { BookingStatus } from "./admin.model";

const AdminManage = () => {
  const [cookie] = useCookies(["Salon"]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<number>(200);
  const [statusBooking, setStatusBooking] = useState("pending");
  const [updateBooking, setUpdateBooking] = useState<
    "pending" | "approve" | "closed" | "unapproved"
  >("pending");
  const [time, setTime] = useState("");
  const [click, setClick] = useState(false);
  const [ID, setID] = useState(0);
  const [title, settitle] = useState("รออนุมัติ");
  const [rowdata, setRowdata] = useState<BookingStatus[]>([]);
  const memo = useMemo(() => {
    return {
      pending: statusBooking == "pending",
      approve: statusBooking == "approve",
      closed: statusBooking == "closed",
      unapproved: statusBooking == "unapproved",
    };
  }, [statusBooking]);
  const columns = [
    {
      key: "booking_id",
      label: "BOOKING ID",
    },
    {
      key: "barber",
      label: "BARBER",
    },
    {
      key: "user",
      label: "USER",
    },
    {
      key: "service",
      label: "SERVICE",
    },
    {
      key: "date",
      label: "DATE",
    },
    {
      key: "time_start",
      label: "START",
    },
    {
      key: "time_end",
      label: "END",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];

  function setTimeEnd() {
    setApiStatus(500);
    updateStatusBooking(cookie.Salon, {
      bookingID: ID,
      status: updateBooking,
      timeEnd: time,
    }).then((_res) => {
      setApiStatus(200);
      setClick(!click);
    });
  }

  function setUnapprove(id: number) {
    setApiStatus(500);
    updateStatusBooking(cookie.Salon, {
      bookingID: id,
      status: updateBooking,
    }).then((_res) => {
      setApiStatus(200);
      setClick(!click);
    });
  }

  function removeBook(id: number) {
    setApiStatus(500);
    removeBooking(cookie.Salon, id).then((_res) => {
      setApiStatus(200);
      setClick(!click);
    });
  }

  function componentStatus(data: BookingStatus) {
    switch (statusBooking) {
      case "pending": {
        return (
          <Row gap={0.2}>
            <Col span={5}>
              <Button
                disabled={data.ID != ID}
                auto
                color="success"
                onPress={() => {
                  setUpdateBooking("approve");
                  setTimeEnd();
                }}
              >
                {data.ID == ID &&
                apiStatus != 200 &&
                updateBooking === "approve" ? (
                  <Loading
                    color="currentColor"
                    size="sm"
                    css={{ m: "7px !important" }}
                  />
                ) : (
                  "อนุมัติ"
                )}
              </Button>
            </Col>
            <Col span={5}>
              <Button
                auto
                color="error"
                onPress={() => {
                  setUpdateBooking("unapproved");
                  setUnapprove(data.ID);
                  setID(data.ID);
                }}
              >
                {data.ID == ID &&
                apiStatus != 200 &&
                updateBooking === "unapproved" ? (
                  <Loading
                    color="currentColor"
                    size="sm"
                    css={{ m: "7px !important" }}
                  />
                ) : (
                  "ไม่อนุมัติ"
                )}
              </Button>
            </Col>
            <Col span={5}>
              <Popover placement="bottom-right" isBordered>
                <Popover.Trigger>
                  <Button auto bordered color="primary">
                    เพิ่มเติม
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Text css={{ p: "$8 $10 $3 $10" }}>
                    {`ลักษณะผม : ${data.uniqueness_of_hair}`}
                  </Text>
                  <Text
                    css={{ p: "$3 $10 $3 $10" }}
                  >{`ความหนา : ${data.hair_thickness}`}</Text>
                  <Text
                    css={{ p: "$3 $10 $8 $10" }}
                  >{`ความยาว : ${data.length_hair}`}</Text>
                </Popover.Content>
              </Popover>
            </Col>
          </Row>
        );
      }
      case "approve": {
        return (
          <Row gap={0.2}>
            <Col span={6}>
              <Button
                auto
                color="warning"
                onPress={() => {
                  setUpdateBooking("pending");
                  setUnapprove(data.ID);
                  setID(data.ID);
                }}
              >
                {data.ID == ID && apiStatus != 200 ? (
                  <Loading
                    color="currentColor"
                    size="sm"
                    css={{ m: "7px !important" }}
                  />
                ) : (
                  "พิจารณาไหม่"
                )}
              </Button>
            </Col>
            <Col span={5}>
              <Popover placement="bottom-right" isBordered>
                <Popover.Trigger>
                  <Button auto bordered color="primary">
                    เพิ่มเติม
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Text css={{ p: "$8 $10 $3 $10" }}>
                    {`ลักษณะผม : ${data.uniqueness_of_hair}`}
                  </Text>
                  <Text
                    css={{ p: "$3 $10 $3 $10" }}
                  >{`ความหนา : ${data.hair_thickness}`}</Text>
                  <Text
                    css={{ p: "$3 $10 $8 $10" }}
                  >{`ความยาว : ${data.length_hair}`}</Text>
                </Popover.Content>
              </Popover>
            </Col>
          </Row>
        );
      }
      case "closed": {
        return <Text color="$gray500">No Action</Text>;
      }
      case "unapproved": {
        return (
          <Row gap={0.2}>
            <Col span={3}>
              <Button
                color="error"
                auto
                onPress={() => {
                  removeBook(data.ID);
                  setID(data.ID);
                }}
              >
                {data.ID == ID && apiStatus != 200 ? (
                  <Loading
                    color="currentColor"
                    size="sm"
                    css={{ m: "7px !important" }}
                  />
                ) : (
                  "ลบ"
                )}
              </Button>
            </Col>
            <Col span={5}>
              <Popover placement="bottom-right" isBordered>
                <Popover.Trigger>
                  <Button auto bordered color="primary">
                    เพิ่มเติม
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Text css={{ p: "$8 $10 $3 $10" }}>
                    {`ลักษณะผม : ${data.uniqueness_of_hair}`}
                  </Text>
                  <Text
                    css={{ p: "$3 $10 $3 $10" }}
                  >{`ความหนา : ${data.hair_thickness}`}</Text>
                  <Text
                    css={{ p: "$3 $10 $8 $10" }}
                  >{`ความยาว : ${data.length_hair}`}</Text>
                </Popover.Content>
              </Popover>
            </Col>
          </Row>
        );
      }
    }
  }

  const rows = rowdata.map((item, index) => {
    return {
      key: index,
      booking_id: item.ID,
      barber: item.barber,
      user: item.user,
      service: item.service,
      date: moment(item.date).format("DD / MM / YYYY"),
      time_start: item.time_start,
      time_end:
        statusBooking == "pending" ? (
          <>
            <Popover key={index} placement="right">
              <Popover.Trigger>
                <Button
                  auto
                  flat
                  size={"xs"}
                  onPress={() => {
                    setID(item.ID);
                    setUpdateBooking("approve");
                  }}
                >
                  เลือกเวลา
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <Row
                  justify="center"
                  align="center"
                  css={{ p: "$10", m: "$0" }}
                  gap={1}
                >
                  <Col>
                    <Input
                      aria-label="timeend"
                      fullWidth
                      type={"time"}
                      css={{ m: "$0" }}
                      onChange={({ target }) => {
                        setTime(target.value);
                      }}
                    />
                  </Col>
                </Row>
              </Popover.Content>
            </Popover>
          </>
        ) : (
          item.time_end
        ),
      status: item.status,
      action: componentStatus(item),
    };
  });

  useEffect(() => {
    setRowdata([]);
    setFetchStatus(true);
    getBooking(cookie.Salon, statusBooking).then((res) => {
      let data = res.data.Data.booking_list;
      setRowdata(data);
      setFetchStatus(false);
    });
  }, [statusBooking, click]);

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
    >
      <Spacer y={1} />
      <h1>AdminManage</h1>
      <Spacer y={1} />
      <Grid.Container>
        <Grid xs justify="space-between" css={{ paddingInline: "$10" }}>
          <Text h2>{title}</Text>
          <Button.Group>
            <Button
              bordered={memo.pending}
              onPress={() => {
                settitle("รออนุมัติ");
                setStatusBooking("pending");
              }}
            >
              รออนุมัติ
            </Button>
            <Button
              bordered={memo.approve}
              onPress={() => {
                settitle("อนุมัติแล้ว");
                setStatusBooking("approve");
              }}
            >
              อนุมัติแล้ว
            </Button>
            <Button
              bordered={memo.closed}
              onPress={() => {
                settitle("เสร็จสิ้นแล้ว");
                setStatusBooking("closed");
              }}
            >
              เสร็จสิ้นแล้ว
            </Button>
            <Button
              bordered={memo.unapproved}
              onPress={() => {
                settitle("ปฏิเสธ");
                setStatusBooking("unapproved");
              }}
            >
              ปฏิเสธ
            </Button>
          </Button.Group>
        </Grid>
      </Grid.Container>
      <Grid xs={12} justify="center" alignItems="center">
        <Table
          aria-label="Example table with dynamic content"
          color={"error"}
          css={{
            minHeight: "calc($space$6 * 10)",
            minWidth: "100%",
          }}
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            )}
          </Table.Header>

          <Table.Body
            items={rows}
            loadingState={
              rowdata.length == 0 && fetchStatus == true ? "loading" : "error"
            }
          >
            {(item) => {
              return (
                <Table.Row key={item.key}>
                  {(columnKey) => {
                    let style = columnKey == "action" ? "266px" : "";
                    return (
                      <Table.Cell css={{ w: style }}>
                        {item[columnKey as keyof typeof item]}
                      </Table.Cell>
                    );
                  }}
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
      </Grid>
    </motion.div>
  );
};

export default AdminManage;
