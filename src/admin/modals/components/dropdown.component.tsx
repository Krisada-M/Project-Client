import { Dropdown } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

const DropdownService = ({
  init,
  blockKeys,
  serviceListData,
  handleChange,
}: {
  init?: string;
  blockKeys: string[];
  serviceListData: {
    service_name: string;
  }[];
  handleChange: (e: any) => void;
}) => {
  const [selectedService, setSelectedService] = useState<any>(
    new Set([init ?? "Select"])
  );
  const selectedServiceValue = useMemo(
    () => Array.from(selectedService).join(", ").replaceAll("_", " "),
    [selectedService]
  );
  useEffect(() => {
    handleChange(selectedServiceValue);
  }, [selectedService]);

  return (
    <>
      <Dropdown>
        <Dropdown.Button
          flat
          color="primary"
          css={{ tt: "capitalize", minWidth: "100%" }}
        >
          {selectedServiceValue}
        </Dropdown.Button>
        <Dropdown.Menu
          aria-label="Multiple selection actions"
          disabledKeys={blockKeys}
          color="primary"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedService}
          onSelectionChange={setSelectedService}
        >
          {serviceListData.map((item) => {
            return (
              <Dropdown.Item key={item.service_name}>
                {item.service_name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default DropdownService;
