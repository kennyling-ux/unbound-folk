import type { Metadata } from "next";
import { ContactPage } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "Contact and Book a Discovery Call",
  description:
    "Book a discovery call with Unbound Folk. Tell us what's not working — your brand, your content, your internal systems — and we'll talk through how we can help.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
