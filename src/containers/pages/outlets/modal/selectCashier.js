// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import { withStyles } from "@material-ui/core/styles";
// const styles = {
//   root: {
//     width: "100%"
//   },
//   input: {
//     padding: "10px 14px"
//   }
// };

// export default function SimpleSelect(props) {
//   const classes = withStyles();
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//     props.setSelectedCashier(event.target.value)
//   };

//   return (
//     <Select
//     MenuProps={{
//         disableScrollLock: true
//       }}
//     style={{width:"190px"}}
//     value={age}
//       onChange={handleChange}
//       className={classes.root}
//       input={<OutlinedInput classes={{ input: classes.input }} />}
//     >
//       <MenuItem value="">
//         <em>None</em>
//       </MenuItem>
//       {props.cashiers && props.cashiers.map(item=>{
//         return <MenuItem key={item.id} value={item}>{item.firstname +  " " + item.secondname}</MenuItem>
//       })}
//     </Select>



  //   <FormControl variant="outlined" className={classes.formControl}>
  //   <InputLabel id="demo-simple-select-outlined-label">Select Cashier</InputLabel>
  //   <Select
  //     size="small"
  //     labelId="demo-simple-select-outlined-label"
  //     id="demo-simple-select-outlined"
  //     value={age}
  //     onChange={handleChange}
  //     label="Select Cashier"
  //   >
  //     <MenuItem value="">
  //       <em>None</em>
  //     </MenuItem>
  //     {props.cashiers && props.cashiers.map(item=>{
  //       return <MenuItem key={item.id} value={item}>{item.firstname +  " " + item.secondname}</MenuItem>
  //     })}
  //   </Select>
  // </FormControl>
//   );
// }



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
      props.setSelectedCashier(event.target.value)
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
        return <MenuItem key={item.id} value={item}>{item.firstname +  " " + item.secondname}</MenuItem>
      })}
      </Select>
      </div>
    );

}

export default withStyles(styles)(SimpleSelect);