import React from "react";
import { useRef, useMemo } from "react";
import { createAcemastBlocks } from "./AcemastBlock";
import { useA4Pagination } from "../useA4Pagination";
import AcemastPages from "./AcemastPages";
import "../../styles/page.css";

export default function AcemastReport({
  cover,
  condition,
  structuralDesign,
  results,
  resultsDo,
  resultsOhw,
}) {
  const blocks = useMemo(
    () =>
      createAcemastBlocks(
        results,
        resultsDo,
        resultsOhw,
        condition,
        structuralDesign,
      ),
    [results, resultsDo, resultsOhw, condition, structuralDesign],
  ); // Memoize blocks so they are created only once
  const measureRef = useRef(null); // Ref to hidden div for measuring block heights

  // Get paginated pages based on A4 page height
  const pages = useA4Pagination({
    blocks,
    measureRef,
  });

  return (
    <>
      {/* Render actual A4 pages using paginated data */}
      <AcemastPages
        cover={cover}
        condition={condition}
        results={results}
        pages={pages}
      />
    </>
  );
}
