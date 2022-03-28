import { Calendar, Alert } from "antd";
import moment from "moment";
import { useState } from "react";

export default function LibraryCalendarPage() {
  const [value, setValue] = useState(moment("2022-03-28"));
  const [selectedValue, setSelectedValue] = useState(moment("2022-03-28"));

  const onSelect = (value: any) => {
    setSelectedValue(value);
  };

  const onPanelChange = (value: any) => {
    setValue(value);
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <Alert
        message={` ${selectedValue && selectedValue.format("YYYY-MM-DD")}`}
      />
      <br></br>
      <Alert message={` ${selectedValue && selectedValue.format("MM 월")}`} />
    </>
  );
}
