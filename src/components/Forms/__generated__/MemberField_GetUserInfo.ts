/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MemberField_GetUserInfo
// ====================================================

export interface MemberField_GetUserInfo_user {
  __typename: "User";
  id: string;
  itemId: number;
  fname: string;
  sname: string;
  localAlias: string | null;
  eduroam: string | null;
}

export interface MemberField_GetUserInfo {
  user: MemberField_GetUserInfo_user | null;
}

export interface MemberField_GetUserInfoVariables {
  memberid: number;
}
