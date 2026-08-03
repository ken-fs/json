import WikiArticle from "@/components/WikiArticle";
import { CONTENT, META } from "@/lib/wiki/json-to-csv-nested";
import { wikiMetadata } from "@/lib/wikiMeta";

export const metadata = wikiMetadata(META.pt);

export default function Page() {
  return <WikiArticle meta={META.pt} content={CONTENT.pt} />;
}
