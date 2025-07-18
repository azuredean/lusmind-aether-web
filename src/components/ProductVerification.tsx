import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle, XCircle } from 'lucide-react';

export const ProductVerification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = async () => {
    if (!verificationCode.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification logic
      const isValid = Math.random() > 0.3; // 70% chance of valid code
      
      if (isValid) {
        setVerificationResult({
          type: 'success',
          message: 'Product verified! This is an authentic LusMind product.'
        });
      } else {
        setVerificationResult({
          type: 'error',
          message: 'Product not found. Please check the verification code.'
        });
      }
    } catch (error) {
      setVerificationResult({
        type: 'error',
        message: 'Verification failed. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }

    // Auto-hide result after 3 seconds
    setTimeout(() => {
      setVerificationResult({ type: null, message: '' });
    }, 3000);
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="cyber-title text-3xl md:text-4xl mb-4 neon-text">
            Product Verification
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verify the authenticity of your LusMind products using the unique verification code 
            found on your product packaging.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-panel p-8 rounded-2xl">
            <div className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="verification-code" className="block text-sm font-medium">
                  Enter Verification Code
                </label>
                <div className="flex gap-4">
                  <Input
                    id="verification-code"
                    type="text"
                    placeholder="Enter your product verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="flex-1 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleVerification()}
                  />
                  <Button
                    onClick={handleVerification}
                    disabled={!verificationCode.trim() || isLoading}
                    size="lg"
                    className="bg-gradient-primary text-white glow-hover px-8"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Verification Result */}
              {verificationResult.type && (
                <div
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    verificationResult.type === 'success'
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}
                >
                  <div className="flex items-center">
                    {verificationResult.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 mr-3 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 mr-3 text-red-600" />
                    )}
                    <span className="font-medium">{verificationResult.message}</span>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-medium">How to find your verification code:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Look for the QR code or text code on your product packaging</li>
                  <li>The code is typically 8-12 characters long</li>
                  <li>Each product has a unique verification code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};