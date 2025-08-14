import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      toast.success('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section id="subscribe" className="section py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
      <div className="container text-center">
        <h2 className="text-lg font-black text-transparent bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text mb-2">
          SUBSCRIBE FOR MORE UPDATES
        </h2>
        <p className="text-sm text-white/82 mb-5">
          Stay updated with our latest products and exclusive promotions instantly!
        </p>
        
        <form onSubmit={handleSubscribe} className="max-w-3xl mx-auto space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="bg-white/8 border-white/15 text-white placeholder:text-white/60 text-center"
          />
          <Button
            type="submit"
            disabled={isSubscribing}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold"
          >
            {isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </Button>
        </form>
      </div>
    </section>
  );
};