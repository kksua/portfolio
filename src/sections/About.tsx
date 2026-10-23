import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type ArticleBlock = {
  type: "paragraph" | "quote";
  text: string;
};

const articleBlocks: ArticleBlock[] = [
  {
    type: "paragraph",
    text: "My life took a 180-degree turn when my dad told me he would support my dream of studying in France. At 18, I left Sri Lanka to pursue an engineering degree, stepping into a new country, a new language and a life I was excited and slightly terrified to figure out.",
  },
  {
    type: "paragraph",
    text: "At ESIGELEC, I discovered how much I enjoyed building things. Between programming assignments and team projects, I made memories I look back on fondly. Along the way, I learned to ask questions, work through problems and appreciate the people figuring things out beside me.",
  },
  {
    type: "paragraph",
    text: "Second year of my studies I moved to Berlin for an internship at Art & Science Node. Building a website alongside artists, scientists and designers showed me how differently people can approach the same project. I also supported two fellow interns with web development, learning how to explain technical ideas in ways that made sense to someone encountering them for the first time.",
  },
  {
    type: "paragraph",
    text: "During my final internship at Rivière Yuan, an EdTech startup, I worked on digital products and communicated directly with clients. Understanding their needs, discussing feedback and helping prioritise requests became some of my favourite parts of the work. I found myself increasingly curious about how we decide what to build and how we bring it all together.",
  },
  {
    type: "paragraph",
    text: "That experience sparked my interest in project management and strengthened my passion for creating useful digital experiences. It also gave me a clearer direction: digital project and product management, where I could bring my technical background into conversations about user needs and business goals.",
  },
  {
    type: "paragraph",
    text: "My next chapter is a second master’s in International Marketing, building my knowledge of customer research, market analysis and strategy. Alongside it, I’m looking for a 12-month alternance starting in February 2027, where I can contribute, keep learning and help bring ideas to life with a team.",
  },
];

// Offsets count every character, including spaces and paragraph separators.
const articleText = articleBlocks.map((block) => block.text).join("\n\n");
const wordEnds = [...articleText.matchAll(/\S+(?:\s+|$)/g)].map(
  (match) => match.index + match[0].length,
);

function sliceArticle(start: number, end: number): ArticleBlock[] {
  let offset = 0;

  return articleBlocks.flatMap((block) => {
    const blockStart = offset;
    offset += block.text.length + 2;
    const text = block.text
      .slice(Math.max(0, start - blockStart), Math.max(0, end - blockStart))
      .trim();

    return text ? [{ ...block, text }] : [];
  });
}

function splitArticle(leftEnd: number, centerEnd: number) {
  return [
    sliceArticle(0, leftEnd),
    sliceArticle(leftEnd, centerEnd),
    sliceArticle(centerEnd, articleText.length),
  ];
}

