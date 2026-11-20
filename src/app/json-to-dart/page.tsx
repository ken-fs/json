import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-to-dart");

export default function Page() {
  return (
    <>
      <ToolPage id="json-to-dart" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">How to convert JSON to Dart</h2>
          <p className="mt-1">
            Paste a sample of your JSON into the input box. Dart classes with{" "}
            <code>fromJson</code> and <code>toJson</code> appear next to it. Copy them into a
            .dart file in your Flutter project.
          </p>
          <p className="mt-1">
            Every nested object gets its own class. Use a sample with real values, because the
            types come from what you paste. If the JSON won&apos;t convert, check it with the{" "}
            <a className="text-[#1261ff] underline" href="/json-validator/">
              JSON validator
            </a>{" "}
            or fix it with{" "}
            <a className="text-[#1261ff] underline" href="/json-repair/">
              JSON repair
            </a>
            . Need another language? Try{" "}
            <a className="text-[#1261ff] underline" href="/json-to-kotlin/">
              JSON to Kotlin
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
