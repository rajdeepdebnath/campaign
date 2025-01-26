import React, { Dispatch, SetStateAction } from "react";

interface Props {
  wd: string[];
  setWD: Dispatch<SetStateAction<string[]>>;
}

const Weekdays = ({ wd, setWD }: Props) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const handleChange = (checked: string) => {
    setWD((prev) => {
      if (prev.includes(checked)) {
        return prev.filter((d) => d !== checked);
      }
      return [...prev, checked];
    });
  };
  return (
    <div>
      <h3 className="font-semibold text-gray-900">Days</h3>
      <ul className="w-full flex flex-wrap text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {days.map((d) => (
          <li
            key={d}
            className="w-20 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
          >
            <div className="flex items-center ps-3">
              <input
                id="vue-checkbox"
                type="checkbox"
                value={d}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={(e) => handleChange(e.target.value)}
                checked={wd.includes(d)}
              />
              <label
                htmlFor="vue-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {d}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Weekdays;
