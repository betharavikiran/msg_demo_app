
Template.defaultLayout.onCreated(function(){
    new Fingerprint2().get(function(result, components) {
        Session.setPersistent('owner_id', result);
    });
});