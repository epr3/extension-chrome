import React, { Component } from 'react';

import LoginField from 'component/LoginField';
import listenOnline from 'hoc/listenOnline';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);

    const background = chrome.extension.getBackgroundPage();
    this.renderer = background.renderer;
    this.app = background.app;

    // properties
    this.i18n = this.app.util.i18n;
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    };

    // bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange({ target: { value, name } }) {
    switch (name) {
      case 'currentPassword': {
        this.setState({ currentPassword: value });
        break;
      }

      case 'newPassword': {
        this.setState({ newPassword: value });
        break;
      }

      case 'confirmNewPassword': {
        this.setState({ confirmNewPassword: value });
        break;
      }

      default: {
        debug(`invalid name for reset password field: ${value}`);
      }
    }
  }

  handleSubmit() {
    alert('Task complete!');
  }

  render() {
    const {
      state: { currentPassword, newPassword, confirmNewPassword }
    } = this;

    return (
      <form id="reset-password" onSubmit={this.handleSubmit}>
        <div className="col-xs-1" />

        <div className="col-xs-10">
          <div className="text-danger bottom-gap col-xs-12 hidden" />

          <div className="form-group">
            <LoginField
              autocomplete="off"
              name="currentPassword"
              type="password"
              localeKey="CurrentPasswordPlaceholder"
              defaultValue={currentPassword}
              onChange={this.onInputChange}
              autoFocus={true}
            />
          </div>

          <div className="form-group">
            <LoginField
              autocomplete="off"
              name="newPassword"
              type="password"
              localeKey="NewPasswordPlaceholder"
              defaultValue={newPassword}
              onChange={this.onInputChange}
              autoFocus={true}
            />
          </div>

          <div className="form-group">
            <LoginField
              autocomplete="off"
              name="confirmNewPassword"
              type="password"
              localeKey="ConfirmNewPasswordPlaceholder"
              defaultValue={confirmNewPassword}
              onChange={this.onInputChange}
              autoFocus={true}
            />
          </div>

          <div className="form-group text-center">
            <button id="submit-form-button" type="submit" className="btn-success form-control">
              { t('ResetPasswordText') }
            </button>

            <button type="button" className="btn-info form-control">
              { t('GoBackText') }
            </button>

          </div>
        </div>
      </form>
    );
  }
}

export default listenOnline(ResetPasswordForm);
