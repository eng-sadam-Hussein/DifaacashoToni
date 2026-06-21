import { FolderLock } from "lucide-react";

export default function BrandLogo({
  compact = false,
  light = false,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-security to-accent text-white shadow-sm">
        <FolderLock size={21} strokeWidth={2.2} />
      </div>

      {!compact && (
        <div className="min-w-0">
          <div
            className={`truncate text-sm font-bold ${
              light ? "text-white" : "text-heading"
            }`}
          >
            AFESS SecureShare
          </div>

          <div
            className={`truncate text-[10px] ${
              light ? "text-white/60" : "text-muted"
            }`}
          >
            Corporate Data Protection
          </div>
        </div>
      )}
    </div>
  );
}