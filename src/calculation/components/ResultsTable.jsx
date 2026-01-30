import React, { useState } from "react";
import PropTypes from "prop-types";
import { FileText, FileSpreadsheet, CheckCircle2 } from "lucide-react";

export function ResultsTable({ results, resultsDo, resultsOhw, onCoverInput }) {
  const [page] = useState(0);
  const r = results[page]; // current Pole

  const [pageDo] = useState(0);
  const rDo = resultsDo[pageDo]; // current DO

  const [pageOhw] = useState(0);
  const rOhw = resultsOhw[pageOhw]; // current OHW

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-6 py-5 hp:px-4 hp:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* LEFT */}
          <div className="flex items-center gap-3 hp:gap-2">
            <div className="bg-white/10 backdrop-blur-sm p-2 hp:p-1.5 rounded-lg">
              <CheckCircle2 className="w-6 h-6 hp:w-5 hp:h-5 text-white" />
            </div>

            <div>
              <h2 className="text-white mb-0.5 text-sm hp:text-xs font-semibold">
                Calculation Results
              </h2>

              {/* hide description on mobile */}
              <p className="text-white/70 text-xs font-medium hp:hidden">
                Comprehensive structural analysis output
              </p>
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={onCoverInput}
            className="
              flex items-center gap-2
              px-7 py-2.5
              hp:px-3 hp:py-2
              bg-white text-[#0d3b66]
              rounded-lg hp:rounded-md
              text-sm hp:text-xs
              shadow-md hover:shadow-lg
              transition-all duration-300
              transform hover:scale-105
              border-2 border-transparent
              font-medium
            "
          >
            <FileText className="w-5 h-5 hp:w-4 hp:h-4" />

            {/* text shorten on mobile */}
            <span className="hp:hidden">Make Report</span>
            <span className="hidden hp:inline">Report</span>
          </button>
        </div>
      </div>

      {/* Tabel Result Pole */}
      {r && (
        <div className="mx-6 my-6 mb-16 space-y-6 hp:mx-2 hp:mt-4 hp:mb-8 ">
          <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 backdrop-blur-sm p-2 rounded-lg">
                <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  Pole Specifications
                </h3>
              </div>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    POLE
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Description
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Pole Type
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Dia Upper</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Dia Lower</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Thick Upper</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Thick Lower</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Length</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Height (z)</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold whitespace-nowrap">
                      Center Point
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 whitespace-nowrap">
                      CP (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Material
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.pole}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.description}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.poleType}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.poleType === "Straight" ? r.diaLower : r.diaUpper}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.diaLower}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.poleType === "Straight" ? r.thickLower : r.thickUpper}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.thickLower}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.length}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.heightPole}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.centerPoint}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.material}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE VERSION ================= */}
          <div className="md:hidden space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="
        bg-white
        border border-gray-300
        rounded-xl
        p-4
        shadow-sm
        transition
        hover:shadow-md
      "
              >
                {/* HEADER */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0d3b66]">
                      Pole {r.pole}
                    </h3>
                    <p className="text-xs text-gray-500 leading-snug">
                      {r.description}
                    </p>
                  </div>

                  <span
                    className="
          text-xs font-medium
          px-2 py-1
          rounded-md
          bg-blue-50 text-blue-700
          whitespace-nowrap
        "
                  >
                    {r.poleType}
                  </span>
                </div>

                {/* BODY DATA */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                  <DataItem label="Dia Upper (mm)" value={r.diaUpper} />
                  <DataItem label="Dia Lower (mm)" value={r.diaLower} />

                  <DataItem label="Thick Upper (mm)" value={r.thickUpper} />
                  <DataItem label="Thick Lower (mm)" value={r.thickLower} />

                  <DataItem label="Length (mm)" value={r.length} />
                  <DataItem label="Height Z (mm)" value={r.heightPole} />

                  <DataItem label="Center Point (mm)" value={r.centerPoint} />
                  <DataItem label="Material" value={r.material} />
                </div>
              </div>
            ))}
          </div>

          {/* ---------- TABLE 2 : CALCULATED RESULTS ---------- */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                {/* ================== ROW 1 ================== */}
                <tr className="bg-blue-50 text-[#0d3b66] text-xs">
                  {/* Group Header */}
                  <th
                    className="px-3 py-2 border border-gray-300 text-center font-semibold"
                    colSpan={4}
                  >
                    Allowable (Stress)
                  </th>

                  {/* Other headers move down using rowSpan */}
                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold">Section Area</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (cm<sup>2</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold">Section Modulus</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (cm<sup>3</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold">Moment Inertia</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (cm<sup>4</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold">Ip</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (cm<sup>4</sup>)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold">Radius Gyration</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (cm)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold">Taper Ratio</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center font-semibold"
                    rowSpan={2}
                  >
                    Type of taper
                  </th>

                  <th
                    className="px-3 py-2 border border-gray-300 text-center leading-tight"
                    rowSpan={2}
                  >
                    <div className="font-semibold whitespace-nowrap">
                      HeightSection
                    </div>
                    <div className="text-[13px] pt-[4px] text-gray-500 whitespace-nowrap">
                      (mm)
                    </div>
                  </th>
                </tr>

                {/* ================== ROW 2 ================== */}
                <tr className="bg-blue-50 text-[#0d3b66] text-xs">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    fb
                  </th>
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    stb
                  </th>
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    sts
                  </th>
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    stc
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.fb}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.stb}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.sts}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.stc}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.sectionArea.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.sectionModulus.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.momentInertia.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.ip}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.radiusGyr.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.poleType === "Straight" ? "" : r.taperRatio}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center text-[12px]">
                      {r.poleType === "Straight" ? "" : r.typeofTaper}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.heightSection}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tabel Result Direct Object */}
      {rDo && (
        <div className="mx-6 my-6 mb-16 space-y-6">
          <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 backdrop-blur-sm p-2 rounded-lg">
                <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  Direct Object Calculation
                </h3>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    DO
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Description
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Massa</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (kg)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Fixed Load</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Front Area</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (m<sup>2</sup>)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Side Area</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (m<sup>2</sup>)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Cf</div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Height (Z)</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Wind Load Area Front</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Wind Load Area Side</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Seismic Load</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Quantity</div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {resultsDo.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.doNum}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.nameDo}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.weightDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.flDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.frontAreaDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.sideAreaDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.cfDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.heightDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.wlafDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.wlasDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.slDo.toFixed(2)}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.qtyDo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tabel Result Overhead Wire */}
      {rOhw && (
        <div className="mx-6 my-6 mb-16 space-y-6">
          <div className="bg-gradient-to-r from-[#0d3b66] to-[#0d3b66] px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 backdrop-blur-sm p-2 rounded-lg">
                <FileSpreadsheet className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight">
                  Overhead Wire Calculation
                </h3>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs">
                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    OHW
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Description
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Diameter</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Span</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (m)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Sagging Ratio</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (%)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Weight</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (kg/m)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">FL</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (kg)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">FL</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold whitespace-nowrap">Area</div>
                    <div className="text-[13px] pt-[4px] text-gray-500 whitespace-nowrap">
                      (m<sup>2</sup>)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Cf
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Height (Z)</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (mm)
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {resultsOhw.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.ohwNum}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.nameOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.diameterOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.spanOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.saggingOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.weightOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.flOhwKg}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.flOhwN}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.AreaOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.cfOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.fixheightOhw}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------- TABLE 2 : CALCULATED RESULTS ---------- */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-50 text-[#0d3b66] text-xs">
                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Wind Load</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Fix Angle
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Seismic Load</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Pw_Fix
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Pw_Straight
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Pw_Oblique
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Tension Fix</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Tension Straight</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Tension Oblique</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (N)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center leading-tight">
                    <div className="font-semibold">Vertical Angle</div>
                    <div className="text-[13px] pt-[4px] text-gray-500">
                      (deg)
                    </div>
                  </th>

                  <th className="px-3 py-2 border border-gray-300 text-center font-semibold">
                    Cos Vertical Angle
                  </th>
                </tr>
              </thead>

              <tbody>
                {resultsOhw.map((r, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#3399cc]/10 transition-colors text-xs"
                  >
                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.wlOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.fixAngleOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.slOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.pwFixOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.pwStraightOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.pwObliqueOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.tensionFixOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.tensionStraightOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.tensionObliqueOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.verticalAngleOhw}
                    </td>

                    <td className="px-4 py-3 border border-gray-300 text-gray-700 text-center">
                      {r.cosVerticalAngleOhw}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================== EMPTY STATE ===================== */}
      {results.length === 0 && (
        <div className="p-16 text-center">
          <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">
            No calculation results yet. Please input pole data and click
            Calculate.
          </p>
        </div>
      )}
    </div>
  );
}

