function NavItem({
  label,
  href = '#',
  links,
  columns,
  images,
}: {
  label: string;
  href?: string;
  links?: { label: string; href: string }[];
  columns?: {
    title?: string;
    links: { label: string; href: string }[];
  }[];
  images?: {
    src: string;
    label: string;
    href: string;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
    >
      {/* MAIN NAV LINK */}
      <Link
        href={href}
        onClick={closeDropdown}
        className={`text-gray-900 hover:text-gray-500 transition-colors h-full flex items-center gap-1 ${
          isOpen ? 'text-gray-500' : ''
        }`}
      >
        {label}
      </Link>

      {/* DROPDOWN */}
      {(links || columns) && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={`
            absolute
            top-[64px]
            left-0
            w-full
            bg-white
            border-t
            border-gray-100
            shadow-xl
            transition-all
            duration-200
            z-50
            ${
              isOpen
                ? 'opacity-100 visible pointer-events-auto'
                : 'opacity-0 invisible pointer-events-none'
            }
          `}
        >
          <div className="max-w-[1600px] mx-auto px-8 py-10 flex">

            {/* STANDARD LINKS */}
            {links && !columns && (
              <div className="w-[400px] flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeDropdown}
                    className="text-sm font-medium tracking-wide text-gray-900 hover:text-gray-500 transition-colors uppercase"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* MULTIPLE COLUMNS */}
            {columns && (
              <div className="flex gap-16">
                {columns.map((col, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-4 w-[250px]"
                  >
                    {col.title && (
                      <h4 className="text-xs text-gray-500 font-semibold tracking-widest uppercase mb-1">
                        {col.title}
                      </h4>
                    )}

                    {col.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={closeDropdown}
                        className="text-sm font-medium tracking-wide text-gray-900 hover:text-gray-500 transition-colors uppercase"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* IMAGES */}
            {images && (
              <div className="flex-1 flex gap-6 justify-end">
                {images.map((img, i) => (
                  <Link
                    href={img.href}
                    key={i}
                    onClick={closeDropdown}
                    className="relative w-[300px] aspect-[3/4] group/img overflow-hidden cursor-pointer block"
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-white text-xs font-semibold uppercase tracking-wider">
                        {img.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
