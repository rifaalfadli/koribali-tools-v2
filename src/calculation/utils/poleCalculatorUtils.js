import {
  calculatePoleResults,
  structuralDesignResults,
  calculateDoResults,
  calculateOhwResults,
} from "./calculationResults";

// ========================= Global Helpers =========================
// FUNCTION: check if a value is empty
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  return value.toString().trim() === "";
};

// FUNCTION: helper to clear errors per field
export const clearError = (updates, setErrors) => {
  setErrors((prev) => {
    const next = { ...prev };

    Object.entries(updates).forEach(([key, value]) => {
      // kalau sudah ada isi → error = false
      if (value && value.toString().trim() !== "") {
        next[key] = false;
      }
    });

    return next;
  });
};

// ========================= Function for CoverInput =========================
// FUNCTION: Update cover data
export const updateCover = (cover, updates, setCover) => {
  setCover({ ...cover, ...updates });
};

// FUNCTION: Check if cover information from is complete
export const isCoverComplete = (cover) => {
  return [
    cover.managementMark,
    cover.calculationNumber,
    cover.projectName,
    cover.date,
  ].every((v) => v && v.trim() !== "");
};

// FUNCTION: Create an error checker helper for the cover
export const getCoverErrors = (cover) => ({
  managementMark: isEmpty(cover.managementMark),
  calculationNumber: isEmpty(cover.calculationNumber),
  projectName: isEmpty(cover.projectName),
  date: isEmpty(cover.date),
});

// ======================= Function for ConditionInput ========================
// FUNCTION: Update condition data
export const updateCondition = (condition, updates, setCondition) => {
  setCondition({ ...condition, ...updates });
};

// FUNCTION: Check if condition information form is complete
export const isConditionComplete = (condition) => {
  return [
    condition.designStandard,
    condition.windSpeed,
    condition.projectType,
  ].every((v) => v && v.trim() !== "");
};

// FUNCTIONS: Go to Pole Input after Condition
export const conditionNext = (setIsExpandedCondition, setIsExpandedPole) => {
  // Close section condition
  setIsExpandedCondition(false);

  // Open section pole
  setIsExpandedPole(true);
};

// FUNCTION: Create an error checker helper for the condition
export const getConditionErrors = (condition) => ({
  designStandard: isEmpty(condition.designStandard),
  windSpeed: isEmpty(condition.windSpeed),
  projectType: isEmpty(condition.projectType),
});

// ======================= Function for Structural Design Pole Input ========================
// FUNCTION: Update structural design data
export const updateStructuralDesign = (
  structuralDesign,
  updates,
  setStructuralDesign,
) => {
  setStructuralDesign({ ...structuralDesign, ...updates });
};

// FUNCTION: Check if Structural Design Pole information form is complete
export const structuralDesignComplete = (structuralDesign) => {
  return [structuralDesign.lowestStep, structuralDesign.overDesign].every(
    (v) => v && v.trim() !== "",
  );
};

// FUNCTION: Create an error checker helper for the Structural Design Pole
export const getStructuralDesignErrors = (structuralDesign) => ({
  lowestStep: isEmpty(structuralDesign.lowestStep),
  overDesign: isEmpty(structuralDesign.overDesign),
});

// ========================== Function for PoleInput ==========================
// FUNCTION: Add a new step (max 4 step)
export const addSection = (
  sections,
  setSections,
  setActiveTab,
  sectionIdRef,
) => {
  if (sections.length >= 4) return;

  sectionIdRef.current += 1;
  const newId = sectionIdRef.current.toString();

  setSections([
    ...sections,
    {
      id: newId,
      name: "",
      material: "STK400",
      poleType: "Straight",
      diameterLower: "",
      diameterUpper: "",
      thicknessLower: "",
      thicknessUpper: "",
      height: "",
      quantity: "1",
    },
  ]);

  setActiveTab(newId); // set newly added section as active
};

// FUNCTION: Remove a section by ID
export const removeSection = (
  id,
  sections,
  setSections,
  activeTab,
  setActiveTab,
) => {
  if (sections.length <= 1) return;

  const index = sections.findIndex((s) => s.id === id);
  const newSections = sections.filter((s) => s.id !== id);

  setSections(newSections);

  if (activeTab === id) {
    let newIndex;

    if (index > 0) {
      // ambil section sebelumnya
      newIndex = index - 1;
    } else {
      // kalau hapus index 0 → ambil yang sekarang di 0
      newIndex = 0;
    }

    setActiveTab(newSections[newIndex].id);
  }
};

