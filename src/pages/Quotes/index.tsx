import React, { useEffect } from "react";
import { useMyradioApi } from "../../lib/myradio/hooks";
import * as myradio from "../../lib/myradio";
import { Card, Spinner, Button, Intent } from "@blueprintjs/core";

export const QuotesPage: React.FC = () => {
  const [quotes, loading, error, fetchData] = useMyradioApi(
    myradio.quotes.getAll
  );
  useEffect(() => fetchData(), []);
  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div>
        <b>Oh noes!</b>
        <code>{error.toString()}</code>
      </div>
    );
  }
  if (quotes === null) {
    return null;
  }
  return (
    <div>
      <h1>Quotes Board</h1>
      <div>
        <Button disabled intent={Intent.PRIMARY}>Add Quote</Button>
      </div>
      <div style={{ marginTop: 4 }}>
        {quotes.map(q => (
          <Card key={q.id}>
            <div>
              <b>{q.source}</b> <small>{q.date}</small>
            </div>
            <span dangerouslySetInnerHTML={{ __html: q.text }} />
          </Card>
        ))}
      </div>
    </div>
  );
};
