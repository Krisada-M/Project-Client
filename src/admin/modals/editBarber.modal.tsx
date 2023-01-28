import {
  Button,
  Dropdown,
  Grid,
  Input,
  Loading,
  Modal,
  Text
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { serviceListAPI } from "../../api/service.api";
import { editBarber } from "../admin.api";
import { BarberDetail } from "../admin.model";
import DropdownService from "./components/dropdown.component";

interface props {
  open: boolean;
  authToken: string;
  initData: BarberDetail;
  closeHandler: (status: boolean) => void;
}

const EditBarber = ({
  open,
  initData,
  authToken,
  closeHandler,
}: props): JSX.Element => {
  const [serviceListData, setServiceListData] = useState([
    {
      service_name: "",
    },
  ]);
  const [apiStatus, setApiStatus] = useState(false);
  const [selected, setSelected] = useState(new Set([initData.gender ?? "Select"]));
  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [newBarber, setNewBarber] = useState({
    name: initData.name,
    gender: initData.gender,
    status: "online",
    service1: initData.service1,
    service2: initData.service2,
    service3: initData.service3,
    service4: initData.service4,
  });
  useEffect(() => {
    const barberList = async () => {
      const service = await serviceListAPI();
      setServiceListData(service.data.Data.service_list);
    };
    barberList();
  }, []);
  useEffect(() => {
    setNewBarber({ ...newBarber, gender: selectedValue });
  }, [selectedValue]);

  const dropdownItem = [
    {
      key: 1,
      initService: initData.service1,
      setdata: (e: string) => {
        setNewBarber({ ...newBarber, service1: e });
      },
    },
    {
      key: 2,
      initService: initData.service2,
      setdata: (e: string) => {
        setNewBarber({ ...newBarber, service2: e });
      },
    },
    {
      key: 3,
      initService: initData.service3,
      setdata: (e: string) => {
        setNewBarber({ ...newBarber, service3: e });
      },
    },
    {
      key: 4,
      initService: initData.service4,
      setdata: (e: string) => {
        setNewBarber({ ...newBarber, service4: e });
      },
    },
  ];
  async function EditBarberApi() {
    setApiStatus(true);
    const { data } = await editBarber(authToken, newBarber, initData.id);
    if (data) {
      setApiStatus(false);
      closeHandler(true);
    }
  }
  return (
    <Modal
      closeButton
      aria-labelledby="addbarber-modal"
      open={open}
      onClose={() => {
        closeHandler(false);
      }}
    >
      <Modal.Header>
        <Text h3 css={{ m: 0 }}>
          Edit Barber
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container gap={0.3}>
          <Grid xs justify="flex-start">
            <Input
              aria-label="input"
              value={initData.name}
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              onChange={({ target }) => {
                setNewBarber({ ...newBarber, name: target.value });
              }}
              placeholder="Name"
            />
          </Grid>
          <Grid xs justify="flex-end">
            <Dropdown>
              <Dropdown.Button
                flat
                size={"lg"}
                color={
                  selectedValue == "male" || selectedValue == "female"
                    ? "success"
                    : "default"
                }
                css={{ tt: "capitalize", w: "90%" }}
              >
                {selectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="signin-gender"
                color="primary"
                disallowEmptySelection
                defaultSelectedKeys="male"
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={(e: any) => {
                  setSelected(e);
                }}
              >
                <Dropdown.Item key="male">male</Dropdown.Item>
                <Dropdown.Item key="female">female</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid>
        </Grid.Container>

        <Grid.Container direction="column" gap={0.3}>
          {dropdownItem.map((data, index) => {
            return (
              <Grid xs key={data.key + index}>
                <Grid xs>
                  <Grid xs={4} alignItems="center">
                    {`Service ${data.key}:`}
                  </Grid>
                  <Grid xs alignItems="center">
                    <DropdownService
                      init={data.initService}
                      serviceListData={serviceListData}
                      handleChange={(e) => {
                        data.setdata(e);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          onPress={() => {
            EditBarberApi();
          }}
          disabled={apiStatus}
        >
          {apiStatus ? <Loading color="primary" size="xs" /> : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBarber;
