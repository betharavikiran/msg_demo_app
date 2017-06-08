Meteor.startup(function(){
    
    if(Messages.find().count()===0){
        const data_messages = [
            {owner_id:"19706b0972b9e8c56143c21dcb5ead42",msg_text:"Hi there, this a the first record by Robin"},
            {owner_id:"29706b0972b9e8c56143c21dcb5ead42",msg_text:"Hey Guys, I found this app interesting, love to join as user."},
            {owner_id:"39706b0972b9e8c56143c21dcb5ead42",msg_text:"You cannot delete me, only my owner can."},
            {owner_id:"49706b0972b9e8c56143c21dcb5ead42",msg_text:"I joined to check if any one interested in Lawn Tennies "},
            {owner_id:"59706b0972b9e8c56143c21dcb5ead42",msg_text:"Hey team, i am here to find my partner for work outs, please dont remove this message."},
            {owner_id:"69706b0972b9e8c56143c21dcb5ead42",msg_text:"Hey, heading for trekking this sunday, any one interested to join?"},
        ]
        _.each(data_messages, function(message) {
            Messages.insert(message);
        });
    }


    // Test script
    var messages = Messages.find({},{sort:{created_at:-1},skip:0,limit:2});

    console.log(messages.count())
    if(typeof messages!=="undefined") {
        if (messages.count()>= 2) {
            const dates = [];


            messages.forEach(function (message) {
                dates.push(message.created_at);
            })

            const lastMsgTime = new Date(dates[0]).getTime();
            const previousMsgTime = new Date(dates[1]).getTime();

            console.log(lastMsgTime);
            console.log(previousMsgTime);
            console.log(lastMsgTime > previousMsgTime);
        }
    }
});