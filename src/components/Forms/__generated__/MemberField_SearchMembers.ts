/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MemberField_SearchMembers
// ====================================================

export interface MemberField_SearchMembers_findMemberByName {
  __typename: "MemberSearchResult";
  id: number;
  itemId: number;
  fname: string;
  sname: string;
  localAlias: string | null;
  eduroam: string | null;
}

export interface MemberField_SearchMembers {
  findMemberByName: MemberField_SearchMembers_findMemberByName[];
}

export interface MemberField_SearchMembersVariables {
  query: string;
  limit?: number | null;
}
