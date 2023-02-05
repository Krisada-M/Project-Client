import { Input, useInput } from "@nextui-org/react";
import { useMemo } from "react";
import { InputSigninProps } from "../../types/user.type";

const NameInput = ({ state, setState, nameInput }: InputSigninProps) => {
  const { value, reset, bindings } = useInput("");
  const validate = (value: string) => {
    return value.length > 2 && value.length < 15;
  };

  const helper = useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };

    const isValid = validate(value);
    if (isValid) {
      switch (nameInput) {
        case "Fristname":
          setState({ ...state, firstname: value });
          break;
        case "Lastname":
          setState({ ...state, lastname: value });
          break;
        case "Username":
          setState({ ...state, username: value });
          break;
      }
    }
    return {
      text: isValid ? `Correct ${nameInput} !` : "Enter 2-8 character",
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
      size="lg"
      fullWidth
      bordered
      placeholder={nameInput}
      aria-label={`signin-${nameInput}`}
      name={nameInput}
    />
  );
};

export default NameInput;
