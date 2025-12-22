import React from "react";
import { Maximize2 } from "lucide-react";

export function PoleInput({
  section,
  sectionNumber,
  onUpdate,
  hideHeader = false,
}) {
  return (
    <div className="space-y-6">
      {/* Header section title */}
      {!hideHeader && (
        <div className="bg-gradient-to-r from-[#0d3b66] to-[#3399cc] p-4 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <span className="text-white">Section {sectionNumber}</span>
            </div>

            {/* Section name display */}
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-white/70" />
              <span className="text-white">
                {section.name || "Enter section name"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div>
        <h3 className="text-[#0d3b66] mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-[#3399cc] rounded-full"></div>
          Basic Information
        </h3>

        {/* Section Name input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Section Name</label>
            <input
              type="text"
              value={section.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g., 支柱-1"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white"
            />
          </div>

          {/* Material Type selector */}
          <div>
            <label className="block text-gray-700 mb-2">Material Type</label>
            <select
              value={section.material}
              onChange={(e) => onUpdate({ material: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white"
            >
              <option value="STK400">STK400</option>
              <option value="STK490">STK490</option>
              <option value="STK500">STK500</option>
              <option value="STK540">STK540</option>
              <option value="STKR400">STKR400</option>
            </select>
          </div>

          {/* Pole Type selector */}
          <div>
            <label className="block text-gray-700 mb-2">Pole Type</label>
            <select
              value={section.poleType}
              onChange={(e) => onUpdate({ poleType: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white"
            >
              <option value="Straight">Straight</option>
              <option value="Taper">Taper</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div>
        <h3 className="text-[#0d3b66] mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-[#3399cc] rounded-full"></div>
          Dimensions & Specifications
        </h3>

        <div className="bg-white p-5 rounded-xl border border-gray-200">
          {/* Straight type => 2 columns */}
          {section.poleType === "Straight" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Straight Diameter */}
              <div>
                <label className="block text-gray-600 mb-2">
                  Diameter Pole
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.diameterLower}
                    onChange={(e) =>
                      onUpdate({ diameterLower: e.target.value })
                    }
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400">
                    mm
                  </span>
                </div>
              </div>

              {/* Straight Thickness */}
              <div>
                <label className="block text-gray-600 mb-2">
                  Thickness Pole
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.thicknessLower}
                    onChange={(e) =>
                      onUpdate({ thicknessLower: e.target.value })
                    }
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400">
                    mm
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Taper type => 4 columns */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Diameter Lower */}
              <div>
                <label className="block text-gray-600 mb-2">
                  Diameter Lower
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.diameterLower}
                    onChange={(e) =>
                      onUpdate({ diameterLower: e.target.value })
                    }
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400">
                    mm
                  </span>
                </div>
              </div>

              {/* Diameter Upper */}
              <div>
                <label className="block text-gray-600 mb-2">
                  Diameter Upper
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.diameterUpper}
                    onChange={(e) =>
                      onUpdate({ diameterUpper: e.target.value })
                    }
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400">
                    mm
                  </span>
                </div>
              </div>

              {/* Thickness Lower */}
              <div>
                <label className="block text-gray-600 mb-2">
                  Thickness Lower
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.thicknessLower}
                    onChange={(e) =>
                      onUpdate({ thicknessLower: e.target.value })
                    }
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400">
                    mm
                  </span>
                </div>
              </div>

              {/* Thickness Upper */}
              <div>
                <label className="block text-gray-600 mb-2">
                  Thickness Upper
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={section.thicknessUpper}
                    onChange={(e) =>
                      onUpdate({ thicknessUpper: e.target.value })
                    }
                    className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400">
                    mm
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Height and Quantity */}
      <div>
        <h3 className="text-[#0d3b66] mb-4 flex items-center gap-2">
          <div className="w-1 h-5 bg-[#3399cc] rounded-full"></div>
          Additional Parameters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Height input */}
          <div>
            <label className="block text-gray-700 mb-2">Height (Z/H)</label>
            <div className="relative">
              <input
                type="number"
                value={section.height}
                onChange={(e) => onUpdate({ height: e.target.value })}
                className="w-full pl-4 pr-12 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400">
                mm
              </span>
            </div>
          </div>

          {/* Quantity input */}
          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              value={section.quantity}
              onChange={(e) => onUpdate({ quantity: e.target.value })}
              placeholder="1"
              min="1"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3399cc] focus:border-[#3399cc] outline-none transition-all bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