// FUNCTION: Update a specific section's data
export const updateSection = (id, updates, setSections, sections) => {
  setSections(sections.map((s) => (s.id === id ? { ...s, ...updates } : s)));
};

// FUNCTION: Reset the active section to default values
export const resetCurrent = (setSections, sections, activeTab) => {
  setSections(
    sections.map((s) =>
      s.id === activeTab
        ? {
            ...s,
            name: "",
            diameterLower: "",
            diameterUpper: "",
            thicknessUpper: "",
            thicknessLower: "",
            height: "",
            quantity: "1",
          }
        : s,
    ),
  );
};

// FUNCTION: Go to the next section tab
export const goToNextSection = (sections, activeTab, setActiveTab) => {
  const currentIndex = sections.findIndex((s) => s.id === activeTab);
  if (currentIndex < sections.length - 1) {
    setActiveTab(sections[currentIndex + 1].id);
  }
};

// FUNCTION: Check if a section pole is complete
export const isSectionComplete = (section) => {
  if (
    section.name.trim() === "" ||
    section.height.trim() === "" ||
    section.quantity.trim() === ""
  ) {
    return false; // fallback
  }
  if (section.poleType === "Taper") {
    // Taper: all lower + upper fields required
    return (
      section.diameterLower.trim() !== "" &&
      section.diameterUpper.trim() !== "" &&
      section.thicknessLower.trim() !== "" &&
      section.thicknessUpper.trim() !== ""
    );
  } else if (section.poleType === "Straight") {
    // Straight: only lower required
    return (
      section.diameterLower.trim() !== "" &&
      section.thicknessLower.trim() !== ""
    );
  }
  return false; // fallback
};

// FUNCTION: Create an error checker helper for the section
export const getSectionsErrors = (sections) => {
  const allErrors = {};

  sections.forEach((section) => {
    const e = {
      name: isEmpty(section.name),
      height: isEmpty(section.height),
      quantity: isEmpty(section.quantity),
      diameterLower: false,
      diameterUpper: false,
      thicknessLower: false,
      thicknessUpper: false,
    };

    if (section.poleType === "Taper") {
      e.diameterLower = isEmpty(section.diameterLower);
      e.diameterUpper = isEmpty(section.diameterUpper);
      e.thicknessLower = isEmpty(section.thicknessLower);
      e.thicknessUpper = isEmpty(section.thicknessUpper);
    } else {
      e.diameterLower = isEmpty(section.diameterLower);
      e.thicknessLower = isEmpty(section.thicknessLower);
    }

    if (Object.values(e).some(Boolean)) {
      allErrors[section.id] = e;
    }
  });

  return allErrors;
};

// FUNCTION: clear error for a specific section
export const clearSectionError = (sectionId, updates, setSectionsErrors) => {
  setSectionsErrors((prev) => {
    const next = { ...prev };
    const sectionError = { ...(next[sectionId] || {}) };

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        sectionError[key] = false;
      }
    });

    // kalau semua error false → hapus object error section
    const hasError = Object.values(sectionError).some(Boolean);
    if (hasError) {
      next[sectionId] = sectionError;
    } else {
      delete next[sectionId];
    }

    return next;
  });
};

// FUNCTIONS: Go to Direct Object Input after Step Pole
export const stepPoleNext = (setIsExpandedPole, setIsExpandedDo) => {
  // Close step pole
  setIsExpandedPole(false);

  // Open direct Object
  setIsExpandedDo(true);
};

// ========================== Function for DirectObject ==========================
// FUNCTION: Add a new direct object (max 25 object) By Input
export const syncDoByInput = (
  inputValue,
  directObjects,
  setDirectObjects,
  doIdRef,
  onConfirmReduce, // callback untuk modal konfirmasi
) => {
  const targetCount = Number(inputValue);

  if (!targetCount || targetCount < 0) return;

  const safeTarget = Math.min(targetCount, 25);
  const currentCount = directObjects.length;

  // === CASE 1: JUMLAH SAMA => TIDAK ADA APA-APA
  if (safeTarget === currentCount) return;

  // === CASE 2: TAMBAH OBJECT
  if (safeTarget > currentCount) {
    const addCount = safeTarget - currentCount;

    const newItems = [];
    for (let i = 0; i < addCount; i++) {
      doIdRef.current += 1;
      newItems.push({
        idDo: doIdRef.current.toString(),
        nameDo: "",
        typeOfDo: "omni",
        frontAreaDo: "",
        sideAreaDo: "",
        weightDo: "",
        heightDo: "",
        nncDo: "",
        qtyDo: "1",
        fixAngleDo: "",
      });
    }

    setDirectObjects([...directObjects, ...newItems]);
    return;
  }

  // === CASE 3: KURANG => BUTUH KONFIRMASI
  if (safeTarget < currentCount) {
    onConfirmReduce({
      from: currentCount,
      to: safeTarget,
    });
  }
};

