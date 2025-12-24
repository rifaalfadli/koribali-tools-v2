import { RotateCcw, AlertCircle } from "lucide-react";

export function CoverInput({ cover, onUpdate, onMake, errors }) {
  // Function to reset all imputs to default (empty)
  const handleReset = () => {
    onUpdate({
      managementMark: "",
      calculationNumber: "",
      projectName: "",
      contentr2: "",
      contentr3: "",
      date: "",
    });
  };

  // Function to helper class input
  const inputClass = (hasError) =>
    `w-full px-4 py-2 rounded-lg outline-none transition-all border
  ${
    hasError
      ? "border border-red-500 bg-[#fff5f5] ring-1 ring-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-200"
      : "border-gray-300 bg-white focus:border-[#3399cc] focus:ring-1 focus:ring-[#3399cc]"
  }`;

  // Function to helper text error
  const ErrorText = ({ show, text }) =>
    show ? (
      <div className="absolute left-0 -bottom-5 flex items-center gap-1 text-[11px] text-red-500">
        <AlertCircle size={12} />
        <span>{text}</span>
      </div>
    ) : null;

  return (
    <div>
      {/* FORM CARD WRAPPER */}
      <div className="bg-white border border-gray-200 p-5 rounded-b-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-7">
          {/* FIELD: Management Code */}
          <div className="relative">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Management Code
            </label>
            <input
              type="text"
              value={cover.managementMark}
              onChange={(e) => {
                // Take user input => convert it to capital letters
                const raw = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");

                // Only take a maximum of 3 letters
                const letters = raw.slice(0, 3);

                // Auto format: A ー B ー C
                const formatted = letters.split("").join(" ー ");

                onUpdate({ managementMark: formatted });
              }}
              className={inputClass(errors.managementMark)}
            />
            <ErrorText show={errors.managementMark} text="Required field" />
          </div>

          {/* FIELD: Calculation Document Number */}
          <div className="relative">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Calculation Document Number
            </label>
            <input
              type="text"
              value={cover.calculationNumber}
              onChange={(e) => onUpdate({ calculationNumber: e.target.value })}
              className={inputClass(errors.calculationNumber)}
            />
            <ErrorText show={errors.calculationNumber} text="Required field" />
          </div>

          {/* FIELD: Project Name */}
          <div className="relative md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Line 1
            </label>
            <input
              type="text"
              value={cover.projectName}
              onChange={(e) => onUpdate({ projectName: e.target.value })}
              className={inputClass(errors.projectName)}
            />
            <ErrorText show={errors.projectName} text="Required field" />
          </div>

          {/* FIELD: Content Row 2 */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Line 2 (Optional)
            </label>
            <input
              type="text"
              value={cover.contentr2}
              onChange={(e) => onUpdate({ contentr2: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white"
            />
          </div>

          {/* FIELD: Content Row 3 (Optional) */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Line 3 (Optional)
            </label>
            <input
              type="text"
              value={cover.contentr3}
              onChange={(e) => onUpdate({ contentr3: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white"
            />
          </div>

          {/* FIELD: Document Date */}
          <div className="relative md:col-span-2">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Document Date
            </label>
            <input
              type="date"
              value={cover.date}
              onChange={(e) => onUpdate({ date: e.target.value })}
              className={inputClass(errors.date)}
            />
            <ErrorText show={errors.date} text="Required field" />
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-200"></div>

        {/* FOOTER: LEFT (Reset) & RIGHT (Completion Status) */}
        <div className="flex justify-between items-center pt-6">
          {/* RESET BUTTON */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-7 py-2.5 h-[45px] bg-[#eef2f6] text-[#0d3b66]
            border-2 border-[#d0d7e2] rounded-xl hover:bg-[#e2e8f0] transition-colors font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>

          {/* COMPLETION STATUS BADGE */}
          <button
            onClick={onMake}
            className="flex items-center gap-2 px-7 py-2.5 h-[45px] 
            bg-gradient-to-r from-[#0d3b66] to-[#3399cc]
            text-white rounded-xl 
            hover:brightness-110 transition-all shadow-sm font-medium"
          >
            Make Report
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
