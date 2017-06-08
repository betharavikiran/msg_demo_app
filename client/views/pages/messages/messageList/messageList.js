MessagseSub = new SubsManager({cacheLimit:1});

Template.messageList.onCreated(function(){
    const instance = this;

    instance.messageListReady = new ReactiveVar();
    instance.rows = new ReactiveVar();

    Session.setPersistent('mode',"View");

    this.autorun(function () {
        const handleMessageList = MessagseSub.subscribe('messages',instance.rows.get());
        instance.messageListReady.set(handleMessageList.ready());
    });
});

Template.messageList.helpers({
    Messages:function(){
        return Messages.find({},{sort:{created_at:-1}});
    },

    isAddMode:function(){
       const mode = Session.get('mode');

       if(mode==="Add"){
           return true;
       }else{
           return false;
       }
    }
});


Template.messageList.events({
    'click #btn_add':function(){
        Session.setPersistent('mode',"Add");
    },


})

Template.message.events({
    'click #btn_delete':function(){

        const msg_id = this._id;
        const owner_id = Session.get("owner_id");

        const deleteMsg = {
            msg_id: msg_id,
            owner_id: owner_id
        };

        Meteor.call('deleteMessage', {deleteMsg: deleteMsg}, function (err, response) {
            if (err) {
                alert("Error" + err.message);
            }
            else{
                const result = JSON.parse(response);
                
                if(result.status !=="Success"){
                    alert(result.Message);
                }

                Session.setPersistent('mode',"View");

            }
        });
    }
})
