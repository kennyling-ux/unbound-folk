import type { Metadata } from "next";
import { WorkPage } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "Work — Unbound Folk",
  description:
    "Projects we're proud of — creative, systems, and AI work built around real problems that real businesses needed solved.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  return <WorkPage />;
}
