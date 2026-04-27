const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 px-6 md:px-12 text-center text-sm text-zinc-500">
      <p>&copy; {new Date().getFullYear()} My Portfolio. Built with Next.js and Firestore.</p>
    </footer>
  );
};

export default Footer;
