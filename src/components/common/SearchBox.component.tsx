import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface SearchBoxProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string
}

export const SearchBox = ({ value, onChange, className }: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={cn("relative group", className)}>
      <div className={cn(
        "relative flex items-center transition-all duration-300",
        isFocused ? "sm:w-[32rem]" : "sm:w-96",
        "w-full",
      )}>
        <Search className={cn(
          "absolute left-3 transition-colors duration-200",
          isFocused ? "text-primary" : "text-muted-foreground",
          "h-4 w-4"
        )} />
        <Input
          type="text"
          placeholder="Search profiles (Press ⌘ K)"
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pl-9 pr-12 w-full transition-all duration-300",
            "border-muted-foreground/20 hover:border-muted-foreground/40",
            isFocused && "border-primary shadow-sm",
          )}
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-xs text-muted-foreground">
          ⌘ K
        </kbd>
      </div>
    </div>
  )
}