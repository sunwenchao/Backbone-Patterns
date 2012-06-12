var mongoose = require('mongoose');

module.exports = function(app, express) {

    app.configure(function() {

        app.use(express.logger());

        app.set('views', __dirname + '/view');
        app.set('view engine', 'jade');

        app.use(express.bodyParser());
        app.use(express.methodOverride());

        app.use(express.static(__dirname + '/public'));

        app.use(app.router);
     });

    //development configuration
    app.configure('development', function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    //production configuration
    app.configure('production', function() {
        app.use(express.errorHandler());
    });

    //connect database
    mongoose.connect( 'mongodb://localhost/labitest' , function (err) {
        if (err) {
            console.error('connect to database: %s error: ', 'labitest', err.message);
            process.exit(1);
        }
    });

    // project 'S' infomation
    global.sBasePath = __dirname;
    global.sDebug = true;
};