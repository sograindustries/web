import * as React from "react";
import RelativeDropdown from "./RelativeDropdown";

type RelativeDropdownValue =
  | "last_5_seconds"
  | "last_10_seconds"
  | "last_30_seconds"
  | "last_1_minute"
  | "last_5_minutes"
  | "last_30_minutes"
  | "last_1_hour"
  | "last_6_hours"
  | "last_12_hours";

const relativeDropdownValues: RelativeDropdownValue[] = [
  "last_5_seconds",
  "last_10_seconds",
  "last_30_seconds",
  "last_1_minute",
  "last_5_minutes",
  "last_30_minutes",
  "last_1_hour",
  "last_6_hours",
  "last_12_hours"
];

interface Props {
  handleRelativeTimeSelected: (seconds: number) => void;
}

function RangeFilter(props: Props) {
  const handleOnValueSelected = (value: RelativeDropdownValue) => {
    switch (value) {
      case "last_5_seconds":
        props.handleRelativeTimeSelected(5);
        break;
      case "last_10_seconds":
        props.handleRelativeTimeSelected(10);
        break;
      case "last_30_seconds":
        props.handleRelativeTimeSelected(30);
        break;
      case "last_1_minute":
        props.handleRelativeTimeSelected(60);
        break;
      case "last_5_minutes":
        props.handleRelativeTimeSelected(60 * 5);
        break;
      case "last_30_minutes":
        props.handleRelativeTimeSelected(60 * 5);
        break;
      case "last_1_hour":
        props.handleRelativeTimeSelected(60 * 60);
        break;
      case "last_6_hours":
        props.handleRelativeTimeSelected(60 * 60 * 5);
        break;
      case "last_12_hours":
        props.handleRelativeTimeSelected(60 * 60 * 12);
        break;
    }
  };

  return (
    <div>
      <RelativeDropdown
        values={relativeDropdownValues}
        onValueSelected={handleOnValueSelected}
      />
    </div>
  );
}

export default RangeFilter;
