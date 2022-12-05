import { Card, Col, Text } from "@nextui-org/react";
import { Carousel } from "antd";
import SalonImg1 from "/images/salonImg1.jpg";
import SalonImg2 from "/images/salonImg2.jpg";
import SalonImg3 from "/images/salonImg3.jpg";

export const CarouselSalon = () => {
  return (
    <Carousel autoplay dotPosition={"top"}>
      <div>
        <Card.Header css={{ position: "absolute", zIndex: 50, top: 5 }}>
          <Col>
            <Text
              size={36}
              weight="bold"
              transform="uppercase"
              color="#ffffffAA"
            >
              New
            </Text>
            <Text h3 color="white">
              Acme camera
            </Text>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            width="100%"
            height="100%"
            objectFit="cover"
            src={SalonImg1}
          />
        </Card.Body>
      </div>
      <div>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            width="100%"
            height="100%"
            objectFit="cover"
            src={SalonImg2}
          />
        </Card.Body>
      </div>
      <div>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            width="100%"
            height="100%"
            objectFit="cover"
            src={SalonImg3}
          />
        </Card.Body>
      </div>
    </Carousel>
  );
};
