import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const ProductVerificationSection = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code.trim().length < 8) {
      toast.error('Please enter at least 8 characters.');
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Product verified successfully!');
      setCode('');
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section id="verify" className="section py-20">
      <div className="container">
        <div className="relative p-px rounded-2xl bg-gradient-to-br from-purple-500/60 via-violet-500/60 to-cyan-500/60">
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-7">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text mb-2">
                  Product Verification
                </h2>
                <p className="text-white/75 max-w-2xl">
                  Verify authenticity using the unique code on your packaging.
                </p>
              </div>
              
              <form onSubmit={handleVerify} className="flex gap-3 w-full max-w-lg">
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter verification code"
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/60"
                />
                <Button
                  type="submit"
                  disabled={isVerifying}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold whitespace-nowrap"
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </Button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/6 border border-white/10 rounded-xl p-3 text-sm text-white/70">
                Find QR/text code on package
              </div>
              <div className="bg-white/6 border border-white/10 rounded-xl p-3 text-sm text-white/70">
                Code length: 8–12 chars
              </div>
              <div className="bg-white/6 border border-white/10 rounded-xl p-3 text-sm text-white/70">
                Each product has a unique code
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};