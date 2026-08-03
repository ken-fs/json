import WikiArticle from "@/components/WikiArticle";
import { CONTENT, META } from "@/lib/wiki/json-escaping";
import { wikiMetadata } from "@/lib/wikiMeta";

export const metadata = wikiMetadata(META.en);

export default function Page() {
  return <WikiArticle meta={META.en} content={CONTENT.en} />;
}
