import Skeleton from "@mui/material/Skeleton";
import { Card, Col, Row, Text } from "@nextui-org/react";

export const ProfileCardLoad = ({ status }: { status: number }) => {
  if (status == 200) {
    return (
      <>
        <Text h5 color="#C1C8CD" weight="light">
          ไม่พบข้อมูลของช่าง
        </Text>
      </>
    );
  }
  return (
    <Card css={{ p: "$6", w: "362px" }} variant="bordered">
      <Card.Header>
        <Row justify="space-between" align="center">
          <Col>
            <Row css={{ mb: "$5" }}>
              <Col span={3}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={50}
                  height={50}
                />
              </Col>
              <Col span={7}>
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "14px" }}
                />
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ fontSize: "14px" }}
                  width={70}
                />
              </Col>
            </Row>
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "14px" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "14px" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "14px" }}
            />
            <Skeleton
              animation="wave"
              variant="text"
              sx={{ fontSize: "14px" }}
            />
          </Col>
        </Row>
      </Card.Header>
    </Card>
  );
};
