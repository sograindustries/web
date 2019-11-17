import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";

interface Props<T> {
  values: T[];
  onValueSelected: (value: T) => void;
}

function RelativeDropdown<T extends string>(props: Props<T>) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.values[0]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as T);
    props.onValueSelected(event.target.value as T);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Relative Time</InputLabel>
      <Select id="demo-simple-select" value={value} onChange={handleChange}>
        {props.values.map(el => {
          return (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

export default RelativeDropdown;
