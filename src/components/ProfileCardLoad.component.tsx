import { Card, Row } from "@nextui-org/react";
import { Skeleton } from "antd";

export const ProfileCardLoad = () => {
  return (
    <Card css={{ p: "$6", w: "362px" }} variant="bordered">
      <Card.Header>
        <Row justify="space-between" align="center">
          <Skeleton avatar paragraph={{ rows: 4 }} active />
        </Row>
      </Card.Header>
    </Card>
  );
};
