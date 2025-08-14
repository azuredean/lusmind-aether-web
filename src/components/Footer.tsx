import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
const footerLinks = [{
  name: 'Home',
  href: '/'
}, {
  name: 'Wholesale',
  href: '/wholesale'
}, {
  name: 'About Us',
  href: '/about'
}, {
  name: 'Verify Product',
  href: '#verification'
}, {
  name: 'Contact Us',
  href: '/contact'
}, {
  name: 'Online Reviews',
  href: '/reviews'
}];
export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsSubscribing(true);

    // Simulate subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };
  return <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">{/* 这里将内容居中并适应页面宽度 */}
          {/* Navigation Links */}
          

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <div>
              <h3 className="cyber-title text-xl mb-2 neon-text text-center">
                SUBSCRIBE FOR MORE UPDATES
              </h3>
              <p className="text-sm text-white/80 text-center">
                Stay updated with our latest products and exclusive promotions instantly!
              </p>
            </div>
            
            <div className="space-y-3">
              <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} className="bg-white/10 border-white/20 text-white placeholder:text-white/60" onKeyPress={e => e.key === 'Enter' && handleSubscribe()} />
              <Button onClick={handleSubscribe} disabled={isSubscribing} className="w-full bg-gradient-primary text-white glow-hover cyber-title">
                {isSubscribing ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
              </Button>
            </div>
          </div>
        </div>

        {/* Warning Text */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-sm leading-relaxed text-white/80 max-w-4xl mx-auto">
            <strong>WARNING:</strong> This product contains chemicals, including nicotine, which is known to the State of California to cause cancer and reproductive harm. For more information, visit{' '}
            <a href="https://p65warnings.ca.gov" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              p65warnings.ca.gov
            </a>
            . This product is not intended for sale or use by individuals under 21 years of age. Nicotine is an addictive chemical.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-white/60">
            © 2024 LusMind. All rights reserved. | Digital Vapor Technology
          </p>
        </div>
      </div>
    </footer>;
};