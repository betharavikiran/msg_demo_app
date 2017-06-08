import '../both/models.js';

function prefillMessages() {
    if(Messages.find().count() !== 0) return;

    const messages = [
        {owner_id:"19706b0972b9e8c56143c21dcb5ead42",msg_text:"Hi there, this a the first record by Robin"},
        {owner_id:"29706b0972b9e8c56143c21dcb5ead42",msg_text:"Hey Guys, I found this app interesting, love to join as user."},
        {owner_id:"39706b0972b9e8c56143c21dcb5ead42",msg_text:"You cannot delete me, only my owner can."},
        {owner_id:"49706b0972b9e8c56143c21dcb5ead42",msg_text:"I joined to check if any one interested in Lawn Tennies "},
        {owner_id:"59706b0972b9e8c56143c21dcb5ead42",msg_text:"Hey team, i am here to find my partner for work outs, please dont remove this message."},
        {owner_id:"69706b0972b9e8c56143c21dcb5ead42",msg_text:"Hey, heading for trekking this sunday, any one interested to join?"},
    ];

    messages.forEach(function(message) { Messages.insert(message);
        setTimeout(function() {
            // do nothing, we are creating time delay between message
        }, 1000);

    });
}

if (Meteor.isServer) Meteor.startup(prefillMessages);

if (Meteor.isServer) {
    describe('Delete.record',function() {
        beforeEach(function () {

        });
        it(' check the working of delete function', function () {
            // get the oldest Message
            const msg = Messages.findOne({});
            const deleteMsg = {
                msg_id: msg._id,
                owner_id: msg.owner_id
            };

            // If correct paramters are passed, the record should be deleted.
            Meteor.call('deleteMessage', {deleteMsg: deleteMsg}, function (err, response) {
                if (err) {
                }
                else{
                    // Confirm that the record was deleted.
                    chai.assert(Messages.find({_id:msg._id}).count() === 0);
                }
            });

        });
    });

    describe('Messages Order',function() {
        beforeEach(function () {
        });

        it('verify sort order of publisher as Descending', function () {
            var messages = Messages.find({},{sort:{created_at:-1},skip:0,limit:2});

            if(typeof messages!=="undefined") {
                if (messages.count()>= 2) {
                    var dates = [];

                    messages.forEach(function (message) {
                        dates.push(message.created_at);
                    })

                    var lastMsgTime = new Date(dates[0]).getTime();
                    var previousMsgTime = new Date(dates[1]).getTime();

                    chai.assert(lastMsgTime > previousMsgTime);
                }
            }
        });
    });

    describe("prefillTodos", function() {

        it("initializes the database with default Messages", function() {
            chai.assert(Messages.find().count() > 0);
        });

    });
}