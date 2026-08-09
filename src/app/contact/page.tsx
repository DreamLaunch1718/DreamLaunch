import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.subtitle,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        kicker="Parlons-en"
        title={contact.title}
        subtitle={contact.subtitle}
      />

      <section className="bg-paper py-14 lg:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
