import { useMemo } from "react";
import { motion } from "framer-motion";

type ArticleBlock = {
  type: "paragraph" | "quote";
  text: string;
};

const articleBlocks: ArticleBlock[] = [
  {
    type: "paragraph",
    text: "My life took a 180-degree turn when my dad told me that he was willing to support my dream of studying in France. It is a story I will probably always tell with the proudest smile on my face.",
  },
  {
    type: "paragraph",
    text: "I was 18 when I moved to France to pursue my engineering degree. A new language, a new culture, new friends, and almost everything around me was unfamiliar for a girl coming from a small island on the other side of the world.",
  },
  {
    type: "paragraph",
    text: "When I stepped into Grande École, I made one promise to myself: say yes to the opportunities that come my way, even when they scare me a little, and make my parents proud along the way.",
  },
  {
    type: "quote",
    text: "“You don’t have to see the whole staircase, just take the first step.”",
  },
  {
    type: "paragraph",
    text: "And I think that describes those years quite well. The journey was not always easy, but I learned that with enough curiosity, courage and motivation, you can wake up every day a little closer to the person you want to become.",
  },
  {
    type: "paragraph",
    text: "There were only four girls in my class. Turn your head in almost any direction and you would spot a guy. But somewhere between programming assignments, group projects, deadlines and many hours spent figuring out why something that should work absolutely refused to work, I found the field where I belonged.",
  },
  {
    type: "paragraph",
    text: "My first experience of professional life, however, looked very different from writing code. During my first year, I had the opportunity to gain industrial experience at La Poste, working as a production agent sorting arriving and departing parcels. The work was physically demanding, but it taught me something I still carry into every team I join: good work is rarely an individual effort.",
  },
  {
    type: "paragraph",
    text: "What I remember most is the team spirit. Even during exhausting shifts, people found ways to make the work enjoyable. They also gave me one of the biggest pushes I needed at the time: speaking French. I wasn’t confident in my communication skills yet, but there was no hiding behind English. I had to speak, make mistakes, laugh about them, and try again.",
  },
  {
    type: "paragraph",
    text: "A year later, the journey took me somewhere new again: Berlin, Germany. I joined Art & Science Node, a Berlin-based organisation, as a programming intern. It became one of those experiences that changes the way you look at your own profession. True to its name, the environment brought together art, science and technology.",
  },
  {
    type: "paragraph",
    text: "Suddenly, I wasn’t learning only from engineers. I was exchanging ideas with artists, scientists, designers and people who approached problems completely differently from the way I had been taught in engineering school. And I loved it.",
  },
  {
    type: "paragraph",
    text: "It made me realise that technology becomes much more interesting when it doesn’t exist in isolation. Code can be functional, but it can also communicate, create experiences, tell stories and bring ideas from completely different disciplines together.",
  },
  {
    type: "quote",
    text: "“Good work is rarely an individual effort.”",
  },
  {
    type: "paragraph",
    text: "That idea followed me into my final internship, where I moved deeper into full-stack development and generative AI. I worked on real products using React, TypeScript, Node.js and PostgreSQL, while experimenting with RAG systems and AI-powered experiences. This time, I wasn’t simply asking myself, “Can I build this?” I started asking, “Who am I building this for, and how can I make their experience better?”",
  },
  {
    type: "paragraph",
    text: "That small change in question shaped the kind of engineer I want to become. Today, I am an engineering graduate who still likes being somewhere between technology, design and creativity. I enjoy building interfaces as much as thinking about the systems behind them. I love experimenting with AI, but I care just as much about whether the final product feels intuitive, useful and human.",
  },
  {
    type: "paragraph",
    text: "And after moving countries, learning languages, working in completely different environments and saying yes to opportunities I once would have been terrified to take, there is one thing I have become quite comfortable with: not knowing exactly what comes next. Because so far, the unfamiliar places have been where I have learned the most.",
  },
];

