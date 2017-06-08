Template.addNewMessage.events({

    'submit form': function(event){
        event.preventDefault();

        const owner_id = Session.get("owner_id");
        const msgText = event.target.messageText.value;

        Messages.insert({owner_id:owner_id,msg_text:msgText});
        Session.setPersistent('mode',"view");

    },
    'click #btn_cancel':function(){
        Session.setPersistent('mode',"view");
    }
});