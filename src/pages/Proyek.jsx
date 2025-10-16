import Breadcrumb from "../components/Breadcrumb";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SectionRendering from "../components/SectionRendering";
import Section3D from "../components/Section3D";
import Section2D from "../components/Section2D";
import SectionVBA from "../components/SectionVBA";
import Sidebar from "../components/Sidebar";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function ProyekPage() {
  return (
    <>
      <Header />
      <Hero title="Proyek Kami" />
      <Breadcrumb page="Proyek" />

      <main className="proyek-page">
        <SectionRendering />
        <Section3D />
        <Section2D />
        <SectionVBA />
        <Sidebar />
      </main>

      <Footer />
    </>
  );
}
