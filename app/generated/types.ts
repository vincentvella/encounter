import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CheckResponse = {
  __typename?: 'CheckResponse';
  authToken?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  event_id: Scalars['String'];
  price: Scalars['String'];
  request_id: Scalars['String'];
  status: Scalars['String'];
};

export type CreateUserDto = {
  fbUserId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
};


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};

export type Query = {
  __typename?: 'Query';
  findUser?: Maybe<User>;
  requestCode?: Maybe<RequestResponse>;
  verifyCode?: Maybe<CheckResponse>;
};


export type QueryFindUserArgs = {
  number: Scalars['String'];
};


export type QueryRequestCodeArgs = {
  number: Scalars['String'];
};


export type QueryVerifyCodeArgs = {
  code: Scalars['String'];
  request_id: Scalars['String'];
};

export type RequestResponse = {
  __typename?: 'RequestResponse';
  request_id: Scalars['String'];
  status: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  fbUserId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, fbUserId?: string | null | undefined, phoneNumber?: string | null | undefined } };

export type RequestCodeQueryVariables = Exact<{
  number: Scalars['String'];
}>;


export type RequestCodeQuery = { __typename?: 'Query', requestCode?: { __typename?: 'RequestResponse', status: string, requestId: string } | null | undefined };

export type VerifyCodeQueryVariables = Exact<{
  code: Scalars['String'];
  requestId: Scalars['String'];
}>;


export type VerifyCodeQuery = { __typename?: 'Query', verifyCode?: { __typename?: 'CheckResponse', authToken?: string | null | undefined, status: string, requestId: string, eventId: string } | null | undefined };


export const CreateUserDocument = gql`
    mutation CreateUser($phoneNumber: String!) {
  createUser(data: {phoneNumber: $phoneNumber}) {
    id
    fbUserId
    phoneNumber
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RequestCodeDocument = gql`
    query RequestCode($number: String!) {
  requestCode(number: $number) {
    requestId: request_id
    status
  }
}
    `;

/**
 * __useRequestCodeQuery__
 *
 * To run a query within a React component, call `useRequestCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestCodeQuery({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useRequestCodeQuery(baseOptions: Apollo.QueryHookOptions<RequestCodeQuery, RequestCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestCodeQuery, RequestCodeQueryVariables>(RequestCodeDocument, options);
      }
export function useRequestCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestCodeQuery, RequestCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestCodeQuery, RequestCodeQueryVariables>(RequestCodeDocument, options);
        }
export type RequestCodeQueryHookResult = ReturnType<typeof useRequestCodeQuery>;
export type RequestCodeLazyQueryHookResult = ReturnType<typeof useRequestCodeLazyQuery>;
export type RequestCodeQueryResult = Apollo.QueryResult<RequestCodeQuery, RequestCodeQueryVariables>;
export const VerifyCodeDocument = gql`
    query VerifyCode($code: String!, $requestId: String!) {
  verifyCode(code: $code, request_id: $requestId) {
    requestId: request_id
    eventId: event_id
    authToken
    status
  }
}
    `;

/**
 * __useVerifyCodeQuery__
 *
 * To run a query within a React component, call `useVerifyCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useVerifyCodeQuery(baseOptions: Apollo.QueryHookOptions<VerifyCodeQuery, VerifyCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyCodeQuery, VerifyCodeQueryVariables>(VerifyCodeDocument, options);
      }
export function useVerifyCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyCodeQuery, VerifyCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyCodeQuery, VerifyCodeQueryVariables>(VerifyCodeDocument, options);
        }
export type VerifyCodeQueryHookResult = ReturnType<typeof useVerifyCodeQuery>;
export type VerifyCodeLazyQueryHookResult = ReturnType<typeof useVerifyCodeLazyQuery>;
export type VerifyCodeQueryResult = Apollo.QueryResult<VerifyCodeQuery, VerifyCodeQueryVariables>;