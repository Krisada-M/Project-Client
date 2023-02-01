import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Dropdown,
  FormElement,
  Grid,
  Image,
  Input,
  Link,
  Loading,
  Modal,
  Navbar,
  Row,
  styled,
  Text,
  Tooltip,
  useInput,
  useTheme
} from "@nextui-org/react";
import {
  IconChevronLeft,
  IconLock,
  IconMoonStars,
  IconSunHigh,
  IconUser
} from "@tabler/icons";
import { AxiosError, AxiosResponse } from "axios";
import CryptoJS from "crypto-js";
import { useTheme as useNextTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { userLogin, userRegister } from "../api/user.api";
import {
  useSignupModal,
  useTitleStore,
  useTokenStore,
  useUserStore
} from "../data/store";
import { signinData, signupData } from "../types/user.type";
import EmailInput from "./Input/Email.Input";
import NameInput from "./Input/Name.Input";
import PasswordInput from "./Input/Password.Input";

export const Nav = () => {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const { open } = useSignupModal();
  const { value, reset, bindings } = useInput("");

  const [selected, setSelected] = React.useState(new Set(["Gender"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  const [signup, setSignup] = useState<signupData>({
    username: "",
    password: "",
  });
  const [signin, setSignin] = useState<signinData>({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    gender: selectedValue,
    username: "",
  });
  useEffect(() => {
    setSignin({ ...signin, gender: `${selectedValue}` });
  }, [selectedValue]);
  const [modalSignup, setModalSignup] = useState(open);
  const [modalSignin, setModalSignin] = useState(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false);

  const [remember, setRemember] = useState<boolean>(false);
  const [confirm, setconfirm] = useState<boolean>(false);
  const [LoadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [LoadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [cookies, setCookie, removecookie] = useCookies(["Salon", "userpwd"]);
  const { storeToken } = useTokenStore();
  const { initAuth } = useUserStore();
  const { title } = useTitleStore();
  const handler = () => setModalSignup(true);
  const handler2 = () => setModalSignin(true);
  const secretKey = "Krisada";
  let location = useLocation();
  let navigate = useNavigate();
  const closeHandler = () => {
    setModalSignup(false);
    setSignup({ username: "", password: "" });
  };
  const closeHandler2 = () => {
    setModalSignin(false);
  };
  const closeconfirm = () => {
    setconfirm(false);
    removecookie("Salon");
  };
  useEffect(() => {
    setModalSignup(open);
  }, [open]);

  const submitLogin = () => {
    setLoadingLogin(true);
    userLogin(signup)
      .then((res: AxiosResponse) => {
        toast.success("Welcome to Salon!", {
          position: "bottom-left",
        });
        setCookie("Salon", res.data.Data.accessToken);
        storeToken(res.data.Data.accessToken);

        if (remember) {
          const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(signup),
            secretKey
          ).toString();
          setCookie("userpwd", encrypted);
        }
        setLoadingLogin(false);
        setModalSignup(false);
      })
      .catch(({ response }: AxiosError<{ Message: string }>) => {
        toast.error(`${response?.data?.Message}`);
        setLoadingLogin(false);
      });
  };

  const submitRegister = () => {
    setLoadingRegister(true);
    userRegister(signin)
      .then((_res: AxiosResponse) => {
        toast.success("Successfully created!");
        setLoadingRegister(false);
        setModalSignin(false);
        setModalSignup(true);
      })
      .catch(({ response }: AxiosError<{ Message: string }>) => {
        toast.error(`${response?.data?.Message}`);
        setLoadingRegister(false);
      });
  };

  const navDropdown = (actionKey: React.Key) => {
    switch (actionKey) {
      case "logout":
        setconfirm(true);
        break;
      case "edit":
        navigate("profile");
        break;
    }
  };

  useEffect(() => {
    if (cookies.userpwd != undefined) {
      const decrypted = CryptoJS.AES.decrypt(cookies.userpwd, secretKey);
      const decryptedData: signupData = JSON.parse(
        decrypted.toString(CryptoJS.enc.Utf8)
      );
      setSignup({
        username: decryptedData.username,
        password: decryptedData.password,
      });
    }
  }, [cookies]);

  const items = [
    {
      path: "/",
      pathName: "Home",
    },
    {
      path: "/about",
      pathName: "About",
    },
  ];

  const UserBtn = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  });

  return (
    <div>
      <Toaster />
      <Navbar isBordered={isDark} variant="floating" maxWidth={"xl"}>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Content css={{ w: "15%" }} hideIn="xs" variant="highlight">
          {location.pathname !== "/" ? (
            <Button
              onPress={() => {
                navigate(-1);
              }}
              auto
              light
              size={"sm"}
            >
              <IconChevronLeft
                width={20}
                height={20}
                style={{ marginRight: "10px" }}
              />
            </Button>
          ) : (
            ""
          )}
          <Text b color="primary" size="$xl">
            {title}
          </Text>
        </Navbar.Content>
        <Navbar.Brand
          css={{
            display: "flex",
            justifyContent: "center",
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Image
            src={`${import.meta.env.VITE_STORAGE_URL}images/salon.png`}
            alt="Default Image"
            width={26}
            height={26}
            css={{ p: 0, m: 0 }}
            objectFit="cover"
            containerCss={{
              m: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Text
            b
            color="inherit"
            size={"$3xl"}
            css={{
              ml: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Sukhumvit_Bol",
            }}
          >
            Salon
          </Text>
        </Navbar.Brand>
        {cookies.Salon != undefined ? (
          <Navbar.Content>
            <Tooltip
              trigger="hover"
              color="primary"
              content={isDark ? "Lightmode" : "Darkmode"}
              placement="bottom"
            >
              <Navbar.Item hideIn={"xs"}>
                <Button
                  light
                  color="primary"
                  auto
                  size={"sm"}
                  onPress={() => setTheme(!isDark ? "dark" : "light")}
                  icon={isDark ? <IconSunHigh /> : <IconMoonStars />}
                />
              </Navbar.Item>
            </Tooltip>

            <Dropdown placement="bottom-right">
              <Dropdown.Button as={"div"} light ripple={false}>
                <UserBtn>
                  <Avatar
                    bordered
                    as="button"
                    icon={<IconUser style={{ stroke: "white" }} />}
                    color="primary"
                    squared
                    zoomed
                    css={{ mr: "$6" }}
                  />
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {initAuth.Username}
                  </Text>
                </UserBtn>
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="primary"
                onAction={(actionKey: React.Key) => navDropdown(actionKey)}
              >
                <Dropdown.Item css={{ fontWeight: "500" }}>
                  {initAuth.Name}
                </Dropdown.Item>
                <Dropdown.Item key="edit" withDivider>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item key="logout" withDivider color="error">
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        ) : (
          <Navbar.Content>
            <Tooltip
              trigger="hover"
              color="primary"
              content={isDark ? "Lightmode" : "Darkmode"}
              placement="bottom"
            >
              <Navbar.Item hideIn={"xs"}>
                <Button
                  light
                  color="primary"
                  auto
                  size={"sm"}
                  onPress={() => setTheme(!isDark ? "dark" : "light")}
                  icon={isDark ? <IconSunHigh /> : <IconMoonStars />}
                />
              </Navbar.Item>
            </Tooltip>
            <Navbar.Item hideIn={"xs"}>
              <Button auto light onPress={handler2}>
                Sign Up
              </Button>
            </Navbar.Item>
            <Navbar.Item>
              <Button auto flat onPress={handler}>
                Sign In
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        )}

        <Navbar.Collapse>
          {items.map((item, index) => (
            <Navbar.CollapseItem
              key={index}
              activeColor="secondary"
              css={{
                color: index === items.length - 1 ? "$error" : "",
              }}
              isActive={item.path === location.pathname}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={item.path}
              >
                {item.pathName}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>

      {/* confirm logout */}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={confirm}
        onClose={() => {
          setconfirm(false);
        }}
      >
        <Modal.Body>
          <Row>
            <Text size={14}>Do you want logout ?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto light color="error" onPress={closeconfirm}>
            Confirm
          </Button>
          <Button
            auto
            onPress={() => {
              setconfirm(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Login or Register*/}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={modalSignin}
        onClose={closeHandler2}
      >
        <Modal.Header>
          <Row justify="center">
            <Col>
              <Text id="modal-title" size={18} css={{ m: "$1" }}>
                Welcome to
                <Text b size={18} css={{ marginLeft: "5px" }}>
                  Salon
                </Text>
              </Text>
              <Text id="modal-title" size={18} css={{ m: "$0" }}>
                Please sign in
              </Text>
            </Col>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={2} justify="center">
            <Grid xs={6}>
              <NameInput
                state={signin}
                setState={setSignin}
                nameInput={"Fristname"}
              />
            </Grid>
            <Grid xs={6}>
              <NameInput
                state={signin}
                setState={setSignin}
                nameInput={"Lastname"}
              />
            </Grid>
            <Grid xs={7}>
              <NameInput
                state={signin}
                setState={setSignin}
                nameInput={"Username"}
              />
            </Grid>
            <Grid xs={5}>
              <Dropdown>
                <Dropdown.Button
                  flat
                  size={"lg"}
                  color={
                    selectedValue == "male" || selectedValue == "female"
                      ? "success"
                      : "default"
                  }
                  css={{ tt: "capitalize" }}
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
            <Grid xs={12}>
              <EmailInput state={signin} setState={setSignin} />
            </Grid>
            <Grid xs={12}>
              <PasswordInput state={signin} setState={setSignin} />
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto light color="error" onPress={closeHandler2}>
            Close
          </Button>
          <Button auto onPress={submitRegister} disabled={LoadingRegister}>
            {LoadingRegister ? (
              <Loading color="primary" size="xs" />
            ) : (
              "Sign in"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={modalSignup}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Row justify="center">
            <Col>
              <Text id="modal-title" size={18} css={{ m: "$1" }}>
                Welcome to
                <Text b size={18} css={{ marginLeft: "5px" }}>
                  Salon
                </Text>
              </Text>
              <Text id="modal-title" size={18} css={{ m: "$0" }}>
                Please sign up
              </Text>
            </Col>
          </Row>
        </Modal.Header>

        <Modal.Body>
          <Input
            initialValue={signup.username}
            clearable={!LoadingLogin}
            bordered
            fullWidth
            aria-label="signup-username"
            color="primary"
            size="lg"
            placeholder="Username"
            contentLeft={<IconUser />}
            disabled={LoadingLogin}
            onChange={(e: React.ChangeEvent<FormElement>) =>
              setSignup({ ...signup, ...{ username: e.target.value } })
            }
          />
          <Input.Password
            initialValue={signup.password}
            clearable={!LoadingLogin}
            bordered
            fullWidth
            aria-label="signup-password"
            color="primary"
            size="lg"
            placeholder="Password"
            contentLeft={<IconLock />}
            disabled={LoadingLogin}
            onChange={(e: React.ChangeEvent<FormElement>) =>
              setSignup({ ...signup, ...{ password: e.target.value } })
            }
          />

          <Row justify="space-between" align="center">
            <Checkbox
              defaultSelected={remember}
              onChange={(e: boolean) => setRemember(e)}
            >
              <Text size={14} css={{ m: "$0" }}>
                Remember me
              </Text>
            </Checkbox>
            <Link href="/forgot-password">
              <Text size={14} css={{ m: "$0" }}>
                Forgot password ?
              </Text>
            </Link>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto light color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={submitLogin} disabled={LoadingLogin}>
            {LoadingLogin ? <Loading color="primary" size="xs" /> : "Sign up"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
