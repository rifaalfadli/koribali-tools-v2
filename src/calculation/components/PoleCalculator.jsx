import React, { useState, useEffect, useRef } from "react";
import { PoleInput } from "./PoleInput";
import { ResultsTable } from "./ResultsTable";
import { useNavigate, useLocation } from "react-router-dom";
import { ConditionInput } from "./ConditionInput";
import { DirectObjectInput } from "./DirectObjectInput";
import { HeaderCalculationPage } from "./PoleCalculatorHeader";
import { StructuralDesign } from "./StructuralDesignInput";
import { OverheadWireInput } from "./OverheadWireInput";
import {
  CoverInputModal,
  ToastModal,
  ConfirmResetAllModal,
  ConfirmDeletePoleModal,
  ConfirmDeleteDoModal,
  ConfirmReduceDoModal,
  ConfirmDeleteOhwModal,
  ConfirmReduceOhwModal,
} from "./PoleCalculatorModal";
import {
  goToNextSection,
  updateCover,
  isCoverComplete,
  updateCondition,
  isConditionComplete,
  addSection,
  removeSection,
  updateSection,
  conditionNext,
  resetCurrent,
  isSectionComplete,
  handleCalculateResults,
  makeReport,
  deleteReport,
  clearError,
  clearSectionError,
  getCoverErrors,
  getConditionErrors,
  getSectionsErrors,
  stepPoleNext,
  removeDo,
  updateDo,
  resetCurrentDo,
  isDoComplete,
  getDoErrors,
  clearDoError,
  updateStructuralDesign,
  structuralDesignComplete,
  getStructuralDesignErrors,
  syncDoByInput,
  copyDo,
  pasteDo,
  addDo,
  syncOhwByInput,
  addOhw,
  copyOhw,
  pasteOhw,
  removeOhw,
  updateOhw,
  resetCurrentOhw,
  isOhwComplete,
  getOhwErrors,
  clearOhwError,
} from "../utils/poleCalculatorUtils";
import {
  Plus,
  CheckCircle,
  Circle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Calculator,
} from "lucide-react";

