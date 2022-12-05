import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Nav } from "../../components/Nav.component";
import { useTitleStore } from "../../data/store";
import { Props } from "../../types/props.type";
import { Box } from "./Box";
import { Content } from "./Content";

const Layout = ({ children }: Props) => {
  const { title } = useTitleStore();
  return (
    <>
      <Helmet titleTemplate="%s - Salon" defaultTitle="Loading...">
        <title>{title}</title>
      </Helmet>
      <Box>
        <Nav />
        <Content>
          <AnimatePresence>{children}</AnimatePresence>
        </Content>
      </Box>
    </>
  );
};

const Motion = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export { Layout, Motion };

