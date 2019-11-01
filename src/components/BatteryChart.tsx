import * as React from "react";
import gql from "graphql-tag";
import { BatteryActivityPartsFragment } from "../generated/graphql";
import { AreaChart, Area } from "recharts";
import { BatteryFull } from "@material-ui/icons";

function BatteryChart(props: BatteryActivityPartsFragment) {
  const targetRef = React.useRef<any>(null);

  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    if (targetRef && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, [targetRef.current]);

  if (!props.batteryActivity) {
    return null;
  }

  const data = props.batteryActivity.map(item => {
    return { createdAt: item.createdAt, value: item.value };
  });

  return (
    <div ref={targetRef} style={{ position: "relative" }}>
      <AreaChart
        width={dimensions.width}
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        height={80}
        data={data}
        syncId="anyId"
      >
        <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>

      {props.battery && props.battery.value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            bottom: 0
          }}
        >
          <BatteryFull style={{ color: "#5fc586" }} />
          {(props.battery.value * 100).toFixed(0) + "%"}
        </div>
      )}
    </div>
  );
}

BatteryChart.fragments = {
  batteryActivity: gql`
    fragment BatteryActivityParts on Patch {
      battery {
        value
      }
      batteryActivity {
        createdAt
        value
      }
    }
  `
};

export default BatteryChart;
