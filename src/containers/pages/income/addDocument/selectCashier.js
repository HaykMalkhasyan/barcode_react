


import React from "react";
import { withStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

    const handleChange = (event) => {
      setAge(event.target.value);
      props.setSelected(event.target.value)
    };
  

    return (
      <div style={{display:"flex", width:"100%"}} >
        <Select
        MenuProps={{
            disableScrollLock: true
          }}
          label="Cashier"
        style={{width:"100%", margin:"10px 0px"}}
          value={age}
          onChange={handleChange}
          className={classes.root}
          input={<OutlinedInput classes={{ input: classes.input }} />}
        >
      <MenuItem value={null}>
        <em>None</em>
      </MenuItem>
      {props.cashiers && props.cashiers.map(item=>{
        return <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
      })}
      </Select>
      </div>
    );

}

export default withStyles(styles)(SimpleSelect);