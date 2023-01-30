import { Avatar, Badge, Card, Col, Grid, Row, Text } from "@nextui-org/react";
import { IconMan, IconWoman } from "@tabler/icons";
import { useNavigate } from "react-router-dom";

export const ProfileCard = ({ data }: any) => {
  let navigate = useNavigate();
  let color = data.detail.gender == "male" ? "$blue700" : "$pink700";
  const service = [
    data.detail.service1,
    data.detail.service2,
    data.detail.service3,
    data.detail.service4,
  ];

  return (
    <Card
      css={{ p: "$6", w: "362px" }}
      isHoverable
      isPressable
      variant="bordered"
      onPress={() => {
        const numB = data.detail.ID;
        navigate("profile", {
          state: {
            numB,
          },
        });
      }}
    >
      <Card.Header css={{ pt: "$0", pb: "$0" }}>
        <Row justify="space-between" align="center">
          <Col span={3}>
            <Badge
              content={" "}
              color={data.detail.status == "online" ? "success" : "default"}
              css={{ p: 0 }}
              placement="bottom-right"
              size="md"
            >
              <Avatar
                css={{ size: "4rem" }}
                icon={
                  data.detail.gender == "male" ? (
                    <IconMan height={80} color="#0072f5" />
                  ) : (
                    <IconWoman height={80} color="#ff29c2" />
                  )
                }
                bordered
                squared
              />
            </Badge>
          </Col>
          <Col span={10}>
            <Row>
              <Grid xs={12} direction="column">
                <Row align="center">
                  <Text
                    b
                    size={18}
                    color={color}
                    css={{ display: "flex", mb: "$0" }}
                  >
                    {`ช่าง ${data.detail.name}`}
                  </Text>
                </Row>
                <Row align="center">
                  <Text
                    size={12}
                    color="$gray600"
                    css={{
                      display: "flex",
                      alignItems: "center",
                      m: "0px 0px 1px 1px",
                    }}
                  >
                    สถานะ
                  </Text>
                  <Text
                    size={12}
                    color="$gray600"
                    css={{
                      display: "flex",
                      alignItems: "center",
                      m: "0px 0px 1px 5px",
                    }}
                  >
                    {data.detail.status}
                  </Text>
                </Row>
              </Grid>
            </Row>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body css={{ pb: "$8", pt: "$0" }}>
        <Grid.Container gap={1}>
          <Grid xs={12}>
            <Text css={{ m: "$0" }} size={13} color="$gray700">
              บริการที่โดดเด่น
            </Text>
          </Grid>
          {service.map((d, i) => {
            if (d == null) {
              return;
            }
            return (
              <Grid key={i}>
                <Badge color="success" isSquared disableOutline variant="flat">
                  {d}
                </Badge>
              </Grid>
            );
          })}
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};
