import {
  Badge,
  Button,
  Col,
  Grid,
  Loading,
  Row,
  Spacer,
  Switch,
  Table,
  Text
} from "@nextui-org/react";
import { IconUserCheck, IconUserOff } from "@tabler/icons";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTitleStore, useUpdatebarber } from "../data/store";
import { getAllBarber, removeBarber, updateStatusBarber } from "./admin.api";
import { BarberDetail } from "./admin.model";
import AddBarber from "./modals/addBaber.modal";
import EditBarber from "./modals/editBarber.modal";

const AdminDetail = () => {
  const [cookie] = useCookies(["Salon"]);
  const { storeTitle } = useTitleStore();
  const { setDataUser } = useUpdatebarber();
  const currentDay = moment(new Date()).format("DD/MM/YYYY");
  const [BID, setBID] = useState(0);
  const [BStatus, setBStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(0);
  const [Bdetail, setBdetail] = useState<BarberDetail[]>([]);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const closeAddBarber = (status: boolean) => {
    if (status) {
      getAllBarber(cookie.Salon).then((res) => {
        setBdetail(res.data.Data.barber_detail);
      });
    }
    setAddModal(false);
  };
  const closeEditBarber = (status: boolean) => {
    if (status) {
      getAllBarber(cookie.Salon).then((res) => {
        setBdetail(res.data.Data.barber_detail);
      });
    }
    setEditModal(false);
  };
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "gender",
      label: "GENDER",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "service",
      label: "SERVICE",
    },
    {
      key: "bookinginday",
      label: "BOOKING IN DAY",
    },
    {
      key: "allbooking",
      label: "ALL BOOKING",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];
  useEffect(() => {
    if (BID != 0) {
      updateStatusBarber(cookie.Salon, { id: BID, status: BStatus }).then(
        (_) => {}
      );
    }
  }, [BID, BStatus]);

  useEffect(() => {
    storeTitle("Barber Detail");
    getAllBarber(cookie.Salon).then((res) => {
      setBdetail(res.data.Data.barber_detail);
    });
  }, []);

  function remove(id: number) {
    removeBarber(cookie.Salon, id)
      .then(() => {
        setBdetail([]);
        setDeleteStatus(0);
        getAllBarber(cookie.Salon).then((res) => {
          setBdetail(res.data.Data.barber_detail);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function rowsBarber() {
    return Bdetail.map((data) => {
      const ro = {
        key: data.id,
        name: data.name,
        gender: data.gender,
        status: (
          <Switch
            checked={data.status == "online"}
            size="sm"
            shadow
            color="success"
            onChange={({ target }) => {
              setBID(data.id);
              setBStatus(target.checked);
            }}
            iconOn={<IconUserCheck />}
            iconOff={<IconUserOff />}
          />
        ),
        service: [
          data.service1,
          data.service2,
          data.service3,
          data.service4,
        ].map((d, i) => {
          if (d == null) {
            return;
          }
          return (
            <Badge color="success" variant="flat" key={i}>
              {d}
            </Badge>
          );
        }),
        bookinginday: data.bookinday,
        allbooking: data.allday,
        action: (
          <Row>
            <Col span={4}>
              <Button
                key={data.id}
                auto
                color={"warning"}
                onPress={() => {
                  setDataUser(data);
                  setEditModal(true);
                }}
              >
                Edit
              </Button>
            </Col>
            <Col>
              <Button
                key={data.id}
                disabled={deleteStatus == data.id}
                auto
                color={"error"}
                onPress={() => {
                  setDeleteStatus(data.id);
                  remove(data.id);
                }}
              >
                {deleteStatus == data.id ? (
                  <Loading
                    color="currentColor"
                    size="sm"
                    css={{ m: "7px !important" }}
                  />
                ) : (
                  "Delete"
                )}
              </Button>
            </Col>
          </Row>
        ),
      };
      return ro;
    });
  }

  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
    >
      <Spacer y={1} />
      <Row justify="space-between" align="flex-start">
        <h1>Admin Detail</h1>
        <Text size={18}>{currentDay}</Text>
      </Row>
      <Spacer y={1} />
      <Grid.Container>
        <Grid xs={12} justify="flex-end">
          <Button
            auto
            onPress={() => {
              setAddModal(true);
            }}
          >
            Add Barber
          </Button>
        </Grid>
        <Spacer y={1} />
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
            items={rowsBarber()}
            loadingState={rowsBarber().length == 0 ? "loading" : undefined}
          >
            {(item) => {
              return (
                <Table.Row key={item.key}>
                  {(columnKey) => {
                    let style = columnKey == "status" ? "8px" : "";
                    let key = columnKey + "";
                    return (
                      <Table.Cell css={{ pl: style }}>
                        {item[key as keyof typeof item]}
                      </Table.Cell>
                    );
                  }}
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
      </Grid>
      <AddBarber
        open={addModal}
        authToken={cookie.Salon}
        closeHandler={closeAddBarber}
      />
      <EditBarber
        open={editModal}
        authToken={cookie.Salon}
        closeHandler={closeEditBarber}
      />
    </motion.div>
  );
};

export default AdminDetail;
