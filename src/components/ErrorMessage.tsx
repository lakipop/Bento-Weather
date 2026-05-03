import { AlertTriangle, MapPinOff, ShieldAlert } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  let Icon = AlertTriangle;
  let title = "Error";
  let colorClass = "text-[var(--color-danger)]";
  let bgClass = "bg-[var(--color-danger-bg)] border-[var(--color-danger)]/20";
  
  if (message.includes('City not found') || message.includes('spelling')) {
    Icon = MapPinOff;
    title = "City Not Found";
    colorClass = "text-[var(--color-warning)]";
    bgClass = "bg-[var(--color-warning-bg)] border-[var(--color-warning)]/20";
  } else if (message.includes('API Key')) {
    Icon = ShieldAlert;
    title = "Authentication Error";
    colorClass = "text-[#ff6b6b]";
  }

  return (
    <div className={`mt-8 flex flex-col items-center justify-center p-8 rounded-2xl border backdrop-blur-md animate-fade-up text-center max-w-lg mx-auto ${bgClass}`}>
      <Icon className={`mb-4 ${colorClass}`} size={48} />
      <h3 className={`text-lg font-bold mb-2 ${colorClass}`}>{title}</h3>
      <p className="text-[var(--color-text-secondary)] font-medium">
        {message}
      </p>
    </div>
  );
};
