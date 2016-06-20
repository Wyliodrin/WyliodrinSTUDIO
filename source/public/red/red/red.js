/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

 var flow = [];
 var flowsLoaded = false;
 var project = null;
 var wyliodrin = null;

 function loadMain ()
 {
    setTimeout (function ()
    {
        RED.nodes.import(flow);
        RED.nodes.dirty(false);
        RED.view.redraw(true);
    });
 }

window.addEventListener ('message', function (message)
{
    wyliodrin = message.source;
    // console.log ('message');
    // console.log (message);
    project = message.data;
    if (!project.id && project.id !== 0)
    {
        project = {id:-1};
    }
    // console.log (project);
    if (project.id >= 0)
    {
        try
        {
            JSON.parse(project.main);
            flow = project.main;
        }
        catch (exception)
        {
            flow = [];
        }
    }
    // console.log (flow);
    // console.log ({type:'flow', flow: JSON.stringify(flow)});
    if (flowsLoaded === true) loadMain ();
});

var RED = (function() {


    function loadNodeList() {
        $.ajax({
            headers: {
                "Accept":"application/json"
            },
            cache: false,
            url: 'nodes.json',
            dataType:'json',
            success: function(data) {
                // data = JSON.parse (data);
                // console.log (data)
                RED.nodes.setNodeList(data);

                var nsCount = 0;
                for(var i=0;i<data.length;i++) {
                    var ns = data[i];
                    if (ns.module != "node-red") {
                        nsCount++;
                        RED.i18n.loadCatalog(ns.id, function() {
                            nsCount--;
                            if (nsCount === 0) {
                                loadNodes();
                            }
                        });
                    }
                }
                if (nsCount === 0) {
                    loadNodes();
                }
            }
        });
    }

    function loadNodes() {
        $.ajax({
            headers: {
                "Accept":"text/html"
            },
            cache: false,
            url: 'nodes.html',
            success: function(data) {
                $("body").append(data);
                $("body").i18n();


                $(".palette-spinner").hide();
                $(".palette-scroll").show();
                $("#palette-search").show();
                loadFlows();
            }
        });
    }

    function loadFlows() {
        flowsLoaded = true;
        loadMain ();
        // $.ajax({
        //     headers: {
        //         "Accept":"application/json"
        //     },
        //     cache: false,
        //     url: 'flows',
        //     success: function(nodes) {
        //         RED.nodes.import(nodes);
        //         RED.nodes.dirty(false);
        //         RED.view.redraw(true);
                // RED.comms.subscribe("status/#",function(topic,msg) {
                //     var parts = topic.split("/");
                //     var node = RED.nodes.node(parts[1]);
                //     if (node) {
                //         if (msg.text) {
                //             msg.text = node._(msg.text.toString(),{defaultValue:msg.text.toString()});
                //         }
                //         node.status = msg;
                //         if (statusEnabled) {
                //             node.dirty = true;
                //             RED.view.redraw();
                //         }
                //     }
                // });
                // RED.comms.subscribe("node/#",function(topic,msg) {
                //     var i,m;
                //     var typeList;
                //     var info;

                //     if (topic == "node/added") {
                //         var addedTypes = [];
                //         for (i=0;i<msg.length;i++) {
                //             m = msg[i];
                //             var id = m.id;
                //             RED.nodes.addNodeSet(m);
                //             addedTypes = addedTypes.concat(m.types);
                //             RED.i18n.loadCatalog(id, function() {
                //                 $.get('nodes/'+id, function(data) {
                //                     $("body").append(data);
                //                 });
                //             });
                //         }
                //         if (addedTypes.length) {
                //             typeList = "<ul><li>"+addedTypes.join("</li><li>")+"</li></ul>";
                //             RED.notify(RED._("palette.event.nodeAdded", {count:addedTypes.length})+typeList,"success");
                //         }
                //     } else if (topic == "node/removed") {
                //         for (i=0;i<msg.length;i++) {
                //             m = msg[i];
                //             info = RED.nodes.removeNodeSet(m.id);
                //             if (info.added) {
                //                 typeList = "<ul><li>"+m.types.join("</li><li>")+"</li></ul>";
                //                 RED.notify(RED._("palette.event.nodeRemoved", {count:m.types.length})+typeList,"success");
                //             }
                //         }
                //     } else if (topic == "node/enabled") {
                //         if (msg.types) {
                //             info = RED.nodes.getNodeSet(msg.id);
                //             if (info.added) {
                //                 RED.nodes.enableNodeSet(msg.id);
                //                 typeList = "<ul><li>"+msg.types.join("</li><li>")+"</li></ul>";
                //                 RED.notify(RED._("palette.event.nodeEnabled", {count:msg.types.length})+typeList,"success");
                //             } else {
                //                 $.get('nodes/'+msg.id, function(data) {
                //                     $("body").append(data);
                //                     typeList = "<ul><li>"+msg.types.join("</li><li>")+"</li></ul>";
                //                     RED.notify(RED._("palette.event.nodeAdded", {count:msg.types.length})+typeList,"success");
                //                 });
                //             }
                //         }
                //     } else if (topic == "node/disabled") {
                //         if (msg.types) {
                //             RED.nodes.disableNodeSet(msg.id);
                //             typeList = "<ul><li>"+msg.types.join("</li><li>")+"</li></ul>";
                //             RED.notify(RED._("palette.event.nodeDisabled", {count:msg.types.length})+typeList,"success");
                //         }
                //     }
                    // Refresh flow library to ensure any examples are updated
                    // RED.library.loadFlowLibrary();
        //         });
        //     }
        // });
    }

    var statusEnabled = false;
    function toggleStatus(state) {
        statusEnabled = state;
        RED.view.status(statusEnabled);
    }

    function loadEditor() {
        RED.menu.init({id:"btn-sidemenu",
            options: [
                {id:"menu-item-view-menu",label:RED._("menu.label.view.view"),options:[
                    {id:"menu-item-view-show-grid",label:RED._("menu.label.view.showGrid"),toggle:true,onselect:RED.view.toggleShowGrid},
                    {id:"menu-item-view-snap-grid",label:RED._("menu.label.view.snapGrid"),toggle:true,onselect:RED.view.toggleSnapGrid},
                    {id:"menu-item-status",label:RED._("menu.label.displayStatus"),toggle:true,onselect:toggleStatus, selected: true},
                    null,
                    {id:"menu-item-sidebar",label:RED._("menu.label.sidebar.show"),toggle:true,onselect:RED.sidebar.toggleSidebar, selected: true}
                ]},
                null,
                {id:"menu-item-import",label:RED._("menu.label.import"),options:[
                    {id:"menu-item-import-clipboard",label:RED._("menu.label.clipboard"),onselect:RED.clipboard.import},
                    {id:"menu-item-import-library",label:RED._("menu.label.library"),options:[]}
                ]},
                {id:"menu-item-export",label:RED._("menu.label.export"),disabled:true,options:[
                    {id:"menu-item-export-clipboard",label:RED._("menu.label.clipboard"),disabled:true,onselect:RED.clipboard.export},
                    {id:"menu-item-export-library",label:RED._("menu.label.library"),disabled:true,onselect:RED.library.export}
                ]},
                null,
                {id:"menu-item-config-nodes",label:RED._("menu.label.displayConfig"),onselect:function(){}},
                {id:"menu-item-workspace",label:RED._("menu.label.flows"),options:[
                    {id:"menu-item-workspace-add",label:RED._("menu.label.add"),onselect:RED.workspaces.add},
                    {id:"menu-item-workspace-edit",label:RED._("menu.label.rename"),onselect:RED.workspaces.edit},
                    {id:"menu-item-workspace-delete",label:RED._("menu.label.delete"),onselect:RED.workspaces.remove},
                    null
                ]},
                {id:"menu-item-subflow",label:RED._("menu.label.subflows"), options: [
                    {id:"menu-item-subflow-create",label:RED._("menu.label.createSubflow"),onselect:RED.subflow.createSubflow},
                    {id:"menu-item-subflow-convert",label:RED._("menu.label.selectionToSubflow"),disabled:true,onselect:RED.subflow.convertToSubflow},
                ]},
                null,
                {id:"menu-item-keyboard-shortcuts",label:RED._("menu.label.keyboardShortcuts"),onselect:RED.keyboard.showHelp},
                {id:"menu-item-help",
                    label: RED.settings.theme("menu.menu-item-help.label","Node-RED Website"),
                    href: RED.settings.theme("menu.menu-item-help.url","http://nodered.org/docs")
                },
                {id:"menu-item-node-red-version", label:"v"+RED.settings.version}
            ]
        });

        RED.user.init();

        RED.library.init();
        RED.palette.init();
        RED.sidebar.init();
        RED.subflow.init();
        RED.workspaces.init();
        RED.clipboard.init();
        RED.view.init();
        RED.editor.init();

        // RED.deploy.init(RED.settings.theme("deployButton",null));

        RED.keyboard.add(/* ? */ 191,{shift:true},function(){RED.keyboard.showHelp();d3.event.preventDefault();});
        // RED.comms.connect();

        $("#main-container").show();
        $(".header-toolbar").show();

        loadNodeList();
    }

    $(function() {

        if ((window.location.hostname !== "localhost") && (window.location.hostname !== "127.0.0.1")) {
            document.title = document.title+" : "+window.location.hostname;
        }

        ace.require("ace/ext/language_tools");

        RED.i18n.init(function() {
            RED.settings.init(loadEditor);
        })
    });


    return {
    };
})();
;/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

 RED.events = (function() {
     var handlers = {};

     function on(evt,func) {
         handlers[evt] = handlers[evt]||[];
         handlers[evt].push(func);
     }
     function off(evt,func) {
         var handler = handlers[evt];
         if (handler) {
             for (var i=0;i<handler.length;i++) {
                 if (handler[i] === func) {
                     handler.splice(i,1);
                     return;
                 }
             }
         }
     }
     function emit(evt,arg) {
         if (handlers[evt]) {
             for (var i=0;i<handlers[evt].length;i++) {
                 handlers[evt][i](arg);
             }

         }
     }
     return {
         on: on,
         off: off,
         emit: emit
     }
 })();
