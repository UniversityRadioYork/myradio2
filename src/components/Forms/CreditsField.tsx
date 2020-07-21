import React from "react";
import {
  useFormikContext,
  FieldInputProps,
} from "formik";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button, Intent, Colors, HTMLSelect } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { CreditsField_CreditTypes } from "./__generated__/CreditsField_CreditTypes";
import { MemberFieldlet } from "./MemberFieldlet";

const QUERY_CREDIT_TYPES = gql`
  query CreditsField_CreditTypes {
    allCreditTypes {
      id: text
      text
      value
    }
    me {
      itemId
    }
  }
`;

export interface CreditsFieldProps {
  name: string;
  id: string;
  label: string;
  helper?: string;
}

export function CreditsField(props: CreditsFieldProps) {
  const formik = useFormikContext<any>();
  const { data, loading, error } = useQuery<CreditsField_CreditTypes>(
    QUERY_CREDIT_TYPES,
    {
      onCompleted: (data) => {
        if (formik.values[props.name].memberid.length === 0) {
          formik.setFieldValue(props.name, {
            memberid: [data.me?.itemId],
            credittype: [1],
          });
        }
      },
    }
  );
  return (
    <>
      <label htmlFor="show-title" className="form-label">
        {props.label}
      </label>
      <div className="bp3-form-content form-field">
        <div style={{ display: "grid", gridTemplateColumns: "64px 1fr auto" }}>
          {formik.values[props.name].memberid.map((_: any, idx: number) => (
            <>
              <Button
                key={formik.values[props.name].memberid[idx] + "del"}
                minimal
                intent={Intent.DANGER}
                icon={IconNames.TRASH}
                onClick={() => {
                  const val = formik.values[props.name];
                  val.memberid.splice(idx, 1);
                  val.credittype.splice(idx, 1);
                  formik.setFieldValue(props.name, val);
                }}
              />
              <MemberFieldlet
                key={formik.values[props.name].memberid[idx] + "mbr"}
                name={`${props.name}.memberid[${idx}]`}
              />
              <HTMLSelect
                key={formik.values[props.name].memberid[idx] + "typ"}
                {...(formik.getFieldProps(
                  `${props.name}.credittype[${idx}]`
                ) as Omit<FieldInputProps<any>, "multiple">)}
              >
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  data?.allCreditTypes?.map((ct) => (
                    <option key={ct.value} value={ct.value}>
                      {ct.text}
                    </option>
                  ))
                )}
              </HTMLSelect>
            </>
          ))}
        </div>
        <Button
          onClick={() =>
            formik.setFieldValue(
              props.name,
              {
                memberid: [...formik.values.credits.memberid, null],
                credittype: [...formik.values.credits.credittype, 1],
              },
              false
            )
          }
        >
          Add New
        </Button>
        <div className="bp3-helper-text">Who's on your show?</div>
        {/* TODO uniqueness checking */}
        {formik.touched[props.name] && formik.errors[props.name] && (
          <div
            className="bp3-helper-text"
            style={{ color: Colors.RED1, fontWeight: "bold" }}
          >
            {Array.isArray((formik.errors[props.name] as any).memberid)
              ? (formik.errors[props.name] as any).memberid.filter(
                  (x: any) => !!x
                )[0]
              : typeof (formik.errors[props.name] as any)?.memberid === "string"
              ? (formik.errors[props.name] as any)?.memberid
              : ""}
          </div>
        )}
        {error && (
            <div
            className="bp3-helper-text"
            style={{ color: Colors.RED1, fontWeight: "bold" }}
          >
              Failed to load credit types! <code>{error.toString()}</code>
            </div>
        )}
      </div>
    </>
  );
}
