import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    props.setSelectedCashier(event.target.value)
  };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">Select Cashier</InputLabel>
    <Select
      labelId="demo-simple-select-outlined-label"
      id="demo-simple-select-outlined"
      value={age}
      onChange={handleChange}
      label="Select Cashier"
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {props.cashiers && props.cashiers.map(item=>{
        return <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
      })}
    </Select>
  </FormControl>
  );
}
