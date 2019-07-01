import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form, Message, Button, Header } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { authActions } from "../../../../store/auth";
import { Register, BirthDate } from "../../../../store/auth/models";
import DatePicker from "../../../other/DatePicker";
import { Gender } from "../../../../store/models";

type State = {
  username: string;
  password: string;
  email: string;
  birthDate: BirthDate;
  gender: Gender;
};

type StateProps = {
  errors: { [key: string]: string };
  isRegisterLoading: boolean;
  isRegisterSucces: boolean;
  isLoginLoading: boolean;
};
type DispatchProps = {
  register: (registerDate: Register) => void;
};
type Props = StateProps & DispatchProps;

const initState: State = {
  username: "",
  password: "",
  email: "",
  birthDate: {
    day: 12,
    month: 4,
    year: 1995
  },
  gender: Gender.None
};

class RegisterForm extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { ...initState, birthDate: { ...initState.birthDate } };
  }
  componentWillReceiveProps(newProps: StateProps) {
    if (!this.props.isRegisterSucces && newProps.isRegisterSucces) {
      this.setState({ ...initState, birthDate: { ...initState.birthDate } });
      console.log("reset fields");
    }
  }
  handleDayChange = (day: number) => {
    this.setState({
      birthDate: { ...this.state.birthDate, day }
    });
  };
  handleMonthChange = (month: number) => {
    this.setState({
      birthDate: { ...this.state.birthDate, month }
    });
  };
  handleYearChange = (year: number) => {
    this.setState({
      birthDate: { ...this.state.birthDate, year }
    });
  };
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.props.isLoginLoading) return;
    this.props.register({ ...this.state });
  };
  render() {
    const { errors, isRegisterLoading, isRegisterSucces } = this.props;
    const anyErrors: boolean = Object.keys(errors).length > 0;

    return (
      <Form
        error={anyErrors}
        onSubmit={this.handleSubmit}
        className={"register-form"}
      >
        <Header dividing size="huge">
          Create New Account
        </Header>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Username"
            placeholder="Enter username"
            autoComplete="username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
            error={errors.username ? true : false}
          />
          <Form.Input
            fluid
            type="password"
            label="Password"
            placeholder="Enter password"
            autoComplete="new-password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            error={errors.password ? true : false}
          />
        </Form.Group>
        <Form.Input
          fluid
          type="email"
          label="Email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          error={errors.email ? true : false}
        />
        <Form.Input
          fluid
          label="Birth date"
          error={errors.birthDate ? true : false}
        >
          <DatePicker
            defaultDay={initState.birthDate.day}
            defaultMonth={initState.birthDate.month}
            defaultYear={initState.birthDate.year}
            onDayChange={this.handleDayChange}
            onMonthChange={this.handleMonthChange}
            onYearChange={this.handleYearChange}
          />
        </Form.Input>
        <Form.Input error={errors.gender ? true : false} label="Gender">
          <Form.Group inline>
            <Form.Radio
              label="Male"
              checked={this.state.gender === Gender.Male}
              onChange={() => this.setState({ gender: Gender.Male })}
            />
            <Form.Radio
              label="Female"
              checked={this.state.gender === Gender.Female}
              onChange={() => this.setState({ gender: Gender.Female })}
            />
          </Form.Group>
        </Form.Input>
        <Message
          error
          header="Action Forbidden"
          list={Object.keys(errors).map(key => errors[key])}
          visible={anyErrors}
        />
        <Message success visible={isRegisterSucces}>
          <Message.Header>Your account has been created!</Message.Header>
          <p>You can now log in</p>
        </Message>
        <Button primary loading={isRegisterLoading}>
          Register
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    errors: state.auth.errors.register,
    isRegisterLoading: state.auth.status.isRegisterLoading,
    isRegisterSucces: state.auth.status.isRegisterSuccess,
    isLoginLoading: state.auth.status.isLoginLoading
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    register: (data: Register) => dispatch(authActions.register(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
