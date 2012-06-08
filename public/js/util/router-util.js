/**
 *  @fileOverview : Router模块相关的工具方法
 *  @author : Sunwenchao
 */
define(function (require, exports, module) {

    // 将路由列表转换为一个方便处理的对象数组，方便对key和回调传参的处理
    var createRouterHandlers = function( oriObj ) {

        var handlerList = [];

        var namedParam = /:\w+/g,
            splatParam = /\*\w+/g,
            escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;

        for( var route in oriObj ) {
            var destObj = {};

            var replaceRoute = route.replace( escapeRegExp, '\\$&' )
                .replace( namedParam, '([^\/]+)' )
                .replace( splatParam, '(.*?)' );

            destObj.reg =  new RegExp( '^' + replaceRoute + '$' );

            destObj.callback = oriObj[ route ];

            handlerList.push( destObj );
        }

        return handlerList;
    };

    // 处理createRouterHandlers产生的数组，根据传入的url片段匹配，执行回调
    var handleFragment = function( realPath, handlerList ) {

        _.any( handlerList, function( handler ) {
            var routeResult = handler.reg.exec( realPath );

            if ( routeResult ) {
                var thisArgs = routeResult.slice( 1 );
                handler.callback.apply( this, thisArgs );
                return true;
            }
        });
    };

    exports.createRouterHandlers = createRouterHandlers;
    exports.handleFragment = handleFragment;

});