function balanceColumns(layout: HTMLDivElement): ArticleBlock[][] {
  // Stacked layouts keep whole paragraphs in their natural reading order.
  if (window.matchMedia("(max-width: 1024px)").matches) {
    return [
      articleBlocks.slice(0, 2),
      articleBlocks.slice(2, 4),
      articleBlocks.slice(4),
    ];
  }

  const columns = Array.from(layout.children) as HTMLElement[];
  const probes = columns.map((column) => {
    const probe = column.cloneNode(false) as HTMLElement;
    Object.assign(probe.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: `${column.getBoundingClientRect().width}px`,
      height: "auto",
      visibility: "hidden",
      pointerEvents: "none",
      transform: "none",
    });
    probe.setAttribute("aria-hidden", "true");
    document.body.appendChild(probe);
    return probe;
  });
  const portrait = columns[1].querySelector("figure")!.cloneNode(true);

  const measuredHeights = new Map<string, number>();
  function measure(column: number, start: number, end: number) {
    const key = `${column}:${start}:${end}`;
    const cached = measuredHeights.get(key);
    if (cached !== undefined) return cached;
    const probe = probes[column];
    probe.replaceChildren();
    if (column === 1) probe.appendChild(portrait);
    sliceArticle(start, end).forEach((block, index) => {
      const element = document.createElement(
        block.type === "quote" ? "blockquote" : "p",
      );
      element.textContent = block.text;
      if (block.type === "quote") element.className = "about-quote";
      else if (column === 0 && index === 0)
        element.className = "about-drop-cap";
      probe.appendChild(element);
    });
    const height = probe.getBoundingClientRect().height;
    measuredHeights.set(key, height);
    return height;
  }

  // Find the last word that fits; paragraphs can continue in the next column.
  function fit(column: number, start: number, height: number) {
    let low = 0;
    let high = wordEnds.length;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      const end = wordEnds[middle - 1];
      if (end <= start || measure(column, start, end) <= height) low = middle;
      else high = middle - 1;
    }
    return Math.max(start, wordEnds[low - 1] ?? 0);
  }

  try {
    let low = measure(1, 0, 0);
    let high = Math.max(low, measure(0, 0, articleText.length));
    let result = splitArticle(0, 0);

    // Use actual font metrics, column widths, paragraph gaps and portrait size.
    for (let iteration = 0; iteration < 16; iteration += 1) {
      const height = (low + high) / 2;
      const leftEnd = fit(0, 0, height);
      const centerEnd = fit(1, leftEnd, height);
      if (measure(2, centerEnd, articleText.length) <= height) {
        high = height;
        result = splitArticle(leftEnd, centerEnd);
      } else {
        low = height;
      }
    }
    return result;
  } finally {
    probes.forEach((probe) => probe.remove());
  }
}

function ArticleContent({
  blocks,
  dropCap = false,
}: {
  blocks: ArticleBlock[];
  dropCap?: boolean;
}) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "quote") {
          return (
            <blockquote key={`${block.text}-${index}`} className="about-quote">
              {block.text}
            </blockquote>
          );
        }

        return (
          <p
            key={`${block.text}-${index}`}
            className={dropCap && index === 0 ? "about-drop-cap" : undefined}
          >
            {block.text}
          </p>
        );
      })}
    </>
  );
}

export function About() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [distributedBlocks, setDistributedBlocks] = useState(() =>
    splitArticle(
      wordEnds[Math.floor(wordEnds.length / 3)],
      wordEnds[Math.floor((wordEnds.length * 2) / 3)],
    ),
  );

  useLayoutEffect(() => {
    const layout = layoutRef.current!;
    let frame = 0;
    let disposed = false;
    let previousWidth = 0;
    const rebalance = () => {
      if (disposed) return;
      setDistributedBlocks(balanceColumns(layout));
    };
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === previousWidth) return;
      previousWidth = entry.contentRect.width;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(rebalance);
    });
    observer.observe(layout);
    rebalance();
    void document.fonts.ready.then(rebalance);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const [leftColumn, centerColumn, rightColumn] = distributedBlocks;

  return (
    <section id="about" className="px-4 py-4 md:px-8 md:py-5">
      {/* INTRODUCTION */}
      <div className="mb-3 border-b border-ink pb-3">
        <p className="w-full text-justify text-[1.0625rem] leading-[1.75] text-ink">
          I am an engineering graduate moving towards digital project and
          product management, with experience in full-stack development and
          generative AI. I enjoy understanding user needs, turning feedback into
          practical ideas and working with others to create useful, intuitive
          digital experiences.
        </p>
      </div>

      {/* NEWSPAPER ARTICLE */}
      <div className="about-layout" ref={layoutRef}>
        {/* LEFT COLUMN */}
        <motion.div
          initial={{
            opacity: 0,
            x: -18,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
          }}
          className="about-column about-column-left"
        >
          <ArticleContent blocks={leftColumn} dropCap />
        </motion.div>

        {/* CENTER COLUMN */}
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
          }}
          className="about-column about-column-center"
        >
          <figure className="about-portrait">
            <img src="/images/portrait.PNG" alt="Supipi Amarajeeva portrait" />

            <figcaption>Paris, France</figcaption>
          </figure>

          <ArticleContent blocks={centerColumn} />
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{
            opacity: 0,
            x: 18,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
          }}
          className="about-column about-column-right"
        >
          <ArticleContent blocks={rightColumn} />
        </motion.div>
      </div>
    </section>
  );
}
