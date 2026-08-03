import ToolPage, { toolMetadata } from "@/components/ToolPage";

export const metadata = toolMetadata("json-to-yaml");

export default function Page() {
  return <ToolPage id="json-to-yaml" />;
}
