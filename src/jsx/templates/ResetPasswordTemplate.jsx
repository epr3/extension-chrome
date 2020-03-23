import React, { Component } from 'react';

import ResetPasswordForm from '../component/ResetPasswordForm';
import CompanyLogo from '../component/CompanyLogo';
import OfflineWarning from '../component/OfflineWarning';
import listenOnline from 'hoc/listenOnline';

export default function () {
  class ResetPasswordTemplate extends Component {
    constructor(props) {
      super(props);

      const background = chrome.extension.getBackgroundPage();
      this.app = background.app;
    }

    render() {
      return (
        <div id="reset-password-template" className="row">
          <OfflineWarning />

          <CompanyLogo />

          <div className="top-border">
            <ResetPasswordForm />
          </div>
        </div>
      );
    }
  }

  return listenOnline(ResetPasswordTemplate);
}
