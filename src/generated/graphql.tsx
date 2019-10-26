import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
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


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Patch = {
   __typename?: 'Patch',
  uuid: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  hello?: Maybe<Scalars['String']>,
  patch?: Maybe<Patch>,
};


export type QueryPatchArgs = {
  uuid: Scalars['String']
};

export type PatchListItemFragmentFragment = (
  { __typename?: 'Patch' }
  & Pick<Patch, 'uuid' | 'name'>
);

export type PatchListItemQueryVariables = {
  uuid: Scalars['String']
};


export type PatchListItemQuery = (
  { __typename?: 'Query' }
  & { patch: Maybe<(
    { __typename?: 'Patch' }
    & PatchListItemFragmentFragment
  )> }
);

export const PatchListItemFragmentFragmentDoc = gql`
    fragment PatchListItemFragment on Patch {
  uuid
  name
}
    `;
export const PatchListItemDocument = gql`
    query PatchListItem($uuid: String!) {
  patch(uuid: $uuid) {
    ...PatchListItemFragment
  }
}
    ${PatchListItemFragmentFragmentDoc}`;
export type PatchListItemComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<PatchListItemQuery, PatchListItemQueryVariables>, 'query'> & ({ variables: PatchListItemQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const PatchListItemComponent = (props: PatchListItemComponentProps) => (
      <ApolloReactComponents.Query<PatchListItemQuery, PatchListItemQueryVariables> query={PatchListItemDocument} {...props} />
    );
    
export type PatchListItemProps<TChildProps = {}> = ApolloReactHoc.DataProps<PatchListItemQuery, PatchListItemQueryVariables> & TChildProps;
export function withPatchListItem<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PatchListItemQuery,
  PatchListItemQueryVariables,
  PatchListItemProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, PatchListItemQuery, PatchListItemQueryVariables, PatchListItemProps<TChildProps>>(PatchListItemDocument, {
      alias: 'patchListItem',
      ...operationOptions
    });
};
export type PatchListItemQueryResult = ApolloReactCommon.QueryResult<PatchListItemQuery, PatchListItemQueryVariables>;