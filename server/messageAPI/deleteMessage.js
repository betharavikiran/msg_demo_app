if (Meteor.isServer) {

    Meteor.methods({
        deleteMessage: function (data) {
            if ( data.deleteMsg.hasOwnProperty('msg_id') && data.deleteMsg.hasOwnProperty('owner_id')){

                const { msg_id, owner_id  }  =data.deleteMsg;

                const record = Messages.findOne({_id:msg_id});

                if(typeof record!=="undefined"){
                    if(record.owner_id ===owner_id){
                       const result = Messages.remove({_id:msg_id});

                        const rtrn = '{"status": "Success","Message":"Message was deleted successfully"}';
                       return rtrn;
                    }
                    else{
                        const rtrn = '{"status": "Failed","Message":"You are not Authorized to delete the message."}';
                        return rtrn;
                    }
                }
                else{
                    const rtrn = '{"status": "Failed","Message":"No record not found."}';
                    return rtrn;
                }
            }else{
                const rtrn = '{"status": "Error" , "Message": "Required parameters missing"}';
                return rtrn;
            }
        }
    });
}