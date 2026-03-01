import React from "react";
import { Switch } from "@headlessui/react";

const StudentToggle = ({ enabled, setEnabled, label }) => {
  return (
    <div className="flex items-center gap-3">
      <span className="font-semibold text-gray-700">{label}</span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-green-500" : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};

export default StudentToggle;
