"use client"

import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar, CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

function DatePickerDemo({ className, ...props }) {
  const [date, setDate] = React.useState()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker
          selected={date}
          onChange={setDate}
          inline
          locale={ptBR}
          className="w-full"
          calendarClassName={cn(
            "shadow-lg border-0 bg-transparent text-foreground",
            "!font-sans",
            "[&_.react-datepicker__header]:bg-transparent [&_.react-datepicker__header]:border-b [&_.react-datepicker__header]:border-border [&_.react-datepicker__header]:pb-2",
            "[&_.react-datepicker__current-month]:text-foreground [&_.react-datepicker__current-month]:font-semibold [&_.react-datepicker__current-month]:text-lg",
            "[&_.react-datepicker__day-name]:text-muted-foreground [&_.react-datepicker__day-name]:font-medium [&_.react-datepicker__day-name]:text-sm [&_.react-datepicker__day-name]:w-8 [&_.react-datepicker__day-name]:h-8",
            "[&_.react-datepicker__day]:text-foreground [&_.react-datepicker__day]:w-8 [&_.react-datepicker__day]:h-8 [&_.react-datepicker__day]:leading-8 [&_.react-datepicker__day]:text-sm [&_.react-datepicker__day]:rounded-md [&_.react-datepicker__day]:hover:bg-accent [&_.react-datepicker__day]:hover:text-accent-foreground [&_.react-datepicker__day]:transition-colors",
            "[&_.react-datepicker__day--selected]:bg-primary [&_.react-datepicker__day--selected]:text-primary-foreground [&_.react-datepicker__day--selected]:hover:bg-primary [&_.react-datepicker__day--selected]:hover:text-primary-foreground",
            "[&_.react-datepicker__day--keyboard-selected]:bg-accent [&_.react-datepicker__day--keyboard-selected]:text-accent-foreground",
            "[&_.react-datepicker__day--today]:bg-accent [&_.react-datepicker__day--today]:text-accent-foreground [&_.react-datepicker__day--today]:font-semibold",
            "[&_.react-datepicker__day--outside-month]:text-muted-foreground [&_.react-datepicker__day--outside-month]:opacity-50",
            "[&_.react-datepicker__navigation]:top-4 [&_.react-datepicker__navigation]:w-8 [&_.react-datepicker__navigation]:h-8 [&_.react-datepicker__navigation]:rounded-md [&_.react-datepicker__navigation]:hover:bg-accent",
            "[&_.react-datepicker__navigation-icon::before]:border-foreground [&_.react-datepicker__navigation-icon::before]:border-width-2",
            "[&_.react-datepicker__triangle]:hidden",
            "[&_.react-datepicker__month-container]:bg-transparent",
            "[&_.react-datepicker__month]:bg-transparent [&_.react-datepicker__month]:p-3",
            "[&_.react-datepicker__week]:flex [&_.react-datepicker__week]:gap-1 [&_.react-datepicker__week]:mb-1",
            "[&_.react-datepicker__day-names]:flex [&_.react-datepicker__day-names]:gap-1 [&_.react-datepicker__day-names]:mb-2"
          )}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

function DateRangePicker({ className, ...props }) {
  const [startDate, setStartDate] = React.useState()
  const [endDate, setEndDate] = React.useState()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !startDate && "text-muted-foreground",
            className
          )}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {startDate ? (
            endDate ? (
              <>
                {format(startDate, "dd/MM/yyyy")} - {format(endDate, "dd/MM/yyyy")}
              </>
            ) : (
              format(startDate, "dd/MM/yyyy")
            )
          ) : (
            <span>Selecione um período</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates
            setStartDate(start)
            setEndDate(end)
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          locale={ptBR}
          className="w-full"
          calendarClassName={cn(
            "shadow-lg border-0 bg-transparent text-foreground",
            "!font-sans",
            "[&_.react-datepicker__header]:bg-transparent [&_.react-datepicker__header]:border-b [&_.react-datepicker__header]:border-border [&_.react-datepicker__header]:pb-2",
            "[&_.react-datepicker__current-month]:text-foreground [&_.react-datepicker__current-month]:font-semibold [&_.react-datepicker__current-month]:text-lg",
            "[&_.react-datepicker__day-name]:text-muted-foreground [&_.react-datepicker__day-name]:font-medium [&_.react-datepicker__day-name]:text-sm [&_.react-datepicker__day-name]:w-8 [&_.react-datepicker__day-name]:h-8",
            "[&_.react-datepicker__day]:text-foreground [&_.react-datepicker__day]:w-8 [&_.react-datepicker__day]:h-8 [&_.react-datepicker__day]:leading-8 [&_.react-datepicker__day]:text-sm [&_.react-datepicker__day]:rounded-md [&_.react-datepicker__day]:hover:bg-accent [&_.react-datepicker__day]:hover:text-accent-foreground [&_.react-datepicker__day]:transition-colors",
            "[&_.react-datepicker__day--selected]:bg-primary [&_.react-datepicker__day--selected]:text-primary-foreground [&_.react-datepicker__day--selected]:hover:bg-primary [&_.react-datepicker__day--selected]:hover:text-primary-foreground",
            "[&_.react-datepicker__day--in-selecting-range]:bg-primary/20 [&_.react-datepicker__day--in-selecting-range]:text-primary",
            "[&_.react-datepicker__day--in-range]:bg-primary/20 [&_.react-datepicker__day--in-range]:text-primary",
            "[&_.react-datepicker__day--range-start]:bg-primary [&_.react-datepicker__day--range-start]:text-primary-foreground",
            "[&_.react-datepicker__day--range-end]:bg-primary [&_.react-datepicker__day--range-end]:text-primary-foreground",
            "[&_.react-datepicker__day--keyboard-selected]:bg-accent [&_.react-datepicker__day--keyboard-selected]:text-accent-foreground",
            "[&_.react-datepicker__day--today]:bg-accent [&_.react-datepicker__day--today]:text-accent-foreground [&_.react-datepicker__day--today]:font-semibold",
            "[&_.react-datepicker__day--outside-month]:text-muted-foreground [&_.react-datepicker__day--outside-month]:opacity-50",
            "[&_.react-datepicker__navigation]:top-4 [&_.react-datepicker__navigation]:w-8 [&_.react-datepicker__navigation]:h-8 [&_.react-datepicker__navigation]:rounded-md [&_.react-datepicker__navigation]:hover:bg-accent",
            "[&_.react-datepicker__navigation-icon::before]:border-foreground [&_.react-datepicker__navigation-icon::before]:border-width-2",
            "[&_.react-datepicker__triangle]:hidden",
            "[&_.react-datepicker__month-container]:bg-transparent",
            "[&_.react-datepicker__month]:bg-transparent [&_.react-datepicker__month]:p-3",
            "[&_.react-datepicker__week]:flex [&_.react-datepicker__week]:gap-1 [&_.react-datepicker__week]:mb-1",
            "[&_.react-datepicker__day-names]:flex [&_.react-datepicker__day-names]:gap-1 [&_.react-datepicker__day-names]:mb-2"
          )}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePickerDemo, DateRangePicker }