import type { Metadata } from "next";
import { SystemsPage } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "Systems — Unbound Folk",
  description:
    "Custom software, automation, CRM systems, and AI workflows for businesses that have outgrown spreadsheets and manual processes. Built for Malaysian SMEs.",
  alternates: { canonical: "/systems" },
};

export default function Page() {
  return <SystemsPage />;
}
