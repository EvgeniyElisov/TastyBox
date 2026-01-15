type Props = {
  href: string;
  children: React.ReactNode;
};

export const EmailButton = ({ href, children }: Props) => {
  return (
    <div className="text-center mb-8">
      <a
        href={href}
        className="inline-block bg-[#ff6b35] text-white no-underline px-10 py-4 rounded-lg text-base font-semibold shadow-[0_4px_6px_rgba(255,107,53,0.3)] transition-all duration-200"
      >
        {children}
      </a>
    </div>
  );
};
