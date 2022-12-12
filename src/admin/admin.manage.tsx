import { motion } from "framer-motion";

const AdminManage = () => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
    >
      <h1>AdminManage</h1>
    </motion.div>
  );
};

export default AdminManage;
