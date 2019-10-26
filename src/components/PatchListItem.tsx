import * as React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { PatchListItemQuery } from "../generated/graphql";

const PATCH_FRAGMENT = gql`
  fragment PatchListItemFragment on Patch {
    uuid
    name
  }
`;

const PATCH_QUERY = gql`
  query PatchListItem($uuid: String!) {
    viewer: {
      patches: {
        data
      }
    }
    patch(uuid: $uuid) {
      ...PatchListItemFragment
    }
  }
  ${PATCH_FRAGMENT}
`;

export default function PatchListItem() {
  const { loading, error, data } = useQuery<PatchListItemQuery>(PATCH_QUERY, {
    variables: { uuid: "123" }
  });

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (data) {
    return <div>{data.patch!.uuid}</div>;
  }

  return <div>No patches.</div>;
}
