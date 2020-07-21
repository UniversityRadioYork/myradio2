import React from "react";
import gql from "graphql-tag";
import * as Yup from "yup";
import { CreateShowInput } from "../../__generated__/globalTypes";
import { Intent, Callout } from "@blueprintjs/core";
import { useQuery } from "@apollo/react-hooks";
import { CreateShowFormData } from "./__generated__/CreateShowFormData";
import {
  Form,
  TextField,
  SelectField,
  TagField,
  SubmitButton,
} from "../../components/Forms";
import { CreditsField } from "../../components/Forms/CreditsField";

const QUERY_CREATE_SHOW_FORM_DATA = gql`
  query CreateShowFormData {
    allGenres {
      value
      text
    }
    allSubtypes {
      id
      itemId
      name
      class
    }
    allCreditTypes {
      value
      text
    }
  }
`;

// eslint-disable-next-line
const MUT_CREATE_SHOW = gql`
  mutation CreateShow($input: CreateShowInput) {
    createShow(input: $input) {
      itemId
    }
  }
`;

const initialValues: CreateShowInput = {
  title: "",
  description: "",
  credits: {
    memberid: [],
    credittype: [],
  },
  subtype: "regular",
  tags: [],
  genres: [1],
  mixclouder: true,
};

const ShowSchema = Yup.object().shape({
  title: Yup.string().required("You must give your show a name"),
  description: Yup.string().required(),
  credits: Yup.object()
    .required()
    .shape({
      memberid: Yup.array()
        .of(Yup.number().typeError("You must select a member to be credited"))
        .min(1, "At least one person must be credited"),
      credittype: Yup.array()
        .of(Yup.number())
        .min(1),
    }),
  subtype: Yup.string().required(),
  tags: Yup.array().of(Yup.string()),
  genres: Yup.array()
    .of(Yup.number())
    .min(1)
    .max(1)
    .required(),
  mixclouder: Yup.bool().notRequired(),
});

export default function CreateShowForm() {
  const {
    data: formData,
    loading: formDataLoading,
    error: formDataLoadError,
  } = useQuery<CreateShowFormData>(QUERY_CREATE_SHOW_FORM_DATA);

  return (
    <div>
      <h1>Create New Show</h1>
      <p>
        Fill out this form to create a new show. A show comes with its own
        microsite and a range of settings to make it truly yours.
      </p>
      <p>
        On the next page, you’ll have the opportunity to have the first season
        of your show scheduled. If you already have a show and want to renew it
        for another season, please do not create a new show here.
      </p>
      {formDataLoadError && (
        <Callout intent={Intent.DANGER}>
          <p>
            <b>Sorry, something went wrong!</b> Please let Computing Team know.
          </p>
          <p>
            Include this: <code>{formDataLoadError?.name}</code>
          </p>
        </Callout>
      )}
      <Form
        initialValues={initialValues}
        validationSchema={ShowSchema}
        onSubmit={(values, helpers) => {
          console.log(values, helpers);
        }}
      >
        <TextField
          name="title"
          label="Show Name"
          id="show-name"
          helper="Give your show a name. Try and make it unique."
        />

        <SelectField
          name="subtype"
          id="show-type"
          label="Show Type"
          helper="What type is your show? If unsure, select Regular"
          values={
            formDataLoading
              ? "loading"
              : formData?.allSubtypes?.map((sub) => ({
                  key: sub.id,
                  value: sub.class,
                  label: sub.name,
                })) || []
          }
        />

        <SelectField
          name="genres[0]"
          id="show-genre"
          label="Genre"
          helper="What genre of music do you play, if any?"
          values={
            formDataLoading
              ? "loading"
              : formData?.allGenres?.map((g) => ({
                  key: g.value.toString(10),
                  value: g.value.toString(10),
                  label: g.text,
                })) || []
          }
        />

        <CreditsField
          name="credits"
          id="show-credits"
          label="Credits"
          helper="Who's featured on your show?"
        />

        <TagField
          name="tags"
          id="show-tags"
          label="Tags"
          helper="Give your show a set of tags that describe it."
        />

        <SubmitButton />
      </Form>
    </div>
  );
}
