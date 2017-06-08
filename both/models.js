
Messages = new Mongo.Collection('messages');

Schema = {};
SimpleSchema.debug = true;

Schema.Message = new SimpleSchema({
    owner_id:{
        type: String,
    },
    msg_text:{
        type: String,
    },
    created_at: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
});

Messages.attachSchema(Schema.Message, {transform: true});

Messages.allow({
    insert: function () {
        return true;
    }
});
