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

    function handleChange(e) {
        props.setDisscount(+e.target.value)
    }

    return (
      <div style={{display:"flex", width:"100%"}} >
        <OutlinedInput
            onFocus={(e)=>{e.target.select()}}
            className={classes.root}
            classes={{ input: classes.input }}
            value={props.disscount}
            onChange={(e)=>{handleChange(e)}}
            placeholder="Զեղչ"
            type="number"
        />
        <Select
        MenuProps={{
            disableScrollLock: true
          }}
        style={{width:"190px"}}
          value={props.disscountType}
          onChange={(e)=>{props.setDisscountType(e.target.value)}}
          className={classes.root}
          input={<OutlinedInput classes={{ input: classes.input }} />}
        >
          <MenuItem value={"percent"}>Տոկոսային</MenuItem>
          <MenuItem value={"cash"}>Դրամային</MenuItem>
        </Select>
      </div>
    );

}

export default withStyles(styles)(SimpleSelect);