import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from 'component/Field';
import listenOnline from 'hoc/listenOnline';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
      currentPassword: {
        name: 'Current password',
        value: '',
        errors: [],
        rules: [{ required: true }],
      },
      newPassword: {
        name: 'New password',
        value: '',
        errors: [],
        rules: [{ required: true }, { pattern: new RegExp(/^(.{0,7}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$/) }],
      },
      confirmNewPassword: {
        name: 'Confirm new password',
        value: '',
        errors: [],
        rules: [{ required: true }, { pattern: new RegExp(/^(.{0,7}|[^0-9]*|[^A-Z]*|[a-zA-Z0-9]*)$/) }, { match: 'newPassword' }],
      },
    };

    // bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { name, value } }) {
    this.setState((prevState) => {
      return Object.assign({}, prevState, { [name]: Object.assign(prevState[name], { value }) });
    });
  }

  checkRules(rules, inputName) {
    const { [inputName]: { value, name } } = this.state;

    rules.forEach((rule) => {
      if (rule.required && !value) {
        this.setState((prevState) => {
          const copy = Object.assign({}, prevState[inputName]);
          copy.errors.push(`${name} is required`);
          return copy;
        });
      }
      if (rule.pattern && value.match(rule.pattern)) {
        this.setState((prevState) => {
          const copy = Object.assign({}, prevState[inputName]);
          copy.errors.push(`${name} must contain at least an uppercase letter, a lowercase letter, a number and a special character`);
          return copy;
        });
      }
      if (rule.match) {
        const { [rule.match]: { value: matchValue } } = this.state;
        if (value !== matchValue) {
          this.setState((prevState) => {
            const copy = Object.assign({}, prevState[inputName]);
            copy.errors.push(`${name} must match ${prevState[rule.match].name}`);
            return copy;
          });
        }
      }
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    this.setState((prevState) => {
      const copy = Object.assign({}, prevState);
      copy.currentPassword.errors = [];
      copy.newPassword.errors = [];
      copy.confirmNewPassword.errors = [];
      return copy;
    });
    const { currentPassword, newPassword, confirmNewPassword } = this.state;
    await this.checkRules(currentPassword.rules, 'currentPassword');
    await this.checkRules(newPassword.rules, 'newPassword');
    await this.checkRules(confirmNewPassword.rules, 'confirmNewPassword');
    if (
      !currentPassword.errors.length
      && !newPassword.errors.length
      && !confirmNewPassword.errors.length
    ) {
      alert('Task complete!');
    }
  }

  render() {
    const {
      state: { currentPassword, newPassword, confirmNewPassword },
      props: { renderTemplateFunc },
    } = this;

    return (
      <form id="reset-password" onSubmit={evt => this.handleSubmit(evt)}>
        <div className="col-xs-1" />

        <div className="col-xs-10">
          <div className="text-danger bottom-gap col-xs-12 hidden" />

          <div className="form-group">
            <Field
              autocomplete="off"
              name="currentPassword"
              type="password"
              localeKey="CurrentPasswordPlaceholder"
              value={currentPassword.value}
              onChange={this.onInputChange}
              hasError={!!currentPassword.errors.length}
              autoFocus={true}
            />
            { !!currentPassword.errors.length && <div className="invalid-feedback">{ currentPassword.errors[0] }</div> }
          </div>

          <div className="form-group">
            <Field
              autocomplete="off"
              name="newPassword"
              type="password"
              localeKey="NewPasswordPlaceholder"
              value={newPassword.value}
              onChange={this.onInputChange}
              hasError={!!newPassword.errors.length}
            />
            { !!newPassword.errors.length && <div className="invalid-feedback">{ newPassword.errors[0] }</div> }
          </div>

          <div className="form-group">
            <Field
              autocomplete="off"
              name="confirmNewPassword"
              type="password"
              localeKey="ConfirmNewPasswordPlaceholder"
              value={confirmNewPassword.value}
              onChange={this.onInputChange}
              hasError={!!confirmNewPassword.errors.length}
            />
            { !!confirmNewPassword.errors.length && <div className="invalid-feedback">{ confirmNewPassword.errors[0] }</div> }
          </div>

          <div className="form-group text-center">
            <button id="submit-form-button" type="submit" className="btn-success form-control">
              { t('ChangePasswordText') }
            </button>

            <button onClick={() => { return renderTemplateFunc('login'); }} type="button" className="btn-info form-control mt-2">
              { t('GoBackText') }
            </button>

          </div>
        </div>
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  renderTemplateFunc: PropTypes.func.isRequired,
};

export default listenOnline(ResetPasswordForm);
