import {
  RotateCcw,
  Plus,
  Trash2,
  Copy,
  ClipboardPaste,
  CheckCircle,
  Circle,
} from "lucide-react";

export function OverheadWireInput({
  overheadWires,
  ohwInputValue,
  setOhwInputValue,
  onUpdate,
  errors,
  onAddOhw,
  onCopyOhw,
  onPasteOhw,
  hasClipboard,
  setConfirmDeleteOhw,
  resetCurrentOhw,
  handleAddOhw,
}) {
  // Function to helper class input
  const inputClass = (hasError) =>
    `w-full px-3 py-2 text-sm rounded-md outline-none transition-all border
  ${
    hasError
      ? "border-red-500 bg-[#fff5f5] ring-1 ring-red-200 focus:border-red-500"
      : "border-gray-300 bg-white focus:border-[#3399cc] focus:ring-1 focus:ring-[#3399cc]"
  }`;

  // Function to helper text error
  const ErrorText = ({ show, text }) =>
    show ? (
      <div className="absolute left-0 -bottom-5 flex items-center gap-1 text-[11px] text-red-500">
        <span>*{text}</span>
      </div>
    ) : null;

  const ohwValueNumber = Number(ohwInputValue);
  const isOhwInputValue =
    !ohwInputValue ||
    isNaN(ohwInputValue) ||
    ohwValueNumber <= 0 ||
    ohwValueNumber > 25;

  return (
    <div className="rounded-b-2xl shadow-sm border border-gray-200 overflow-hidden bg-white">
      <div className="px-6 pt-6 pb-3">
        <div>
          {/* HEADER OVERHEAD WIRE INPUT */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-[#0d3b66] font-medium text-sm flex items-center gap-1">
                <div className="w-1 h-4 bg-[#3399cc] rounded-full mr-1"></div>
                <span className="font-semibold">
                  Configure up to 8 Overhead Wires
                </span>
                <span>with detailed specifications</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between overflow-x-auto pb-2 px-6 pt-3 pb-6">
          {/* INPUT + BUTTON */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={8}
              placeholder="OHW Count"
              value={ohwInputValue}
              onChange={(e) => setOhwInputValue(e.target.value)}
              className="w-[180px] px-7 py-2.5 text-center text-sm rounded-lg outline-none transition-all border border-[#3399cc] bg-white focus:ring-1 focus:ring-[#3399cc]"
            />

            <button
              onClick={onAddOhw}
              disabled={isOhwInputValue}
              className={`flex items-center gap-2 px-7 py-2.5 text-sm font-medium rounded-lg transition-all shadow-md border 
                    ${
                      isOhwInputValue
                        ? "bg-gray-50 border-gray-300 text-gray-600 opacity-40 cursor-not-allowed"
                        : "bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100"
                    }`}
            >
              {/* Status Icon */}
              {isOhwInputValue ? (
                <Circle className="w-5 h-5 text-gray-400" />
              ) : (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
              OK
            </button>
          </div>

          {/* Show Object Count */}
          <div className="flex items-center gap-2 px-7 py-2.5 text-sm rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium">
            <span className="text-[#0d3b66] font-semibold">
              {overheadWires.length}
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600">8 Overhead Wires</span>
          </div>
        </div>
      </div>

      {overheadWires.length === 0 && (
        <div className="text-center text-gray-400 text-sm py-6">
          No Overhead Wire added yet
        </div>
      )}

      {/* ACTIVE OHW INPUT */}
      {overheadWires.map((overheadWire, index) => {
        const ohwError = errors?.[overheadWire.idOhw] || {};
        const isLast = index === overheadWire.length - 1;
        const hasMultiple = overheadWires.length > 1;

        return (
          <div
            key={overheadWire.idOhw}
            className={`hover:bg-blue-50 p-6 
            ${hasMultiple && !isLast ? "border-b border-gray-200" : ""}`}
          >
            {/* Header section title */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg
                  bg-gradient-to-br from-[#0d3b66] to-[#3399cc]
                  flex items-center justify-center
                  text-white text-sm font-medium"
                >
                  {index + 1}
                </div>

                <div>
                  <h4 className="text-base text-[#0d3b66] text-sm font-medium leading-snug">
                    Overhide Wire
                  </h4>
                  <p className="text-xs text-gray-500">
                    {overheadWire.nameOhw && `${overheadWire.nameOhw}`}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                {/* BUTTON COPY / PASTE */}
                <div className="flex items-center gap-2 ml-2">
                  {/* COPY */}
                  <button
                    onClick={() => onCopyOhw(overheadWire)}
                    title="Copy this Overhead Wire"
                    className="
                      p-2 rounded-md border
                      bg-blue-50 text-blue-600
                      hover:bg-blue-100
                      transition
                    "
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  {/* PASTE */}
                  <button
                    onClick={() => onPasteOhw(overheadWire.idOhw)}
                    disabled={!hasClipboard}
                    title={
                      hasClipboard
                        ? "Paste copied Overhead Wire"
                        : "No copied Overhead Wire"
                    }
                    className={`
                      p-2 rounded-md border transition
                      ${
                        hasClipboard
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }
                    `}
                  >
                    <ClipboardPaste className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => resetCurrentOhw(overheadWire.idOhw)}
                  className="flex items-center gap-2
                  px-5 py-2 h-[40px] text-xs
                  bg-[#eef2f6] text-[#0d3b66]
                  border border-[#d0d7e2]
                  rounded-lg
                  hover:bg-[#e2e8f0]
                  transition-colors
                  text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDeleteOhw(overheadWire.idOhw);
                  }}
                  className="flex items-center gap-2
                  px-4 py-2 h-[40px]
                  rounded-lg text-xs
                  border border-red-200
                  text-red-600
                  bg-red-50
                  hover:bg-red-100 hover:border-red-300
                  transition-all
                  text-sm font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete OHW</span>
                </button>
              </div>
            </div>

            {/* FORM CARD WRAPPER */}
            <div>
              <div className="flex space-x-2">
                {/* Overhead Wire Name Input */}
                <div className="relative w-[200px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    OHW Name
                  </label>
                  <input
                    type="text"
                    value={overheadWire.nameOhw}
                    onChange={(e) =>
                      onUpdate(overheadWire.idOhw, { nameOhw: e.target.value })
                    }
                    placeholder="e.g., DV2.6-2C"
                    className={inputClass(ohwError.nameOhw)}
                  />
                  <ErrorText show={ohwError.nameOhw} text="Required field" />
                </div>

                {/* Weight Massa Overhead Wire Input */}
                <div className="relative w-[150px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    Weight
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={overheadWire.weightOhw}
                      onChange={(e) =>
                        onUpdate(overheadWire.idOhw, {
                          weightOhw: e.target.value,
                        })
                      }
                      className={`${inputClass(ohwError.weightOhw)} pr-10`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black-400">
                      kg/m
                    </span>
                  </div>
                  <ErrorText show={ohwError.weightOhw} text="Required field" />
                </div>

                {/* Diameter Overhead Wire Input */}
                <div className="relative w-[140px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    Diameter
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={overheadWire.diameterOhw}
                      onChange={(e) =>
                        onUpdate(overheadWire.idOhw, {
                          diameterOhw: e.target.value,
                        })
                      }
                      className={`${inputClass(ohwError.diameterOhw)} pr-8`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black-400">
                      mm
                    </span>
                  </div>
                  <ErrorText
                    show={ohwError.diameterOhw}
                    text="Required field"
                  />
                </div>

                {/* Fix Height Overhead Wire Input */}
                <div className="relative w-[150px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    Fix Height (Z)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={overheadWire.fixheightOhw}
                      onChange={(e) =>
                        onUpdate(overheadWire.idOhw, {
                          fixheightOhw: e.target.value,
                        })
                      }
                      className={`${inputClass(ohwError.fixheightOhw)} pr-8`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black-400">
                      mm
                    </span>
                  </div>
                  <ErrorText
                    show={ohwError.fixheightOhw}
                    text="Required field"
                  />
                </div>

                {/* Span Overhead Wire Input */}
                <div className="relative w-[150px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    Span
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={overheadWire.spanOhw}
                      onChange={(e) =>
                        onUpdate(overheadWire.idOhw, {
                          spanOhw: e.target.value,
                        })
                      }
                      className={`${inputClass(ohwError.spanOhw)} pr-8`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black-400">
                      mm
                    </span>
                  </div>
                  <ErrorText show={ohwError.spanOhw} text="Required field" />
                </div>

                {/* Sagging Ratio Overhead Wire Input */}
                <div className="relative w-[125px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    Sagging Ratio
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={overheadWire.saggingOhw}
                      onChange={(e) =>
                        onUpdate(overheadWire.idOhw, {
                          saggingOhw: e.target.value,
                        })
                      }
                      className={`${inputClass(ohwError.saggingOhw)} pr-4`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black-400">
                      %
                    </span>
                  </div>
                  <ErrorText show={ohwError.saggingOhw} text="Required field" />
                </div>

                {/* nnC Overhead Wire Input */}
                <div className="relative w-[125px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    nnC
                  </label>
                  <input
                    type="number"
                    value={overheadWire.nncOhw}
                    onChange={(e) =>
                      onUpdate(overheadWire.idOhw, {
                        nncOhw: e.target.value,
                      })
                    }
                    className={`${inputClass(ohwError.nncOhw)}`}
                  />
                  <ErrorText show={ohwError.nncOhw} text="Required field" />
                </div>

                {/* Fix Angle Overhead Wire Input */}
                <div className="relative w-[130px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    Fix Angle
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={overheadWire.fixAngleOhw}
                      onChange={(e) =>
                        onUpdate(overheadWire.idOhw, {
                          fixAngleOhw: e.target.value,
                        })
                      }
                      className={`${inputClass(ohwError.fixAngleOhw)} pr-8`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black-400">
                      deg
                    </span>
                  </div>
                  <ErrorText
                    show={ohwError.fixAngleOhw}
                    text="Required field"
                  />
                </div>

                {/* Vertical Angle Overhead Wire Input */}
                <div className="relative w-[130px]">
                  <label className="block text-sm text-gray-700 mb-2">
                    Vertical Angle
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={overheadWire.verticalAngleOhw}
                      onChange={(e) =>
                        onUpdate(overheadWire.idOhw, {
                          verticalAngleOhw: e.target.value,
                        })
                      }
                      className={`${inputClass(
                        ohwError.verticalAngleOhw,
                      )} pr-8`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-black-400">
                      deg
                    </span>
                  </div>
                  <ErrorText
                    show={ohwError.verticalAngleOhw}
                    text="Required field"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* FOOTER: LEFT (Reset Button) & RIGHT (Next Input) */}
      <div className="flex justify-between items-center p-6">
        {/* Add Button */}
        <button
          onClick={handleAddOhw}
          disabled={overheadWires.length >= 8}
          className={`flex items-center gap-2 px-7 py-2.5 font-medium text-sm rounded-lg transition-all shadow-md 
                    ${
                      overheadWires.length >= 8
                        ? "bg-gray-300 text-black opacity-40 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#0d3b66] to-[#3399cc] text-white hover:brightness-110"
                    }`}
        >
          <Plus className="w-5 h-5" />
          Add OHW
        </button>
      </div>
    </div>
  );
}
