import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Card, CardText, CardTitle, RaisedButton, Dialog, FlatButton } from 'material-ui';
import { setValue } from '/imports/helper';
import { I18n, Notification } from './index';
import { browserHistory } from 'react-router';

export default class CategoryEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  update(key, event, value) {
    this.setState({item: setValue(this.state.item, key, value)})
  }

  save(){
    this.props.updateCategory(this.state.item)
    .then(({ data }) => {
      browserHistory.push(`/categories/`)
      Notification.success('Category was saved');
    }).catch((error) => {
      Notification.error(error.message);
    });
  }

  remove(){
    this.props.deleteCategory(this.state.item.id)
    .then(({ data }) => {
      browserHistory.push(`/categories/`)
      Notification.success('Category was deleted');
    }).catch((error) => {
      Notification.error(error.message);
    });
  }

  toggleDialog(key, event){
    var state = this.state;
    state[key] = !state[key];
    this.setState(state);
  }

  render() {

    // map data to state
    const { loading, category } = this.props.data;
    var { item } = this.state;

    // clone prop to state
    if(!item && category){
      item = category
      this.state.item = item;
    }

    return (loading || !item) ? (<p>loading...</p>) : (
      <Card>
        <CardTitle title={item.label} />
        <CardText>
          <TextField
            value={item.label}
            floatingLabelText="Label"
            onChange={this.update.bind(this, 'label')}
          /><br />
          <RaisedButton
            label="Save"
            onTouchTap={this.save.bind(this)}
            primary={true}
          />
          <RaisedButton
            label={I18n('delete')}
            onTouchTap={this.toggleDialog.bind(this, 'deleteDialog')}
            secondary={true}
          />
          <Dialog
            title={`${I18n('delete')} ${item.label}`}
            actions={[
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.toggleDialog.bind(this, 'deleteDialog')}
              />,
              <FlatButton
                label={I18n('delete')}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.remove.bind(this)}
              />,
            ]}
            modal={false}
            open={this.state.deleteDialog || false}
            onRequestClose={this.toggleDialog.bind(this, 'deleteDialog')}
          >
            <p>{I18n('dialog_delete_item').replace('{item}', item.label)}</p>
          </Dialog>
        </CardText>
      </Card>
    );
  }
}

const updateMutation = gql`
mutation updateCategory($id: String, $label: String) {
  updateCategory(id: $id, label: $label)
}
`;
const deleteMutation = gql`
mutation deleteCategory($id: String) {
  deleteCategory(id: $id)
}
`;
const CategoryEditWithMutation = graphql(updateMutation, {
  props({ mutate }) {
    return {
      updateCategory({id, label}) {
        return mutate({ variables: { id, label }});
      }
    };
  },
})(graphql(deleteMutation, {
  props({ mutate }) {
    return {
      deleteCategory(id){
        return mutate({ variables: { id }});
      }
    };
  },
})(CategoryEdit));

const query = gql`
query getCategory($id: String) {
  category(id: $id) {
    id
    label
  }
}
`;
const CategoryEditWithData = graphql(query, {
  options: (ownProps) => ({ variables: { id: ownProps.params.id } }),
})(CategoryEditWithMutation);

export default CategoryEditWithData;
