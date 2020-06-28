import React, { FormEvent, useState } from "react";
import { getPageHTML } from "../../lib/ceedox";
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";

export function CeedoxTestPage() {
  const [page, setPage] = useState("");
  const [html, setHtml] = useState<string | null>(null);

  async function get() {
    if (page.length > 0) {
      setHtml(await getPageHTML(page));
    }
  }

  return (
    <div>
      <div>
        <ControlGroup>
          <InputGroup
            placeholder="Enter page"
            value={page}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setPage(e.currentTarget.value)
            }
          />
          <Button onClick={get} text="Load" />
        </ControlGroup>
      </div>

      {html !== null && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}
