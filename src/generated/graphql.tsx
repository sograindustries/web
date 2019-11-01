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
  uuid?: Maybe<Scalars['String']>,
  userId?: Maybe<Scalars['Int']>,
};

export type CreatePatchPayload = {
   __typename?: 'CreatePatchPayload',
  /** The patch created. */
  patch?: Maybe<Patch>,
};

export type Mutation = {
   __typename?: 'Mutation',
  updatePatch?: Maybe<UpdatePatchPayload>,
  createPatch?: Maybe<CreatePatchPayload>,
  version?: Maybe<Scalars['String']>,
};


export type MutationUpdatePatchArgs = {
  input: UpdatePatchInput
};


export type MutationCreatePatchArgs = {
  input: CreatePatchInput
};

export type Patch = {
   __typename?: 'Patch',
  id: Scalars['Int'],
  uuid: Scalars['String'],
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
  version?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  viewer?: Maybe<User>,
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['Int']>,
  username?: Maybe<Scalars['String']>
};

export type Reading = {
   __typename?: 'Reading',
  id: Scalars['Int'],
  uri?: Maybe<Scalars['String']>,
};

/** Updates patch of provided ID. */
export type UpdatePatchInput = {
  id: Scalars['Int'],
  uuid?: Maybe<Scalars['String']>,
};

export type UpdatePatchPayload = {
   __typename?: 'UpdatePatchPayload',
  /** The patch updated. */
  patch?: Maybe<Patch>,
};

export type User = {
   __typename?: 'User',
  patches: Array<Patch>,
  id: Scalars['Int'],
  username: Scalars['String'],
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
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
  & Pick<Patch, 'id' | 'uuid' | 'mobileDevice' | 'firmwareVersion' | 'appVersion'>
  & BatteryActivityPartsFragment
  & PatchCardStatsOverviewFragment
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
  uuid
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