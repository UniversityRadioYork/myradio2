/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_profilePhoto {
  __typename: "Photo";
  url: string;
}

export interface GetUser_user_shows {
  __typename: "Show";
  id: string;
  title: string;
}

export interface GetUser_user_allTraining_awardedBy {
  __typename: "User";
  fname: string;
  sname: string;
}

export interface GetUser_user_allTraining_revokedBy {
  __typename: "User";
  fname: string;
  sname: string;
}

export interface GetUser_user_allTraining {
  __typename: "UserTrainingStatus";
  id: string;
  title: string;
  awardedBy: GetUser_user_allTraining_awardedBy;
  revokedBy: GetUser_user_allTraining_revokedBy | null;
  revokedTime: any | null;
  awardedTime: any;
}

export interface GetUser_user_officerships {
  __typename: "MemberOfficership";
  from_date: any;
  till_date: any | null;
  officer_name: string;
}

export interface GetUser_user_timeline {
  __typename: "UserTimelineEntry";
  message: string | null;
  timestamp: any | null;
  photo: string | null;
}

export interface GetUser_user {
  __typename: "User";
  id: string;
  itemId: number;
  publicEmail: string | null;
  college: string | null;
  eduroam: string | null;
  fname: string;
  sname: string;
  profilePhoto: GetUser_user_profilePhoto | null;
  phone: string | null;
  bio: any | null;
  email: string | null;
  shows: GetUser_user_shows[] | null;
  allTraining: (GetUser_user_allTraining | null)[] | null;
  officerships: GetUser_user_officerships[] | null;
  isCurrentlyPaid: boolean | null;
  url: string | null;
  timeline: GetUser_user_timeline[] | null;
}

export interface GetUser {
  user: GetUser_user | null;
}

export interface GetUserVariables {
  id: number;
}
