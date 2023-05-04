import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {

  const {attr,attrList,setAttr} = props;

  const handleChange = (event) => {
    event.preventDefault();
    let newAttr = event.target.value;
    setAttr(newAttr);
  };


  return (
    <Box sx={{ minWidth: 150 }} >
      <FormControl sx={{width: 120}}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={attr}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"GP"}>GP</MenuItem>
          <MenuItem value={"KD"}>KD</MenuItem>
          <MenuItem value={"FB"}>FB</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
