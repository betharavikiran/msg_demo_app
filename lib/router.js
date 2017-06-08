if (Meteor.isClient) {

    Router.configure({
        layoutTemplate: "defaultLayout",
    });

    Router.map(
        function () {
            this.route('messages', {
                path: '/',
                layoutTemplate: 'defaultLayout',
                fastRender: true,
                action: function () {
                    this.render();
                }
            });
        }
    );
}