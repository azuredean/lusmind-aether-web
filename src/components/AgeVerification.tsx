import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AgeVerificationProps {
  onVerified: () => void;
}

export const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerified }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (!verified) {
      setIsOpen(true);
    } else {
      onVerified();
    }
  }, [onVerified]);

  const handleVerification = () => {
    if (!birthYear || !birthMonth || !birthDay) {
      setError('请输入完整的出生日期');
      return;
    }

    const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    let actualAge = age;
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      actualAge--;
    }

    if (actualAge >= 21) {
      localStorage.setItem('ageVerified', 'true');
      setIsOpen(false);
      onVerified();
    } else {
      setError('抱歉，您必须年满21岁才能访问此网站');
    }
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <div className="text-center space-y-6 p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">年龄验证</h2>
            <p className="text-muted-foreground">
              本网站仅供21岁及以上成年人访问
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-left space-y-2">
              <Label htmlFor="birth-date" className="text-sm font-medium">
                请输入您的出生日期
              </Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    id="birth-year"
                    type="number"
                    placeholder="年份"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div className="flex-1">
                  <Input
                    id="birth-month"
                    type="number"
                    placeholder="月"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                    min="1"
                    max="12"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    id="birth-day"
                    type="number"
                    placeholder="日"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                    min="1"
                    max="31"
                  />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1"
            >
              我未满21岁
            </Button>
            <Button
              onClick={handleVerification}
              className="flex-1"
            >
              我已满21岁
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            点击继续即表示您确认已年满21岁，并同意访问本网站
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};