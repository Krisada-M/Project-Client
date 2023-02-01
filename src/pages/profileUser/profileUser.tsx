import { Avatar } from "@mui/material";
import {
  Button,
  Card,
  Col,
  Dropdown,
  FormElement,
  Grid,
  Input,
  Modal,
  Row,
  Text
} from "@nextui-org/react";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  deleteUser,
  updateUserProfile,
  userChangePassword
} from "../../api/user.api";
import { useTitleStore, useUserStore } from "../../data/store";
import { Main, TextCol } from "../../styles/ui/Content";
import { Motion } from "../../styles/ui/Layout";
import { updateUserData } from "../../types/user.type";

const ProfileUser = ({ data }: any) => {
  let navigate = useNavigate();
  const [cookies, , removecookie] = useCookies(["Salon", "userpwd"]);
  const [changePassword, setChangePassword] = useState(false);
  const [dataChangePassword, setDataChangePassword] = useState({
    old_password: "",
    new_password: "",
  });

  const { storeTitle } = useTitleStore();
  const { initAuth, Logout } = useUserStore();
  const [selectedGender, setSelectedGender] = useState<any>(
    new Set([String(initAuth.Gender)])
  );
  const selectedGenderValue = useMemo(
    () => Array.from(selectedGender).join(", ").replaceAll("_", " "),
    [selectedGender]
  );
  const [fname, lname] = initAuth.Name.split(" ");
  const [updateProfile, setupdateProfile] = useState<updateUserData>({
    firstname: fname,
    lastname: lname,
    email: initAuth.Email,
    gender: initAuth.Gender,
  });
  const changePasswodUser = () => {
    userChangePassword(cookies.Salon, dataChangePassword)
      .then((_) => {
        setChangePassword(false);
      })
      .catch((err: AxiosError<{ Message: string }>) => {
        toast.error(err.response?.data?.Message ?? "", {
          position: "bottom-left",
        });
      });
  };
  const updateUser = () => {
    updateUserProfile(cookies.Salon, updateProfile).then((_) => {});
  };
  const closeUser = () => {
    deleteUser(cookies.Salon).then((res) => {
      removecookie("Salon");
      Logout();
      navigate("/");
    });
  };
  useEffect(() => {
    setupdateProfile({
      firstname: fname,
      lastname: lname,
      email: initAuth.Email,
      gender: initAuth.Gender,
    });
    storeTitle("Profile");
  }, []);
  useEffect(() => {
    setupdateProfile({
      ...updateProfile,
      ...{ gender: selectedGenderValue },
    });
  }, [selectedGenderValue]);
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
                  <Card.Header>
                    <Grid.Container>
                      <Grid xs={12} justify="center">
                        <Avatar sx={{ width: 150, height: 150, my: "1rem" }} />
                      </Grid>
                      <Grid>
                        <Text size={25} h1 b>
                          {initAuth.Name}
                        </Text>
                      </Grid>
                    </Grid.Container>
                  </Card.Header>

                  <Card.Body
                    css={{
                      display: "flex",
                      justifyContent: "center",
                      pt: "$0",
                    }}
                  >
                    <Row>
                      <Col>
                        <Row>
                          <TextCol span={6}>
                            <Text
                              h3
                              weight={"bold"}
                              size={16}
                              color="#5c66708c"
                              css={{
                                display: "flex",
                                justifyContent: "center",
                                mr: "$5",
                              }}
                            >
                              Username :
                            </Text>
                          </TextCol>
                          <TextCol>
                            <Text
                              h3
                              size={16}
                              css={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {initAuth.Username}
                            </Text>
                          </TextCol>
                        </Row>
                        <Row>
                          <TextCol span={6}>
                            <Text
                              h3
                              weight={"bold"}
                              size={16}
                              color="#5c66708c"
                              css={{
                                display: "flex",
                                justifyContent: "center",
                                mr: "$5",
                              }}
                            >
                              Email :
                            </Text>
                          </TextCol>
                          <TextCol>
                            <Text
                              h3
                              size={16}
                              css={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {initAuth.Email}
                            </Text>
                          </TextCol>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Grid>
              <Grid css={{ p: "$0", pt: "$10" }}>
                <Card>
                  <Card.Body>
                    <Row justify="center">
                      <Col css={{ display: "flex", justifyContent: "center" }}>
                        <Button color="primary" auto flat onPress={updateUser}>
                          Update Account
                        </Button>
                      </Col>
                      <Col css={{ display: "flex", justifyContent: "center" }}>
                        <Button color="error" auto flat onPress={closeUser}>
                          Delete Account
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Grid>
            </Col>
            <Col span={9}>
              <Card css={{ minHeight: "75vh" }}>
                <Card.Header>
                  <Text size={28} css={{ ml: "$5", mb: "$0" }}>
                    Edit Profile
                  </Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body
                  css={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItem: "ceter",
                  }}
                >
                  <Row justify="center" css={{ mb: "$5" }}>
                    <Col span={5}>
                      <Input
                        aria-label="Firstname"
                        labelLeft="Firstname"
                        initialValue={fname}
                        onChange={(e: React.ChangeEvent<FormElement>) =>
                          setupdateProfile({
                            ...updateProfile,
                            ...{ firstname: e.target.value },
                          })
                        }
                      />
                    </Col>
                    <Col span={5}>
                      <Input
                        aria-label="Lastname"
                        labelLeft="Lastname"
                        initialValue={lname}
                        onChange={(e: React.ChangeEvent<FormElement>) =>
                          setupdateProfile({
                            ...updateProfile,
                            ...{ lastname: e.target.value },
                          })
                        }
                      />
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col span={5}>
                      <Input
                        aria-label="Email"
                        labelLeft="Email"
                        initialValue={initAuth.Email}
                        onChange={(e: React.ChangeEvent<FormElement>) =>
                          setupdateProfile({
                            ...updateProfile,
                            ...{ email: e.target.value },
                          })
                        }
                      />
                    </Col>
                    <Col span={5}>
                      <Row align="center">
                        <Col span={2}>
                          <Text css={{ m: "$0" }}>Gender : </Text>
                        </Col>
                        <Col span={6}>
                          <Dropdown>
                            <Dropdown.Button ghost>
                              {selectedGenderValue}
                            </Dropdown.Button>
                            <Dropdown.Menu
                              aria-label="Static Actions"
                              selectedKeys={selectedGender}
                              onSelectionChange={(e) => {
                                setSelectedGender(e);
                              }}
                              selectionMode="single"
                            >
                              <Dropdown.Item key="male">Male</Dropdown.Item>
                              <Dropdown.Item key="female">Female</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Header css={{ pt: "$0" }}>
                  <Text size={28} css={{ ml: "$5", mb: "$0" }} color="$red600">
                    Danger Zone
                  </Text>
                </Card.Header>
                <Card.Divider />
                <Card.Body
                  css={{ paddingBlock: "$0", justifyContent: "center" }}
                >
                  <Row css={{ mt: "$5" }}>
                    <Col span={1} />
                    <Col span={6}>
                      <Row align="center" css={{ mb: "$5" }}>
                        <Col span={4}>
                          <Button
                            color="error"
                            auto
                            flat
                            onPress={() => {
                              setChangePassword(true);
                            }}
                          >
                            Change Password
                          </Button>
                        </Col>
                        <Col span={8}>
                          <Text h5 css={{ m: "$0" }} color="#5c66708c">
                            Change the password with the existing code.
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row css={{ mt: "$5" }}>
                    <Col span={1} />
                    <Col span={6}>
                      <Row align="center" css={{ mt: "$5" }}>
                        <Col span={4}>
                          <Button
                            color="error"
                            auto
                            flat
                            onPress={() => {
                              navigate("/forgot-password");
                            }}
                          >
                            Forgot Password
                          </Button>
                        </Col>
                        <Col span={8}>
                          <Text h5 css={{ m: "$0" }} color="#5c66708c">
                            Forgot password, want to change password
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Grid.Container>
      </Main>
      <Modal aria-labelledby="modal-title" open={changePassword}>
        <Modal.Header css={{ mt: "$10" }}>
          <Text id="modal-title" size={18}>
            Change password
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input.Password
            clearable
            label="OldPassword"
            fullWidth
            color="primary"
            size="lg"
            placeholder="OldPassword"
            onChange={(e: React.ChangeEvent<FormElement>) =>
              setDataChangePassword({
                ...dataChangePassword,
                ...{ old_password: e.target.value },
              })
            }
          />

          <Input.Password
            clearable
            label="NewPassword"
            fullWidth
            color="primary"
            size="lg"
            placeholder="NewPassword"
            onChange={(e: React.ChangeEvent<FormElement>) =>
              setDataChangePassword({
                ...dataChangePassword,
                ...{ new_password: e.target.value },
              })
            }
          />
        </Modal.Body>
        <Modal.Footer css={{ mt: "$10" }}>
          <Button
            auto
            light
            color="error"
            onPress={() => {
              setChangePassword(false);
            }}
          >
            Cancel
          </Button>
          <Button
            auto
            onPress={() => {
              changePasswodUser();
            }}
          >
            Change password
          </Button>
        </Modal.Footer>
      </Modal>
    </Motion>
  );
};

export default ProfileUser;
