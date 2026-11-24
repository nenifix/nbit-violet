import { useState } from 'react';
import { Cpu } from 'lucide-react';

interface HardwareImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
}

export function HardwareImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
}: HardwareImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#090b13] ${aspectClassName} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#131625] via-[#0b0d17] to-[#1e1535] p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#a78bfa]">
            <Cpu className="h-6 w-6" />
          </div>
          <p className="max-w-[200px] text-xs font-medium text-[#958da1]">{alt}</p>
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0d17]/55 via-transparent to-white/[0.03]"
      />
    </div>
  );
}
