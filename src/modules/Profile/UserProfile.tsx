import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Spinner, Intent } from "@blueprintjs/core";
import ViewProfile, { USER_INFO_FRAGMENT } from "./ViewProfile";
import { GetUser, GetUserVariables } from "./__generated__/GetUser";
import { useParams } from "react-router-dom";

const GET_USER = gql`
  query GetUser($id: Int!) {
    user(itemid: $id) {
      ...UserInfo
    }
  }
  ${USER_INFO_FRAGMENT}
`;

const UserProfilePage: React.FC = () => {
  const params: { id?: string } = useParams();
  const { loading, error, data } = useQuery<GetUser, GetUserVariables>(
    GET_USER,
    {
      variables: {
        id: parseInt(params.id!, 10),
      },
    }
  );

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

  return <ViewProfile user={data!.user!} />;
};

export default UserProfilePage;
