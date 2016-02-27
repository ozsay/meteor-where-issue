Items = new Mongo.Collection('items');

function printCount() {
  console.log(Items.find({}).count());
  console.log(Items.find({owner: 'me'}).count());
  console.log(Items.find({$where: 'this.owner === \'me\''}).count());
  console.log(Items.find({$where: function() {
    return this.owner === 'me';
  }}).count());
}

if (Meteor.isClient) {
  Template.hello.events({
    'click button': function () {
      printCount();
    }
  });
}

if (Meteor.isServer) {
  if(Items.find({}).count() === 0) {
    Items.insert({owner: 'me'});
    Items.insert({owner: 'notMe'});
  }

  printCount();
}
