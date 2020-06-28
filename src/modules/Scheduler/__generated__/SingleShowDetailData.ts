/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SingleShowDetailData
// ====================================================

export interface SingleShowDetailData_show_allSeasons_allTimeslots {
  __typename: "Timeslot";
  itemId: number;
  startTime: any;
  endTime: any;
  timeslotNumber: number;
}

export interface SingleShowDetailData_show_allSeasons {
  __typename: "Season";
  id: string;
  itemId: number;
  seasonNumber: number;
  firstTime: any | null;
  allTimeslots: (SingleShowDetailData_show_allSeasons_allTimeslots | null)[] | null;
}

export interface SingleShowDetailData_show {
  __typename: "Show";
  id: string;
  allSeasons: (SingleShowDetailData_show_allSeasons | null)[] | null;
}

export interface SingleShowDetailData {
  show: SingleShowDetailData_show | null;
}

export interface SingleShowDetailDataVariables {
  itemId: number;
}
