import * as React from "react"
import { cn } from "@/lib/utils"

const Modal = ({ open, onClose, children, className }: { open: boolean, onClose: () => void, children: React.ReactNode, className?: string }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className={cn("relative z-50 w-full max-w-5xl rounded-xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto", className)}>
        {children}
      </div>
    </div>
  )
}

export { Modal }
