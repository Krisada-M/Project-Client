import {
  Button,
  Col,
  Dropdown,
  Grid,
  Input,
  Row,
  Text
} from "@nextui-org/react";
import { IconUserSearch } from "@tabler/icons";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { barberListAPI, barberLiveSearch } from "../../api/barber.api";
import { serviceListAPI } from "../../api/service.api";
import { ProfileCard } from "../../components/ProfileCard.component";
import { ProfileCardLoad } from "../../components/ProfileCardLoad.component";
import { useTitleStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";
import { Motion } from "../../styles/ui/Layout";

const Barber = () => {
  const { storeTitle } = useTitleStore();
  const [iconcolor, setIconColor] = useState<string>("#889096");
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = useState<number>(500);
  const [clear, setClear] = useState<boolean>(false);
  const [barberData, setBarberData] = useState<object[]>([]);
  const [serviceListData, setServiceListData] = useState([
    {
      service_name: "",
    },
  ]);

  const [selectedService, setSelectedService] = useState<any>(
    new Set(["Select"])
  );
  const [selectedGender, setSelectedGender] = useState<any>(
    new Set(["Select"])
  );

  const selectedServiceValue = useMemo(
    () => Array.from(selectedService).join(", ").replaceAll("_", " "),
    [selectedService]
  );

  const selectedGenderValue = useMemo(
    () => Array.from(selectedGender).join(", ").replaceAll("_", " "),
    [selectedGender]
  );
  useEffect(() => {
    const barberList = async () => {
      const res = await barberListAPI();
      const service = await serviceListAPI();
      if (res.status === 200) {
        setStatus(res.status);
      } else {
        setStatus(0);
      }
      setSelectedGender(new Set(["Select"]));
      setBarberData(res.data.Data.barber_detail);
      setServiceListData(service.data.Data.service_list);
    };
    barberList();
  }, [clear]);
  // live search
  useEffect(() => {
    const barberSearch = async () => {
      const res = await barberLiveSearch({
        keyword: searchValue,
        service: selectedServiceValue,
        gender: selectedGenderValue,
      });
      setBarberData(res.data.Data.barber_detail);
      if (res.status === 200) {
        setStatus(res.status);
      } else {
        setStatus(0);
      }
    };
    barberSearch();
  }, [searchValue, selectedGenderValue, selectedServiceValue]);

  const dropdownItem = [
    {
      title: "Gender",
      itemSelect: [{ service_name: "male" }, { service_name: "female" }],
      variable: {
        get: selectedGender,
        set: setSelectedGender,
        show: selectedGenderValue,
      },
    },
  ];
  useEffect(() => {
    storeTitle("Barber");
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
          <Row gap={2} css={{ mb: "$10" }}>
            <Col
              css={{ display: "flex", justifyContent: "flex-start" }}
              span={4}
            >
              <Input
                contentLeft={<IconUserSearch style={{ stroke: iconcolor }} />}
                aria-label="Barber Name"
                color="primary"
                clearable
                placeholder="Barber Name"
                onChange={({ target }) => {
                  setSearchValue(target.value);
                }}
                onFocus={(_) => {
                  setIconColor("#0072F5");
                }}
                onBlur={(_) => {
                  setIconColor("#889096");
                }}
                bordered
                fullWidth
              />
            </Col>
            <Col span={4}>
              <Row align="center">
                {dropdownItem.map((data, i) => {
                  return (
                    <Col span={6} key={i}>
                      <Row align="center">
                        <Col span={4}>
                          <Text css={{ m: "$0" }}>{data.title} : </Text>
                        </Col>
                        <Col span={6}>
                          <Dropdown>
                            <Dropdown.Button
                              flat
                              color="primary"
                              css={{ tt: "capitalize", minWidth: "100%" }}
                            >
                              {data.variable.show}
                            </Dropdown.Button>
                            <Dropdown.Menu
                              aria-label="Multiple selection actions"
                              color="primary"
                              disallowEmptySelection
                              selectionMode="single"
                              selectedKeys={data.variable.get}
                              onSelectionChange={data.variable.set}
                            >
                              {data.itemSelect.map((item) => {
                                return (
                                  <Dropdown.Item key={item.service_name}>
                                    {item.service_name}
                                  </Dropdown.Item>
                                );
                              })}
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
                <Col span={6}>
                  <Button
                    auto
                    color={"error"}
                    flat
                    onPress={() => {
                      setClear(!clear);
                    }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          {barberData.length == 0 ? (
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
              <Grid xl>
                <ProfileCardLoad status={status}/>
              </Grid>
            </motion.div>
          ) : (
            barberData.map((data, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{
                    delay: i / 10,
                    type: "spring",
                    stiffness: 100,
                    bounce: 0.2,
                  }}
                >
                  <Grid xl>
                    <ProfileCard data={{ num: i, detail: data }} />
                  </Grid>
                </motion.div>
              );
            })
          )}
        </Grid.Container>
      </Main>
    </Motion>
  );
};

export default Barber;
