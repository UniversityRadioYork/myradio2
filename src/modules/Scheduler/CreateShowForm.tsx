import React from "react";
import gql from "graphql-tag";
import classNames from "classnames";
import { Formik } from "formik";
import * as Yup from "yup";
import { CreateShowInput } from "../../__generated__/globalTypes";
import { Colors } from "@blueprintjs/core";
import { Prompt } from "react-router-dom";

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
  subtype: "",
  tags: [],
  genres: [],
  mixclouder: true,
};

const ShowSchema = Yup.object().shape({
  title: Yup.string().required(),
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
          </form>
        )}
      </Formik>
    </>
  );
}
