/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me_profilePhoto {
  __typename: "Photo";
  url: string;
}

export interface Me_me_shows {
  __typename: "Show";
  id: string;
  title: string;
}

export interface Me_me_allTraining_awardedBy {
  __typename: "User";
  fname: string;
  sname: string;
}

export interface Me_me_allTraining_revokedBy {
  __typename: "User";
  fname: string;
  sname: string;
}

export interface Me_me_allTraining {
  __typename: "UserTrainingStatus";
  id: string;
  title: string;
  awardedBy: Me_me_allTraining_awardedBy;
  revokedBy: Me_me_allTraining_revokedBy | null;
  revokedTime: any | null;
  awardedTime: any;
}

export interface Me_me_officerships {
  __typename: "MemberOfficership";
  from_date: any;
  till_date: any | null;
  officer_name: string;
}

export interface Me_me_timeline {
  __typename: "UserTimelineEntry";
  message: string | null;
  timestamp: any | null;
  photo: string | null;
}

export interface Me_me {
  __typename: "User";
  id: string;
  itemId: number;
  publicEmail: string | null;
  college: string | null;
  eduroam: string | null;
  fname: string;
  sname: string;
  profilePhoto: Me_me_profilePhoto | null;
  phone: string | null;
  bio: any | null;
  email: string | null;
  shows: Me_me_shows[] | null;
  allTraining: (Me_me_allTraining | null)[] | null;
  officerships: Me_me_officerships[] | null;
  isCurrentlyPaid: boolean | null;
  url: string | null;
  timeline: Me_me_timeline[] | null;
}

export interface Me {
  me: Me_me | null;
}
