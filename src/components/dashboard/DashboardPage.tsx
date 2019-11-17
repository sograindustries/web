import * as React from "react";
import Dashboard from "./Dashboard";

interface Props {
  match: { params: { id: string } };
}

function DashboardPage(props: Props) {
  let numericId: number | null = null;
  try {
    numericId = parseInt(props.match.params.id);
  } catch (error) {
    return <div>Invalid ID!</div>;
  }

  return <Dashboard patchId={numericId} />;
}

export default DashboardPage;
