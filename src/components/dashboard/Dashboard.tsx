import * as React from "react";
import MainChart from "./MainChart";
import RangeFilter from "./RangeFilter";
import gql from "graphql-tag";
import { useGetReadingsByTimeRangeLazyQuery } from "../../generated/graphql";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { WithApiProps, withApi } from "../../api/hoc";
import { Button, TextField } from "@material-ui/core";

interface Props {
  patchId: number;
  jwt: string | null;
}

function URIList(props: { readingsMeta: { uri: string; tags: string[] }[] }) {
  return (
    <div>
      {props.readingsMeta.map(meta => {
        return (
          <div style={{ display: "flex" }}>
            {meta.tags.length > 0 ? (
              <div style={{ color: "red", marginRight: 10 }}>
                [{meta.tags.join(",")}]:
              </div>
            ) : (
              <div style={{ marginRight: 10 }}>No prefix - </div>
            )}
            <div key={meta.uri}>{meta.uri}</div>
          </div>
        );
      })}
    </div>
  );
}

function getReadings<
  T extends { tags?: (string | undefined | null)[] | undefined | null }
>(readings: (T | null | undefined)[] | undefined, filter: string): T[] {
  if (readings === null || readings === undefined) {
    return [];
  }

  const arr: T[] = [];
  for (let i = 0; i < readings.length; i++) {
    const reading = readings[i];
    if (reading) {
      arr.push(reading);
    }
  }

  if (filter.trim().length === 0) {
    return arr;
  }

  const filtered = arr.filter(reading => {
    return (
      reading &&
      reading.tags &&
      reading.tags.filter(
        tag => tag && tag.toLowerCase().includes(filter.toLowerCase())
      ).length > 0
    );
  });

  return filtered;
}

function Dashboard(props: Props & WithApiProps) {
  const [chartData, setChartData] = React.useState<number[]>([]);
  const [rawData, setRawData] = React.useState<number[]>([]);
  const [secondsRange, setSecondsRange] = React.useState<number>(0);
  const [downloading, setDownloading] = React.useState(false);
  const [readingsMeta, setReadingsMeta] = React.useState<
    { uri: string; tags: string[] }[]
  >([]);
  const [prefixFilter, setPrefixFilter] = React.useState("");

  const [getReading, { data, loading }] = useGetReadingsByTimeRangeLazyQuery();

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

    const readings = getReadings(data.readings, prefixFilter);

    setReadingsMeta(
      readings.map(reading => {
        return {
          uri: (reading && reading.uri) || "n/a",
          tags: (reading && reading.tags) || []
        };
      })
    );

    setDownloading(true);
    Promise.all(
      readings.map(async reading => {
        if (reading && reading.uri && props.jwt) {
          return {
            prefix: prefixFilter,
            values: await props.api.ecg.get(reading.uri, props.jwt)
          };
        }
      })
    ).then(ecgValues => {
      const first: any = ecgValues[0];
      const prefix = first ? first.prefix : null;
      if (prefix !== prefixFilter) {
        setDownloading(false);
        setRawData([]);
        setChartData([]);
        return;
      }

      const flattened = ecgValues.map((e: any) => e.values).flat();

      flattened.sort(el => el[0]);

      setRawData(flattened);
      setChartData(
        flattened.map((el: [number, number, number[]]) => el[2]).flat()
      );
      setDownloading(false);
    });
  }, [data, prefixFilter]);

  const handleDownload = async () => {
    if (!data || !data.readings) {
      return;
    }

    console.log(`DOWNLLOADING ${rawData.length} files.`);

    const textToSave = rawData.join("\r\n");
    let uriContent = URL.createObjectURL(
      new Blob([textToSave], { type: "text/plain" })
    );
    let link = document.createElement("a");
    link.setAttribute("href", uriContent);
    link.setAttribute(
      "download",
      prefixFilter ? `${prefixFilter}-${Date.now()}.csv` : `${Date.now()}.csv`
    );
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
      <div style={{ display: "flex" }}>
        <RangeFilter handleRelativeTimeSelected={handleRelativeRangeSelected} />
        <TextField
          placeholder="Prefix Filter"
          onChange={e => {
            const filter = e.target.value;
            setPrefixFilter(filter);
          }}
        />
      </div>

      {!downloading && rawData.length > 0 && (
        <Button onClick={handleDownload}>Download</Button>
      )}
      <div style={{ display: "flex", flex: 1 }}>{chartComponent}</div>
      <div>{!loading && <URIList readingsMeta={readingsMeta} />}</div>
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
        tags
      }
    }
  `
};

export default connect((state: AppState) => {
  return {
    jwt: state.session.jwt
  };
})(withApi(Dashboard));
