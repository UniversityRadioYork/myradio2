import React from "react";
import gql from "graphql-tag";
import classNames from "classnames";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateShowInput } from "../../__generated__/globalTypes";
import { Colors, Intent, Callout, Button } from "@blueprintjs/core";
import { Prompt } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { CreateShowFormData } from "./__generated__/CreateShowFormData";
import { IconNames } from "@blueprintjs/icons";

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
    memberid: [null],
    credittype: [1],
  },
  subtype: "",
  tags: [],
  genres: [],
  mixclouder: true,
};

const ShowSchema = Yup.object().shape({
  title: Yup.string().required("You must give your show a name"),
  description: Yup.string().required(),
  credits: Yup.object()
    .required()
    .shape({
      memberid: Yup.array()
        .of(Yup.number())
        .min(1),
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
    <>
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
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          throw new Error("TODO");
        }}
        validationSchema={ShowSchema}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "grid", gridTemplateColumns: "auto 1fr" }}
          >
            <Prompt
              when={Object.keys(formik.touched).some(
                (k) => (formik.touched as any)[k]
              )}
              message="You have unsaved changes. Are you sure you want to close this page?"
            />

            <label htmlFor="show-title" style={{ gridColumn: 1 }}>
              Show Name
            </label>
            <div className="bp3-form-content" style={{ gridColumn: 2 }}>
              <input
                id="show-title"
                type="text"
                className={classNames({
                  "bp3-intent-danger":
                    formik.touched.title && formik.errors.title,
                })}
                {...formik.getFieldProps("title")}
              />
              <div className="bp3-helper-text">
                Give your show a name. Try and make it unique.
              </div>
              {/* TODO uniqueness checking */}
              {formik.touched.title && formik.errors.title && (
                <div
                  className="bp3-helper-text"
                  style={{ color: Colors.RED1, fontWeight: "bold" }}
                >
                  {formik.errors.title}
                </div>
              )}
            </div>

            <label htmlFor="show-title" style={{ gridColumn: 1 }}>
              Type
            </label>
            <div className="bp3-form-content" style={{ gridColumn: 2 }}>
              <select {...formik.getFieldProps("subtype")}>
                {formDataLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  formData?.allSubtypes?.map((subtype) => (
                    <option key={subtype.id} value={subtype.class}>
                      {subtype.name}
                    </option>
                  ))
                )}
              </select>
              <div className="bp3-helper-text">
                What type is your show? If unsure, leave it as Regular.
              </div>
              {/* TODO uniqueness checking */}
              {formik.touched.subtype && formik.errors.subtype && (
                <div
                  className="bp3-helper-text"
                  style={{ color: Colors.RED1, fontWeight: "bold" }}
                >
                  {formik.errors.subtype}
                </div>
              )}
            </div>

            <label htmlFor="show-title" style={{ gridColumn: 1 }}>
              Genre
            </label>
            <div className="bp3-form-content" style={{ gridColumn: 2 }}>
              <select {...formik.getFieldProps("genres[0]")}>
                {formDataLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  formData?.allGenres?.map((genre) => (
                    <option key={genre.value} value={genre.value}>
                      {genre.text}
                    </option>
                  ))
                )}
              </select>
              <div className="bp3-helper-text">
                What genre of music do you play, if any?
              </div>
              {/* TODO uniqueness checking */}
              {formik.touched.genres && formik.errors.genres && (
                <div
                  className="bp3-helper-text"
                  style={{ color: Colors.RED1, fontWeight: "bold" }}
                >
                  {formik.errors.genres}
                </div>
              )}
            </div>

            <label htmlFor="show-title" style={{ gridColumn: 1 }}>
              Credits
            </label>
            <div className="bp3-form-content" style={{ gridColumn: 2 }}>
              {formik.values.credits.memberid.map((_, idx) => (
                <div key={idx}>
                  <Button intent={Intent.DANGER} icon={IconNames.TRASH} />
                  <input
                    type="number"
                    {...formik.getFieldProps(`credits.memberid[${idx}]`)}
                  />
                  <select
                    {...formik.getFieldProps(`credits.credittype[${idx}]`)}
                  >
                    {formDataLoading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      formData?.allCreditTypes?.map((ct) => (
                        <option key={ct.value} value={ct.value}>
                          {ct.text}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              ))}
              <Button onClick={() => formik.setFieldValue("credits", {
                memberid: [...formik.values.credits.memberid, null],
                credittype: [...formik.values.credits.credittype, 1]
              }, false)}>Add New</Button>
              <div className="bp3-helper-text">Who's on your show?</div>
              {/* TODO uniqueness checking */}
              {formik.touched.credits && formik.errors.credits && (
                <div
                  className="bp3-helper-text"
                  style={{ color: Colors.RED1, fontWeight: "bold" }}
                >
                  {formik.errors.credits}
                </div>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
