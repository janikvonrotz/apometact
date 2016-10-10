import { Meteor } from 'meteor/meteor';
import { objectAssign } from './helper';

var config = objectAssign(Meteor.settings.private, Meteor.settings.public)

export default config
