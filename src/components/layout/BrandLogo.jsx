import { useState } from "react";
import { FolderLock } from "lucide-react";

export default function BrandLogo({
  compact = false,
  light = false,
}) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-blue via-brand-green to-brand-orange shadow-lg">
        {!imageFailed ? (
          <img
            src="/assets/logo/afess-logo.png"
            alt="AFESS SecureShare"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain"
          />
        ) : (
          <FolderLock
            size={23}
            className="text-white"
          />
        )}
      </div>

      {!compact && (
        <div className="min-w-0">
          <p
            className={`truncate text-sm font-bold ${
              light ? "text-white" : "text-fg"
            }`}
          >
            AFESS SecureShare
          </p>

          <p
            className={`truncate text-[10px] ${
              light ? "text-white/60" : "text-muted"
            }`}
          >
            Corporate Data Protection
          </p>
        </div>
      )}
    </div>
  );
}