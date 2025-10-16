import { Link } from "react-router-dom";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

export default function SectionVBA() {
  return (
    <section id="vba" className="container container-proyek">
      <h2>Perhitungan Kalkulasi Menggunakan VBA</h2>

      <article>
        <h3>Sistem Kalkulasi Otomatis VBA</h3>
        <img src="/images/gambar25.PNG" alt="Kalkulasi VBA" width="300" />
        <p>
          Sistem otomatisasi perhitungan teknis berbasis Excel VBA untuk
          validasi kekuatan dan efisiensi.
        </p>
      </article>

      <article>
        <h3>Sistem Kalkulasi Otomatis VBA</h3>
        <img src="/images/gambar25.PNG" alt="Kalkulasi VBA" width="300" />
        <p>
          Sistem otomatisasi perhitungan teknis berbasis Excel VBA untuk
          validasi kekuatan dan efisiensi.
        </p>
      </article>

      <article>
        <h3>Sistem Kalkulasi Otomatis VBA</h3>
        <img src="/images/gambar25.PNG" alt="Kalkulasi VBA" width="300" />
        <p>
          Sistem otomatisasi perhitungan teknis berbasis Excel VBA untuk
          validasi kekuatan dan efisiensi.
        </p>
      </article>

      <Link to="/proyek/proyek-vba">Lihat Selengkapnya</Link>
    </section>
  );
}
