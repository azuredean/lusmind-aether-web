import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
}

const CTAButton = ({ children, href }: CTAButtonProps) => {
  return (
    <a 
      href={href}
      className="group inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 border border-[#2D2D2D]/15 rounded-lg hover:border-[#2D2D2D]/30 hover:bg-white/50 transition-all duration-300 text-[#2D2D2D] text-xs md:text-sm backdrop-blur-sm whitespace-nowrap"
    >
      <span>[ {children} ]</span>
      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};

export default CTAButton;
