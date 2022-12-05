import {
  Button,
  Card,
  FormElement,
  Grid,
  Input,
  Spacer,
  Text,
  useInput
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { userSetPassword } from "../../api/user.api";
import { useTitleStore } from "../../data/store";
import { Main } from "../../styles/ui/Content";
import { Motion } from "../../styles/ui/Layout";

const SetPassword = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const { title, storeTitle } = useTitleStore();
  const { value, reset, bindings } = useInput("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [conDetail, setConDetail] = useState({
    text: "",
    color: "",
  });

  const validatePasword = (value: string) => {
    return value.match(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
    );
  };

  const conPass = () => {
    if (confirmPass.length > 0) {
      setConDetail({
        text: confirmPass === value ? "Password Match" : "Password Not Match",
        color: confirmPass === value ? "success" : "error",
      });
    }
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };

    const isValid = validatePasword(value);
    if (isValid) {
      setEmail(value);
    }
    return {
      text: isValid ? "Good Password" : "Bad Password",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  useEffect(() => {
    storeTitle("New Password");
  }, []);
  useEffect(() => {
    conPass();
  }, [confirmPass]);

  const setPassword = () => {
    userSetPassword(params.state.tokenPass, confirmPass).then((_res) => {
      navigate("/");
    });
  };
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
                  <Grid
                    xs={3}
                    justify="center"
                    alignItems="flex-end"
                    direction="column"
                  >
                    <Input.Password
                      {...bindings}
                      clearable
                      shadow={false}
                      onClearClick={reset}
                      status={helper.color as any}
                      color={helper.color as any}
                      helperColor={helper.color as any}
                      helperText={helper.text}
                      fullWidth
                      label="New Password"
                      placeholder="your new password"
                    />
                    <Spacer y={1} />
                    <Input.Password
                      clearable
                      shadow={false}
                      onChange={(e: React.ChangeEvent<FormElement>) =>
                        setConfirmPass(e.target.value)
                      }
                      status={conDetail.color as any}
                      color={conDetail.color as any}
                      helperColor={conDetail.color as any}
                      helperText={conDetail.text}
                      fullWidth
                      label="Confirm Password"
                      placeholder="your new password again"
                    />
                  </Grid>
                </Grid.Container>
                <Spacer y={2} />
                <Grid.Container justify="center">
                  <Grid xs justify="center">
                    <Button
                      color={conDetail.color as any}
                      disabled={conDetail.color != "success"}
                      onPress={() => {
                        setPassword();
                      }}
                    >
                      Set password
                    </Button>
                  </Grid>
                </Grid.Container>
                <Spacer y={1} />
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
      </Main>
    </Motion>
  );
};

export default SetPassword;
