import React from "react";
import { gql } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { Spinner, Intent } from "@blueprintjs/core";
import ViewProfile, { USER_INFO_FRAGMENT } from "./ViewProfile";
import { Me } from "./__generated__/Me";

const GET_ME = gql`
  query Me {
    me {
      ...UserInfo
    }
  }
  ${USER_INFO_FRAGMENT}
`;

const MePage: React.FC = () => {
  const { loading, error, data } = useQuery<Me>(GET_ME);

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

  return <ViewProfile user={data!.me!} />;
};

export default MePage;