// FUNCTION: Add a new direct object (max 25 object) By Click
export const addDo = (directObjects, setDirectObjects, doIdRef) => {
  if (directObjects.length >= 25) return;

  doIdRef.current += 1;
  const newIdDo = doIdRef.current.toString();

  setDirectObjects([
    ...directObjects,
    {
      idDo: newIdDo,
      nameDo: "",
      typeOfDo: "omni",
      frontAreaDo: "",
      sideAreaDo: "",
      weightDo: "",
      heightDo: "",
      nncDo: "",
      qtyDo: "1",
      fixAngleDo: "",
    },
  ]);
};

// FUNCTION: Copy Direct Object data to clipboard
export const copyDo = (directObject, setDoClipboard) => {
  setDoClipboard({
    nameDo: directObject.nameDo,
    typeOfDo: directObject.typeOfDo,
    frontAreaDo: directObject.frontAreaDo,
    sideAreaDo: directObject.sideAreaDo,
    weightDo: directObject.weightDo,
    heightDo: directObject.heightDo,
    nncDo: directObject.nncDo,
    qtyDo: directObject.qtyDo,
    fixAngleDo: directObject.fixAngleDo,
  });
};

// FUNCTION: Paste clipboard data into a specific Direct Object
export const pasteDo = (idDo, setDirectObjects, doClipboard) => {
  if (!doClipboard) return;

  setDirectObjects((prev) =>
    prev.map((doItem) =>
      doItem.idDo === idDo ? { ...doItem, ...doClipboard } : doItem,
    ),
  );
};

// FUNCTION: Remove a direct object by ID
export const removeDo = (idDo, directObjects, setDirectObjects) => {
  setDirectObjects(directObjects.filter((s) => s.idDo !== idDo));
};

// FUNCTION: Update a specific object's data
export const updateDo = (idDo, updates, setDirectObjects, directObjects) => {
  setDirectObjects(
    directObjects.map((s) => (s.idDo === idDo ? { ...s, ...updates } : s)),
  );
};

// FUNCTION: Reset the active direct object to default values
export const resetCurrentDo = (setDirectObjects, directObjects, idDo) => {
  setDirectObjects(
    directObjects.map((s) =>
      s.idDo === idDo
        ? {
            ...s,
            nameDo: "",
            frontAreaDo: "",
            sideAreaDo: "",
            weightDo: "",
            heightDo: "",
            nncDo: "",
            qtyDo: "1",
            fixAngleDo: "",
          }
        : s,
    ),
  );
};

// FUNCTION: Check if a direct object is complete
export const isDoComplete = (directObject) => {
  // field wajib untuk all type
  const baseComplete =
    directObject.nameDo.trim() !== "" &&
    directObject.frontAreaDo.trim() !== "" &&
    directObject.weightDo.trim() !== "" &&
    directObject.heightDo.trim() !== "" &&
    directObject.nncDo.trim() !== "" &&
    directObject.qtyDo.trim() !== "";

  if (!baseComplete) return false;

  // tambahan khusus directional
  if (directObject.typeOfDo === "directional") {
    return (
      directObject.sideAreaDo.trim() !== "" &&
      directObject.fixAngleDo.trim() !== ""
    );
  }

  return true;
};

// FUNCTION: Create an error checker helper for the direct object
export const getDoErrors = (directObjects) => {
  const allErrors = {};

  directObjects.forEach((directObject) => {
    const e = {
      nameDo: isEmpty(directObject.nameDo),
      frontAreaDo: isEmpty(directObject.frontAreaDo),
      weightDo: isEmpty(directObject.weightDo),
      heightDo: isEmpty(directObject.heightDo),
      nncDo: isEmpty(directObject.nncDo),
      qtyDo: isEmpty(directObject.qtyDo),
      sideAreaDo: false,
      fixAngleDo: false,
    };

    if (directObject.typeOfDo === "directional") {
      e.sideAreaDo = isEmpty(directObject.sideAreaDo);
      e.fixAngleDo = isEmpty(directObject.fixAngleDo);
    }

    if (Object.values(e).some(Boolean)) {
      allErrors[directObject.idDo] = e;
    }
  });

  return allErrors;
};

