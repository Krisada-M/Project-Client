import { Input, useInput } from "@nextui-org/react";
import { useMemo } from "react";
import { InputTimeProps } from "../../types/user.type";

const TimeInput = ({ state, setState }: InputTimeProps) => {
  var today = new Date();
  var currentTime = today.getHours() + ":" + today.getMinutes();
  const { value, reset, bindings } = useInput("09:00");

  const validatePassword = (value: string) => {
    return (
      parseFloat(value) >= 9 &&
      parseFloat(value) <= 18 &&
      parseFloat(value) > parseFloat(currentTime)
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
      setState(value);
    }

    return {
      text: isValid ? "" : "โปรดเลือกเวลาอีกครั้ง",
      color: isValid ? undefined : "error",
    };
  }, [value]);
  return (
    <Input
      {...bindings}
      required
      label="เลือก เวลา"
      fullWidth
      placeholder="เลือก เวลา"
      type="time"
      aria-label="1"
      step="600"
      status={helper.color as any}
      color={helper.color as any}
      helperColor={helper.color as any}
      helperText={helper.text}
      initialValue="09:00"
    />
  );
};

export default TimeInput;
