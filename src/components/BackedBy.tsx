import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const BackedBy = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle");

  const handleVerify = () => {
    if (verificationCode.trim()) {
      // 模拟验证逻辑
      if (verificationCode.length >= 6) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("error");
      }
    }
  };

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className={`mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-light leading-[1.2] text-foreground">
            Product Verification
          </h2>
        </div>

        {/* Verification Module */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed">
                  Enter your product verification code to confirm authenticity
                </p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="verification-code" className="text-sm font-light text-foreground">Verification Code</Label>
                <Input
                  id="verification-code"
                  type="text"
                  placeholder="Enter product verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <Button 
                onClick={handleVerify}
                className="w-full h-12 text-base font-light"
                disabled={!verificationCode.trim()}
              >
                Verify
              </Button>

              {verificationStatus === "success" && (
                <div className="p-4 rounded-lg border border-accent/50 bg-accent/10 text-center">
                  <p className="text-accent font-light">✓ Verification Successful - Authentic Product</p>
                </div>
              )}

              {verificationStatus === "error" && (
                <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-center">
                  <p className="text-destructive font-light">✗ Verification Failed - Please check your code</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackedBy;
