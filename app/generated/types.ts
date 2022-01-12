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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CheckResponse = {
  __typename?: 'CheckResponse';
  access_token?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  event_id: Scalars['String'];
  price: Scalars['String'];
  request_id: Scalars['String'];
  status: Scalars['String'];
};

export type CreateEncounterInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
};

export type CreateFeedbackInput = {
  /** Call Quality */
  callQuality?: Maybe<Scalars['Float']>;
  /** Whether someone wants to continue the encounter */
  continuation: Scalars['Boolean'];
  /** Peer Rating */
  peerRating?: Maybe<Scalars['Float']>;
  /** Room ID */
  roomId: Scalars['String'];
  /** Shared Attributes */
  sharedAttributes: SharedAttributeInput;
};

export type CreateProfileDto = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type CreateRoomInput = {
  /** Callee id */
  calleeId: Scalars['String'];
  /** Caller id */
  callerId: Scalars['String'];
};

export type CreateUserDto = {
  fbUserId?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
};

export type Encounter = {
  __typename?: 'Encounter';
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type Feedback = {
  __typename?: 'Feedback';
  /** Encounter ID */
  id: Scalars['String'];
};

export type Login = {
  __typename?: 'Login';
  access_token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEncounter: Encounter;
  createFeedback: Feedback;
  createProfile: Profile;
  createRoom: Room;
  createUser: User;
  createUserWaiting: UserWaiting;
  leaveRoom: Room;
  removeEncounter: Encounter;
  removeFeedback: Feedback;
  removeProfile: RemoveProfile;
  removeRoom?: Maybe<Room>;
  removeUserWaiting: UserWaiting;
  updateEncounter: Encounter;
  updateFeedback: Feedback;
  updateProfile: Profile;
  updateRoom: Room;
};


export type MutationCreateEncounterArgs = {
  createEncounterInput: CreateEncounterInput;
};


export type MutationCreateFeedbackArgs = {
  createFeedbackInput: CreateFeedbackInput;
};


export type MutationCreateProfileArgs = {
  data: CreateProfileDto;
};


export type MutationCreateRoomArgs = {
  createRoomInput: CreateRoomInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserDto;
};


export type MutationCreateUserWaitingArgs = {
  ProfileId: Scalars['String'];
};


export type MutationLeaveRoomArgs = {
  id: Scalars['String'];
};


export type MutationRemoveEncounterArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveFeedbackArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['String'];
};


export type MutationRemoveRoomArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserWaitingArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateEncounterArgs = {
  updateEncounterInput: UpdateEncounterInput;
};


export type MutationUpdateFeedbackArgs = {
  updateFeedbackInput: UpdateFeedbackInput;
};


export type MutationUpdateProfileArgs = {
  id: Scalars['String'];
  profile: UpdateProfileDto;
};


export type MutationUpdateRoomArgs = {
  updateRoomInput: UpdateRoomInput;
};

export type PendingRoom = {
  __typename?: 'PendingRoom';
  waiting: Scalars['Boolean'];
};

export type Profile = {
  __typename?: 'Profile';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  encounter: Encounter;
  feedback: Feedback;
  findAllEncounters: Array<Encounter>;
  findAllProfiles: Array<Profile>;
  findProfile?: Maybe<Profile>;
  findRoomForUser?: Maybe<Room>;
  findUser?: Maybe<User>;
  login: Login;
  room: Room;
  signUp?: Maybe<SignUp>;
  userWaiting: UserWaiting;
  verifyCode?: Maybe<CheckResponse>;
  waitForRoom: PendingRoom;
};


export type QueryEncounterArgs = {
  id: Scalars['Int'];
};


export type QueryFeedbackArgs = {
  id: Scalars['Int'];
};


export type QueryFindUserArgs = {
  number: Scalars['String'];
};


export type QueryLoginArgs = {
  number: Scalars['String'];
  password: Scalars['String'];
};


export type QueryRoomArgs = {
  id: Scalars['String'];
};


export type QuerySignUpArgs = {
  number: Scalars['String'];
  password: Scalars['String'];
};


export type QueryUserWaitingArgs = {
  id: Scalars['Int'];
};


export type QueryVerifyCodeArgs = {
  code: Scalars['String'];
  request_id: Scalars['String'];
};

export type RemoveProfile = {
  __typename?: 'RemoveProfile';
  status: Scalars['String'];
};

