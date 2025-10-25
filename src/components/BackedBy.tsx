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
          <h2 className="text-4xl md:text-6xl font-light leading-[1.2]">
            产品防伪验证
          </h2>
        </div>

        {/* Verification Module */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <p className="text-lg md:text-xl font-light text-muted-foreground">
                  输入产品防伪码验证真伪
                </p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="verification-code" className="text-base">防伪码</Label>
                <Input
                  id="verification-code"
                  type="text"
                  placeholder="请输入产品防伪码"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <Button 
                onClick={handleVerify}
                className="w-full h-12 text-base"
                disabled={!verificationCode.trim()}
              >
                验证
              </Button>

              {verificationStatus === "success" && (
                <div className="p-4 rounded-lg border border-accent/50 bg-accent/10 text-center">
                  <p className="text-accent font-light">✓ 验证成功 - 产品为正品</p>
                </div>
              )}

              {verificationStatus === "error" && (
                <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10 text-center">
                  <p className="text-destructive font-light">✗ 验证失败 - 请检查防伪码</p>
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