ResultsTable.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      // step pole
      pole: PropTypes.string,
      description: PropTypes.string,
      poleType: PropTypes.string,
      diaUpper: PropTypes.number,
      diaLower: PropTypes.number,
      thickUpper: PropTypes.number,
      thickLower: PropTypes.number,
      length: PropTypes.number,
      heightPole: PropTypes.number,
      centerPoint: PropTypes.number,
      fb: PropTypes.number,
      stb: PropTypes.number,
      sts: PropTypes.number,
      stc: PropTypes.number,
      sectionArea: PropTypes.number,
      sectionModulus: PropTypes.number,
      momentInertia: PropTypes.number,
      radiusGyr: PropTypes.number,
      taperRatio: PropTypes.number,
      material: PropTypes.string,
      ip: PropTypes.number,
      heightSection: PropTypes.number,
      typeofTaper: PropTypes.string,
    }),
  ).isRequired,

  // direct object
  resultsDo: PropTypes.arrayOf(
    PropTypes.shape({
      doNum: PropTypes.string,
      nameDo: PropTypes.string,
      typeOfDo: PropTypes.string,
      frontAreaDo: PropTypes.number,
      sideAreaDo: PropTypes.number,
      weightDo: PropTypes.number,
      heightDo: PropTypes.number,
      nncDo: PropTypes.number,
      qtyDo: PropTypes.number,
      fixAngleDo: PropTypes.number,
      flDo: PropTypes.number,
      cfDo: PropTypes.number,
      wlafDo: PropTypes.number,
      wlasDo: PropTypes.number,
      slDo: PropTypes.number,
    }),
  ).isRequired,

  // overhead wire
  resultsOhw: PropTypes.arrayOf(
    PropTypes.shape({
      ohwNum: PropTypes.string,
      nameOhw: PropTypes.string,
      weightOhw: PropTypes.number,
      diameterOhw: PropTypes.number,
      fixheightOhw: PropTypes.number,
      spanOhw: PropTypes.number,
      saggingOhw: PropTypes.number,
      nncOhw: PropTypes.number,
      fixAngleOhw: PropTypes.number,
      verticalAngleOhw: PropTypes.number,
      flOhwKg: PropTypes.number,
      flOhwN: PropTypes.number,
      AreaOhw: PropTypes.number,
      cfOhw: PropTypes.number,
      wlOhw: PropTypes.number,
      slOhw: PropTypes.number,
      pwFixOhw: PropTypes.number,
      pwStraightOhw: PropTypes.number,
      pwObliqueOhw: PropTypes.number,
      tensionFixOhw: PropTypes.number,
      tensionStraightOhw: PropTypes.number,
      tensionObliqueOhw: PropTypes.number,
      cosVerticalAngleOhw: PropTypes.number,
    }),
  ).isRequired,
};

function DataItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value ?? "-"}</span>
    </div>
  );
}
