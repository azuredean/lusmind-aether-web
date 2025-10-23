import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
}

const CTAButton = ({ children, href }: CTAButtonProps) => {
  return (
    <Button 
      variant="ghost" 
      className="group border border-[#2D2D2D]/20 hover:border-[#2D2D2D]/40 hover:bg-[#2D2D2D]/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 text-[#2D2D2D]" 
      asChild
    >
      <a href={href} className="flex items-center gap-2">
        <span className="text-sm">[ {children} ]</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </a>
    </Button>
  );
};

export default CTAButton;
