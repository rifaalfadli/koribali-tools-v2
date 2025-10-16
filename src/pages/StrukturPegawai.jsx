import Breadcrumb from "../components/Breadcrumb";
import Hero from "../components/Hero";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/Style.css";
import "../assets/styles/Responsive.css";

function DivisiTable({ id, title, data }) {
  return (
    <section id={id} className="container container-struktur">
      <h2>{title}</h2>
      <table
        id={`data-divisi-${id}`}
        border={1}
        cellPadding={8}
        cellSpacing={0}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th>Nama</th>
          </tr>
        </thead>
        <tbody>
          {data.map((nama, index) => (
            <tr key={index}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td>{nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function StrukturPegawai() {
  return (
    <>
      <Header />
      <Hero title="Struktur Pegawai" />
      <Breadcrumb page="Struktur Pegawai" />

      <main>
        <DivisiTable
          id="ys"
          title="Divisi YS"
          data={[
            "Bintarjo Agus Priyadi",
            "M. Ramdan Purnama",
            "Ajie Jodi Sumarno",
            "Nawid Ahmad",
            "Vannto",
          ]}
        />

        <DivisiTable
          id="yp"
          title="Divisi YP"
          data={[
            "Ricki Harmon",
            "Pijar Eko Saktiaji",
            "Muhammad Fitra Romadhon",
            "Cece Saepurrohman",
            "Mediani Utami",
            "Raden Nur Afrisya",
          ]}
        />

        <DivisiTable
          id="development"
          title="Divisi Development"
          data={[
            "Amiril Mukminin",
            "Muhammad Rifa Alfadli",
            "Ni Nyoman Kayika Manuhita",
            "Nurul Balqis Apriany",
            "Azzachra Caesyafitri",
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
