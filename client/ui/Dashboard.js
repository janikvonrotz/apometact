import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, CardText, CardTitle } from 'material-ui';
import { browserHistory } from 'react-router';

export default class Dashboard extends Component {

  render() {
    var { loading, deals, categories, users } = this.props.data;

    if(deals){
      deals.map((deal) => {
        deal.publishAt = new Date(deal.publishAt);
        deal.expiresAt = new Date(deal.expiresAt);
        return deal;
      });

      var activeDeals = deals.filter((deal) => {
        return ((deal.publishAt < (new Date())) && ((new Date()) < deal.expiresAt))
      })

      var expiredDeals = deals.filter((deal) => {
        return ((new Date()) > deal.expiresAt)
      })

      var upcomingDeals = deals.filter((deal) => {
        return ((new Date()) < deal.publishAt)
      })
    }

    var countSavedDeals = 0
    if(users){
      users.map((user) => {countSavedDeals += user.savedDeals.length})
    }

    return (loading || !deals) ? (<p>loading...</p>) : (
      <Card>
        <CardTitle
          title="Deals"
        />
        <CardText>
          <p>{`Active Deals: ${activeDeals.length}`}</p>
          <p>{`Upcoming Deals: ${upcomingDeals.length}`}</p>
          <p>{`expiredDeals Deals: ${expiredDeals.length}`}</p>
          <p>{`Categories: ${categories.length}`}</p>
          <p>{`Users: ${users.length}`}</p>
          <p>{`Saved Deals: ${countSavedDeals}`}</p>

        </CardText>
      </Card>
    );
  }
}

const query = gql`
query list {
  deals {
    id
    title
    publishAt
    expiresAt
  }
  categories {
    id
    label
  }
  users{
    facebookId
    savedDeals
  }
}
`;
const DashboardWithData = graphql(query)(Dashboard);

export default DashboardWithData;
