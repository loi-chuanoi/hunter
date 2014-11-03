/**********************************************
 *  3/11/2014
 *   create by Huy Nguyen <huynguyen1059@gmail.com>
 *   Javascript auto completed lilbrary
 */
if("undefined"==typeof jQuery)throw new Error("Hunter requires jQuery > 1.9");
var js_Hunter = function(_config){
    if("undefined" == typeof (_config.target)){
        throw new Error("Hunterjs require target element");
    }else{
        $(document).delegate(_config.target,"keyup",function(e){
           sync($(_config.target).val());
        });
    }
    var sync = function(_data){
        if("undefined" == typeof(_config.remote)){
            throw new Error("Hunterjs sync requite remote host");
        }else{
            $.ajax({
                url: _config.remote,
                cache: false,
                async: true,
                type: "POST",
                data:_data
            }).done(function (data) {
                console.log(data);
            });
        }
    };
    var get=function(max){

    };
    var push=function(value){

    };
}