var CalendarModel = require( './model.js' );
var _ = require( 'underscore' );

exports.getCals = function( callBack ){

    CalendarModel.find( { destjid : 'sunwenchao@gozap.com' }, function( err, replies ){
        return callBack( err, replies );
    });
};

exports.delCal = function( reqId, callBack ){

    CalendarModel.remove( { _id : reqId }, function( err, replies ){
        return callBack( err, replies );
    });
};

exports.addCal = function( reqObj, callBack ){

    var calendarModel = new CalendarModel();

    _.extend( calendarModel, reqObj );

    calendarModel.save(function( err, replies ){
        callBack( err, replies );
    });
};

