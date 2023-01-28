import {
  Button,
  Card,
  Col,
  FormElement,
  Grid,
  Input,
  Loading,
  Modal,
  Row,
  Spacer,
  Text,
  useInput
} from "@nextui-org/react";
import { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userForgotPassword, userVerifyOTP } from "../../api/user.api";
import { useTitleStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";
import { Motion } from "../../styles/ui/Layout";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { title, storeTitle } = useTitleStore();
  const { value, reset, bindings } = useInput("");
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [forgotdata, setForgotdata] = useState({
    ref_no: "",
    user_id: 0,
  });

  const validateEmail = (value: string) => {
    return value.match(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    );
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };

    const isValid = validateEmail(value);
    if (isValid) {
      setEmail(value);
    }
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  const forgotPasswordSent = () => {
    setLoading(true);
    userForgotPassword(email)
      .then((res) => {
        setForgotdata(res.data?.Data);
        setLoading(false);
        setModal(true);
      })
      .catch((err: AxiosError<{ Message: string }>) => {
        const msgErr = err.response?.data.Message ?? "";
        toast.error(msgErr, {
          position: "bottom-left",
        });
        setLoading(false);
      });
  };
  const verifyUser = () => {
    userVerifyOTP({
      ref_no: forgotdata.ref_no,
      user_id: forgotdata.user_id + "",
      otp: otp,
    })
      .then((res) => {
        const tokenPass = res.data?.Data?.user_token;
        navigate("/set-password", {
          state: {
            tokenPass,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    storeTitle("Forgot Password");
  }, []);
  return (
    <Motion>
      <Main>
        <Grid.Container>
          <Grid xs justify="center">
            <Card>
              <Spacer y={1} />
              <Card.Header>
                <Grid xs justify="center">
                  <Text b size={24}>
                    {title}
                  </Text>
                </Grid>
              </Card.Header>
              <Card.Body>
                <Grid.Container justify="center">
                  <Grid xs={3} justify="center" alignItems="flex-end">
                    <Input
                      {...bindings}
                      clearable
                      shadow={false}
                      onClearClick={reset}
                      status={helper.color as any}
                      color={helper.color as any}
                      helperColor={helper.color as any}
                      helperText={helper.text}
                      fullWidth
                      type="email"
                      label="Email"
                      placeholder="your email"
                    />
                  </Grid>
                </Grid.Container>
                <Spacer y={2} />
                <Grid.Container justify="center">
                  <Grid xs justify="center">
                    <Button
                      color={helper.color as any}
                      disabled={helper.color != "success" || loading}
                      onPress={() => {
                        forgotPasswordSent();
                      }}
                    >
                      {loading ? (
                        <Loading color="success" type="points-opacity" />
                      ) : (
                        "  Sent OTP"
                      )}
                    </Button>
                  </Grid>
                </Grid.Container>
                <Spacer y={1} />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
        <Modal aria-labelledby="modal-title" preventClose blur open={modal}>
          <Modal.Header css={{ mt: "$10" }}>
            <Row>
              <Col>
                <Text id="modal-title" size={18} css={{ m: "$0" }}>
                  Please check the OTP in the email.
                </Text>
                <Text size={14} css={{ m: "$0" }}>
                  {`Ref No : ${forgotdata.ref_no.slice(
                    forgotdata.ref_no.length - 5,
                    forgotdata.ref_no.length
                  )}`}
                </Text>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              color="primary"
              size="lg"
              placeholder="OTP"
              onChange={(e: React.ChangeEvent<FormElement>) => {
                setOtp(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer css={{ mt: "$10" }}>
            <Button
              auto
              onPress={() => {
                verifyUser();
              }}
            >
              Verify User
            </Button>
          </Modal.Footer>
        </Modal>
      </Main>
    </Motion>
  );
};

export default ForgotPassword;
