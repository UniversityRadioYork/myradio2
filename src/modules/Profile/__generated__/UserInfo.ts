/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo_profilePhoto {
  __typename: "Photo";
  url: string;
}

export interface UserInfo_shows {
  __typename: "Show";
  id: string;
  title: string;
}

export interface UserInfo_allTraining_awardedBy {
  __typename: "User";
  fname: string;
  sname: string;
}

export interface UserInfo_allTraining_revokedBy {
  __typename: "User";
  fname: string;
  sname: string;
}

export interface UserInfo_allTraining {
  __typename: "UserTrainingStatus";
  id: string;
  title: string;
  awardedBy: UserInfo_allTraining_awardedBy;
  revokedBy: UserInfo_allTraining_revokedBy | null;
  revokedTime: any | null;
  awardedTime: any;
}

export interface UserInfo_officerships {
  __typename: "MemberOfficership";
  from_date: any;
  till_date: any | null;
  officer_name: string;
}

export interface UserInfo_timeline {
  __typename: "UserTimelineEntry";
  message: string | null;
  timestamp: any | null;
  photo: string | null;
}

export interface UserInfo {
  __typename: "User";
  id: string;
  itemId: number;
  publicEmail: string | null;
  college: string | null;
  eduroam: string | null;
  fname: string;
  sname: string;
  profilePhoto: UserInfo_profilePhoto | null;
  phone: string | null;
  bio: any | null;
  email: string | null;
  shows: UserInfo_shows[] | null;
  allTraining: (UserInfo_allTraining | null)[] | null;
  officerships: UserInfo_officerships[] | null;
  isCurrentlyPaid: boolean | null;
  url: string | null;
  timeline: UserInfo_timeline[] | null;
}
