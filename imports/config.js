import { Meteor } from 'meteor/meteor';
import { objectAssign } from './helper';

// extract meteor settings
// var config = Object.assign(Meteor.settings.private, Meteor.settings.public);
var config = objectAssign(Meteor.settings.private, Meteor.settings.public)

export default config