// FUNCTION: clear error for a specific direct object
export const clearDoError = (idDo, updates, setDoErrors) => {
  setDoErrors((prev) => {
    const next = { ...prev };
    const doError = { ...(next[idDo] || {}) };

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        doError[key] = false;
      }
    });

    // kalau semua error false => hapus object error DO
    const hasError = Object.values(doError).some(Boolean);
    if (hasError) {
      next[idDo] = doError;
    } else {
      delete next[idDo];
    }

    return next;
  });
};

// ========================== Function for OverheadWire ==========================
// FUNCTION: Add a new Overhead Wire (max 8 OHW) By Input
export const syncOhwByInput = (
  inputValue,
  overheadWires,
  setOverheadWires,
  ohwIdRef,
  onConfirmReduce, // callback untuk modal konfirmasi
) => {
  const targetCount = Number(inputValue);

  if (!targetCount || targetCount < 0) return;

  const safeTarget = Math.min(targetCount, 8);
  const currentCount = overheadWires.length;

  // === CASE 1: JUMLAH SAMA => TIDAK ADA APA-APA
  if (safeTarget === currentCount) return;

  // === CASE 2: TAMBAH OHW
  if (safeTarget > currentCount) {
    const addCount = safeTarget - currentCount;

    const newItems = [];
    for (let i = 0; i < addCount; i++) {
      ohwIdRef.current += 1;
      newItems.push({
        idOhw: ohwIdRef.current.toString(),
        nameOhw: "",
        weightOhw: "",
        diameterOhw: "",
        fixheightOhw: "",
        spanOhw: "",
        saggingOhw: "",
        nncOhw: "",
        fixAngleOhw: "",
        verticalAngleOhw: "",
      });
    }

    setOverheadWires([...overheadWires, ...newItems]);
    return;
  }

  // === CASE 3: KURANG => BUTUH KONFIRMASI
  if (safeTarget < currentCount) {
    onConfirmReduce({
      from: currentCount,
      to: safeTarget,
    });
  }
};

// FUNCTION: Add a new overhead wire (max 8 OHW) By Click
export const addOhw = (overheadWires, setOverheadWires, ohwIdRef) => {
  if (overheadWires.length >= 8) return;

  ohwIdRef.current += 1;
  const newIdOhw = ohwIdRef.current.toString();

  setOverheadWires([
    ...overheadWires,
    {
      idOhw: newIdOhw,
      nameOhw: "",
      weightOhw: "",
      diameterOhw: "",
      fixheightOhw: "",
      spanOhw: "",
      saggingOhw: "",
      nncOhw: "",
      fixAngleOhw: "",
      verticalAngleOhw: "",
    },
  ]);
};

// FUNCTION: Copy Overhead Wire data to clipboard
export const copyOhw = (overheadWire, setOhwClipboard) => {
  setOhwClipboard({
    nameOhw: overheadWire.nameOhw,
    weightOhw: overheadWire.weightOhw,
    diameterOhw: overheadWire.diameterOhw,
    fixheightOhw: overheadWire.fixheightOhw,
    spanOhw: overheadWire.spanOhw,
    saggingOhw: overheadWire.saggingOhw,
    nncOhw: overheadWire.nncOhw,
    fixAngleOhw: overheadWire.fixAngleOhw,
    verticalAngleOhw: overheadWire.verticalAngleOhw,
  });
};

// FUNCTION: Paste clipboard data into a specific Overhead Wire
export const pasteOhw = (idOhw, setOverheadWires, ohwClipboard) => {
  if (!ohwClipboard) return;

  setOverheadWires((prev) =>
    prev.map((ohwItem) =>
      ohwItem.idOhw === idOhw ? { ...ohwItem, ...ohwClipboard } : ohwItem,
    ),
  );
};

// FUNCTION: Remove a Overhead Wire by ID
export const removeOhw = (idOhw, overheadWires, setOverheadWires) => {
  setOverheadWires(overheadWires.filter((s) => s.idOhw !== idOhw));
};

// FUNCTION: Update a specific overhead wire's data
export const updateOhw = (idOhw, updates, setOverheadWires, overheadWires) => {
  setOverheadWires(
    overheadWires.map((s) => (s.idOhw === idOhw ? { ...s, ...updates } : s)),
  );
};