export type RequestResponse = {
  __typename?: 'RequestResponse';
  request_id: Scalars['String'];
  status: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  /** Callee */
  callee: Profile;
  /** Callee ID */
  calleeId: Scalars['String'];
  /** Caller */
  caller: Profile;
  /** Caller ID */
  callerId: Scalars['String'];
  /** When call ended */
  ended?: Maybe<Scalars['DateTime']>;
  /** Room Id */
  id: Scalars['String'];
};

export type SharedAttributeInput = {
  /** email */
  email: Scalars['Boolean'];
  /** firstName */
  firstName: Scalars['Boolean'];
  /** lastName */
  lastName: Scalars['Boolean'];
  /** phoneNumber */
  phoneNumber: Scalars['Boolean'];
};

export type SignUp = Login | RequestResponse;

export type Subscription = {
  __typename?: 'Subscription';
  roomCreated?: Maybe<Room>;
};

export type UpdateEncounterInput = {
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type UpdateFeedbackInput = {
  /** Call Quality */
  callQuality?: Maybe<Scalars['Float']>;
  /** Whether someone wants to continue the encounter */
  continuation?: Maybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  /** Peer Rating */
  peerRating?: Maybe<Scalars['Float']>;
  /** Room ID */
  roomId?: Maybe<Scalars['String']>;
  /** Shared Attributes */
  sharedAttributes?: Maybe<SharedAttributeInput>;
};

export type UpdateProfileDto = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UpdateRoomInput = {
  /** Callee id */
  calleeId?: Maybe<Scalars['String']>;
  /** Caller id */
  callerId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  fbUserId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  password: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  role: Scalars['String'];
};

export type UserWaiting = {
  __typename?: 'UserWaiting';
  /** User Waiting ID */
  id: Scalars['Int'];
  profile: Profile;
  profileId: Scalars['String'];
  queuedAt: Scalars['String'];
};

export type CreateFeedbackMutationVariables = Exact<{
  createFeedbackInput: CreateFeedbackInput;
}>;


export type CreateFeedbackMutation = { __typename?: 'Mutation', createFeedback: { __typename?: 'Feedback', id: string } };

export type CreateProfileMutationVariables = Exact<{
  data: CreateProfileDto;
}>;


export type CreateProfileMutation = { __typename?: 'Mutation', createProfile: { __typename?: 'Profile', id: string, userId: string, email: string, firstName: string, lastName: string } };

export type CreateUserMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, fbUserId?: string | null | undefined, phoneNumber?: string | null | undefined } };

export type EncountersQueryVariables = Exact<{ [key: string]: never; }>;


export type EncountersQuery = { __typename?: 'Query', findAllEncounters: Array<{ __typename?: 'Encounter', id?: string | null | undefined, firstName?: string | null | undefined, lastName?: string | null | undefined, email?: string | null | undefined, phoneNumber?: string | null | undefined }> };

export type EnterRoomQueryVariables = Exact<{ [key: string]: never; }>;


export type EnterRoomQuery = { __typename?: 'Query', waitForRoom: { __typename?: 'PendingRoom', waiting: boolean } };

export type FindRoomQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FindRoomQuery = { __typename?: 'Query', room: { __typename?: 'Room', id: string, callerId: string, calleeId: string } };

export type LeaveRoomMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type LeaveRoomMutation = { __typename?: 'Mutation', leaveRoom: { __typename?: 'Room', id: string } };

export type LoginQueryVariables = Exact<{
  number: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Login', accessToken?: string | null | undefined } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', findProfile?: { __typename?: 'Profile', id: string, userId: string, email: string, firstName: string, lastName: string } | null | undefined };

