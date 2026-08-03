import { useState } from "react";
import { toast } from "sonner";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks — you're on the list.");
    setEmail("");
  };

  return (
    <section className="relative bg-ink text-cream">
      <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-cream/25" />
      <div className="container mx-auto px-6 py-24 text-center md:px-16 md:py-32">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
          Stay Close
        </span>
        <h2 className="mx-auto mt-6 max-w-2xl font-display uppercase text-4xl leading-[0.95] md:text-6xl">
          New flavors,
          <br />
          first.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            className="w-full border border-cream/30 bg-transparent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream placeholder:text-cream/40 focus:border-cream focus:outline-none"
          />
          <button
            type="submit"
            className="bg-cream px-8 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-85"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterCTA;
