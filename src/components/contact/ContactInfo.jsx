import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../../assets/styles/Style.css";
import "../../assets/styles/Responsive.css";

export const ContactInfo = () => {
  const infoList = [
    {
      icon: "/images/icon-office.svg",
      title: "Kantor Pusat",
      text: "Jl. Gunung Kerinci No. 22, Denpasar, Bali",
    },
    {
      icon: "/images/icon-address.svg",
      title: "Kantor Cabang",
      text: "Jl. Haur Jaya 2 No. 16, Kel. Tanah Sareal, Kota Bogor",
    },
    {
      icon: "/images/icon-mail.svg",
      title: "Email",
      text: (
        <Link to="mailto:cv.koribali@gmail.com">cv.koribali@gmail.com</Link>
      ),
    },
    {
      icon: "/images/icon-telephone.svg",
      title: "Telepon",
      text: <Link to="#">0853 3359 6000</Link>,
    },
  ];

  return (
    <>
      {infoList.map((item, i) => (
        <motion.article
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
        >
          <img src={item.icon} alt={`icon ${item.title}`} />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </motion.article>
      ))}
    </>
  );
};
