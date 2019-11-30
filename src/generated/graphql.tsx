import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Battery = {
   __typename?: 'Battery',
  value?: Maybe<Scalars['Float']>,
  createdAt?: Maybe<Scalars['String']>,
};

/** Creates a patch. */
export type CreatePatchInput = {
  bleId?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['Int']>,
};

export type CreatePatchPayload = {
   __typename?: 'CreatePatchPayload',
  /** The patch created. */
  patch?: Maybe<Patch>,
};

/** Creates a reading for a given patch. */
export type CreateReadingInput = {
  patchId?: Maybe<Scalars['Int']>,
  patchBleId?: Maybe<Scalars['ID']>,
  uri?: Maybe<Scalars['String']>,
  /** Commit hash associated with FW build. */
  firmwareVersion?: Maybe<Scalars['String']>,
  /** Packet sequence number since device was last powered on. Reset to 0 when device is powered off. */
  sequence?: Maybe<Scalars['Int']>,
  /** Number of milliseconds patch has been on. */
  uptimeMs?: Maybe<Scalars['Int']>,
  /** Set of tags used to provide additional context to reading. */
  tags?: Maybe<Array<Scalars['String']>>,
};

export type CreateReadingPayload = {
   __typename?: 'CreateReadingPayload',
  /** The patch created. */
  reading?: Maybe<Reading>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updatePatch?: Maybe<UpdatePatchPayload>,
  createPatch?: Maybe<CreatePatchPayload>,
  createReading?: Maybe<CreateReadingPayload>,
  version?: Maybe<Scalars['String']>,
};


export type MutationUpdatePatchArgs = {
  input: UpdatePatchInput
};


export type MutationCreatePatchArgs = {
  input: CreatePatchInput
};


export type MutationCreateReadingArgs = {
  input: CreateReadingInput
};

export type Patch = {
   __typename?: 'Patch',
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
  battery?: Maybe<Battery>,
  batteryActivity?: Maybe<Array<Battery>>,
  firmwareVersion?: Maybe<Scalars['String']>,
  appVersion?: Maybe<Scalars['String']>,
  mobileDevice?: Maybe<Scalars['String']>,
  readingCount?: Maybe<Scalars['Int']>,
  readings?: Maybe<Array<Reading>>,
};

export type Query = {
   __typename?: 'Query',
  readings?: Maybe<Array<Maybe<Reading>>>,
  version?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  viewer?: Maybe<User>,
};


export type QueryReadingsArgs = {
  patchId: Scalars['Int'],
  start?: Maybe<Scalars['String']>
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>
};

export type Reading = {
   __typename?: 'Reading',
  id: Scalars['Int'],
  createdAt?: Maybe<Scalars['String']>,
  uri?: Maybe<Scalars['String']>,
  firmwareVersion?: Maybe<Scalars['String']>,
  sequence?: Maybe<Scalars['Int']>,
  uptimeMs?: Maybe<Scalars['Int']>,
  tags?: Maybe<Array<Scalars['String']>>,
};

/** Updates patch of provided ID. */
export type UpdatePatchInput = {
  id: Scalars['Int'],
  bleId?: Maybe<Scalars['String']>,
};

export type UpdatePatchPayload = {
   __typename?: 'UpdatePatchPayload',
  /** The patch updated. */
  patch?: Maybe<Patch>,
};

export type User = {
   __typename?: 'User',
  patches: Array<Patch>,
  patch?: Maybe<Patch>,
  id: Scalars['Int'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};


export type UserPatchArgs = {
  id: Scalars['Int']
};

export type BatteryActivityPartsFragment = (
  { __typename?: 'Patch' }
  & { battery: Maybe<(
    { __typename?: 'Battery' }
    & Pick<Battery, 'value'>
  )>, batteryActivity: Maybe<Array<(
    { __typename?: 'Battery' }
    & Pick<Battery, 'createdAt' | 'value'>
  )>> }
);

export type PatchCardStatsOverviewFragment = (
  { __typename?: 'Patch' }
  & Pick<Patch, 'readingCount'>
);

export type GetPatchesQueryVariables = {};


export type GetPatchesQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & { patches: Array<(
      { __typename?: 'Patch' }
      & Pick<Patch, 'id'>
      & PatchPartsFragment
    )> }
  )> }
);

