import { Col, Dropdown, Grid, Input, Row, Text } from "@nextui-org/react";
import { IconUserSearch } from "@tabler/icons";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { barberListAPI, barberLiveSearch } from "../../api/barber.api";
import { ProfileCard } from "../../components/ProfileCard.component";
import { ProfileCardLoad } from "../../components/ProfileCardLoad.component";
import { useTitleStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";
import { Motion } from "../../styles/ui/Layout";

const Barber = () => {
  const { storeTitle } = useTitleStore();
  const [iconcolor, setIconColor] = useState<string>("#889096");
  const [searchValue, setSearchValue] = useState<string>("");
  const [barberData, setBarberData] = useState<object[]>([]);
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
      const { data } = await barberListAPI();
      setBarberData(data.Data.barber_detail);
    };
    barberList();
  }, []);
  // live search
  useEffect(() => {
    const barberSearch = async () => {
      const { data } = await barberLiveSearch({
        keyword: searchValue,
        gender: selectedGenderValue,
      });
      setBarberData(data.Data.barber_detail);
    };
    barberSearch();
  }, [searchValue, selectedGenderValue, selectedService]);

  const dropdownItem = [
    {
      title: "Service",
      itemSelect: [{ key: "1", name: "1" }],
      variable: {
        get: selectedService,
        set: setSelectedService,
        show: selectedServiceValue,
      },
    },
    {
      title: "Gender",
      itemSelect: [
        { key: "ชาย", name: "ชาย" },
        { key: "หญิง", name: "หญิง" },
      ],
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
                                  <Dropdown.Item key={item.key}>
                                    {item.name}
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
                <ProfileCardLoad />
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
