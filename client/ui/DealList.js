import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Card, CardText, CardTitle, FloatingActionButton, List, ListItem, Subheader } from 'material-ui';
import { grey100, pink700, purple700 } from 'material-ui/styles/colors';
import { ContentAdd } from 'material-ui/svg-icons';
import { browserHistory } from 'react-router';
import { Notification } from './index';

const styles = {
  cardTitle: {
    float: "left"
  },
  floatingActionButton: {
    transform: "translateY(10px)"
  },
  cardText: {
    clear: "both"
  },
  subheader: {
    backgroundColor: "#000",
    color: "#FFF"
  },
  upcomingSubheader: {
    backgroundColor: purple700,
    color: "#FFF"
  },
  expiredSubheader: {
    backgroundColor: pink700,
    color: "#FFF"
  }
};

export default class DealList extends Component {

  // title: "Energy Drink Test",
  // description: "2 für 8",
  // productDetails: "250 ml",
  // categoryId: "a87sdf0b87er7t0w8r",
  // itemUrl: "http://www.okpunktstrich.ch/de/",
  // imageUrl: "https://s3.amazonaws.com/valora/energy+drink+resealable.jpg",
  // qrImageUrl: "https://s3.amazonaws.com/valora/energy+drink+qr.png",
  // pointOfSale: ["KKiosk", "Avec"], categoryId: "",
  // publishAt: "2016-09-28T22:11:53.158Z",
  // expiresAt: "2016-10-28T22:11:53.158Z",

  insert(event){
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    this.props.createDeal({title: 'Untitled Deal', description: '',
      categoryId: this.props.data.categories[0].id, productDetails: '',
      itemUrl: 'http://www.okpunktstrich.ch/de/', imageUrl: '', qrImageUrl: '',
      pointOfSale: ['KKiosk', 'Bretzel König', 'Ditsch', 'Avec', 'Press & Books'], publishAt: today, expiresAt: today})
    .then(({ data }) => {
      browserHistory.push(`/deal/${data.createDeal.id}/edit`)
      Notification.success('Deal was created');
    }).catch((error) => {
      Notification.error(error.message);
    });
  }

  render() {
    var { loading, deals } = this.props.data;

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

    return (loading || !deals) ? (<p>loading...</p>) : (
      <Card>
        <CardTitle
          title="Deals"
          style={styles.cardTitle}
         />
        <FloatingActionButton
          onTouchTap={this.insert.bind(this)}
          style={styles.floatingActionButton}
          mini={true}
        >
          <ContentAdd />
        </FloatingActionButton>
        <CardText
          style={styles.cardText}
        >

          {_.map(_.groupBy(activeDeals.map(deal => deal), (g) => {
                  return g.category.label
            }), (value, key) => {
              return (
                <List
                  key={key}
                >
                  <Subheader
                    style={styles.subheader}
                  >
                    {key}
                  </Subheader>
                  {value.map((deal) => {
                    return(
                      <ListItem
                        key={deal.id}
                        primaryText={deal.title}
                        href={`/deal/${deal.id}/edit`}
                      />
                    );
                  })}
                </List>
              );
            })
          }

          {(0 < upcomingDeals.length) ? (
            <div>
              <br />
              <br />
              <br />
              <List>
              <Subheader
                style={styles.upcomingSubheader}
              >
                Upcoming Deals
              </Subheader>
              {upcomingDeals.map((deal) => {
                return(
                  <ListItem
                    key={deal.id}
                    primaryText={deal.title}
                    href={`/deal/${deal.id}/edit`}
                  />
                )
              })}
              </List>
            </div>
          ) : null}

          {(0 < expiredDeals.length) ? (
            <div>
              <br />
              <br />
              <br />
              <List>
              <Subheader
                style={styles.expiredSubheader}
              >
                Expired Deals
              </Subheader>
              {expiredDeals.map((deal) => {
                return(
                  <ListItem
                    key={deal.id}
                    primaryText={deal.title}
                    href={`/deal/${deal.id}/edit`}
                  />
                )
              })}
              </List>
            </div>
          ) : null}
        </CardText>
      </Card>
    );
  }
}

const mutation = gql`
mutation createDeal($title: String, $description: String, $categoryId: String, $productDetails: String, $itemUrl: String,
  $imageUrl: String, $qrImageUrl: String, $pointOfSale: [String], $publishAt: Date, $expiresAt: Date) {

  createDeal(title: $title, description: $description, categoryId: $categoryId, productDetails: $productDetails, itemUrl: $itemUrl,
    imageUrl: $imageUrl, qrImageUrl: $qrImageUrl, pointOfSale: $pointOfSale, publishAt: $publishAt, expiresAt: $expiresAt) {
    id
  }
}
`;
const DealListWithMutation = graphql(mutation, {
  props({ mutate }) {
    return {
      createDeal(item) {
        item.publishAt = item.publishAt.toISOString();
        item.expiresAt = item.expiresAt.toISOString();
        return mutate({ variables: item });
      },
    };
  },
})(DealList);

const query = gql`
query list {
  deals {
    id
    title
    publishAt
    expiresAt
    category {
      id
      label
    }
  }
  categories {
    id
    label
  }
}
`;
const DealListWithData = graphql(query)(DealListWithMutation);

export default DealListWithData;
