/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserTimeline
// ====================================================

export interface UserTimeline_timeline {
  __typename: "UserTimelineEntry";
  message: string | null;
  timestamp: any | null;
  photo: string | null;
}

export interface UserTimeline {
  __typename: "User";
  timeline: UserTimeline_timeline[] | null;
}
