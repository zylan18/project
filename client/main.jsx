import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { render } from 'react-dom';
import App  from '/imports/ui/App.jsx';
Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
