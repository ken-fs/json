import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-schema-to-json");

export default function Page() {
  return (
    <>
      <ToolPage id="json-schema-to-json" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">Quick answers: JSON example from a schema</h2>
          <h3 className="mt-4 font-semibold">How do I get an example JSON from a schema?</h3>
          <p className="mt-1">
            Paste the schema above. The tool writes one valid JSON document from it. It uses your{" "}
            <code>const</code>, <code>enum</code>, <code>default</code> or <code>examples</code>{" "}
            values when they exist. Otherwise it fills in plain placeholders.
          </p>
          <h3 className="mt-4 font-semibold">I have JSON and need the schema.</h3>
          <p className="mt-1">
            Use{" "}
            <a className="text-[#1261ff] underline" href="/json-to-json-schema/">
              JSON to JSON Schema
            </a>{" "}
            to build a schema from a sample.
          </p>
        </div>
      </section>
    </>
  );
}
