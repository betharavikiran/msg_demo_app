import '../both/models.js';

if (Meteor.isClient) {
    describe('Insert Record on Client',function() {
        it('can insert record', function () {
            const msg = {
                owner_id:"20706b0972b9e8c56143c21dcb5ead42",
                msg_text:"New test record on the client"
            }

            const  msgid = Messages.insert(msg);

            // We should find the record in the Collection
            chai.assert(Messages.find({_id:msgid}).count() > 0);
        });
    });

    describe('Reject deletion of record on Client',function() {
        it('Can get client id', function () {
            const msg = {
                _id:"deleteRejectTest001",
                owner_id:"20706b0972b9e8c56143c21dcb5ead42",
                msg_text:"New test record on the client"
            }
            Messages.insert(msg);

            try{
                Messages.remove({_id:"deleteRejectTest001"});
            }
            catch(exception)
            {
                const recCount = Messages.find({_id:"deleteRejectTest001"}).count();

                // The Record should continue to exist as Client side deletion should fail.
                chai.assert(recCount === 1);
            }

        });
    });


}