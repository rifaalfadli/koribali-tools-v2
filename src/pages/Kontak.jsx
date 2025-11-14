import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import { ContactInfo } from "../components/contact/ContactInfo";
import { ContactForm } from "../components/contact/ContactForm";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Kontak() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Helmet>
          <title>Kontak - CV. KORI BALI</title>
          <meta
            name="description"
            content="Hubungi CV. KORI BALI untuk pertanyaan, informasi layanan, atau kerja sama bisnis. Kami siap membantu Anda."
          />
        </Helmet>

        <Hero title="Informasi Kontak" />
        <Breadcrumb page="Kontak" />

        <main>
          <section className="informasi-kontak container">
            <ContactInfo />
          </section>

          <ContactForm />
        </main>
      </div>
      <Footer />
    </>
  );
}
