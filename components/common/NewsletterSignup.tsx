'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call to your newsletter service
      console.log('Newsletter subscription for:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubscribed(true);
      setEmail('');
      toast({
        title: "Welcome aboard!",
        description: "You've been successfully subscribed to our newsletter.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="text-center p-6 bg-primary/10 rounded-xl border border-primary/20">
        <CheckCircle className="h-12 w-12 text-primary mx-auto mb-3" />
        <h3 className="font-semibold text-lg mb-2">You're all set!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for subscribing. You'll receive our next newsletter soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-background border-border/50 focus:border-primary"
          required
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="btn-hover px-6"
        >
          {isLoading ? (
            "Subscribing..."
          ) : (
            <>
              Subscribe <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Join 1,000+ writers and readers. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}