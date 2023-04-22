import * as React from "react";
import {
  Create,
  TabbedForm,
  FormTab,
  TextInput,
  required,
  BooleanInput,
  DateInput,
  SelectInput,
  RadioButtonGroupInput,
} from "react-admin";

const FormsCreate = () => {
  function randGen(length) {
    const abc =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let name = "";
    while (name.length < length) {
      name += abc[Math.floor(Math.random() * abc.length)];
    }
    return name;
  }
  const [typeData, setTypeData] = React.useState({ type: "" });

  const handleTypeChange = (event) => {
    setTypeData({ ...typeData, type: event.target.value });
  };

  return (
    <Create>
      <TabbedForm>
        <FormTab label="form create" sx={{ maxWidth: "40em" }}>
        <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            defaultValue={randGen(40)}
            format={(value) => `${process.env.REACT_APP_CLIENT_URL}${value}`}
            validate={required()}
            source="link"
            disabled
          />

          <RadioButtonGroupInput
            source="type"
            validate={required()}
            onChange={handleTypeChange}
            choices={[
              { id: "Individual", name: "Individual" },
              { id: "Collective", name: "Collective" },
            ]}
          />
          <BooleanInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            validate={required()}
            source="isPublish"
          />
          <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="departingFrom"
          />
          <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="finalDestination"
          />
          <DateInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="depatureDate"
          />
          <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="airline"
          />
          <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="flightNumber"
          />
          <RadioButtonGroupInput
            source="flightDisruption"
            validate={required()}
            choices={[
              { id: "delayed", name: "My flight was delayed" },
              { id: "canceled", name: "My flight was canceled" },
            ]}
          />

          <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="delayLength"
          />
          <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="delayReason"
          />
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="firstName"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="lastName"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="email"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="phoneNumber"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="referenceNumber"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="adressLine1"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="adressLine2"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="city"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="postalCode"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="state"
            />
          )}
          {typeData.type === "Individual" && (
            <TextInput
              sx={{ minWidth: "67vh" }}
              sortable={false}
              source="country"
            />
          )}

          <SelectInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="assistanceType"
            choices={[
              { id: "food", name: "Food" },
              { id: "accommodation", name: "Accommodation" },
              { id: "transport", name: "Transport" },
              { id: "none", name: "None" },
            ]}
          />

          <TextInput
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="assistanceDetails"
          />
        </FormTab>
      </TabbedForm>
    </Create>
  );
};

export default FormsCreate;
