import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  } catch (error) {
    return dateString; // Return the original string if parsing fails
  }
}

// Function to calculate future value with compound interest
export function calculateCompoundInterest(
  principal: number,
  rate: number,
  time: number,
  contribution: number = 0,
  frequency: 'monthly' | 'quarterly' | 'annually' = 'annually'
): number {
  const r = rate / 100;
  let futureValue = principal;
  
  let contributionMultiplier = 12; // Default for monthly
  if (frequency === 'quarterly') contributionMultiplier = 4;
  if (frequency === 'annually') contributionMultiplier = 1;
  
  const totalContribution = contribution * contributionMultiplier;
  
  for (let i = 0; i < time; i++) {
    futureValue = futureValue * (1 + r) + totalContribution;
  }
  
  return Math.round(futureValue * 100) / 100;
}

// Function to calculate mortgage payment
export function calculateMortgagePayment(
  principal: number,
  rate: number,
  term: number
): number {
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = term * 12;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                  (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(payment * 100) / 100;
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}