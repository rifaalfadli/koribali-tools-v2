// Function to convert a "YYYY-MM-DD" date string into Japanese format "YYYY年M月D日"
export const formatJP = (dateString) => {
  if (!dateString) return "";

  const [y, m, d] = dateString.split("-");

  return (
    <>
      <span className="latin">{y}</span>
      <span className="jp">年</span>
      <span className="latin">{parseInt(m)}</span>
      <span className="jp">月</span>
      <span className="latin">{parseInt(d)}</span>
      <span className="jp">日</span>
    </>
  );
};

// Function to return the corresponding design standard text based on the given key
export const getDesignStandardText = (value) => {
  switch (value) {
    case "act":
      return "Standard Acts. (Law)";
    case "tower":
      return "Tower Standard";
    case "jil":
      return "JIL日本照明器具工業会規格等に準拠する。";
    case "haiden":
      return "Haiden";
    default:
      return "";
  }
};

// Function to generate load table rows based on step height criteria
export const getRowsForStep = (
  stepIndex,
  resultsPole,
  resultsDo,
  structuralDesign
) => {
  // Current pole step
  const currentStep = resultsPole[stepIndex];

  // Pole below current step (if any)
  const nextStep = resultsPole[stepIndex + 1];

  // Current pole step height
  const currentH = Number(currentStep.heightPole);

  // Height of the pole below (null if last step)
  const nextH = nextStep ? Number(nextStep.heightPole) : null;

  // The most basic lower limit
  const lowestPole = Number(structuralDesign?.lowestStep) || 0;

  const rows = [];

  // ===== DIRECT OBJECT (DO) =====
  resultsDo.forEach((doItem) => {
    const doHeight = Number(doItem.heightDo) || 0;

    // appear in this step?
    const passHeight = nextStep ? doHeight > nextH : doHeight >= lowestPole;

    if (!passHeight) return;

    rows.push({
      type: "do",
      data: doItem,
    });
  });

  // ===== POLE =====
  resultsPole.forEach((pole) => {
    const poleH = Number(pole.heightPole) || 0;

    if (poleH >= currentH) {
      rows.push({
        type: "pole",
        data: pole,
      });
    }
  });

  return rows;
};
