import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MainPage } from "../components/MainPageProyek";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function ProyekPage() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Helmet>
          <title>Our Project - CV. KORI BALI</title>
          <meta
            name="description"
            content="Lihat daftar proyek yang telah diselesaikan oleh CV. KORI BALI, lengkap dengan dokumentasi dan foto hasil kerja."
          />
        </Helmet>

        <Hero title="Our Project" />
        <Breadcrumb page="Project" />
        <MainPage />
      </div>
      <Footer />
    </>
  );
}
