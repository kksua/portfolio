import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectStory } from "../components/ProjectStory";
import { projects } from "../data/projects";

type Direction = "Across" | "Down";

type Clue = {
  id: string;
  direction: Direction;
  number: number;
  answer: string;
  clue: string;
  cells: Array<{
    row: number;
    col: number;
  }>;
};

const clues: Clue[] = [
  // ACROSS

  {
    id: "A5",
    direction: "Across",
    number: 5,
    answer: "ASYNC",
    clue: 'Five letters for "I have other things to do while I wait."',
    cells: [
      { row: 1, col: 7 },
      { row: 1, col: 8 },
      { row: 1, col: 9 },
      { row: 1, col: 10 },
      { row: 1, col: 11 },
    ],
  },

  {
    id: "A6",
    direction: "Across",
    number: 6,
    answer: "ENDPOINT",
    clue: "Where an API waits to hear from you.",
    cells: [
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 2, col: 5 },
      { row: 2, col: 6 },
      { row: 2, col: 7 },
    ],
  },

  {
    id: "A7",
    direction: "Across",
    number: 7,
    answer: "PYTHON",
    clue: "Seven-letter language powering scripts, APIs and plenty of AI.",
    cells: [
      { row: 4, col: 2 },
      { row: 4, col: 3 },
      { row: 4, col: 4 },
      { row: 4, col: 5 },
      { row: 4, col: 6 },
      { row: 4, col: 7 },
    ],
  },

  {
    id: "A8",
    direction: "Across",
    number: 8,
    answer: "DOCKER",
    clue: '"But it works on my machine" insurance.',
    cells: [
      { row: 4, col: 11 },
      { row: 4, col: 12 },
      { row: 4, col: 13 },
      { row: 4, col: 14 },
      { row: 4, col: 15 },
      { row: 4, col: 16 },
    ],
  },

  {
    id: "A10",
    direction: "Across",
    number: 10,
    answer: "CACHE",
    clue: "Remember now, respond faster later.",
    cells: [
      { row: 5, col: 7 },
      { row: 5, col: 8 },
      { row: 5, col: 9 },
      { row: 5, col: 10 },
      { row: 5, col: 11 },
    ],
  },

  {
    id: "A11",
    direction: "Across",
    number: 11,
    answer: "GIT",
    clue: "Three letters that tracks the past while you build the future.",
    cells: [
      { row: 9, col: 7 },
      { row: 9, col: 8 },
      { row: 9, col: 9 },
    ],
  },

  {
    id: "A12",
    direction: "Across",
    number: 12,
    answer: "STATE",
    clue: "Change me and your React interface may change with me.",
    cells: [
      { row: 9, col: 12 },
      { row: 9, col: 13 },
      { row: 9, col: 14 },
      { row: 9, col: 15 },
      { row: 9, col: 16 },
    ],
  },

  // DOWN

  {
    id: "D1",
    direction: "Down",
    number: 1,
    answer: "API",
    clue: "Three letters that let two pieces of software talk.",
    cells: [
      { row: 0, col: 5 },
      { row: 1, col: 5 },
      { row: 2, col: 5 },
    ],
  },

  {
    id: "D2",
    direction: "Down",
    number: 2,
    answer: "LATENCY",
    clue: "The waiting time every developer wants to shrink.",
    cells: [
      { row: 0, col: 7 },
      { row: 1, col: 7 },
      { row: 2, col: 7 },
      { row: 3, col: 7 },
      { row: 4, col: 7 },
      { row: 5, col: 7 },
      { row: 6, col: 7 },
    ],
  },

  {
    id: "D3",
    direction: "Down",
    number: 3,
    answer: "TYPESCRIPT",
    clue: "JavaScript's type-conscious relative.",
    cells: [
      { row: 0, col: 9 },
      { row: 1, col: 9 },
      { row: 2, col: 9 },
      { row: 3, col: 9 },
      { row: 4, col: 9 },
      { row: 5, col: 9 },
      { row: 6, col: 9 },
      { row: 7, col: 9 },
      { row: 8, col: 9 },
      { row: 9, col: 9 },
    ],
  },

  {
    id: "D4",
    direction: "Down",
    number: 4,
    answer: "DEPLOY",
    clue: "When localhost finally meets the world.",
    cells: [
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 3, col: 0 },
      { row: 4, col: 0 },
      { row: 5, col: 0 },
      { row: 6, col: 0 },
    ],
  },

  {
    id: "D8",
    direction: "Down",
    number: 8,
    answer: "DEBUG",
    clue: "When programmers play detective.",
    cells: [
      { row: 4, col: 11 },
      { row: 5, col: 11 },
      { row: 6, col: 11 },
      { row: 7, col: 11 },
      { row: 8, col: 11 },
    ],
  },

  {
    id: "D9",
    direction: "Down",
    number: 9,
    answer: "COMMIT",
    clue: "Save point for developers.",
    cells: [
      { row: 4, col: 13 },
      { row: 5, col: 13 },
      { row: 6, col: 13 },
      { row: 7, col: 13 },
      { row: 8, col: 13 },
      { row: 9, col: 13 },
    ],
  },
];

