import { Grid, styled } from "@nextui-org/react";

const Container = styled(Grid.Container, {
  boxSizing: "border-box",
  width: "100%",
  height: "100vh",
});

const PageColor = styled(Grid.Container, {
  backgroundColor: "#252525",
});

const BoxMain = styled(Grid, {
  backgroundColor: "#fff",
  borderRadius: "$2xl",
  margin: "$8 $5",
  padding: "$6 $8",
});

export { BoxMain, PageColor, Container };

