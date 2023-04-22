import React from "react";
import { usePermissions } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  SearchInput,
  BooleanField,
  required,
  DateField,
  BooleanInput,
  FunctionField

} from "react-admin";

const postFilter = [<SearchInput source="lastName" />];

const FormsList = (props) => {
  const { permissions } = usePermissions();


  
  return permissions === "Admin" ? (
    <List    filters={postFilter}
      // queryOptions={{ refetchInterval: 5000 }}
      {...props}
      pagination={false}
    >
      <Datagrid 
      //bulkActionButtons={false}
      >
          <TextField sx={{ minWidth: "67vh" }} disabled source="id" />
          <FunctionField
          label="link"
          render={(record) => `${process.env.REACT_APP_CLIENT_URL}${record.link}`}
        />
          <TextField sx={{ minWidth: "67vh" }} sortable={false} source="type" />
          <BooleanField 
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="isPublish"
          />
          {/* <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="departingFrom"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="finalDestination"
          />
          <DateField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="depatureDate"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="airline"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="flightNumber"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="flightDisruption"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="delayLength"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="delayReason"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="firstName"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="lastName"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="email"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="phoneNumber"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="referenceNumber"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="adressLine1"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="adressLine2"
          />
          <TextField sx={{ minWidth: "67vh" }} sortable={false} source="city" />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="postalCode"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="state"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="country"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="assistanceType"
          />
          <TextField
            sx={{ minWidth: "67vh" }}
            sortable={false}
            source="assistanceDetails"
          /> */}

        <EditButton />
        <DeleteButton undoable="false" mutationMode="pessimistic" />;
      </Datagrid>
    </List>
  ) : (
    <div>No access</div>
  );
};

export default FormsList;
