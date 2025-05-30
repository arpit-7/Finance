import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Categories",
      links: [
        { name: "Finance Terms", href: "/finance-terms" },
        { name: "Market Analysis", href: "/market-analysis" },
        { name: "Learning Journey", href: "/learning-journey" },
        { name: "Beginner Guides", href: "/beginner-guides" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Finance Glossary", href: "/glossary" },
        { name: "Market Data", href: "/market-data" },
        { name: "Recommended Books", href: "/books" },
        { name: "Useful Tools", href: "/tools" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "About Me", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "LinkedIn", href: "#", external: true },
        { name: "Twitter", href: "#", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-blue-400">The Investor's Notebook</h4>
            <p className="text-gray-300 text-sm">
              Demystifying finance through learning and sharing. Join my journey from beginner to informed investor.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="font-semibold mb-4">{section.title}</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} The Investor's Notebook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
