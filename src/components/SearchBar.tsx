import { Search, X, Loader2 } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export const SearchBar = ({ query, onChange, onClear, isLoading }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-8 animate-fade-up">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="text-[var(--color-brand-primary)]" size={20} />
      </div>
      <input
        type="text"
        className="w-full bg-[var(--color-bg-surface)] border border-[var(--color-border-default)] rounded-full py-4 pl-12 pr-12 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] backdrop-blur-md focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20 transition-all outline-none text-lg shadow-lg"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoComplete="off"
      />
      <div className="absolute inset-y-0 right-4 flex items-center">
        {isLoading ? (
          <Loader2 className="animate-spin text-[var(--color-brand-primary)]" size={20} />
        ) : query ? (
          <button
            onClick={onClear}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors p-1 rounded-full hover:bg-[var(--color-bg-subtle)] focus:outline-none"
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        ) : null}
      </div>
    </div>
  );
};
