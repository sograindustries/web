import * as React from "react";
import MainChart from "./MainChart";
import RangeFilter from "./RangeFilter";
import gql from "graphql-tag";
import { useGetReadingsByTimeRangeLazyQuery } from "../../generated/graphql";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { WithApiProps, withApi } from "../../api/hoc";
import { Button } from "@material-ui/core";

const mockData = require("./sample.json");

interface Props {
  patchId: number;
  jwt: string | null;
}

function URIList(props: { uris: string[] }) {
  return (
    <div>
      {props.uris.map(uri => {
        return <div key={uri}>{uri}</div>;
      })}
    </div>
  );
}

function Dashboard(props: Props & WithApiProps) {
  const [chartData, setChartData] = React.useState<number[]>([]);
  const [rawData, setRawData] = React.useState<number[]>([]);
  const [secondsRange, setSecondsRange] = React.useState<number>(0);
  const [downloading, setDownloading] = React.useState(false);
  const [uris, setURIs] = React.useState<string[]>([]);

  const [
    getReading,
    { data, error, loading }
  ] = useGetReadingsByTimeRangeLazyQuery();

  React.useEffect(() => {
    const seconds = 5;
    setSecondsRange(seconds);
    getReading({
      variables: {
        patchId: props.patchId,
        start: `${new Date(Date.now() - seconds * 1000).toISOString()}`
      }
    });
  }, []);

  React.useEffect(() => {
    if (!data || !data.readings) {
      return;
    }

    setURIs(data.readings.map(reading => (reading && reading.uri) || "n/a"));

    setDownloading(true);
    Promise.all(
      data.readings.map(reading => {
        if (reading && reading.uri && props.jwt) {
          return props.api.ecg.get(reading.uri, props.jwt);
        }
      })
    ).then(ecgValues => {
      const flattened = ecgValues.flat();
      setRawData(flattened);
      setChartData(
        flattened.map((el: [number, number, number[]]) => el[2]).flat()
      );
      setDownloading(false);
    });
  }, [data]);

  console.log(data);

  const handleDownload = async () => {
    if (!data || !data.readings) {
      return;
    }

    const textToSave = rawData.join("\r\n");
    let uriContent = URL.createObjectURL(
      new Blob([textToSave], { type: "text/plain" })
    );
    let link = document.createElement("a");
    link.setAttribute("href", uriContent);
    link.setAttribute("download", "data.csv");
    let event = new MouseEvent("click");
    link.dispatchEvent(event);
  };

  const handleRelativeRangeSelected = (seconds: number) => {
    setSecondsRange(seconds);
    getReading({
      variables: {
        patchId: props.patchId,
        start: `${new Date(Date.now() - seconds * 1000).toISOString()}`
      }
    });
  };

  console.log("DATA: ", data);

  let chartComponent =
    secondsRange > 60 * 30 ? (
      <div>Unable to render this much data. Max: ~30 minutes.</div>
    ) : (
      <MainChart data={chartData} />
    );

  if (loading) {
    chartComponent = <div>Fetching readings...</div>;
  }

  if (downloading) {
    const count = (data && data.readings && data.readings.length) || 0;
    chartComponent = <div>Downloading {count} S3 files...</div>;
  }

  return (
    <div>
      <RangeFilter handleRelativeTimeSelected={handleRelativeRangeSelected} />
      {!downloading && rawData.length > 0 && (
        <Button onClick={handleDownload}>Download</Button>
      )}
      <div style={{ display: "flex", flex: 1 }}>{chartComponent}</div>
      <div>{!loading && <URIList uris={uris} />}</div>
    </div>
  );
}

Dashboard.queries = {
  readingsByDateRange: gql`
    query GetReadingsByTimeRange($patchId: Int!, $start: String) {
      readings(patchId: $patchId, start: $start) {
        id
        createdAt
        uri
      }
    }
  `
};

export default connect((state: AppState) => {
  return {
    jwt: state.session.jwt
  };
})(withApi(Dashboard));
