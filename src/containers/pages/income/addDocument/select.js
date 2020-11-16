


import React from "react";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from "@material-ui/core";

const styles = {
  root: {
    width: "100%"
  },
  input: {
    padding: "10px 14px"
  }
};

function SimpleSelect(props) {
    const { classes } = props;

    const [age, setAge] = React.useState(null);

    const handleChange = (event, newValue) => {
      console.log('newValue', newValue)
      setAge(newValue);
      props.setSelected(newValue)
    };
  

    return (
      <div style={{display:"flex", width:"100%", flexDirection:"column"}} >
        {/* <Select
        MenuProps={{
            disableScrollLock: true
          }}
          error={props.error}
          label="Cashier"
        style={{width:"100%", margin:"0px"}}
          value={age}
          margin="none"
          onChange={handleChange}
          className={classes.root}
          input={<OutlinedInput classes={{ input: classes.input }} />}
        >
      <MenuItem value={null}>
        <em>None</em>
      </MenuItem>
      {props.values && props.values.map(item=>{
        return <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
      })}
      </Select> */}
      <Autocomplete
      MenuProps={{
        disableScrollLock: true
      }}
      error={props.error}
      style={{width:"100%", margin:"0px"}}
      value={age}
      onChange={handleChange}
      id="combo-box-demo"
      options={props.values ? props.values : []}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" />}
    />
      </div>
    );

}

export default withStyles(styles)(SimpleSelect);