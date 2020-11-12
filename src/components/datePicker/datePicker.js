import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { getFullDate } from "../../services/services";

export default function MaterialUIPickers(props) {
  const handleDateChange = (date) => {
    let datestr = getFullDate(date, false);
    props.setValue(datestr);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <DateTimePicker
          inputVariant={props.variant ? props.variant : "standard"}
          fullWidth={props.fullWidth}
          size="small"
          margin="normal"
          id="date-picker-dialog"
          label="Ամսաթիվ"
          format="MM/dd/yyyy HH:mm"
          value={props.value}
          onChange={handleDateChange}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
