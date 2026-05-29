import type { FeedbackState } from '../../types/checkout.types';

interface FeedbackAlertProps {
  feedback: FeedbackState;
}

export function FeedbackAlert({ feedback }: FeedbackAlertProps) {
  const baseStyles = "p-4 mb-8 rounded-md font-medium text-center";
  const typeStyles = feedback.type === 'success' 
    ? "bg-green-100 text-green-700" 
    : "bg-red-100 text-red-700";

  return (
    <div data-testid="feedback-alert" className={`${baseStyles} ${typeStyles}`}>
      {feedback.message}
    </div>
  );
}
