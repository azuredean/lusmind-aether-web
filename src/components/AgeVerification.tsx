import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AgeVerificationProps {
  onVerified: () => void;
  onReject: () => void;
}

export const AgeVerification = ({ onVerified, onReject }: AgeVerificationProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4" style={{ isolation: 'isolate' }}>
      <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center relative">
        <button 
          onClick={onReject}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="cyber-title text-2xl mb-4 neon-text">Age Verification</h2>
          <p className="text-muted-foreground leading-relaxed">
            This website contains information about electronic cigarette products and is intended for adults only.
          </p>
          <p className="text-muted-foreground mt-4 font-medium">
            Are you 21 years of age or older?
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onVerified}
            size="lg"
            className="w-full bg-gradient-primary text-white glow-hover cyber-title"
          >
            Yes, I am 21 or older
          </Button>
          
          <Button
            onClick={onReject}
            variant="outline"
            size="lg"
            className="w-full border-muted-foreground/30 hover:bg-muted/20"
          >
            No, I am under 21
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
          By entering this website, you certify that you are of legal smoking age in your jurisdiction and you agree to be Age Verified.
        </p>
      </div>
    </div>
  );
};