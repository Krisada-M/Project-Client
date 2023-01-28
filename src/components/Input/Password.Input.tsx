import { Input, useInput } from "@nextui-org/react";
import { useMemo } from "react";
import { InputSigninProps } from "../../types/user.type";

const PasswordInput = ({ state, setState }: InputSigninProps) => {
  const { value, reset, bindings } = useInput("");
  const validatePassword = (value: string) => {
    return value.match(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
    );
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };

    const isValid = validatePassword(value);
    if (isValid) {
      setState({ ...state, password: value });
    }
    return {
      text: isValid
        ? "Correct Password !"
        : "Enter Uppercase Lowercase number and Special character",
      color: isValid ? "success" : "error",
    };
  }, [value]);
  return (
    <Input.Password
      {...bindings}
      clearable
      shadow={false}
      onClearClick={reset}
      status={helper.color as any}
      color={helper.color as any}
      helperColor={helper.color as any}
      helperText={helper.text}
      size="lg"
      fullWidth
      bordered
      placeholder="Password"
      aria-label="signin-password"
      name="Password"
    />
  );
};

export default PasswordInput;
