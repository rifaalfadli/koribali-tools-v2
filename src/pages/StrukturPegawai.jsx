import { useEffect, useState } from "react";
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
      <table id={`data-divisi-${id}`} border={1}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th>Nama</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", color: "gray" }}>
                Belum ada anggota di divisi ini.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default function StrukturPegawai() {
  const [anggota, setAnggota] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data anggota dari server
  useEffect(() => {
    const fetchAnggota = async () => {
      try {
        const res = await fetch("http://localhost:5000/anggota");
        if (!res.ok) throw new Error("Gagal ambil data anggota");
        const data = await res.json();
        setAnggota(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnggota();
  }, []);

  // Kelompokkan berdasarkan divisi
  const ys = anggota.filter((a) => a.divisi === "YS");
  const yp = anggota.filter((a) => a.divisi === "YP");
  const dev = anggota.filter((a) => a.divisi === "Development");

  if (loading) return <div className="profile-loading">Loading data...</div>;

  return (
    <>
      <Header />
      <Hero title="Struktur Pegawai" />
      <Breadcrumb page="Struktur Pegawai" />

      <main>
        <DivisiTable id="ys" title="Divisi YS" data={ys} />
        <DivisiTable id="yp" title="Divisi YP" data={yp} />
        <DivisiTable id="development" title="Divisi Development" data={dev} />
      </main>

      <Footer />
    </>
  );
}
