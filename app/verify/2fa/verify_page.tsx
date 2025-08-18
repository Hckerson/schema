"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function VeryfiPage() {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleResendOtp = async () => {
    try {
      setTimeLeft(30);
      // Add your resend OTP logic here
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      // Add your OTP verification logic here
      // On success:
      toast.success("OTP verified successfully");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Enter Verification Code</CardTitle>
          <CardDescription>
            We sent a verification code to {email ? email : "your email"}. Enter it below to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  if (value.length <= 6) {
                    setOtp(value);
                  }
                }}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
              <p className="text-sm text-muted-foreground text-center">
                Enter the 6-digit code we sent to your email
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={otp.length !== 6 || isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                {"Didn't receive the code?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={handleResendOtp}
                disabled={timeLeft > 0}
                className="text-primary"
              >
                {timeLeft > 0
                  ? `Resend code in ${timeLeft}s`
                  : "Resend verification code"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}