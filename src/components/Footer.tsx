export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8">
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Dream&Launch. Tous droits réservés.
          </p>
          <p className="text-xs text-white/40">Rêver & Lancer.</p>
        </div>
      </div>
    </footer>
  );
}
