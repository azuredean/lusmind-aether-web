import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
}

const CTAButton = ({ children, href }: CTAButtonProps) => {
  return (
    <a 
      href={href}
      className="group inline-flex items-center gap-2 px-6 py-3 border border-[#2D2D2D]/20 rounded-md hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5 transition-all duration-300 text-[#2D2D2D] text-sm"
    >
      <span>[ {children} ]</span>
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
};

export default CTAButton;