export type PatchPartsFragment = (
  { __typename?: 'Patch' }
  & Pick<Patch, 'id' | 'bleId' | 'mobileDevice' | 'firmwareVersion' | 'appVersion'>
  & BatteryActivityPartsFragment
  & PatchCardStatsOverviewFragment
);

export type GetPatchSummaryQueryVariables = {
  id: Scalars['Int']
};


export type GetPatchSummaryQuery = (
  { __typename?: 'Query' }
  & { viewer: Maybe<(
    { __typename?: 'User' }
    & { patch: Maybe<(
      { __typename?: 'Patch' }
      & Pick<Patch, 'id' | 'bleId' | 'readingCount'>
      & { readings: Maybe<Array<(
        { __typename?: 'Reading' }
        & Pick<Reading, 'id' | 'createdAt' | 'uri'>
      )>> }
    )> }
  )> }
);

export type GetReadingsByTimeRangeQueryVariables = {
  patchId: Scalars['Int'],
  start?: Maybe<Scalars['String']>
};


export type GetReadingsByTimeRangeQuery = (
  { __typename?: 'Query' }
  & { readings: Maybe<Array<Maybe<(
    { __typename?: 'Reading' }
    & Pick<Reading, 'id' | 'createdAt' | 'uri' | 'tags'>
  )>>> }
);

export const BatteryActivityPartsFragmentDoc = gql`
    fragment BatteryActivityParts on Patch {
  battery {
    value
  }
  batteryActivity {
    createdAt
    value
  }
}
    `;
export const PatchCardStatsOverviewFragmentDoc = gql`
    fragment PatchCardStatsOverview on Patch {
  readingCount
}
    `;
export const PatchPartsFragmentDoc = gql`
    fragment PatchParts on Patch {
  id
  bleId
  mobileDevice
  firmwareVersion
  appVersion
  ...BatteryActivityParts
  ...PatchCardStatsOverview
}
    ${BatteryActivityPartsFragmentDoc}
${PatchCardStatsOverviewFragmentDoc}`;
export const GetPatchesDocument = gql`
    query GetPatches {
  viewer {
    patches {
      id
      ...PatchParts
    }
  }
}
    ${PatchPartsFragmentDoc}`;
export type GetPatchesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPatchesQuery, GetPatchesQueryVariables>, 'query'>;

    export const GetPatchesComponent = (props: GetPatchesComponentProps) => (
      <ApolloReactComponents.Query<GetPatchesQuery, GetPatchesQueryVariables> query={GetPatchesDocument} {...props} />
    );
    
export type GetPatchesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetPatchesQuery, GetPatchesQueryVariables> & TChildProps;
export function withGetPatches<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPatchesQuery,
  GetPatchesQueryVariables,
  GetPatchesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetPatchesQuery, GetPatchesQueryVariables, GetPatchesProps<TChildProps>>(GetPatchesDocument, {
      alias: 'getPatches',
      ...operationOptions
    });
};

