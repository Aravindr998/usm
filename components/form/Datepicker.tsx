"use client"

import {  CalendarArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ButtonHTMLAttributes, useState } from "react"

interface DatepickerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    dateValue: Date | undefined,
    onDateChange: (value: Date | undefined) => void
    placeholder?: string
}

export default function Datepicker({dateValue, onDateChange, placeholder="Select date", ...props}: DatepickerProps) {
  const [open, setOpen] = useState(false)

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
            {...props}
          >
            {dateValue ? dateValue.toLocaleDateString() : placeholder}
            <CalendarArrowDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 dark" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            captionLayout="dropdown"
            onSelect={(date) => {
              onDateChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
  )
}
