import React, { useEffect } from "react";
import { useMyradioApi } from "../../lib/myradio/hooks";
import { showSubtype, user } from "../../lib/myradio";
import { MemberSearchResult } from "../../lib/myradio/user";
import {
  createForm,
  TextField,
  RichTextField,
  SubmitButton
} from "../../components/Forms";

interface ApplyForShowFields {
  title: string;
  description: string;
  subtype: string;
}

const ApplyForm = createForm<ApplyForShowFields>();

export const ApplyForShow: React.FC = ({}) => {
  const [, , , loadSubtypes] = useMyradioApi(showSubtype.getAll);
  useEffect(() => loadSubtypes(), []);

  const [, ,] = useMyradioApi<string, MemberSearchResult[]>(user.findByName);

  return (
    <div>
      <h1>Create a New Show</h1>
      <ApplyForm onSubmit={data => console.log(data)}>
        <TextField
          label="Show Title"
          name="title"
          validation={{ required: true }}
        />
        <RichTextField label="Description" name="description" />
        <SubmitButton name="_" />
      </ApplyForm>
    </div>
  );
};