export type SignUpQueryVariables = Exact<{
  number: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpQuery = { __typename?: 'Query', signUp?: { __typename?: 'Login', accessToken?: string | null | undefined } | { __typename?: 'RequestResponse', status: string, requestId: string } | null | undefined };

export type RoomCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoomCreatedSubscription = { __typename?: 'Subscription', roomCreated?: { __typename?: 'Room', id: string, callerId: string, calleeId: string } | null | undefined };

export type RoomForUserQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomForUserQuery = { __typename?: 'Query', findRoomForUser?: { __typename?: 'Room', id: string, callerId: string, calleeId: string } | null | undefined };

export type VerifyCodeQueryVariables = Exact<{
  code: Scalars['String'];
  requestId: Scalars['String'];
}>;


export type VerifyCodeQuery = { __typename?: 'Query', verifyCode?: { __typename?: 'CheckResponse', status: string, requestId: string, eventId: string, accessToken?: string | null | undefined } | null | undefined };


export const CreateFeedbackDocument = gql`
    mutation createFeedback($createFeedbackInput: CreateFeedbackInput!) {
  createFeedback(createFeedbackInput: $createFeedbackInput) {
    id
  }
}
    `;
export type CreateFeedbackMutationFn = Apollo.MutationFunction<CreateFeedbackMutation, CreateFeedbackMutationVariables>;

/**
 * __useCreateFeedbackMutation__
 *
 * To run a mutation, you first call `useCreateFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeedbackMutation, { data, loading, error }] = useCreateFeedbackMutation({
 *   variables: {
 *      createFeedbackInput: // value for 'createFeedbackInput'
 *   },
 * });
 */
export function useCreateFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFeedbackMutation, CreateFeedbackMutationVariables>(CreateFeedbackDocument, options);
      }
export type CreateFeedbackMutationHookResult = ReturnType<typeof useCreateFeedbackMutation>;
export type CreateFeedbackMutationResult = Apollo.MutationResult<CreateFeedbackMutation>;
export type CreateFeedbackMutationOptions = Apollo.BaseMutationOptions<CreateFeedbackMutation, CreateFeedbackMutationVariables>;
export const CreateProfileDocument = gql`
    mutation CreateProfile($data: CreateProfileDto!) {
  createProfile(data: $data) {
    id
    userId
    email
    firstName
    lastName
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($phoneNumber: String!, $password: String!) {
  createUser(data: {phoneNumber: $phoneNumber, password: $password}) {
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
 *      password: // value for 'password'
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
export const EncountersDocument = gql`
    query Encounters {
  findAllEncounters {
    id
    firstName
    lastName
    email
    phoneNumber
  }
}
    `;

/**
 * __useEncountersQuery__
 *
 * To run a query within a React component, call `useEncountersQuery` and pass it any options that fit your needs.
 * When your component renders, `useEncountersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEncountersQuery({
 *   variables: {
 *   },
 * });
 */
export function useEncountersQuery(baseOptions?: Apollo.QueryHookOptions<EncountersQuery, EncountersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EncountersQuery, EncountersQueryVariables>(EncountersDocument, options);
      }
export function useEncountersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EncountersQuery, EncountersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EncountersQuery, EncountersQueryVariables>(EncountersDocument, options);
        }
export type EncountersQueryHookResult = ReturnType<typeof useEncountersQuery>;
export type EncountersLazyQueryHookResult = ReturnType<typeof useEncountersLazyQuery>;
export type EncountersQueryResult = Apollo.QueryResult<EncountersQuery, EncountersQueryVariables>;
export const EnterRoomDocument = gql`
    query EnterRoom {
  waitForRoom {
    waiting
  }
}
    `;

/**
 * __useEnterRoomQuery__
 *
 * To run a query within a React component, call `useEnterRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnterRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnterRoomQuery({
 *   variables: {
 *   },
 * });
 */
export function useEnterRoomQuery(baseOptions?: Apollo.QueryHookOptions<EnterRoomQuery, EnterRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnterRoomQuery, EnterRoomQueryVariables>(EnterRoomDocument, options);
      }
export function useEnterRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnterRoomQuery, EnterRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnterRoomQuery, EnterRoomQueryVariables>(EnterRoomDocument, options);
        }
export type EnterRoomQueryHookResult = ReturnType<typeof useEnterRoomQuery>;
export type EnterRoomLazyQueryHookResult = ReturnType<typeof useEnterRoomLazyQuery>;
export type EnterRoomQueryResult = Apollo.QueryResult<EnterRoomQuery, EnterRoomQueryVariables>;
export const FindRoomDocument = gql`
    query FindRoom($id: String!) {
  room(id: $id) {
    id
    callerId
    calleeId
  }
}
    `;

