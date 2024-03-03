import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";

class App extends Component {
  state = {
    user:"Test User"
  }
  componentDidMount() {
    this.onRouteChanged();
    const { user } = this.props.location?.state ?? {user : "Test User"};
    this.setState({user});
    console.error(user)
  }
  render () {
    let navbarComponent = !this.state.isFullPageLayout ? <Navbar user={this.state.user}/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let SettingsPanelComponent = !this.state.isFullPageLayout ? <SettingsPanel/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
    return (
      <div className="container-scroller">
        { navbarComponent }
        <div className="container-fluid page-body-wrapper">
          { sidebarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <ProtectedRoutes/>
              { SettingsPanelComponent }
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("ROUTE CHANGED");    
    window.scrollTo(0, 0);
  }

}

export default withTranslation() (withRouter(App));
