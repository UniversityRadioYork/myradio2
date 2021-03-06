import React, { useState } from "react";
import { gql } from "graphql.macro";
import { UserInfo } from "./__generated__/UserInfo";
import { Dialog, Button, Intent, Classes } from "@blueprintjs/core";
import UserTimeline, { USER_TIMELINE_FRAGMENT } from "./UserTimeline";

import AllEmailsView from "./AllEmailsView";

export const USER_INFO_FRAGMENT = gql`
  fragment UserInfo on User {
    id
    itemId
    publicEmail
    college
    eduroam
    fname
    sname
    profilePhoto {
      url
    }
    phone
    bio
    email
    shows {
      id
      title
    }
    allTraining {
      id
      title
      awardedBy {
        fname
        sname
      }
      revokedBy {
        fname
        sname
      }
      revokedTime
      awardedTime
    }
    officerships {
      from_date
      till_date
      officer_name
    }
    isCurrentlyPaid
    url
    ...UserTimeline
  }
  ${USER_TIMELINE_FRAGMENT}
`;

const ViewProfile: React.FC<{ user: UserInfo }> = ({ user }) => {
  const [allEmailsOpen, setAllEmailsOpen] = useState(false);

  const currentOfficerships = user.officerships?.filter(
    (x) => x.till_date === null
  );
  return (
    <div>
      <h1>
        {user.fname} {user.sname}
      </h1>
      {currentOfficerships && currentOfficerships.length > 0 && (
        <>
          <h2>{currentOfficerships.map((x) => x.officer_name).join(", ")}</h2>
        </>
      )}
      {user.profilePhoto && (
        <img
          alt={`${user.fname} ${user.sname}`}
          src={"https://ury.org.uk" + user.profilePhoto.url}
          width={160}
          height={160}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: user.bio }} />

      <h2>Details</h2>
      {user.publicEmail !== null && (
        <p>
          <b>Email:</b> {user.publicEmail}
        </p>
      )}
      {user.email !== null && (
        <p>
          <Button
            intent={Intent.PRIMARY}
            onClick={() => setAllEmailsOpen(true)}
          >
            What emails go to this user?
          </Button>
        </p>
      )}
      {user.phone !== null && (
        <p>
          <b>Phone number:</b> {user.phone}
        </p>
      )}

      {user.allTraining !== null && (
        <>
          <h2>Training</h2>
          <ul>
            {user.allTraining
              .filter((x) => x !== null)
              .map((train) => (
                <li key={train!.id}>
                  <b>{train!.title}</b> -{" "}
                  {new Date(train!.awardedTime).toLocaleDateString()} by{" "}
                  {train!.awardedBy.fname} {train!.awardedBy.sname}
                  {train!.revokedBy !== null &&
                    `, revoked by ${train!.revokedBy.fname} ${
                      train!.revokedBy.sname
                    }`}
                </li>
              ))}
          </ul>
        </>
      )}

      {user.timeline !== null && (
        <>
          <h2>Timeline</h2>
          <UserTimeline timeline={user.timeline} />
        </>
      )}

      <Dialog
        isOpen={allEmailsOpen}
        onClose={() => setAllEmailsOpen(false)}
        lazy
      >
        <div className={Classes.DIALOG_BODY}>
          <AllEmailsView userId={user.itemId} />
        </div>
      </Dialog>
    </div>
  );
};

export default ViewProfile;
