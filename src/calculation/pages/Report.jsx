import { ReportPage } from "../components/ReportPage";
import { Helmet } from "react-helmet";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Report() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Helmet>
          <title>Report - CV. KORI BALI</title>
          <meta
            name="report"
            content="Report System CV. KORI BALI menyajikan hasil analisis dan ringkasan data struktur pole secara lengkap."
          />
        </Helmet>
        <div className="pt-8 flex justify-center">
          <div className="min-h-screen w-4/5 bg-gray-50 border border-gray-250 hp:w-[95%]">
            <ReportPage />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
