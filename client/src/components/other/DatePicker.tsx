import React, { PureComponent } from "react";
import { Select } from "semantic-ui-react";

type DropdownOptions = { key: string; text: string; value: number };
type Props = {
  defaultDay: number;
  defaultMonth: number;
  defaultYear: number;
  onDayChange: (day: number) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
};

class DatePicker extends PureComponent<Props, {}> {
  render() {
    const {
      onDayChange,
      onMonthChange,
      onYearChange,
      defaultDay,
      defaultMonth,
      defaultYear
    } = this.props;
    return (

      <React.Fragment>
        <Select
          placeholder="Day"
          fluid
          selection
          defaultValue={defaultDay}
          onChange={(_, { value }) =>
            typeof value === "number" ? onDayChange(value) : ""
          }
          options={[{key: "0", text: "Day", value: 0}, ...getDayOptions()]}
        />
        <Select
          placeholder="Month"
          fluid
          selection
          defaultValue={defaultMonth}
          onChange={(_, { value }) =>
            typeof value === "number" ? onMonthChange(value) : ""
          }
          options={getMonthOptions()}
        />
        <Select
          placeholder="Year"
          fluid
          selection
          defaultValue={defaultYear}
          onChange={(_, { value }) =>
            typeof value === "number" ? onYearChange(value) : ""
          }
          options={getYearOptions()}
        />
      </React.Fragment>
    );
  }
}

const getDayOptions = (): DropdownOptions[] => {
  return new Array(31).fill(0).map((_, i) => {
    const day: number = i + 1;
    return {
      key: day.toString(),
      text: day < 10 ? "0" + day.toString() : day.toString(),
      value: day
    };
  });
};

const getMonthOptions = (): DropdownOptions[] => {
  return new Array(12).fill(0).map((_, i) => {
    const month: number = i + 1;
    return {
      key: month.toString(),
      text: new Date(2, month - 1, 2).toLocaleString("en-us", {
        month: "long"
      }),
      value: month
    };
  });
};

const getYearOptions = (): DropdownOptions[] => {
  return new Array(100).fill(0).map((_, i) => {
    const currentYear: number = new Date().getFullYear();
    const year: number = currentYear - i - 1;
    return {
      key: year.toString(),
      text: year.toString(),
      value: year
    };
  });
};

export default DatePicker;
