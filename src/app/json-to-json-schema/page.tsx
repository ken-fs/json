import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-to-json-schema");

export default function Page() {
  return (
    <>
      <ToolPage id="json-to-json-schema" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">Quick answers: JSON schema builder</h2>
          <h3 className="mt-4 font-semibold">Is this a JSON schema builder or creator?</h3>
          <p className="mt-1">
            Not a drag-and-drop one. You paste a sample JSON document and the tool writes the
            schema for it. Fields missing from some records are left optional. String lengths and
            number ranges are left open, so edit those by hand afterwards.
          </p>
          <h3 className="mt-4 font-semibold">Can I go the other way?</h3>
          <p className="mt-1">
            Yes. To make a sample JSON object from a schema, use{" "}
            <a className="text-[#1261ff] underline" href="/json-schema-to-json/">
              JSON Schema to JSON
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
