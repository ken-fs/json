"use client";

import { useTranslation } from "react-i18next";
import { getIntro, type IntroBullet, type IntroQuestion } from "@/lib/intros";
import { withInlineCode } from "@/components/inlineCode";

interface ToolIntroProps {
  /** Tool id, or `jsonFormatter` for the homepage. */
  id: string;
}

/**
 * Explanatory copy below the workspace.
 *
 * The tool pages were almost entirely UI before this, which left nothing for a
 * search engine to read and no help for a first-time visitor. Rendered as real
 * prose in the static export rather than loaded on demand, so it is present in
 * the crawled HTML.
 */
export default function ToolIntro({ id }: ToolIntroProps) {
  const { t } = useTranslation();
  const intro = getIntro(id);
  if (!intro) return null;

  const key = `intros.${id}`;
  const bullets: IntroBullet[] = intro.bullets ?? [];
  const after: string[] = intro.paragraphsAfterBullets ?? [];
  const questions: IntroQuestion[] = intro.questions;

  return (
    <section className="mt-8 border-t border-[#dedede] pt-8" aria-labelledby={`intro-${id}`}>
      <h2
        id={`intro-${id}`}
        className="mb-4 text-xl font-black tracking-[-0.03em] text-[#111]"
      >
        {t("aboutThisTool", { defaultValue: "About this tool" })}
      </h2>

      <div className="max-w-3xl">
        {intro.paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-3.5 text-sm leading-7 text-[#4c5057]">
            {withInlineCode(
              t(`${key}.paragraphs.${index}`, { defaultValue: paragraph })
            )}
          </p>
        ))}

        {bullets.length > 0 ? (
          <ul className="mb-4 mt-1 space-y-2">
            {bullets.map((bullet, index) => (
              <li key={bullet.code} className="flex gap-3 text-sm leading-7 text-[#4c5057]">
                <code className="shrink-0 rounded bg-[#f2f2ed] px-1.5 font-mono text-[13px] font-semibold text-[#1261ff]">
                  {bullet.code}
                </code>
                <span>
                  {t(`${key}.bullets.${index}.text`, { defaultValue: bullet.text })}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        {after.map((paragraph, index) => (
          <p key={index} className="mb-3.5 text-sm leading-7 text-[#4c5057]">
            {withInlineCode(
              t(`${key}.paragraphsAfterBullets.${index}`, { defaultValue: paragraph })
            )}
          </p>
        ))}

        <dl className="mt-6 space-y-5">
          {questions.map((question, index) => (
            <div key={index}>
              <dt className="mb-1 text-sm font-bold text-[#141414]">
                {withInlineCode(t(`${key}.questions.${index}.q`, { defaultValue: question.q }))}
              </dt>
              <dd className="text-sm leading-7 text-[#4c5057]">
                {withInlineCode(t(`${key}.questions.${index}.a`, { defaultValue: question.a }))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
