import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Card, CardText, CardTitle, FloatingActionButton, List, ListItem } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import { browserHistory } from 'react-router';
import { Notification } from './index';

export default class CategoryList extends Component {

  insert(event){
    this.props.createCategory('Untitled Category')
    .then(({ data }) => {
      browserHistory.push(`/category/${data.createCategory.id}/edit`)
      Notification.success('Category was created');
    }).catch((error) => {
      Notification.error(error.message);
    });
  }

  render() {
    const styles = {
      cardTitle: {
        float: "left"
      },
      floatingActionButton: {
        transform: "translateY(10px)"
      },
      cardText: {
        clear: "both"
      }
    };

    const { loading, categories } = this.props.data;

    return loading ? (<p>loading...</p>) : (
      <Card>
        <CardTitle
          title="Categories"
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
          <List>
            {categories.map((category) => {
              return (
                <ListItem key={category.id}
                  href={`/category/${category.id}/edit`}
                  primaryText={category.label}>
                </ListItem>
              );
            })}
          </List>
        </CardText>
      </Card>
    );
  }
}

const mutation = gql`
mutation createCategory($label: String) {
  createCategory(label: $label) {
    id
  }
}
`;
const CategoryListWithMutation = graphql(mutation, {
  props({ mutate }) {
    return {
      createCategory(label) {
        return mutate({ variables: { label } });
      },
    };
  },
})(CategoryList);

const query = gql`
query list {
  categories {
    id
    label
  }
}
`;
const CategoryListWithData = graphql(query)(CategoryListWithMutation);

export default CategoryListWithData;
