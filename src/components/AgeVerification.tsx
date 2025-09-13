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
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <div className="text-center space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Age Verification</h2>
            <p className="text-muted-foreground">
              You must be 21 years or older to access this website
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1"
            >
              Under 21
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1"
            >
              21 or Older
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            By clicking continue, you confirm that you are 21 years or older and agree to access this website
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};