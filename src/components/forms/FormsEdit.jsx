import React, { useEffect, useState } from "react";
import {
  Edit,
  TextInput,
  required,
  TabbedForm,
  FormTab,
  BooleanInput,
  DateInput,
  SelectInput,
  RadioButtonGroupInput,
} from "react-admin";
import { usePermissions } from "react-admin";
import MyFormsEdit from "./MyFormsEdit";

const FormsEdit = (props) => {
  const { permissions } = usePermissions();
  return permissions === "Admin" ? (
    <Edit {...props} undoable="false" mutationMode="pessimistic">
      <TabbedForm>
        <FormTab label="lens edit" sx={{ maxWidth: "40em" }}>
          <MyFormsEdit></MyFormsEdit>
        </FormTab>
      </TabbedForm>
    </Edit>
  ) : (
    <div>No access</div>
  );
};
export default FormsEdit;
