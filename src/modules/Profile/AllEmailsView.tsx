import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  UserGetAllEmails,
  UserGetAllEmailsVariables,
  UserGetAllEmails_user_allEmails_destination,
  UserGetAllEmails_user_allEmails_destination_Officer,
  UserGetAllEmails_user_allEmails_destination_Team,
  UserGetAllEmails_user_allEmails_destination_MailingList,
} from "./__generated__/UserGetAllEmails";
import { Spinner, Intent } from "@blueprintjs/core";

const GET_ALL_EMAILS = gql`
  query UserGetAllEmails($userId: Int!) {
    user(itemid: $userId) {
      allEmails {
        source
        reason
        destination {
          __typename
          ... on Officer {
            name
          }
          ... on User {
            fname
            sname
          }
          ... on Team {
            name
          }
          ... on MailingList {
            name
          }
        }
      }
    }
  }
`;

function getEmailReason(
  reason: string,
  destination: UserGetAllEmails_user_allEmails_destination
) {
  switch (reason) {
    case "personal":
    case "member":
      return <>because it's a personal alias</>;
    case "officer":
      return <>because of your <em>{
        (destination as UserGetAllEmails_user_allEmails_destination_Officer)
          .name
      }</em> officership</>;
    case "team":
      return <>because of your <em>{
        (destination as UserGetAllEmails_user_allEmails_destination_Team).name
      } Team</em> membership</>;
    case "list_auto":
      return <>because you're automatically added to the <em>{
        (destination as UserGetAllEmails_user_allEmails_destination_MailingList)
          .name
      }</em> mailing list</>;
    case "list_optin":
      return <>because you've subscribed to the <em>{
        (destination as UserGetAllEmails_user_allEmails_destination_MailingList)
          .name
      }</em> mailing list</>;
  }
}

export default function AllEmailsView(props: { userId: number }) {
  const { data, error, loading } = useQuery<
    UserGetAllEmails,
    UserGetAllEmailsVariables
  >(GET_ALL_EMAILS, {
    variables: {
      userId: props.userId,
    },
  });
  if (loading) {
    return (
      <div>
        <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_LARGE} />
        <b>Loading...</b>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <b>Whoops! Something exploded!</b>
        <p>
          <code>{error.toString()}</code>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3>You get emails from&hellip;</h3>
      <table>
        <tbody>
          {data?.user?.allEmails
            ?.filter((x) => x !== null)
            .sort((a, b) => a!.source!.localeCompare(b!.source!))
            .map((val) => (
              <tr key={val!.source}>
                <td>
                  <code>{val!.source}</code>
                </td>{" "}
                <td>{getEmailReason(val!.reason!, val!.destination!)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