;/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.i18n = (function() {

    return {
        init: function(done) {
            i18n.init({
                resGetPath: 'locales/__ns__',
                dynamicLoad: false,
                load:'current',
                ns: {
                    namespaces: ["editor","node-red"],
                    defaultNs: "editor"
                },
                fallbackLng: ['en-US'],
                useCookie: false
            },function() {
                done();
            });
            RED["_"] = function() {
                return i18n.t.apply(null,arguments);
            }

        },
        loadCatalog: function(namespace,done) {
            i18n.loadNamespace(namespace,done);
        }
    }
})();
;/**
 * Copyright 2014 IBM, Antoine Aflalo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/


RED.settings = (function () {

    var loadedSettings = {};

    var hasLocalStorage = function () {
        return false;
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    var set = function (key, value) {
        if (!hasLocalStorage()) {
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
    };
    /**
     * If the key is not set in the localStorage it returns <i>undefined</i>
     * Else return the JSON parsed value
     * @param key
     * @returns {*}
     */
    var get = function (key) {
        if (!hasLocalStorage()) {
            return undefined;
        }
        return JSON.parse(localStorage.getItem(key));
    };

    var remove = function (key) {
        if (!hasLocalStorage()) {
            return;
        }
        localStorage.removeItem(key);
    };

    var setProperties = function(data) {
        for (var prop in loadedSettings) {
            if (loadedSettings.hasOwnProperty(prop) && RED.settings.hasOwnProperty(prop)) {
                delete RED.settings[prop];
            }
        }
        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                RED.settings[prop] = data[prop];
            }
        }
        loadedSettings = data;
    };

    var init = function (done) {
        var accessTokenMatch = /[?&]access_token=(.*?)(?:$|&)/.exec(window.location.search);
        if (accessTokenMatch) {
            var accessToken = accessTokenMatch[1];
            RED.settings.set("auth-tokens",{access_token: accessToken});
            window.location.search = "";
        }

        $.ajaxSetup({
            beforeSend: function(jqXHR,settings) {
                // Only attach auth header for requests to relative paths
                if (!/^\s*(https?:|\/|\.)/.test(settings.url)) {
                    var auth_tokens = RED.settings.get("auth-tokens");
                    if (auth_tokens) {
                        jqXHR.setRequestHeader("Authorization","Bearer "+auth_tokens.access_token);
                    }
                }
            }
        });

        load(done);
    }

    var load = function(done) {
        $.ajax({
            headers: {
                "Accept": "application/json"
            },
            dataType: "json",
            cache: false,
            url: 'settings.json',
            success: function (data) {
                setProperties(data);
                if (RED.settings.user && RED.settings.user.anonymous) {
                    RED.settings.remove("auth-tokens");
                }
                console.log("Node-RED: " + data.version);
                done();
            },
            error: function(jqXHR,textStatus,errorThrown) {
                if (jqXHR.status === 401) {
                    if (/[?&]access_token=(.*?)(?:$|&)/.test(window.location.search)) {
                        window.location.search = "";
                    }
                    RED.user.login(function() { load(done); });
                 } else {
                     console.log("Unexpected error:",jqXHR.status,textStatus);
                 }
            }
        });
    };

    function theme(property,defaultValue) {
        if (!RED.settings.editorTheme) {
            return defaultValue;
        }
        var parts = property.split(".");
        var v = RED.settings.editorTheme;
        try {
            for (var i=0;i<parts.length;i++) {
                v = v[parts[i]];
            }
            return v;
        } catch(err) {
            return defaultValue;
        }
    }

    return {
        init: init,
        load: load,
        set: set,
        get: get,
        remove: remove,

        theme: theme
    }
})
();
;/**
 * Copyright 2014, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.user = (function() {

    function login(opts,done) {
        if (typeof opts == 'function') {
            done = opts;
            opts = {};
        }

        var dialog = $('<div id="node-dialog-login" class="hide">'+
                       '<div style="display: inline-block;width: 250px; vertical-align: top; margin-right: 10px; margin-bottom: 20px;"><img id="node-dialog-login-image" src=""/></div>'+
                       '<div style="display: inline-block; width: 250px; vertical-align: bottom; margin-left: 10px; margin-bottom: 20px;">'+
                       '<form id="node-dialog-login-fields" class="form-horizontal" style="margin-bottom: 0px;"></form>'+
                       '</div>'+
                       '</div>');

        dialog.dialog({
            autoOpen: false,
            dialogClass: "ui-dialog-no-close",
            modal: true,
            closeOnEscape: false,
            width: 600,
            resizable: false,
            draggable: false
        });

        $("#node-dialog-login-fields").empty();
        $.ajax({
            dataType: "json",
            url: "auth/login",
            success: function(data) {
                if (data.type == "credentials") {
                    var i=0;

                    if (data.image) {
                        $("#node-dialog-login-image").attr("src",data.image);
                    } else {
                        $("#node-dialog-login-image").attr("src","red/images/node-red-256.png");
                    }
                    for (;i<data.prompts.length;i++) {
                        var field = data.prompts[i];
                        var row = $("<div/>",{id:"rrr"+i,class:"form-row"});
                        $('<label for="node-dialog-login-'+field.id+'">'+field.label+':</label><br/>').appendTo(row);
                        var input = $('<input style="width: 100%" id="node-dialog-login-'+field.id+'" type="'+field.type+'" tabIndex="'+(i+1)+'"/>').appendTo(row);

                        if (i<data.prompts.length-1) {
                            input.keypress(
                                (function() {
                                    var r = row;
                                    return function(event) {
                                        if (event.keyCode == 13) {
                                            r.next("div").find("input").focus();
                                            event.preventDefault();
                                        }
                                    }
                                })()
                            );
                        }
                        row.appendTo("#node-dialog-login-fields");
                    }
                    $('<div class="form-row" style="text-align: right; margin-top: 10px;"><span id="node-dialog-login-failed" style="line-height: 2em;float:left;" class="hide">'+RED._("user.loginFailed")+'</span><img src="red/images/spin.svg" style="height: 30px; margin-right: 10px; " class="login-spinner hide"/>'+
                        (opts.cancelable?'<a href="#" id="node-dialog-login-cancel" style="margin-right: 20px;" tabIndex="'+(i+1)+'">'+RED._("common.label.cancel")+'</a>':'')+
                        '<input type="submit" id="node-dialog-login-submit" style="width: auto;" tabIndex="'+(i+2)+'" value="'+RED._("user.login")+'"></div>').appendTo("#node-dialog-login-fields");


                    $("#node-dialog-login-submit").button();
                    $("#node-dialog-login-fields").submit(function(event) {
                        $("#node-dialog-login-submit").button("option","disabled",true);
                        $("#node-dialog-login-failed").hide();
                        $(".login-spinner").show();

                        var body = {
                            client_id: "node-red-editor",
                            grant_type: "password",
                            scope:""
                        }
                        for (var i=0;i<data.prompts.length;i++) {
                            var field = data.prompts[i];
                            body[field.id] = $("#node-dialog-login-"+field.id).val();
                        }
                        $.ajax({
                            url:"auth/token",
                            type: "POST",
                            data: body
                        }).done(function(data,textStatus,xhr) {
                            RED.settings.set("auth-tokens",data);
                            $("#node-dialog-login").dialog('destroy').remove();
                            done();
                        }).fail(function(jqXHR,textStatus,errorThrown) {
                            RED.settings.remove("auth-tokens");
                            $("#node-dialog-login-failed").show();
                        }).always(function() {
                            $("#node-dialog-login-submit").button("option","disabled",false);
                            $(".login-spinner").hide();
                        });
                        event.preventDefault();
                    });
                    if (opts.cancelable) {
                        $("#node-dialog-login-cancel").button().click(function( event ) {
                            $("#node-dialog-login").dialog('destroy').remove();
                        });
                    }
                }
                dialog.dialog("open");
            }
        });
    }

    function logout() {
        $.ajax({
            url: "auth/revoke",
            type: "POST",
            data: {token:RED.settings.get("auth-tokens").access_token},
            success: function() {
                RED.settings.remove("auth-tokens");
                document.location.reload(true);
            }
        })
    }

    function updateUserMenu() {
        $("#usermenu-submenu li").remove();
        if (RED.settings.user.anonymous) {
            RED.menu.addItem("btn-usermenu",{
                id:"usermenu-item-login",
                label:RED._("menu.label.login"),
                onselect: function() {
                    RED.user.login({cancelable:true},function() {
                        RED.settings.load(function() {
                            RED.notify(RED._("user.loggedInAs",{name:RED.settings.user.username}),"success");
                            updateUserMenu();
                        });
                    });
                }
            });
        } else {
            RED.menu.addItem("btn-usermenu",{
                id:"usermenu-item-username",
                label:"<b>"+RED.settings.user.username+"</b>"
            });
            RED.menu.addItem("btn-usermenu",{
                id:"usermenu-item-logout",
                label:RED._("menu.label.logout"),
                onselect: function() {
                    RED.user.logout();
                }
            });
        }

    }



    function init() {
        if (RED.settings.user) {
            if (!RED.settings.editorTheme || !RED.settings.editorTheme.hasOwnProperty("userMenu")) {

                $('<li><a id="btn-usermenu" class="button hide" data-toggle="dropdown" href="#"><i class="fa fa-user"></i></a></li>')
                    .prependTo(".header-toolbar");

                RED.menu.init({id:"btn-usermenu",
                    options: []
                });
                updateUserMenu();
            }
        }

    }
    return {
        init: init,
        login: login,
        logout: logout
    }

})();
;/**
 * Copyright 2014, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.comms = (function() {

    var errornotification = null;
    var clearErrorTimer = null;

    var subscriptions = {};
    var ws;
    var pendingAuth = false;
    var reconnectAttempts = 0;

    function connectWS() {
        var path = location.hostname;
        var port = location.port;
        if (port.length !== 0) {
            path = path+":"+port;
        }
        path = path+document.location.pathname;
        path = path+(path.slice(-1) == "/"?"":"/")+"comms";
        path = "ws"+(document.location.protocol=="https:"?"s":"")+"://"+path;

        var auth_tokens = RED.settings.get("auth-tokens");
        pendingAuth = (auth_tokens!=null);

        function completeConnection() {
            for (var t in subscriptions) {
                if (subscriptions.hasOwnProperty(t)) {
                    ws.send(JSON.stringify({subscribe:t}));
                }
            }
        }

        ws = new WebSocket(path);
        ws.onopen = function() {
            reconnectAttempts = 0;
            if (errornotification) {
                clearErrorTimer = setTimeout(function() {
                    errornotification.close();
                    errornotification = null;
                },1000);
            }
            if (pendingAuth) {
                ws.send(JSON.stringify({auth:auth_tokens.access_token}));
            } else {
                completeConnection();
            }
        }
        ws.onmessage = function(event) {
            var msg = JSON.parse(event.data);
            if (pendingAuth && msg.auth == "ok") {
                pendingAuth = false;
                completeConnection();
            } else if (msg.topic) {
                for (var t in subscriptions) {
                    if (subscriptions.hasOwnProperty(t)) {
                        var re = new RegExp("^"+t.replace(/([\[\]\?\(\)\\\\$\^\*\.|])/g,"\\$1").replace(/\+/g,"[^/]+").replace(/\/#$/,"(\/.*)?")+"$");
                        if (re.test(msg.topic)) {
                            var subscribers = subscriptions[t];
                            if (subscribers) {
                                for (var i=0;i<subscribers.length;i++) {
                                    subscribers[i](msg.topic,msg.data);
                                }
                            }
                        }
                    }
                }
            }
        };
        ws.onclose = function() {
            if (reconnectAttempts > 5 && errornotification == null) {
                errornotification = RED.notify(RED._("notification.error",{message:RED._("notification.errors.lostConnection")}),"error",true);
            } else if (clearErrorTimer) {
                clearTimeout(clearErrorTimer);
                clearErrorTimer = null;
            }
            reconnectAttempts++;
            setTimeout(connectWS,1000);
        }
    }

    function subscribe(topic,callback) {
        if (subscriptions[topic] == null) {
            subscriptions[topic] = [];
        }
        subscriptions[topic].push(callback);
        if (ws && ws.readyState == 1) {
            ws.send(JSON.stringify({subscribe:topic}));
        }
    }

    function unsubscribe(topic,callback) {
        if (subscriptions[topic]) {
            for (var i=0;i<subscriptions[topic].length;i++) {
                if (subscriptions[topic][i] === callback) {
                    subscriptions[topic].splice(i,1);
                    break;
                }
            }
            if (subscriptions[topic].length === 0) {
                delete subscriptions[topic];
            }
        }
    }

    return {
        connect: connectWS,
        subscribe: subscribe,
        unsubscribe:unsubscribe
    }
})();
;/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.state = {
    DEFAULT: 0,
    MOVING: 1,
    JOINING: 2,
    MOVING_ACTIVE: 3,
    ADDING: 4,
    EDITING: 5,
    EXPORT: 6,
    IMPORT: 7,
    IMPORT_DRAGGING: 8
}
;/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.nodes = (function() {

    var node_defs = {};
    var nodes = [];
    var configNodes = {};
    var links = [];
    var defaultWorkspace;
    var workspaces = {};
    var subflows = {};

    var dirty = false;

    function setDirty(d) {
        dirty = d;
        if (dirty === true)
        {
            console.log (JSON.stringify(RED.nodes.createCompleteNodeSet()));
            if (project !== null && wyliodrin !== null)
            {
                wyliodrin.postMessage ({type:'flow', projectId:project.id, flow:JSON.stringify(RED.nodes.createCompleteNodeSet())}, '*');
            }
            dirty = false;
        }
        RED.events.emit("nodes:change",{dirty:dirty});
    }

    var registry = (function() {
        var nodeList = [];
        var nodeSets = {};
        var typeToId = {};
        var nodeDefinitions = {};

        var exports = {
            getNodeList: function() {
                return nodeList;
            },
            setNodeList: function(list) {
                nodeList = [];
                for(var i=0;i<list.length;i++) {
                    var ns = list[i];
                    exports.addNodeSet(ns);
                }
            },
            addNodeSet: function(ns) {
                ns.added = false;
                // console.log (ns);
                nodeSets[ns.id] = ns;
                for (var j=0;j<ns.types.length;j++) {
                    typeToId[ns.types[j]] = ns.id;
                }
                nodeList.push(ns);
            },
            removeNodeSet: function(id) {
                var ns = nodeSets[id];
                for (var j=0;j<ns.types.length;j++) {
                    if (ns.added) {
                        // TODO: too tightly coupled into palette UI
                        RED.palette.remove(ns.types[j]);
                        var def = nodeDefinitions[ns.types[j]];
                        if (def.onpaletteremove && typeof def.onpaletteremove === "function") {
                            def.onpaletteremove.call(def);
                        }
                    }
                    delete typeToId[ns.types[j]];
                }
                delete nodeSets[id];
                for (var i=0;i<nodeList.length;i++) {
                    if (nodeList[i].id == id) {
                        nodeList.splice(i,1);
                        break;
                    }
                }
                return ns;
            },
            getNodeSet: function(id) {
                return nodeSets[id];
            },
            enableNodeSet: function(id) {
                var ns = nodeSets[id];
                ns.enabled = true;
                for (var j=0;j<ns.types.length;j++) {
                    // TODO: too tightly coupled into palette UI
                    RED.palette.show(ns.types[j]);
                    var def = nodeDefinitions[ns.types[j]];
                    if (def.onpaletteadd && typeof def.onpaletteadd === "function") {
                        def.onpaletteadd.call(def);
                    }
                }
            },
            disableNodeSet: function(id) {
                var ns = nodeSets[id];
                ns.enabled = false;
                for (var j=0;j<ns.types.length;j++) {
                    // TODO: too tightly coupled into palette UI
                    RED.palette.hide(ns.types[j]);
                    var def = nodeDefinitions[ns.types[j]];
                    if (def.onpaletteremove && typeof def.onpaletteremove === "function") {
                        def.onpaletteremove.call(def);
                    }
                }
            },
            registerNodeType: function(nt,def) {
                // console.log (nt);
                // console.log (def);
                nodeDefinitions[nt] = def;
                if (def.category != "subflows") {
                    def.set = nodeSets[typeToId[nt]];
                    nodeSets[typeToId[nt]].added = true;

                    var ns;
                    if (def.set.module === "node-red") {
                        ns = "node-red";
                    } else {
                        ns = def.set.id;
                    }
                    def["_"] = function() {
                        var args = Array.prototype.slice.call(arguments, 0);
                        if (args[0].indexOf(":") === -1) {
                            args[0] = ns+":"+args[0];
                        }
                        return RED._.apply(null,args);
                    }

                    // TODO: too tightly coupled into palette UI
                }
                RED.palette.add(nt,def);
                if (def.onpaletteadd && typeof def.onpaletteadd === "function") {
                    def.onpaletteadd.call(def);
                }
            },
            removeNodeType: function(nt) {
                if (nt.substring(0,8) != "subflow:") {
                    // NON-NLS - internal debug message
                    throw new Error("this api is subflow only. called with:",nt);
                }
                delete nodeDefinitions[nt];
                RED.palette.remove(nt);
            },
            getNodeType: function(nt) {
                return nodeDefinitions[nt];
            }
        };
        return exports;
    })();

    function getID() {
        return (1+Math.random()*4294967295).toString(16);
    }

    function addNode(n) {
        if (n.type.indexOf("subflow") !== 0) {
            n["_"] = n._def._;
        }
        if (n._def.category == "config") {
            configNodes[n.id] = n;
        } else {
            n.ports = [];
            if (n.outputs) {
                for (var i=0;i<n.outputs;i++) {
                    n.ports.push(i);
                }
            }
            n.dirty = true;
            var updatedConfigNode = false;
            for (var d in n._def.defaults) {
                if (n._def.defaults.hasOwnProperty(d)) {
                    var property = n._def.defaults[d];
                    if (property.type) {
                        var type = registry.getNodeType(property.type);
                        if (type && type.category == "config") {
                            var configNode = configNodes[n[d]];
                            if (configNode) {
                                updatedConfigNode = true;
                                configNode.users.push(n);
                            }
                        }
                    }
                }
            }
            if (updatedConfigNode) {
                // TODO: refresh config tab?
            }
            if (n._def.category == "subflows" && typeof n.i === "undefined") {
                var nextId = 0;
                RED.nodes.eachNode(function(node) {
                    nextId = Math.max(nextId,node.i||0);
                });
                n.i = nextId+1;
            }
            nodes.push(n);
        }
        if (n._def.onadd) {
            n._def.onadd.call(n);
        }
    }
    function addLink(l) {
        links.push(l);
    }

    function getNode(id) {
        if (id in configNodes) {
            return configNodes[id];
        } else {
            for (var n in nodes) {
                if (nodes[n].id == id) {
                    return nodes[n];
                }
            }
        }
        return null;
    }

    function removeNode(id) {
        var removedLinks = [];
        var removedNodes = [];
        var node;
        if (id in configNodes) {
            node = configNodes[id];
            delete configNodes[id];
            RED.workspaces.refresh();
        } else {
            node = getNode(id);
            if (node) {
                nodes.splice(nodes.indexOf(node),1);
                removedLinks = links.filter(function(l) { return (l.source === node) || (l.target === node); });
                removedLinks.forEach(function(l) {links.splice(links.indexOf(l), 1); });
                var updatedConfigNode = false;
                for (var d in node._def.defaults) {
                    if (node._def.defaults.hasOwnProperty(d)) {
                        var property = node._def.defaults[d];
                        if (property.type) {
                            var type = registry.getNodeType(property.type);
                            if (type && type.category == "config") {
                                var configNode = configNodes[node[d]];
                                if (configNode) {
                                    updatedConfigNode = true;
                                    if (configNode._def.exclusive) {
                                        removeNode(node[d]);
                                        removedNodes.push(configNode);
                                    } else {
                                        var users = configNode.users;
                                        users.splice(users.indexOf(node),1);
                                    }
                                }
                            }
                        }
                    }
                }
                if (updatedConfigNode) {
                    RED.workspaces.refresh();
                }
            }
        }
        if (node && node._def.onremove) {
            node._def.onremove.call(n);
        }
        return {links:removedLinks,nodes:removedNodes};
    }

    function removeLink(l) {
        var index = links.indexOf(l);
        if (index != -1) {
            links.splice(index,1);
        }
    }

    function addWorkspace(ws) {
        workspaces[ws.id] = ws;
    }
    function getWorkspace(id) {
        return workspaces[id];
    }
    function removeWorkspace(id) {
        delete workspaces[id];
        var removedNodes = [];
        var removedLinks = [];
        var n;
        var node;
        for (n=0;n<nodes.length;n++) {
            node = nodes[n];
            if (node.z == id) {
                removedNodes.push(node);
            }
        }
        for(n in configNodes) {
            if (configNodes.hasOwnProperty(n)) {
                node = configNodes[n];
                if (node.z == id) {
                    removedNodes.push(node);
                }
            }
        }
        for (n=0;n<removedNodes.length;n++) {
            var result = removeNode(removedNodes[n].id);
            removedLinks = removedLinks.concat(result.links);
        }
        return {nodes:removedNodes,links:removedLinks};
    }

    function addSubflow(sf, createNewIds) {
        if (createNewIds) {
            var subflowNames = Object.keys(subflows).map(function(sfid) {
                return subflows[sfid].name;
            });

            subflowNames.sort();
            var copyNumber = 1;
            var subflowName = sf.name;
            subflowNames.forEach(function(name) {
                if (subflowName == name) {
                    copyNumber++;
                    subflowName = sf.name+" ("+copyNumber+")";
                }
            });
            sf.name = subflowName;
        }

        subflows[sf.id] = sf;
        RED.nodes.registerType("subflow:"+sf.id, {
            defaults:{name:{value:""}},
            info: sf.info,
            icon:"subflow.png",
            category: "subflows",
            inputs: sf.in.length,
            outputs: sf.out.length,
            color: "#da9",
            label: function() { return this.name||RED.nodes.subflow(sf.id).name },
            labelStyle: function() { return this.name?"node_label_italic":""; },
            paletteLabel: function() { return RED.nodes.subflow(sf.id).name },
            set:{
                module: "node-red"
            }
        });


    }
    function getSubflow(id) {
        return subflows[id];
    }
    function removeSubflow(sf) {
        delete subflows[sf.id];
        registry.removeNodeType("subflow:"+sf.id);
    }

    function subflowContains(sfid,nodeid) {
        for (var i=0;i<nodes.length;i++) {
            var node = nodes[i];
            if (node.z === sfid) {
                var m = /^subflow:(.+)$/.exec(node.type);
                if (m) {
                    if (m[1] === nodeid) {
                        return true;
                    } else {
                        var result = subflowContains(m[1],nodeid);
                        if (result) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    function getAllFlowNodes(node) {
        var visited = {};
        visited[node.id] = true;
        var nns = [node];
        var stack = [node];
        while(stack.length !== 0) {
            var n = stack.shift();
            var childLinks = links.filter(function(d) { return (d.source === n) || (d.target === n);});
            for (var i=0;i<childLinks.length;i++) {
                var child = (childLinks[i].source === n)?childLinks[i].target:childLinks[i].source;
                var id = child.id;
                if (!id) {
                    id = child.direction+":"+child.i;
                }
                if (!visited[id]) {
                    visited[id] = true;
                    nns.push(child);
                    stack.push(child);
                }
            }
        }
        return nns;
    }

    /**
     * Converts a node to an exportable JSON Object
     **/
    function convertNode(n, exportCreds) {
        exportCreds = exportCreds || false;
        var node = {};
        node.id = n.id;
        node.type = n.type;
        node.z = n.z;
        if (node.type == "unknown") {
            for (var p in n._orig) {
                if (n._orig.hasOwnProperty(p)) {
                    node[p] = n._orig[p];
                }
            }
        } else {
            for (var d in n._def.defaults) {
                if (n._def.defaults.hasOwnProperty(d)) {
                    node[d] = n[d];
                }
            }
            if(exportCreds && n.credentials) {
                var credentialSet = {};
                node.credentials = {};
                for (var cred in n._def.credentials) {
                    if (n._def.credentials.hasOwnProperty(cred)) {
                        if (n._def.credentials[cred].type == 'password') {
                            if (n.credentials["has_"+cred] != n.credentials._["has_"+cred] ||
                                (n.credentials["has_"+cred] && n.credentials[cred])) {
                                credentialSet[cred] = n.credentials[cred];
                            }
                        } else if (n.credentials[cred] != null && n.credentials[cred] != n.credentials._[cred]) {
                            credentialSet[cred] = n.credentials[cred];
                        }
                    }
                }
                if (Object.keys(credentialSet).length > 0) {
                    node.credentials = credentialSet;
                }
            }
        }
        if (n._def.category != "config") {
            node.x = n.x;
            node.y = n.y;
            node.wires = [];
            for(var i=0;i<n.outputs;i++) {
                node.wires.push([]);
            }
            var wires = links.filter(function(d){return d.source === n;});
            for (var j=0;j<wires.length;j++) {
                var w = wires[j];
                if (w.target.type != "subflow") {
                    node.wires[w.sourcePort].push(w.target.id);
                }
            }
        }
        return node;
    }

    function convertSubflow(n) {
        var node = {};
        node.id = n.id;
        node.type = n.type;
        node.name = n.name;
        node.info = n.info;
        node.in = [];
        node.out = [];

        n.in.forEach(function(p) {
            var nIn = {x:p.x,y:p.y,wires:[]};
            var wires = links.filter(function(d) { return d.source === p });
            for (var i=0;i<wires.length;i++) {
                var w = wires[i];
                if (w.target.type != "subflow") {
                    nIn.wires.push({id:w.target.id})
                }
            }
            node.in.push(nIn);
        });
        n.out.forEach(function(p,c) {
            var nOut = {x:p.x,y:p.y,wires:[]};
            var wires = links.filter(function(d) { return d.target === p });
            for (i=0;i<wires.length;i++) {
                if (wires[i].source.type != "subflow") {
                    nOut.wires.push({id:wires[i].source.id,port:wires[i].sourcePort})
                } else {
                    nOut.wires.push({id:n.id,port:0})
                }
            }
            node.out.push(nOut);
        });


        return node;
    }
    /**
     * Converts the current node selection to an exportable JSON Object
     **/
    function createExportableNodeSet(set) {
        var nns = [];
        var exportedConfigNodes = {};
        var exportedSubflows = {};
        for (var n=0;n<set.length;n++) {
            var node = set[n];
            if (node.type.substring(0,8) == "subflow:") {
                var subflowId = node.type.substring(8);
                if (!exportedSubflows[subflowId]) {
                    exportedSubflows[subflowId] = true;
                    var subflow = getSubflow(subflowId);
                    var subflowSet = [subflow];
                    RED.nodes.eachNode(function(n) {
                        if (n.z == subflowId) {
                            subflowSet.push(n);
                        }
                    });
                    var exportableSubflow = createExportableNodeSet(subflowSet);
                    nns = exportableSubflow.concat(nns);
                }
            }
            if (node.type != "subflow") {
                var convertedNode = RED.nodes.convertNode(node);
                for (var d in node._def.defaults) {
                    if (node._def.defaults[d].type && node[d] in configNodes) {
                        var confNode = configNodes[node[d]];
                        var exportable = registry.getNodeType(node._def.defaults[d].type).exportable;
                        if ((exportable == null || exportable)) {
                            if (!(node[d] in exportedConfigNodes)) {
                                exportedConfigNodes[node[d]] = true;
                                nns.unshift(RED.nodes.convertNode(confNode));
                            }
                        } else {
                            convertedNode[d] = "";
                        }
                    }
                }
                nns.push(convertedNode);
            } else {
                var convertedSubflow = convertSubflow(node);
                nns.push(convertedSubflow);
            }
        }
        return nns;
    }

    //TODO: rename this (createCompleteNodeSet)
    function createCompleteNodeSet() {
        var nns = [];
        var i;
        for (i in workspaces) {
            if (workspaces.hasOwnProperty(i)) {
                if (workspaces[i].type == "tab") {
                    nns.push(workspaces[i]);
                }
            }
        }
        for (i in subflows) {
            if (subflows.hasOwnProperty(i)) {
                nns.push(convertSubflow(subflows[i]));
            }
        }
        for (i in configNodes) {
            if (configNodes.hasOwnProperty(i)) {
                nns.push(convertNode(configNodes[i], true));
            }
        }
        for (i=0;i<nodes.length;i++) {
            var node = nodes[i];
            nns.push(convertNode(node, true));
        }
        return nns;
    }

    function compareNodes(nodeA,nodeB,idMustMatch) {
        if (idMustMatch && nodeA.id != nodeB.id) {
            return false;
        }
        if (nodeA.type != nodeB.type) {
            return false;
        }
        var def = nodeA._def;
        for (var d in def.defaults) {
            if (def.defaults.hasOwnProperty(d)) {
                var vA = nodeA[d];
                var vB = nodeB[d];
                if (typeof vA !== typeof vB) {
                    return false;
                }
                if (vA === null || typeof vA === "string" || typeof vA === "number") {
                    if (vA !== vB) {
                        return false;
                    }
                } else {
                    if (JSON.stringify(vA) !== JSON.stringify(vB)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function importNodes(newNodesObj,createNewIds) {
        var i;
        var n;
        var newNodes;
        if (typeof newNodesObj === "string") {
            if (newNodesObj === "") {
                return;
            }
            try {
                newNodes = JSON.parse(newNodesObj);
            } catch(err) {
                var e = new Error(RED._("clipboard.invalidFlow",{message:err.message}));
                e.code = "NODE_RED";
                throw e;
            }
        } else {
            newNodes = newNodesObj;
        }

        if (!$.isArray(newNodes)) {
            newNodes = [newNodes];
        }
        var unknownTypes = [];
        for (i=0;i<newNodes.length;i++) {
            n = newNodes[i];
            // TODO: remove workspace in next release+1
            if (n.type != "workspace" &&
                n.type != "tab" &&
                n.type != "subflow" &&
                !registry.getNodeType(n.type) &&
                n.type.substring(0,8) != "subflow:" &&
                unknownTypes.indexOf(n.type)==-1) {
                    unknownTypes.push(n.type);
            }
        }
        if (unknownTypes.length > 0) {
            var typeList = "<ul><li>"+unknownTypes.join("</li><li>")+"</li></ul>";
            var type = "type"+(unknownTypes.length > 1?"s":"");
            RED.notify("<strong>"+RED._("clipboard.importUnrecognised",{count:unknownTypes.length})+"</strong>"+typeList,"error",false,10000);
        }

        var activeWorkspace = RED.workspaces.active();
        var activeSubflow = getSubflow(activeWorkspace);
        if (activeSubflow) {
            for (i=0;i<newNodes.length;i++) {
                var m = /^subflow:(.+)$/.exec(newNodes[i].type);
                if (m) {
                    var subflowId = m[1];
                    var err;
                    if (subflowId === activeSubflow.id) {
                        err = new Error(RED._("notification.errors.cannotAddSubflowToItself"));
                    }
                    if (subflowContains(m[1],activeSubflow.id)) {
                        err = new Error(RED._("notification.errors.cannotAddCircularReference"));
                    }
                    if (err) {
                        // TODO: standardise error codes
                        err.code = "NODE_RED";
                        throw err;
                    }
                }
            }
        }

        var new_workspaces = [];
        var workspace_map = {};
        var new_subflows = [];
        var subflow_map = {};
        var node_map = {};
        var new_nodes = [];
        var new_links = [];
        var nid;
        var def;
        for (i=0;i<newNodes.length;i++) {
            n = newNodes[i];
            // TODO: remove workspace in next release+1
            if (n.type === "workspace" || n.type === "tab") {
                if (n.type === "workspace") {
                    n.type = "tab";
                }
                if (defaultWorkspace == null) {
                    defaultWorkspace = n;
                }
                if (createNewIds) {
                    nid = getID();
                    workspace_map[n.id] = nid;
                    n.id = nid;
                }
                addWorkspace(n);
                RED.workspaces.add(n);
                new_workspaces.push(n);
            } else if (n.type === "subflow") {
                subflow_map[n.id] = n;
                if (createNewIds) {
                    nid = getID();
                    n.id = nid;
                }
                // TODO: handle createNewIds - map old to new subflow ids
                n.in.forEach(function(input,i) {
                    input.type = "subflow";
                    input.direction = "in";
                    input.z = n.id;
                    input.i = i;
                    input.id = getID();
                });
                n.out.forEach(function(output,i) {
                    output.type = "subflow";
                    output.direction = "out";
                    output.z = n.id;
                    output.i = i;
                    output.id = getID();
                });
                new_subflows.push(n);
                addSubflow(n,createNewIds);
            }
        }
        if (defaultWorkspace == null) {
            defaultWorkspace = { type:"tab", id:getID(), label:RED._('workspace.defaultName',{number:1})};
            addWorkspace(defaultWorkspace);
            RED.workspaces.add(defaultWorkspace);
            new_workspaces.push(defaultWorkspace);
            activeWorkspace = RED.workspaces.active();
        }

        for (i=0;i<newNodes.length;i++) {
            n = newNodes[i];
            def = registry.getNodeType(n.type);
            if (def && def.category == "config") {
                var existingConfigNode = null;
                if (createNewIds) {
                    if (n.z) {
                        if (subflow_map[n.z]) {
                            n.z = subflow_map[n.z].id;
                        } else {
                            n.z = workspace_map[n.z];
                            if (!workspaces[n.z]) {
                                n.z = activeWorkspace;
                            }
                        }
                    }
                    existingConfigNode = RED.nodes.node(n.id);
                    if (existingConfigNode) {
                        if (n.z && existingConfigNode.z !== n.z) {
                            existingConfigNode = null;
                            // Check the config nodes on n.z
                            for (var cn in configNodes) {
                                if (configNodes.hasOwnProperty(cn)) {
                                    if (configNodes[cn].z === n.z && compareNodes(configNodes[cn],n,false)) {
                                        existingConfigNode = configNodes[cn];
                                        node_map[n.id] = configNodes[cn];
                                        break;
                                    }
                                }
                            }
                        }
                    }

                }

                if (!existingConfigNode) { //} || !compareNodes(existingConfigNode,n,true) || existingConfigNode._def.exclusive || existingConfigNode.z !== n.z) {
                    var configNode = {id:n.id, z:n.z, type:n.type, users:[]};
                    for (var d in def.defaults) {
                        if (def.defaults.hasOwnProperty(d)) {
                            configNode[d] = n[d];
                        }
                    }
                    configNode.label = def.label;
                    configNode._def = def;
                    if (createNewIds) {
                        configNode.id = getID();
                    }
                    node_map[n.id] = configNode;
                    new_nodes.push(configNode);
                    RED.nodes.add(configNode);
                }
            }
        }

        for (i=0;i<newNodes.length;i++) {
            n = newNodes[i];
            // TODO: remove workspace in next release+1
            if (n.type !== "workspace" && n.type !== "tab" && n.type !== "subflow") {
                def = registry.getNodeType(n.type);
                if (!def || def.category != "config") {
                    var node = {x:n.x,y:n.y,z:n.z,type:0,wires:n.wires,changed:false};
                    if (createNewIds) {
                        if (subflow_map[node.z]) {
                            node.z = subflow_map[node.z].id;
                        } else {
                            node.z = workspace_map[node.z];
                            if (!workspaces[node.z]) {
                                node.z = activeWorkspace;
                            }
                        }
                        node.id = getID();
                    } else {
                        node.id = n.id;
                        if (node.z == null || (!workspaces[node.z] && !subflow_map[node.z])) {
                            node.z = activeWorkspace;
                        }
                    }
                    node.type = n.type;
                    node._def = def;
                    if (n.type.substring(0,7) === "subflow") {
                        var parentId = n.type.split(":")[1];
                        var subflow = subflow_map[parentId]||getSubflow(parentId);
                        if (createNewIds) {
                            parentId = subflow.id;
                            node.type = "subflow:"+parentId;
                            node._def = registry.getNodeType(node.type);
                            delete node.i;
                        }
                        node.name = n.name;
                        node.outputs = subflow.out.length;
                        node.inputs = subflow.in.length;
                    } else {
                        if (!node._def) {
                            if (node.x && node.y) {
                                node._def = {
                                    color:"#fee",
                                    defaults: {},
                                    label: "unknown: "+n.type,
                                    labelStyle: "node_label_italic",
                                    outputs: n.outputs||n.wires.length,
                                    set: registry.getNodeSet("node-red/unknown")
                                }
                            } else {
                                node._def = {
                                    category:"config",
                                    set: registry.getNodeSet("node-red/unknown")
                                };
                                node.users = [];
                            }
                            var orig = {};
                            for (var p in n) {
                                if (n.hasOwnProperty(p) && p!="x" && p!="y" && p!="z" && p!="id" && p!="wires") {
                                    orig[p] = n[p];
                                }
                            }
                            node._orig = orig;
                            node.name = n.type;
                            node.type = "unknown";
                        }
                        if (node._def.category != "config") {
                            node.inputs = n.inputs||node._def.inputs;
                            node.outputs = n.outputs||node._def.outputs;
                            for (var d2 in node._def.defaults) {
                                if (node._def.defaults.hasOwnProperty(d2)) {
                                    if (node._def.defaults[d2].type) {
                                        if (node_map[n[d2]]) {
                                            node[d2] = node_map[n[d2]].id;
                                        } else {
                                            node[d2] = n[d2];
                                        }
                                    } else {
                                        node[d2] = n[d2];
                                    }
                                }
                            }
                        }
                    }
                    addNode(node);
                    RED.editor.validateNode(node);
                    node_map[n.id] = node;
                    if (node._def.category != "config") {
                        new_nodes.push(node);
                    }
                }
            }
        }
        for (i=0;i<new_nodes.length;i++) {
            n = new_nodes[i];
            if (n.wires) {
                for (var w1=0;w1<n.wires.length;w1++) {
                    var wires = (n.wires[w1] instanceof Array)?n.wires[w1]:[n.wires[w1]];
                    for (var w2=0;w2<wires.length;w2++) {
                        if (wires[w2] in node_map) {
                            var link = {source:n,sourcePort:w1,target:node_map[wires[w2]]};
                            addLink(link);
                            new_links.push(link);
                        }
                    }
                }
                delete n.wires;
            }
        }
        for (i=0;i<new_subflows.length;i++) {
            n = new_subflows[i];
            n.in.forEach(function(input) {
                input.wires.forEach(function(wire) {
                    var link = {source:input, sourcePort:0, target:node_map[wire.id]};
                    addLink(link);
                    new_links.push(link);
                });
                delete input.wires;
            });
            n.out.forEach(function(output) {
                output.wires.forEach(function(wire) {
                    var link;
                    if (subflow_map[wire.id] && subflow_map[wire.id].id == n.id) {
                        link = {source:n.in[wire.port], sourcePort:wire.port,target:output};
                    } else {
                        link = {source:node_map[wire.id]||subflow_map[wire.id], sourcePort:wire.port,target:output};
                    }
                    addLink(link);
                    new_links.push(link);
                });
                delete output.wires;
            });
        }

        RED.workspaces.refresh();
        return [new_nodes,new_links,new_workspaces,new_subflows];
    }

    // TODO: supports filter.z|type
    function filterNodes(filter) {
        var result = [];

        for (var n=0;n<nodes.length;n++) {
            var node = nodes[n];
            if (filter.hasOwnProperty("z") && node.z !== filter.z) {
                continue;
            }
            if (filter.hasOwnProperty("type") && node.type !== filter.type) {
                continue;
            }
            result.push(node);
        }
        return result;
    }
    function filterLinks(filter) {
        var result = [];

        for (var n=0;n<links.length;n++) {
            var link = links[n];
            if (filter.source) {
                if (filter.source.hasOwnProperty("id") && link.source.id !== filter.source.id) {
                    continue;
                }
                if (filter.source.hasOwnProperty("z") && link.source.z !== filter.source.z) {
                    continue;
                }
            }
            if (filter.target) {
                if (filter.target.hasOwnProperty("id") && link.target.id !== filter.target.id) {
                    continue;
                }
                if (filter.target.hasOwnProperty("z") && link.target.z !== filter.target.z) {
                    continue;
                }
            }
            if (filter.hasOwnProperty("sourcePort") && link.sourcePort !== filter.sourcePort) {
                continue;
            }
            result.push(link);
        }
        return result;
    }

    return {
        registry:registry,
        setNodeList: registry.setNodeList,

        getNodeSet: registry.getNodeSet,
        addNodeSet: registry.addNodeSet,
        removeNodeSet: registry.removeNodeSet,
        enableNodeSet: registry.enableNodeSet,
        disableNodeSet: registry.disableNodeSet,

        registerType: registry.registerNodeType,
        getType: registry.getNodeType,
        convertNode: convertNode,

        add: addNode,
        remove: removeNode,

        addLink: addLink,
        removeLink: removeLink,

        addWorkspace: addWorkspace,
        removeWorkspace: removeWorkspace,
        workspace: getWorkspace,

        addSubflow: addSubflow,
        removeSubflow: removeSubflow,
        subflow: getSubflow,
        subflowContains: subflowContains,

        eachNode: function(cb) {
            for (var n=0;n<nodes.length;n++) {
                cb(nodes[n]);
            }
        },
        eachLink: function(cb) {
            for (var l=0;l<links.length;l++) {
                cb(links[l]);
            }
        },
        eachConfig: function(cb) {
            for (var id in configNodes) {
                if (configNodes.hasOwnProperty(id)) {
                    cb(configNodes[id]);
                }
            }
        },
        eachSubflow: function(cb) {
            for (var id in subflows) {
                if (subflows.hasOwnProperty(id)) {
                    cb(subflows[id]);
                }
            }
        },
        eachWorkspace: function(cb) {
            for (var id in workspaces) {
                if (workspaces.hasOwnProperty(id)) {
                    cb(workspaces[id]);
                }
            }
        },

        node: getNode,

        filterNodes: filterNodes,
        filterLinks: filterLinks,

        import: importNodes,

        getAllFlowNodes: getAllFlowNodes,
        createExportableNodeSet: createExportableNodeSet,
        createCompleteNodeSet: createCompleteNodeSet,
        id: getID,
        dirty: function(d) {
            if (d == null) {
                return dirty;
            } else {
                setDirty(d);
            }
        }
    };
})();
;/**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.history = (function() {
    var undo_history = [];

    return {
        //TODO: this function is a placeholder until there is a 'save' event that can be listened to
        markAllDirty: function() {
            for (var i=0;i<undo_history.length;i++) {
                undo_history[i].dirty = true;
            }
        },
        list: function() {
            return undo_history
        },
        depth: function() {
            return undo_history.length;
        },
        push: function(ev) {
            undo_history.push(ev);
        },
        pop: function() {
            var ev = undo_history.pop();
            var i;
            var node;
            var subflow;
            var modifiedTabs = {};
            if (ev) {
                if (ev.t == 'add') {
                    if (ev.nodes) {
                        for (i=0;i<ev.nodes.length;i++) {
                            node = RED.nodes.node(ev.nodes[i]);
                            if (node.z) {
                                modifiedTabs[node.z] = true;
                            }
                            RED.nodes.remove(ev.nodes[i]);
                        }
                    }
                    if (ev.links) {
                        for (i=0;i<ev.links.length;i++) {
                            RED.nodes.removeLink(ev.links[i]);
                        }
                    }
                    if (ev.workspaces) {
                        for (i=0;i<ev.workspaces.length;i++) {
                            RED.nodes.removeWorkspace(ev.workspaces[i].id);
                            RED.workspaces.remove(ev.workspaces[i]);
                        }
                    }
                    if (ev.subflows) {
                        for (i=0;i<ev.subflows.length;i++) {
                            RED.nodes.removeSubflow(ev.subflows[i]);
                            RED.workspaces.remove(ev.subflows[i]);
                        }
                    }
                    if (ev.subflow) {
                        if (ev.subflow.instances) {
                            ev.subflow.instances.forEach(function(n) {
                                var node = RED.nodes.node(n.id);
                                if (node) {
                                    node.changed = n.changed;
                                    node.dirty = true;
                                }
                            });
                        }
                        if (ev.subflow.hasOwnProperty('changed')) {
                            subflow = RED.nodes.subflow(ev.subflow.id);
                            if (subflow) {
                                subflow.changed = ev.subflow.changed;
                            }
                        }
                    }
                    if (ev.removedLinks) {
                        for (i=0;i<ev.removedLinks.length;i++) {
                            RED.nodes.addLink(ev.removedLinks[i]);
                        }
                    }

                } else if (ev.t == "delete") {
                    if (ev.workspaces) {
                        for (i=0;i<ev.workspaces.length;i++) {
                            RED.nodes.addWorkspace(ev.workspaces[i]);
                            RED.workspaces.add(ev.workspaces[i]);
                        }
                    }
                    if (ev.subflow && ev.subflow.subflow) {
                        RED.nodes.addSubflow(ev.subflow.subflow);
                    }
                    if (ev.subflowInputs && ev.subflowInputs.length > 0) {
                        subflow = RED.nodes.subflow(ev.subflowInputs[0].z);
                        subflow.in.push(ev.subflowInputs[0]);
                        subflow.in[0].dirty = true;
                    }
                    if (ev.subflowOutputs && ev.subflowOutputs.length > 0) {
                        subflow = RED.nodes.subflow(ev.subflowOutputs[0].z);
                        ev.subflowOutputs.sort(function(a,b) { return a.i-b.i});
                        for (i=0;i<ev.subflowOutputs.length;i++) {
                            var output = ev.subflowOutputs[i];
                            subflow.out.splice(output.i,0,output);
                            for (var j=output.i+1;j<subflow.out.length;j++) {
                                subflow.out[j].i++;
                                subflow.out[j].dirty = true;
                            }
                            RED.nodes.eachLink(function(l) {
                                if (l.source.type == "subflow:"+subflow.id) {
                                    if (l.sourcePort >= output.i) {
                                        l.sourcePort++;
                                    }
                                }
                            });
                        }
                    }
                    if (ev.subflow && ev.subflow.hasOwnProperty('instances')) {
                        ev.subflow.instances.forEach(function(n) {
                            var node = RED.nodes.node(n.id);
                            if (node) {
                                node.changed = n.changed;
                                node.dirty = true;
                            }
                        });
                    }
                    if (subflow) {
                        RED.nodes.filterNodes({type:"subflow:"+subflow.id}).forEach(function(n) {
                            n.inputs = subflow.in.length;
                            n.outputs = subflow.out.length;
                            while (n.outputs > n.ports.length) {
                                n.ports.push(n.ports.length);
                            }
                            n.resize = true;
                            n.dirty = true;
                        });
                    }
                    if (ev.nodes) {
                        for (i=0;i<ev.nodes.length;i++) {
                            RED.nodes.add(ev.nodes[i]);
                            modifiedTabs[ev.nodes[i].z] = true;
                        }
                    }
                    if (ev.links) {
                        for (i=0;i<ev.links.length;i++) {
                            RED.nodes.addLink(ev.links[i]);
                        }
                    }
                    if (ev.changes) {
                        for (i in ev.changes) {
                            if (ev.changes.hasOwnProperty(i)) {
                                node = RED.nodes.node(i);
                                if (node) {
                                    for (var d in ev.changes[i]) {
                                        if (ev.changes[i].hasOwnProperty(d)) {
                                            node[d] = ev.changes[i][d];
                                        }
                                    }
                                    node.dirty = true;
                                }
                            }
                        }

                    }
                } else if (ev.t == "move") {
                    for (i=0;i<ev.nodes.length;i++) {
                        var n = ev.nodes[i];
                        n.n.x = n.ox;
                        n.n.y = n.oy;
                        n.n.dirty = true;
                    }
                    // A move could have caused a link splice
                    if (ev.links) {
                        for (i=0;i<ev.links.length;i++) {
                            RED.nodes.removeLink(ev.links[i]);
                        }
                    }
                    if (ev.removedLinks) {
                        for (i=0;i<ev.removedLinks.length;i++) {
                            RED.nodes.addLink(ev.removedLinks[i]);
                        }
                    }
                } else if (ev.t == "edit") {
                    for (i in ev.changes) {
                        if (ev.changes.hasOwnProperty(i)) {
                            if (ev.node._def.defaults[i].type) {
                                // This is a config node property
                                var currentConfigNode = RED.nodes.node(ev.node[i]);
                                if (currentConfigNode) {
                                    currentConfigNode.users.splice(currentConfigNode.users.indexOf(ev.node),1);
                                }
                                var newConfigNode = RED.nodes.node(ev.changes[i]);
                                if (newConfigNode) {
                                    newConfigNode.users.push(ev.node);
                                }
                            }
                            ev.node[i] = ev.changes[i];
                        }
                    }
                    if (ev.subflow) {
                        if (ev.subflow.hasOwnProperty('inputCount')) {
                            if (ev.node.in.length > ev.subflow.inputCount) {
                                ev.node.in.splice(ev.subflow.inputCount);
                            } else if (ev.subflow.inputs.length > 0) {
                                ev.node.in = ev.node.in.concat(ev.subflow.inputs);
                            }
                        }
                        if (ev.subflow.hasOwnProperty('outputCount')) {
                            if (ev.node.out.length > ev.subflow.outputCount) {
                                ev.node.out.splice(ev.subflow.outputCount);
                            } else if (ev.subflow.outputs.length > 0) {
                                ev.node.out = ev.node.out.concat(ev.subflow.outputs);
                            }
                        }
                        if (ev.subflow.hasOwnProperty('instances')) {
                            ev.subflow.instances.forEach(function(n) {
                                var node = RED.nodes.node(n.id);
                                if (node) {
                                    node.changed = n.changed;
                                    node.dirty = true;
                                }
                            });
                        }
                        RED.nodes.filterNodes({type:"subflow:"+ev.node.id}).forEach(function(n) {
                            n.inputs = ev.node.in.length;
                            n.outputs = ev.node.out.length;
                            RED.editor.updateNodeProperties(n);
                        });

                        if (ev.node.type === 'subflow') {
                            $("#menu-item-workspace-menu-"+ev.node.id.replace(".","-")).text(ev.node.name);
                        }
                    } else {
                        RED.editor.updateNodeProperties(ev.node);
                        RED.editor.validateNode(ev.node);
                    }
                    if (ev.links) {
                        for (i=0;i<ev.links.length;i++) {
                            RED.nodes.addLink(ev.links[i]);
                        }
                    }
                    ev.node.dirty = true;
                    ev.node.changed = ev.changed;
                } else if (ev.t == "createSubflow") {
                    if (ev.nodes) {
                        RED.nodes.filterNodes({z:ev.subflow.subflow.id}).forEach(function(n) {
                            n.z = ev.activeWorkspace;
                            n.dirty = true;
                        });
                        for (i=0;i<ev.nodes.length;i++) {
                            RED.nodes.remove(ev.nodes[i]);
                        }
                    }
                    if (ev.links) {
                        for (i=0;i<ev.links.length;i++) {
                            RED.nodes.removeLink(ev.links[i]);
                        }
                    }

                    RED.nodes.removeSubflow(ev.subflow.subflow);
                    RED.workspaces.remove(ev.subflow.subflow);

                    if (ev.removedLinks) {
                        for (i=0;i<ev.removedLinks.length;i++) {
                            RED.nodes.addLink(ev.removedLinks[i]);
                        }
                    }
                }
                Object.keys(modifiedTabs).forEach(function(id) {
                    var subflow = RED.nodes.subflow(id);
                    if (subflow) {
                        RED.editor.validateNode(subflow);
                    }
                });

                RED.nodes.dirty(ev.dirty);
                RED.view.redraw(true);
                RED.palette.refresh();
                RED.workspaces.refresh();
                RED.sidebar.config.refresh();
            }
        },
        peek: function() {
            return undo_history[undo_history.length-1];
        }
    }

})();
;/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.validators = {
    number: function(){return function(v) { return v!=='' && !isNaN(v);}},
    regex: function(re){return function(v) { return re.test(v);}}
};
;/**
 * Copyright 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.deploy = (function() {

    var deploymentTypes = {
        "full":{img:"red/images/deploy-full-o.png"},
        "nodes":{img:"red/images/deploy-nodes-o.png"},
        "flows":{img:"red/images/deploy-flows-o.png"}
    }

    var ignoreDeployWarnings = {
        unknown: false,
        unusedConfig: false,
        invalid: false
    }

    var deploymentType = "full";

    function changeDeploymentType(type) {
        deploymentType = type;
        $("#btn-deploy img").attr("src",deploymentTypes[type].img);
    }


    /**
     * options:
     *   type: "default" - Button with drop-down options - no further customisation available
     *   type: "simple"  - Button without dropdown. Customisations:
     *      label: the text to display - default: "Deploy"
     *      icon : the icon to use. Null removes the icon. default: "red/images/deploy-full-o.png"
     */
    function init(options) {
        options = options || {};
        var type = options.type || "default";

        if (type == "default") {
            $('<li><span class="deploy-button-group button-group">'+
              '<a id="btn-deploy" class="deploy-button disabled" href="#"><img id="btn-deploy-icon" src="red/images/deploy-full-o.png"> <span>'+RED._("deploy.deploy")+'</span></a>'+
              '<a id="btn-deploy-options" data-toggle="dropdown" class="deploy-button" href="#"><i class="fa fa-caret-down"></i></a>'+
              '</span></li>').prependTo(".header-toolbar");
              RED.menu.init({id:"btn-deploy-options",
                  options: [
                      {id:"deploymenu-item-full",toggle:"deploy-type",icon:"red/images/deploy-full.png",label:RED._("deploy.full"),sublabel:RED._("deploy.fullDesc"),selected: true, onselect:function(s) { if(s){changeDeploymentType("full")}}},
                      {id:"deploymenu-item-flow",toggle:"deploy-type",icon:"red/images/deploy-flows.png",label:RED._("deploy.modifiedFlows"),sublabel:RED._("deploy.modifiedFlowsDesc"), onselect:function(s) {if(s){changeDeploymentType("flows")}}},
                      {id:"deploymenu-item-node",toggle:"deploy-type",icon:"red/images/deploy-nodes.png",label:RED._("deploy.modifiedNodes"),sublabel:RED._("deploy.modifiedNodesDesc"),onselect:function(s) { if(s){changeDeploymentType("nodes")}}}
                  ]
              });
        } else if (type == "simple") {
            var label = options.label || RED._("deploy.deploy");
            var icon = 'red/images/deploy-full-o.png';
            if (options.hasOwnProperty('icon')) {
                icon = options.icon;
            }

            $('<li><span class="deploy-button-group button-group">'+
              '<a id="btn-deploy" class="deploy-button disabled" href="#">'+
              (icon?'<img id="btn-deploy-icon" src="'+icon+'"> ':'')+
              '<span>'+label+'</span></a>'+
              '</span></li>').prependTo(".header-toolbar");
        }

        $('#btn-deploy').click(function() { save(); });

        $( "#node-dialog-confirm-deploy" ).dialog({
                title: "Confirm deploy",
                modal: true,
                autoOpen: false,
                width: 550,
                height: "auto",
                buttons: [
                    {
                        text: RED._("deploy.confirm.button.confirm"),
                        click: function() {

                            var ignoreChecked = $( "#node-dialog-confirm-deploy-hide" ).prop("checked");
                            if (ignoreChecked) {
                                ignoreDeployWarnings[$( "#node-dialog-confirm-deploy-type" ).val()] = true;
                            }
                            save(true);
                            $( this ).dialog( "close" );
                        }
                    },
                    {
                        text: RED._("deploy.confirm.button.cancel"),
                        click: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                ],
                create: function() {
                    $("#node-dialog-confirm-deploy").parent().find("div.ui-dialog-buttonpane")
                        .prepend('<div style="height:0; vertical-align: middle; display:inline-block; margin-top: 13px; float:left;">'+
                                   '<input style="vertical-align:top;" type="checkbox" id="node-dialog-confirm-deploy-hide">'+
                                   '<label style="display:inline;" for="node-dialog-confirm-deploy-hide"> do not warn about this again</label>'+
                                   '<input type="hidden" id="node-dialog-confirm-deploy-type">'+
                                   '</div>');
                }
        });

        RED.events.on('nodes:change',function(state) {
            // console.log ('change');
            if (state.dirty) {
                // window.onbeforeunload = function() {
                //     return RED._("deploy.confirm.undeployedChanges");
                // }
                // $("#btn-deploy").removeClass("disabled");
            } else {
                window.onbeforeunload = null;
                $("#btn-deploy").addClass("disabled");
            }
        });
    }

    function getNodeInfo(node) {
        var tabLabel = "";
        if (node.z) {
            var tab = RED.nodes.workspace(node.z);
            if (!tab) {
                tab = RED.nodes.subflow(node.z);
                tabLabel = tab.name;
            } else {
                tabLabel = tab.label;
            }
        }
        var label = "";
        if (typeof node._def.label == "function") {
            label = node._def.label.call(node);
        } else {
            label = node._def.label;
        }
        label = label || node.id;
        return {tab:tabLabel,type:node.type,label:label};
    }
    function sortNodeInfo(A,B) {
        if (A.tab < B.tab) { return -1;}
        if (A.tab > B.tab) { return 1;}
        if (A.type < B.type) { return -1;}
        if (A.type > B.type) { return 1;}
        if (A.name < B.name) { return -1;}
        if (A.name > B.name) { return 1;}
        return 0;
    }

    function save(force) {
        if (RED.nodes.dirty()) {
            //$("#debug-tab-clear").click();  // uncomment this to auto clear debug on deploy

            if (!force) {
                var hasUnknown = false;
                var hasInvalid = false;
                var hasUnusedConfig = false;

                var unknownNodes = [];
                var invalidNodes = [];

                RED.nodes.eachNode(function(node) {
                    hasInvalid = hasInvalid || !node.valid;
                    if (!node.valid) {
                        invalidNodes.push(getNodeInfo(node));
                    }
                    if (node.type === "unknown") {
                        if (unknownNodes.indexOf(node.name) == -1) {
                            unknownNodes.push(node.name);
                        }
                    }
                });
                hasUnknown = unknownNodes.length > 0;

                var unusedConfigNodes = [];
                RED.nodes.eachConfig(function(node) {
                    if (node.users.length === 0) {
                        unusedConfigNodes.push(getNodeInfo(node));
                        hasUnusedConfig = true;
                    }
                });

                $( "#node-dialog-confirm-deploy-config" ).hide();
                $( "#node-dialog-confirm-deploy-unknown" ).hide();
                $( "#node-dialog-confirm-deploy-unused" ).hide();

                var showWarning = false;

                if (hasUnknown && !ignoreDeployWarnings.unknown) {
                    showWarning = true;
                    $( "#node-dialog-confirm-deploy-type" ).val("unknown");
                    $( "#node-dialog-confirm-deploy-unknown" ).show();
                    $( "#node-dialog-confirm-deploy-unknown-list" )
                        .html("<li>"+unknownNodes.join("</li><li>")+"</li>");
                } else if (hasInvalid && !ignoreDeployWarnings.invalid) {
                    showWarning = true;
                    $( "#node-dialog-confirm-deploy-type" ).val("invalid");
                    $( "#node-dialog-confirm-deploy-config" ).show();
                    invalidNodes.sort(sortNodeInfo);
                    $( "#node-dialog-confirm-deploy-invalid-list" )
                        .html("<li>"+invalidNodes.map(function(A) { return (A.tab?"["+A.tab+"] ":"")+A.label+" ("+A.type+")"}).join("</li><li>")+"</li>");

                } else if (hasUnusedConfig && !ignoreDeployWarnings.unusedConfig) {
                    // showWarning = true;
                    // $( "#node-dialog-confirm-deploy-type" ).val("unusedConfig");
                    // $( "#node-dialog-confirm-deploy-unused" ).show();
                    //
                    // unusedConfigNodes.sort(sortNodeInfo);
                    // $( "#node-dialog-confirm-deploy-unused-list" )
                    //     .html("<li>"+unusedConfigNodes.map(function(A) { return (A.tab?"["+A.tab+"] ":"")+A.label+" ("+A.type+")"}).join("</li><li>")+"</li>");
                }
                if (showWarning) {
                    $( "#node-dialog-confirm-deploy-hide" ).prop("checked",false);
                    $( "#node-dialog-confirm-deploy" ).dialog( "open" );
                    return;
                }
            }




            var nns = RED.nodes.createCompleteNodeSet();

            $("#btn-deploy-icon").removeClass('fa-download');
            $("#btn-deploy-icon").addClass('spinner');
            RED.nodes.dirty(false);

            $.ajax({
                url:"flows",
                type: "POST",
                data: JSON.stringify(nns),
                contentType: "application/json; charset=utf-8",
                headers: {
                    "Node-RED-Deployment-Type":deploymentType
                }
            }).done(function(data,textStatus,xhr) {
                if (hasUnusedConfig) {
                    RED.notify(
                    '<p>'+RED._("deploy.successfulDeploy")+'</p>'+
                    '<p>'+RED._("deploy.unusedConfigNodes")+' <a href="#" onclick="RED.sidebar.config.show(true); return false;">'+RED._("deploy.unusedConfigNodesLink")+'</a></p>',"success",false,6000);
                } else {
                    RED.notify(RED._("deploy.successfulDeploy"),"success");
                }
                RED.nodes.eachNode(function(node) {
                    if (node.changed) {
                        node.dirty = true;
                        node.changed = false;
                    }
                    if(node.credentials) {
                        delete node.credentials;
                    }
                });
                RED.nodes.eachConfig(function (confNode) {
                    if (confNode.credentials) {
                        delete confNode.credentials;
                    }
                });
                // Once deployed, cannot undo back to a clean state
                RED.history.markAllDirty();
                RED.view.redraw();
                RED.events.emit("deploy");
            }).fail(function(xhr,textStatus,err) {
                RED.nodes.dirty(true);
                if (xhr.responseText) {
                    RED.notify(RED._("notification.error",{message:xhr.responseText}),"error");
                } else {
                    RED.notify(RED._("notification.error",{message:RED._("deploy.errors.noResponse")}),"error");
                }
            }).always(function() {
                $("#btn-deploy-icon").removeClass('spinner');
                $("#btn-deploy-icon").addClass('fa-download');
            });
        }
    }

    return {
        init: init
    }
})();
;/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/



RED.menu = (function() {

    var menuItems = {};

    function createMenuItem(opt) {
        var item;

        if (opt !== null && opt.id) {
            var themeSetting = RED.settings.theme("menu."+opt.id);
            if (themeSetting === false) {
                return null;
            }
        }

        function setInitialState() {
            var savedStateActive = isSavedStateActive(opt.id);
            if (savedStateActive) {
                link.addClass("active");
                opt.onselect.call(opt, true);
            } else if (savedStateActive === false) {
                link.removeClass("active");
                opt.onselect.call(opt, false);
            } else if (opt.hasOwnProperty("selected")) {
                if (opt.selected) {
                    link.addClass("active");
                } else {
                    link.removeClass("active");
                }
                opt.onselect.call(opt, opt.selected);
            }
        }

        if (opt === null) {
            item = $('<li class="divider"></li>');
        } else {
            item = $('<li></li>');

            if (opt.group) {
                item.addClass("menu-group-"+opt.group);

            }
            var linkContent = '<a '+(opt.id?'id="'+opt.id+'" ':'')+'tabindex="-1" href="#">';
            if (opt.toggle) {
                linkContent += '<i class="fa fa-square pull-left"></i>';
                linkContent += '<i class="fa fa-check-square pull-left"></i>';

            }
            if (opt.icon !== undefined) {
                if (/\.png/.test(opt.icon)) {
                    linkContent += '<img src="'+opt.icon+'"/> ';
                } else {
                    linkContent += '<i class="'+(opt.icon?opt.icon:'" style="display: inline-block;"')+'"></i> ';
                }
            }

            if (opt.sublabel) {
                linkContent += '<span class="menu-label-container"><span class="menu-label">'+opt.label+'</span>'+
                               '<span class="menu-sublabel">'+opt.sublabel+'</span></span>'
            } else {
                linkContent += '<span class="menu-label">'+opt.label+'</span>'
            }

            linkContent += '</a>';

            var link = $(linkContent).appendTo(item);

            menuItems[opt.id] = opt;

            if (opt.onselect) {
                link.click(function() {
                    if ($(this).parent().hasClass("disabled")) {
                        return;
                    }
                    if (opt.toggle) {
                        var selected = isSelected(opt.id);
                        if (typeof opt.toggle === "string") {
                            if (!selected) {
                                for (var m in menuItems) {
                                    if (menuItems.hasOwnProperty(m)) {
                                        var mi = menuItems[m];
                                        if (mi.id != opt.id && opt.toggle == mi.toggle) {
                                            setSelected(mi.id,false);
                                        }
                                    }
                                }
                                setSelected(opt.id,true);
                            }
                        } else {
                            setSelected(opt.id, !selected);
                        }
                    } else {
                        opt.onselect.call(opt);
                    }
                });
                setInitialState();
            } else if (opt.href) {
                link.attr("target","_blank").attr("href",opt.href);
            } else if (!opt.options) {
                item.addClass("disabled");
                link.click(function(event) {
                    event.preventDefault();
                });
            }
            if (opt.options) {
                item.addClass("dropdown-submenu pull-left");
                var submenu = $('<ul id="'+opt.id+'-submenu" class="dropdown-menu"></ul>').appendTo(item);

                for (var i=0;i<opt.options.length;i++) {
                    var li = createMenuItem(opt.options[i]);
                    if (li) {
                        li.appendTo(submenu);
                    }
                }
            }
            if (opt.disabled) {
                item.addClass("disabled");
            }
        }


        return item;

    }
    function createMenu(options) {

        var button = $("#"+options.id);

        //button.click(function(event) {
        //    $("#"+options.id+"-submenu").show();
        //    event.preventDefault();
        //});


        var topMenu = $("<ul/>",{id:options.id+"-submenu", class:"dropdown-menu pull-right"}).insertAfter(button);

        var lastAddedSeparator = false;
        for (var i=0;i<options.options.length;i++) {
            var opt = options.options[i];
            if (opt !== null || !lastAddedSeparator) {
                var li = createMenuItem(opt);
                if (li) {
                    li.appendTo(topMenu);
                    lastAddedSeparator = (opt === null);
                }
            }
        }
    }

    function isSavedStateActive(id) {
        return RED.settings.get("menu-" + id);
    }

    function isSelected(id) {
        return $("#" + id).hasClass("active");
    }

    function setSavedState(id, state) {
        RED.settings.set("menu-" + id, state);
    }

    function setSelected(id,state) {
        if (isSelected(id) == state) {
            return;
        }
        var opt = menuItems[id];
        if (state) {
            $("#"+id).addClass("active");
        } else {
            $("#"+id).removeClass("active");
        }
        if (opt && opt.onselect) {
            opt.onselect.call(opt,state);
        }
        setSavedState(id, state);
    }

    function setDisabled(id,state) {
        if (state) {
            $("#"+id).parent().addClass("disabled");
        } else {
            $("#"+id).parent().removeClass("disabled");
        }
    }

    function addItem(id,opt) {
        var item = createMenuItem(opt);
        if (opt.group) {
            var groupItems = $("#"+id+"-submenu").children(".menu-group-"+opt.group);
            if (groupItems.length === 0) {
                item.appendTo("#"+id+"-submenu");
            } else {
                for (var i=0;i<groupItems.length;i++) {
                    var groupItem = groupItems[i];
                    var label = $(groupItem).find(".menu-label").html();
                    if (opt.label < label) {
                        $(groupItem).before(item);
                        break;
                    }
                }
                if (i === groupItems.length) {
                    item.appendTo("#"+id+"-submenu");
                }
            }
        } else {
            item.appendTo("#"+id+"-submenu");
        }
    }
    function removeItem(id) {
        $("#"+id).parent().remove();
    }

    function setAction(id,action) {
        var opt = menuItems[id];
        if (opt) {
            opt.onselect = action;
            $("#"+id).click(function() {
                if ($(this).parent().hasClass("disabled")) {
                    return;
                }
                if (menuItems[id].toggle) {
                    setSelected(id,!isSelected(id));
                } else {
                    menuItems[id].onselect.call(menuItems[id]);
                }
            });
        }
    }

    return {
        init: createMenu,
        setSelected: setSelected,
        isSelected: isSelected,
        setDisabled: setDisabled,
        addItem: addItem,
        removeItem: removeItem,
        setAction: setAction
        //TODO: add an api for replacing a submenu - see library.js:loadFlowLibrary
    }
})();
;/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.keyboard = (function() {

    var active = true;
    var handlers = {};

    d3.select(window).on("keydown",function() {
        if (!active) { return; }
        var handler = handlers[d3.event.keyCode];
        if (handler && handler.ondown) {
            if (!handler.modifiers ||
                ((!handler.modifiers.shift || d3.event.shiftKey) &&
                 (!handler.modifiers.ctrl  || d3.event.ctrlKey || d3.event.metaKey) &&
                 (!handler.modifiers.alt   || d3.event.altKey) )) {
                handler.ondown();
            }
        }
    });

    d3.select(window).on("keyup",function() {
        if (!active) { return; }
        var handler = handlers[d3.event.keyCode];
        if (handler && handler.onup) {
            if (!handler.modifiers ||
                ((!handler.modifiers.shift || d3.event.shiftKey) &&
                 (!handler.modifiers.ctrl  || d3.event.ctrlKey || d3.event.metaKey) &&
                 (!handler.modifiers.alt   || d3.event.altKey) )) {
                handler.onup();
            }
        }
    });
    function addHandler(key,modifiers,ondown,onup) {
        var mod = modifiers;
        var cbdown = ondown;
        var cbup = onup;
        if (typeof modifiers == "function") {
            mod = {};
            cbdown = modifiers;
            cbup = ondown;
        }
        handlers[key] = {modifiers:mod, ondown:cbdown, onup:cbup};
    }
    function removeHandler(key) {
        delete handlers[key];
    }
    
    
    var dialog = null;
    
    function showKeyboardHelp() {
        if (!RED.settings.theme("menu.menu-item-keyboard-shortcuts",true)) {
            return;
        }
        if (!dialog) {
            dialog = $('<div id="keyboard-help-dialog" class="hide">'+
                '<div style="vertical-align: top;display:inline-block; box-sizing: border-box; width:50%; padding: 10px;">'+
                    '<table class="keyboard-shortcuts">'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">a</span></td><td>'+RED._("keyboard.selectAll")+'</td></tr>'+
                        '<tr><td><span class="help-key">Shift</span> + <span class="help-key">Click</span></td><td>'+RED._("keyboard.selectAllConnected")+'</td></tr>'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">Click</span></td><td>'+RED._("keyboard.addRemoveNode")+'</td></tr>'+
                        '<tr><td><span class="help-key">Delete</span></td><td>'+RED._("keyboard.deleteSelected")+'</td></tr>'+
                        '<tr><td>&nbsp;</td><td></td></tr>'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">i</span></td><td>'+RED._("keyboard.importNode")+'</td></tr>'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">e</span></td><td>'+RED._("keyboard.exportNode")+'</td></tr>'+
                    '</table>'+
                '</div>'+
                '<div style="vertical-align: top;display:inline-block; box-sizing: border-box; width:50%; padding: 10px;">'+
                    '<table class="keyboard-shortcuts">'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">Space</span></td><td>'+RED._("keyboard.toggleSidebar")+'</td></tr>'+
                        '<tr><td></td><td></td></tr>'+
                        '<tr><td><span class="help-key">Delete</span></td><td>'+RED._("keyboard.deleteNode")+'</td></tr>'+
                        '<tr><td></td><td></td></tr>'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">c</span></td><td>'+RED._("keyboard.copyNode")+'</td></tr>'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">x</span></td><td>'+RED._("keyboard.cutNode")+'</td></tr>'+
                        '<tr><td><span class="help-key">Ctrl/&#8984;</span> + <span class="help-key">v</span></td><td>'+RED._("keyboard.pasteNode")+'</td></tr>'+
                    '</table>'+
                '</div>'+
                '</div>')
            .appendTo("body")
            .dialog({
                modal: true,
                autoOpen: false,
                width: "800",
                title:"Keyboard shortcuts",
                resizable: false,
                open: function() {
                    RED.keyboard.disable();
                },
                close: function() {
                    RED.keyboard.enable();
                }
            });
        }
        
        dialog.dialog("open");
    }
    
    return {
        add: addHandler,
        remove: removeHandler,
        disable: function(){ active = false;},
        enable: function(){ active = true; },
        
        showHelp: showKeyboardHelp
    }

})();
;/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/



RED.tabs = (function() {


    function createTabs(options) {
        var tabs = {};
        var currentTabWidth;
        var currentActiveTabWidth = 0;

        var ul = $("#"+options.id)
        ul.addClass("red-ui-tabs");
        ul.children().first().addClass("active");
        ul.children().addClass("red-ui-tab");

        function onTabClick() {
            activateTab($(this));
            return false;
        }

        function onTabDblClick() {
            if (options.ondblclick) {
                options.ondblclick(tabs[$(this).attr('href').slice(1)]);
            }
            return false;
        }

        function activateTab(link) {
            if (typeof link === "string") {
                link = ul.find("a[href='#"+link+"']");
            }
            if (!link.parent().hasClass("active")) {
                ul.children().removeClass("active");
                ul.children().css({"transition": "width 100ms"});
                link.parent().addClass("active");
                if (options.onchange) {
                    options.onchange(tabs[link.attr('href').slice(1)]);
                }
                updateTabWidths();
                setTimeout(function() {
                    ul.children().css({"transition": ""});
                },100);
            }
        }

        function updateTabWidths() {
            var tabs = ul.find("li.red-ui-tab");
            var width = ul.width();
            var tabCount = tabs.size();
            var tabWidth = (width-12-(tabCount*6))/tabCount;
            currentTabWidth = 100*tabWidth/width;
            currentActiveTabWidth = currentTabWidth+"%";

            if (options.hasOwnProperty("minimumActiveTabWidth")) {
                if (tabWidth < options.minimumActiveTabWidth) {
                    tabCount -= 1;
                    tabWidth = (width-12-options.minimumActiveTabWidth-(tabCount*6))/tabCount;
                    currentTabWidth = 100*tabWidth/width;
                    currentActiveTabWidth = options.minimumActiveTabWidth+"px";
                } else {
                    currentActiveTabWidth = 0;
                }
            }
            tabs.css({width:currentTabWidth+"%"});
            if (tabWidth < 50) {
                ul.find(".red-ui-tab-close").hide();
                ul.find(".red-ui-tab-icon").hide();
            } else {
                ul.find(".red-ui-tab-close").show();
                ul.find(".red-ui-tab-icon").show();
            }
            if (currentActiveTabWidth !== 0) {
                ul.find("li.red-ui-tab.active").css({"width":options.minimumActiveTabWidth});
                ul.find("li.red-ui-tab.active .red-ui-tab-close").show();
                ul.find("li.red-ui-tab.active .red-ui-tab-icon").show();
            }

        }

        ul.find("li.red-ui-tab a").on("click",onTabClick).on("dblclick",onTabDblClick);
        updateTabWidths();


        function removeTab(id) {
            var li = ul.find("a[href='#"+id+"']").parent();
            if (li.hasClass("active")) {
                var tab = li.prev();
                if (tab.size() === 0) {
                    tab = li.next();
                }
                activateTab(tab.find("a"));
            }
            li.remove();
            if (options.onremove) {
                options.onremove(tabs[id]);
            }
            delete tabs[id];
            updateTabWidths();
        }

        return {
            addTab: function(tab) {
                tabs[tab.id] = tab;
                var li = $("<li/>",{class:"red-ui-tab"}).appendTo(ul);
                var link = $("<a/>",{href:"#"+tab.id, class:"red-ui-tab-label"}).appendTo(li);
                if (tab.icon) {
                    $('<img src="'+tab.icon+'" class="red-ui-tab-icon"/>').appendTo(link);
                }
                $('<span/>').text(tab.label).appendTo(link);

                link.on("click",onTabClick);
                link.on("dblclick",onTabDblClick);
                if (tab.closeable) {
                    var closeLink = $("<a/>",{href:"#",class:"red-ui-tab-close"}).appendTo(li);
                    closeLink.append('<i class="fa fa-times" />');

                    closeLink.on("click",function(event) {
                        removeTab(tab.id);
                    });
                }
                updateTabWidths();
                if (options.onadd) {
                    options.onadd(tab);
                }
                link.attr("title",tab.label);
                if (ul.find("li.red-ui-tab").size() == 1) {
                    activateTab(link);
                }
            },
            removeTab: removeTab,
            activateTab: activateTab,
            resize: updateTabWidths,
            count: function() {
                return ul.find("li.red-ui-tab").size();
            },
            contains: function(id) {
                return ul.find("a[href='#"+id+"']").length > 0;
            },
            renameTab: function(id,label) {
                tabs[id].label = label;
                var tab = ul.find("a[href='#"+id+"']");
                tab.attr("title",label);
                tab.find("span").text(label);
                updateTabWidths();
            }

        }
    }

    return {
        create: createTabs
    }
})();
;/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.popover = (function() {


    function createPopover(options) {
        var target = options.target;

        var content = options.content;
        var delay = options.delay;
        var timer = null;
        var active;
        var div;

        var openPopup = function() {
            if (active) {
                div = $('<div class="red-ui-popover"></div>').html(content).appendTo("body");
                var targetPos = target.offset();
                var targetWidth = target.width();
                var targetHeight = target.height();

                var divHeight = div.height();
                div.css({top: targetPos.top+targetHeight/2-divHeight/2-10,left:targetPos.left+targetWidth+17});

                div.fadeIn("fast");
            }
        }
        var closePopup = function() {
            if (!active) {
                if (div) {
                    div.fadeOut("fast",function() {
                        $(this).remove();
                    });
                    div = null;
                }
            }
        }

        target.on('mouseenter',function(e) {
            clearTimeout(timer);
            active = true;
            timer = setTimeout(openPopup,delay.show);
        });
        target.on('mouseleave', function(e) {
            if (timer) {
                clearTimeout(timer);
            }
            active = false;
            setTimeout(closePopup,delay.hide);
        });
        var res = {
            setContent: function(_content) {
                content = _content;
            }
        }
        target.data('popover',res);
        return res;

    }

    return {
        create: createPopover
    }

})();
;/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/


RED.workspaces = (function() {

    var activeWorkspace = 0;
    var workspaceIndex = 0;

    function addWorkspace(ws) {
        if (ws) {
            workspace_tabs.addTab(ws);
            workspace_tabs.resize();
        } else {
            var tabId = RED.nodes.id();
            do {
                workspaceIndex += 1;
            } while($("#workspace-tabs a[title='"+RED._('workspace.defaultName',{number:workspaceIndex})+"']").size() !== 0);

            ws = {type:"tab",id:tabId,label:RED._('workspace.defaultName',{number:workspaceIndex})};
            RED.nodes.addWorkspace(ws);
            workspace_tabs.addTab(ws);
            workspace_tabs.activateTab(tabId);
            RED.history.push({t:'add',workspaces:[ws],dirty:RED.nodes.dirty()});
            RED.nodes.dirty(true);
        }
    }
    function deleteWorkspace(ws,force) {
        if (workspace_tabs.count() == 1) {
            return;
        }
        var nodes = [];
        if (!force) {
            nodes = RED.nodes.filterNodes({z:ws.id});
        }
        if (force || nodes.length === 0) {
            removeWorkspace(ws);
            var historyEvent = RED.nodes.removeWorkspace(ws.id);
            historyEvent.t = 'delete';
            historyEvent.dirty = RED.nodes.dirty();
            historyEvent.workspaces = [ws];
            RED.history.push(historyEvent);
            RED.nodes.dirty(true);
            RED.sidebar.config.refresh();
        } else {
            $( "#node-dialog-delete-workspace" ).dialog('option','workspace',ws);
            $( "#node-dialog-delete-workspace-content" ).text(RED._("workspace.delete",{label:ws.label}));
            $( "#node-dialog-delete-workspace" ).dialog('open');
        }
    }
    function showRenameWorkspaceDialog(id) {
        var ws = RED.nodes.workspace(id);
        $( "#node-dialog-rename-workspace" ).dialog("option","workspace",ws);

        if (workspace_tabs.count() == 1) {
            $( "#node-dialog-rename-workspace").next().find(".leftButton")
                .prop('disabled',true)
                .addClass("ui-state-disabled");
        } else {
            $( "#node-dialog-rename-workspace").next().find(".leftButton")
                .prop('disabled',false)
                .removeClass("ui-state-disabled");
        }

        $( "#node-input-workspace-name" ).val(ws.label);
        $( "#node-dialog-rename-workspace" ).dialog("open");
    }

    var workspace_tabs;
    function createWorkspaceTabs(){
        workspace_tabs = RED.tabs.create({
            id: "workspace-tabs",
            onchange: function(tab) {
                var event = {
                    old: activeWorkspace
                }
                activeWorkspace = tab.id;
                event.workspace = activeWorkspace;
                RED.events.emit("workspace:change",event);
                RED.sidebar.config.refresh();
            },
            ondblclick: function(tab) {
                if (tab.type != "subflow") {
                    showRenameWorkspaceDialog(tab.id);
                } else {
                    RED.editor.editSubflow(RED.nodes.subflow(tab.id));
                }
            },
            onadd: function(tab) {
                RED.menu.addItem("menu-item-workspace",{
                    id:"menu-item-workspace-menu-"+tab.id.replace(".","-"),
                    label:tab.label,
                    onselect:function() {
                        workspace_tabs.activateTab(tab.id);
                    }
                });
                RED.menu.setDisabled("menu-item-workspace-delete",workspace_tabs.count() == 1);
            },
            onremove: function(tab) {
                RED.menu.setDisabled("menu-item-workspace-delete",workspace_tabs.count() == 1);
                RED.menu.removeItem("menu-item-workspace-menu-"+tab.id.replace(".","-"));
            },
            minimumActiveTabWidth: 150
        });


        $("#node-dialog-rename-workspace form" ).submit(function(e) { e.preventDefault();});
        $( "#node-dialog-rename-workspace" ).dialog({
            modal: true,
            autoOpen: false,
            width: 500,
            title: RED._("workspace.renameSheet"),
            buttons: [
                {
                    class: 'leftButton',
                    text: RED._("common.label.delete"),
                    click: function() {
                        var workspace = $(this).dialog('option','workspace');
                        $( this ).dialog( "close" );
                        deleteWorkspace(workspace);
                    }
                },
                {
                    text: RED._("common.label.ok"),
                    click: function() {
                        var workspace = $(this).dialog('option','workspace');
                        var label = $( "#node-input-workspace-name" ).val();
                        if (workspace.label != label) {
                            workspace_tabs.renameTab(workspace.id,label);
                            RED.nodes.dirty(true);
                            RED.sidebar.config.refresh();
                            $("#menu-item-workspace-menu-"+workspace.id.replace(".","-")).text(label);
                        }
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: RED._("common.label.cancel"),
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ],
            open: function(e) {
                RED.keyboard.disable();
            },
            close: function(e) {
                RED.keyboard.enable();
            }
        });
        $( "#node-dialog-delete-workspace" ).dialog({
            modal: true,
            autoOpen: false,
            width: 500,
            title: RED._("workspace.confirmDelete"),
            buttons: [
                {
                    text: RED._("common.label.ok"),
                    click: function() {
                        var workspace = $(this).dialog('option','workspace');
                        deleteWorkspace(workspace,true);
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: RED._("common.label.cancel"),
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ],
            open: function(e) {
                RED.keyboard.disable();
            },
            close: function(e) {
                RED.keyboard.enable();
            }

        });
    }

    function init() {
        createWorkspaceTabs();
        $('#btn-workspace-add-tab').on("click",function(e) {addWorkspace(); e.preventDefault()});
        RED.events.on("sidebar:resize",workspace_tabs.resize);

        RED.menu.setAction('menu-item-workspace-delete',function() {
            deleteWorkspace(RED.nodes.workspace(activeWorkspace));
        });

        $(window).resize(function() {
            workspace_tabs.resize();
        });
    }

    function removeWorkspace(ws) {
        if (!ws) {
            deleteWorkspace(RED.nodes.workspace(activeWorkspace));
        } else {
            if (workspace_tabs.contains(ws.id)) {
                workspace_tabs.removeTab(ws.id);
            }
        }
    }

    return {
        init: init,
        add: addWorkspace,
        remove: removeWorkspace,

        edit: function(id) {
            showRenameWorkspaceDialog(id||activeWorkspace);
        },
        contains: function(id) {
            return workspace_tabs.contains(id);
        },
        count: function() {
            return workspace_tabs.count();
        },
        active: function() {
            return activeWorkspace
        },
        show: function(id) {
            if (!workspace_tabs.contains(id)) {
                var sf = RED.nodes.subflow(id);
                if (sf) {
                    addWorkspace({type:"subflow",id:id,icon:"red/images/subflow_tab.png",label:sf.name, closeable: true});
                }
            }
            workspace_tabs.activateTab(id);
        },
        refresh: function() {
            RED.nodes.eachSubflow(function(sf) {
                if (workspace_tabs.contains(sf.id)) {
                    workspace_tabs.renameTab(sf.id,sf.name);
                }
            });
            RED.sidebar.config.refresh();
        },
        resize: function() {
            workspace_tabs.resize();
        }
    }
})();
;/**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/


RED.view = (function() {
    var space_width = 5000,
        space_height = 5000,
        lineCurveScale = 0.75,
        scaleFactor = 1,
        node_width = 100,
        node_height = 30;

    var touchLongPressTimeout = 1000,
        startTouchDistance = 0,
        startTouchCenter = [],
        moveTouchCenter = [],
        touchStartTime = 0;

    var workspaceScrollPositions = {};

    var gridSize = 20;
    var snapGrid = false;

    var activeSpliceLink;
    var spliceActive = false;
    var spliceTimer;

    var activeSubflow = null;
    var activeNodes = [];
    var activeLinks = [];

    var selected_link = null,
        mousedown_link = null,
        mousedown_node = null,
        mousedown_port_type = null,
        mousedown_port_index = 0,
        mouseup_node = null,
        mouse_offset = [0,0],
        mouse_position = null,
        mouse_mode = 0,
        moving_set = [],
        lasso = null,
        showStatus = false,
        lastClickNode = null,
        dblClickPrimed = null,
        clickTime = 0,
        clickElapsed = 0;

    var clipboard = "";

    var status_colours = {
        "red":    "#c00",
        "green":  "#5a8",
        "yellow": "#F9DF31",
        "blue":   "#53A3F3",
        "grey":   "#d3d3d3"
    }

    var outer = d3.select("#chart")
        .append("svg:svg")
        .attr("width", space_width)
        .attr("height", space_height)
        .attr("tabindex",1)
        .attr("pointer-events", "all")
        .style("cursor","crosshair")
        .on("mousedown", function() {
            $(this).focus();
        });

    var vis = outer
        .append('svg:g')
        .on("dblclick.zoom", null)
        .append('svg:g')
        .on("mousemove", canvasMouseMove)
        .on("mousedown", canvasMouseDown)
        .on("mouseup", canvasMouseUp)
        .on("touchend", function() {
            clearTimeout(touchStartTime);
            touchStartTime = null;
            if  (RED.touch.radialMenu.active()) {
                return;
            }
            if (lasso) {
                outer_background.attr("fill","#fff");
            }
            canvasMouseUp.call(this);
        })
        .on("touchcancel", canvasMouseUp)
        .on("touchstart", function() {
            var touch0;
            if (d3.event.touches.length>1) {
                clearTimeout(touchStartTime);
                touchStartTime = null;
                d3.event.preventDefault();
                touch0 = d3.event.touches.item(0);
                var touch1 = d3.event.touches.item(1);
                var a = touch0['pageY']-touch1['pageY'];
                var b = touch0['pageX']-touch1['pageX'];

                var offset = $("#chart").offset();
                var scrollPos = [$("#chart").scrollLeft(),$("#chart").scrollTop()];
                startTouchCenter = [
                    (touch1['pageX']+(b/2)-offset.left+scrollPos[0])/scaleFactor,
                    (touch1['pageY']+(a/2)-offset.top+scrollPos[1])/scaleFactor
                ];
                moveTouchCenter = [
                    touch1['pageX']+(b/2),
                    touch1['pageY']+(a/2)
                ]
                startTouchDistance = Math.sqrt((a*a)+(b*b));
            } else {
                var obj = d3.select(document.body);
                touch0 = d3.event.touches.item(0);
                var pos = [touch0.pageX,touch0.pageY];
                startTouchCenter = [touch0.pageX,touch0.pageY];
                startTouchDistance = 0;
                var point = d3.touches(this)[0];
                touchStartTime = setTimeout(function() {
                    touchStartTime = null;
                    showTouchMenu(obj,pos);
                    //lasso = vis.append('rect')
                    //    .attr("ox",point[0])
                    //    .attr("oy",point[1])
                    //    .attr("rx",2)
                    //    .attr("ry",2)
                    //    .attr("x",point[0])
                    //    .attr("y",point[1])
                    //    .attr("width",0)
                    //    .attr("height",0)
                    //    .attr("class","lasso");
                    //outer_background.attr("fill","#e3e3f3");
                },touchLongPressTimeout);
            }
        })
        .on("touchmove", function(){
                if  (RED.touch.radialMenu.active()) {
                    d3.event.preventDefault();
                    return;
                }
                var touch0;
                if (d3.event.touches.length<2) {
                    if (touchStartTime) {
                        touch0 = d3.event.touches.item(0);
                        var dx = (touch0.pageX-startTouchCenter[0]);
                        var dy = (touch0.pageY-startTouchCenter[1]);
                        var d = Math.abs(dx*dx+dy*dy);
                        if (d > 64) {
                            clearTimeout(touchStartTime);
                            touchStartTime = null;
                        }
                    } else if (lasso) {
                        d3.event.preventDefault();
                    }
                    canvasMouseMove.call(this);
                } else {
                    touch0 = d3.event.touches.item(0);
                    var touch1 = d3.event.touches.item(1);
                    var a = touch0['pageY']-touch1['pageY'];
                    var b = touch0['pageX']-touch1['pageX'];
                    var offset = $("#chart").offset();
                    var scrollPos = [$("#chart").scrollLeft(),$("#chart").scrollTop()];
                    var moveTouchDistance = Math.sqrt((a*a)+(b*b));
                    var touchCenter = [
                        touch1['pageX']+(b/2),
                        touch1['pageY']+(a/2)
                    ];

                    if (!isNaN(moveTouchDistance)) {
                        oldScaleFactor = scaleFactor;
                        scaleFactor = Math.min(2,Math.max(0.3, scaleFactor + (Math.floor(((moveTouchDistance*100)-(startTouchDistance*100)))/10000)));

                        var deltaTouchCenter = [                             // Try to pan whilst zooming - not 100%
                            startTouchCenter[0]*(scaleFactor-oldScaleFactor),//-(touchCenter[0]-moveTouchCenter[0]),
                            startTouchCenter[1]*(scaleFactor-oldScaleFactor) //-(touchCenter[1]-moveTouchCenter[1])
                        ];

                        startTouchDistance = moveTouchDistance;
                        moveTouchCenter = touchCenter;

                        $("#chart").scrollLeft(scrollPos[0]+deltaTouchCenter[0]);
                        $("#chart").scrollTop(scrollPos[1]+deltaTouchCenter[1]);
                        redraw();
                    }
                }
        });

    var outer_background = vis.append('svg:rect')
        .attr('width', space_width)
        .attr('height', space_height)
        .attr('fill','#fff');

    var gridScale = d3.scale.linear().range([0,space_width]).domain([0,space_width]);
    var grid = vis.append('g');

    grid.selectAll("line.horizontal").data(gridScale.ticks(space_width/gridSize)).enter()
       .append("line")
           .attr(
           {
               "class":"horizontal",
               "x1" : 0,
               "x2" : space_width,
               "y1" : function(d){ return gridScale(d);},
               "y2" : function(d){ return gridScale(d);},
               "fill" : "none",
               "shape-rendering" : "crispEdges",
               "stroke" : "#eee",
               "stroke-width" : "1px"
           });
    grid.selectAll("line.vertical").data(gridScale.ticks(space_width/gridSize)).enter()
       .append("line")
           .attr(
           {
               "class":"vertical",
               "y1" : 0,
               "y2" : space_width,
               "x1" : function(d){ return gridScale(d);},
               "x2" : function(d){ return gridScale(d);},
               "fill" : "none",
               "shape-rendering" : "crispEdges",
               "stroke" : "#eee",
               "stroke-width" : "1px"
           });
    grid.style("visibility","hidden");

    var dragGroup = vis.append('g');
    var drag_lines = [];

    function showDragLines(nodes) {
        for (var i=0;i<nodes.length;i++) {
            var node = nodes[i];
            node.el = dragGroup.append("svg:path").attr("class", "drag_line");
            drag_lines.push(node);
        }
    }
    function hideDragLines() {
        while(drag_lines.length) {
            (drag_lines.pop()).el.remove();
        }
    }

    function updateActiveNodes() {
        var activeWorkspace = RED.workspaces.active();

        activeNodes = RED.nodes.filterNodes({z:activeWorkspace});

        activeLinks = RED.nodes.filterLinks({
            source:{z:activeWorkspace},
            target:{z:activeWorkspace}
        });
    }

    function init() {
        RED.events.on("workspace:change",function(event) {
            var chart = $("#chart");
            if (event.old !== 0) {
                workspaceScrollPositions[event.old] = {
                    left:chart.scrollLeft(),
                    top:chart.scrollTop()
                };
            }
            var scrollStartLeft = chart.scrollLeft();
            var scrollStartTop = chart.scrollTop();

            activeSubflow = RED.nodes.subflow(event.workspace);

            RED.menu.setDisabled("menu-item-workspace-edit", activeSubflow);
            RED.menu.setDisabled("menu-item-workspace-delete",RED.workspaces.count() == 1 || activeSubflow);

            if (workspaceScrollPositions[event.workspace]) {
                chart.scrollLeft(workspaceScrollPositions[event.workspace].left);
                chart.scrollTop(workspaceScrollPositions[event.workspace].top);
            } else {
                chart.scrollLeft(0);
                chart.scrollTop(0);
            }
            var scrollDeltaLeft = chart.scrollLeft() - scrollStartLeft;
            var scrollDeltaTop = chart.scrollTop() - scrollStartTop;
            if (mouse_position != null) {
                mouse_position[0] += scrollDeltaLeft;
                mouse_position[1] += scrollDeltaTop;
            }
            clearSelection();
            RED.nodes.eachNode(function(n) {
                n.dirty = true;
            });
            updateSelection();
            updateActiveNodes();
            redraw();
        });

        $('#btn-zoom-out').click(function() {zoomOut();});
        $('#btn-zoom-zero').click(function() {zoomZero();});
        $('#btn-zoom-in').click(function() {zoomIn();});
        $("#chart").on('DOMMouseScroll mousewheel', function (evt) {
            if ( evt.altKey ) {
                evt.preventDefault();
                evt.stopPropagation();
                var move = -(evt.originalEvent.detail) || evt.originalEvent.wheelDelta;
                if (move <= 0) { zoomOut(); }
                else { zoomIn(); }
            }
        });

        // Handle nodes dragged from the palette
        $("#chart").droppable({
            accept:".palette_node",
            drop: function( event, ui ) {
                d3.event = event;
                var selected_tool = ui.draggable[0].type;
                var m = /^subflow:(.+)$/.exec(selected_tool);

                if (activeSubflow && m) {
                    var subflowId = m[1];
                    if (subflowId === activeSubflow.id) {
                        RED.notify(RED._("notification.error",{message: RED._("notification.errors.cannotAddSubflowToItself")}),"error");
                        return;
                    }
                    if (RED.nodes.subflowContains(m[1],activeSubflow.id)) {
                        RED.notify(RED._("notification.error",{message: RED._("notification.errors.cannotAddCircularReference")}),"error");
                        return;
                    }
                }

                var nn = { id:(1+Math.random()*4294967295).toString(16),z:RED.workspaces.active()};

                nn.type = selected_tool;
                nn._def = RED.nodes.getType(nn.type);

                if (!m) {
                    nn.inputs = nn._def.inputs || 0;
                    nn.outputs = nn._def.outputs;

                    for (var d in nn._def.defaults) {
                        if (nn._def.defaults.hasOwnProperty(d)) {
                            nn[d] = nn._def.defaults[d].value;
                        }
                    }

                    if (nn._def.onadd) {
                        try {
                            nn._def.onadd.call(nn);
                        } catch(err) {
                            console.log("onadd:",err);
                        }
                    }
                } else {
                    var subflow = RED.nodes.subflow(m[1]);
                    nn.inputs = subflow.in.length;
                    nn.outputs = subflow.out.length;
                }

                nn.changed = true;

                nn.w = node_width;
                nn.h = Math.max(node_height,(nn.outputs||0) * 15);

                var historyEvent = {
                    t:'add',
                    nodes:[nn.id],
                    dirty:RED.nodes.dirty()
                }
                if (activeSubflow) {
                    var subflowRefresh = RED.subflow.refresh(true);
                    if (subflowRefresh) {
                        historyEvent.subflow = {
                            id:activeSubflow.id,
                            changed: activeSubflow.changed,
                            instances: subflowRefresh.instances
                        }
                    }
                }

                var helperOffset = d3.touches(ui.helper.get(0))[0]||d3.mouse(ui.helper.get(0));
                var mousePos = d3.touches(this)[0]||d3.mouse(this);

                mousePos[1] += this.scrollTop + ((nn.h/2)-helperOffset[1]);
                mousePos[0] += this.scrollLeft + ((nn.w/2)-helperOffset[0]);
                mousePos[1] /= scaleFactor;
                mousePos[0] /= scaleFactor;

                if (snapGrid) {
                    mousePos[0] = gridSize*(Math.ceil(mousePos[0]/gridSize));
                    mousePos[1] = gridSize*(Math.ceil(mousePos[1]/gridSize));
                }
                nn.x = mousePos[0];
                nn.y = mousePos[1];

                var spliceLink = $(ui.helper).data('splice');
                if (spliceLink) {
                    // TODO: DRY - droppable/nodeMouseDown/canvasMouseUp
                    RED.nodes.removeLink(spliceLink);
                    var link1 = {
                        source:spliceLink.source,
                        sourcePort:spliceLink.sourcePort,
                        target: nn
                    };
                    var link2 = {
                        source:nn,
                        sourcePort:0,
                        target: spliceLink.target
                    };
                    RED.nodes.addLink(link1);
                    RED.nodes.addLink(link2);
                    historyEvent.links = [link1,link2];
                    historyEvent.removedLinks = [spliceLink];
                }

                RED.history.push(historyEvent);
                RED.nodes.add(nn);
                RED.editor.validateNode(nn);
                RED.nodes.dirty(true);
                // auto select dropped node - so info shows (if visible)
                clearSelection();
                nn.selected = true;
                moving_set.push({n:nn});
                updateActiveNodes();
                updateSelection();
                redraw();

                if (nn._def.autoedit) {
                    RED.editor.edit(nn);
                }
            }
        });

        RED.keyboard.add(/* z */ 90,{ctrl:true},function(){RED.history.pop();});
        RED.keyboard.add(/* a */ 65,{ctrl:true},function(){selectAll();d3.event.preventDefault();});
        RED.keyboard.add(/* = */ 187,{ctrl:true},function(){zoomIn();d3.event.preventDefault();});
        RED.keyboard.add(/* - */ 189,{ctrl:true},function(){zoomOut();d3.event.preventDefault();});
        RED.keyboard.add(/* 0 */ 48,{ctrl:true},function(){zoomZero();d3.event.preventDefault();});
        RED.keyboard.add(/* v */ 86,{ctrl:true},function(){importNodes(clipboard);d3.event.preventDefault();});

    }

    function canvasMouseDown() {
        if (!mousedown_node && !mousedown_link) {
            selected_link = null;
            updateSelection();
        }
        if (mouse_mode === 0) {
            if (lasso) {
                lasso.remove();
                lasso = null;
            }

            if (!touchStartTime) {
                var point = d3.mouse(this);
                lasso = vis.append('rect')
                    .attr("ox",point[0])
                    .attr("oy",point[1])
                    .attr("rx",1)
                    .attr("ry",1)
                    .attr("x",point[0])
                    .attr("y",point[1])
                    .attr("width",0)
                    .attr("height",0)
                    .attr("class","lasso");
                d3.event.preventDefault();
            }
        }
    }

    function canvasMouseMove() {
        var i;
        var node;
        mouse_position = d3.touches(this)[0]||d3.mouse(this);
        // Prevent touch scrolling...
        //if (d3.touches(this)[0]) {
        //    d3.event.preventDefault();
        //}

        // TODO: auto scroll the container
        //var point = d3.mouse(this);
        //if (point[0]-container.scrollLeft < 30 && container.scrollLeft > 0) { container.scrollLeft -= 15; }
        //console.log(d3.mouse(this),container.offsetWidth,container.offsetHeight,container.scrollLeft,container.scrollTop);

        if (lasso) {
            var ox = parseInt(lasso.attr("ox"));
            var oy = parseInt(lasso.attr("oy"));
            var x = parseInt(lasso.attr("x"));
            var y = parseInt(lasso.attr("y"));
            var w;
            var h;
            if (mouse_position[0] < ox) {
                x = mouse_position[0];
                w = ox-x;
            } else {
                w = mouse_position[0]-x;
            }
            if (mouse_position[1] < oy) {
                y = mouse_position[1];
                h = oy-y;
            } else {
                h = mouse_position[1]-y;
            }
            lasso
                .attr("x",x)
                .attr("y",y)
                .attr("width",w)
                .attr("height",h)
            ;
            return;
        }

        if (mouse_mode != RED.state.IMPORT_DRAGGING && !mousedown_node && selected_link == null) {
            return;
        }

        var mousePos;
        if (mouse_mode == RED.state.JOINING) {
            // update drag line
            if (drag_lines.length === 0) {
                if (d3.event.shiftKey) {
                    // Get all the wires we need to detach.
                    var links = [];
                    var filter;
                    if (mousedown_port_type === 0) {
                        filter = {
                            source:mousedown_node,
                            sourcePort: mousedown_port_index
                        }
                    } else {
                        filter = {
                            target: mousedown_node
                        }
                    }
                    var existingLinks = RED.nodes.filterLinks(filter);
                    for (i=0;i<existingLinks.length;i++) {
                        var link = existingLinks[i];
                        RED.nodes.removeLink(link);
                        links.push({
                            link:link,
                            node: (mousedown_port_type===0)?link.target:link.source,
                            port: (mousedown_port_type===0)?0:link.sourcePort,
                            portType: (mousedown_port_type===0)?1:0
                        })
                    }
                    showDragLines(links);
                    mouse_mode = 0;
                    updateActiveNodes();
                    redraw();
                    mouse_mode = RED.state.JOINING;
                } else {
                    showDragLines([{node:mousedown_node,port:mousedown_port_index,portType:mousedown_port_type}]);
                }
            }
            mousePos = mouse_position;
            for (i=0;i<drag_lines.length;i++) {
                var drag_line = drag_lines[i];
                var numOutputs = (drag_line.portType === 0)?(drag_line.node.outputs || 1):1;
                var sourcePort = drag_line.port;
                var portY = -((numOutputs-1)/2)*13 +13*sourcePort;

                var sc = (drag_line.portType === 0)?1:-1;

                var dy = mousePos[1]-(drag_line.node.y+portY);
                var dx = mousePos[0]-(drag_line.node.x+sc*drag_line.node.w/2);
                var delta = Math.sqrt(dy*dy+dx*dx);
                var scale = lineCurveScale;
                var scaleY = 0;

                if (delta < node_width) {
                    scale = 0.75-0.75*((node_width-delta)/node_width);
                }
                if (dx*sc < 0) {
                    scale += 2*(Math.min(5*node_width,Math.abs(dx))/(5*node_width));
                    if (Math.abs(dy) < 3*node_height) {
                        scaleY = ((dy>0)?0.5:-0.5)*(((3*node_height)-Math.abs(dy))/(3*node_height))*(Math.min(node_width,Math.abs(dx))/(node_width)) ;
                    }
                }

                drag_line.el.attr("d",
                    "M "+(drag_line.node.x+sc*drag_line.node.w/2)+" "+(drag_line.node.y+portY)+
                    " C "+(drag_line.node.x+sc*(drag_line.node.w/2+node_width*scale))+" "+(drag_line.node.y+portY+scaleY*node_height)+" "+
                    (mousePos[0]-sc*(scale)*node_width)+" "+(mousePos[1]-scaleY*node_height)+" "+
                    mousePos[0]+" "+mousePos[1]
                    );
            }
            d3.event.preventDefault();
        } else if (mouse_mode == RED.state.MOVING) {
            mousePos = d3.mouse(document.body);
            if (isNaN(mousePos[0])) {
                mousePos = d3.touches(document.body)[0];
            }
            var d = (mouse_offset[0]-mousePos[0])*(mouse_offset[0]-mousePos[0]) + (mouse_offset[1]-mousePos[1])*(mouse_offset[1]-mousePos[1]);
            if (d > 3) {
                mouse_mode = RED.state.MOVING_ACTIVE;
                clickElapsed = 0;
                spliceActive = false;
                if (moving_set.length === 1) {
                    node = moving_set[0];
                    spliceActive = node.n._def.inputs > 0 &&
                                   node.n._def.outputs > 0 &&
                                   RED.nodes.filterLinks({ source: node.n }).length === 0 &&
                                   RED.nodes.filterLinks({ target: node.n }).length === 0;
                }
            }
        } else if (mouse_mode == RED.state.MOVING_ACTIVE || mouse_mode == RED.state.IMPORT_DRAGGING) {
            mousePos = mouse_position;
            var minX = 0;
            var minY = 0;
            for (var n = 0; n<moving_set.length; n++) {
                node = moving_set[n];
                if (d3.event.shiftKey) {
                    node.n.ox = node.n.x;
                    node.n.oy = node.n.y;
                }
                node.n.x = mousePos[0]+node.dx;
                node.n.y = mousePos[1]+node.dy;
                node.n.dirty = true;
                minX = Math.min(node.n.x-node.n.w/2-5,minX);
                minY = Math.min(node.n.y-node.n.h/2-5,minY);
            }
            if (minX !== 0 || minY !== 0) {
                for (i = 0; i<moving_set.length; i++) {
                    node = moving_set[i];
                    node.n.x -= minX;
                    node.n.y -= minY;
                }
            }
            if (snapGrid != d3.event.shiftKey && moving_set.length > 0) {
                var gridOffset = [0,0];
                node = moving_set[0];
                gridOffset[0] = node.n.x-(gridSize*Math.floor((node.n.x-node.n.w/2)/gridSize)+node.n.w/2);
                gridOffset[1] = node.n.y-(gridSize*Math.floor(node.n.y/gridSize));
                if (gridOffset[0] !== 0 || gridOffset[1] !== 0) {
                    for (i = 0; i<moving_set.length; i++) {
                        node = moving_set[i];
                        node.n.x -= gridOffset[0];
                        node.n.y -= gridOffset[1];
                        if (node.n.x == node.n.ox && node.n.y == node.n.oy) {
                            node.dirty = false;
                        }
                    }
                }
            }
            if ((mouse_mode == RED.state.MOVING_ACTIVE || mouse_mode == RED.state.IMPORT_DRAGGING) && moving_set.length === 1) {
                node = moving_set[0];
                if (spliceActive) {
                    if (!spliceTimer) {
                        spliceTimer = setTimeout(function() {
                            var nodes = [];
                            var bestDistance = Infinity;
                            var bestLink = null;
                            var mouseX = mousePos[0];
                            var mouseY = mousePos[1];
                            if (outer[0][0].getIntersectionList) {
                                var svgRect = outer[0][0].createSVGRect();
                                svgRect.x = mouseX;
                                svgRect.y = mouseY;
                                svgRect.width = 1;
                                svgRect.height = 1;
                                nodes = outer[0][0].getIntersectionList(svgRect, outer[0][0]);
                            } else {
                                // Firefox doesn't do getIntersectionList and that
                                // makes us sad
                                nodes = RED.view.getLinksAtPoint(mouseX,mouseY);
                            }
                            for (var i=0;i<nodes.length;i++) {
                                if (d3.select(nodes[i]).classed('link_background')) {
                                    var length = nodes[i].getTotalLength();
                                    for (var j=0;j<length;j+=10) {
                                        var p = nodes[i].getPointAtLength(j);
                                        var d2 = ((p.x-mouseX)*(p.x-mouseX))+((p.y-mouseY)*(p.y-mouseY));
                                        if (d2 < 200 && d2 < bestDistance) {
                                            bestDistance = d2;
                                            bestLink = nodes[i];
                                        }
                                    }
                                }
                            }
                            if (activeSpliceLink && activeSpliceLink !== bestLink) {
                                d3.select(activeSpliceLink.parentNode).classed('link_splice',false);
                            }
                            if (bestLink) {
                                d3.select(bestLink.parentNode).classed('link_splice',true)
                            } else {
                                d3.select('.link_splice').classed('link_splice',false);
                            }
                            activeSpliceLink = bestLink;
                            spliceTimer = null;
                        },100);
                    }
                }
            }


        }
        if (mouse_mode !== 0) {
            redraw();
        }
    }

    function canvasMouseUp() {
        var i;
        var historyEvent;
        if (mousedown_node && mouse_mode == RED.state.JOINING) {
            var removedLinks = [];
            for (i=0;i<drag_lines.length;i++) {
                if (drag_lines[i].link) {
                    removedLinks.push(drag_lines[i].link)
                }
            }
            historyEvent = {
                t:'delete',
                links: removedLinks,
                dirty:RED.nodes.dirty()
            };
            RED.history.push(historyEvent);
            hideDragLines();
        }
        if (lasso) {
            var x = parseInt(lasso.attr("x"));
            var y = parseInt(lasso.attr("y"));
            var x2 = x+parseInt(lasso.attr("width"));
            var y2 = y+parseInt(lasso.attr("height"));
            if (!d3.event.ctrlKey) {
                clearSelection();
            }
            RED.nodes.eachNode(function(n) {
                if (n.z == RED.workspaces.active() && !n.selected) {
                    n.selected = (n.x > x && n.x < x2 && n.y > y && n.y < y2);
                    if (n.selected) {
                        n.dirty = true;
                        moving_set.push({n:n});
                    }
                }
            });
            if (activeSubflow) {
                activeSubflow.in.forEach(function(n) {
                    n.selected = (n.x > x && n.x < x2 && n.y > y && n.y < y2);
                    if (n.selected) {
                        n.dirty = true;
                        moving_set.push({n:n});
                    }
                });
                activeSubflow.out.forEach(function(n) {
                    n.selected = (n.x > x && n.x < x2 && n.y > y && n.y < y2);
                    if (n.selected) {
                        n.dirty = true;
                        moving_set.push({n:n});
                    }
                });
            }
            updateSelection();
            lasso.remove();
            lasso = null;
        } else if (mouse_mode == RED.state.DEFAULT && mousedown_link == null && !d3.event.ctrlKey&& !d3.event.metaKey ) {
            clearSelection();
            updateSelection();
        }
        if (mouse_mode == RED.state.MOVING_ACTIVE) {
            if (moving_set.length > 0) {
                var ns = [];
                for (var j=0;j<moving_set.length;j++) {
                    ns.push({n:moving_set[j].n,ox:moving_set[j].ox,oy:moving_set[j].oy});
                }
                historyEvent = {t:'move',nodes:ns,dirty:RED.nodes.dirty()};
                if (activeSpliceLink) {
                    // TODO: DRY - droppable/nodeMouseDown/canvasMouseUp
                    var spliceLink = d3.select(activeSpliceLink).data()[0];
                    RED.nodes.removeLink(spliceLink);
                    var link1 = {
                        source:spliceLink.source,
                        sourcePort:spliceLink.sourcePort,
                        target: moving_set[0].n
                    };
                    var link2 = {
                        source:moving_set[0].n,
                        sourcePort:0,
                        target: spliceLink.target
                    };
                    RED.nodes.addLink(link1);
                    RED.nodes.addLink(link2);
                    historyEvent.links = [link1,link2];
                    historyEvent.removedLinks = [spliceLink];
                    updateActiveNodes();
                }
                RED.nodes.dirty(true);
                RED.history.push(historyEvent);
            }
        }
        if (mouse_mode == RED.state.MOVING || mouse_mode == RED.state.MOVING_ACTIVE) {
            for (i=0;i<moving_set.length;i++) {
                delete moving_set[i].ox;
                delete moving_set[i].oy;
            }
        }
        if (mouse_mode == RED.state.IMPORT_DRAGGING) {
            RED.keyboard.remove(/* ESCAPE */ 27);
            updateActiveNodes();
            RED.nodes.dirty(true);
        }
        resetMouseVars();
        redraw();
    }

    function zoomIn() {
        if (scaleFactor < 2) {
            scaleFactor += 0.1;
            redraw();
        }
    }
    function zoomOut() {
        if (scaleFactor > 0.3) {
            scaleFactor -= 0.1;
            redraw();
        }
    }
    function zoomZero() {
        scaleFactor = 1;
        redraw();
    }

    function selectAll() {
        RED.nodes.eachNode(function(n) {
            if (n.z == RED.workspaces.active()) {
                if (!n.selected) {
                    n.selected = true;
                    n.dirty = true;
                    moving_set.push({n:n});
                }
            }
        });
        if (activeSubflow) {
            activeSubflow.in.forEach(function(n) {
                if (!n.selected) {
                    n.selected = true;
                    n.dirty = true;
                    moving_set.push({n:n});
                }
            });
            activeSubflow.out.forEach(function(n) {
                if (!n.selected) {
                    n.selected = true;
                    n.dirty = true;
                    moving_set.push({n:n});
                }
            });
        }

        selected_link = null;
        updateSelection();
        redraw();
    }

    function clearSelection() {
        for (var i=0;i<moving_set.length;i++) {
            var n = moving_set[i];
            n.n.dirty = true;
            n.n.selected = false;
        }
        moving_set = [];
        selected_link = null;
    }

    function updateSelection() {
        if (moving_set.length === 0 && selected_link == null) {
            RED.keyboard.remove(/* backspace */ 8);
            RED.keyboard.remove(/* delete */ 46);
            RED.keyboard.remove(/* c */ 67);
            RED.keyboard.remove(/* x */ 88);
        } else {
            RED.keyboard.add(/* backspace */ 8,function(){deleteSelection();d3.event.preventDefault();});
            RED.keyboard.add(/* delete */ 46,function(){deleteSelection();d3.event.preventDefault();});
            RED.keyboard.add(/* c */ 67,{ctrl:true},function(){copySelection();d3.event.preventDefault();});
            RED.keyboard.add(/* x */ 88,{ctrl:true},function(){copySelection();deleteSelection();d3.event.preventDefault();});
        }
        if (moving_set.length === 0) {
            RED.keyboard.remove(/* up   */ 38);
            RED.keyboard.remove(/* down */ 40);
            RED.keyboard.remove(/* left */ 37);
            RED.keyboard.remove(/* right*/ 39);
        } else {
            RED.keyboard.add(/* up   */ 38, function() { if(d3.event.shiftKey){moveSelection(  0,-20)}else{moveSelection( 0,-1);}d3.event.preventDefault();},endKeyboardMove);
            RED.keyboard.add(/* down */ 40, function() { if(d3.event.shiftKey){moveSelection(  0, 20)}else{moveSelection( 0, 1);}d3.event.preventDefault();},endKeyboardMove);
            RED.keyboard.add(/* left */ 37, function() { if(d3.event.shiftKey){moveSelection(-20,  0)}else{moveSelection(-1, 0);}d3.event.preventDefault();},endKeyboardMove);
            RED.keyboard.add(/* right*/ 39, function() { if(d3.event.shiftKey){moveSelection( 20,  0)}else{moveSelection( 1, 0);}d3.event.preventDefault();},endKeyboardMove);
        }

        var selection = {};

        if (moving_set.length > 0) {
            selection.nodes = moving_set.map(function(n) { return n.n;});
        }
        if (selected_link != null) {
            selection.link = selected_link;
        }
        RED.events.emit("view:selection-changed",selection);
    }

    function endKeyboardMove() {
        var ns = [];
        for (var i=0;i<moving_set.length;i++) {
            ns.push({n:moving_set[i].n,ox:moving_set[i].ox,oy:moving_set[i].oy});
            delete moving_set[i].ox;
            delete moving_set[i].oy;
        }
        RED.history.push({t:'move',nodes:ns,dirty:RED.nodes.dirty()});
        RED.nodes.dirty(true);
    }
    function moveSelection(dx,dy) {
        var minX = 0;
        var minY = 0;
        var node;

        for (var i=0;i<moving_set.length;i++) {
            node = moving_set[i];
            if (node.ox == null && node.oy == null) {
                node.ox = node.n.x;
                node.oy = node.n.y;
            }
            node.n.x += dx;
            node.n.y += dy;
            node.n.dirty = true;
            minX = Math.min(node.n.x-node.n.w/2-5,minX);
            minY = Math.min(node.n.y-node.n.h/2-5,minY);
        }

        if (minX !== 0 || minY !== 0) {
            for (var n = 0; n<moving_set.length; n++) {
                node = moving_set[n];
                node.n.x -= minX;
                node.n.y -= minY;
            }
        }

        redraw();
    }
    function deleteSelection() {
        var result;
        var removedNodes = [];
        var removedLinks = [];
        var removedSubflowOutputs = [];
        var removedSubflowInputs = [];
        var subflowInstances = [];

        var startDirty = RED.nodes.dirty();
        var startChanged = false;
        if (moving_set.length > 0) {
            for (var i=0;i<moving_set.length;i++) {
                var node = moving_set[i].n;
                node.selected = false;
                if (node.type != "subflow") {
                    if (node.x < 0) {
                        node.x = 25
                    }
                    var removedEntities = RED.nodes.remove(node.id);
                    removedNodes.push(node);
                    removedNodes = removedNodes.concat(removedEntities.nodes);
                    removedLinks = removedLinks.concat(removedEntities.links);
                } else {
                    if (node.direction === "out") {
                        removedSubflowOutputs.push(node);
                    } else if (node.direction === "in") {
                        removedSubflowInputs.push(node);
                    }
                    node.dirty = true;
                }
            }
            if (removedSubflowOutputs.length > 0) {
                result = RED.subflow.removeOutput(removedSubflowOutputs);
                if (result) {
                    removedLinks = removedLinks.concat(result.links);
                }
            }
            // Assume 0/1 inputs
            if (removedSubflowInputs.length == 1) {
                result = RED.subflow.removeInput();
                if (result) {
                    removedLinks = removedLinks.concat(result.links);
                }
            }
            var instances = RED.subflow.refresh(true);
            if (instances) {
                subflowInstances = instances.instances;
            }
            moving_set = [];
            if (removedNodes.length > 0 || removedSubflowOutputs.length > 0 || removedSubflowInputs.length > 0) {
                RED.nodes.dirty(true);
            }
        }
        if (selected_link) {
            RED.nodes.removeLink(selected_link);
            removedLinks.push(selected_link);
            RED.nodes.dirty(true);
        }
        var historyEvent = {
            t:'delete',
            nodes:removedNodes,
            links:removedLinks,
            subflowOutputs:removedSubflowOutputs,
            subflowInputs:removedSubflowInputs,
            subflow: {
                instances: subflowInstances
            },
            dirty:startDirty
        };
        RED.history.push(historyEvent);

        selected_link = null;
        updateActiveNodes();
        updateSelection();
        redraw();
    }

    function copySelection() {
        if (moving_set.length > 0) {
            var nns = [];
            for (var n=0;n<moving_set.length;n++) {
                var node = moving_set[n].n;
                // The only time a node.type == subflow can be selected is the
                // input/output 'proxy' nodes. They cannot be copied.
                if (node.type != "subflow") {
                    for (var d in node._def.defaults) {
                        if (node._def.defaults.hasOwnProperty(d)) {
                            if (node._def.defaults[d].type) {
                                var configNode = RED.nodes.node(node[d]);
                                if (configNode && configNode._def.exclusive) {
                                    nns.push(RED.nodes.convertNode(configNode));
                                }
                            }
                        }
                    }
                    nns.push(RED.nodes.convertNode(node));
                    //TODO: if the node has an exclusive config node, it should also be copied, to ensure it remains exclusive...
                }
            }
            clipboard = JSON.stringify(nns);
            RED.notify(RED._("clipboard.nodeCopied",{count:nns.length}));
        }
    }


    function calculateTextWidth(str, className, offset) {
        var sp = document.createElement("span");
        sp.className = className;
        sp.style.position = "absolute";
        sp.style.top = "-1000px";
        sp.innerHTML = (str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
        document.body.appendChild(sp);
        var w = sp.offsetWidth;
        document.body.removeChild(sp);
        return offset+w;
    }

    function resetMouseVars() {
        mousedown_node = null;
        mouseup_node = null;
        mousedown_link = null;
        mouse_mode = 0;
        mousedown_port_type = 0;
        activeSpliceLink = null;
        spliceActive = false;
        d3.select('.link_splice').classed('link_splice',false);
        if (spliceTimer) {
            clearTimeout(spliceTimer);
            spliceTimer = null;
        }
    }

    function portMouseDown(d,portType,portIndex) {
        //console.log(d,portType,portIndex);
        // disable zoom
        //vis.call(d3.behavior.zoom().on("zoom"), null);
        mousedown_node = d;
        selected_link = null;
        mouse_mode = RED.state.JOINING;
        mousedown_port_type = portType;
        mousedown_port_index = portIndex || 0;
        document.body.style.cursor = "crosshair";
        d3.event.preventDefault();
    }

    function portMouseUp(d,portType,portIndex) {
        var i;
        document.body.style.cursor = "";
        if (mouse_mode == RED.state.JOINING && drag_lines.length > 0) {
            if (typeof TouchEvent != "undefined" && d3.event instanceof TouchEvent) {
                RED.nodes.eachNode(function(n) {
                    if (n.z == RED.workspaces.active()) {
                        var hw = n.w/2;
                        var hh = n.h/2;
                        if (n.x-hw<mouse_position[0] && n.x+hw> mouse_position[0] &&
                            n.y-hh<mouse_position[1] && n.y+hh>mouse_position[1]) {
                                mouseup_node = n;
                                portType = mouseup_node.inputs>0?1:0;
                                portIndex = 0;
                        }
                    }
                });
            } else {
                mouseup_node = d;
            }
            var addedLinks = [];
            var removedLinks = [];

            for (i=0;i<drag_lines.length;i++) {
                if (drag_lines[i].link) {
                    removedLinks.push(drag_lines[i].link)
                }
            }
            for (i=0;i<drag_lines.length;i++) {
                if (portType != drag_lines[i].portType && mouseup_node !== drag_lines[i].node) {
                    var drag_line = drag_lines[i];
                    var src,dst,src_port;
                    if (drag_line.portType === 0) {
                        src = drag_line.node;
                        src_port = drag_line.port;
                        dst = mouseup_node;
                    } else if (drag_line.portType == 1) {
                        src = mouseup_node;
                        dst = drag_line.node;
                        src_port = portIndex;
                    }
                    var existingLink = RED.nodes.filterLinks({source:src,target:dst,sourcePort: src_port}).length !== 0;
                    if (!existingLink) {
                        var link = {source: src, sourcePort:src_port, target: dst};
                        RED.nodes.addLink(link);
                        addedLinks.push(link);
                    }
                }
            }
            if (addedLinks.length > 0 || removedLinks.length > 0) {
                var historyEvent = {
                    t:'add',
                    links:addedLinks,
                    removedLinks: removedLinks,
                    dirty:RED.nodes.dirty()
                };
                if (activeSubflow) {
                    var subflowRefresh = RED.subflow.refresh(true);
                    if (subflowRefresh) {
                        historyEvent.subflow = {
                            id:activeSubflow.id,
                            changed: activeSubflow.changed,
                            instances: subflowRefresh.instances
                        }
                    }
                }
                RED.history.push(historyEvent);
                updateActiveNodes();
                RED.nodes.dirty(true);
            }
            resetMouseVars();
            hideDragLines();
            selected_link = null;
            redraw();
        }
    }

    function nodeMouseUp(d) {
        if (dblClickPrimed && mousedown_node == d && clickElapsed > 0 && clickElapsed < 750) {
            mouse_mode = RED.state.DEFAULT;
            if (d.type != "subflow") {
                RED.editor.edit(d);
            } else {
                RED.editor.editSubflow(activeSubflow);
            }
            clickElapsed = 0;
            d3.event.stopPropagation();
            return;
        }
        var direction = d._def? (d.inputs > 0 ? 1: 0) : (d.direction == "in" ? 0: 1)
        portMouseUp(d, direction, 0);
    }

    function nodeMouseDown(d) {
        focusView();
        //var touch0 = d3.event;
        //var pos = [touch0.pageX,touch0.pageY];
        //RED.touch.radialMenu.show(d3.select(this),pos);
        if (mouse_mode == RED.state.IMPORT_DRAGGING) {
            RED.keyboard.remove(/* ESCAPE */ 27);

            if (activeSpliceLink) {
                // TODO: DRY - droppable/nodeMouseDown/canvasMouseUp
                var spliceLink = d3.select(activeSpliceLink).data()[0];
                RED.nodes.removeLink(spliceLink);
                var link1 = {
                    source:spliceLink.source,
                    sourcePort:spliceLink.sourcePort,
                    target: moving_set[0].n
                };
                var link2 = {
                    source:moving_set[0].n,
                    sourcePort:0,
                    target: spliceLink.target
                };
                RED.nodes.addLink(link1);
                RED.nodes.addLink(link2);
                var historyEvent = RED.history.peek();
                historyEvent.links = [link1,link2];
                historyEvent.removedLinks = [spliceLink];
                updateActiveNodes();
            }

            updateSelection();
            RED.nodes.dirty(true);
            redraw();
            resetMouseVars();
            d3.event.stopPropagation();
            return;
        }
        mousedown_node = d;
        var now = Date.now();
        clickElapsed = now-clickTime;
        clickTime = now;

        dblClickPrimed = (lastClickNode == mousedown_node);
        lastClickNode = mousedown_node;

        var i;

        if (d.selected && (d3.event.ctrlKey||d3.event.metaKey)) {
            mousedown_node.selected = false;
            for (i=0;i<moving_set.length;i+=1) {
                if (moving_set[i].n === mousedown_node) {
                    moving_set.splice(i,1);
                    break;
                }
            }
        } else {
            if (d3.event.shiftKey) {
                clearSelection();
                var cnodes = RED.nodes.getAllFlowNodes(mousedown_node);
                for (var n=0;n<cnodes.length;n++) {
                    cnodes[n].selected = true;
                    cnodes[n].dirty = true;
                    moving_set.push({n:cnodes[n]});
                }
            } else if (!d.selected) {
                if (!d3.event.ctrlKey && !d3.event.metaKey) {
                    clearSelection();
                }
                mousedown_node.selected = true;
                moving_set.push({n:mousedown_node});
            }
            selected_link = null;
            if (d3.event.button != 2) {
                mouse_mode = RED.state.MOVING;
                var mouse = d3.touches(this)[0]||d3.mouse(this);
                mouse[0] += d.x-d.w/2;
                mouse[1] += d.y-d.h/2;
                for (i=0;i<moving_set.length;i++) {
                    moving_set[i].ox = moving_set[i].n.x;
                    moving_set[i].oy = moving_set[i].n.y;
                    moving_set[i].dx = moving_set[i].n.x-mouse[0];
                    moving_set[i].dy = moving_set[i].n.y-mouse[1];
                }
                mouse_offset = d3.mouse(document.body);
                if (isNaN(mouse_offset[0])) {
                    mouse_offset = d3.touches(document.body)[0];
                }
            }
        }
        d.dirty = true;
        updateSelection();
        redraw();
        d3.event.stopPropagation();
    }

    function nodeButtonClicked(d) {
        if (!activeSubflow && !d.changed) {
            if (d._def.button.toggle) {
                d[d._def.button.toggle] = !d[d._def.button.toggle];
                d.dirty = true;
            }
            if (d._def.button.onclick) {
                try {
                    d._def.button.onclick.call(d);
                } catch(err) {
                    console.log("Definition error: "+d.type+".onclick",err);
                }
            }
            if (d.dirty) {
                redraw();
            }
        } else if (d.changed) {
            RED.notify(RED._("notification.warning", {message:RED._("notification.warnings.undeployedChanges")}),"warning");
        } else {
            RED.notify(RED._("notification.warning", {message:RED._("notification.warnings.nodeActionDisabled")}),"warning");
        }
        d3.event.preventDefault();
    }

    function showTouchMenu(obj,pos) {
        var mdn = mousedown_node;
        var options = [];
        options.push({name:"delete",disabled:(moving_set.length===0 && selected_link === null),onselect:function() {deleteSelection();}});
        options.push({name:"cut",disabled:(moving_set.length===0),onselect:function() {copySelection();deleteSelection();}});
        options.push({name:"copy",disabled:(moving_set.length===0),onselect:function() {copySelection();}});
        options.push({name:"paste",disabled:(clipboard.length===0),onselect:function() {importNodes(clipboard,true);}});
        options.push({name:"edit",disabled:(moving_set.length != 1),onselect:function() { RED.editor.edit(mdn);}});
        options.push({name:"select",onselect:function() {selectAll();}});
        options.push({name:"undo",disabled:(RED.history.depth() === 0),onselect:function() {RED.history.pop();}});

        RED.touch.radialMenu.show(obj,pos,options);
        resetMouseVars();
    }
    function redraw() {
        vis.attr("transform","scale("+scaleFactor+")");
        outer.attr("width", space_width*scaleFactor).attr("height", space_height*scaleFactor);

        // Don't bother redrawing nodes if we're drawing links
        if (mouse_mode != RED.state.JOINING) {

            var dirtyNodes = {};

            if (activeSubflow) {
                var subflowOutputs = vis.selectAll(".subflowoutput").data(activeSubflow.out,function(d,i){ return d.id;});
                subflowOutputs.exit().remove();
                var outGroup = subflowOutputs.enter().insert("svg:g").attr("class","node subflowoutput").attr("transform",function(d) { return "translate("+(d.x-20)+","+(d.y-20)+")"});
                outGroup.each(function(d,i) {
                    d.w=40;
                    d.h=40;
                });
                outGroup.append("rect").attr("class","subflowport").attr("rx",8).attr("ry",8).attr("width",40).attr("height",40)
                    // TODO: This is exactly the same set of handlers used for regular nodes - DRY
                    .on("mouseup",nodeMouseUp)
                    .on("mousedown",nodeMouseDown)
                    .on("touchstart",function(d) {
                            var obj = d3.select(this);
                            var touch0 = d3.event.touches.item(0);
                            var pos = [touch0.pageX,touch0.pageY];
                            startTouchCenter = [touch0.pageX,touch0.pageY];
                            startTouchDistance = 0;
                            touchStartTime = setTimeout(function() {
                                    showTouchMenu(obj,pos);
                            },touchLongPressTimeout);
                            nodeMouseDown.call(this,d)
                    })
                    .on("touchend", function(d) {
                            clearTimeout(touchStartTime);
                            touchStartTime = null;
                            if  (RED.touch.radialMenu.active()) {
                                d3.event.stopPropagation();
                                return;
                            }
                            nodeMouseUp.call(this,d);
                    });

                outGroup.append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10).attr("x",-5).attr("y",15)
                    .on("mousedown", function(d,i){portMouseDown(d,1,0);} )
                    .on("touchstart", function(d,i){portMouseDown(d,1,0);} )
                    .on("mouseup", function(d,i){portMouseUp(d,1,0);})
                    .on("touchend",function(d,i){portMouseUp(d,1,0);} )
                    .on("mouseover",function(d,i) { var port = d3.select(this); port.classed("port_hovered",(mouse_mode!=RED.state.JOINING || (drag_lines.length > 0 && drag_lines[0].portType !== 1)));})
                    .on("mouseout",function(d,i) { var port = d3.select(this); port.classed("port_hovered",false);});

                outGroup.append("svg:text").attr('class','port_label').attr('x',20).attr('y',8).style("font-size","10px").text("output");
                outGroup.append("svg:text").attr('class','port_label port_index').attr('x',20).attr('y',24).text(function(d,i){ return i+1});

                var subflowInputs = vis.selectAll(".subflowinput").data(activeSubflow.in,function(d,i){ return d.id;});
                subflowInputs.exit().remove();
                var inGroup = subflowInputs.enter().insert("svg:g").attr("class","node subflowinput").attr("transform",function(d) { return "translate("+(d.x-20)+","+(d.y-20)+")"});
                inGroup.each(function(d,i) {
                    d.w=40;
                    d.h=40;
                });
                inGroup.append("rect").attr("class","subflowport").attr("rx",8).attr("ry",8).attr("width",40).attr("height",40)
                    // TODO: This is exactly the same set of handlers used for regular nodes - DRY
                    .on("mouseup",nodeMouseUp)
                    .on("mousedown",nodeMouseDown)
                    .on("touchstart",function(d) {
                            var obj = d3.select(this);
                            var touch0 = d3.event.touches.item(0);
                            var pos = [touch0.pageX,touch0.pageY];
                            startTouchCenter = [touch0.pageX,touch0.pageY];
                            startTouchDistance = 0;
                            touchStartTime = setTimeout(function() {
                                    showTouchMenu(obj,pos);
                            },touchLongPressTimeout);
                            nodeMouseDown.call(this,d)
                    })
                    .on("touchend", function(d) {
                            clearTimeout(touchStartTime);
                            touchStartTime = null;
                            if  (RED.touch.radialMenu.active()) {
                                d3.event.stopPropagation();
                                return;
                            }
                            nodeMouseUp.call(this,d);
                    });

                inGroup.append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10).attr("x",35).attr("y",15)
                    .on("mousedown", function(d,i){portMouseDown(d,0,i);} )
                    .on("touchstart", function(d,i){portMouseDown(d,0,i);} )
                    .on("mouseup", function(d,i){portMouseUp(d,0,i);})
                    .on("touchend",function(d,i){portMouseUp(d,0,i);} )
                    .on("mouseover",function(d,i) { var port = d3.select(this); port.classed("port_hovered",(mouse_mode!=RED.state.JOINING || (drag_lines.length > 0 && drag_lines[0].portType !== 0) ));})
                    .on("mouseout",function(d,i) { var port = d3.select(this); port.classed("port_hovered",false);});
                inGroup.append("svg:text").attr('class','port_label').attr('x',18).attr('y',20).style("font-size","10px").text("input");



                subflowOutputs.each(function(d,i) {
                    if (d.dirty) {
                        var output = d3.select(this);
                        output.selectAll(".subflowport").classed("node_selected",function(d) { return d.selected; })
                        output.selectAll(".port_index").text(function(d){ return d.i+1});
                        output.attr("transform", function(d) { return "translate(" + (d.x-d.w/2) + "," + (d.y-d.h/2) + ")"; });
                        dirtyNodes[d.id] = d;
                        d.dirty = false;
                    }
                });
                subflowInputs.each(function(d,i) {
                    if (d.dirty) {
                        var input = d3.select(this);
                        input.selectAll(".subflowport").classed("node_selected",function(d) { return d.selected; })
                        input.attr("transform", function(d) { return "translate(" + (d.x-d.w/2) + "," + (d.y-d.h/2) + ")"; });
                        dirtyNodes[d.id] = d;
                        d.dirty = false;
                    }
                });
            } else {
                vis.selectAll(".subflowoutput").remove();
                vis.selectAll(".subflowinput").remove();
            }

            var node = vis.selectAll(".nodegroup").data(activeNodes,function(d){return d.id});
            node.exit().remove();

            var nodeEnter = node.enter().insert("svg:g").attr("class", "node nodegroup");
            nodeEnter.each(function(d,i) {
                    var node = d3.select(this);
                    node.attr("id",d.id);
                    var l = d._def.label;
                    try {
                        l = (typeof l === "function" ? l.call(d) : l)||"";
                    } catch(err) {
                        console.log("Definition error: "+d.type+".label",err);
                        l = d.type;
                    }
                    d.w = Math.max(node_width,gridSize*(Math.ceil((calculateTextWidth(l, "node_label", 50)+(d._def.inputs>0?7:0))/gridSize)) );
                    d.h = Math.max(node_height,(d.outputs||0) * 15);

                    if (d._def.badge) {
                        var badge = node.append("svg:g").attr("class","node_badge_group");
                        var badgeRect = badge.append("rect").attr("class","node_badge").attr("rx",5).attr("ry",5).attr("width",40).attr("height",15);
                        badge.append("svg:text").attr("class","node_badge_label").attr("x",35).attr("y",11).attr('text-anchor','end').text(d._def.badge());
                        if (d._def.onbadgeclick) {
                            badgeRect.attr("cursor","pointer")
                                .on("click",function(d) { d._def.onbadgeclick.call(d);d3.event.preventDefault();});
                        }
                    }

                    if (d._def.button) {
                        var nodeButtonGroup = node.append('svg:g')
                            .attr("transform",function(d) { return "translate("+((d._def.align == "right") ? 94 : -25)+",2)"; })
                            .attr("class",function(d) { return "node_button "+((d._def.align == "right") ? "node_right_button" : "node_left_button"); });
                        nodeButtonGroup.append('rect')
                            .attr("rx",5)
                            .attr("ry",5)
                            .attr("width",32)
                            .attr("height",node_height-4)
                            .attr("fill","#eee");//function(d) { return d._def.color;})
                        nodeButtonGroup.append('rect')
                            .attr("class","node_button_button")
                            .attr("x",function(d) { return d._def.align == "right"? 11:5})
                            .attr("y",4)
                            .attr("rx",4)
                            .attr("ry",4)
                            .attr("width",16)
                            .attr("height",node_height-12)
                            .attr("fill",function(d) { return d._def.color;})
                            .attr("cursor","pointer")
                            .on("mousedown",function(d) {if (!lasso && !d.changed) {focusView();d3.select(this).attr("fill-opacity",0.2);d3.event.preventDefault(); d3.event.stopPropagation();}})
                            .on("mouseup",function(d) {if (!lasso && !d.changed) { d3.select(this).attr("fill-opacity",0.4);d3.event.preventDefault();d3.event.stopPropagation();}})
                            .on("mouseover",function(d) {if (!lasso && !d.changed) { d3.select(this).attr("fill-opacity",0.4);}})
                            .on("mouseout",function(d) {if (!lasso  && !d.changed) {
                                var op = 1;
                                if (d._def.button.toggle) {
                                    op = d[d._def.button.toggle]?1:0.2;
                                }
                                d3.select(this).attr("fill-opacity",op);
                            }})
                            .on("click",nodeButtonClicked)
                            .on("touchstart",nodeButtonClicked)
                    }

                    var mainRect = node.append("rect")
                        .attr("class", "node")
                        .classed("node_unknown",function(d) { return d.type == "unknown"; })
                        .attr("rx", 5)
                        .attr("ry", 5)
                        .attr("fill",function(d) { return d._def.color;})
                        .on("mouseup",nodeMouseUp)
                        .on("mousedown",nodeMouseDown)
                        .on("touchstart",function(d) {
                            var obj = d3.select(this);
                            var touch0 = d3.event.touches.item(0);
                            var pos = [touch0.pageX,touch0.pageY];
                            startTouchCenter = [touch0.pageX,touch0.pageY];
                            startTouchDistance = 0;
                            touchStartTime = setTimeout(function() {
                                showTouchMenu(obj,pos);
                            },touchLongPressTimeout);
                            nodeMouseDown.call(this,d)
                        })
                        .on("touchend", function(d) {
                            clearTimeout(touchStartTime);
                            touchStartTime = null;
                            if  (RED.touch.radialMenu.active()) {
                                d3.event.stopPropagation();
                                return;
                            }
                            nodeMouseUp.call(this,d);
                        })
                        .on("mouseover",function(d) {
                                if (mouse_mode === 0) {
                                    var node = d3.select(this);
                                    node.classed("node_hovered",true);
                                }
                        })
                        .on("mouseout",function(d) {
                                var node = d3.select(this);
                                node.classed("node_hovered",false);
                        });

                   //node.append("rect").attr("class", "node-gradient-top").attr("rx", 6).attr("ry", 6).attr("height",30).attr("stroke","none").attr("fill","url(#gradient-top)").style("pointer-events","none");
                   //node.append("rect").attr("class", "node-gradient-bottom").attr("rx", 6).attr("ry", 6).attr("height",30).attr("stroke","none").attr("fill","url(#gradient-bottom)").style("pointer-events","none");

                    if (d._def.icon) {

                        var icon_group = node.append("g")
                            .attr("class","node_icon_group")
                            .attr("x",0).attr("y",0);

                        var icon_shade = icon_group.append("rect")
                            .attr("x",0).attr("y",0)
                            .attr("class","node_icon_shade")
                            .attr("width","30")
                            .attr("stroke","none")
                            .attr("fill","#000")
                            .attr("fill-opacity","0.05")
                            .attr("height",function(d){return Math.min(50,d.h-4);});

                        var icon = icon_group.append("image")
                            .attr("xlink:href","icons/"+d._def.icon)
                            .attr("class","node_icon")
                            .attr("x",0)
                            .attr("width","30")
                            .attr("height","30");

                        var icon_shade_border = icon_group.append("path")
                            .attr("d",function(d) { return "M 30 1 l 0 "+(d.h-2)})
                            .attr("class","node_icon_shade_border")
                            .attr("stroke-opacity","0.1")
                            .attr("stroke","#000")
                            .attr("stroke-width","1");

                        if ("right" == d._def.align) {
                            icon_group.attr('class','node_icon_group node_icon_group_'+d._def.align);
                            icon_shade_border.attr("d",function(d) { return "M 0 1 l 0 "+(d.h-2)})
                            //icon.attr('class','node_icon node_icon_'+d._def.align);
                            //icon.attr('class','node_icon_shade node_icon_shade_'+d._def.align);
                            //icon.attr('class','node_icon_shade_border node_icon_shade_border_'+d._def.align);
                        }

                        //if (d.inputs > 0 && d._def.align == null) {
                        //    icon_shade.attr("width",35);
                        //    icon.attr("transform","translate(5,0)");
                        //    icon_shade_border.attr("transform","translate(5,0)");
                        //}
                        //if (d._def.outputs > 0 && "right" == d._def.align) {
                        //    icon_shade.attr("width",35); //icon.attr("x",5);
                        //}

                        var img = new Image();
                        img.src = "icons/"+d._def.icon;
                        img.onload = function() {
                            icon.attr("width",Math.min(img.width,30));
                            icon.attr("height",Math.min(img.height,30));
                            icon.attr("x",15-Math.min(img.width,30)/2);
                            //if ("right" == d._def.align) {
                            //    icon.attr("x",function(d){return d.w-img.width-1-(d.outputs>0?5:0);});
                            //    icon_shade.attr("x",function(d){return d.w-30});
                            //    icon_shade_border.attr("d",function(d){return "M "+(d.w-30)+" 1 l 0 "+(d.h-2);});
                            //}
                        }

                        //icon.style("pointer-events","none");
                        icon_group.style("pointer-events","none");
                    }
                    var text = node.append('svg:text').attr('class','node_label').attr('x', 38).attr('dy', '.35em').attr('text-anchor','start');
                    if (d._def.align) {
                        text.attr('class','node_label node_label_'+d._def.align);
                        if (d._def.align === "right") {
                            text.attr('text-anchor','end');
                        }
                    }

                    var status = node.append("svg:g").attr("class","node_status_group").style("display","none");

                    var statusRect = status.append("rect").attr("class","node_status")
                                        .attr("x",6).attr("y",1).attr("width",9).attr("height",9)
                                        .attr("rx",2).attr("ry",2).attr("stroke-width","3");

                    var statusLabel = status.append("svg:text")
                        .attr("class","node_status_label")
                        .attr('x',20).attr('y',9);

                    //node.append("circle").attr({"class":"centerDot","cx":0,"cy":0,"r":5});

                    //node.append("path").attr("class","node_error").attr("d","M 3,-3 l 10,0 l -5,-8 z");
                    node.append("image").attr("class","node_error hidden").attr("xlink:href","icons/node-error.png").attr("x",0).attr("y",-6).attr("width",10).attr("height",9);
                    node.append("image").attr("class","node_changed hidden").attr("xlink:href","icons/node-changed.png").attr("x",12).attr("y",-6).attr("width",10).attr("height",10);
            });

            node.each(function(d,i) {
                    if (d.dirty) {
                        dirtyNodes[d.id] = d;
                        //if (d.x < -50) deleteSelection();  // Delete nodes if dragged back to palette
                        if (d.resize) {
                            var l = d._def.label;
                            try {
                                l = (typeof l === "function" ? l.call(d) : l)||"";
                            } catch(err) {
                                console.log("Definition error: "+d.type+".label",err);
                                l = d.type;
                            }
                            var ow = d.w;
                            d.w = Math.max(node_width,gridSize*(Math.ceil((calculateTextWidth(l, "node_label", 50)+(d._def.inputs>0?7:0))/gridSize)) );
                            d.h = Math.max(node_height,(d.outputs||0) * 15);
                            d.x += (d.w-ow)/2;
                            d.resize = false;
                        }
                        var thisNode = d3.select(this);
                        //thisNode.selectAll(".centerDot").attr({"cx":function(d) { return d.w/2;},"cy":function(d){return d.h/2}});
                        thisNode.attr("transform", function(d) { return "translate(" + (d.x-d.w/2) + "," + (d.y-d.h/2) + ")"; });

                        if (mouse_mode != RED.state.MOVING_ACTIVE) {
                            thisNode.selectAll(".node")
                                .attr("width",function(d){return d.w})
                                .attr("height",function(d){return d.h})
                                .classed("node_selected",function(d) { return d.selected; })
                                .classed("node_highlighted",function(d) { return d.highlighted; })
                            ;
                            //thisNode.selectAll(".node-gradient-top").attr("width",function(d){return d.w});
                            //thisNode.selectAll(".node-gradient-bottom").attr("width",function(d){return d.w}).attr("y",function(d){return d.h-30});

                            thisNode.selectAll(".node_icon_group_right").attr('transform', function(d){return "translate("+(d.w-30)+",0)"});
                            thisNode.selectAll(".node_label_right").attr('x', function(d){return d.w-38});
                            //thisNode.selectAll(".node_icon_right").attr("x",function(d){return d.w-d3.select(this).attr("width")-1-(d.outputs>0?5:0);});
                            //thisNode.selectAll(".node_icon_shade_right").attr("x",function(d){return d.w-30;});
                            //thisNode.selectAll(".node_icon_shade_border_right").attr("d",function(d){return "M "+(d.w-30)+" 1 l 0 "+(d.h-2)});

                            var inputPorts = thisNode.selectAll(".port_input");
                            if (d.inputs === 0 && !inputPorts.empty()) {
                                inputPorts.remove();
                                //nodeLabel.attr("x",30);
                            } else if (d.inputs === 1 && inputPorts.empty()) {
                                var inputGroup = thisNode.append("g").attr("class","port_input");
                                inputGroup.append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10)
                                    .on("mousedown",function(d){portMouseDown(d,1,0);})
                                    .on("touchstart",function(d){portMouseDown(d,1,0);})
                                    .on("mouseup",function(d){portMouseUp(d,1,0);} )
                                    .on("touchend",function(d){portMouseUp(d,1,0);} )
                                    .on("mouseover",function(d) { var port = d3.select(this); port.classed("port_hovered",(mouse_mode!=RED.state.JOINING || (drag_lines.length > 0 && drag_lines[0].portType !== 1) ));})
                                    .on("mouseout",function(d) { var port = d3.select(this); port.classed("port_hovered",false);})
                            }

                            var numOutputs = d.outputs;
                            var y = (d.h/2)-((numOutputs-1)/2)*13;
                            d.ports = d.ports || d3.range(numOutputs);
                            d._ports = thisNode.selectAll(".port_output").data(d.ports);
                            var output_group = d._ports.enter().append("g").attr("class","port_output");

                            output_group.append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10)
                                .on("mousedown",(function(){var node = d; return function(d,i){portMouseDown(node,0,i);}})() )
                                .on("touchstart",(function(){var node = d; return function(d,i){portMouseDown(node,0,i);}})() )
                                .on("mouseup",(function(){var node = d; return function(d,i){portMouseUp(node,0,i);}})() )
                                .on("touchend",(function(){var node = d; return function(d,i){portMouseUp(node,0,i);}})() )
                                .on("mouseover",function(d,i) { var port = d3.select(this); port.classed("port_hovered",(mouse_mode!=RED.state.JOINING || (drag_lines.length > 0 && drag_lines[0].portType !== 0) ));})
                                .on("mouseout",function(d,i) { var port = d3.select(this); port.classed("port_hovered",false);});

                            d._ports.exit().remove();
                            if (d._ports) {
                                numOutputs = d.outputs || 1;
                                y = (d.h/2)-((numOutputs-1)/2)*13;
                                var x = d.w - 5;
                                d._ports.each(function(d,i) {
                                        var port = d3.select(this);
                                        //port.attr("y",(y+13*i)-5).attr("x",x);
                                        port.attr("transform", function(d) { return "translate("+x+","+((y+13*i)-5)+")";});
                                });
                            }
                            thisNode.selectAll('text.node_label').text(function(d,i){
                                    var l = "";
                                    if (d._def.label) {
                                        l = d._def.label;
                                        try {
                                            l = (typeof l === "function" ? l.call(d) : l)||"";
                                        } catch(err) {
                                            console.log("Definition error: "+d.type+".label",err);
                                            l = d.type;
                                        }
                                    }
                                    return l;
                                })
                                .attr('y', function(d){return (d.h/2)-1;})
                                .attr('class',function(d){
                                    var s = "";
                                    if (d._def.labelStyle) {
                                        s = d._def.labelStyle;
                                        try {
                                            s = (typeof s === "function" ? s.call(d) : s)||"";
                                        } catch(err) {
                                            console.log("Definition error: "+d.type+".labelStyle",err);
                                            s = "";
                                        }
                                        s = " "+s;
                                    }
                                    return 'node_label'+
                                    (d._def.align?' node_label_'+d._def.align:'')+s;
                            });

                            if (d._def.icon) {
                                icon = thisNode.select(".node_icon");
                                var current_url = icon.attr("xlink:href");
                                var icon_url;
                                if (typeof d._def.icon == "function") {
                                    try {
                                        icon_url = d._def.icon.call(d);
                                    } catch(err) {
                                        console.log("icon",err);
                                        icon_url = "arrow-in.png";
                                    }
                                } else {
                                    icon_url = d._def.icon;
                                }
                                if ("icons/"+icon_url != current_url) {
                                    icon.attr("xlink:href","icons/"+icon_url);
                                    var img = new Image();
                                    img.src = "icons/"+d._def.icon;
                                    img.onload = function() {
                                        icon.attr("width",Math.min(img.width,30));
                                        icon.attr("height",Math.min(img.height,30));
                                        icon.attr("x",15-Math.min(img.width,30)/2);
                                    }
                                }
                            }


                            thisNode.selectAll(".node_tools").attr("x",function(d){return d.w-35;}).attr("y",function(d){return d.h-20;});

                            thisNode.selectAll(".node_changed")
                                .attr("x",function(d){return d.w-10})
                                .classed("hidden",function(d) { return !d.changed; });

                            thisNode.selectAll(".node_error")
                                .attr("x",function(d){return d.w-10-(d.changed?13:0)})
                                .classed("hidden",function(d) { return d.valid; });

                            thisNode.selectAll(".port_input").each(function(d,i) {
                                    var port = d3.select(this);
                                    port.attr("transform",function(d){return "translate(-5,"+((d.h/2)-5)+")";})
                            });

                            thisNode.selectAll(".node_icon").attr("y",function(d){return (d.h-d3.select(this).attr("height"))/2;});
                            thisNode.selectAll(".node_icon_shade").attr("height",function(d){return d.h;});
                            thisNode.selectAll(".node_icon_shade_border").attr("d",function(d){ return "M "+(("right" == d._def.align) ?0:30)+" 1 l 0 "+(d.h-2)});

                            thisNode.selectAll('.node_button').attr("opacity",function(d) {
                                return (activeSubflow||d.changed)?0.4:1
                            });
                            thisNode.selectAll('.node_button_button').attr("cursor",function(d) {
                                return (activeSubflow||d.changed)?"":"pointer";
                            });
                            thisNode.selectAll('.node_right_button').attr("transform",function(d){
                                    var x = d.w-6;
                                    if (d._def.button.toggle && !d[d._def.button.toggle]) {
                                        x = x - 8;
                                    }
                                    return "translate("+x+",2)";
                            });
                            thisNode.selectAll('.node_right_button rect').attr("fill-opacity",function(d){
                                    if (d._def.button.toggle) {
                                        return d[d._def.button.toggle]?1:0.2;
                                    }
                                    return 1;
                            });

                            //thisNode.selectAll('.node_right_button').attr("transform",function(d){return "translate("+(d.w - d._def.button.width.call(d))+","+0+")";}).attr("fill",function(d) {
                            //         return typeof d._def.button.color  === "function" ? d._def.button.color.call(d):(d._def.button.color != null ? d._def.button.color : d._def.color)
                            //});

                            thisNode.selectAll('.node_badge_group').attr("transform",function(d){return "translate("+(d.w-40)+","+(d.h+3)+")";});
                            thisNode.selectAll('text.node_badge_label').text(function(d,i) {
                                if (d._def.badge) {
                                    if (typeof d._def.badge == "function") {
                                        try {
                                            return d._def.badge.call(d);
                                        } catch(err) {
                                            console.log("Definition error: "+d.type+".badge",err);
                                            return "";
                                        }
                                    } else {
                                        return d._def.badge;
                                    }
                                }
                                return "";
                            });
                        }

                        if (!showStatus || !d.status) {
                            thisNode.selectAll('.node_status_group').style("display","none");
                        } else {
                            thisNode.selectAll('.node_status_group').style("display","inline").attr("transform","translate(3,"+(d.h+3)+")");
                            var fill = status_colours[d.status.fill]; // Only allow our colours for now
                            if (d.status.shape == null && fill == null) {
                                thisNode.selectAll('.node_status').style("display","none");
                            } else {
                                var style;
                                if (d.status.shape == null || d.status.shape == "dot") {
                                    style = {
                                        display: "inline",
                                        fill: fill,
                                        stroke: fill
                                    };
                                } else if (d.status.shape == "ring" ){
                                    style = {
                                        display: "inline",
                                        fill: '#fff',
                                        stroke: fill
                                    }
                                }
                                thisNode.selectAll('.node_status').style(style);
                            }
                            if (d.status.text) {
                                thisNode.selectAll('.node_status_label').text(d.status.text);
                            } else {
                                thisNode.selectAll('.node_status_label').text("");
                            }
                        }

                        d.dirty = false;
                    }
            });
            var link = vis.selectAll(".link").data(
                activeLinks,
                function(d) {
                    return d.source.id+":"+d.sourcePort+":"+d.target.id+":"+d.target.i;
                }
            );
            var linkEnter = link.enter().insert("g",".node").attr("class","link");

            linkEnter.each(function(d,i) {
                var l = d3.select(this);
                d.added = true;
                l.append("svg:path").attr("class","link_background link_path")
                   .on("mousedown",function(d) {
                        mousedown_link = d;
                        clearSelection();
                        selected_link = mousedown_link;
                        updateSelection();
                        redraw();
                        focusView();
                        d3.event.stopPropagation();
                    })
                    .on("touchstart",function(d) {
                        mousedown_link = d;
                        clearSelection();
                        selected_link = mousedown_link;
                        updateSelection();
                        redraw();
                        focusView();
                        d3.event.stopPropagation();

                        var obj = d3.select(document.body);
                        var touch0 = d3.event.touches.item(0);
                        var pos = [touch0.pageX,touch0.pageY];
                        touchStartTime = setTimeout(function() {
                            touchStartTime = null;
                            showTouchMenu(obj,pos);
                        },touchLongPressTimeout);
                    })
                l.append("svg:path").attr("class","link_outline link_path");
                l.append("svg:path").attr("class","link_line link_path")
                    .classed("link_subflow", function(d) { return activeSubflow && (d.source.type === "subflow" || d.target.type === "subflow") });
            });

            link.exit().remove();
            var links = vis.selectAll(".link_path");
            links.each(function(d) {
                var link = d3.select(this);
                if (d.added || d===selected_link || d.selected || dirtyNodes[d.source.id] || dirtyNodes[d.target.id]) {
                    link.attr("d",function(d){
                        var numOutputs = d.source.outputs || 1;
                        var sourcePort = d.sourcePort || 0;
                        var y = -((numOutputs-1)/2)*13 +13*sourcePort;

                        var dy = d.target.y-(d.source.y+y);
                        var dx = (d.target.x-d.target.w/2)-(d.source.x+d.source.w/2);
                        var delta = Math.sqrt(dy*dy+dx*dx);
                        var scale = lineCurveScale;
                        var scaleY = 0;
                        if (delta < node_width) {
                            scale = 0.75-0.75*((node_width-delta)/node_width);
                        }

                        if (dx < 0) {
                            scale += 2*(Math.min(5*node_width,Math.abs(dx))/(5*node_width));
                            if (Math.abs(dy) < 3*node_height) {
                                scaleY = ((dy>0)?0.5:-0.5)*(((3*node_height)-Math.abs(dy))/(3*node_height))*(Math.min(node_width,Math.abs(dx))/(node_width)) ;
                            }
                        }

                        d.x1 = d.source.x+d.source.w/2;
                        d.y1 = d.source.y+y;
                        d.x2 = d.target.x-d.target.w/2;
                        d.y2 = d.target.y;

                        return "M "+(d.source.x+d.source.w/2)+" "+(d.source.y+y)+
                            " C "+(d.source.x+d.source.w/2+scale*node_width)+" "+(d.source.y+y+scaleY*node_height)+" "+
                            (d.target.x-d.target.w/2-scale*node_width)+" "+(d.target.y-scaleY*node_height)+" "+
                            (d.target.x-d.target.w/2)+" "+d.target.y;
                    });
                }
            })

            link.classed("link_selected", function(d) { return d === selected_link || d.selected; });
            link.classed("link_unknown",function(d) {
                delete d.added;
                return d.target.type == "unknown" || d.source.type == "unknown"
            });
        } else {
            // JOINING - unselect any selected links
            vis.selectAll(".link_selected").data(
                activeLinks,
                function(d) {
                    return d.source.id+":"+d.sourcePort+":"+d.target.id+":"+d.target.i;
                }
            ).classed("link_selected", false);
        }


        if (d3.event) {
            d3.event.preventDefault();
        }

    }

    function focusView() {
        $("#chart svg").focus();
    }

    /**
     * Imports a new collection of nodes from a JSON String.
     *  - all get new IDs assigned
     *  - all 'selected'
     *  - attached to mouse for placing - 'IMPORT_DRAGGING'
     */
    function importNodes(newNodesStr,touchImport) {
        try {
            var activeSubflowChanged;
            if (activeSubflow) {
                activeSubflowChanged = activeSubflow.changed;
            }
            var result = RED.nodes.import(newNodesStr,true);
            if (result) {
                var new_nodes = result[0];
                var new_links = result[1];
                var new_workspaces = result[2];
                var new_subflows = result[3];

                var new_ms = new_nodes.filter(function(n) { return n.hasOwnProperty('x') && n.hasOwnProperty('y') && n.z == RED.workspaces.active() }).map(function(n) { return {n:n};});
                var new_node_ids = new_nodes.map(function(n){ return n.id; });

                // TODO: pick a more sensible root node
                if (new_ms.length > 0) {
                    var root_node = new_ms[0].n;
                    var dx = root_node.x;
                    var dy = root_node.y;

                    if (mouse_position == null) {
                        mouse_position = [0,0];
                    }

                    var minX = 0;
                    var minY = 0;
                    var i;
                    var node;

                    for (i=0;i<new_ms.length;i++) {
                        node = new_ms[i];
                        node.n.selected = true;
                        node.n.changed = true;
                        node.n.x -= dx - mouse_position[0];
                        node.n.y -= dy - mouse_position[1];
                        node.dx = node.n.x - mouse_position[0];
                        node.dy = node.n.y - mouse_position[1];
                        minX = Math.min(node.n.x-node_width/2-5,minX);
                        minY = Math.min(node.n.y-node_height/2-5,minY);
                    }
                    for (i=0;i<new_ms.length;i++) {
                        node = new_ms[i];
                        node.n.x -= minX;
                        node.n.y -= minY;
                        node.dx -= minX;
                        node.dy -= minY;
                    }
                    if (!touchImport) {
                        mouse_mode = RED.state.IMPORT_DRAGGING;
                        spliceActive = false;
                        if (new_ms.length === 1) {
                            node = new_ms[0];
                            spliceActive = node.n._def.inputs > 0 &&
                                           node.n._def.outputs > 0;
                        }
                    }

                    RED.keyboard.add(/* ESCAPE */ 27,function(){
                            RED.keyboard.remove(/* ESCAPE */ 27);
                            clearSelection();
                            RED.history.pop();
                            mouse_mode = 0;
                    });
                    clearSelection();
                    moving_set = new_ms;
                }

                var historyEvent = {
                    t:'add',
                    nodes:new_node_ids,
                    links:new_links,
                    workspaces:new_workspaces,
                    subflows:new_subflows,
                    dirty:RED.nodes.dirty()
                };
                if (activeSubflow) {
                    var subflowRefresh = RED.subflow.refresh(true);
                    if (subflowRefresh) {
                        historyEvent.subflow = {
                            id:activeSubflow.id,
                            changed: activeSubflowChanged,
                            instances: subflowRefresh.instances
                        }
                    }
                }
                RED.history.push(historyEvent);

                updateActiveNodes();
                redraw();
            }
        } catch(error) {
            if (error.code != "NODE_RED") {
                console.log(error.stack);
                RED.notify(RED._("notification.error",{message:error.toString()}),"error");
            } else {
                RED.notify(RED._("notification.error",{message:error.message}),"error");
            }
        }
    }

    return {
        init: init,
        state:function(state) {
            if (state == null) {
                return mouse_mode
            } else {
                mouse_mode = state;
            }
        },

        redraw: function(updateActive) {
            if (updateActive) {
                updateActiveNodes();
            }
            redraw();
        },
        focus: focusView,
        importNodes: importNodes,
        status: function(s) {
            if (s == null) {
                return showStatus;
            } else {
                showStatus = s;
                RED.nodes.eachNode(function(n) { n.dirty = true;});
                //TODO: subscribe/unsubscribe here
                redraw();
            }
        },
        calculateTextWidth: calculateTextWidth,
        select: function(selection) {
            if (typeof selection !== "undefined") {
                clearSelection();
                if (typeof selection == "string") {
                    var selectedNode = RED.nodes.node(selection);
                    if (selectedNode) {
                        selectedNode.selected = true;
                        selectedNode.dirty = true;
                        moving_set = [{n:selectedNode}];
                    }
                }
            }
            updateSelection();
            redraw();
        },
        selection: function() {
            var selection = {};
            if (moving_set.length > 0) {
                selection.nodes = moving_set.map(function(n) { return n.n;});
            }
            if (selected_link != null) {
                selection.link = selected_link;
            }
            return selection;
        },
        toggleShowGrid: function(state) {
            if (state) {
                grid.style("visibility","visible");
            } else {
                grid.style("visibility","hidden");
            }
        },
        toggleSnapGrid: function(state) {
            snapGrid = state;
            redraw();
        },
        scale: function() {
            return scaleFactor;
        },
        getLinksAtPoint: function(x,y) {
            var result = [];
            var links = outer.selectAll(".link_background")[0];
            for (var i=0;i<links.length;i++) {
                var bb = links[i].getBBox();
                if (x >= bb.x && y >= bb.y && x <= bb.x+bb.width && y <= bb.y+bb.height) {
                    result.push(links[i])
                }
            }
            return result;
        }
    };
})();
;/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.sidebar = (function() {

    //$('#sidebar').tabs();
    var sidebar_tabs = RED.tabs.create({
        id:"sidebar-tabs",
        onchange:function(tab) {
            $("#sidebar-content").children().hide();
            $("#sidebar-footer").children().hide();
            if (tab.onchange) {
                tab.onchange.call(tab);
            }
            $(tab.content).show();
            if (tab.toolbar) {
                $(tab.toolbar).show();
            }
        },
        onremove: function(tab) {
            $(tab.content).hide();
            if (tab.onremove) {
                tab.onremove.call(tab);
            }
        },
        minimumActiveTabWidth: 110
    });

    var knownTabs = {

    };

    function addTab(title,content,closeable,visible) {
        var options;
        if (typeof title === "string") {
            // TODO: legacy support in case anyone uses this...
            options = {
                id: content.id,
                label: title,
                name: title,
                content: content,
                closeable: closeable,
                visible: visible
            }
        } else if (typeof title === "object") {
            options = title;
        }



        $("#sidebar-content").append(options.content);
        $(options.content).hide();
        if (options.toolbar) {
            $("#sidebar-footer").append(options.toolbar);
            $(options.toolbar).hide();
        }
        $(options.content).hide();
        var id = options.id;

        RED.menu.addItem("menu-item-view-menu",{
            id:"menu-item-view-menu-"+options.id,
            label:options.name,
            onselect:function() {
                showSidebar(options.id);
            },
            group: "sidebar-tabs"
        });

        knownTabs[options.id] = options;

        if (options.visible !== false) {
            sidebar_tabs.addTab(knownTabs[options.id]);
        }
    }

    function removeTab(id) {
        sidebar_tabs.removeTab(id);
        $(knownTabs[id].content).remove();
        delete knownTabs[id];
        RED.menu.removeItem("menu-item-view-menu-"+id);
    }

    var sidebarSeparator =  {};
    $("#sidebar-separator").draggable({
            axis: "x",
            start:function(event,ui) {
                sidebarSeparator.closing = false;
                sidebarSeparator.opening = false;
                var winWidth = $(window).width();
                sidebarSeparator.start = ui.position.left;
                sidebarSeparator.chartWidth = $("#workspace").width();
                sidebarSeparator.chartRight = winWidth-$("#workspace").width()-$("#workspace").offset().left-2;


                if (!RED.menu.isSelected("menu-item-sidebar")) {
                    sidebarSeparator.opening = true;
                    var newChartRight = 7;
                    $("#sidebar").addClass("closing");
                    $("#workspace").css("right",newChartRight);
                    $("#sidebar").width(0);
                    RED.menu.setSelected("menu-item-sidebar",true);
                    RED.events.emit("sidebar:resize");
                }
                sidebarSeparator.width = $("#sidebar").width();
            },
            drag: function(event,ui) {
                var d = ui.position.left-sidebarSeparator.start;
                var newSidebarWidth = sidebarSeparator.width-d;
                if (sidebarSeparator.opening) {
                    newSidebarWidth -= 3;
                }

                if (newSidebarWidth > 150) {
                    if (sidebarSeparator.chartWidth+d < 200) {
                        ui.position.left = 200+sidebarSeparator.start-sidebarSeparator.chartWidth;
                        d = ui.position.left-sidebarSeparator.start;
                        newSidebarWidth = sidebarSeparator.width-d;
                    }
                }

                if (newSidebarWidth < 150) {
                    if (!sidebarSeparator.closing) {
                        $("#sidebar").addClass("closing");
                        sidebarSeparator.closing = true;
                    }
                    if (!sidebarSeparator.opening) {
                        newSidebarWidth = 150;
                        ui.position.left = sidebarSeparator.width-(150 - sidebarSeparator.start);
                        d = ui.position.left-sidebarSeparator.start;
                    }
                } else if (newSidebarWidth > 150 && (sidebarSeparator.closing || sidebarSeparator.opening)) {
                    sidebarSeparator.closing = false;
                    $("#sidebar").removeClass("closing");
                }

                var newChartRight = sidebarSeparator.chartRight-d;
                $("#workspace").css("right",newChartRight);
                $("#sidebar").width(newSidebarWidth);

                sidebar_tabs.resize();
                RED.events.emit("sidebar:resize");
            },
            stop:function(event,ui) {
                if (sidebarSeparator.closing) {
                    $("#sidebar").removeClass("closing");
                    RED.menu.setSelected("menu-item-sidebar",false);
                    if ($("#sidebar").width() < 180) {
                        $("#sidebar").width(180);
                        $("#workspace").css("right",187);
                    }
                }
                $("#sidebar-separator").css("left","auto");
                $("#sidebar-separator").css("right",($("#sidebar").width()+2)+"px");
                RED.events.emit("sidebar:resize");
            }
    });

    function toggleSidebar(state) {
        if (!state) {
            $("#main-container").addClass("sidebar-closed");
        } else {
            $("#main-container").removeClass("sidebar-closed");
            sidebar_tabs.resize();
        }
        RED.events.emit("sidebar:resize");
    }

    function showSidebar(id) {
        if (id) {
            if (!containsTab(id)) {
                sidebar_tabs.addTab(knownTabs[id]);
            }
            sidebar_tabs.activateTab(id);
            if (!RED.menu.isSelected("menu-item-sidebar")) {
                RED.menu.setSelected("menu-item-sidebar",true);
            }
        }
    }

    function containsTab(id) {
        return sidebar_tabs.contains(id);
    }

    function init () {
        RED.keyboard.add(/* SPACE */ 32,{ctrl:true},function(){RED.menu.setSelected("menu-item-sidebar",!RED.menu.isSelected("menu-item-sidebar"));d3.event.preventDefault();});
        showSidebar();
        RED.sidebar.info.init();
        RED.sidebar.config.init();
        // hide info bar at start if screen rather narrow...
        if ($(window).width() < 600) { toggleSidebar(); }
    }

    return {
        init: init,
        addTab: addTab,
        removeTab: removeTab,
        show: showSidebar,
        containsTab: containsTab,
        toggleSidebar: toggleSidebar,
    }

})();
;/**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.palette = (function() {

    var exclusion = ['config','unknown','deprecated'];
    var core = ['subflows', 'input', 'output', 'function', 'social', 'mobile', 'storage', 'analysis', 'advanced'];

    var categoryContainers = {};

    function createCategoryContainer(category, label){
        label = label || category.replace("_", " ");
        var catDiv = $('<div id="palette-container-'+category+'" class="palette-category palette-close hide">'+
            '<div id="palette-header-'+category+'" class="palette-header"><i class="expanded fa fa-angle-down"></i><span>'+label+'</span></div>'+
            '<div class="palette-content" id="palette-base-category-'+category+'">'+
            '<div id="palette-'+category+'-input"></div>'+
            '<div id="palette-'+category+'-output"></div>'+
            '<div id="palette-'+category+'-function"></div>'+
            '</div>'+
            '</div>').appendTo("#palette-container");

        categoryContainers[category] = {
            container: catDiv,
            close: function() {
                catDiv.removeClass("palette-open");
                catDiv.addClass("palette-closed");
                $("#palette-base-category-"+category).slideUp();
                $("#palette-header-"+category+" i").removeClass("expanded");
            },
            open: function() {
                catDiv.addClass("palette-open");
                catDiv.removeClass("palette-closed");
                $("#palette-base-category-"+category).slideDown();
                $("#palette-header-"+category+" i").addClass("expanded");
            },
            toggle: function() {
                if (catDiv.hasClass("palette-open")) {
                    categoryContainers[category].close();
                } else {
                    categoryContainers[category].open();
                }
            }
        };

        $("#palette-header-"+category).on('click', function(e) {
            categoryContainers[category].toggle();
        });
    }

    function setLabel(type, el,label, info) {
        var nodeWidth = 82;
        var nodeHeight = 25;
        var lineHeight = 20;
        var portHeight = 10;

        var words = label.split(/[ -]/);

        var displayLines = [];

        var currentLine = words[0];
        var currentLineWidth = RED.view.calculateTextWidth(currentLine, "palette_label", 0);

        for (var i=1;i<words.length;i++) {
            var newWidth = RED.view.calculateTextWidth(currentLine+" "+words[i], "palette_label", 0);
            if (newWidth < nodeWidth) {
                currentLine += " "+words[i];
                currentLineWidth = newWidth;
            } else {
                displayLines.push(currentLine);
                currentLine = words[i];
                currentLineWidth = RED.view.calculateTextWidth(currentLine, "palette_label", 0);
            }
        }
        displayLines.push(currentLine);

        var lines = displayLines.join("<br/>");
        var multiLineNodeHeight = 8+(lineHeight*displayLines.length);
        el.css({height:multiLineNodeHeight+"px"});

        var labelElement = el.find(".palette_label");
        labelElement.html(lines);

        el.find(".palette_port").css({top:(multiLineNodeHeight/2-5)+"px"});

        var popOverContent;
        try {
            var l = "<p><b>"+label+"</b></p>";
            if (label != type) {
                l = "<p><b>"+label+"</b><br/><i>"+type+"</i></p>";
            }
            popOverContent = $(l+(info?info:$("script[data-help-name|='"+type+"']").html()||"<p>"+RED._("palette.noInfo")+"</p>").trim())
                                .filter(function(n) {
                                    return (this.nodeType == 1 && this.nodeName == "P") || (this.nodeType == 3 && this.textContent.trim().length > 0)
                                }).slice(0,2);
        } catch(err) {
            // Malformed HTML may cause errors. TODO: need to understand what can break
            // NON-NLS: internal debug
            console.log("Error generating pop-over label for ",type);
            console.log(err.toString());
            popOverContent = "<p><b>"+label+"</b></p><p>"+RED._("palette.noInfo")+"</p>";
        }

        el.data('popover').setContent(popOverContent);
    }

    function escapeNodeType(nt) {
        return nt.replace(" ","_").replace(".","_").replace(":","_");
    }

    function addNodeType(nt,def) {
        var nodeTypeId = escapeNodeType(nt);
        if ($("#palette_node_"+nodeTypeId).length) {
            return;
        }
        if (exclusion.indexOf(def.category)===-1) {

            var category = def.category.replace(" ","_");
            var rootCategory = category.split("-")[0];

            var d = document.createElement("div");
            d.id = "palette_node_"+nodeTypeId;
            d.type = nt;

            var label = /^(.*?)([ -]in|[ -]out)?$/.exec(nt)[1];
            if (typeof def.paletteLabel !== "undefined") {
                try {
                    label = (typeof def.paletteLabel === "function" ? def.paletteLabel.call(def) : def.paletteLabel)||"";
                } catch(err) {
                    console.log("Definition error: "+nt+".paletteLabel",err);
                }
            }

            $('<div/>',{class:"palette_label"+(def.align=="right"?" palette_label_right":"")}).appendTo(d);

            d.className="palette_node";


            if (def.icon) {
                var icon_url = "arrow-in.png";
                try {
                    icon_url = (typeof def.icon === "function" ? def.icon.call({}) : def.icon);
                } catch(err) {
                    console.log("Definition error: "+nt+".icon",err);
                }
                var iconContainer = $('<div/>',{class:"palette_icon_container"+(def.align=="right"?" palette_icon_container_right":"")}).appendTo(d);
                $('<div/>',{class:"palette_icon",style:"background-image: url(icons/"+icon_url+")"}).appendTo(iconContainer);
            }

            d.style.backgroundColor = def.color;

            if (def.outputs > 0) {
                var portOut = document.createElement("div");
                portOut.className = "palette_port palette_port_output";
                d.appendChild(portOut);
            }

            if (def.inputs > 0) {
                var portIn = document.createElement("div");
                portIn.className = "palette_port palette_port_input";
                d.appendChild(portIn);
            }

            if ($("#palette-base-category-"+rootCategory).length === 0) {
                if(core.indexOf(rootCategory) !== -1){
                    createCategoryContainer(rootCategory, RED._("node-red:palette.label."+rootCategory, {defaultValue:rootCategory}));
                } else {
                    var ns = def.set.id;
                    createCategoryContainer(rootCategory, RED._(ns+":palette.label."+rootCategory, {defaultValue:rootCategory}));
                }
            }
            $("#palette-container-"+rootCategory).show();

            if ($("#palette-"+category).length === 0) {
                $("#palette-base-category-"+rootCategory).append('<div id="palette-'+category+'"></div>');
            }

            $("#palette-"+category).append(d);
            d.onmousedown = function(e) { e.preventDefault(); };

            RED.popover.create({
                target:$(d),
                content: "hi",
                delay: { show: 750, hide: 50 }
            });

            // $(d).popover({
            //     title:d.type,
            //     placement:"right",
            //     trigger: "hover",
            //     delay: { show: 750, hide: 50 },
            //     html: true,
            //     container:'body'
            // });
            $(d).click(function() {
                RED.view.focus();
                var helpText;
                if (nt.indexOf("subflow:") === 0) {
                    helpText = marked(RED.nodes.subflow(nt.substring(8)).info||"");
                } else {
                    helpText = $("script[data-help-name|='"+d.type+"']").html()||"";
                }
                var help = '<div class="node-help">'+helpText+"</div>";
                RED.sidebar.info.set(help);
            });
            var chart = $("#chart");
            var chartOffset = chart.offset();
            var chartSVG = $("#chart>svg").get(0);
            var activeSpliceLink;
            var mouseX;
            var mouseY;
            var spliceTimer;
            $(d).draggable({
                helper: 'clone',
                appendTo: 'body',
                revert: true,
                revertDuration: 50,
                start: function() {RED.view.focus();},
                stop: function() { d3.select('.link_splice').classed('link_splice',false); if (spliceTimer) { clearTimeout(spliceTimer); spliceTimer = null;}},
                drag: function(e,ui) {
                    // TODO: this is the margin-left of palette node. Hard coding
                    // it here makes me sad
                    ui.position.left += 17.5;
                    if (def.inputs > 0 && def.outputs > 0) {
                        mouseX = e.clientX - chartOffset.left+chart.scrollLeft();
                        mouseY = e.clientY-chartOffset.top +chart.scrollTop();

                        if (!spliceTimer) {
                            spliceTimer = setTimeout(function() {
                                var nodes = [];
                                var bestDistance = Infinity;
                                var bestLink = null;
                                if (chartSVG.getIntersectionList) {
                                    var svgRect = chartSVG.createSVGRect();
                                    svgRect.x = mouseX;
                                    svgRect.y = mouseY;
                                    svgRect.width = 1;
                                    svgRect.height = 1;
                                    nodes = chartSVG.getIntersectionList(svgRect,chartSVG);
                                    mouseX /= RED.view.scale();
                                    mouseY /= RED.view.scale();
                                } else {
                                    // Firefox doesn't do getIntersectionList and that
                                    // makes us sad
                                    mouseX /= RED.view.scale();
                                    mouseY /= RED.view.scale();
                                    nodes = RED.view.getLinksAtPoint(mouseX,mouseY);
                                }
                                for (var i=0;i<nodes.length;i++) {
                                    if (d3.select(nodes[i]).classed('link_background')) {
                                        var length = nodes[i].getTotalLength();
                                        for (var j=0;j<length;j+=10) {
                                            var p = nodes[i].getPointAtLength(j);
                                            var d2 = ((p.x-mouseX)*(p.x-mouseX))+((p.y-mouseY)*(p.y-mouseY));
                                            if (d2 < 200 && d2 < bestDistance) {
                                                bestDistance = d2;
                                                bestLink = nodes[i];
                                            }
                                        }
                                    }
                                }
                                if (activeSpliceLink && activeSpliceLink !== bestLink) {
                                    d3.select(activeSpliceLink.parentNode).classed('link_splice',false);
                                }
                                if (bestLink) {
                                    d3.select(bestLink.parentNode).classed('link_splice',true)
                                } else {
                                    d3.select('.link_splice').classed('link_splice',false);
                                }
                                if (activeSpliceLink !== bestLink) {
                                    if (bestLink) {
                                        $(ui.helper).data('splice',d3.select(bestLink).data()[0]);
                                    } else {
                                        $(ui.helper).removeData('splice');
                                    }
                                }
                                activeSpliceLink = bestLink;
                                spliceTimer = null;
                            },200);
                        }
                    }
                }
            });

            var nodeInfo = null;
            if (def.category == "subflows") {
                $(d).dblclick(function(e) {
                    RED.workspaces.show(nt.substring(8));
                    e.preventDefault();
                });
                nodeInfo = marked(def.info||"");
            }
            setLabel(nt,$(d),label,nodeInfo);

            var categoryNode = $("#palette-container-"+category);
            if (categoryNode.find(".palette_node").length === 1) {
                categoryContainers[category].open();
            }

        }
    }

    function removeNodeType(nt) {
        var nodeTypeId = escapeNodeType(nt);
        var paletteNode = $("#palette_node_"+nodeTypeId);
        var categoryNode = paletteNode.closest(".palette-category");
        paletteNode.remove();
        if (categoryNode.find(".palette_node").length === 0) {
            if (categoryNode.find("i").hasClass("expanded")) {
                categoryNode.find(".palette-content").slideToggle();
                categoryNode.find("i").toggleClass("expanded");
            }
        }
    }
    function hideNodeType(nt) {
        var nodeTypeId = escapeNodeType(nt);
        $("#palette_node_"+nodeTypeId).hide();
    }

    function showNodeType(nt) {
        var nodeTypeId = escapeNodeType(nt);
        $("#palette_node_"+nodeTypeId).show();
    }

    function refreshNodeTypes() {
        RED.nodes.eachSubflow(function(sf) {
            var paletteNode = $("#palette_node_subflow_"+sf.id.replace(".","_"));
            var portInput = paletteNode.find(".palette_port_input");
            var portOutput = paletteNode.find(".palette_port_output");

            if (portInput.length === 0 && sf.in.length > 0) {
                var portIn = document.createElement("div");
                portIn.className = "palette_port palette_port_input";
                paletteNode.append(portIn);
            } else if (portInput.length !== 0 && sf.in.length === 0) {
                portInput.remove();
            }

            if (portOutput.length === 0 && sf.out.length > 0) {
                var portOut = document.createElement("div");
                portOut.className = "palette_port palette_port_output";
                paletteNode.append(portOut);
            } else if (portOutput.length !== 0 && sf.out.length === 0) {
                portOutput.remove();
            }
            setLabel(sf.type+":"+sf.id,paletteNode,sf.name,marked(sf.info||""));
        });
    }

    function filterChange() {
        var val = $("#palette-search-input").val();
        if (val === "") {
            $("#palette-search-clear").hide();
        } else {
            $("#palette-search-clear").show();
        }

        var re = new RegExp(val,'i');
        $("#palette-container .palette_node").each(function(i,el) {
            var currentLabel = $(el).find(".palette_label").text();
            if (val === "" || re.test(el.id) || re.test(currentLabel)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        for (var category in categoryContainers) {
            if (categoryContainers.hasOwnProperty(category)) {
                if (categoryContainers[category].container
                        .find(".palette_node")
                        .filter(function() { return $(this).css('display') !== 'none'}).length === 0) {
                    categoryContainers[category].close();
                } else {
                    categoryContainers[category].open();
                }
            }
        }
    }

    function init() {
        $(".palette-spinner").show();
        if (RED.settings.paletteCategories) {
            RED.settings.paletteCategories.forEach(function(category){
                createCategoryContainer(category, RED._("palette.label."+category,{defaultValue:category}));
            });
        } else {
            core.forEach(function(category){
                createCategoryContainer(category, RED._("palette.label."+category,{defaultValue:category}));
            });
        }

        $("#palette-search-input").focus(function(e) {
            RED.keyboard.disable();
        });
        $("#palette-search-input").blur(function(e) {
            RED.keyboard.enable();
        });

        $("#palette-search-clear").on("click",function(e) {
            e.preventDefault();
            $("#palette-search-input").val("");
            filterChange();
            $("#palette-search-input").focus();
        });

        $("#palette-search-input").val("");
        $("#palette-search-input").on("keyup",function() {
            filterChange();
        });

        $("#palette-search-input").on("focus",function() {
            $("body").one("mousedown",function() {
                $("#palette-search-input").blur();
            });
        });

        $("#palette-collapse-all").on("click", function(e) {
            e.preventDefault();
            for (var cat in categoryContainers) {
                if (categoryContainers.hasOwnProperty(cat)) {
                    categoryContainers[cat].close();
                }
            }
        });
        $("#palette-expand-all").on("click", function(e) {
            e.preventDefault();
            for (var cat in categoryContainers) {
                if (categoryContainers.hasOwnProperty(cat)) {
                    categoryContainers[cat].open();
                }
            }
        });
    }

    return {
        init: init,
        add:addNodeType,
        remove:removeNodeType,
        hide:hideNodeType,
        show:showNodeType,
        refresh:refreshNodeTypes
    };
})();
;/**
 * Copyright 2013, 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.sidebar.info = (function() {

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });

    var content = document.createElement("div");
    content.style.paddingTop = "4px";
    content.style.paddingLeft = "4px";
    content.style.paddingRight = "4px";
    content.className = "sidebar-node-info"

    var propertiesExpanded = false;

    function init() {
        RED.sidebar.addTab({
            id: "info",
            label: RED._("sidebar.info.label"),
            name: RED._("sidebar.info.name"),
            content: content
        });

    }

    function show() {
        RED.sidebar.show("info");
    }

    function jsonFilter(key,value) {
        if (key === "") {
            return value;
        }
        var t = typeof value;
        if ($.isArray(value)) {
            return "[array:"+value.length+"]";
        } else if (t === "object") {
            return "[object]"
        } else if (t === "string") {
            if (value.length > 30) {
                return value.substring(0,30)+" ...";
            }
        }
        return value;
    }

    function refresh(node) {
        var table = '<table class="node-info"><tbody>';
        table += '<tr class="blank"><td colspan="2">'+RED._("sidebar.info.node")+'</td></tr>';
        if (node.type != "subflow" && node.name) {
            table += "<tr><td>"+RED._("common.label.name")+"</td><td>&nbsp;"+node.name+"</td></tr>";
        }
        table += "<tr><td>"+RED._("sidebar.info.type")+"</td><td>&nbsp;"+node.type+"</td></tr>";
        table += "<tr><td>"+RED._("sidebar.info.id")+"</td><td>&nbsp;"+node.id+"</td></tr>";

        var m = /^subflow(:(.+))?$/.exec(node.type);
        var subflowNode;
        if (m) {
            if (m[2]) {
                subflowNode = RED.nodes.subflow(m[2]);
            } else {
                subflowNode = node;
            }

            table += '<tr class="blank"><td colspan="2">'+RED._("sidebar.info.subflow")+'</td></tr>';

            var userCount = 0;
            var subflowType = "subflow:"+subflowNode.id;
            RED.nodes.eachNode(function(n) {
                if (n.type === subflowType) {
                    userCount++;
                }
            });
            table += "<tr><td>"+RED._("common.label.name")+"</td><td>"+subflowNode.name+"</td></tr>";
            table += "<tr><td>"+RED._("sidebar.info.instances")+"</td><td>"+userCount+"</td></tr>";
        }

        if (!m && node.type != "subflow" && node.type != "comment") {
            table += '<tr class="blank"><td colspan="2"><a href="#" class="node-info-property-header"><i style="width: 10px; text-align: center;" class="fa fa-caret-'+(propertiesExpanded?"down":"right")+'"></i> '+RED._("sidebar.info.properties")+'</a></td></tr>';
            if (node._def) {
                for (var n in node._def.defaults) {
                    if (n != "name" && node._def.defaults.hasOwnProperty(n)) {
                        var val = node[n]||"";
                        var type = typeof val;
                        if (type === "string") {
                            if (val.length === 0) {
                                val += '<span style="font-style: italic; color: #ccc;">'+RED._("sidebar.info.blank")+'</span>';
                            } else {
                                if (val.length > 30) {
                                    val = val.substring(0,30)+" ...";
                                }
                                val = val.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
                            }
                        } else if (type === "number") {
                            val = val.toString();
                        } else if ($.isArray(val)) {
                            val = "[<br/>";
                            for (var i=0;i<Math.min(node[n].length,10);i++) {
                                var vv = JSON.stringify(node[n][i],jsonFilter," ").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
                                val += "&nbsp;"+i+": "+vv+"<br/>";
                            }
                            if (node[n].length > 10) {
                                val += "&nbsp;... "+RED._("sidebar.info.arrayItems",{count:node[n].length})+"<br/>";
                            }
                            val += "]";
                        } else {
                            val = JSON.stringify(val,jsonFilter," ");
                            val = val.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
                        }

                        table += '<tr class="node-info-property-row'+(propertiesExpanded?"":" hide")+'"><td>'+n+"</td><td>"+val+"</td></tr>";
                    }
                }
            }
        }
        table += "</tbody></table><hr/>";
        if (!subflowNode && node.type != "comment") {
            var helpText = $("script[data-help-name|='"+node.type+"']").html()||"";
            table  += '<div class="node-help">'+helpText+"</div>";
        }
        if (subflowNode) {
            table += '<div class="node-help">'+marked(subflowNode.info||"")+'</div>';
        } else if (node._def && node._def.info) {
            var info = node._def.info;
            table += '<div class="node-help">'+marked(typeof info === "function" ? info.call(node) : info)+'</div>';
            //table += '<div class="node-help">'+(typeof info === "function" ? info.call(node) : info)+'</div>';
        }

        $(content).html(table);

        $(".node-info-property-header").click(function(e) {
            var icon = $(this).find("i");
            if (icon.hasClass("fa-caret-right")) {
                icon.removeClass("fa-caret-right");
                icon.addClass("fa-caret-down");
                $(".node-info-property-row").show();
                propertiesExpanded = true;
            } else {
                icon.addClass("fa-caret-right");
                icon.removeClass("fa-caret-down");
                $(".node-info-property-row").hide();
                propertiesExpanded = false;
            }

            e.preventDefault();
        });
    }

    function clear() {
        $(content).html("");
    }

    function set(html) {
        $(content).html(html);
    }

    RED.events.on("view:selection-changed",function(selection) {
        if (selection.nodes) {
            if (selection.nodes.length == 1) {
                var node = selection.nodes[0];
                if (node.type === "subflow" && node.direction) {
                    refresh(RED.nodes.subflow(node.z));
                } else {
                    refresh(node);
                }
            }
        } else {
            var subflow = RED.nodes.subflow(RED.workspaces.active());
            if (subflow) {
                refresh(subflow);
            } else {
                clear();
            }
        }
    });

    return {
        init: init,
        show: show,
        refresh:refresh,
        clear: clear,
        set: set
    }
})();
;/**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.sidebar.config = (function() {


    var content = document.createElement("div");
    content.className = "sidebar-node-config"

    $('<div class="button-group sidebar-header">'+
      '<a class="sidebar-header-button-toggle selected" id="workspace-config-node-filter-all" href="#"><span data-i18n="sidebar.config.filterAll"></span></a>'+
      '<a class="sidebar-header-button-toggle" id="workspace-config-node-filter-unused" href="#"><span data-i18n="sidebar.config.filterUnused"></span></a> '+
      '</div>'
    ).appendTo(content);


    var toolbar = $('<div>'+
        '<a class="sidebar-footer-button" id="workspace-config-node-collapse-all" href="#"><i class="fa fa-angle-double-up"></i></a> '+
        '<a class="sidebar-footer-button" id="workspace-config-node-expand-all" href="#"><i class="fa fa-angle-double-down"></i></a>'+
        '</div>');

    var globalCategories = $("<div>").appendTo(content);
    var flowCategories = $("<div>").appendTo(content);
    var subflowCategories = $("<div>").appendTo(content);

    var showUnusedOnly = false;

    var categories = {};

    function getOrCreateCategory(name,parent,label) {
        name = name.replace(/\./i,"-");
        if (!categories[name]) {
            var container = $('<div class="palette-category workspace-config-node-category" id="workspace-config-node-category-'+name+'"></div>').appendTo(parent);
            var header = $('<div class="workspace-config-node-tray-header palette-header"><i class="fa fa-angle-down expanded"></i></div>').appendTo(container);
            if (label) {
                $('<span class="config-node-label"/>').text(label).appendTo(header);
            } else {
                $('<span class="config-node-label" data-i18n="sidebar.config.'+name+'">').appendTo(header);
            }
            $('<span class="config-node-filter-info"></span>').appendTo(header);
            category = $('<ul class="palette-content config-node-list"></ul>').appendTo(container);
            container.i18n();
            var icon = header.find("i");
            var result = {
                label: label,
                list: category,
                size: function() {
                    return result.list.find("li:not(.config_node_none)").length
                },
                open: function(snap) {
                    if (!icon.hasClass("expanded")) {
                        icon.addClass("expanded");
                        if (snap) {
                            result.list.show();
                        } else {
                            result.list.slideDown();
                        }
                    }
                },
                close: function(snap) {
                    if (icon.hasClass("expanded")) {
                        icon.removeClass("expanded");
                        if (snap) {
                            result.list.hide();
                        } else {
                            result.list.slideUp();
                        }
                    }
                },
                isOpen: function() {
                    return icon.hasClass("expanded");
                }
            };

            header.on('click', function(e) {
                if (result.isOpen()) {
                    result.close();
                } else {
                    result.open();
                }
            });
            categories[name] = result;
        } else {
            if (categories[name].label !== label) {
                categories[name].list.parent().find('.config-node-label').text(label);
                categories[name].label = label;
            }
        }
        return categories[name];
    }

    function createConfigNodeList(id,nodes) {
        var category = getOrCreateCategory(id.replace(/\./i,"-"))
        var list = category.list;

        nodes.sort(function(A,B) {
            if (A.type < B.type) { return -1;}
            if (A.type > B.type) { return 1;}
            return 0;
        });
        if (showUnusedOnly) {
            var hiddenCount = nodes.length;
            nodes = nodes.filter(function(n) {
                return n.users.length === 0;
            })
            hiddenCount = hiddenCount - nodes.length;
            if (hiddenCount > 0) {
                list.parent().find('.config-node-filter-info').text(RED._('sidebar.config.filtered',{count:hiddenCount})).show();
            } else {
                list.parent().find('.config-node-filter-info').hide();
            }
        } else {
            list.parent().find('.config-node-filter-info').hide();
        }
        list.empty();
        if (nodes.length === 0) {
            $('<li class="config_node_none" data-i18n="sidebar.config.none">NONE</li>').i18n().appendTo(list);
            category.close(true);
        } else {
            var currentType = "";
            nodes.forEach(function(node) {
                var label = "";
                if (typeof node._def.label == "function") {
                    label = node._def.label.call(node);
                } else {
                    label = node._def.label;
                }
                label = label || node.id;
                if (node.type != currentType) {
                    $('<li class="config_node_type">'+node.type+'</li>').appendTo(list);
                    currentType = node.type;
                }

                var entry = $('<li class="palette_node config_node"></li>').appendTo(list);
                $('<div class="palette_label"></div>').text(label).appendTo(entry);

                var iconContainer = $('<div/>',{class:"palette_icon_container  palette_icon_container_right"}).text(node.users.length).appendTo(entry);
                if (node.users.length === 0) {
                    entry.addClass("config_node_unused");
                }
                entry.on('click',function(e) {
                    RED.sidebar.info.refresh(node);
                });
                entry.on('dblclick',function(e) {
                    RED.editor.editConfig("", node.type, node.id);
                });
                var userArray = node.users.map(function(n) { return n.id });
                entry.on('mouseover',function(e) {
                    RED.nodes.eachNode(function(node) {
                        if( userArray.indexOf(node.id) != -1) {
                            node.highlighted = true;
                            node.dirty = true;
                        }
                    });
                    RED.view.redraw();
                });

                entry.on('mouseout',function(e) {
                    RED.nodes.eachNode(function(node) {
                        if(node.highlighted) {
                            node.highlighted = false;
                            node.dirty = true;
                        }
                    });
                    RED.view.redraw();
                });
            });
            category.open(true);
        }
    }

    function refreshConfigNodeList() {
        var validList = {"global":true};

        getOrCreateCategory("global",globalCategories);

        RED.nodes.eachWorkspace(function(ws) {
            validList[ws.id.replace(/\./g,"-")] = true;
            getOrCreateCategory(ws.id,flowCategories,ws.label);
        })
        RED.nodes.eachSubflow(function(sf) {
            validList[sf.id.replace(/\./g,"-")] = true;
            getOrCreateCategory(sf.id,subflowCategories,sf.name);
        })
        $(".workspace-config-node-category").each(function() {
            var id = $(this).attr('id').substring("workspace-config-node-category-".length);
            if (!validList[id]) {
                $(this).remove();
                delete categories[id];
            }
        })
        var globalConfigNodes = [];
        var configList = {};
        RED.nodes.eachConfig(function(cn) {
            if (cn.z) {//} == RED.workspaces.active()) {
                configList[cn.z.replace(/\./g,"-")] = configList[cn.z.replace(/\./g,"-")]||[];
                configList[cn.z.replace(/\./g,"-")].push(cn);
            } else if (!cn.z) {
                globalConfigNodes.push(cn);
            }
        });
        for (var id in validList) {
            if (validList.hasOwnProperty(id)) {
                createConfigNodeList(id,configList[id]||[]);
            }
        }
        createConfigNodeList('global',globalConfigNodes);
    }

    function init() {
        RED.sidebar.addTab({
            id: "config",
            label: RED._("sidebar.config.label"),
            name: RED._("sidebar.config.name"),
            content: content,
            toolbar: toolbar,
            closeable: true,
            visible: false,
            onchange: function() { refreshConfigNodeList(); }
        });

        RED.menu.setAction('menu-item-config-nodes',function() {
            RED.sidebar.show('config');
        })

        $("#workspace-config-node-collapse-all").on("click", function(e) {
            e.preventDefault();
            for (var cat in categories) {
                if (categories.hasOwnProperty(cat)) {
                    categories[cat].close();
                }
            }
        });
        $("#workspace-config-node-expand-all").on("click", function(e) {
            e.preventDefault();
            for (var cat in categories) {
                if (categories.hasOwnProperty(cat)) {
                    if (categories[cat].size() > 0) {
                        categories[cat].open();
                    }
                }
            }
        });
        $('#workspace-config-node-filter-all').on("click",function(e) {
            e.preventDefault();
            if (showUnusedOnly) {
                $(this).addClass('selected');
                $('#workspace-config-node-filter-unused').removeClass('selected');
                showUnusedOnly = !showUnusedOnly;
                refreshConfigNodeList();
            }
        });
        $('#workspace-config-node-filter-unused').on("click",function(e) {
            e.preventDefault();
            if (!showUnusedOnly) {
                $(this).addClass('selected');
                $('#workspace-config-node-filter-all').removeClass('selected');
                showUnusedOnly = !showUnusedOnly;
                refreshConfigNodeList();
            }
        });


    }
    function show(unused) {
        if (unused !== undefined) {
            if (unused) {
                $('#workspace-config-node-filter-unused').click();
            } else {
                $('#workspace-config-node-filter-all').click();
            }
        }
        refreshConfigNodeList();
        RED.sidebar.show("config");
    }
    return {
        init:init,
        show:show,
        refresh:refreshConfigNodeList
    }
})();
;/**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.editor = (function() {
    var editing_node = null;
    var editing_config_node = null;
    var subflowEditor;

    function getCredentialsURL(nodeType, nodeID) {
        var dashedType = nodeType.replace(/\s+/g, '-');
        return  'credentials/' + dashedType + "/" + nodeID;
    }

    /**
     * Validate a node
     * @param node - the node being validated
     * @returns {boolean} whether the node is valid. Sets node.dirty if needed
     */
    function validateNode(node) {
        var oldValue = node.valid;
        var oldChanged = node.changed;
        node.valid = true;
        var subflow;
        var isValid;
        var hasChanged;
        if (node.type.indexOf("subflow:")===0) {
            subflow = RED.nodes.subflow(node.type.substring(8));
            isValid = subflow.valid;
            hasChanged = subflow.changed;
            if (isValid === undefined) {
                isValid = validateNode(subflow);
                hasChanged = subflow.changed;
            }
            node.valid = isValid;
            node.changed = node.changed || hasChanged;
        } else if (node._def) {
            node.valid = validateNodeProperties(node, node._def.defaults, node);
            if (node._def._creds) {
                node.valid = node.valid && validateNodeProperties(node, node._def.credentials, node._def._creds);
            }
        } else if (node.type == "subflow") {
            var subflowNodes = RED.nodes.filterNodes({z:node.id});
            for (var i=0;i<subflowNodes.length;i++) {
                isValid = subflowNodes[i].valid;
                hasChanged = subflowNodes[i].changed;
                if (isValid === undefined) {
                    isValid = validateNode(subflowNodes[i]);
                    hasChanged = subflowNodes[i].changed;
                }
                node.valid = node.valid && isValid;
                node.changed = node.changed || hasChanged;
            }
            var subflowInstances = RED.nodes.filterNodes({type:"subflow:"+node.id});
            var modifiedTabs = {};
            for (i=0;i<subflowInstances.length;i++) {
                subflowInstances[i].valid = node.valid;
                subflowInstances[i].changed = subflowInstances[i].changed || node.changed;
                subflowInstances[i].dirty = true;
                modifiedTabs[subflowInstances[i].z] = true;
            }
            Object.keys(modifiedTabs).forEach(function(id) {
                var subflow = RED.nodes.subflow(id);
                if (subflow) {
                    validateNode(subflow);
                }
            });
        }
        if (oldValue !== node.valid || oldChanged !== node.changed) {
            node.dirty = true;
            subflow = RED.nodes.subflow(node.z);
            if (subflow) {
                validateNode(subflow);
            }
        }
        return node.valid;
    }

    /**
     * Validate a node's properties for the given set of property definitions
     * @param node - the node being validated
     * @param definition - the node property definitions (either def.defaults or def.creds)
     * @param properties - the node property values to validate
     * @returns {boolean} whether the node's properties are valid
     */
    function validateNodeProperties(node, definition, properties) {
        var isValid = true;
        for (var prop in definition) {
            if (definition.hasOwnProperty(prop)) {
                if (!validateNodeProperty(node, definition, prop, properties[prop])) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }

    /**
     * Validate a individual node property
     * @param node - the node being validated
     * @param definition - the node property definitions (either def.defaults or def.creds)
     * @param property - the property name being validated
     * @param value - the property value being validated
     * @returns {boolean} whether the node proprty is valid
     */
    function validateNodeProperty(node,definition,property,value) {
        var valid = true;
        if (/^\$\([a-zA-Z_][a-zA-Z0-9_]*\)$/.test(value)) {
            return true;
        }
        if ("required" in definition[property] && definition[property].required) {
            valid = value !== "";
        }
        if (valid && "validate" in definition[property]) {
            valid = definition[property].validate.call(node,value);
        }
        if (valid && definition[property].type && RED.nodes.getType(definition[property].type) && !("validate" in definition[property])) {
            if (!value || value == "_ADD_") {
                valid = definition[property].hasOwnProperty("required") && !definition[property].required;
            } else {
                var configNode = RED.nodes.node(value);
                valid = (configNode !== null && (configNode.valid == null || configNode.valid));
            }
        }
        return valid;
    }

    /**
     * Called when the node's properties have changed.
     * Marks the node as dirty and needing a size check.
     * Removes any links to non-existant outputs.
     * @param node - the node that has been updated
     * @returns {array} the links that were removed due to this update
     */
    function updateNodeProperties(node) {
        node.resize = true;
        node.dirty = true;
        var removedLinks = [];
        if (node.ports) {
            if (node.outputs < node.ports.length) {
                while (node.outputs < node.ports.length) {
                    node.ports.pop();
                }
                RED.nodes.eachLink(function(l) {
                    if (l.source === node && l.sourcePort >= node.outputs) {
                        removedLinks.push(l);
                    }
                });
            } else if (node.outputs > node.ports.length) {
                while (node.outputs > node.ports.length) {
                    node.ports.push(node.ports.length);
                }
            }
        }
        if (node.inputs === 0) {
            removedLinks.concat(RED.nodes.filterLinks({target:node}));
        }
        for (var l=0;l<removedLinks.length;l++) {
            RED.nodes.removeLink(removedLinks[l]);
        }
        return removedLinks;
    }

    function createDialog(){
        $( "#dialog" ).dialog({
                modal: true,
                autoOpen: false,
                dialogClass: "ui-dialog-no-close",
                closeOnEscape: false,
                minWidth: 500,
                width: 'auto',
                buttons: [
                    {
                        id: "node-dialog-ok",
                        text: RED._("common.label.ok"),
                        click: function() {
                            if (editing_node) {
                                var changes = {};
                                var changed = false;
                                var wasDirty = RED.nodes.dirty();
                                var d;

                                if (editing_node._def.oneditsave) {
                                    var oldValues = {};
                                    for (d in editing_node._def.defaults) {
                                        if (editing_node._def.defaults.hasOwnProperty(d)) {
                                            if (typeof editing_node[d] === "string" || typeof editing_node[d] === "number") {
                                                oldValues[d] = editing_node[d];
                                            } else {
                                                oldValues[d] = $.extend(true,{},{v:editing_node[d]}).v;
                                            }
                                        }
                                    }
                                    var rc = editing_node._def.oneditsave.call(editing_node);
                                    if (rc === true) {
                                        changed = true;
                                    }

                                    for (d in editing_node._def.defaults) {
                                        if (editing_node._def.defaults.hasOwnProperty(d)) {
                                            if (oldValues[d] === null || typeof oldValues[d] === "string" || typeof oldValues[d] === "number") {
                                                if (oldValues[d] !== editing_node[d]) {
                                                    changes[d] = oldValues[d];
                                                    changed = true;
                                                }
                                            } else {
                                                if (JSON.stringify(oldValues[d]) !== JSON.stringify(editing_node[d])) {
                                                    changes[d] = oldValues[d];
                                                    changed = true;
                                                }
                                            }
                                        }
                                    }
                                }

                                if (editing_node._def.defaults) {
                                    for (d in editing_node._def.defaults) {
                                        if (editing_node._def.defaults.hasOwnProperty(d)) {
                                            var input = $("#node-input-"+d);
                                            var newValue;
                                            if (input.attr('type') === "checkbox") {
                                                newValue = input.prop('checked');
                                            } else {
                                                newValue = input.val();
                                            }
                                            if (newValue != null) {
                                                if (d === "outputs" && (newValue.trim() === "" || isNaN(newValue))) {
                                                    continue;
                                                }
                                                if (editing_node[d] != newValue) {
                                                    if (editing_node._def.defaults[d].type) {
                                                        if (newValue == "_ADD_") {
                                                            newValue = "";
                                                        }
                                                        // Change to a related config node
                                                        var configNode = RED.nodes.node(editing_node[d]);
                                                        if (configNode) {
                                                            var users = configNode.users;
                                                            users.splice(users.indexOf(editing_node),1);
                                                        }
                                                        configNode = RED.nodes.node(newValue);
                                                        if (configNode) {
                                                            configNode.users.push(editing_node);
                                                        }
                                                    }
                                                    changes[d] = editing_node[d];
                                                    editing_node[d] = newValue;
                                                    changed = true;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (editing_node._def.credentials) {
                                    var prefix = 'node-input';
                                    var credDefinition = editing_node._def.credentials;
                                    var credsChanged = updateNodeCredentials(editing_node,credDefinition,prefix);
                                    changed = changed || credsChanged;
                                }

                                var removedLinks = updateNodeProperties(editing_node);
                                if (changed) {
                                    var wasChanged = editing_node.changed;
                                    editing_node.changed = true;
                                    RED.nodes.dirty(true);

                                    var activeSubflow = RED.nodes.subflow(RED.workspaces.active());
                                    var subflowInstances = null;
                                    if (activeSubflow) {
                                        subflowInstances = [];
                                        RED.nodes.eachNode(function(n) {
                                            if (n.type == "subflow:"+RED.workspaces.active()) {
                                                subflowInstances.push({
                                                    id:n.id,
                                                    changed:n.changed
                                                });
                                                n.changed = true;
                                                n.dirty = true;
                                                updateNodeProperties(n);
                                            }
                                        });
                                    }
                                    var historyEvent = {
                                        t:'edit',
                                        node:editing_node,
                                        changes:changes,
                                        links:removedLinks,
                                        dirty:wasDirty,
                                        changed:wasChanged
                                    };
                                    if (subflowInstances) {
                                        historyEvent.subflow = {
                                            instances:subflowInstances
                                        }
                                    }
                                    RED.history.push(historyEvent);
                                }
                                editing_node.dirty = true;
                                validateNode(editing_node);
                                RED.view.redraw(true);
                            }
                            $( this ).dialog( "close" );
                        }
                    },
                    {
                        id: "node-dialog-cancel",
                        text: RED._("common.label.cancel"),
                        click: function() {
                            if (editing_node && editing_node._def) {
                                if (editing_node._def.oneditcancel) {
                                    editing_node._def.oneditcancel.call(editing_node);
                                }

                                for (var d in editing_node._def.defaults) {
                                    if (editing_node._def.defaults.hasOwnProperty(d)) {
                                        var def = editing_node._def.defaults[d];
                                        if (def.type) {
                                            var configTypeDef = RED.nodes.getType(def.type);
                                            if (configTypeDef && configTypeDef.exclusive) {
                                                var input = $("#node-input-"+d).val()||"";
                                                if (input !== "" && !editing_node[d]) {
                                                    // This node has an exclusive config node that
                                                    // has just been added. As the user is cancelling
                                                    // the edit, need to delete the just-added config
                                                    // node so that it doesn't get orphaned.
                                                    RED.nodes.remove(input);
                                                }
                                            }
                                        }
                                    }

                                }


                            }
                            $( this ).dialog( "close" );
                        }
                    }
                ],
                resize: function(e,ui) {
                    if (editing_node) {
                        $(this).dialog('option',"sizeCache-"+editing_node.type,ui.size);
                        if (editing_node._def.oneditresize) {
                            var form = $("#dialog-form");
                            editing_node._def.oneditresize.call(editing_node,{width:form.width(),height:form.height()});
                        }
                    }
                },
                open: function(e) {
                    var minWidth = $(this).dialog('option','minWidth');
                    if ($(this).outerWidth() < minWidth) {
                        $(this).dialog('option','width',minWidth);
                    } else {
                        $(this).dialog('option','width',$(this).outerWidth());
                    }
                    RED.keyboard.disable();
                    if (editing_node) {
                        var size = $(this).dialog('option','sizeCache-'+editing_node.type);
                        if (size) {
                            $(this).dialog('option','width',size.width);
                            $(this).dialog('option','height',size.height);
                        }
                        if (editing_node._def.oneditresize) {
                            setTimeout(function() {
                                var form = $("#dialog-form");
                                editing_node._def.oneditresize.call(editing_node,{width:form.width(),height:form.height()});
                            },0);
                        }
                    }
                },
                close: function(e) {
                    RED.keyboard.enable();

                    if (RED.view.state() != RED.state.IMPORT_DRAGGING) {
                        RED.view.state(RED.state.DEFAULT);
                    }
                    $( this ).dialog('option','height','auto');
                    $( this ).dialog('option','width','auto');
                    if (editing_node) {
                        RED.sidebar.info.refresh(editing_node);
                    }
                    RED.workspaces.refresh();

                    var buttons = $( this ).dialog("option","buttons");
                    if (buttons.length == 3) {
                        $( this ).dialog("option","buttons",buttons.splice(1));
                    }
                    editing_node = null;
                }
        }).parent().on('keydown', function(evt) {
            if (evt.keyCode === $.ui.keyCode.ESCAPE && (evt.metaKey || evt.ctrlKey)) {
                $("#node-dialog-cancel").click();
            } else if (evt.keyCode === $.ui.keyCode.ENTER && (evt.metaKey || evt.ctrlKey)) {
                $("#node-dialog-ok").click();
            }
        });
    }

    /**
     * Create a config-node select box for this property
     * @param node - the node being edited
     * @param property - the name of the field
     * @param type - the type of the config-node
     */
    function prepareConfigNodeSelect(node,property,type) {
        var input = $("#node-input-"+property);
        var node_def = RED.nodes.getType(type);

        input.replaceWith('<select style="width: 60%;" id="node-input-'+property+'"></select>');
        updateConfigNodeSelect(property,type,node[property]);
        var select = $("#node-input-"+property);
        select.after(' <a id="node-input-lookup-'+property+'" class="editor-button"><i class="fa fa-pencil"></i></a>');
        $('#node-input-lookup-'+property).click(function(e) {
            showEditConfigNodeDialog(property,type,select.find(":selected").val());
            e.preventDefault();
        });
        var label = "";
        var configNode = RED.nodes.node(node[property]);
        if (configNode && node_def.label) {
            if (typeof node_def.label == "function") {
                label = node_def.label.call(configNode);
            } else {
                label = node_def.label;
            }
        }
        input.val(label);
    }

    /**
     * Create a config-node button for this property
     * @param node - the node being edited
     * @param property - the name of the field
     * @param type - the type of the config-node
     */
    function prepareConfigNodeButton(node,property,type) {
        var input = $("#node-input-"+property);
        input.val(node[property]);
        input.attr("type","hidden");

        var button = $("<a>",{id:"node-input-edit-"+property, class:"editor-button"});
        input.after(button);

        if (node[property]) {
            button.text(RED._("editor.configEdit"));
        } else {
            button.text(RED._("editor.configAdd"));
        }

        button.click(function(e) {
            showEditConfigNodeDialog(property,type,input.val()||"_ADD_");
            e.preventDefault();
        });
    }

    /**
     * Populate the editor dialog input field for this property
     * @param node - the node being edited
     * @param property - the name of the field
     * @param prefix - the prefix to use in the input element ids (node-input|node-config-input)
     */
    function preparePropertyEditor(node,property,prefix) {
        var input = $("#"+prefix+"-"+property);
        if (input.attr('type') === "checkbox") {
            input.prop('checked',node[property]);
        } else {
            var val = node[property];
            if (val == null) {
                val = "";
            }
            input.val(val);
        }
    }

    /**
     * Add an on-change handler to revalidate a node field
     * @param node - the node being edited
     * @param definition - the definition of the node
     * @param property - the name of the field
     * @param prefix - the prefix to use in the input element ids (node-input|node-config-input)
     */
    function attachPropertyChangeHandler(node,definition,property,prefix) {
        $("#"+prefix+"-"+property).change(function() {
            if (!validateNodeProperty(node, definition, property,this.value)) {
                $(this).addClass("input-error");
            } else {
                $(this).removeClass("input-error");
            }
        });
    }

    /**
     * Assign the value to each credential field
     * @param node
     * @param credDef
     * @param credData
     * @param prefix
     */
    function populateCredentialsInputs(node, credDef, credData, prefix) {
        var cred;
        for (cred in credDef) {
            if (credDef.hasOwnProperty(cred)) {
                if (credDef[cred].type == 'password') {
                    if (credData[cred]) {
                        $('#' + prefix + '-' + cred).val(credData[cred]);
                    } else if (credData['has_' + cred]) {
                        $('#' + prefix + '-' + cred).val('__PWRD__');
                    }
                    else {
                        $('#' + prefix + '-' + cred).val('');
                    }
                } else {
                    preparePropertyEditor(credData, cred, prefix);
                }
                attachPropertyChangeHandler(node, credDef, cred, prefix);
            }
        }
        for (cred in credDef) {
            if (credDef.hasOwnProperty(cred)) {
                $("#" + prefix + "-" + cred).change();
            }
        }
    }

    /**
     * Update the node credentials from the edit form
     * @param node - the node containing the credentials
     * @param credDefinition - definition of the credentials
     * @param prefix - prefix of the input fields
     * @return {boolean} whether anything has changed
     */
    function updateNodeCredentials(node, credDefinition, prefix) {
        var changed = false;
        if(!node.credentials) {
            node.credentials = {_:{}};
        }

        for (var cred in credDefinition) {
            if (credDefinition.hasOwnProperty(cred)) {
                var input = $("#" + prefix + '-' + cred);
                var value = input.val();
                if (credDefinition[cred].type == 'password') {
                    node.credentials['has_' + cred] = (value !== "");
                    if (value == '__PWRD__') {
                        continue;
                    }
                    changed = true;

                }
                node.credentials[cred] = value;
                if (value != node.credentials._[cred]) {
                    changed = true;
                }
            }
        }
        return changed;
    }

    /**
     * Prepare all of the editor dialog fields
     * @param node - the node being edited
     * @param definition - the node definition
     * @param prefix - the prefix to use in the input element ids (node-input|node-config-input)
     */
    function prepareEditDialog(node,definition,prefix) {
        for (var d in definition.defaults) {
            if (definition.defaults.hasOwnProperty(d)) {
                if (definition.defaults[d].type) {
                    var configTypeDef = RED.nodes.getType(definition.defaults[d].type);
                    if (configTypeDef) {
                        if (configTypeDef.exclusive) {
                            prepareConfigNodeButton(node,d,definition.defaults[d].type);
                        } else {
                            prepareConfigNodeSelect(node,d,definition.defaults[d].type);
                        }
                    } else {
                        console.log("Unknown type:", definition.defaults[d].type);
                        preparePropertyEditor(node,d,prefix);
                    }
                } else {
                    preparePropertyEditor(node,d,prefix);
                }
                attachPropertyChangeHandler(node,definition.defaults,d,prefix);
            }
        }
        var completePrepare = function() {
            if (definition.oneditprepare) {
                definition.oneditprepare.call(node);
            }
            for (var d in definition.defaults) {
                if (definition.defaults.hasOwnProperty(d)) {
                    $("#"+prefix+"-"+d).change();
                }
            }
        }

        if (definition.credentials) {
            if (node.credentials) {
                populateCredentialsInputs(node, definition.credentials, node.credentials, prefix);
                completePrepare();
            } else {
                $.getJSON(getCredentialsURL(node.type, node.id), function (data) {
                    node.credentials = data;
                    node.credentials._ = $.extend(true,{},data);
                    populateCredentialsInputs(node, definition.credentials, node.credentials, prefix);
                    completePrepare();
                });
            }
        } else {
            completePrepare();
        }
    }

    function showEditDialog(node) {
        editing_node = node;
        RED.view.state(RED.state.EDITING);
        var type = node.type;
        if (node.type.substring(0,8) == "subflow:") {
            type = "subflow";
            var id = editing_node.type.substring(8);
            var buttons = $( "#dialog" ).dialog("option","buttons");
            buttons.unshift({
                class: 'leftButton',
                text: RED._("subflow.edit"),
                click: function() {
                    RED.workspaces.show(id);
                    $("#node-dialog-ok").click();
                }
            });
            $( "#dialog" ).dialog("option","buttons",buttons);
        }
        $("#dialog-form").html($("script[data-template-name='"+type+"']").html());
        var ns;
        if (node._def.set.module === "node-red") {
            ns = "node-red";
        } else {
            ns = node._def.set.id;
        }
        $("#dialog-form").find('[data-i18n]').each(function() {
            var current = $(this).attr("data-i18n");
            var keys = current.split(";");
            for (var i=0;i<keys.length;i++) {
                var key = keys[i];
                if (key.indexOf(":") === -1) {
                    var prefix = "";
                    if (key.indexOf("[")===0) {
                        var parts = key.split("]");
                        prefix = parts[0]+"]";
                        key = parts[1];
                    }
                    keys[i] = prefix+ns+":"+key;
                }
            }
            $(this).attr("data-i18n",keys.join(";"));
        });
        $('<input type="text" style="display: none;" />').appendTo("#dialog-form");
        prepareEditDialog(node,node._def,"node-input");
        $("#dialog").i18n();
        $( "#dialog" ).dialog("option","title","Edit "+type+" node").dialog( "open" );
    }

    function showEditConfigNodeDialog(name,type,id) {
        var adding = (id == "_ADD_");
        var node_def = RED.nodes.getType(type);
        editing_config_node = RED.nodes.node(id);

        var ns;
        if (node_def.set.module === "node-red") {
            ns = "node-red";
        } else {
            ns = node_def.set.id;
        }

        var activeWorkspace = RED.nodes.workspace(RED.workspaces.active());
        if (!activeWorkspace) {
            activeWorkspace = RED.nodes.subflow(RED.workspaces.active());
        }

        if (editing_config_node == null) {
            editing_config_node = {
                id: (1+Math.random()*4294967295).toString(16),
                _def: node_def,
                type: type,
                z: activeWorkspace.id,
                users: []
            }
            for (var d in node_def.defaults) {
                if (node_def.defaults[d].value) {
                    editing_config_node[d] = node_def.defaults[d].value;
                }
            }
            editing_config_node["_"] = node_def._;
        }

        $("#node-config-dialog-edit-form").html($("script[data-template-name='"+type+"']").html());

        $("#dialog-config-form").find('[data-i18n]').each(function() {
            var current = $(this).attr("data-i18n");
            if (current.indexOf(":") === -1) {
                var prefix = "";
                if (current.indexOf("[")===0) {
                    var parts = current.split("]");
                    prefix = parts[0]+"]";
                    current = parts[1];
                }
                $(this).attr("data-i18n",prefix+ns+":"+current);
            }
        });


        prepareEditDialog(editing_config_node,node_def,"node-config-input");

        var buttons = $( "#node-config-dialog" ).dialog("option","buttons");
        if (adding) {
            if (buttons.length == 3) {
                buttons = buttons.splice(1);
            }
            buttons[0].text = "Add";
            $("#node-config-dialog-user-count").find("span").html("").parent().hide();
        } else {
            if (buttons.length == 2) {
                buttons.unshift({
                        class: 'leftButton',
                        text: RED._("editor.configDelete"),
                        click: function() {
                            var configProperty = $(this).dialog('option','node-property');
                            var configId = $(this).dialog('option','node-id');
                            var configType = $(this).dialog('option','node-type');

                            var configTypeDef = RED.nodes.getType(configType);

                            if (configTypeDef.ondelete) {
                                configTypeDef.ondelete.call(editing_config_node);
                            }
                            if (configTypeDef.oneditdelete) {
                                configTypeDef.oneditdelete.call(editing_config_node);
                            }
                            var historyEvent = {
                                t:'delete',
                                nodes:[editing_config_node],
                                changes: {},
                                dirty: RED.nodes.dirty()
                            }
                            RED.nodes.remove(configId);
                            for (var i=0;i<editing_config_node.users.length;i++) {
                                var user = editing_config_node.users[i];
                                historyEvent.changes[user.id] = {
                                    changed: user.changed,
                                    valid: user.valid
                                };
                                for (var d in user._def.defaults) {
                                    if (user._def.defaults.hasOwnProperty(d) && user[d] == configId) {
                                        historyEvent.changes[user.id][d] = configId
                                        user[d] = "";
                                        user.changed = true;
                                        user.dirty = true;
                                    }
                                }
                                validateNode(user);
                            }
                            updateConfigNodeSelect(configProperty,configType,"");
                            RED.nodes.dirty(true);
                            $( this ).dialog( "close" );
                            RED.view.redraw();
                            RED.history.push(historyEvent);
                        }
                });
            }
            buttons[1].text = "Update";
            $("#node-config-dialog-user-count").find("span").html(RED._("editor.nodesUse", {count:editing_config_node.users.length})).parent().show();
        }

        if (editing_config_node._def.exclusive) {
            $("#node-config-dialog-scope").hide();
        } else {
            $("#node-config-dialog-scope").show();
        }
        $("#node-config-dialog-scope-warning").hide();


        var nodeUserFlows = {};
        editing_config_node.users.forEach(function(n) {
            nodeUserFlows[n.z] = true;
        });
        var flowCount = Object.keys(nodeUserFlows).length;

        var tabSelect = $("#node-config-dialog-scope").empty();
        tabSelect.off("change");
        tabSelect.append('<option value=""'+(!editing_config_node.z?" selected":"")+' data-i18n="sidebar.config.global"></option>');
        tabSelect.append('<option disabled data-i18n="sidebar.config.flows"></option>');
        RED.nodes.eachWorkspace(function(ws) {
            var workspaceLabel = ws.label;
            if (nodeUserFlows[ws.id]) {
                workspaceLabel = "* "+workspaceLabel;
            }
            tabSelect.append('<option value="'+ws.id+'"'+(ws.id==editing_config_node.z?" selected":"")+'>'+workspaceLabel+'</option>');
        });
        tabSelect.append('<option disabled data-i18n="sidebar.config.subflows"></option>');
        RED.nodes.eachSubflow(function(ws) {
            var workspaceLabel = ws.name;
            if (nodeUserFlows[ws.id]) {
                workspaceLabel = "* "+workspaceLabel;
            }
            tabSelect.append('<option value="'+ws.id+'"'+(ws.id==editing_config_node.z?" selected":"")+'>'+workspaceLabel+'</option>');
        });
        if (flowCount > 0) {
            tabSelect.on('change',function() {
                var newScope = $(this).val();
                if (newScope === '') {
                    // global scope - everyone can use it
                    $("#node-config-dialog-scope-warning").hide();
                } else if (!nodeUserFlows[newScope] || flowCount > 1) {
                    // a user will loose access to it
                    $("#node-config-dialog-scope-warning").show();
                } else {
                    $("#node-config-dialog-scope-warning").hide();
                }
            });
        }

        //tabSelect.append('<option value="'+activeWorkspace.id+'"'+(activeWorkspace.id==configNode.z?" selected":"")+'>'+workspaceLabel+'</option>');
        tabSelect.i18n();

        $( "#node-config-dialog" ).dialog("option","buttons",buttons);

        $("#node-config-dialog").i18n();

        $( "#node-config-dialog" )
            .dialog("option","node-adding",adding)
            .dialog("option","node-property",name)
            .dialog("option","node-id",editing_config_node.id)
            .dialog("option","node-type",type)
            .dialog("option","title",(adding?RED._("editor.addNewConfig", {type:type}):RED._("editor.editConfig", {type:type})))
            .dialog( "open" );
    }

    function updateConfigNodeSelect(name,type,value) {
        var button = $("#node-input-edit-"+name);
        if (button.length) {
            if (value) {
                button.text(RED._("editor.configEdit"));
            } else {
                button.text(RED._("editor.configAdd"));
            }
            $("#node-input-"+name).val(value);
        } else {

            var select = $("#node-input-"+name);
            var node_def = RED.nodes.getType(type);
            select.children().remove();

            var activeWorkspace = RED.nodes.workspace(RED.workspaces.active());
            if (!activeWorkspace) {
                activeWorkspace = RED.nodes.subflow(RED.workspaces.active());
            }

            var configNodes = [];

            RED.nodes.eachConfig(function(config) {
                if (config.type == type && (!config.z || config.z === activeWorkspace.id)) {
                    var label = "";
                    if (typeof node_def.label == "function") {
                        label = node_def.label.call(config);
                    } else {
                        label = node_def.label;
                    }
                    configNodes.push({id:config.id,label:label});
                }
            });

            configNodes.sort(function(A,B) {
                if (A.label < B.label) {
                    return -1;
                } else if (A.label > B.label) {
                    return 1;
                }
                return 0;
            });

            configNodes.forEach(function(cn) {
                select.append('<option value="'+cn.id+'"'+(value==cn.id?" selected":"")+'>'+cn.label+'</option>');
            });

            select.append('<option value="_ADD_"'+(value===""?" selected":"")+'>'+RED._("editor.addNewType", {type:type})+'</option>');
            window.setTimeout(function() { select.change();},50);
        }
    }

    function createNodeConfigDialog(){
        $( "#node-config-dialog" ).dialog({
                modal: true,
                autoOpen: false,
                dialogClass: "ui-dialog-no-close",
                minWidth: 500,
                width: 'auto',
                closeOnEscape: false,
                buttons: [
                    {
                        id: "node-config-dialog-ok",
                        text: RED._("common.label.ok"),
                        click: function() {
                            var configProperty = $(this).dialog('option','node-property');
                            var configId = $(this).dialog('option','node-id');
                            var configType = $(this).dialog('option','node-type');
                            var configAdding = $(this).dialog('option','node-adding');
                            var configTypeDef = RED.nodes.getType(configType);
                            var d;
                            var input;
                            var scope = $("#node-config-dialog-scope").val();
                            for (d in configTypeDef.defaults) {
                                if (configTypeDef.defaults.hasOwnProperty(d)) {
                                    input = $("#node-config-input-"+d);
                                    if (input.attr('type') === "checkbox") {
                                      editing_config_node[d] = input.prop('checked');
                                    } else {
                                      editing_config_node[d] = input.val();
                                    }
                                }
                            }
                            editing_config_node.label = configTypeDef.label;
                            editing_config_node.z = scope;

                            if (scope) {
                                editing_config_node.users = editing_config_node.users.filter(function(n) {
                                    var keep = true;
                                    for (var d in n._def.defaults) {
                                        if (n._def.defaults.hasOwnProperty(d)) {
                                            if (n._def.defaults[d].type === editing_config_node.type &&
                                                n[d] === editing_config_node.id &&
                                                n.z !== scope) {
                                                    keep = false;
                                                    n[d] = null;
                                                    n.dirty = true;
                                                    n.changed = true;
                                                    validateNode(n);
                                            }
                                        }
                                    }
                                    return keep;
                                });
                            }

                            if (configAdding) {
                                RED.nodes.add(editing_config_node);
                            }

                            if (configTypeDef.oneditsave) {
                                configTypeDef.oneditsave.call(editing_config_node);
                            }
                            if (configTypeDef.credentials) {
                                updateNodeCredentials(editing_config_node,configTypeDef.credentials,"node-config-input");
                            }
                            validateNode(editing_config_node);
                            for (var i=0;i<editing_config_node.users.length;i++) {
                                var user = editing_config_node.users[i];
                                validateNode(user);
                            }

                            updateConfigNodeSelect(configProperty,configType,editing_config_node.id);

                            RED.nodes.dirty(true);
                            RED.view.redraw(true);
                            $(this).dialog("close");

                        }
                    },
                    {
                        id: "node-config-dialog-cancel",
                        text: RED._("common.label.cancel"),
                        click: function() {
                            var configType = $(this).dialog('option','node-type');
                            var configId = $(this).dialog('option','node-id');
                            var configAdding = $(this).dialog('option','node-adding');
                            var configTypeDef = RED.nodes.getType(configType);

                            if (configTypeDef.oneditcancel) {
                                // TODO: what to pass as this to call
                                if (configTypeDef.oneditcancel) {
                                    var cn = RED.nodes.node(configId);
                                    if (cn) {
                                        configTypeDef.oneditcancel.call(cn,false);
                                    } else {
                                        configTypeDef.oneditcancel.call({id:configId},true);
                                    }
                                }
                            }
                            $( this ).dialog( "close" );
                        }
                    }
                ],
                resize: function(e,ui) {
                },
                open: function(e) {
                    var minWidth = $(this).dialog('option','minWidth');
                    if ($(this).outerWidth() < minWidth) {
                        $(this).dialog('option','width',minWidth);
                    }
                    if (RED.view.state() != RED.state.EDITING) {
                        RED.keyboard.disable();
                    }
                },
                close: function(e) {
                    $(this).dialog('option','width','auto');
                    $(this).dialog('option','height','auto');
                    $("#node-config-dialog-edit-form").html("");
                    if (RED.view.state() != RED.state.EDITING) {
                        RED.keyboard.enable();
                    }
                    RED.workspaces.refresh();
                },
                create: function() {
                    $("#node-config-dialog").parent().find("div.ui-dialog-buttonpane")
                        .prepend('<div id="node-config-dialog-user-count"><i class="fa fa-info-circle"></i> <span></span></div>');

                    $("#node-config-dialog").parent().find('.ui-dialog-titlebar').append('<span id="node-config-dialog-scope-container"><span id="node-config-dialog-scope-warning" data-i18n="[title]editor.errors.scopeChange"><i class="fa fa-warning"></i></span><select id="node-config-dialog-scope"></select></span>');
                    $("#node-config-dialog").parent().draggable({
                        cancel: '.ui-dialog-content, .ui-dialog-titlebar-close, #node-config-dialog-scope-container'
                    });
                }
        }).parent().on('keydown', function(evt) {
            if (evt.keyCode === $.ui.keyCode.ESCAPE && (evt.metaKey || evt.ctrlKey)) {
                $("#node-config-dialog-cancel").click();
            } else if (evt.keyCode === $.ui.keyCode.ENTER && (evt.metaKey || evt.ctrlKey)) {
                $("#node-config-dialog-ok").click();
            }
        });
    }

    function createSubflowDialog(){
        $( "#subflow-dialog" ).dialog({
            modal: true,
            autoOpen: false,
            dialogClass: "ui-dialog-no-close",
            closeOnEscape: false,
            minWidth: 500,
            width: 'auto',
            buttons: [
                {
                    id: "subflow-dialog-ok",
                    text: RED._("common.label.ok"),
                    click: function() {
                        if (editing_node) {
                            var i;
                            var changes = {};
                            var changed = false;
                            var wasDirty = RED.nodes.dirty();

                            var newName = $("#subflow-input-name").val();

                            if (newName != editing_node.name) {
                                changes['name'] = editing_node.name;
                                editing_node.name = newName;
                                changed = true;
                                $("#menu-item-workspace-menu-"+editing_node.id.replace(".","-")).text(newName);
                            }

                            var newDescription = subflowEditor.getValue();

                            if (newDescription != editing_node.info) {
                                changes['info'] = editing_node.info;
                                editing_node.info = newDescription;
                                changed = true;
                            }

                            RED.palette.refresh();

                            if (changed) {
                                var subflowInstances = [];
                                RED.nodes.eachNode(function(n) {
                                    if (n.type == "subflow:"+editing_node.id) {
                                        subflowInstances.push({
                                            id:n.id,
                                            changed:n.changed
                                        })
                                        n.changed = true;
                                        n.dirty = true;
                                        updateNodeProperties(n);
                                    }
                                });
                                var wasChanged = editing_node.changed;
                                editing_node.changed = true;
                                RED.nodes.dirty(true);
                                var historyEvent = {
                                    t:'edit',
                                    node:editing_node,
                                    changes:changes,
                                    dirty:wasDirty,
                                    changed:wasChanged,
                                    subflow: {
                                        instances:subflowInstances
                                    }
                                };

                                RED.history.push(historyEvent);
                            }
                            editing_node.dirty = true;
                            RED.view.redraw(true);
                        }
                        $( this ).dialog( "close" );
                    }
                },
                {
                    id: "subflow-dialog-cancel",
                    text: RED._("common.label.cancel"),
                    click: function() {
                        $( this ).dialog( "close" );
                        editing_node = null;
                    }
                }
            ],
            create: function(e) {
                $("#subflow-dialog form" ).submit(function(e) { e.preventDefault();});
                subflowEditor = RED.editor.createEditor({
                    id: 'subflow-input-info-editor',
                    mode: 'ace/mode/markdown',
                    value: ""
                });
            },
            open: function(e) {
                RED.keyboard.disable();
                var minWidth = $(this).dialog('option','minWidth');
                if ($(this).outerWidth() < minWidth) {
                    $(this).dialog('option','width',minWidth);
                }
            },
            close: function(e) {
                RED.keyboard.enable();

                if (RED.view.state() != RED.state.IMPORT_DRAGGING) {
                    RED.view.state(RED.state.DEFAULT);
                }
                RED.sidebar.info.refresh(editing_node);
                RED.workspaces.refresh();
                editing_node = null;
            },
            resize: function(e) {
                var rows = $("#subflow-dialog>form>div:not(.node-text-editor-row)");
                var editorRow = $("#subflow-dialog>form>div.node-text-editor-row");
                var height = $("#subflow-dialog").height();
                for (var i=0;i<rows.size();i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                height -= (parseInt($("#subflow-dialog>form").css("marginTop"))+parseInt($("#subflow-dialog>form").css("marginBottom")));
                $(".node-text-editor").css("height",height+"px");
                subflowEditor.resize();
            }
        }).parent().on('keydown', function(evt) {
            if (evt.keyCode === $.ui.keyCode.ESCAPE && (evt.metaKey || evt.ctrlKey)) {
                $("#subflow-dialog-cancel").click();
            } else if (evt.keyCode === $.ui.keyCode.ENTER && (evt.metaKey || evt.ctrlKey)) {
                $("#subflow-dialog-ok").click();
            }
        });
    }


    function showEditSubflowDialog(subflow) {
        editing_node = subflow;
        RED.view.state(RED.state.EDITING);

        $("#subflow-input-name").val(subflow.name);
        subflowEditor.getSession().setValue(subflow.info,-1);
        var userCount = 0;
        var subflowType = "subflow:"+editing_node.id;

        RED.nodes.eachNode(function(n) {
            if (n.type === subflowType) {
                userCount++;
            }
        });

        $("#subflow-dialog-user-count").html(RED._("subflow.subflowInstances", {count:userCount})).show();
        $("#subflow-dialog").dialog("option","title",RED._("subflow.editSubflow",{name:subflow.name})).dialog( "open" );
    }



    return {
        init: function(){
            createDialog();
            createNodeConfigDialog();
            createSubflowDialog();
        },
        edit: showEditDialog,
        editConfig: showEditConfigNodeDialog,
        editSubflow: showEditSubflowDialog,
        validateNode: validateNode,
        updateNodeProperties: updateNodeProperties, // TODO: only exposed for edit-undo

        createEditor: function(options) {
            var editor = ace.edit(options.id);
            editor.setTheme("ace/theme/tomorrow");
            var session = editor.getSession();
            if (options.mode) {
                session.setMode(options.mode);
            }
            if (options.foldStyle) {
                session.setFoldStyle(options.foldStyle);
            } else {
                session.setFoldStyle('markbeginend');
            }
            if (options.options) {
                editor.setOptions(options.options);
            } else {
                editor.setOptions({
                    enableBasicAutocompletion:true,
                    enableSnippets:true
                });
            }
            editor.$blockScrolling = Infinity;
            if (options.value) {
                session.setValue(options.value,-1);
            }
            return editor;
        }
    }
})();
;/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/


RED.clipboard = (function() {

    var dialog;
    var dialogContainer;
    var exportNodesDialog;
    var importNodesDialog;

    function setupDialogs() {
        dialog = $('<div id="clipboard-dialog" class="hide"><form class="dialog-form form-horizontal"></form></div>')
            .appendTo("body")
            .dialog({
                modal: true,
                autoOpen: false,
                width: 500,
                resizable: false,
                buttons: [
                    {
                        id: "clipboard-dialog-ok",
                        text: RED._("common.label.ok"),
                        click: function() {
                            RED.view.importNodes($("#clipboard-import").val());
                            $( this ).dialog( "close" );
                        }
                    },
                    {
                        id: "clipboard-dialog-cancel",
                        text: RED._("common.label.cancel"),
                        click: function() {
                            $( this ).dialog( "close" );
                        }
                    },
                    {
                        id: "clipboard-dialog-close",
                        text: RED._("common.label.close"),
                        click: function() {
                            $( this ).dialog( "close" );
                        }
                    }
                ],
                open: function(e) {
                    $(this).parent().find(".ui-dialog-titlebar-close").hide();
                    RED.keyboard.disable();
                },
                close: function(e) {
                    RED.keyboard.enable();
                }
            });

        dialogContainer = dialog.children(".dialog-form");

        exportNodesDialog = '<div class="form-row">'+
            '<label for="node-input-export" style="display: block; width:100%;"><i class="fa fa-clipboard"></i> '+RED._("clipboard.nodes")+'</label>'+
            '<textarea readonly style="resize: none; width: 100%; border-radius: 0px;font-family: monospace; font-size: 12px; background:#eee; padding-left: 0.5em; box-sizing:border-box;" id="clipboard-export" rows="5"></textarea>'+
            '</div>'+
            '<div class="form-tips">'+
            RED._("clipboard.selectNodes")+
            '</div>';

        importNodesDialog = '<div class="form-row">'+
            '<textarea style="resize: none; width: 100%; border-radius: 0px;font-family: monospace; font-size: 12px; background:#eee; padding-left: 0.5em; box-sizing:border-box;" id="clipboard-import" rows="5" placeholder="'+
            RED._("clipboard.pasteNodes")+
            '"></textarea>'+
            '</div>';
    }

    function validateImport() {
        var importInput = $("#clipboard-import");
        var v = importInput.val();
        v = v.substring(v.indexOf('['),v.lastIndexOf(']')+1);
        try {
            JSON.parse(v);
            importInput.removeClass("input-error");
            importInput.val(v);
            $("#clipboard-dialog-ok").button("enable");
        } catch(err) {
            if (v !== "") {
                importInput.addClass("input-error");
            }
            $("#clipboard-dialog-ok").button("disable");
        }
    }

    function importNodes() {
        dialogContainer.empty();
        dialogContainer.append($(importNodesDialog));
        $("#clipboard-dialog-ok").show();
        $("#clipboard-dialog-cancel").show();
        $("#clipboard-dialog-close").hide();
        $("#clipboard-dialog-ok").button("disable");
        $("#clipboard-import").keyup(validateImport);
        $("#clipboard-import").on('paste',function() { setTimeout(validateImport,10)});

        dialog.dialog("option","title",RED._("clipboard.importNodes")).dialog("open");
    }

    function exportNodes() {
        dialogContainer.empty();
        dialogContainer.append($(exportNodesDialog));
        $("#clipboard-dialog-ok").hide();
        $("#clipboard-dialog-cancel").hide();
        $("#clipboard-dialog-close").show();
        var selection = RED.view.selection();
        if (selection.nodes) {
            var nns = RED.nodes.createExportableNodeSet(selection.nodes);
            $("#clipboard-export")
                .val(JSON.stringify(nns))
                .focus(function() {
                    var textarea = $(this);
                    textarea.select();
                    textarea.mouseup(function() {
                        textarea.unbind("mouseup");
                        return false;
                    })
                });
            dialog.dialog("option","title",RED._("clipboard.exportNodes")).dialog( "open" );
        }
    }

    function hideDropTarget() {
        $("#dropTarget").hide();
        RED.keyboard.remove(/* ESCAPE */ 27);
    }

    return {
        init: function() {
            setupDialogs();
            RED.events.on("view:selection-changed",function(selection) {
                if (!selection.nodes) {
                    RED.menu.setDisabled("menu-item-export",true);
                    RED.menu.setDisabled("menu-item-export-clipboard",true);
                    RED.menu.setDisabled("menu-item-export-library",true);
                } else {
                    RED.menu.setDisabled("menu-item-export",false);
                    RED.menu.setDisabled("menu-item-export-clipboard",false);
                    RED.menu.setDisabled("menu-item-export-library",false);
                }
            });
            RED.keyboard.add(/* e */ 69,{ctrl:true},function(){exportNodes();d3.event.preventDefault();});
            RED.keyboard.add(/* i */ 73,{ctrl:true},function(){importNodes();d3.event.preventDefault();});

            $('#chart').on("dragenter",function(event) {
                if ($.inArray("text/plain",event.originalEvent.dataTransfer.types) != -1) {
                    $("#dropTarget").css({display:'table'});
                    RED.keyboard.add(/* ESCAPE */ 27,hideDropTarget);
                }
            });

            $('#dropTarget').on("dragover",function(event) {
                if ($.inArray("text/plain",event.originalEvent.dataTransfer.types) != -1) {
                    event.preventDefault();
                }
            })
            .on("dragleave",function(event) {
                hideDropTarget();
            })
            .on("drop",function(event) {
                var data = event.originalEvent.dataTransfer.getData("text/plain");
                hideDropTarget();
                data = data.substring(data.indexOf('['),data.lastIndexOf(']')+1);
                RED.view.importNodes(data);
                event.preventDefault();
            });

        },
        import: importNodes,
        export: exportNodes
    }
})();
;/**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.library = (function() {


    var exportToLibraryDialog;

    function loadFlowLibrary() {
        $.getJSON("library/flows",function(data) {
            //console.log(data);

            var buildMenu = function(data,root) {
                var i;
                var li;
                var a;
                var ul = document.createElement("ul");
                if (root === "") {
                    ul.id = "menu-item-import-library-submenu";
                }
                ul.className = "dropdown-menu";
                if (data.d) {
                    for (i in data.d) {
                        if (data.d.hasOwnProperty(i)) {
                            li = document.createElement("li");
                            li.className = "dropdown-submenu pull-left";
                            a = document.createElement("a");
                            a.href="#";
                            var label = i.replace(/^node-red-contrib-/,"").replace(/^node-red-node-/,"").replace(/-/," ").replace(/_/," ");
                            a.innerHTML = label;
                            li.appendChild(a);
                            li.appendChild(buildMenu(data.d[i],root+(root!==""?"/":"")+i));
                            ul.appendChild(li);
                        }
                    }
                }
                if (data.f) {
                    for (i in data.f) {
                        if (data.f.hasOwnProperty(i)) {
                            li = document.createElement("li");
                            a = document.createElement("a");
                            a.href="#";
                            a.innerHTML = data.f[i];
                            a.flowName = root+(root!==""?"/":"")+data.f[i];
                            a.onclick = function() {
                                $.get('library/flows/'+this.flowName, function(data) {
                                    RED.view.importNodes(data);
                                });
                            };
                            li.appendChild(a);
                            ul.appendChild(li);
                        }
                    }
                }
                return ul;
            };
            var examples;
            if (data.d && data.d._examples_) {
                examples = data.d._examples_;
                delete data.d._examples_;
            }
            var menu = buildMenu(data,"");
            $("#menu-item-import-examples").remove();
            if (examples) {
                RED.menu.addItem("menu-item-import",{id:"menu-item-import-examples",label:RED._("menu.label.examples"),options:[]})
                $("#menu-item-import-examples-submenu").replaceWith(buildMenu(examples,"_examples_"));
            }
            //TODO: need an api in RED.menu for this
            $("#menu-item-import-library-submenu").replaceWith(menu);
        });
    }

    function createUI(options) {
        var libraryData = {};
        var selectedLibraryItem = null;
        var libraryEditor = null;

        // Orion editor has set/getText
        // ACE editor has set/getValue
        // normalise to set/getValue
        if (options.editor.setText) {
            // Orion doesn't like having pos passed in, so proxy the call to drop it
            options.editor.setValue = function(text,pos) {
                options.editor.setText.call(options.editor,text);
            }
        }
        if (options.editor.getText) {
            options.editor.getValue = options.editor.getText;
        }

        function buildFileListItem(item) {
            var li = document.createElement("li");
            li.onmouseover = function(e) { $(this).addClass("list-hover"); };
            li.onmouseout = function(e) { $(this).removeClass("list-hover"); };
            return li;
        }

        function buildFileList(root,data) {
            var ul = document.createElement("ul");
            var li;
            for (var i=0;i<data.length;i++) {
                var v = data[i];
                if (typeof v === "string") {
                    // directory
                    li = buildFileListItem(v);
                    li.onclick = (function () {
                        var dirName = v;
                        return function(e) {
                            var bcli = $('<li class="active"><span class="divider">/</span> <a href="#">'+dirName+'</a></li>');
                            $("a",bcli).click(function(e) {
                                $(this).parent().nextAll().remove();
                                $.getJSON("library/"+options.url+root+dirName,function(data) {
                                    $("#node-select-library").children().first().replaceWith(buildFileList(root+dirName+"/",data));
                                });
                                e.stopPropagation();
                            });
                            var bc = $("#node-dialog-library-breadcrumbs");
                            $(".active",bc).removeClass("active");
                            bc.append(bcli);
                            $.getJSON("library/"+options.url+root+dirName,function(data) {
                                $("#node-select-library").children().first().replaceWith(buildFileList(root+dirName+"/",data));
                            });
                        }
                    })();
                    li.innerHTML = '<i class="fa fa-folder"></i> '+v+"</i>";
                    ul.appendChild(li);
                } else {
                    // file
                    li = buildFileListItem(v);
                    li.innerHTML = v.name;
                    li.onclick = (function() {
                        var item = v;
                        return function(e) {
                            $(".list-selected",ul).removeClass("list-selected");
                            $(this).addClass("list-selected");
                            $.get("library/"+options.url+root+item.fn, function(data) {
                                selectedLibraryItem = item;
                                libraryEditor.setValue(data,-1);
                            });
                        }
                    })();
                    ul.appendChild(li);
                }
            }
            return ul;
        }

        $('#node-input-name').css("width","60%").after(
            '<div class="btn-group" style="margin-left: 5px;">'+
            '<a id="node-input-'+options.type+'-lookup" class="editor-button" data-toggle="dropdown"><i class="fa fa-book"></i> <i class="fa fa-caret-down"></i></a>'+
            '<ul class="dropdown-menu pull-right" role="menu">'+
            '<li><a id="node-input-'+options.type+'-menu-open-library" tabindex="-1" href="#">'+RED._("library.openLibrary")+'</a></li>'+
            '<li><a id="node-input-'+options.type+'-menu-save-library" tabindex="-1" href="#">'+RED._("library.saveToLibrary")+'</a></li>'+
            '</ul></div>'
        );



        $('#node-input-'+options.type+'-menu-open-library').click(function(e) {
            $("#node-select-library").children().remove();
            var bc = $("#node-dialog-library-breadcrumbs");
            bc.children().first().nextAll().remove();
            libraryEditor.setValue('',-1);

            $.getJSON("library/"+options.url,function(data) {
                $("#node-select-library").append(buildFileList("/",data));
                $("#node-dialog-library-breadcrumbs a").click(function(e) {
                    $(this).parent().nextAll().remove();
                    $("#node-select-library").children().first().replaceWith(buildFileList("/",data));
                    e.stopPropagation();
                });
                $( "#node-dialog-library-lookup" ).dialog( "open" );
            });

            e.preventDefault();
        });

        $('#node-input-'+options.type+'-menu-save-library').click(function(e) {
            //var found = false;
            var name = $("#node-input-name").val().replace(/(^\s*)|(\s*$)/g,"");

            //var buildPathList = function(data,root) {
            //    var paths = [];
            //    if (data.d) {
            //        for (var i in data.d) {
            //            var dn = root+(root==""?"":"/")+i;
            //            var d = {
            //                label:dn,
            //                files:[]
            //            };
            //            for (var f in data.d[i].f) {
            //                d.files.push(data.d[i].f[f].fn.split("/").slice(-1)[0]);
            //            }
            //            paths.push(d);
            //            paths = paths.concat(buildPathList(data.d[i],root+(root==""?"":"/")+i));
            //        }
            //    }
            //    return paths;
            //};
            $("#node-dialog-library-save-folder").attr("value","");

            var filename = name.replace(/[^\w-]/g,"-");
            if (filename === "") {
                filename = "unnamed-"+options.type;
            }
            $("#node-dialog-library-save-filename").attr("value",filename+".js");

            //var paths = buildPathList(libraryData,"");
            //$("#node-dialog-library-save-folder").autocomplete({
            //        minLength: 0,
            //        source: paths,
            //        select: function( event, ui ) {
            //            $("#node-dialog-library-save-filename").autocomplete({
            //                    minLength: 0,
            //                    source: ui.item.files
            //            });
            //        }
            //});

            $( "#node-dialog-library-save" ).dialog( "open" );
            e.preventDefault();
        });

        libraryEditor = ace.edit('node-select-library-text');
        libraryEditor.setTheme("ace/theme/tomorrow");
        if (options.mode) {
            libraryEditor.getSession().setMode(options.mode);
        }
        libraryEditor.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false
        });
        libraryEditor.renderer.$cursorLayer.element.style.opacity=0;
        libraryEditor.$blockScrolling = Infinity;

        $( "#node-dialog-library-lookup" ).dialog({
            title: RED._("library.typeLibrary", {type:options.type}),
            modal: true,
            autoOpen: false,
            width: 800,
            height: 450,
            buttons: [
                {
                    text: RED._("common.label.ok"),
                    click: function() {
                        if (selectedLibraryItem) {
                            for (var i=0;i<options.fields.length;i++) {
                                var field = options.fields[i];
                                $("#node-input-"+field).val(selectedLibraryItem[field]);
                            }
                            options.editor.setValue(libraryEditor.getValue(),-1);
                        }
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: RED._("common.label.cancel"),
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ],
            open: function(e) {
                var form = $("form",this);
                form.height(form.parent().height()-30);
                $("#node-select-library-text").height("100%");
                $(".form-row:last-child",form).children().height(form.height()-60);
            },
            resize: function(e) {
                var form = $("form",this);
                form.height(form.parent().height()-30);
                $(".form-row:last-child",form).children().height(form.height()-60);
            }
        });

        function saveToLibrary(overwrite) {
            var name = $("#node-input-name").val().replace(/(^\s*)|(\s*$)/g,"");
            if (name === "") {
                name = RED._("library.unnamedType",{type:options.type});
            }
            var filename = $("#node-dialog-library-save-filename").val().replace(/(^\s*)|(\s*$)/g,"");
            var pathname = $("#node-dialog-library-save-folder").val().replace(/(^\s*)|(\s*$)/g,"");
            if (filename === "" || !/.+\.js$/.test(filename)) {
                RED.notify(RED._("library.invalidFilename"),"warning");
                return;
            }
            var fullpath = pathname+(pathname===""?"":"/")+filename;
            if (!overwrite) {
                //var pathnameParts = pathname.split("/");
                //var exists = false;
                //var ds = libraryData;
                //for (var pnp in pathnameParts) {
                //    if (ds.d && pathnameParts[pnp] in ds.d) {
                //        ds = ds.d[pathnameParts[pnp]];
                //    } else {
                //        ds = null;
                //        break;
                //    }
                //}
                //if (ds && ds.f) {
                //    for (var f in ds.f) {
                //        if (ds.f[f].fn == fullpath) {
                //            exists = true;
                //            break;
                //        }
                //    }
                //}
                //if (exists) {
                //    $("#node-dialog-library-save-content").html(RED._("library.dialogSaveOverwrite",{libraryType:options.type,libraryName:fullpath}));
                //    $("#node-dialog-library-save-confirm").dialog( "open" );
                //    return;
                //}
            }
            var queryArgs = [];
            var data = {};
            for (var i=0;i<options.fields.length;i++) {
                var field = options.fields[i];
                if (field == "name") {
                    data.name = name;
                } else {
                    data[field] = $("#node-input-"+field).val();
                }
            }

            data.text = options.editor.getValue();
            $.ajax({
                url:"library/"+options.url+'/'+fullpath,
                type: "POST",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8"
            }).done(function(data,textStatus,xhr) {
                RED.notify(RED._("library.savedType", {type:options.type}),"success");
            }).fail(function(xhr,textStatus,err) {
                RED.notify(RED._("library.saveFailed",{message:xhr.responseText}),"error");
            });
        }
        $( "#node-dialog-library-save-confirm" ).dialog({
            title: RED._("library.saveToLibrary"),
            modal: true,
            autoOpen: false,
            width: 530,
            height: 230,
            buttons: [
                {
                    text: RED._("common.label.ok"),
                    click: function() {
                        saveToLibrary(true);
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: RED._("common.label.cancel"),
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });
        $( "#node-dialog-library-save" ).dialog({
            title: RED._("library.saveToLibrary"),
            modal: true,
            autoOpen: false,
            width: 530,
            height: 230,
            buttons: [
                {
                    text: RED._("common.label.ok"),
                    click: function() {
                        saveToLibrary(false);
                        $( this ).dialog( "close" );
                    }
                },
                {
                    text: RED._("common.label.cancel"),
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]
        });

    }

    function exportFlow() {
        //TODO: don't rely on the main dialog
        var nns = RED.nodes.createExportableNodeSet(RED.view.selection().nodes);
        $("#node-input-library-filename").attr('nodes',JSON.stringify(nns));
        exportToLibraryDialog.dialog( "open" );
    }

    return {
        init: function() {
            RED.events.on("view:selection-changed",function(selection) {
                if (!selection.nodes) {
                    RED.menu.setDisabled("menu-item-export",true);
                    RED.menu.setDisabled("menu-item-export-clipboard",true);
                    RED.menu.setDisabled("menu-item-export-library",true);
                } else {
                    RED.menu.setDisabled("menu-item-export",false);
                    RED.menu.setDisabled("menu-item-export-clipboard",false);
                    RED.menu.setDisabled("menu-item-export-library",false);
                }
            });

            if (RED.settings.theme("menu.menu-item-import-library") !== false) {
                // loadFlowLibrary();
            }

            exportToLibraryDialog = $('<div id="library-dialog" class="hide"><form class="dialog-form form-horizontal"></form></div>')
                .appendTo("body")
                .dialog({
                    modal: true,
                    autoOpen: false,
                    width: 500,
                    resizable: false,
                    title: RED._("library.exportToLibrary"),
                    buttons: [
                        {
                            id: "library-dialog-ok",
                            text: RED._("common.label.ok"),
                            click: function() {
                                //TODO: move this to RED.library
                                var flowName = $("#node-input-library-filename").val();
                                if (!/^\s*$/.test(flowName)) {
                                    $.ajax({
                                        url:'library/flows/'+flowName,
                                        type: "POST",
                                        data: $("#node-input-library-filename").attr('nodes'),
                                        contentType: "application/json; charset=utf-8"
                                    }).done(function() {
                                        RED.library.loadFlowLibrary();
                                        RED.notify(RED._("library.savedNodes"),"success");
                                    }).fail(function(xhr,textStatus,err) {
                                        RED.notify(RED._("library.saveFailed",{message:xhr.responseText}),"error");
                                    });
                                }
                                $( this ).dialog( "close" );
                            }
                        },
                        {
                            id: "library-dialog-cancel",
                            text: RED._("common.label.cancel"),
                            click: function() {
                                $( this ).dialog( "close" );
                            }
                        }
                    ],
                    open: function(e) {
                        $(this).parent().find(".ui-dialog-titlebar-close").hide();
                        RED.keyboard.disable();
                    },
                    close: function(e) {
                        RED.keyboard.enable();
                    }
                });
            exportToLibraryDialog.children(".dialog-form").append($(
                '<div class="form-row">'+
                '<label for="node-input-library-filename" data-i18n="[append]editor:library.filename"><i class="fa fa-file"></i> </label>'+
                '<input type="text" id="node-input-library-filename" data-i18n="[placeholder]editor:library.fullFilenamePlaceholder">'+
                '<input type="text" style="display: none;" />'+ // Second hidden input to prevent submit on Enter
                '</div>'
            ));
        },
        create: createUI,
        loadFlowLibrary: loadFlowLibrary,

        export: exportFlow
    }
})();
;/**
 * Copyright 2013, 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
RED.notify = (function() {
    var currentNotifications = [];
    var c = 0;
    return function(msg,type,fixed,timeout) {
        if (currentNotifications.length > 4) {
            var ll = currentNotifications.length;
            for (var i = 0;ll > 4 && i<currentNotifications.length;i+=1) {
                var notifiction = currentNotifications[i];
                if (!notifiction.fixed) {
                    window.clearTimeout(notifiction.timeoutid);
                    notifiction.close();
                    ll -= 1;
                }
            }
        }
        var n = document.createElement("div");
        n.id="red-notification-"+c;
        n.className = "notification";
        n.fixed = fixed;
        if (type) {
            n.className = "notification notification-"+type;
        }
        n.style.display = "none";
        n.innerHTML = msg;
        $("#notifications").append(n);
        $(n).slideDown(300);
        n.close = (function() {
            var nn = n;
            return function() {
                currentNotifications.splice(currentNotifications.indexOf(nn),1);
                $(nn).slideUp(300, function() {
                    nn.parentNode.removeChild(nn);
                });
            };
        })();
        if (!fixed) {
            $(n).click((function() {
                var nn = n;
                return function() {
                    nn.close();
                    window.clearTimeout(nn.timeoutid);
                };
            })());
            n.timeoutid = window.setTimeout(n.close,timeout||3000);
        }
        currentNotifications.push(n);
        c+=1;
        return n;
    }
})();
;/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.subflow = (function() {


    function getSubflow() {
        return RED.nodes.subflow(RED.workspaces.active());
    }

    function findAvailableSubflowIOPosition(subflow,isInput) {
        var pos = {x:50,y:30};
        if (!isInput) {
            pos.x += 110;
        }
        for (var i=0;i<subflow.out.length+subflow.in.length;i++) {
            var port;
            if (i < subflow.out.length) {
                port = subflow.out[i];
            } else {
                port = subflow.in[i-subflow.out.length];
            }
            if (port.x == pos.x && port.y == pos.y) {
                pos.x += 55;
                i=0;
            }
        }
        return pos;
    }

    function addSubflowInput() {
        var subflow = RED.nodes.subflow(RED.workspaces.active());
        if (subflow.in.length === 1) {
            return;
        }
        var position = findAvailableSubflowIOPosition(subflow,true);
        var newInput = {
            type:"subflow",
            direction:"in",
            z:subflow.id,
            i:subflow.in.length,
            x:position.x,
            y:position.y,
            id:RED.nodes.id()
        };
        var oldInCount = subflow.in.length;
        subflow.in.push(newInput);
        subflow.dirty = true;
        var wasDirty = RED.nodes.dirty();
        var wasChanged = subflow.changed;
        subflow.changed = true;
        var result = refresh(true);
        var historyEvent = {
            t:'edit',
            node:subflow,
            dirty:wasDirty,
            changed:wasChanged,
            subflow: {
                inputCount: oldInCount,
                instances: result.instances
            }
        };
        RED.history.push(historyEvent);
        RED.view.select();
        RED.nodes.dirty(true);
        RED.view.redraw();
        $("#workspace-subflow-input-add").addClass("active");
        $("#workspace-subflow-input-remove").removeClass("active");
    }

    function removeSubflowInput() {
        var activeSubflow = RED.nodes.subflow(RED.workspaces.active());
        if (activeSubflow.in.length === 0) {
            return;
        }
        var removedInput = activeSubflow.in[0];
        var removedInputLinks = [];
        RED.nodes.eachLink(function(l) {
            if (l.source.type == "subflow" && l.source.z == activeSubflow.id && l.source.i == removedInput.i) {
                removedInputLinks.push(l);
            } else if (l.target.type == "subflow:"+activeSubflow.id) {
                removedInputLinks.push(l);
            }
        });
        removedInputLinks.forEach(function(l) { RED.nodes.removeLink(l)});
        activeSubflow.in = [];
        $("#workspace-subflow-input-add").removeClass("active");
        $("#workspace-subflow-input-remove").addClass("active");
        activeSubflow.changed = true;
        return {subflowInputs: [ removedInput ], links:removedInputLinks};
    }

    function addSubflowOutput(id) {
        var subflow = RED.nodes.subflow(RED.workspaces.active());
        var position = findAvailableSubflowIOPosition(subflow,false);

        var newOutput = {
            type:"subflow",
            direction:"out",
            z:subflow.id,
            i:subflow.out.length,
            x:position.x,
            y:position.y,
            id:RED.nodes.id()
        };
        var oldOutCount = subflow.out.length;
        subflow.out.push(newOutput);
        subflow.dirty = true;
        var wasDirty = RED.nodes.dirty();
        var wasChanged = subflow.changed;
        subflow.changed = true;

        var result = refresh(true);

        var historyEvent = {
            t:'edit',
            node:subflow,
            dirty:wasDirty,
            changed:wasChanged,
            subflow: {
                outputCount: oldOutCount,
                instances: result.instances
            }
        };
        RED.history.push(historyEvent);
        RED.view.select();
        RED.nodes.dirty(true);
        RED.view.redraw();
        $("#workspace-subflow-output .spinner-value").html(subflow.out.length);
    }

    function removeSubflowOutput(removedSubflowOutputs) {
        var activeSubflow = RED.nodes.subflow(RED.workspaces.active());
        if (activeSubflow.out.length === 0) {
            return;
        }
        if (typeof removedSubflowOutputs === "undefined") {
            removedSubflowOutputs = [activeSubflow.out[activeSubflow.out.length-1]];
        }
        var removedLinks = [];
        removedSubflowOutputs.sort(function(a,b) { return b.i-a.i});
        for (i=0;i<removedSubflowOutputs.length;i++) {
            var output = removedSubflowOutputs[i];
            activeSubflow.out.splice(output.i,1);
            var subflowRemovedLinks = [];
            var subflowMovedLinks = [];
            RED.nodes.eachLink(function(l) {
                if (l.target.type == "subflow" && l.target.z == activeSubflow.id && l.target.i == output.i) {
                    subflowRemovedLinks.push(l);
                }
                if (l.source.type == "subflow:"+activeSubflow.id) {
                    if (l.sourcePort == output.i) {
                        subflowRemovedLinks.push(l);
                    } else if (l.sourcePort > output.i) {
                        subflowMovedLinks.push(l);
                    }
                }
            });
            subflowRemovedLinks.forEach(function(l) { RED.nodes.removeLink(l)});
            subflowMovedLinks.forEach(function(l) { l.sourcePort--; });

            removedLinks = removedLinks.concat(subflowRemovedLinks);
            for (var j=output.i;j<activeSubflow.out.length;j++) {
                activeSubflow.out[j].i--;
                activeSubflow.out[j].dirty = true;
            }
        }
        activeSubflow.changed = true;

        return {subflowOutputs: removedSubflowOutputs, links: removedLinks}
    }

    function refresh(markChange) {
        var activeSubflow = RED.nodes.subflow(RED.workspaces.active());
        refreshToolbar(activeSubflow);
        var subflowInstances = [];
        if (activeSubflow) {
            RED.nodes.filterNodes({type:"subflow:"+activeSubflow.id}).forEach(function(n) {
                subflowInstances.push({
                    id: n.id,
                    changed: n.changed
                });
                if (markChange) {
                    n.changed = true;
                }
                n.inputs = activeSubflow.in.length;
                n.outputs = activeSubflow.out.length;
                while (n.outputs < n.ports.length) {
                    n.ports.pop();
                }
                n.resize = true;
                n.dirty = true;
                RED.editor.updateNodeProperties(n);
            });
            RED.editor.validateNode(activeSubflow);
            return {
                instances: subflowInstances
            }
        }
    }
    function refreshToolbar(activeSubflow) {
        if (activeSubflow) {
            $("#workspace-subflow-input-add").toggleClass("active", activeSubflow.in.length !== 0);
            $("#workspace-subflow-input-remove").toggleClass("active",activeSubflow.in.length === 0);

            $("#workspace-subflow-output .spinner-value").html(activeSubflow.out.length);
        }
    }

    function showWorkspaceToolbar(activeSubflow) {
        var toolbar = $("#workspace-toolbar");
        toolbar.empty();

        $('<a class="button" id="workspace-subflow-edit" href="#" data-i18n="[append]subflow.editSubflowProperties"><i class="fa fa-pencil"></i> </a>').appendTo(toolbar);
        $('<span style="margin-left: 5px;" data-i18n="subflow.input"></span> '+
            '<div style="display: inline-block;" class="button-group">'+
            '<a id="workspace-subflow-input-remove" class="button active" href="#">0</a>'+
            '<a id="workspace-subflow-input-add" class="button" href="#">1</a>'+
            '</div>').appendTo(toolbar);

        $('<span style="margin-left: 5px;" data-i18n="subflow.output"></span> <div id="workspace-subflow-output" style="display: inline-block;" class="button-group spinner-group">'+
            '<a id="workspace-subflow-output-remove" class="button" href="#"><i class="fa fa-minus"></i></a>'+
            '<div class="spinner-value">3</div>'+
            '<a id="workspace-subflow-output-add" class="button" href="#"><i class="fa fa-plus"></i></a>'+
            '</div>').appendTo(toolbar);

        // $('<a class="button disabled" id="workspace-subflow-add-input" href="#" data-i18n="[append]subflow.input"><i class="fa fa-plus"></i> </a>').appendTo(toolbar);
        // $('<a class="button" id="workspace-subflow-add-output" href="#" data-i18n="[append]subflow.output"><i class="fa fa-plus"></i> </a>').appendTo(toolbar);
        $('<a class="button" id="workspace-subflow-delete" href="#" data-i18n="[append]subflow.deleteSubflow"><i class="fa fa-trash"></i> </a>').appendTo(toolbar);
        toolbar.i18n();


        $("#workspace-subflow-output-remove").click(function(event) {
            event.preventDefault();
            var wasDirty = RED.nodes.dirty();
            var wasChanged = activeSubflow.changed;
            var result = removeSubflowOutput();
            if (result) {
                var inst = refresh(true);
                RED.history.push({
                    t:'delete',
                    links:result.links,
                    subflowOutputs: result.subflowOutputs,
                    changed: wasChanged,
                    dirty:wasDirty,
                    subflow: {
                        instances: inst.instances
                    }
                });

                RED.view.select();
                RED.nodes.dirty(true);
                RED.view.redraw(true);
            }
        });
        $("#workspace-subflow-output-add").click(function(event) {
            event.preventDefault();
            addSubflowOutput();
        });

        $("#workspace-subflow-input-add").click(function(event) {
            event.preventDefault();
            addSubflowInput();
        });
        $("#workspace-subflow-input-remove").click(function(event) {
            event.preventDefault();
            var wasDirty = RED.nodes.dirty();
            var wasChanged = activeSubflow.changed;
            activeSubflow.changed = true;
            var result = removeSubflowInput();
            if (result) {
                var inst = refresh(true);
                RED.history.push({
                    t:'delete',
                    links:result.links,
                    changed: wasChanged,
                    subflowInputs: result.subflowInputs,
                    dirty:wasDirty,
                    subflow: {
                        instances: inst.instances
                    }
                });
                RED.view.select();
                RED.nodes.dirty(true);
                RED.view.redraw(true);
            }
        });

        $("#workspace-subflow-edit").click(function(event) {
            RED.editor.editSubflow(RED.nodes.subflow(RED.workspaces.active()));
            event.preventDefault();
        });

        $("#workspace-subflow-delete").click(function(event) {
            event.preventDefault();
            var removedNodes = [];
            var removedLinks = [];
            var startDirty = RED.nodes.dirty();

            var activeSubflow = getSubflow();

            RED.nodes.eachNode(function(n) {
                if (n.type == "subflow:"+activeSubflow.id) {
                    removedNodes.push(n);
                }
                if (n.z == activeSubflow.id) {
                    removedNodes.push(n);
                }
            });
            RED.nodes.eachConfig(function(n) {
                if (n.z == activeSubflow.id) {
                    removedNodes.push(n);
                }
            });

            var removedConfigNodes = [];
            for (var i=0;i<removedNodes.length;i++) {
                var removedEntities = RED.nodes.remove(removedNodes[i].id);
                removedLinks = removedLinks.concat(removedEntities.links);
                removedConfigNodes = removedConfigNodes.concat(removedEntities.nodes);
            }
            // TODO: this whole delete logic should be in RED.nodes.removeSubflow..
            removedNodes = removedNodes.concat(removedConfigNodes);

            RED.nodes.removeSubflow(activeSubflow);

            RED.history.push({
                    t:'delete',
                    nodes:removedNodes,
                    links:removedLinks,
                    subflow: {
                        subflow: activeSubflow
                    },
                    dirty:startDirty
            });

            RED.workspaces.remove(activeSubflow);
            RED.nodes.dirty(true);
            RED.view.redraw();
        });

        refreshToolbar(activeSubflow);

        $("#chart").css({"margin-top": "40px"});
        $("#workspace-toolbar").show();
    }
    function hideWorkspaceToolbar() {
        $("#workspace-toolbar").hide().empty();
        $("#chart").css({"margin-top": "0"});
    }


    function init() {
        RED.events.on("workspace:change",function(event) {
            var activeSubflow = RED.nodes.subflow(event.workspace);
            if (activeSubflow) {
                showWorkspaceToolbar(activeSubflow);
            } else {
                hideWorkspaceToolbar();
            }
        });
        RED.events.on("view:selection-changed",function(selection) {
            if (!selection.nodes) {
                RED.menu.setDisabled("menu-item-subflow-convert",true);
            } else {
                RED.menu.setDisabled("menu-item-subflow-convert",false);
            }
        });

    }

    function createSubflow() {
        var lastIndex = 0;
        RED.nodes.eachSubflow(function(sf) {
           var m = (new RegExp("^Subflow (\\d+)$")).exec(sf.name);
           if (m) {
               lastIndex = Math.max(lastIndex,m[1]);
           }
        });

        var name = "Subflow "+(lastIndex+1);

        var subflowId = RED.nodes.id();
        var subflow = {
            type:"subflow",
            id:subflowId,
            name:name,
            info:"",
            in: [],
            out: []
        };
        RED.nodes.addSubflow(subflow);
        RED.history.push({
            t:'createSubflow',
            subflow: {
                subflow:subflow
            },
            dirty:RED.nodes.dirty()
        });
        RED.workspaces.show(subflowId);
        RED.nodes.dirty(true);
    }

    function convertToSubflow() {
        var selection = RED.view.selection();
        if (!selection.nodes) {
            RED.notify(RED._("subflow.errors.noNodesSelected"),"error");
            return;
        }
        var i;
        var nodes = {};
        var new_links = [];
        var removedLinks = [];

        var candidateInputs = [];
        var candidateOutputs = [];
        var candidateInputNodes = {};


        var boundingBox = [selection.nodes[0].x,
            selection.nodes[0].y,
            selection.nodes[0].x,
            selection.nodes[0].y];

        for (i=0;i<selection.nodes.length;i++) {
            var n = selection.nodes[i];
            nodes[n.id] = {n:n,outputs:{}};
            boundingBox = [
                Math.min(boundingBox[0],n.x),
                Math.min(boundingBox[1],n.y),
                Math.max(boundingBox[2],n.x),
                Math.max(boundingBox[3],n.y)
            ]
        }

        var center = [(boundingBox[2]+boundingBox[0]) / 2,(boundingBox[3]+boundingBox[1]) / 2];

        RED.nodes.eachLink(function(link) {
            if (nodes[link.source.id] && nodes[link.target.id]) {
                // A link wholely within the selection
            }

            if (nodes[link.source.id] && !nodes[link.target.id]) {
                // An outbound link from the selection
                candidateOutputs.push(link);
                removedLinks.push(link);
            }
            if (!nodes[link.source.id] && nodes[link.target.id]) {
                // An inbound link
                candidateInputs.push(link);
                candidateInputNodes[link.target.id] = link.target;
                removedLinks.push(link);
            }
        });

        var outputs = {};
        candidateOutputs = candidateOutputs.filter(function(v) {
             if (outputs[v.source.id+":"+v.sourcePort]) {
                 outputs[v.source.id+":"+v.sourcePort].targets.push(v.target);
                 return false;
             }
             v.targets = [];
             v.targets.push(v.target);
             outputs[v.source.id+":"+v.sourcePort] = v;
             return true;
        });
        candidateOutputs.sort(function(a,b) { return a.source.y-b.source.y});

        if (Object.keys(candidateInputNodes).length > 1) {
             RED.notify(RED._("subflow.errors.multipleInputsToSelection"),"error");
             return;
        }

        var lastIndex = 0;
        RED.nodes.eachSubflow(function(sf) {
           var m = (new RegExp("^Subflow (\\d+)$")).exec(sf.name);
           if (m) {
               lastIndex = Math.max(lastIndex,m[1]);
           }
        });

        var name = "Subflow "+(lastIndex+1);

        var subflowId = RED.nodes.id();
        var subflow = {
            type:"subflow",
            id:subflowId,
            name:name,
            info:"",
            in: Object.keys(candidateInputNodes).map(function(v,i) { var index = i; return {
                type:"subflow",
                direction:"in",
                x:candidateInputNodes[v].x-(candidateInputNodes[v].w/2)-80,
                y:candidateInputNodes[v].y,
                z:subflowId,
                i:index,
                id:RED.nodes.id(),
                wires:[{id:candidateInputNodes[v].id}]
            }}),
            out: candidateOutputs.map(function(v,i) { var index = i; return {
                type:"subflow",
                direction:"in",
                x:v.source.x+(v.source.w/2)+80,
                y:v.source.y,
                z:subflowId,
                i:index,
                id:RED.nodes.id(),
                wires:[{id:v.source.id,port:v.sourcePort}]
            }})
        };

        RED.nodes.addSubflow(subflow);

        var subflowInstance = {
            id:RED.nodes.id(),
            type:"subflow:"+subflow.id,
            x: center[0],
            y: center[1],
            z: RED.workspaces.active(),
            inputs: subflow.in.length,
            outputs: subflow.out.length,
            h: Math.max(30/*node_height*/,(subflow.out.length||0) * 15),
            changed:true
        }
        subflowInstance._def = RED.nodes.getType(subflowInstance.type);
        RED.editor.validateNode(subflowInstance);
        RED.nodes.add(subflowInstance);

        candidateInputs.forEach(function(l) {
            var link = {source:l.source, sourcePort:l.sourcePort, target: subflowInstance};
            new_links.push(link);
            RED.nodes.addLink(link);
        });

        candidateOutputs.forEach(function(output,i) {
            output.targets.forEach(function(target) {
                var link = {source:subflowInstance, sourcePort:i, target: target};
                new_links.push(link);
                RED.nodes.addLink(link);
            });
        });

        subflow.in.forEach(function(input) {
            input.wires.forEach(function(wire) {
                var link = {source: input, sourcePort: 0, target: RED.nodes.node(wire.id) }
                new_links.push(link);
                RED.nodes.addLink(link);
            });
        });
        subflow.out.forEach(function(output,i) {
            output.wires.forEach(function(wire) {
                var link = {source: RED.nodes.node(wire.id), sourcePort: wire.port , target: output }
                new_links.push(link);
                RED.nodes.addLink(link);
            });
        });

        for (i=0;i<removedLinks.length;i++) {
            RED.nodes.removeLink(removedLinks[i]);
        }

        for (i=0;i<selection.nodes.length;i++) {
            selection.nodes[i].z = subflow.id;
        }

        RED.history.push({
            t:'createSubflow',
            nodes:[subflowInstance.id],
            links:new_links,
            subflow: {
                subflow: subflow
            },

            activeWorkspace: RED.workspaces.active(),
            removedLinks: removedLinks,

            dirty:RED.nodes.dirty()
        });

        RED.editor.validateNode(subflow);
        RED.nodes.dirty(true);
        RED.view.redraw(true);
    }



    return {
        init: init,
        createSubflow: createSubflow,
        convertToSubflow: convertToSubflow,
        refresh: refresh,
        removeInput: removeSubflowInput,
        removeOutput: removeSubflowOutput
    }
})();
;/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

RED.touch = RED.touch||{};
RED.touch.radialMenu = (function() {
    
    
    var touchMenu = null;
    var isActive = false;
    var isOutside = false;
    var activeOption = null;

    
    function createRadial(obj,pos,options) {
        isActive = true;
        try {
            var w = $("body").width();
            var h = $("body").height();
            
            touchMenu = d3.select("body").append("div")
                .style({
                        position:"absolute",
                        top: 0,
                        left:0,
                        bottom:0,
                        right:0,
                        "z-index": 1000
                })
                .on('touchstart',function() {
                    hide();
                    d3.event.preventDefault();
                });
                    
            

    
            var menu = touchMenu.append("div")
                .style({
                        position: "absolute",
                        top: (pos[1]-80)+"px",
                        left:(pos[0]-80)+"px",
                        "border-radius": "80px",
                        width: "160px",
                        height: "160px",
                        background: "rgba(255,255,255,0.6)",
                        border: "1px solid #666"
                });
                
            var menuOpts = [];
            var createMenuOpt = function(x,y,opt) {
                opt.el = menu.append("div")
                    .style({
                        position: "absolute",
                        top: (y+80-25)+"px",
                        left:(x+80-25)+"px",
                        "border-radius": "20px",
                        width: "50px",
                        height: "50px",
                        background: "#fff",
                        border: "2px solid #666",
                        "text-align": "center",
                        "line-height":"50px"
                    });
                    
                opt.el.html(opt.name);
                
                if (opt.disabled) {
                    opt.el.style({"border-color":"#ccc",color:"#ccc"});
                }
                opt.x = x;
                opt.y = y;
                menuOpts.push(opt);
                
                opt.el.on('touchstart',function() {
                    opt.el.style("background","#999");
                    d3.event.preventDefault();
                    d3.event.stopPropagation();
                });
                opt.el.on('touchend',function() {
                    hide();
                    opt.onselect();
                    d3.event.preventDefault();
                    d3.event.stopPropagation();
                });
            }
            
            var n = options.length;
            var dang = Math.max(Math.PI/(n-1),Math.PI/4);
            var ang = Math.PI;
            for (var i=0;i<n;i++) {
                var x = Math.floor(Math.cos(ang)*80);
                var y = Math.floor(Math.sin(ang)*80);
                if (options[i].name) {
                    createMenuOpt(x,y,options[i]);
                }
                ang += dang;
            }
            

            var hide = function() {
                isActive = false;
                activeOption = null;
                touchMenu.remove();
                touchMenu = null;
            }
                    
            obj.on('touchend.radial',function() {
                    obj.on('touchend.radial',null);
                    obj.on('touchmenu.radial',null);
                    
                    if (activeOption) {
                        try {
                            activeOption.onselect();
                        } catch(err) {
                            RED._debug(err);
                        }
                        hide();
                    } else if (isOutside) {
                        hide();
                    }
            });


            
            obj.on('touchmove.radial',function() {
            try {
                var touch0 = d3.event.touches.item(0);
                var p = [touch0.pageX - pos[0],touch0.pageY-pos[1]];
                for (var i=0;i<menuOpts.length;i++) {
                    var opt = menuOpts[i];
                    if (!opt.disabled) {
                        if (p[0]>opt.x-30 && p[0]<opt.x+30 && p[1]>opt.y-30 && p[1]<opt.y+30) {
                            if (opt !== activeOption) {
                                opt.el.style("background","#999");
                                activeOption = opt;
                            }
                        } else if (opt === activeOption) {
                            opt.el.style("background","#fff");
                            activeOption = null;
                        } else {
                            opt.el.style("background","#fff");
                        }
                    }
                }
                if (!activeOption) {
                    var d = Math.abs((p[0]*p[0])+(p[1]*p[1]));
                    isOutside = (d > 80*80);
                }
                
            } catch(err) {
                RED._debug(err);
            }

                
            });
            
        } catch(err) {
            RED._debug(err);
        }
    }    

    
    return {
        show: createRadial,
        active: function() {
            return isActive;
        }
    }

})();

;/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
(function($) {
    var allOptions = {
        msg: {value:"msg",label:"msg.",validate:/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]+)*/i},
        flow: {value:"flow",label:"flow.",validate:/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]+)*/i},
        global: {value:"global",label:"global.",validate:/^[a-zA-Z_][a-zA-Z0-9_]*(\.[a-zA-Z_][a-zA-Z0-9_]+)*/i},
        str: {value:"str",label:"string",icon:"red/images/typedInput/az.png"},
        num: {value:"num",label:"number",icon:"red/images/typedInput/09.png",validate:/^[+-]?[0-9]*\.?[0-9]*([eE][-+]?[0-9]+)?$/},
        bool: {value:"bool",label:"boolean",icon:"red/images/typedInput/bool.png",options:["true","false"]},
        json: {value:"json",label:"JSON",icon:"red/images/typedInput/json.png", validate: function(v) { try{JSON.parse(v);return true;}catch(e){return false;}}},
        re: {value:"re",label:"regular expression",icon:"red/images/typedInput/re.png"}
    };
    var nlsd = false;

    $.widget( "nodered.typedInput", {
        _create: function() {
            if (!nlsd && RED && RED._) {
                for (var i in allOptions) {
                    if (allOptions.hasOwnProperty(i)) {
                        allOptions[i].label = RED._("typedInput.type."+i,{defaultValue:allOptions[i].label});
                    }
                }
            }
            nlsd = true;
            var that = this;

            this.disarmClick = false;
            this.element.addClass('red-ui-typedInput');
            this.uiWidth = this.element.width();
            this.uiSelect = this.element
                .wrap( "<div>" )
                .parent();

            ["Right","Left"].forEach(function(d) {
                var m = that.element.css("margin"+d);
                that.uiSelect.css("margin"+d,m);
                that.element.css("margin"+d,0);
            });
            this.uiSelect.addClass("red-ui-typedInput-container");

            this.options.types = this.options.types||Object.keys(allOptions);

            var hasSubOptions = false;
            this.typeMap = {};
            this.types = this.options.types.map(function(opt) {
                var result;
                if (typeof opt === 'string') {
                    result = allOptions[opt];
                } else {
                    result = opt;
                }
                that.typeMap[result.value] = result;
                if (result.options) {
                    hasSubOptions = true;
                }
                return result;
            });

            if (this.options.typeField) {
                this.typeField = $(this.options.typeField).hide();
                var t = this.typeField.val();
                if (t && this.typeMap[t]) {
                    this.options.default = t;
                }
            } else {
                this.typeField = $("<input>",{type:'hidden'}).appendTo(this.uiSelect);
            }

            this.selectTrigger = $('<a href="#"><i class="fa fa-sort-desc"></i></a>').prependTo(this.uiSelect);
            this.selectLabel = $('<span></span>').appendTo(this.selectTrigger);

            this.element.on('focus', function() {
                that.uiSelect.addClass('red-ui-typedInput-focus');
            });
            this.element.on('blur', function() {
                that.uiSelect.removeClass('red-ui-typedInput-focus');
            });
            this.element.on('change', function() {
                that.validate();
            })

            this.selectTrigger.click(function(event) {
                event.preventDefault();
                that._showMenu(that.menu,that.selectTrigger);
            });


            if (hasSubOptions) {
                // explicitly set optionSelectTrigger display to inline-block otherwise jQ sets it to 'inline'
                this.optionSelectTrigger = $('<a href="#" class="red-ui-typedInput-option-trigger" style="display:inline-block"><i class="fa fa-sort-desc"></i></a>').appendTo(this.uiSelect);
                this.optionSelectLabel = $('<span></span>').prependTo(this.optionSelectTrigger);
                this.optionSelectTrigger.click(function(event) {
                    event.preventDefault();
                    if (that.optionMenu) {
                        that.optionMenu.css({
                            minWidth:that.optionSelectLabel.width()
                        });

                        that._showMenu(that.optionMenu,that.optionSelectLabel)
                    }
                });
            }
            this.menu = this._createMenu(this.types, function(v) { that.type(v) });
            this.type(this.options.default||this.types[0].value);
        },
        _hideMenu: function(menu) {
            $(document).off("mousedown.close-property-select");
            menu.hide();
            this.element.focus();
        },
        _createMenu: function(opts,callback) {
            var that = this;
            var menu = $("<div>").addClass("red-ui-typedInput-options");
            opts.forEach(function(opt) {
                if (typeof opt === 'string') {
                    opt = {value:opt,label:opt};
                }
                var op = $('<a href="#">').attr("value",opt.value).appendTo(menu);
                if (opt.label) {
                    op.text(opt.label);
                }
                if (opt.icon) {
                    $('<img>',{src:opt.icon,style:"margin-right: 4px; height: 18px;"}).prependTo(op);
                } else {
                    op.css({paddingLeft: "18px"});
                }

                op.click(function(event) {
                    event.preventDefault();
                    callback(opt.value);
                    that._hideMenu(menu);
                });
            });
            menu.css({
                display: "none",
            });
            menu.appendTo(document.body);
            return menu;

        },
        _showMenu: function(menu,relativeTo) {
            if (this.disarmClick) {
                this.disarmClick = false;
                return
            }
            var that = this;
            var pos = relativeTo.offset();
            var height = relativeTo.height();
            menu.css({
                top: (height+pos.top-3)+"px",
                left: (2+pos.left)+"px",
            });
            menu.slideDown(100);
            this._delay(function() {
                that.uiSelect.addClass('red-ui-typedInput-focus');
                $(document).on("mousedown.close-property-select", function(event) {
                    if(!$(event.target).closest(menu).length) {
                        that._hideMenu(menu);
                    }
                    if ($(event.target).closest(relativeTo).length) {
                        that.disarmClick = true;
                        event.preventDefault();
                    }
                })
            });
        },
        _getLabelWidth: function(label) {
            var labelWidth = label.width();
            if (labelWidth === 0) {
                var newTrigger = label.clone();
                newTrigger.css({
                    position:"absolute",
                    top:0,
                    left:-1000
                }).appendTo(document.body);
                labelWidth = newTrigger.width()+4;
                newTrigger.remove();
            }
            return labelWidth;
        },
        _resize: function() {

            if (this.typeMap[this.propertyType] && this.typeMap[this.propertyType].hasValue === false) {
                this.selectTrigger.width(this.uiWidth+5);
            } else {
                this.selectTrigger.width('auto');
                var labelWidth = this._getLabelWidth(this.selectTrigger);

                var newWidth = this.uiWidth-labelWidth+4;
                this.element.width(newWidth);

                if (this.optionSelectTrigger) {
                    var triggerWidth = this._getLabelWidth(this.optionSelectTrigger);
                    labelWidth = this._getLabelWidth(this.optionSelectLabel)-4;
                    this.optionSelectLabel.width(labelWidth+(newWidth-triggerWidth));
                }
            }
        },
        _destroy: function() {
            this.menu.remove();
        },
        width: function(desiredWidth) {
            this.uiWidth = desiredWidth;
            this._resize();
        },
        value: function(value) {
            if (!arguments.length) {
                return this.element.val();
            } else {
                if (this.typeMap[this.propertyType].options) {
                    if (this.typeMap[this.propertyType].options.indexOf(value) === -1) {
                        value = "";
                    }
                    this.optionSelectLabel.text(value);
                }
                this.element.val(value);
                this.element.trigger('change');
            }
        },
        type: function(type) {
            if (!arguments.length) {
                return this.propertyType;
            } else {
                var opt = this.typeMap[type];
                if (opt && this.propertyType !== type) {
                    this.propertyType = type;
                    this.typeField.val(type);
                    this.selectLabel.empty();
                    if (opt.icon) {
                        $('<img>',{src:opt.icon,style:"margin-right: 4px;height: 18px;"}).prependTo(this.selectLabel);
                    } else {
                        this.selectLabel.text(opt.label);
                    }
                    if (opt.options) {
                        if (this.optionSelectTrigger) {
                            this.optionSelectTrigger.show();
                            this.element.hide();
                            var that = this;
                            this.optionMenu = this._createMenu(opt.options,function(v){
                                that.optionSelectLabel.text(v);
                                that.value(v);
                            });
                            var currentVal = this.element.val();
                            if (opt.options.indexOf(currentVal) !== -1) {
                                this.optionSelectLabel.text(currentVal);
                            } else {
                                this.value(opt.options[0]);
                            }
                        }
                    } else {
                        if (this.optionMenu) {
                            this.optionMenu.remove();
                            this.optionMenu = null;
                        }
                        if (this.optionSelectTrigger) {
                            this.optionSelectTrigger.hide();
                        }
                        if (opt.hasValue === false) {
                            this.element.val("");
                            this.element.hide();
                        } else {
                            this.element.show();
                        }
                        this.element.trigger('change');
                    }
                    this._resize();
                }
            }
        },
        validate: function() {
            var result;
            var value = this.value();
            var type = this.type();
            if (this.typeMap[type] && this.typeMap[type].validate) {
                var val = this.typeMap[type].validate;
                if (typeof val === 'function') {
                    result = val(value);
                } else {
                    result = val.test(value);
                }
            } else {
                result = true;
            }
            if (result) {
                this.uiSelect.removeClass('input-error');
            } else {
                this.uiSelect.addClass('input-error');
            }
            return result;
        }
    });
})(jQuery);
