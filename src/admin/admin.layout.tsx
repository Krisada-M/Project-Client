import { Grid } from "@nextui-org/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTitleStore } from "../data/store";
import { BoxMain, Container, PageColor } from "./admin.component";
import Sidebar from "./admin.sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { title } = useTitleStore();
  return (
    <>
      <Helmet titleTemplate="%s - Salon" defaultTitle="Loading...">
        <title>{title}</title>
      </Helmet>
      <Container>
        <Grid xs={2}>
          <Sidebar />
        </Grid>
        <Grid xs={10}>
          <PageColor>
            <BoxMain xs={12}>{children}</BoxMain>
          </PageColor>
        </Grid>
      </Container>
    </>
  );
};

export { AdminLayout };

