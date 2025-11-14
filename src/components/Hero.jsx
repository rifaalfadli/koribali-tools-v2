import { motion } from "framer-motion";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Hero({ title }) {
  return (
    <section className="hero2">
      <motion.div
        className="hero-overlay2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="hero-content2"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
        </motion.div>
      </motion.div>
    </section>
  );
}
