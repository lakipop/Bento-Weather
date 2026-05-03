export const WeatherSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-pulse text-[var(--color-bg-subtle)]">
      
      {/* Search Bar Skeleton */}
      <div className="h-16 w-full max-w-xl mx-auto bg-[var(--color-bg-surface)] rounded-full border border-[var(--color-border-default)]"></div>

      {/* Current Weather Card Skeleton */}
      <div className="bg-[var(--color-bg-surface)] rounded-[2rem] p-8 md:p-12 min-h-[300px] border border-[var(--color-border-default)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
          <div className="space-y-4 w-full flex-1">
            <div className="h-10 w-3/4 md:w-1/2 bg-[var(--color-bg-elevated)] rounded-md mx-auto md:mx-0"></div>
            <div className="h-6 w-1/3 bg-[var(--color-bg-elevated)] rounded-md mx-auto md:mx-0"></div>
            <div className="h-20 w-32 bg-[var(--color-bg-elevated)] rounded-md mt-6 mx-auto md:mx-0"></div>
          </div>
          <div className="w-40 h-40 rounded-full bg-[var(--color-bg-elevated)] flex-shrink-0"></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 bg-[var(--color-bg-elevated)]/50 rounded-2xl h-24"></div>
      </div>

      {/* Forecast Area Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-40 bg-[var(--color-bg-surface)] rounded-md"></div>
        <div className="flex gap-4 overflow-hidden">
          {[1,2,3,4,5].map((i) => (
             <div key={i} className="flex-none w-32 h-40 bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border-default)]"></div>
          ))}
        </div>
      </div>

    </div>
  );
};
