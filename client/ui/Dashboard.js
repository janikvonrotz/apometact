import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, CardText, CardTitle, Paper } from 'material-ui';
import { browserHistory } from 'react-router';

const styles = {
  paper: {
    height: 120,
    width: '100%',
    display: 'inline-block',
    marginTop: 10,
    textAlign: 'center'
  },
  h1: {
    fontSize: 16,
  },
  h2: {
    fontSize: 30,
  }
}

export default class Dashboard extends Component {

  render() {
    var { loading, deals, categories, users } = this.props.data;
    let elements = [];

    if(deals){
      deals.map((deal) => {
        deal.publishAt = new Date(deal.publishAt);
        deal.expiresAt = new Date(deal.expiresAt);
        return deal;
      });

      var activeDeals = deals.filter((deal) => {
        return ((deal.publishAt < (new Date())) && ((new Date()) < deal.expiresAt))
      })
      elements.push({title: 'Active Deals', value: activeDeals.length, href: '/deals/'});

      var expiredDeals = deals.filter((deal) => {
        return ((new Date()) > deal.expiresAt)
      })
      elements.push({title: 'Expired Deals', value: expiredDeals.length, href: '/deals/'});

      var upcomingDeals = deals.filter((deal) => {
        return ((new Date()) < deal.publishAt)
      })
      elements.push({title: 'Upcoming Deals', value: upcomingDeals.length, href: '/deals/'});
    }

    var countSavedDeals = 0
    if(users){
      users.map((user) => {countSavedDeals += user.savedDeals.length})
      elements.push({title: 'Users', value: users.length});
    }
    elements.push({title: 'Saved Deals', value: countSavedDeals});

    if (categories) {
      elements.push({title: 'Categories', value: categories.length, href: '/categories/'});
    }

    return (loading || !deals) ? (<p>loading...</p>) : (

      <div className="row" style={styles.row}>
        {elements.map((element) => {
          return (
            <div
              key={element.title}
              className="col-xs-12 col-sm-6 col-md-4"
            >
              <a href={element.href}>
                <Paper
                  style={styles.paper}
                  zDepth={2}
                >
                  <h1
                    style={styles.h1}
                  >
                    {element.title}
                  </h1>
                  <h2
                    style={styles.h2}
                  >
                    {element.value}
                  </h2>
                </Paper>
              </a>
            </div>
          )
        })}
      </div>
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
