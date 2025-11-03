import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AgeVerificationProps {
  onVerified: () => void;
}

export const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (!verified) {
      setIsOpen(true);
    } else {
      onVerified();
    }
  }, [onVerified]);

  const handleConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsOpen(false);
    onVerified();
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl border-[#E0E0E0] bg-[#F5F5F5] [&>button]:hidden">
        <div className="text-center space-y-8 p-8 md:p-12">
          {/* Logo Section */}
          <div className="flex justify-center items-center gap-3 animate-fade-in-up">
            <img 
              src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" 
              alt="LM Logo" 
              className="h-10 w-10" 
            />
            <img 
              src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" 
              alt="LUSMIND" 
              className="h-10 w-auto" 
            />
          </div>

          {/* Title Section */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-3xl md:text-4xl font-normal text-[#2D2D2D]">
              Age Verification Required
            </h2>
            <p className="text-base text-[#666666] max-w-md mx-auto leading-relaxed">
              You must be 21 years or older to access this website.<br />
              Please confirm your age to continue.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1 h-14 text-base border-[#2D2D2D]/15 hover:border-[#2D2D2D]/30 hover:bg-white transition-all duration-300 text-[#2D2D2D]"
            >
              Under 21
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 h-14 text-base bg-[#2D2D2D] hover:bg-[#2D2D2D]/90 text-[#F5F5F5] transition-all duration-300"
            >
              I'm 21 or Older
            </Button>
          </div>

          {/* Legal Notice */}
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-xs text-[#666666] leading-relaxed max-w-lg mx-auto">
              By entering this website, you confirm that you are of legal smoking age<br />
              and agree to our Terms of Service and Privacy Policy.
            </p>
            <p className="text-xs text-[#666666] mt-3 font-medium">
              WARNING: This product contains nicotine. Nicotine is an addictive chemical.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};