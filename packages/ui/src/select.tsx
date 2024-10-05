"use client";

export const Select = ({
  options,
  onSelect,
}: {
  options: {
    key: string;
    value: string;
  }[];
  onSelect: (value: string) => void;
}) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="ui-bg-gray-50 ui-border ui-border-gray-300 ui-text-gray-900 ui-text-sm ui-rounded-lg focus:ui-ring-blue-500 focus:ui-border-blue-500 ui-block ui-w-full ui-p-2.5"
    >
      {options.map((option) => (
        <option value={option.key}>{option.value}</option>
      ))}
    </select>
  );
};
