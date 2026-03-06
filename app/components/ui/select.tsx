"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectContextValue {
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

function useSelect() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

export const Select = ({ 
  value, 
  onValueChange, 
  children 
}: { 
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode 
}) => {
  const [open, setOpen] = React.useState(false)

  // Allow clicking outside to close
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div ref={ref} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export const SelectTrigger = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) => {
  const { open, setOpen } = useSelect()
  
  return (
    <div 
      className={cn("cursor-pointer", className)}
      onClick={() => setOpen(!open)}
    >
      {children}
    </div>
  )
}

export const SelectValue = ({ placeholder, children }: { placeholder?: string, children?: React.ReactNode }) => {
  const { value } = useSelect()
  return <span>{children || value || placeholder}</span>
}

export const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSelect()
  
  if (!open) return null
  
  return (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95">
      {children}
    </div>
  )
}

export const SelectItem = ({ 
  value, 
  children 
}: { 
  value: string
  children: React.ReactNode 
}) => {
  const { value: selectedValue, onValueChange, setOpen } = useSelect()
  const isSelected = value === selectedValue

  return (
    <div
      className={cn(
        "px-3 py-2 cursor-pointer text-sm transition-colors",
        isSelected ? "bg-primary/10 text-primary font-medium" : "hover:bg-gray-50 text-gray-700"
      )}
      onClick={() => {
        onValueChange?.(value)
        setOpen(false)
      }}
    >
      {children}
    </div>
  )
}