function TechCrossword() {
  const gridRows = 10;
  const gridColumns = 17;

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const completionRef = useRef<HTMLDivElement | null>(null);
  const wasSolvedRef = useRef(false);

  const filledCells = useMemo(() => {
    const cells = Array.from({ length: gridRows }, () =>
      Array.from({ length: gridColumns }, () => ""),
    );

    clues.forEach((clue) => {
      clue.cells.forEach(({ row, col }, index) => {
        cells[row][col] = clue.answer[index];
      });
    });

    return cells;
  }, []);

  const cellPositions = useMemo(() => {
    const positions = new Map<
      string,
      {
        across: string | null;
        down: string | null;
      }
    >();

    clues.forEach((clue) => {
      clue.cells.forEach(({ row, col }) => {
        const key = `${row}-${col}`;

        const existing = positions.get(key) ?? {
          across: null,
          down: null,
        };

        positions.set(key, {
          across: clue.direction === "Across" ? clue.id : existing.across,

          down: clue.direction === "Down" ? clue.id : existing.down,
        });
      });
    });

    return positions;
  }, []);

  const cellNumbers = useMemo(() => {
    const numbers = new Map<string, number>();

    clues.forEach((clue) => {
      const firstCell = clue.cells[0];

      if (!firstCell) return;

      numbers.set(`${firstCell.row}-${firstCell.col}`, clue.number);
    });

    return numbers;
  }, []);

  const [entries, setEntries] = useState<Record<string, string>>({});

  const [activeId, setActiveId] = useState("A5");

  const [status, setStatus] = useState("");

  const [statusSuccess, setStatusSuccess] = useState(false);

  const [showCompletion, setShowCompletion] = useState(false);

  const activeClue = clues.find((clue) => clue.id === activeId) ?? clues[0];

  const allSolved = clues.every((clue) =>
    clue.cells.every(
      ({ row, col }, index) =>
        (entries[`${row}-${col}`] ?? "") === clue.answer[index],
    ),
  );

  /*
   * Show congratulations only when the puzzle
   * transitions from unsolved -> solved.
   *
   * This means that after the user dismisses the
   * message, it will stay closed.
   */
  useEffect(() => {
    if (allSolved && !wasSolvedRef.current) {
      setShowCompletion(true);
    }

    if (!allSolved) {
      setShowCompletion(false);
    }

    wasSolvedRef.current = allSolved;
  }, [allSolved]);

  /*
   * Close congratulations when clicking anywhere
   * outside the green message.
   */
  useEffect(() => {
    if (!showCompletion) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (completionRef.current && !completionRef.current.contains(target)) {
        setShowCompletion(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showCompletion]);

  const focusCell = (row: number, col: number) => {
    const key = `${row}-${col}`;

    window.requestAnimationFrame(() => {
      inputRefs.current[key]?.focus();
    });
  };

  const selectClue = (clueId: string) => {
    const clue = clues.find((item) => item.id === clueId);

    if (!clue) return;

    setActiveId(clueId);

    const firstEmpty =
      clue.cells.find(({ row, col }) => !entries[`${row}-${col}`]) ??
      clue.cells[0];

    if (firstEmpty) {
      focusCell(firstEmpty.row, firstEmpty.col);
    }
  };

  const activateCell = (row: number, col: number) => {
    const key = `${row}-${col}`;

    const metadata = cellPositions.get(key);

    if (!metadata) return;

    const currentContainsCell = activeClue.cells.some(
      (cell) => cell.row === row && cell.col === col,
    );

    if (currentContainsCell) {
      return;
    }

    if (metadata.across) {
      setActiveId(metadata.across);
      return;
    }

    if (metadata.down) {
      setActiveId(metadata.down);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    const key = `${row}-${col}`;

    const metadata = cellPositions.get(key);

    if (!metadata) return;

    const currentContainsCell = activeClue.cells.some(
      (cell) => cell.row === row && cell.col === col,
    );

    if (metadata.across && metadata.down && currentContainsCell) {
      if (activeId === metadata.across) {
        setActiveId(metadata.down);
      } else if (activeId === metadata.down) {
        setActiveId(metadata.across);
      }

      return;
    }

    activateCell(row, col);
  };

  const setCellValue = (row: number, col: number, value: string) => {
    const nextValue = value
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .slice(0, 1);

    if (!filledCells[row]?.[col]) {
      return;
    }

    const key = `${row}-${col}`;

    setEntries((current) => ({
      ...current,
      [key]: nextValue,
    }));

    if (nextValue && nextValue === filledCells[row][col]) {
      setStatus("✓ COMPILES");
      setStatusSuccess(true);

      window.setTimeout(() => {
        setStatus("");
      }, 650);
    }

    if (!nextValue) return;

    const currentIndex = activeClue.cells.findIndex(
      (cell) => cell.row === row && cell.col === col,
    );

    if (currentIndex === -1) {
      return;
    }

    const nextCell = activeClue.cells[currentIndex + 1];

    if (nextCell) {
      focusCell(nextCell.row, nextCell.col);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number,
  ) => {
    const key = `${row}-${col}`;

    if (event.key !== "Backspace" || entries[key]) {
      return;
    }

    const currentIndex = activeClue.cells.findIndex(
      (cell) => cell.row === row && cell.col === col,
    );

    if (currentIndex <= 0) {
      return;
    }

    const previousCell = activeClue.cells[currentIndex - 1];

    focusCell(previousCell.row, previousCell.col);
  };

  const revealCurrent = () => {
    const nextEntries = {
      ...entries,
    };

    activeClue.cells.forEach(({ row, col }, index) => {
      nextEntries[`${row}-${col}`] = activeClue.answer[index];
    });

    setEntries(nextEntries);

    setStatus("REVEALED");
    setStatusSuccess(true);

    window.setTimeout(() => {
      setStatus("");
    }, 700);
  };

  const resetBoard = () => {
    setEntries({});
    setStatus("");
    setStatusSuccess(false);
    setActiveId("A5");
    setShowCompletion(false);
    wasSolvedRef.current = false;
  };

  const checkCurrent = () => {
    const hasMistake = activeClue.cells.some(({ row, col }, index) => {
      const value = entries[`${row}-${col}`] ?? "";

      return value !== activeClue.answer[index];
    });

    if (hasMistake) {
      setStatus("TRY AGAIN");
      setStatusSuccess(false);
    } else {
      setStatus("✓ COMPILES");
      setStatusSuccess(true);
    }

    window.setTimeout(() => {
      setStatus("");
    }, 800);
  };

  return (
    <div className="mt-10 border-t border-ink pt-6">
      <div className="mb-5 flex flex-col gap-2 border-b border-ink pb-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[0.68rem] font-sans uppercase tracking-[0.28rem] text-muted">
            DEBUG PUZZLE
          </p>

          <h3 className="font-display text-[2.1rem] leading-none tracking-[-0.06em] text-ink md:text-[3rem]">
            TECH CROSSWORD
          </h3>
        </div>

        <p className="text-[0.72rem] uppercase tracking-[0.18rem] text-muted">
          No Stack Overflow. Have fun.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* CROSSWORD PANEL */}

        <div className="relative flex h-full items-center border border-ink bg-ink p-2">
          {/* CROSSWORD */}

          <div
            className="grid w-full bg-ink"
            style={{
              gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            }}
          >
            {Array.from(
              {
                length: gridRows * gridColumns,
              },
              (_, index) => {
                const row = Math.floor(index / gridColumns);

                const col = index % gridColumns;

                const isPuzzleCell = Boolean(filledCells[row]?.[col]);

                const key = `${row}-${col}`;

                const currentValue = entries[key] ?? "";

                const clueNumber = cellNumbers.get(key);

                const isActive = activeClue.cells.some(
                  (cell) => cell.row === row && cell.col === col,
                );

                return isPuzzleCell ? (
                  <label
                    key={key}
                    className={`relative flex aspect-square items-center justify-center border border-ink bg-[#f5efe2] text-center ${
                      isActive ? "z-10 ring-2 ring-inset ring-ink" : ""
                    }`}
                    onClick={() => handleCellClick(row, col)}
                  >
                    {clueNumber !== undefined ? (
                      <span className="pointer-events-none absolute left-[2px] top-[2px] z-10 font-sans text-[0.38rem] font-semibold leading-none text-ink md:left-[3px] md:top-[3px] md:text-[0.48rem]">
                        {clueNumber}
                      </span>
                    ) : null}

                    <input
                      ref={(element) => {
                        inputRefs.current[key] = element;
                      }}
                      value={currentValue}
                      maxLength={1}
                      aria-label={`Cell ${row + 1}-${col + 1}`}
                      onFocus={() => activateCell(row, col)}
                      onChange={(event) =>
                        setCellValue(row, col, event.target.value)
                      }
                      onKeyDown={(event) => handleKeyDown(event, row, col)}
                      className="h-full w-full bg-transparent pt-[2px] text-center font-display text-[0.72rem] uppercase text-ink outline-none md:text-[1rem]"
                    />
                  </label>
                ) : (
                  <div
                    key={key}
                    className="aspect-square border border-ink bg-ink"
                  />
                );
              },
            )}
          </div>

          {/* COMPLETION OVERLAY*/}

          {showCompletion && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-ink/40 p-6">
              <motion.div
                ref={completionRef}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="relative z-10 w-full max-w-[420px] border border-[#003300] bg-[#003300] px-8 py-10 text-center text-[#f5efe2]"
              >
                <p className="font-display text-[2rem] leading-none tracking-[-0.05em] text-[#f5efe2] md:text-[2.7rem]">
                  Congratulations !!!
                </p>

                <p className="mt-4 font-sans text-[0.7rem] uppercase tracking-[0.24rem] text-[#f5efe2]/90">
                  You did it!
                </p>
              </motion.div>
            </div>
          )}
        </div>

        {/* CLUES */}

        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {/* ACROSS */}

            <div className="space-y-2">
              <p className="text-[0.6rem] font-sans uppercase tracking-[0.22rem] text-muted">
                Across
              </p>

              {clues
                .filter((clue) => clue.direction === "Across")
                .sort((a, b) => a.number - b.number)
                .map((clue) => (
                  <button
                    key={clue.id}
                    type="button"
                    onClick={() => selectClue(clue.id)}
                    className={`w-full border p-2 text-left transition-colors ${
                      activeId === clue.id
                        ? "border-ink bg-ink text-paper"
                        : "border-ink bg-[#f5efe2] text-ink"
                    }`}
                  >
                    <span className="mr-2 align-top text-[0.54rem] font-semibold uppercase tracking-[0.18rem]">
                      {clue.number}
                    </span>

                    <span className="font-display text-[0.78rem] uppercase leading-relaxed tracking-[0.08rem]">
                      {clue.clue}
                    </span>
                  </button>
                ))}
            </div>

            {/* DOWN */}

            <div className="space-y-2">
              <p className="text-[0.6rem] font-sans uppercase tracking-[0.22rem] text-muted">
                Down
              </p>

              {clues
                .filter((clue) => clue.direction === "Down")
                .sort((a, b) => a.number - b.number)
                .map((clue) => (
                  <button
                    key={clue.id}
                    type="button"
                    onClick={() => selectClue(clue.id)}
                    className={`w-full border p-2 text-left transition-colors ${
                      activeId === clue.id
                        ? "border-ink bg-ink text-paper"
                        : "border-ink bg-[#f5efe2] text-ink"
                    }`}
                  >
                    <span className="mr-2 align-top text-[0.54rem] font-semibold uppercase tracking-[0.18rem]">
                      {clue.number}
                    </span>

                    <span className="font-display text-[0.78rem] uppercase leading-relaxed tracking-[0.08rem]">
                      {clue.clue}
                    </span>
                  </button>
                ))}
            </div>
          </div>

          {/* CONTROLS */}

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={revealCurrent}
              className="border border-ink bg-[#f5efe2] px-3 py-1.5 text-[0.58rem] font-sans uppercase tracking-[0.18rem] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Reveal
            </button>

            <button
              type="button"
              onClick={checkCurrent}
              className="border border-ink bg-[#f5efe2] px-3 py-1.5 text-[0.58rem] font-sans uppercase tracking-[0.18rem] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Check
            </button>

            <button
              type="button"
              onClick={resetBoard}
              className="border border-ink bg-[#f5efe2] px-3 py-1.5 text-[0.58rem] font-sans uppercase tracking-[0.18rem] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Reset
            </button>

            <div
              className={`ml-auto min-h-[1.2rem] text-[0.6rem] font-sans uppercase tracking-[0.18rem] ${
                statusSuccess ? "font-semibold text-[#003300]" : "text-ink"
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-4 py-4 md:px-8 md:py-5">
      <div className="mb-4 border-b border-ink pb-3">
        <h2 className="font-display text-[2.5rem] leading-none tracking-[-0.06em] text-ink md:text-[4rem]">
          SELECTED PROJECTS
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-2 md:gap-8 md:gap-y-12">
        {projects.map((project, index) => (
          <ProjectStory
            key={project.title}
            project={project}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <TechCrossword />
    </section>
  );
}
