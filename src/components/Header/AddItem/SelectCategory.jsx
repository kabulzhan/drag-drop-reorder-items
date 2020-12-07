import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // width: "22.5rem",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const handleChange = (event) => {
    props.setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl
        className={classes.formControl}
        fullWidth
        error={props.error}
      >
        <InputLabel id="demo-simple-select-label">Вкладка</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.category}
          onChange={handleChange}
          fullWidth
          error={props.error}
        >
          <MenuItem value={"red"}>Красный</MenuItem>
          <MenuItem value={"blue"}>Синий</MenuItem>
          <MenuItem value={"green"}>Зелёный</MenuItem>
        </Select>
        <FormHelperText>{props.helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}
