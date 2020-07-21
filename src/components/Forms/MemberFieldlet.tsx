import React, { useEffect } from "react";
import gql from "graphql-tag";
import { Suggest } from "@blueprintjs/select";
import { useField, useFormikContext } from "formik";
import { debounce } from "lodash";
import { useLazyQuery, useApolloClient } from "@apollo/react-hooks";
import {
  MemberField_GetUserInfo,
  MemberField_GetUserInfoVariables,
  MemberField_GetUserInfo_user,
} from "./__generated__/MemberField_GetUserInfo";
import {
  MemberField_SearchMembers,
  MemberField_SearchMembersVariables,
} from "./__generated__/MemberField_SearchMembers";
import { MenuItem, Intent, Spinner } from "@blueprintjs/core";

const QUERY_GET_USER_INFO = gql`
  query MemberField_GetUserInfo($memberid: Int!) {
    user(itemid: $memberid) {
      id
      itemId
      fname
      sname
      localAlias
      eduroam
    }
  }
`;

const QUERY_SEARCH_MEMBERS = gql`
  query MemberField_SearchMembers($query: String!, $limit: Int) {
    findMemberByName(name: $query, limit: $limit) {
      id: memberid
      itemId: memberid
      fname
      sname
      localAlias: local_alias
      eduroam
    }
  }
`;

type FieldletUserInfo = Omit<
  MemberField_GetUserInfo_user,
  "__typename" | "id"
> & {
  id: string | number;
};

const MemberSuggest = Suggest.ofType<FieldletUserInfo>();

export interface MemberFieldletProps {
  name: string;
}

export function MemberFieldlet(props: MemberFieldletProps) {
  const [field, meta, helpers] = useField(props.name);
  const formik = useFormikContext();
  const apollo = useApolloClient();
  const [
    getMemberData,
    { data: memberData, loading: memberDataLoading }, // TODO error handling
  ] = useLazyQuery<MemberField_GetUserInfo, MemberField_GetUserInfoVariables>(
    QUERY_GET_USER_INFO
  );

  useEffect(() => {
    if (typeof field.value === "number" && field.value > 0) {
      getMemberData({ variables: { memberid: field.value } });
    }
  }, [field.value, getMemberData]);

  const [
    search,
    { data: searchResults, loading: searching }, // TODO error handling
  ] = useLazyQuery<
    MemberField_SearchMembers,
    MemberField_SearchMembersVariables
  >(QUERY_SEARCH_MEMBERS, {
    onCompleted: (data) => {
      // Warm up the cache
      data.findMemberByName.forEach((data) => {
        apollo.query<MemberField_GetUserInfo, MemberField_GetUserInfoVariables>(
          {
            query: QUERY_GET_USER_INFO,
            variables: {
              memberid: data.itemId,
            },
          }
        );
      });
    },
  });

  const debouncedSearch = debounce(
    (q) => search({ variables: { query: q } }),
    150
  );

  return (
    <span>
      <MemberSuggest
        selectedItem={memberData?.user}
        items={searchResults?.findMemberByName || []}
        onItemSelect={(val) => helpers.setValue(val.itemId)}
        inputValueRenderer={(item) =>
          !memberDataLoading && typeof item === "object"
            ? `${item.fname} ${item.sname} (${item.localAlias || item.eduroam})`
            : "Loading..."
        }
        className="popover-hack"
        itemRenderer={(item, props) => (
          <MenuItem
            key={item.itemId}
            text={`${item.fname} ${item.sname} (${item.localAlias ||
              item.eduroam})`}
            onClick={props.handleClick}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
          />
        )}
        onQueryChange={debouncedSearch}
        inputProps={{
          intent: meta.touched && !!meta.error ? Intent.DANGER : undefined,
        }}
        disabled={formik.isSubmitting}
      />
      {searching && <Spinner size={Spinner.SIZE_SMALL} />}
    </span>
  );
}
