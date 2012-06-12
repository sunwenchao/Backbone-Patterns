var CalendarModel = require( './model.js' );
var _ = require( 'underscore' );

exports.getCals = function( callBack ){

    CalendarModel.find( { destjid : 'sunwenchao@gozap.com' }, function( err, replies ){
        return callBack( err, replies );
    });
};

exports.getCalById = function( reqId, callBack ){

    CalendarModel.findById( reqId, function( err, replies ){
        return callBack( err, replies );
    });
};

exports.delCal = function( reqId, callBack ){

    CalendarModel.remove( { _id : reqId }, function( err, replies ){
        return callBack( err, replies );
    });
};

exports.editCal = function( reqId, reqObj, callBack ){

//    CalendarModel.update( { _id : reqId }, reqObj, { multi: false }, function( err, replies ) {
//        console.log(err, replies);
//    });
    CalendarModel.findOne( { _id : reqId }, function( err, calModel ){
        _.extend( calModel, reqObj );

        calModel.save(function( err, replies ){
            callBack( err, replies );
        });
    });
};

exports.addCal = function( reqObj, callBack ){

    var calendarModel = new CalendarModel();

    _.extend( calendarModel, reqObj );

    calendarModel.save(function( err, replies ){
        callBack( err, replies );
    });
};

