import { Link } from "react-router-dom";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function SectionRendering() {
  return (
    <section id="rendering" className="container container-proyek">
      <h2>Rendering Proyek</h2>

      <article>
        <h3>Rendering dan Visualisasi</h3>
        <img
          src="/images/gambar9.jpg"
          alt="Rendering Visualisasi"
          width="300"
        />
        <p>
          Visualisasi akhir proyek dalam bentuk render 3D untuk presentasi dan
          dokumentasi klien.
        </p>
      </article>

      <article>
        <h3>Rendering dan Visualisasi</h3>
        <img
          src="/images/gambar11.jpg"
          alt="Rendering Visualisasi"
          width="300"
        />
        <p>
          Visualisasi akhir proyek dalam bentuk render 3D untuk presentasi dan
          dokumentasi klien.
        </p>
      </article>

      <article>
        <h3>Rendering dan Visualisasi</h3>
        <img
          src="/images/gambar12.jpg"
          alt="Rendering Visualisasi"
          width="300"
        />
        <p>
          Visualisasi akhir proyek dalam bentuk render 3D untuk presentasi dan
          dokumentasi klien.
        </p>
      </article>

      <Link to="/proyek/proyek-rendering">Lihat Selengkapnya</Link>
    </section>
  );
}
