import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
}

const CTAButton = ({ children, href }: CTAButtonProps) => {
  return (
    <a 
      href={href}
      className="group inline-flex items-center gap-3 px-6 py-3 border border-[#2D2D2D]/15 rounded-lg hover:border-[#2D2D2D]/30 hover:bg-white/50 transition-all duration-300 text-[#2D2D2D] text-sm backdrop-blur-sm"
    >
      <span>[ {children} ]</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
};

export default CTAButton;
