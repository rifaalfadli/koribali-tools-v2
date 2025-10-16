import Breadcrumb from "../components/Breadcrumb";
import { ContactInfo } from "../components/contact/ContactInfo";
import { ContactForm } from "../components/contact/ContactForm";
import { MapEmbed } from "../components/shared/MapEmbed";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Kontak() {
  return (
    <>
      <Header />
      <Hero title="Informasi Kontak" />
      <Breadcrumb page="Kontak" />

      <main>
        <section className="informasi-kontak container">
          <ContactInfo />
        </section>

        <section className="form-area container">
          <h2>Hubungi Kami</h2>
          <div className="form-kontak">
            <ContactForm />
            <MapEmbed />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
