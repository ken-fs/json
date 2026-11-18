import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-to-yaml");

export default function Page() {
  return (
    <>
      <ToolPage id="json-to-yaml" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">How to convert JSON to YAML</h2>
          <p className="mt-1">
            Paste your JSON into the left box. The YAML appears on the right. Copy it into your
            .yaml file.
          </p>
          <p className="mt-1">
            Strings that look like booleans, numbers or null get quoted. So{" "}
            <code>&quot;true&quot;</code> stays a string when you read the YAML back. Not sure your
            JSON is valid? Run it through the{" "}
            <a className="text-[#1261ff] underline" href="/json-validator/">
              JSON validator
            </a>{" "}
            first. Going back? Use{" "}
            <a className="text-[#1261ff] underline" href="/yaml-to-json/">
              YAML to JSON
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
