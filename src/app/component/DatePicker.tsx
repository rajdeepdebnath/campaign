import React, { Dispatch, SetStateAction } from "react";
import { Datepicker } from "flowbite-react";

interface Props {
  setDate: Dispatch<SetStateAction<Date>>;
}
const DatePicker = ({ setDate }: Props) => {
  return (
    <Datepicker
      minDate={new Date(2025, 0, 23)}
      maxDate={new Date(2025, 3, 30)}
      onChange={(date) => setDate(date ?? new Date())}
    />
  );
};

export default DatePicker;
