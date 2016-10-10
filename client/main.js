import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, Link, browserHistory } from 'react-router'
import { MainLayout, CategoryList, CategoryEdit, DealList,
  DealEdit, NotFound, Dashboard } from './ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

const networkInterface = createNetworkInterface(`/graphql`);
const client = new ApolloClient({
  networkInterface
});

injectTapEventPlugin();

Meteor.startup(() => {
  render(<ApolloProvider client={client}>
    <Router history={browserHistory}>
     <Route component={MainLayout}>
       <Route path="/" component={Dashboard}/>
       <Route path="/categories" component={CategoryList}/>
       <Route path="/category/:id/edit" component={CategoryEdit}/>
       <Route path="/deals" component={DealList}/>
       <Route path="/deal/:id/edit" component={DealEdit}/>
       <Route path="*" component={NotFound}/>
     </Route>
   </Router>
  </ApolloProvider>, document.getElementById('render-target'));
});
