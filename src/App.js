import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { fetchCurrentUser } from './actions/auth';
import PrivateRouter from './components/common/PrivateRoute';
import GuestRoute from './components/common/GuestRoute';
import RootContainer from './containers/RootContainer';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ReportPage from './components/pages/ReportPage';
import PurchasesPage from './components/pages/PurchasesPage';

class App extends React.Component {
  componentWillMount() {
    if (localStorage.VelaEnvatoToken) {
      this.props.fetchCurrentUser(localStorage.VelaEnvatoToken);
    }
  }

  render() {
    const { location, loadedUser } = this.props;
    return (
      <div className={`app-container ${!loadedUser && 'app-container--loading'}`}>
        {!loadedUser && <div className="loader" />}
        <GuestRoute
          location={location}
          path={`${process.env.PUBLIC_URL}/login`}
          exact
          component={() => <RootContainer MainContent={LoginPage} />}
        />
        <PrivateRouter
          location={location}
          path={`${process.env.PUBLIC_URL}/`}
          exact
          component={() => <RootContainer MainContent={HomePage} />}
        />
        <PrivateRouter
          location={location}
          path={`${process.env.PUBLIC_URL}/sales/report`}
          exact
          component={() => <RootContainer MainContent={ReportPage} />}
        />
        <PrivateRouter
          location={location}
          path={`${process.env.PUBLIC_URL}/purchasecode`}
          exact
          component={() => <RootContainer MainContent={PurchasesPage} />}
        />
      </div>
    );
  }
}

App.propTypes = {
  fetchCurrentUser: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  loadedUser: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  loadedUser: state.user.loaded
});

export default connect(mapStateToProps, { fetchCurrentUser })(App);
