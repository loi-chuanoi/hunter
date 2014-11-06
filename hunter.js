/**********************************************
 *  3/11/2014
 *   create by Huy Nguyen <huynguyen1059@gmail.com>
 *   Javascript auto completed lilbrary
 */
if ("undefined" == typeof jQuery)throw new Error("Hunter requires jQuery > 1.9");
var js_Hunter = function (_config) {
    var is_syncing = false;

    var load_Storage = function () {
        var _c = JSON.parse(localStorage.getItem("js_Hunter" + _config.target));
        if("undefined" == typeof (_c) || !_c ){
            return;
        }
        if ("undefined" == typeof(_c.sync_data)) {
            _c.sync_data = [];
        }
        if ("undefined" == typeof(_c.keys_history)) {
            _c.keys_history = [];
        }
        _config.sync_data = _c.sync_data;
        _config.keys_history = _c.keys_history;
        init_dropdowns();
    }
    var init_dropdowns = function(){
        var html="";
        for(var i in _config.keys_history){
          html += '<li role="presentation"><a role="menuitem" onclick="$(\'' + _config.target + '\').val(' +_config.keys_history[i]  + ')" tabindex="-1">' + _config.keys_history[i] + '</a>\
            </li>';
        }
      $(_config.target).parent().find(".dropdown-menu").first().html(html);
    }

    load_Storage();
    if ("undefined" == typeof (_config.target)) {
        throw new Error("Hunterjs require target element");
    } else {
        $(document).delegate(_config.target, "keyup", function (e) {
            sync($(_config.target).val());
        });
        $(document).delegate(_config.target, "change", function (e) {
            saveh($(_config.target).val());
        });
    }
    var sync = function (_data) {
        if ("undefined" == typeof(_config.remote)) {
            throw new Error("Hunterjs sync requite remote host");
        } else {
            if (js_Hunter.is_syncing) {
                return;
            }
            js_Hunter.is_syncing = true;
            $.ajax({
                url: _config.remote,
                cache: false,
                async: false,
                type: "POST",
                data: _data
            }).done(function (data) {
                js_Hunter.is_syncing = false;
                if ("undefined" == typeof(_config.sync_data)) {
                    _config.sync_data = [];
                }
                if (_config.sync_data.length >= 1000) {
                    _config.sync_data = _config.sync_data.slice(0, 1000);
                }
                _config.sync_data["k_" + _data] = data
                save_Storage();
                if("undefined" != typeof (this.onitemready)){
                    this.onitemready(data);
                }
            }).error(function () {
                js_Hunter.is_syncing = false;
            });
        }
    };
    this.getConfig = function () {
        return _config;
    }
    var saveh = function (_data) {
        if ("undefined" == typeof (_config.keys_history)) {
            _config.keys_history = [];
        } else {
            if (_config.keys_history.length > 10) {
                _config.keys_history = _config.keys_history.slice(0, 10);
            }
        }
        _config.keys_history.push(_data);
        save_Storage();
    }
    var save_Storage = function () {
        localStorage.setItem("js_Hunter" + _config.target, JSON.stringify(_config));
    }

    var get = function (max) {

    };
    var push = function (value) {

    };
    this.readSugget = function(max_item){
        if("undefined" == typeof(max_item)){
            max_item = 10;
        }

    };
    this.onitemready = function(item){

    }
}