export function PoleCalculator() {
  const navigate = useNavigate();
  const location = useLocation();

  // STATE: Cover information
  const [cover, setCover] = useState(() => {
    const saved = sessionStorage.getItem("cover");
    return saved
      ? JSON.parse(saved)
      : {
          managementMark: "",
          calculationNumber: "",
          projectName: "",
          contentr2: "",
          contentr3: "",
          date: "",
        };
  });
  const [coverErrors, setCoverErrors] = useState({});

  // STATE: Condition for calculation (wind, standard)
  const [condition, setCondition] = useState(() => {
    const saved = sessionStorage.getItem("condition");
    return saved
      ? JSON.parse(saved)
      : { designStandard: "", windSpeed: "", projectType: "" };
  });
  const [conditionErrors, setConditionErrors] = useState({});

  // STATE: Structural Design of pole
  const [structuralDesign, setStructuralDesign] = useState(() => {
    const saved = sessionStorage.getItem("structuralDesign");
    return saved ? JSON.parse(saved) : { lowestStep: "", overDesign: "" };
  });
  const [structuralDesignErrors, setStructuralDesignErrors] = useState({});

  // STATE: Sections input, each section represents one pole
  const [sections, setSections] = useState(() => {
    const saved = sessionStorage.getItem("sections");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "1", // unique section ID
            name: "", // pole name or description
            material: "STK400", // default material
            poleType: "Straight", // Taper or Straight
            diameterLower: "", // lower diameter
            diameterUpper: "", // upper diameter (Taper only)
            thicknessLower: "", // lower thickness
            thicknessUpper: "", // upper thickness (Taper only)
            height: "", // pole height
            quantity: "1", // number of poles
          },
        ];
  });
  const [sectionsErrors, setSectionsErrors] = useState({});

  // STATE: Direct Object input
  const [directObjects, setDirectObjects] = useState(() => {
    const saved = sessionStorage.getItem("directObjects");
    return saved ? JSON.parse(saved) : [];
  });
  const [doErrors, setDoErrors] = useState({});

  // STATE: Overhead Wire input
  const [overheadWires, setOverheadWires] = useState(() => {
    const saved = sessionStorage.getItem("overheadWires");
    return saved ? JSON.parse(saved) : [];
  });
  const [ohwErrors, setOhwErrors] = useState({});

  // STATE: Results all structural design
  const [, setResultStructuralDesign] = useState(() => {
    const saved = sessionStorage.getItem("resultStructuralDesign");
    return saved ? JSON.parse(saved) : [];
  });

  // STATE: Results all step pole
  const [results, setResults] = useState(() => {
    const saved = sessionStorage.getItem("results");
    return saved ? JSON.parse(saved) : [];
  });

  // STATE: Results all direct object
  const [resultsDo, setResultsDo] = useState(() => {
    const saved = sessionStorage.getItem("resultsDo");
    return saved ? JSON.parse(saved) : [];
  });

  // STATE: Results all direct object
  const [resultsOhw, setResultsOhw] = useState(() => {
    const saved = sessionStorage.getItem("resultsOhw");
    return saved ? JSON.parse(saved) : [];
  });

  // STATE: Results table
  const [showResults, setShowResults] = useState(() => {
    const saved = sessionStorage.getItem("showResults");
    return saved ? JSON.parse(saved) : false;
  });

  // ================= SESSION STORAGE EFFECT =================
  useEffect(() => {
    sessionStorage.setItem("cover", JSON.stringify(cover));
  }, [cover]);

  useEffect(() => {
    sessionStorage.setItem("condition", JSON.stringify(condition));
  }, [condition]);

  useEffect(() => {
    sessionStorage.setItem(
      "structuralDesign",
      JSON.stringify(structuralDesign),
    );
  }, [structuralDesign]);

  useEffect(() => {
    sessionStorage.setItem("sections", JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    sessionStorage.setItem("directObjects", JSON.stringify(directObjects));
  }, [directObjects]);

  useEffect(() => {
    sessionStorage.setItem("overheadWires", JSON.stringify(overheadWires));
  }, [overheadWires]);

  useEffect(() => {
    sessionStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    sessionStorage.setItem("resultsDo", JSON.stringify(resultsDo));
  }, [resultsDo]);

  useEffect(() => {
    sessionStorage.setItem("resultsOhw", JSON.stringify(resultsOhw));
  }, [resultsOhw]);

  useEffect(() => {
    sessionStorage.setItem("showResults", JSON.stringify(showResults));
  }, [showResults]);

  // STATE: UI control
  // For DO Input:
  const [confirmReduceDo, setConfirmReduceDo] = useState(null);
  const [doClipboard, setDoClipboard] = useState(null);
  const [doInputValue, setDoInputValue] = useState("");
  const [confirmDeleteDo, setConfirmDeleteDo] = useState(null);

  // For OHW Input:
  const [confirmReduceOhw, setConfirmReduceOhw] = useState(null);
  const [ohwClipboard, setOhwClipboard] = useState(null);
  const [ohwInputValue, setOhwInputValue] = useState("");
  const [confirmDeleteOhw, setConfirmDeleteOhw] = useState(null);

  // For All Form Input:
  const [activeTab, setActiveTab] = useState("1"); // currently active section
  const [toast, setToast] = useState(null); // toast notifications { message, type }
  const [confirmDelete, setConfirmDelete] = useState(null); // section deletion confirmation
  const [showCoverPopup, setShowCoverPopup] = useState(false); // show cover popup
  const [isExpandedPole, setIsExpandedPole] = useState(true); // expand/collapse pole input
  const [isExpandedCondition, setIsExpandedCondition] = useState(true); // expand/collapse condition input
  const [isExpandedDo, setIsExpandedDo] = useState(false); // expand/collapse direct object input
  const [isExpandedOhw, setIsExpandedOhw] = useState(false); // expand/collapse overhead wire input
  const [confirmResetAll, setConfirmResetAll] = useState(false); // reset all confirmation

  // Generates unique Pole IDs and syncs with sessionStorage on mount
  const sectionIdRef = useRef(1);
  useEffect(() => {
    const saved = sessionStorage.getItem("sections");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        sectionIdRef.current = Math.max(...parsed.map((s) => Number(s.id)));
      }
    }
  }, []);

  // Generates unique Direct Object IDs and syncs with sessionStorage on mount
  const doIdRef = useRef(1);
  useEffect(() => {
    const saved = sessionStorage.getItem("directObjects");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        doIdRef.current = Math.max(...parsed.map((s) => Number(s.idDo)));
      }
    }
  }, []);

  // Generates unique Overhead Wire IDs and syncs with sessionStorage on mount
  const ohwIdRef = useRef(1);
  useEffect(() => {
    const saved = sessionStorage.getItem("overheadWires");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        ohwIdRef.current = Math.max(...parsed.map((s) => Number(s.idOhw)));
      }
    }
  }, []);

  // Ensure activeTab always points to an existing section
  useEffect(() => {
    if (sections.length === 0) return;
    const isActiveValid = sections.some((s) => s.id === activeTab);
    if (!isActiveValid) {
      setActiveTab(sections[0].id);
    }
  }, [sections, activeTab]);

  // ========================= Function for CoverInput =========================
  // FUNCTION: Update cover data
  const handleCoverUpdate = (updates) => {
    updateCover(cover, updates, setCover);
    clearError(updates, setCoverErrors);
  };

  // FUNCTION: Check if cover information form is complete
  const handleIsCoverComplete = () => {
    return isCoverComplete(cover);
  };

  // FUNCTION: Open Cover Input
  const handleOpenCoverPopup = () => {
    setShowCoverPopup(true);
  };

  // FUNCTION: Close Cover Input
  const handleCloseCoverPopup = () => {
    setShowCoverPopup(false);
  };

  // ======================= Function for ConditionInput ========================
  // FUNCTION: Update condition data
  const handleConditionUpdate = (updates) => {
    updateCondition(condition, updates, setCondition);
    clearError(updates, setConditionErrors);
  };

  // FUNCTION: Check if condition information form is complete
  const handleIsConditionComplete = () => {
    return isConditionComplete(condition);
  };

  // FUNCTION: Go to Pole Input after Condition
  const handleConditionNext = () => {
    conditionNext(setIsExpandedCondition, setIsExpandedPole);
  };

  // ======================= Function for structural design pole input ========================
  // FUNCTION: Update structural design data
  const structuralDesignUpdate = (updates) => {
    updateStructuralDesign(structuralDesign, updates, setStructuralDesign);
    clearError(updates, setStructuralDesignErrors);
  };

  // FUNCTION: Check if structural design form is complete
  const handleStructuralDesignComplete = () => {
    return structuralDesignComplete(structuralDesign);
  };

  // ========================== Function for PoleInput ==========================
  // FUNCTION: Add a new section (max 4 section)
  const handleAddSection = () => {
    addSection(sections, setSections, setActiveTab, sectionIdRef);
  };

  // FUNCTION: Remove a section by ID
  const handleRemoveSection = (id) => {
    removeSection(id, sections, setSections, activeTab, setActiveTab);
  };

  // FUNCTION: Update a specific section's data
  const handleUpdateSection = (id, updates) => {
    updateSection(id, updates, setSections, sections);
    clearSectionError(id, updates, setSectionsErrors);
  };

  // FUNCTION: Reset the active section to default values
  const resetCurrentSection = () => {
    resetCurrent(setSections, sections, activeTab);
  };

  // FUNCTION: Go to the next section tab
  const handleNextSection = () => {
    goToNextSection(sections, activeTab, setActiveTab);
  };

  // FUNCTION: Check if a section pole is complete
  const handleIsSectionComplete = (section) => {
    return isSectionComplete(section);
  };

  // FUNCTION: Go to Direct Object Input after Step Pole
  const handleStepNext = () => {
    stepPoleNext(setIsExpandedPole, setIsExpandedDo);
  };

  // ========================== Function for DirectObjectInput ==========================
  // FUNCTION: Add a new object (max 25 object) by Input
  const handleAddDoByInput = () => {
    syncDoByInput(
      doInputValue,
      directObjects,
      setDirectObjects,
      doIdRef,
      setConfirmReduceDo,
    );

    // reset input setelah reduce
    setDoInputValue("");
  };

  // FUNCTION: Confirm reduce Direct Object
  const confirmReduceDirectObjects = () => {
    setDirectObjects((prev) => prev.slice(0, confirmReduceDo.to));
    setConfirmReduceDo(null);
  };

  // FUNCTION: Cancel reduce Direct Object
  const cancelReduceDirectObjects = () => {
    setDoInputValue(directObjects.length.toString());
    setConfirmReduceDo(null);
  };

  // FUNCTION: Add a new object (max 25 object) by click
  const handleAddDo = () => {
    addDo(directObjects, setDirectObjects, doIdRef);
  };

  // FUNCTION: Copy Direct Object data into clipboard
  const handleCopyDo = (directObject) => {
    copyDo(directObject, setDoClipboard);
  };

  // FUNCTION: Paste clipboard data into selected Direct Object
  const handlePasteDo = (idDo) => {
    pasteDo(idDo, setDirectObjects, doClipboard);
  };

  // FUNCTION: Remove a object by ID
  const handleRemoveDo = (idDo) => {
    removeDo(idDo, directObjects, setDirectObjects);
  };

  // FUNCTION: Update a specific object's data
  const handleUpdateDo = (idDo, updates) => {
    updateDo(idDo, updates, setDirectObjects, directObjects);
    clearDoError(idDo, updates, setDoErrors);
  };

  // FUNCTION: Reset the active direct object to default values
  const handleResetCurrentDo = (idDo) => {
    resetCurrentDo(setDirectObjects, directObjects, idDo);
  };

  // FUNCTION: Check if a direct object is complete
  const handleIsDoComplete = (directObject) => {
    return isDoComplete(directObject);
  };

  // ========================== Function for OverheadWireInput ==========================
  // FUNCTION: Add a new OHW (max 8 OHW) by Input
  const handleAddOhwByInput = () => {
    syncOhwByInput(
      ohwInputValue,
      overheadWires,
      setOverheadWires,
      ohwIdRef,
      setConfirmReduceOhw,
    );

    // reset input setelah reduce
    setOhwInputValue("");
  };

  // FUNCTION: Confirm reduce Overhead Wire
  const confirmReduceOverheadWires = () => {
    setOverheadWires((prev) => prev.slice(0, confirmReduceOhw.to));
    setConfirmReduceOhw(null);
  };

  // FUNCTION: Cancel reduce Overhead Wire
  const cancelReduceOverheadWires = () => {
    setOhwInputValue(overheadWires.length.toString());
    setConfirmReduceOhw(null);
  };

  // FUNCTION: Add a new OHW (max 8 OHW) by click
  const handleAddOhw = () => {
    addOhw(overheadWires, setOverheadWires, ohwIdRef);
  };

  // FUNCTION: Copy Direct Object data into clipboard
  const handleCopyOhw = (overheadWire) => {
    copyOhw(overheadWire, setOhwClipboard);
  };

  // FUNCTION: Paste clipboard data into selected Direct Object
  const handlePasteOhw = (idOhw) => {
    pasteOhw(idOhw, setOverheadWires, ohwClipboard);
  };

  // FUNCTION: Remove a object by ID
  const handleRemoveOhw = (idOhw) => {
    removeOhw(idOhw, overheadWires, setOverheadWires);
  };

  // FUNCTION: Update a specific object's data
  const handleUpdateOhw = (idOhw, updates) => {
    updateOhw(idOhw, updates, setOverheadWires, overheadWires);
    clearOhwError(idOhw, updates, setOhwErrors);
  };

  // FUNCTION: Reset the active direct object to default values
  const handleResetCurrentOhw = (idOhw) => {
    resetCurrentOhw(setOverheadWires, overheadWires, idOhw);
  };

  // FUNCTION: Check if a direct object is complete
  const handleIsOhwComplete = (overheadWire) => {
    return isOhwComplete(overheadWire);
  };

  // ========================== Function for All Form ==========================
  // FUNCTION: Perform calculation for all form
  const calculateResults = () => {
    const { isValid, errors } = handleCalculateResults(
      handleIsConditionComplete,
      showToast,
      structuralDesign,
      handleStructuralDesignComplete,
      sections,
      handleIsSectionComplete,
      directObjects,
      handleIsDoComplete,
      overheadWires,
      handleIsOhwComplete,
      setResults,
      setResultStructuralDesign,
      setResultsDo,
      setResultsOhw,
      setShowResults,
    );

    if (errors.condition) {
      setConditionErrors(getConditionErrors(condition));
    }

    if (errors.structuralDesign) {
      setStructuralDesignErrors(getStructuralDesignErrors(structuralDesign));
    }

    if (errors.section) {
      setSectionsErrors(getSectionsErrors(sections));
    }

    if (errors.directObject) {
      setDoErrors(getDoErrors(directObjects));
    }

    if (errors.overheadWire) {
      setOhwErrors(getOhwErrors(overheadWires));
    }

    if (!isValid) return;

    // go to results table
    const target = document.getElementById("results-section");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // FUNCTION: Full validation before navigating to the report page
  const handleMakeReport = () => {
    const { isValid, errors } = makeReport(
      results,
      showToast,
      handleIsCoverComplete,
      handleIsConditionComplete,
      handleStructuralDesignComplete,
      sections,
      handleIsSectionComplete,
      directObjects,
      handleIsDoComplete,
      overheadWires,
      handleIsOhwComplete,
    );

    if (errors.cover) setCoverErrors(getCoverErrors(cover));
    else setCoverErrors({});

    if (errors.condition) setConditionErrors(getConditionErrors(condition));
    else setConditionErrors({});

    if (errors.structuralDesign)
      setStructuralDesignErrors(getStructuralDesignErrors(structuralDesign));
    else setStructuralDesignErrors({});

    if (errors.section) setSectionsErrors(getSectionsErrors(sections));
    else setSectionsErrors({});

    if (errors.directObject) setDoErrors(getDoErrors(directObjects));
    else setDoErrors({});

    if (errors.overheadWire) setOhwErrors(getOhwErrors(overheadWires));
    else setOhwErrors({});

    if (!isValid) return;

    sessionStorage.setItem("hasReport", "true");

    navigate("/report", {
      state: {
        results,
        resultsDo,
        resultsOhw,
        cover,
        condition,
        structuralDesign,
      },
    });
  };

  // FUNCTION: Removes all calculation results and hides the results table.
  const handleDeleteReport = () => {
    deleteReport(
      setResults,
      setResultsDo,
      setResultsOhw,
      setResultStructuralDesign,
      setShowResults,
      setCover,
      setCondition,
      setStructuralDesign,
      setSections,
      setDirectObjects,
      setOverheadWires,
      setActiveTab,
      setIsExpandedCondition,
      setIsExpandedPole,
      sectionIdRef,
      doIdRef,
      ohwIdRef,
      setIsExpandedDo,
      setIsExpandedOhw,
    );
  };

  // Render the Report Page component, and pass a prop named onDelete Report to that component.
  useEffect(() => {
    if (location.state?.deleteReport) {
      handleDeleteReport();

      // Hapus state navigate supaya tidak jalan dua kali
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, navigate, location.state?.deleteReport]);

  // FUNCTION: Show toast error.
  const showToast = (message, type = "error") => {
    setToast({ message, type });
  };

  // Active section variable, check whether it is the last or the only one.
  const activeSection = sections.find((s) => s.id === activeTab);
  const isLastSection = sections[sections.length - 1]?.id === activeTab;
  const isOnlySection = sections.length === 1;

  return (
    <div className="min-h-screen">
      {/* ============================================================
        HEADER UTAMA CALCULATION PAGE (Judul + Subjudul + Icon)
      ============================================================ */}
      <HeaderCalculationPage onResetAll={() => setConfirmResetAll(true)} />

      {/* ============================================================
        MAIN CONTENT AREA
      ============================================================ */}
      <div className="mx-12 2040:mx-48 pt-1 pb-8 hp:mx-2">
        {/* ============================================================
          FORM CONDITION (Bagian kondisi perhitungan)
        ============================================================ */}
        <div
          className={`bg-gradient-to-r from-[#0d3b66] to-[#3399cc] p-4 flex items-center justify-between cursor-pointer mt-8 transition-all duration-500 ease-in-out ${
            isExpandedCondition
              ? "rounded-t-2xl hp:rounded-t-xl"
              : "rounded-2xl hp:rounded-xl"
          } hp:px-4 hp:py-3`}
          onClick={() => setIsExpandedCondition(!isExpandedCondition)}
        >
          {/* Judul cover */}
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hp:px-2 hp:py-[8px]">
            <h2 className="text-white text-sm font-bold hp:text-xs hp:font-semibold">
              Standard and Condition
            </h2>
          </div>

          {/* Icon toggle (up/down) */}
          <div className="p-2">
            {isExpandedCondition ? (
              <ChevronUp className="w-5 h-5 text-white hp:w4 hp:h-4" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white hp:w4 hp:h-4" />
            )}
          </div>
        </div>

        {/* Body form (collapsible) */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpandedCondition
              ? "max-h-[500px] rounded-b-2xl hp:rounded-b-xl"
              : "max-h-0 rounded-b-2xl hp:rounded-b-xl"
          }`}
        >
          <ConditionInput
            condition={condition}
            onUpdate={handleConditionUpdate}
            onNext={handleConditionNext}
            errors={conditionErrors}
          />
        </div>

        {/* ============================================================
          FORM POLE (Bagian input section tiang)
        ============================================================ */}
        <div
          className={`bg-gradient-to-r from-[#0d3b66] to-[#3399cc] p-4 flex items-center justify-between cursor-pointer mt-12 transition-all duration-500 ease-in-out ${
            isExpandedPole
              ? "rounded-t-2xl hp:rounded-t-xl"
              : "rounded-2xl hp:rounded-xl"
          } hp:px-4 hp:py-3`}
          onClick={() => setIsExpandedPole(!isExpandedPole)}
        >
          {/* Judul cover */}
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hp:px-2 hp:py-[8px]">
            <h2
              id="pole-section-title"
              className="text-white text-sm font-bold hp:text-xs hp:font-semibold"
            >
              Pole Specifications
            </h2>
          </div>

          {/* Icon toggle (up/down) */}
          <div className="p-2">
            {isExpandedPole ? (
              <ChevronUp className="w-5 h-5 text-white hp:w4 hp:h-4" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white hp:w4 hp:h-4" />
            )}
          </div>
        </div>

        {/* Body form (collapsible) */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpandedPole
              ? "max-h-[10000px] rounded-b-2xl hp:rounded-b-xl"
              : "max-h-0 rounded-b-2xl hp:rounded-b-xl"
          }`}
        >
          <div className="bg-white rounded-b-2xl shadow-sm border border-gray-200 hp:rounded-b-xl">
            {/* Structural Design Form */}
            <div className="border-b border-gray-200 px-6 pt-6 pb-7 hp:px-4 hp:pt-4">
              <div className="flex items-center justify-between mb-4 hp:mb-2">
                <div>
                  <h2 className="text-[#0d3b66] font-semibold flex items-center text-sm gap-2 hp:text-xs hp:font-medium">
                    <div className="w-1 h-5 bg-[#3399cc] rounded-full hp:h-4"></div>
                    Structural Design
                  </h2>
                </div>
              </div>

              <StructuralDesign
                structuralDesign={structuralDesign}
                onUpdate={structuralDesignUpdate}
                errors={structuralDesignErrors}
              />
            </div>

            {/* Step Pole Form */}
            <div className="px-6 pt-6 hp:p-4">
              {/* HEADER ADD SECTION */}
              <div className="flex items-center justify-between mb-4 hp:items-start hp:flex-col hp:gap-6 hp:mb-6">
                <div>
                  <h2 className="text-[#0d3b66] text-sm flex items-center gap-1 hp:text-xs hp:flex hp:items-start">
                    <div className="w-1 h-5 bg-[#3399cc] rounded-full mr-1 hp:h-4"></div>
                    <span className="font-semibold">
                      Configure up to 4 Step Poles
                    </span>
                    <span className=" font-medium hp:hidden">
                      with detailed specifications
                    </span>
                  </h2>
                </div>
                {/* BUTTON ADD SECTION */}
                <button
                  onClick={handleAddSection}
                  disabled={sections.length >= 4}
                  className={`flex items-center gap-2 text-sm px-7 py-3 rounded-lg font-medium transition-all shadow-md 
                  ${
                    sections.length >= 4
                      ? "bg-gray-300 text-black opacity-40 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#0d3b66] to-[#3399cc] text-white hover:shadow-xl transition-transform duration-300 hover:scale-105"
                  } hp:text-xs hp:px-[22px] hp:py-[10px] hp:self-center`}
                >
                  <Plus className="w-5 h-5 hp:w-4 hp:h-4" />
                  Add Step
                </button>
              </div>

              {/* TABS SECTION */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 hp:gap-2 hp:px-2 hp:justify-center">
                {sections.map((section, index) => {
                  const isComplete = handleIsSectionComplete(section);
                  const isActive = activeTab === section.id;

                  return (
                    <div key={section.id} className="flex-shrink-0">
                      <button
                        onClick={() => setActiveTab(section.id)}
                        className={`
                          flex items-center gap-3 px-7 py-2.5 rounded-lg border-2 transition-all
                          ${
                            isActive
                              ? "bg-blue-50 border-blue-500 text-blue-700 hover:bg-blue-100 shadow-md"
                              : isComplete
                                ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                                : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
                          }

                          hp:px-4 hp:py-2
                          
                          hp:border
                          hp:shadow-none
                          hp:gap-2
                        `}
                      >
                        {/* ICON */}
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5 hp:w-4 hp:h-4" />
                        ) : (
                          <Circle className="w-5 h-5 hp:w-4 hp:h-4" />
                        )}

                        {/* TEXT */}
                        <span className="text-sm font-medium hp:text-xs">
                          <span className="hidden hp:inline">{index + 1}</span>
                          <span className="hp:hidden">
                            {isActive ? `Step ${index + 1}` : index + 1}
                          </span>
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="mt-5 border-t border-gray-200"></div>
            </div>

            {/* ACTIVE SECTION INPUT */}
            {activeSection && (
              <div className="p-6 hp:px-4 hp:pt-2 hp:pb-4">
                <div className="space-y-6 hp:space-y-4">
                  {/* Header section title */}
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 hp:mb-4 hp:pb-4">
                    <div className="flex items-center gap-3 hp:gap-2">
                      <div className="w-9 h-9 text-sm rounded-lg bg-gradient-to-br from-[#0d3b66] to-[#3399cc] flex items-center justify-center text-white hp:w-8 hp:h-8">
                        {sections.findIndex((s) => s.id === activeTab) + 1}
                      </div>
                      <div>
                        <h4 className="text-[#0d3b66] text-sm font-medium hp:text-xs">
                          Step Pole
                          {activeSection.name && ` - ${activeSection.name}`}
                        </h4>
                        <p className="text-xs text-gray-500 hp:text-[10px]">
                          {activeSection.poleType} Type
                        </p>
                      </div>
                    </div>

                    {sections.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDelete(activeSection.id);
                        }}
                        title="Delete Step"
                        className="
                          flex items-center gap-2
                          px-6 py-2.5
                          rounded-lg
                          border border-red-200
                          text-red-600
                          bg-red-50
                          hover:bg-red-100 hover:border-red-300
                          transition-all
                          font-medium
                          shadow-sm

                          hp:px-[11px] hp:py-[8px]
                        "
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-xs hp:hidden">Delete Step</span>
                      </button>
                    )}
                  </div>
                  <PoleInput
                    section={activeSection}
                    onUpdate={(updates) =>
                      handleUpdateSection(activeTab, updates)
                    }
                    errors={sectionsErrors[activeTab] || {}}
                  />
                </div>

                {/* FOOTER: RESET + CALCULATE / NEXT */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 hp:mt-5 hp:pt-4">
                  {/* LEFT: RESET */}
                  <button
                    onClick={resetCurrentSection}
                    className="flex items-center text-sm gap-2 px-7 py-2.5 bg-[#eef2f6] text-[#0d3b66]
                    border-2 border-[#d0d7e2] rounded-lg hover:bg-[#e2e8f0] transition-colors font-medium hp:text-xs hp:px-[22px] hp:py-[8px]"
                  >
                    <RotateCcw className="w-5 h-5 hp:w-4 hp:h-4" />
                    Reset
                  </button>

                  {/* RIGHT: CALCULATE / NEXT SECTION */}
                  <div className="flex items-center gap-3 hp:gap-2">
                    {/* BACK BUTTON */}
                    {sections.findIndex((s) => s.id === activeTab) > 0 && (
                      <button
                        onClick={() => {
                          const currentIndex = sections.findIndex(
                            (s) => s.id === activeTab,
                          );
                          setActiveTab(sections[currentIndex - 1].id);
                        }}
                        className="flex items-center text-sm gap-2 px-7 py-2.5 bg-[#eef2f6] text-[#0d3b66]
                        border-2 border-[#d0d7e2] rounded-lg hover:bg-[#e2e8f0] transition-colors font-medium hp:text-xs hp:px-[10px] hp:py-[8px] hp:border-none"
                      >
                        <ChevronLeft className="w-5 h-5 hp:w-4 hp:h-4" />
                        <span className="hp:hidden">Back</span>
                      </button>
                    )}

                    {/* CALCULATE / NEXT BUTTON */}
                    <div className="relative">
                      {/* CONDITIONAL BUTTON */}
                      {isOnlySection || isLastSection ? (
                        <button
                          onClick={handleStepNext}
                          className="flex items-center text-sm gap-2 px-7 py-2.5 bg-gradient-to-r
                          from-[#0d3b66] to-[#3399cc] text-white rounded-lg hover:brightness-110
                          transition-all font-medium shadow-md hp:text-xs hp:px-[22px] hp:py-[8px]"
                        >
                          Next Input
                          <ChevronDown className="w-5 h-5 hp:w-4 hp:h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleNextSection}
                          className="flex items-center text-sm gap-2 px-7 py-2.5
                          bg-gradient-to-r from-[#0d3b66] to-[#3399cc]
                          text-white rounded-lg  
                          hover:brightness-110 transition-all shadow-md font-medium hp:text-xs hp:px-[22px] hp:py-[8px]"
                        >
                          Next Step
                          <ChevronRight className="w-5 h-5 hp:w-4 hp:h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================
          FORM DIRECT OBJECT (Bagian Direct Object perhitungan)
        ============================================================ */}
        <div
          className={`bg-gradient-to-r from-[#0d3b66] to-[#3399cc] p-4 flex items-center justify-between cursor-pointer mt-12 transition-all duration-500 ease-in-out ${
            isExpandedDo
              ? "rounded-t-2xl hp:rounded-t-xl"
              : "rounded-2xl hp:rounded-xl"
          } hp:px-4 hp:py-3`}
          onClick={() => setIsExpandedDo(!isExpandedDo)}
        >
          {/* Judul cover */}
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hp:px-2 hp:py-[8px]">
            <h2 className="text-white text-sm font-bold hp:text-xs hp:font-semibold">
              Direct Object
            </h2>
          </div>

          {/* Icon toggle (up/down) */}
          <div className="p-2">
            {isExpandedDo ? (
              <ChevronUp className="w-5 h-5 text-white hp:w4 hp:h-4" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white hp:w4 hp:h-4" />
            )}
          </div>
        </div>

        {/* Body form (collapsible) */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpandedDo
              ? "max-h-[10000px] rounded-b-2xl hp:rounded-b-xl"
              : "max-h-0 rounded-b-2xl hp:rounded-b-xl"
          }`}
        >
          <DirectObjectInput
            directObjects={directObjects}
            doInputValue={doInputValue}
            setDoInputValue={setDoInputValue}
            onUpdate={handleUpdateDo}
            errors={doErrors}
            onAddDo={handleAddDoByInput}
            onCopyDo={handleCopyDo}
            onPasteDo={handlePasteDo}
            hasClipboard={Boolean(doClipboard)}
            setConfirmDeleteDo={setConfirmDeleteDo}
            resetCurrentDo={handleResetCurrentDo}
            handleAddDo={handleAddDo}
          />
        </div>

        {/* ============================================================
          FORM OVERHEAD WIRE (Bagian Overhead Wire perhitungan)
        ============================================================ */}
        <div
          className={`bg-gradient-to-r from-[#0d3b66] to-[#3399cc] p-4 flex items-center justify-between cursor-pointer mt-12 transition-all duration-500 ease-in-out ${
            isExpandedOhw
              ? "rounded-t-2xl hp:rounded-t-xl"
              : "rounded-2xl hp:rounded-xl"
          } hp:px-4 hp:py-3`}
          onClick={() => setIsExpandedOhw(!isExpandedOhw)}
        >
          {/* Judul cover */}
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hp:px-2 hp:py-[8px]">
            <h2 className="text-white text-sm font-bold hp:text-xs hp:font-semibold">
              Overhead Wire
            </h2>
          </div>

          {/* Icon toggle (up/down) */}
          <div className="p-2">
            {isExpandedOhw ? (
              <ChevronUp className="w-5 h-5 text-white hp:w4 hp:h-4" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white hp:w4 hp:h-4" />
            )}
          </div>
        </div>

        {/* Body form (collapsible) */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isExpandedOhw
              ? "max-h-[10000px] rounded-b-2xl hp:rounded-b-xl"
              : "max-h-0 rounded-b-2xl hp:rounded-b-xl"
          }`}
        >
          <OverheadWireInput
            overheadWires={overheadWires}
            ohwInputValue={ohwInputValue}
            setOhwInputValue={setOhwInputValue}
            onUpdate={handleUpdateOhw}
            errors={ohwErrors}
            onAddOhw={handleAddOhwByInput}
            onCopyOhw={handleCopyOhw}
            onPasteOhw={handlePasteOhw}
            hasClipboard={Boolean(ohwClipboard)}
            setConfirmDeleteOhw={setConfirmDeleteOhw}
            resetCurrentOhw={handleResetCurrentOhw}
            handleAddOhw={handleAddOhw}
          />
        </div>

        <div className="flex justify-center items-center p-5 mt-6 mb-12 bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-gray-200 shadow-sm relative hp:p-4 hp:rounded-xl">
          <button
            onClick={calculateResults}
            className="
              group
              flex items-center gap-3
              px-9 py-3
              bg-gradient-to-r from-[#0d3b66] to-[#3399cc]
              text-white
              rounded-xl
              text-sm
              font-semibold
              shadow-md
              transition-all duration-300
              hover:shadow-2xl
              hover:scale-[1.06]
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-[#3399cc]/40
              hp:text-xs hp:px-[22px] hp:rounded-lg
            "
          >
            <Calculator className="w-5 h-5 hp:w-4 hp:h-4" />
            Calculate Results
          </button>
        </div>

        {/* TABEL HASIL KALKULASI */}
        <div id="results-section">
          {showResults && (
            <ResultsTable
              results={results}
              resultsDo={resultsDo}
              resultsOhw={resultsOhw}
              onCoverInput={handleOpenCoverPopup}
            />
          )}
        </div>
      </div>

      {/* Cover Input Modal */}
      <CoverInputModal
        open={showCoverPopup}
        onClose={handleCloseCoverPopup}
        cover={cover}
        onUpdateCover={handleCoverUpdate}
        onMakeReport={handleMakeReport}
        coverErrors={coverErrors}
      />

      {/* Toast Modal */}
      <ToastModal toast={toast} onClose={() => setToast(null)} />

      {/* Reset Confirmation Modal */}
      <ConfirmResetAllModal
        confirmResetAll={confirmResetAll}
        onClose={() => setConfirmResetAll(false)}
        handleDeleteReport={handleDeleteReport}
      />

      {/* Delete Confirmation Modal for Step Pole */}
      <ConfirmDeletePoleModal
        confirmDelete={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        handleRemoveSection={() => handleRemoveSection(confirmDelete)}
      />

      {/* Delete Confirmation Modal for Direct Object */}
      <ConfirmDeleteDoModal
        confirmDelete={confirmDeleteDo}
        onClose={() => setConfirmDeleteDo(false)}
        handleRemoveDo={() => handleRemoveDo(confirmDeleteDo)}
      />

      {/* Delete Confirmation Modal for Direct Object */}
      <ConfirmReduceDoModal
        confirmReduceDo={confirmReduceDo}
        cancelReduceDirectObjects={cancelReduceDirectObjects}
        confirmReduceDirectObjects={confirmReduceDirectObjects}
      />

      {/* Delete Confirmation Modal for Direct Object */}
      <ConfirmDeleteOhwModal
        confirmDelete={confirmDeleteOhw}
        onClose={() => setConfirmDeleteOhw(false)}
        handleRemoveOhw={() => handleRemoveOhw(confirmDeleteOhw)}
      />

      {/* Delete Confirmation Modal for Direct Object */}
      <ConfirmReduceOhwModal
        confirmReduceOhw={confirmReduceOhw}
        cancelReduceOverheadWires={cancelReduceOverheadWires}
        confirmReduceOverheadWires={confirmReduceOverheadWires}
      />
    </div>
  );
}
