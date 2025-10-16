import Breadcrumb from "../components/Breadcrumb";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function Galeri() {
  return (
    <>
      <Header />
      <Hero title="Galery Preview" />
      <Breadcrumb page="Galeri" />

      <main>
        <section id="galeri-preview" className="carousel-container">
          <div className="carousel container">
            <figure className="card">
              <img src="/images/gambar14.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar15.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar16.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar17.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar18.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar19.PNG" alt="Tiang lampu jalan" />
              <figcaption>Tiang lampu jalan</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar20.PNG" alt="Tiang lampu sorot" />
              <figcaption>Tiang lampu sorot</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar21.PNG" alt="Tiang lampu sorot" />
              <figcaption>Tiang lampu sorot</figcaption>
            </figure>
            <figure className="card">
              <img src="/images/gambar22.PNG" alt="Tiang lampu sorot" />
              <figcaption>Tiang lampu sorot</figcaption>
            </figure>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