// FUNCTION: Reset the active overhead wire to default values
export const resetCurrentOhw = (setOverheadWires, overheadWires, idOhw) => {
  setOverheadWires(
    overheadWires.map((s) =>
      s.idOhw === idOhw
        ? {
            ...s,
            nameOhw: "",
            weightOhw: "",
            diameterOhw: "",
            fixheightOhw: "",
            spanOhw: "",
            saggingOhw: "",
            nncOhw: "",
            fixAngleOhw: "",
            verticalAngleOhw: "",
          }
        : s,
    ),
  );
};

// FUNCTION: Check if a overhead wire is complete
export const isOhwComplete = (overheadWire) => {
  // field wajib untuk all type
  const baseComplete =
    overheadWire.nameOhw.trim() !== "" &&
    overheadWire.weightOhw.trim() !== "" &&
    overheadWire.diameterOhw.trim() !== "" &&
    overheadWire.fixheightOhw.trim() !== "" &&
    overheadWire.spanOhw.trim() !== "" &&
    overheadWire.saggingOhw.trim() !== "" &&
    overheadWire.nncOhw.trim() !== "" &&
    overheadWire.fixAngleOhw.trim() !== "" &&
    overheadWire.verticalAngleOhw.trim() !== "";

  if (!baseComplete) return false;

  return true;
};

// FUNCTION: Create an error checker helper for the overhead wire
export const getOhwErrors = (overheadWires) => {
  const allErrors = {};

  overheadWires.forEach((overheadWire) => {
    const e = {
      nameOhw: isEmpty(overheadWire.nameOhw),
      weightOhw: isEmpty(overheadWire.weightOhw),
      diameterOhw: isEmpty(overheadWire.diameterOhw),
      fixheightOhw: isEmpty(overheadWire.fixheightOhw),
      spanOhw: isEmpty(overheadWire.spanOhw),
      saggingOhw: isEmpty(overheadWire.saggingOhw),
      nncOhw: isEmpty(overheadWire.nncOhw),
      fixAngleOhw: isEmpty(overheadWire.fixAngleOhw),
      verticalAngleOhw: isEmpty(overheadWire.verticalAngleOhw),
    };

    if (Object.values(e).some(Boolean)) {
      allErrors[overheadWire.idOhw] = e;
    }
  });

  return allErrors;
};

// FUNCTION: clear error for a specific overhead wire
export const clearOhwError = (idOhw, updates, setOhwErrors) => {
  setOhwErrors((prev) => {
    const next = { ...prev };
    const ohwError = { ...(next[idOhw] || {}) };

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        ohwError[key] = false;
      }
    });

    // kalau semua error false => hapus wire error OHW
    const hasError = Object.values(ohwError).some(Boolean);
    if (hasError) {
      next[idOhw] = ohwError;
    } else {
      delete next[idOhw];
    }

    return next;
  });
};

// ========================== Function for All Form ==========================
// FUNCTION: Perform calculation for all form
export const handleCalculateResults = (
  handleIsConditionComplete,
  showToast,
  structuralDesign,
  structuralDesignComplete,
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
) => {
  const errors = {
    structuralDesign: false,
    condition: false,
    section: false,
    directObject: false,
    overheadWire: false,
  };

  // VALIDATION: condition information
  if (!handleIsConditionComplete()) {
    showToast("Please complete all Standard and Condition fields.");
    errors.condition = true;
  }

  // VALIDATION: structural design information
  if (!structuralDesignComplete()) {
    showToast("Please complete all Pole Specification fields.");
    errors.structuralDesign = true;
  }

  // VALIDATION: each section pole
  for (let section of sections) {
    if (!handleIsSectionComplete(section)) {
      showToast("Please complete all Pole Specification fields.");
      errors.section = true;
      break;
    }
  }

  // VALIDATION: each direct object
  for (let directObject of directObjects) {
    if (!handleIsDoComplete(directObject)) {
      showToast("Please complete all Direct Object fields.");
      errors.directObject = true;
      break;
    }
  }

  // VALIDATION: each overhead wire
  for (let overheadWire of overheadWires) {
    if (!handleIsOhwComplete(overheadWire)) {
      showToast("Please complete all Overhead Wire fields.");
      errors.overheadWire = true;
      break;
    }
  }

  const isValid = Object.values(errors).every((v) => v === false);

  // STOP kalau tidak valid
  if (!isValid) {
    return { isValid, errors };
  }

  // FUNCTION: Calculate results for all pole sections
  const calculatedResults = calculatePoleResults(sections);
  const calculatedResultsDo = calculateDoResults(directObjects);
  const calculatedStructuralDesign = structuralDesignResults(structuralDesign);
  const calculatedResultsOhw = calculateOhwResults(overheadWires);

  setResults(calculatedResults);
  setResultStructuralDesign(calculatedStructuralDesign);
  setResultsDo(calculatedResultsDo);
  setResultsOhw(calculatedResultsOhw);
  setShowResults(true);

  // ALL CHECK PASSED
  return { isValid, errors };
};

