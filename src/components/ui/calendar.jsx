"use client"

import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { cn } from "@/lib/utils"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  mode = "single",
  ...props
}) {
  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={selected}
        onChange={onSelect}
        inline
        className="w-full"
        calendarClassName={cn(
          "shadow-lg border border-border rounded-lg bg-background text-foreground",
          "!font-sans",
          "[&_.react-datepicker__header]:bg-muted [&_.react-datepicker__header]:border-border",
          "[&_.react-datepicker__current-month]:text-foreground [&_.react-datepicker__current-month]:font-semibold",
          "[&_.react-datepicker__day-name]:text-muted-foreground [&_.react-datepicker__day-name]:font-medium",
          "[&_.react-datepicker__day]:text-foreground [&_.react-datepicker__day]:hover:bg-accent [&_.react-datepicker__day]:hover:text-accent-foreground",
          "[&_.react-datepicker__day--selected]:bg-primary [&_.react-datepicker__day--selected]:text-primary-foreground",
          "[&_.react-datepicker__day--keyboard-selected]:bg-accent [&_.react-datepicker__day--keyboard-selected]:text-accent-foreground",
          "[&_.react-datepicker__day--today]:bg-accent [&_.react-datepicker__day--today]:text-accent-foreground [&_.react-datepicker__day--today]:font-semibold",
          "[&_.react-datepicker__day--outside-month]:text-muted-foreground [&_.react-datepicker__day--outside-month]:opacity-50",
          "[&_.react-datepicker__navigation]:top-3",
          "[&_.react-datepicker__navigation-icon::before]:border-foreground",
          "[&_.react-datepicker__triangle]:hidden"
        )}
        selectsRange={mode === "range"}
        startDate={mode === "range" ? selected?.from : selected}
        endDate={mode === "range" ? selected?.to : undefined}
        {...props}
      />
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }