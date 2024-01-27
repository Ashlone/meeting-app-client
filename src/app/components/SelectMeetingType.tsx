import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { SelectMeetingTypeProps, Types } from "../types";

const meetingTypes = [
  { label: "MANCO", value: "MANCO" },
  { label: "Finance", value: "FINANCE" },
  { label: "Project Team Leaders", value: "PTL" },
];



const SelectMeetingType: React.FC<SelectMeetingTypeProps> = ({
  selectedMeetingType,
  setSelectedMeetingType,
}) => {
  // Handler function to handle selection change
  const handleMeetingTypeSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSelectedMeetingType(event.target.value as Types);
  };

  return (
    <div className="flex justify-center items-center bg-white text-black w-50">
      <Select
        label="Select Meeting Type"
        className="max-w-xs"
        value={selectedMeetingType}
        onChange={handleMeetingTypeSelect}
      >
        {meetingTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectMeetingType;
