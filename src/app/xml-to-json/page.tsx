import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("xml-to-json");

export default function Page() {
  return (
    <>
      <ToolPage id="xml-to-json" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">Convert an XML file to JSON</h2>
          <p className="mt-1">
            Open the .xml file in any text editor, copy everything, and paste it into the box
            above. The JSON shows up right away. Copy it into a new .json file. The conversion runs
            in your browser, so the XML isn&apos;t sent anywhere.
          </p>
          <p className="mt-1">
            Check numbers like postcodes after converting. XML has no types, so{" "}
            <code>02134</code> can come out as the number 2134. To check the result, use the{" "}
            <a className="text-[#1261ff] underline" href="/json-validator/">
              JSON validator
            </a>
            .
          </p>
          <h2 className="mt-6 text-lg font-semibold">Quick answers: XML to JSON in JavaScript</h2>
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
