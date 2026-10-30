import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-to-table");

export default function Page() {
  return (
    <>
      <ToolPage id="json-to-table" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">Quick answers: JSON to table</h2>
          <h3 className="mt-4 font-semibold">How do I convert JSON to a table?</h3>
          <p className="mt-1">
            Paste the JSON into the input box and the table appears. It works best with an array of
            objects, like a list of users. For rows and columns in a spreadsheet file, use the{" "}
            <a className="text-[#1261ff] underline" href="/json-to-csv/">
              JSON to CSV converter
            </a>
            .
          </p>
          <h3 className="mt-4 font-semibold">How do I turn JSON into a table?</h3>
          <p className="mt-1">
            Paste your JSON array into the box. The tool builds an HTML table right away. Each key
            becomes a column header and each object becomes a row.
          </p>
          <h3 className="mt-4 font-semibold">Can I use it as a table viewer or formatter?</h3>
          <p className="mt-1">
            Yes. Nested objects show as dotted columns like <code>address.zipCode</code>. Records
            with missing fields still line up under the right headers. For a file to send around,
            use the{" "}
            <a className="text-[#1261ff] underline" href="/json-to-csv/">
              JSON to CSV converter
            </a>
            .
          </p>
          <h3 className="mt-4 font-semibold">How do I get the table into Excel?</h3>
          <p className="mt-1">
            Copy the output, open it in a browser, select the table and paste it into Excel. Or
            make a CSV with the{" "}
            <a className="text-[#1261ff] underline" href="/json-to-csv/">
              JSON to CSV tool
            </a>{" "}
            and open that file in Excel.
          </p>
        </div>
      </section>
    </>
  );
}