function estimateBlockHeight(block: ArticleBlock, columnWidthFactor: number) {
  /*
   * Rough approximation of how many characters fit on a line.
   * Wider center column gets a larger factor, which means fewer lines.
   */
  const baseCharsPerLine = 52 * columnWidthFactor;

  const estimatedLines = Math.ceil(block.text.length / baseCharsPerLine);

  /*
   * Quotes usually take up more visual space because they tend
   * to have larger type and more spacing.
   */
  const lineHeight = block.type === "quote" ? 1.65 : 1.75;

  const spacing = block.type === "quote" ? 2.6 : 1.4;

  return estimatedLines * lineHeight + spacing;
}

function distributeBalancedColumns(
  blocks: ArticleBlock[],
): [ArticleBlock[], ArticleBlock[], ArticleBlock[]] {
  /*
   * Relative column widths:
   *
   * left   = 1
   * center = 1.5
   * right  = 1
   */
  const widthFactors = [1, 1.5, 1];

  /*
   * The portrait occupies vertical space in the center column.
   * Increase this if the center column ends lower than the others.
   * Decrease it if the center column ends higher.
   */
  const portraitHeightPenalty = 17;

  const leftHeights = blocks.map((block) =>
    estimateBlockHeight(block, widthFactors[0]),
  );

  const centerHeights = blocks.map((block) =>
    estimateBlockHeight(block, widthFactors[1]),
  );

  const rightHeights = blocks.map((block) =>
    estimateBlockHeight(block, widthFactors[2]),
  );

  /*
   * Try every possible sequential split:
   *
   * [ 0 ... leftEnd ]
   * [ leftEnd ... centerEnd ]
   * [ centerEnd ... end ]
   *
   * and choose the split where all three final visual heights
   * are closest together.
   */
  let bestLeftEnd = 1;
  let bestCenterEnd = 2;
  let bestScore = Number.POSITIVE_INFINITY;

  for (let leftEnd = 1; leftEnd < blocks.length - 1; leftEnd += 1) {
    for (
      let centerEnd = leftEnd + 1;
      centerEnd < blocks.length;
      centerEnd += 1
    ) {
      const leftHeight = leftHeights
        .slice(0, leftEnd)
        .reduce((sum, value) => sum + value, 0);

      const centerHeight =
        centerHeights
          .slice(leftEnd, centerEnd)
          .reduce((sum, value) => sum + value, 0) + portraitHeightPenalty;

      const rightHeight = rightHeights
        .slice(centerEnd)
        .reduce((sum, value) => sum + value, 0);

      const maxHeight = Math.max(leftHeight, centerHeight, rightHeight);

      const minHeight = Math.min(leftHeight, centerHeight, rightHeight);

      /*
       * Lower score = more even column endings.
       */
      const score = maxHeight - minHeight;

      if (score < bestScore) {
        bestScore = score;
        bestLeftEnd = leftEnd;
        bestCenterEnd = centerEnd;
      }
    }
  }

  const leftColumn = blocks.slice(0, bestLeftEnd);
  const centerColumn = blocks.slice(bestLeftEnd, bestCenterEnd);
  const rightColumn = blocks.slice(bestCenterEnd);

  return [leftColumn, centerColumn, rightColumn];
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
  const distributedBlocks = useMemo(
    () => distributeBalancedColumns(articleBlocks),
    [],
  );

  const [leftColumn, centerColumn, rightColumn] = distributedBlocks;

  return (
    <section id="about" className="px-4 py-4 md:px-8 md:py-5">
      {/* INTRODUCTION */}
      <div className="mb-3 border-b border-ink pb-3">
        <p className="w-full text-justify text-[1.0625rem] leading-[1.75] text-ink">
          I am an engineering graduate interested in building thoughtful digital
          products at the intersection of software, design and emerging
          technology. My work spans full-stack development, interactive
          experiences and generative AI, with a growing interest in creating
          technology that feels useful, intuitive and human.
        </p>
      </div>

      {/* NEWSPAPER ARTICLE */}
      <div className="about-layout">
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
