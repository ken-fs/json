import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-to-csv");

export default function Page() {
  return (
    <>
      <ToolPage id="json-to-csv" />
      <section className="bg-[#f7f7f4] px-6 pb-12 text-[15px] leading-relaxed text-[#141414]">
        <div className="mx-auto max-w-3xl border-t border-[#dedede] pt-6">
          <h2 className="text-lg font-semibold">Quick answers: JSON to CSV</h2>
          <h3 className="mt-4 font-semibold">How do I convert JSON to CSV?</h3>
          <p className="mt-1">
            Paste a JSON array of objects. The tool gives you CSV with one row per object. Keys
            become the header row. It runs in your browser, so nothing is uploaded.
          </p>
          <h3 className="mt-4 font-semibold">What happens to nested objects?</h3>
          <p className="mt-1">
            They become dotted columns, like <code>address.zipCode</code>. Records that miss a field
            still line up under the right header.
          </p>
          <h3 className="mt-4 font-semibold">Can I open the result in Excel?</h3>
          <p className="mt-1">
            Yes. Save the output as a <code>.csv</code> file and open it. Need the reverse? Use the{" "}
            <a className="text-[#1261ff] underline" href="/csv-to-json/">
              CSV to JSON converter
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
