import {
  Button,
  Col,
  Grid,
  Input,
  Popover,
  Row,
  Spacer,
  Table,
  Text
} from "@nextui-org/react";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getBooking, removeBooking, updateStatusBooking } from "./admin.api";
import { BookingStatus } from "./admin.model";

const AdminManage = () => {
  const [cookie] = useCookies(["Salon"]);
  const [statusBooking, setStatusBooking] = useState("pending");
  const [updateBooking, setUpdateBooking] = useState<
    "pending" | "approve" | "closed" | "unapproved"
  >("pending");
  const [time, setTime] = useState("");
  const [click, setClick] = useState(false);
  const [ID, setID] = useState(0);
  const [title, settitle] = useState("รออนุมัติ");
  const [rowdata, setRowdata] = useState<BookingStatus[]>([]);
  const columns = [
    {
      key: "booking_id",
      label: "BOOKING ID",
    },
    {
      key: "barber_id",
      label: "BARBER ID",
    },
    {
      key: "user_id",
      label: "USER ID",
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
    updateStatusBooking(cookie.Salon, {
      bookingID: ID,
      status: updateBooking,
      timeEnd: time,
    }).then((_res) => {
      setClick(!click);
    });
  }

  function setUnapprove(id: number) {
    updateStatusBooking(cookie.Salon, {
      bookingID: id,
      status: updateBooking,
    }).then((_res) => {
      setClick(!click);
    });
  }

  function removeBook(id: number) {
    removeBooking(cookie.Salon, id).then((_res) => {
      setClick(!click);
    });
  }

  function componentStatus(id: number) {
    switch (statusBooking) {
      case "pending": {
        return (
          <Row>
            <Col span={4}>
              <Button
                disabled={id != ID}
                auto
                color="success"
                onPress={() => {
                  setTimeEnd();
                }}
              >
                อนุมัติ
              </Button>
            </Col>
            <Col span={4}>
              <Button
                auto
                color="error"
                onPress={() => {
                  setUpdateBooking("unapproved");
                  setUnapprove(id);
                }}
              >
                ไม่อนุมัติ
              </Button>
            </Col>
          </Row>
        );
      }
      case "approve": {
        return (
          <Button
            auto
            color="warning"
            onPress={() => {
              setUpdateBooking("pending");
              setUnapprove(id);
            }}
          >
            พิจารณาไหม่
          </Button>
        );
      }
      case "closed": {
        return <Text color="$gray500">No Action</Text>;
      }
      case "unapproved": {
        return (
          <Button
            color="error"
            auto
            onPress={() => {
              removeBook(id);
            }}
          >
            ลบ
          </Button>
        );
      }
    }
  }

  const rows = () => {
    return rowdata.map((item, index) => {
      return {
        key: index,
        booking_id: item.ID,
        barber_id: item.barber_id,
        user_id: item.user_id,
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
        action: componentStatus(item.ID),
      };
    });
  };

  useEffect(() => {
    setRowdata([]);
    getBooking(cookie.Salon, statusBooking).then((res) => {
      let data = res.data.Data.booking_list;

      setRowdata(data);
    });
    console.log(rows());
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
          <Button.Group flat>
            <Button
              onPress={() => {
                settitle("รออนุมัติ");
                setStatusBooking("pending");
              }}
            >
              รออนุมัติ
            </Button>
            <Button
              onPress={() => {
                settitle("อนุมัติแล้ว");
                setStatusBooking("approve");
              }}
            >
              อนุมัติแล้ว
            </Button>
            <Button
              onPress={() => {
                settitle("เสร็จสิ้นแล้ว");
                setStatusBooking("closed");
              }}
            >
              เสร็จสิ้นแล้ว
            </Button>
            <Button
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
            items={rows()}
            loadingState={rowdata.length == 0 ? "loading" : undefined}
          >
            {(item) => (
              <Table.Row key={item.key}>
                {(columnKey) => {
                  let style = columnKey == "action" ? "266px" : "";
                  return (
                    <Table.Cell css={{ w: style }}>
                      {item[columnKey]}
                    </Table.Cell>
                  );
                }}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Grid>
    </motion.div>
  );
};

export default AdminManage;
