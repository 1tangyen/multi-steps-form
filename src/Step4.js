import React from "react";
import {
  Container,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const StyledInfo = ({ label, value }) => (
  <TableRow>
    <TableCell variant="head">
      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
        {label}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant="body1">{value}</Typography>
    </TableCell>
  </TableRow>
);

function Step4({ formData, handleBack, fullQuery }) {
  const handleConfirm = () => {
    console.log("Confirmed");
    console.log("Selected Queries:");
    console.log("Start Date:", formData.dateData.dateData.startDate);
    console.log("End Date:", formData.dateData.dateData.endDate);
    console.log(
      "Previous Start Date:",
      formData.dateData.dateData.prevStartDate
    );
    console.log("Previous End Date:", formData.dateData.dateData.prevEndDate);
    console.log("Full Names:", fullQuery.fullNames.join(", "));
    console.log("Restaurants:", fullQuery.restaurants.join(", "));
    console.log("Tried:", fullQuery.tried.join(", "));
    console.log("Country:", fullQuery.country.join(", "));
    console.log("City:", fullQuery.city.join(", "));
  };
  return (
    <Container>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography
          variant="h4"
          style={{ color: "#83BCA9", marginBottom: "1rem" }}
        >
          Step 4: Review and Confirm
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Field</TableCell>
                <TableCell variant="head">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledInfo
                label="Start Date:"
                value={formData.dateData.dateData.startDate}
              />
              <StyledInfo
                label="End Date:"
                value={formData.dateData.dateData.endDate}
              />
              <StyledInfo
                label="Previous Start Date:"
                value={formData.dateData.dateData.prevStartDate}
              />
              <StyledInfo
                label="Previous End Date:"
                value={formData.dateData.dateData.prevEndDate}
              />
              <StyledInfo
                label="Full Names:"
                value={fullQuery.fullNames.join(", ")}
              />
              <StyledInfo
                label="Restaurants:"
                value={fullQuery.restaurants.join(", ")}
              />
              <StyledInfo label="Tried:" value={fullQuery.tried.join(", ")} />
              <StyledInfo
                label="Country:"
                value={fullQuery.country.join(", ")}
              />
              <StyledInfo label="City:" value={fullQuery.city.join(", ")} />
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: "2rem" }}>
          <Button
            variant="outlined"
            onClick={() => {
              handleBack();
            }}
            style={{
              borderRadius: 55,
              borderColor: "#83BCA9",
              color: "#83BCA9",
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            style={{
              borderRadius: 55,
              backgroundColor: "#83BCA9",
              color: "#fff",
              marginLeft: "1rem",
            }}
          >
            Confirm
          </Button>
        </div>
      </Paper>
    </Container>
  );
}

export default Step4;
