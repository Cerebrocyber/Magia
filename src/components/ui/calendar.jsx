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
  ...props
}) {
  return (
    <div className={cn("p-3", className)}>
      <DatePicker
        selected={selected}
        onChange={onSelect}
        inline
        className="w-full"
        calendarClassName="shadow-lg border border-border rounded-lg bg-background text-foreground"
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }