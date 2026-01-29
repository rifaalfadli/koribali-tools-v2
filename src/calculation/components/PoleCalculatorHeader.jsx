import { Layout, RotateCcw } from "lucide-react";

export function HeaderCalculationPage({ onResetAll }) {
  return (
    <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] py-[23px] px-12 shadow-lg sticky top-[70px] z-40 flex justify-between hp:px-5 py-[15px] top-[60px]">
      <div className="max-w-7xl hp:w-[180px] hp:flex items-center">
        <div className="flex items-center gap-3 hp:gap-0">
          {/* ICON KIRI */}
          <div className="bg-[#3399cc] p-[8px] rounded-lg hp:hidden">
            <Layout className="w-[28px] h-[28px] text-white" />
          </div>
          {/* TEKS HEADER */}
          <div>
            <h1 className="text-white mb-0.5 text-[15px] font-bold hp:text-sm">
              Calculation System
            </h1>
            <p className="text-white/70 text-xs font-semibold hp:hidden">
              Professional structural analysis tools
            </p>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center">
        <button
          onClick={onResetAll}
          className="flex items-center gap-2 bg-gray-200 text-[#0d3b66] px-7 py-3 rounded-lg font-medium shadow-sm
            hover:bg-gray-300 hover:shadow-md
            active:scale-95 text-sm font-semibold
            transition-all duration-200 ease-out
            hp:px-3 py-[10px] text-xs gap-[5px]
            "
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All</span>
        </button>
      </div>
    </div>
  );
}
