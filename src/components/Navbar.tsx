import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 py-4 px-6 md:px-12 flex justify-between items-center bg-white dark:bg-black sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold tracking-tighter">
        PORTFOLIO
      </Link>
      <div className="space-x-6">
        <Link href="/projects" className="text-sm font-medium hover:text-blue-600 transition-colors">
          Projects
        </Link>
        <Link href="/blog" className="text-sm font-medium hover:text-blue-600 transition-colors">
          Blog
        </Link>
        <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
