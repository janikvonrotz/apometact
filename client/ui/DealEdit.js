import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextField, Card, CardText, CardTitle, RaisedButton, DatePicker,
  SelectField, MenuItem, Checkbox, Dialog, FlatButton } from 'material-ui';
import { setValue } from '/imports/helper';
import { ImageLoader, I18n, Notification } from './index';
import { browserHistory } from 'react-router';

const styles = {
  button: {
    margin: 12,
  },
  checkbox: {
    marginBottom: 10,
  },
  fileInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default class DealEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  update(key, event, value, selectValue) {
    this.setState({item: setValue(this.state.item, key, selectValue || value)})
  }

  updateCheckbox(key, event, value){
    var item = this.state.item;
    if(value){
      item.pointOfSale.push(event.target.name)
    }else{
      item.pointOfSale.splice(item.pointOfSale.indexOf(event.target.name), 1)
    }
    this.setState({item: item})
  }

  upload(key, event){
    event.preventDefault();

    var self = this;
    var formData = new FormData();
    formData.append('file', event.target.files[0]);
    fetch('/upload', {
       method: 'POST',
       body: formData
    }).then(function(response) {
      // Express multer returns a promise, no clue why.
      response.json().then((response) => {
        self.setState({item: setValue(self.state.item, key, response.location)})
      })
    }).catch(function(error) {
       console.log(error);
    });
  }

  save(){
    this.props.updateDeal(this.state.item)
    .then(({ data }) => {
      browserHistory.push(`/deals/`)
      Notification.success('Deal was saved');
    }).catch((error) => {
      Notification.error(error.message);
    });
  }

  toggleDialog(key, event){
    var state = this.state;
    state[key] = !state[key];
    this.setState(state);
  }

  remove(){
    this.props.deleteDeal(this.state.item.id)
    .then(({ data }) => {
      browserHistory.push(`/deals/`)
      Notification.success('Deal was deleted');
    }).catch((error) => {
      Notification.error(error.message);
    });
  }

  render() {

    // map data to state
    const { loading, deal, categories } = this.props.data;
    var { item } = this.state;

    // clone prop to state
    if(!item && deal){
      item = deal
      this.state.item = item;
    }
    if(item){
      item.publishAt = new Date(item.publishAt);
      item.expiresAt = new Date(item.expiresAt);
    }

    return (loading || !item) ? (<p>loading...</p>) : (
      <Card>
        <CardTitle title={item.title} />
        <CardText>
          <TextField
            value={item.title}
            floatingLabelText="Title"
            onChange={this.update.bind(this, 'title')}
          /><br />
          <TextField
            value={item.description}
            floatingLabelText="Description"
            fullWidth={true}
            onChange={this.update.bind(this, 'description')}
          /><br />
          <SelectField
            floatingLabelText="Category"
            value={item.categoryId}
            onChange={this.update.bind(this, 'categoryId')}>
            {categories.map((category) => {
              return <MenuItem key={category.id} value={category.id} primaryText={category.label} />
            })}
          </SelectField><br />
          <TextField
            value={item.productDetails}
            floatingLabelText="Product Details"
            onChange={this.update.bind(this, 'productDetails')}
          /><br />
          <TextField
            value={item.itemUrl}
            floatingLabelText="Item Url"
            fullWidth={true}
            onChange={this.update.bind(this, 'itemUrl')}
          /><br />

          <br />
          <small>Point Of Sale</small>
          {['Avec', 'Bretzel König', 'Ditsch', 'KKiosk', 'Press & Books'].map((salePoint) => {
            return (<Checkbox
              key={salePoint}
              name={salePoint}
              label={salePoint}
              style={styles.checkbox}
              checked={item.pointOfSale.includes(salePoint)}
              onCheck={this.updateCheckbox.bind(this, 'pointOfSale')}
            />)
          })}
          <RaisedButton
            label="Choose Image"
            labelPosition="before"
            style={styles.Button}
          >
            <input multiple={false} onChange={this.upload.bind(this, 'imageUrl')} type="file" style={styles.fileInput} />
          </RaisedButton>
          <ImageLoader src={item.imageUrl} />
          <TextField
            value={item.imageUrl}
            floatingLabelText="Image Url"
            fullWidth={true}
            onChange={this.update.bind(this, 'imageUrl')}
          /><br />
          <RaisedButton
            label="Choose Image"
            labelPosition="before"
            style={styles.Button}
          >
            <input multiple={false} onChange={this.upload.bind(this, 'qrImageUrl')} type="file" style={styles.fileInput} />
          </RaisedButton>
          <ImageLoader src={item.qrImageUrl} />
          <TextField
            value={item.qrImageUrl}
            floatingLabelText="QR Image Url"
            fullWidth={true}
            onChange={this.update.bind(this, 'qrImageUrl')}
          /><br />
          <DatePicker
           hintText="Publish Date"
           floatingLabelText="Publish Date"
           value={item.publishAt}
           onChange={this.update.bind(this, 'publishAt')}
         /><br />
         <DatePicker
            hintText="Expiration Date"
            floatingLabelText="Expiration Date"
            value={item.expiresAt}
            onChange={this.update.bind(this, 'expiresAt')}
          /><br />

          <RaisedButton
            label={I18n('save')}
            onTouchTap={this.save.bind(this)}
            primary={true}
          />
          <RaisedButton
            label={I18n('delete')}
            onTouchTap={this.toggleDialog.bind(this, 'deleteDialog')}
            secondary={true}
          />
          <Dialog
            title={`${I18n('delete')} ${item.title}`}
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
            <p>{I18n('dialog_delete_item').replace('{item}', item.title)}</p>
          </Dialog>

        </CardText>
      </Card>
    );
  }
}

const updateMutation = gql`
mutation updateDeal($id: String, $title: String, $description: String, $categoryId: String, $productDetails: String, $itemUrl: String,
  $imageUrl: String, $qrImageUrl: String, $pointOfSale: [String], $publishAt: Date, $expiresAt: Date) {

  updateDeal(id: $id, title: $title, description: $description, categoryId: $categoryId, productDetails: $productDetails, itemUrl: $itemUrl,
    imageUrl: $imageUrl, qrImageUrl: $qrImageUrl, pointOfSale: $pointOfSale, publishAt: $publishAt, expiresAt: $expiresAt)
}
`;
const deleteMutation = gql`
mutation deleteDeal($id: String) {
  deleteDeal(id: $id)
}
`;
const DealEditWithMutation = graphql(updateMutation, {
  props({ mutate }) {
    return {
      updateDeal(item) {
        item.publishAt = item.publishAt.toISOString();
        item.expiresAt = item.expiresAt.toISOString();
        return mutate({ variables: item });
      }
    };
  },
})(graphql(deleteMutation, {
  props({ mutate }) {
    return {
      deleteDeal(id){
        return mutate({ variables: { id }});
      }
    };
  },
})(DealEdit));

const query = gql`
query getDeal($id: String) {
  deal(id: $id) {
    id
    title
    description
    categoryId
    productDetails
    itemUrl
    imageUrl
    qrImageUrl
    pointOfSale
    publishAt
    expiresAt
  }
  categories {
    id
    label
  }
}
`;
const DealEditWithData = graphql(query, {
  options: (ownProps) => ({ variables: { id: ownProps.params.id } }),
})(DealEditWithMutation);

export default DealEditWithData;
