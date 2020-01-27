import React from "react";
import { RouteComponentProps } from "react-router-dom";

export const MyRadioBodge: React.FC<RouteComponentProps> = ({ location }) => {
  const iframeRef = React.createRef<HTMLIFrameElement>();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <iframe
        ref={iframeRef}
        src={
          "https://ury.org.uk/myradio/" +
          location.pathname +
          (location.search.length > 0
            ? location.search + "&nonav=true"
            : "?nonav=true")
        }
        style={{ width: "100%", flex: 1, height: "100%", border: "none" }}
      />
    </div>
  );
};
