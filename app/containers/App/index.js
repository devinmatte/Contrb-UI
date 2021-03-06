/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Profile from 'containers/Profile/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

const githubCode = 'githubCode';
const clientId = '08b484fc8205a40052b8';
const clientSecret = '3839d27d7dcef7d9a2031de9229e9885f1b739df';

class App extends React.Component {

  componentDidMount() {
    const code = window.location.href.match(/\?code=(.*)/)
      && window.location.href.match(/\?code=(.*)/)[1];
    if (code) {
      localStorage.setItem(githubCode, code);

      const url = 'https://github.com/login/oauth/access_token';
      const data = new FormData();
      data.append('client_id', clientId);
      data.append('client_secret', clientSecret);
      data.append('code', code);

      fetch(url, {
        method: 'POST',
        body: data,
      }).then((response) => {
        console.log('cunt');
        return response.text();
      })
        .then((paramsString) => {
          const params = new URLSearchParams(paramsString);
          console.log('access_token', params.get('access_token'));
        }).catch((e) => {
          console.log(e);
        });
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route exact path={'/profile'} component={Profile} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default (App);