/**
 * __useFindRoomQuery__
 *
 * To run a query within a React component, call `useFindRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindRoomQuery(baseOptions: Apollo.QueryHookOptions<FindRoomQuery, FindRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRoomQuery, FindRoomQueryVariables>(FindRoomDocument, options);
      }
export function useFindRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRoomQuery, FindRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRoomQuery, FindRoomQueryVariables>(FindRoomDocument, options);
        }
export type FindRoomQueryHookResult = ReturnType<typeof useFindRoomQuery>;
export type FindRoomLazyQueryHookResult = ReturnType<typeof useFindRoomLazyQuery>;
export type FindRoomQueryResult = Apollo.QueryResult<FindRoomQuery, FindRoomQueryVariables>;
export const LeaveRoomDocument = gql`
    mutation LeaveRoom($id: String!) {
  leaveRoom(id: $id) {
    id
  }
}
    `;
export type LeaveRoomMutationFn = Apollo.MutationFunction<LeaveRoomMutation, LeaveRoomMutationVariables>;

/**
 * __useLeaveRoomMutation__
 *
 * To run a mutation, you first call `useLeaveRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveRoomMutation, { data, loading, error }] = useLeaveRoomMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveRoomMutation(baseOptions?: Apollo.MutationHookOptions<LeaveRoomMutation, LeaveRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveRoomMutation, LeaveRoomMutationVariables>(LeaveRoomDocument, options);
      }
export type LeaveRoomMutationHookResult = ReturnType<typeof useLeaveRoomMutation>;
export type LeaveRoomMutationResult = Apollo.MutationResult<LeaveRoomMutation>;
export type LeaveRoomMutationOptions = Apollo.BaseMutationOptions<LeaveRoomMutation, LeaveRoomMutationVariables>;
export const LoginDocument = gql`
    query Login($number: String!, $password: String!) {
  login(number: $number, password: $password) {
    accessToken: access_token
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      number: // value for 'number'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const ProfileDocument = gql`
    query Profile {
  findProfile {
    id
    userId
    email
    firstName
    lastName
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const SignUpDocument = gql`
    query SignUp($number: String!, $password: String!) {
  signUp(number: $number, password: $password) {
    ... on Login {
      accessToken: access_token
    }
    ... on RequestResponse {
      requestId: request_id
      status
    }
  }
}
    `;

/**
 * __useSignUpQuery__
 *
 * To run a query within a React component, call `useSignUpQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignUpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignUpQuery({
 *   variables: {
 *      number: // value for 'number'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpQuery(baseOptions: Apollo.QueryHookOptions<SignUpQuery, SignUpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignUpQuery, SignUpQueryVariables>(SignUpDocument, options);
      }
export function useSignUpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignUpQuery, SignUpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignUpQuery, SignUpQueryVariables>(SignUpDocument, options);
        }
export type SignUpQueryHookResult = ReturnType<typeof useSignUpQuery>;
export type SignUpLazyQueryHookResult = ReturnType<typeof useSignUpLazyQuery>;
export type SignUpQueryResult = Apollo.QueryResult<SignUpQuery, SignUpQueryVariables>;
export const RoomCreatedDocument = gql`
    subscription RoomCreated {
  roomCreated {
    id
    callerId
    calleeId
  }
}
    `;

/**
 * __useRoomCreatedSubscription__
 *
 * To run a query within a React component, call `useRoomCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRoomCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>(RoomCreatedDocument, options);
      }
export type RoomCreatedSubscriptionHookResult = ReturnType<typeof useRoomCreatedSubscription>;
export type RoomCreatedSubscriptionResult = Apollo.SubscriptionResult<RoomCreatedSubscription>;
export const RoomForUserDocument = gql`
    query RoomForUser {
  findRoomForUser {
    id
    callerId
    calleeId
  }
}
    `;

/**
 * __useRoomForUserQuery__
 *
 * To run a query within a React component, call `useRoomForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomForUserQuery(baseOptions?: Apollo.QueryHookOptions<RoomForUserQuery, RoomForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomForUserQuery, RoomForUserQueryVariables>(RoomForUserDocument, options);
      }
export function useRoomForUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomForUserQuery, RoomForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomForUserQuery, RoomForUserQueryVariables>(RoomForUserDocument, options);
        }
export type RoomForUserQueryHookResult = ReturnType<typeof useRoomForUserQuery>;
export type RoomForUserLazyQueryHookResult = ReturnType<typeof useRoomForUserLazyQuery>;
export type RoomForUserQueryResult = Apollo.QueryResult<RoomForUserQuery, RoomForUserQueryVariables>;
export const VerifyCodeDocument = gql`
    query VerifyCode($code: String!, $requestId: String!) {
  verifyCode(code: $code, request_id: $requestId) {
    requestId: request_id
    eventId: event_id
    accessToken: access_token
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