"use client"

/**
 * Page loading state: 1er system logo centered on dark background.
 */
export function LoadingLogoVideo() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0d]"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <img
        src="/images/final_logo/Logo%20(2).svg"
        alt=""
        className="h-20 w-auto object-contain opacity-90"
      />
    </div>
  )
}
