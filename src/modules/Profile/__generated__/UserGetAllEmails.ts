/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserGetAllEmails
// ====================================================

export interface UserGetAllEmails_user_allEmails_destination_Officer {
  __typename: "Officer";
  name: string;
}

export interface UserGetAllEmails_user_allEmails_destination_User {
  __typename: "User";
  fname: string;
  sname: string;
}

export interface UserGetAllEmails_user_allEmails_destination_Team {
  __typename: "Team";
  name: string;
}

export interface UserGetAllEmails_user_allEmails_destination_MailingList {
  __typename: "MailingList";
  name: string;
}

export type UserGetAllEmails_user_allEmails_destination =
  | UserGetAllEmails_user_allEmails_destination_Officer
  | UserGetAllEmails_user_allEmails_destination_User
  | UserGetAllEmails_user_allEmails_destination_Team
  | UserGetAllEmails_user_allEmails_destination_MailingList;

export interface UserGetAllEmails_user_allEmails {
  __typename: "EmailDestination";
  source: string;
  reason: string;
  destination: UserGetAllEmails_user_allEmails_destination;
}

export interface UserGetAllEmails_user {
  __typename: "User";
  allEmails: (UserGetAllEmails_user_allEmails | null)[] | null;
}

export interface UserGetAllEmails {
  user: UserGetAllEmails_user | null;
}

export interface UserGetAllEmailsVariables {
  userId: number;
}
