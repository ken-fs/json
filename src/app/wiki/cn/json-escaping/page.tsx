import WikiArticle from "@/components/WikiArticle";
import { CONTENT, META } from "@/lib/wiki/json-escaping";
import { wikiMetadata } from "@/lib/wikiMeta";

export const metadata = wikiMetadata(META.cn);

export default function Page() {
  return <WikiArticle meta={META.cn} content={CONTENT.cn} />;
}
