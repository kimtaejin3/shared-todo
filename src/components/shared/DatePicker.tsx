import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import DropdownArrowIcon from "./icons/DropdownArrowIcon";

interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  className?: string;
}

export default function DatePicker({
  selectedDate,
  setSelectedDate,
  className,
}: DatePickerProps) {
  return (
    <div className="relative w-full">
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => date && setSelectedDate(date)}
        dateFormat="yyyy년 MM월 dd일"
        locale={ko}
        className="bg-white border border-gray-200 p-3 rounded-xl shadow-sm text-gray-700 font-medium cursor-pointer hover:border-blue-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
        showPopperArrow={false}
        calendarClassName="custom-datepicker"
        dayClassName={(date) =>
          date &&
          format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
            ? "selected-day"
            : ""
        }
        popperClassName="custom-popper"
        popperPlacement="bottom-start"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <DropdownArrowIcon />
      </div>
    </div>
  );
}