/**
 * __useGetPatchesQuery__
 *
 * To run a query within a React component, call `useGetPatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPatchesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPatchesQuery, GetPatchesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPatchesQuery, GetPatchesQueryVariables>(GetPatchesDocument, baseOptions);
      }
export function useGetPatchesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPatchesQuery, GetPatchesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPatchesQuery, GetPatchesQueryVariables>(GetPatchesDocument, baseOptions);
        }
export type GetPatchesQueryHookResult = ReturnType<typeof useGetPatchesQuery>;
export type GetPatchesLazyQueryHookResult = ReturnType<typeof useGetPatchesLazyQuery>;
export type GetPatchesQueryResult = ApolloReactCommon.QueryResult<GetPatchesQuery, GetPatchesQueryVariables>;
export const GetPatchSummaryDocument = gql`
    query GetPatchSummary($id: Int!) {
  viewer {
    patch(id: $id) {
      id
      bleId
      readingCount
      readings {
        id
        createdAt
        uri
      }
    }
  }
}
    `;
export type GetPatchSummaryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>, 'query'> & ({ variables: GetPatchSummaryQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPatchSummaryComponent = (props: GetPatchSummaryComponentProps) => (
      <ApolloReactComponents.Query<GetPatchSummaryQuery, GetPatchSummaryQueryVariables> query={GetPatchSummaryDocument} {...props} />
    );
    
export type GetPatchSummaryProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetPatchSummaryQuery, GetPatchSummaryQueryVariables> & TChildProps;
export function withGetPatchSummary<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPatchSummaryQuery,
  GetPatchSummaryQueryVariables,
  GetPatchSummaryProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetPatchSummaryQuery, GetPatchSummaryQueryVariables, GetPatchSummaryProps<TChildProps>>(GetPatchSummaryDocument, {
      alias: 'getPatchSummary',
      ...operationOptions
    });
};

/**
 * __useGetPatchSummaryQuery__
 *
 * To run a query within a React component, call `useGetPatchSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPatchSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPatchSummaryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPatchSummaryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>(GetPatchSummaryDocument, baseOptions);
      }
export function useGetPatchSummaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>(GetPatchSummaryDocument, baseOptions);
        }
export type GetPatchSummaryQueryHookResult = ReturnType<typeof useGetPatchSummaryQuery>;
export type GetPatchSummaryLazyQueryHookResult = ReturnType<typeof useGetPatchSummaryLazyQuery>;
export type GetPatchSummaryQueryResult = ApolloReactCommon.QueryResult<GetPatchSummaryQuery, GetPatchSummaryQueryVariables>;
export const GetReadingsByTimeRangeDocument = gql`
    query GetReadingsByTimeRange($patchId: Int!, $start: String) {
  readings(patchId: $patchId, start: $start) {
    id
    createdAt
    uri
    tags
  }
}
    `;
export type GetReadingsByTimeRangeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables>, 'query'> & ({ variables: GetReadingsByTimeRangeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetReadingsByTimeRangeComponent = (props: GetReadingsByTimeRangeComponentProps) => (
      <ApolloReactComponents.Query<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables> query={GetReadingsByTimeRangeDocument} {...props} />
    );
    
export type GetReadingsByTimeRangeProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables> & TChildProps;
export function withGetReadingsByTimeRange<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetReadingsByTimeRangeQuery,
  GetReadingsByTimeRangeQueryVariables,
  GetReadingsByTimeRangeProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables, GetReadingsByTimeRangeProps<TChildProps>>(GetReadingsByTimeRangeDocument, {
      alias: 'getReadingsByTimeRange',
      ...operationOptions
    });
};

/**
 * __useGetReadingsByTimeRangeQuery__
 *
 * To run a query within a React component, call `useGetReadingsByTimeRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReadingsByTimeRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReadingsByTimeRangeQuery({
 *   variables: {
 *      patchId: // value for 'patchId'
 *      start: // value for 'start'
 *   },
 * });
 */
export function useGetReadingsByTimeRangeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables>) {
        return ApolloReactHooks.useQuery<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables>(GetReadingsByTimeRangeDocument, baseOptions);
      }
export function useGetReadingsByTimeRangeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables>(GetReadingsByTimeRangeDocument, baseOptions);
        }
export type GetReadingsByTimeRangeQueryHookResult = ReturnType<typeof useGetReadingsByTimeRangeQuery>;
export type GetReadingsByTimeRangeLazyQueryHookResult = ReturnType<typeof useGetReadingsByTimeRangeLazyQuery>;
export type GetReadingsByTimeRangeQueryResult = ApolloReactCommon.QueryResult<GetReadingsByTimeRangeQuery, GetReadingsByTimeRangeQueryVariables>;