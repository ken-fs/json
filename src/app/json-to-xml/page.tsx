import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-to-xml");

export default function Page() {
  return (
    <>
      <ToolPage id="json-to-xml" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">Quick answers: JSON to XML</h2>
          <h3 className="mt-4 font-semibold">How do I format JSON as XML?</h3>
          <p className="mt-1">
            Paste your JSON and the tool gives you indented XML. Every key becomes a child element.
            Nothing is written as an attribute.
          </p>
          <h3 className="mt-4 font-semibold">What happens to arrays and null?</h3>
          <p className="mt-1">
            An array repeats the parent tag once per item. A null becomes an empty element with{" "}
            <code>xsi:nil</code>. A top-level array is wrapped so the document has one root.
          </p>
          <h3 className="mt-4 font-semibold">What if a key is not a valid XML name?</h3>
          <p className="mt-1">
            Spaces become underscores, and a leading digit gets an underscore in front. Going the
            other way? Use the{" "}
            <a className="text-[#1261ff] underline" href="/xml-to-json/">
              XML to JSON converter
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
