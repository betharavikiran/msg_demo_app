Meteor.publish('messages', function(rows) {
    return Messages.find({},{sort:{created_at:-1}});
});
