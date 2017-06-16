module.exports = function() {

    var restify = require('restify');
    global.builder = require('botbuilder');

    var connector = new builder.ChatConnector({
            appId: process.env.MICROSOFT_APP_ID ? process.env.MICROSOFT_APP_ID : '2ada3b5a-69f4-43c6-9ac0-0ddd1c181f63',
            appPassword: process.env.MICROSOFT_APP_PASSWORD ? process.env.MICROSOFT_APP_PASSWORD : '1Vn1uwsvpZqH6oQg4iTBW0V',
           gzipData: true
        });

    global.bot = new builder.UniversalBot(connector);

    // Setup Restify Server
    var server = restify.createServer();
    server.listen(process.env.port || 3978, function () {
        console.log('%s listening to %s', server.name, server.url);
    });
    //server.post('/api/messages', connector.listen());
    server.post('https://rpabot.azurewebsites.net/api/messages', connector.listen());
    bot.use(builder.Middleware.dialogVersion({ version: 0.2, resetCommand: /^reset/i }));

}