// FUNCTION: Full validation before navigating to the report page
export const makeReport = (
  results,
  showToast,
  handleIsCoverComplete,
  handleIsConditionComplete,
  structuralDesignComplete,
  sections,
  handleIsSectionComplete,
  directObjects,
  handleIsDoComplete,
  overheadWires,
  handleIsOhwComplete,
) => {
  const errors = {
    results: false,
    cover: false,
    condition: false,
    structuralDesign: false,
    section: false,
    directObject: false,
    overheadWire: false,
  };

  // CHECK 1: Results
  if (results.length === 0) {
    showToast("No calculation results pole available.");
    errors.results = true;
  }

  // CHECK 3: Cover
  if (!handleIsCoverComplete()) {
    showToast("Please complete the Cover Information first.");
    errors.cover = true;
  }

  // CHECK 4: Condition
  if (!handleIsConditionComplete()) {
    showToast("Please complete all Standard and Condition information first.");
    errors.condition = true;
  }

  // CHECK 5: Structural Design
  if (!structuralDesignComplete()) {
    showToast("Please complete all Pole Specification first.");
    errors.structuralDesign = true;
  }

  // CHECK 6: Sections
  for (let section of sections) {
    if (!handleIsSectionComplete(section)) {
      showToast("Please complete all Pole Specification first.");
      errors.section = true;
      break;
    }
  }

  // CHECK 7: Direct Object
  for (let directObject of directObjects) {
    if (!handleIsDoComplete(directObject)) {
      showToast("Please complete all Direct Object first.");
      errors.directObject = true;
      break;
    }
  }

  // CHECK 8: Overhead Wire
  for (let overheadWire of overheadWires) {
    if (!handleIsOhwComplete(overheadWire)) {
      showToast("Please complete all Overhead Wire first.");
      errors.overheadWire = true;
      break;
    }
  }

  const isValid = Object.values(errors).every((v) => v === false);

  return { isValid, errors };
};

// FUNCTION: Full validation before navigating to the report page
export const deleteReport = (
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
) => {
  // Hapus hasil kalkulasi
  setResults([]);
  setResultsDo([]);
  setResultsOhw([]);
  setResultStructuralDesign([]);
  setShowResults(false);

  // Reset Cover
  setCover({
    managementMark: "",
    calculationNumber: "",
    projectName: "",
    contentr2: "",
    contentr3: "",
    date: "",
  });

  // Reset Condition
  setCondition({
    designStandard: "",
    windSpeed: "",
    projectType: "",
  });

  // Reset Structural Design
  setStructuralDesign({
    lowestStep: "",
    overDesign: "",
  });

  // Reset Sections (1 section default)
  setSections([
    {
      id: "1",
      name: "",
      material: "STK400",
      poleType: "Straight",
      diameterLower: "",
      diameterUpper: "",
      thicknessLower: "",
      thicknessUpper: "",
      height: "",
      quantity: "1",
    },
  ]);

  // Reset Direct Objects
  setDirectObjects([]);
  doIdRef.current = 0;

  // Reset Overhead Wire
  setOverheadWires([]);
  ohwIdRef.current = 0;

  // Reset active tab ke section 1
  setActiveTab("1");
  sectionIdRef.current = 1;

  // Reset UI control
  setIsExpandedCondition(true);
  setIsExpandedPole(true);
  setIsExpandedDo(false);
  setIsExpandedOhw(false);

  // Hapus semua sessionStorage
  // sessionStorage.clear();
  sessionStorage.removeItem("cover");
  sessionStorage.removeItem("condition");
  sessionStorage.removeItem("structuralDesign");
  sessionStorage.removeItem("sections");
  sessionStorage.removeItem("directObjects");
  sessionStorage.removeItem("overheadWires");
  sessionStorage.removeItem("results");
  sessionStorage.removeItem("resultsDo");
  sessionStorage.removeItem("resultsOhw");
};
