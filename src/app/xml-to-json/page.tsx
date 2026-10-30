import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("xml-to-json");

export default function Page() {
  return (
    <>
      <ToolPage id="xml-to-json" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">Quick answers: XML to JSON in JavaScript</h2>
          <h3 className="mt-4 font-semibold">How do I convert XML to JSON in JavaScript?</h3>
          <p className="mt-1">
            JavaScript has no built-in XML-to-JSON function. In the browser, parse the XML with{" "}
            <code>DOMParser</code>, then walk the nodes and build an object yourself. In Node.js,
            most people use a library such as fast-xml-parser or xml2js.
          </p>
          <h3 className="mt-4 font-semibold">Is there a faster way?</h3>
          <p className="mt-1">
            Yes. Paste your XML into the tool above and copy the JSON. It&apos;s handy for checking
            what the result should look like before you write code. Attributes become{" "}
            <code>@name</code> keys and mixed text goes under <code>#text</code>. Going the other
            way? Try{" "}
            <a className="text-[#1261ff] underline" href="/json-to-xml/">
              JSON to XML
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
