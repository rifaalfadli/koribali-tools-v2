import React, { useState } from "react";
import LightingPoleReport from "./lightingpole_report/LightingPoleReport";
import AcemastReport from "./acemast/AcemastReport";
import {
  ArrowLeft,
  Download,
  Trash2,
  FileText,
  AlertCircle,
  Calculator,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function ReportPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data cover, condition, results, sections dari state router
  // Jika tidak ada, fallback ke array kosong untuk mencegah error
  const reportData = location.state || {
    results: JSON.parse(sessionStorage.getItem("results") || "[]"),
    resultsDo: JSON.parse(sessionStorage.getItem("resultsDo") || "[]"),
    resultsOhw: JSON.parse(sessionStorage.getItem("resultsOhw") || "[]"),
    cover: JSON.parse(sessionStorage.getItem("cover") || "{}"),
    condition: JSON.parse(sessionStorage.getItem("condition") || "{}"),
    structuralDesign: JSON.parse(
      sessionStorage.getItem("structuralDesign") || "{}",
    ),
  };

  const { results, resultsDo, resultsOhw, cover, condition, structuralDesign } =
    reportData;

  // Tombol kembali ke calculation page
  const onBack = () => navigate("/calculation");

  // State pop-up delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Flag apakah report masih ada atau sudah dihapus
  const [hasReport, setHasReport] = useState(true);

  // Fungsi print + rename file PDF via dokumen.title (workaround umum)
  const handlePrint = () => {
    const oldTitle = document.title;
    document.title = cover.calculationNumber; // rename filename
    window.print(); // buka dialog print
    document.title = oldTitle; // kembalikan title setelah print
  };

  // Hapus report: reset flag & tutup modal
  const handleDelete = () => {
    setHasReport(false);
    setShowDeleteConfirm(false);

    navigate("/calculation", { state: { deleteReport: true } });
  };

  // Render report component based on selected project type
  const renderReport = () => {
    switch (condition?.projectType) {
      case "lightingPole":
        return (
          <div id="report-a4">
            <LightingPoleReport
              cover={cover}
              condition={condition}
              structuralDesign={structuralDesign}
              results={results}
              resultsDo={resultsDo}
            />
          </div>
        );
      case "acemast":
        return (
          <div id="report-a4">
            <AcemastReport
              cover={cover}
              condition={condition}
              structuralDesign={structuralDesign}
              results={results}
              resultsDo={resultsDo}
              resultsOhw={resultsOhw}
            />
          </div>
        );
      default:
        return <div />;
    }
  };

  // Empty State - No Report
  if (!hasReport || results.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-250">
        {/* Empty State Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-12 text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#0d3b66] to-[#3399cc] rounded-3xl mb-6 shadow-lg">
                <FileText className="w-12 h-12 text-white" />
              </div>

              {/* Title */}
              <h1 className="text-[#0d3b66] mb-3">No Report Available</h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't generated any calculation report yet. Start by
                creating pole sections and running calculations to generate your
                first report.
              </p>

              {/* Steps */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-8 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3399cc] text-white rounded-lg flex items-center justify-center shadow-sm">
                      1
                    </div>
                    <div>
                      <div className="text-[#0d3b66]">Input All Form</div>
                      <p className="text-gray-600">
                        Add and configure with specifications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3399cc] text-white rounded-lg flex items-center justify-center shadow-sm">
                      2
                    </div>
                    <div>
                      <div className="text-[#0d3b66]">Calculate Results</div>
                      <p className="text-gray-600">
                        Click calculate to process structural analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-left">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#3399cc] text-white rounded-lg flex items-center justify-center shadow-sm">
                      3
                    </div>
                    <div>
                      <div className="text-[#0d3b66]">Generate Report</div>
                      <p className="text-gray-600">
                        View and export comprehensive calculation report
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={onBack}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#0d3b66] to-[#3399cc] text-white rounded-xl hover:shadow-xl transition-all shadow-lg"
              >
                <Calculator className="w-5 h-5" />
                Go to Calculator
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar - Hidden on Print */}
      <div className="bg-white  print:hidden sticky top-[70px] z-40 shadow-sm border border-[#0d3b66]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-sm gap-2 px-5 py-2.5 bg-white text-[#0d3b66] border border-[#0d3b66] rounded-lg hover:bg-blue-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Calculator
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center text-sm gap-2 px-5 py-2.5 bg-white text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Report
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center text-sm gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0d3b66] to-[#3399cc] text-white rounded-lg hover:brightness-110 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 print:hidden">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-gray-900 text-center mb-2">Delete Report?</h2>
            <p className="text-gray-600 text-center mb-6">
              This will delete all inputs and results. This action cannot be
              undone. Continue?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Content */}
      {/* <div className="max-w-7xl mx-auto px-6 py-8">
        <div id="report-a4">
          <LightingPoleReport
            cover={cover}
            condition={condition}
            structuralDesign={structuralDesign}
            results={results}
            resultsDo={resultsDo}
          />
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-6 py-8">{renderReport()}</div>
    </div>
  );
}
