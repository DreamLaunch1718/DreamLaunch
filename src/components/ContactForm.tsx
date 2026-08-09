"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border border-navy-900/12 bg-white px-4 py-3.5 text-[15px] text-navy-900 placeholder:text-navy-900/35 outline-none transition-colors focus:border-navy-900/40";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Merci de réessayer ou de nous écrire directement.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-navy-900/10 bg-white p-10 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 text-2xl">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold text-navy-900">
          Message envoyé
        </h3>
        <p className="mt-2 text-sm text-navy-900/60">
          Merci ! Nous répondons dans un maximum de 2 jours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-900">
            Nom *
          </label>
          <input id="name" name="name" required className={fieldClass} placeholder="Votre nom" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-900">
            Numéro de téléphone
          </label>
          <input id="phone" name="phone" className={fieldClass} placeholder="Optionnel" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-900">
            E-mail *
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} placeholder="vous@exemple.com" />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-navy-900">
            Société
          </label>
          <input id="company" name="company" className={fieldClass} placeholder="Optionnel" />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-navy-900">
          Sujet *
        </label>
        <input id="subject" name="subject" required className={fieldClass} placeholder="En quoi pouvons-nous vous aider ?" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-900">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-none`}
          placeholder="Parlez-nous de votre projet..."
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center rounded-full bg-navy-900 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
