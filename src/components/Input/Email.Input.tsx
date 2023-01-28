import { Input, useInput } from "@nextui-org/react";
import { useMemo } from "react";
import { InputSigninProps } from "../../types/user.type";

const EmailInput = ({ state, setState }: InputSigninProps) => {
  const { value, reset, bindings } = useInput("");
  const validateEmail = (value: string) => {
    return value.match(
      /^[a-z0-9]+(?!.*(?:\+{2,}|\-{2,}|\.{2,}))(?:[\.+\-]{0,1}[a-z0-9])*@(gmail|hotmail|rmutp)\.(com|ac.th)$/gim
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
      setState({ ...state, email: value });
    }
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);
  return (
    <Input
      {...bindings}
      clearable
      shadow={false}
      onClearClick={reset}
      status={helper.color as any}
      color={helper.color as any}
      helperColor={helper.color as any}
      helperText={helper.text}
      type="email"
      size="lg"
      fullWidth
      bordered
      placeholder="Email"
      aria-label="signin-email"
      name="Email"
    />
  );
};

export default EmailInput;
