import type { Metadata } from "next";
import { AboutPage } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Unbound Folk is a creative-tech studio in Malaysia. We built the studio because growing businesses need both strong brand presence and efficient operations — and most vendors only cover one side.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
