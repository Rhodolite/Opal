//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Beryl: Boot Engine, Reliable Yet Limber
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Create global variable `Gem`
//
//  NOTE:
//      Later `Gem` will be replaced with a proper instance of class `Gem.Global`
//
window.Gem = {
    Configuration : {                                       //  Gem configuration values
        clarity : true,                                     //      Set Gem clarity mode to true
        debug   : true,                                     //      Set Gem debug mode to true
    },

    NodeWebKit: {                                           //  Node WebKit members & methods
        //  is_version_012_or_lower   : false               //      True if using nw.js & it's version 0.12 or lower
        //  is_version_013_or_greater : false               //      True if using nw.js & it's version 0.13 or greater
        //  show_developer_tools      : Function            //      Show developer tools window
    },

    Script : {                                              //  `<script>` handling
        beryl_boot_path : 'Gem/Beryl/Xoot.js',              //      [Temporary] Module to load the rest of Gem modules
        event_list      : ['abort', 'error', 'load'],       //      List of `<script>` events to listen for.
        handle_errors   : false,                            //      Changed to `true` if handling `<script>` errors
        //  load        : Function                          //      Load a script using `<script>` tag.
        script_map      : {                                 //      Map of all the scripts loaded (or loading)
            //  ['Gem/Beryl/Boot.js'] : `<script>` tag      //          `<script>` tag to load "Gem/Beryl/Boot.js".
        }//,

        //
        //  NOTE:
        //      The rest of attributes are only used if `Gem.Script.handle_errors` is `true`.
        //    
        //  handle_global_error : Function                  //      Handle errors when executing a `<script>` tag
        //  handle_event        : Function                  //      Handle events of `<script>` tags
        //  source_attribute    : Function                  //      Get unmodified `.src` attribute.
    },

    Source : {                                              //  Functions to "hold onto" for Developer Tools
        //  js_plugins_Beryl : Function                     //      Avoid garbage collection of 'js/plugins/Beryl.js'
    },

    //
    //  Gem.codify : Function                               //  [Temporary] bootstrap function ... (defined below)
    //

    //
    //  Gem.execute:
    //      Execute code inside a function (to allow local variables)
    //
    //  NOTE:
    //      The reason the function is named `Gem__execute` (meaning `Gem.execute`) is so that it shows
    //      up in stack traces as the full name `Gem__execute` instead of shorter name `execute`
    //      (this is really really helpful when reading stack traces).
    //
    execute : function Gem__execute(code) {
        code()
    }//,
}


//
//  Gem.codify:
//      Temporary bootstrap function to create the code for a function or procedure, typically as a closure to
//      avoid the use of any global variables.'
//
Gem.execute(
    function codifier__Gem__codify() {
        //
        //  Imports
        //
        var create_pattern = RegExp

        //
        //  Closures
        //
        var name_pattern = new RegExp(/^Gem__([A-Z][A-Za-z_]*)__([a-z][0-9A-Za-z_]*)$/)

        if ('bind' in name_pattern.exec) {
            var name_match = name_pattern.exec.bind(name_pattern)
        } else {
            var name_match = function name_match(s) {
                return name_pattern.exec(s)
            }
        }


        Gem.codify = function Gem__codify(codifier) {
            var code = codifier()
            var m    = name_match(code.name)

            if ( ! m) {
                throw Error('Unknown name to codify: ' + code.name)
            }

            var module = m[1]
            var name   = m[2]

            Gem[module][name] = code
        }
    }
)


//
//  Gem.NodeWebKit.is_version_12_or_lower                   - True if using nw.js & it's version 0.12 or lower
//  Gem.NodeWebKit.is_version_13_or_greater                 - True if using nw.js & it's version 0.13 or greater
//
//  NOTE:
//      If not using nw.js, then both `Gem.NodeWebKit.is_version_{12_or_lower,13_or_higher}` will be `false`.
//
Gem.execute(
    function execute__extract__Gem__NodeWebKit__version() {
        //
        //  Imports
        //
        var parse_integer__or__NaN = Number.parseInt


        //
        //  Calculate Node WebKit version
        //
        var major = NaN
        var minor = NaN

        var version = (('process'  in window) && ('versions' in process) && (process.versions['node-webkit']))

        if (typeof version == 'string') {
            var version_list = version.split('.')

            if (version_list.length > 0) { major = parse_integer__or__NaN(version_list[0]) }
            if (version_list.length > 1) { minor = parse_integer__or__NaN(version_list[1]) }
        }

        Gem.NodeWebKit.is_version_012_or_lower  = (major === 0 && minor <= 12)
        Gem.NodeWebKit.is_version_013_or_higher = (major >   0 || minor >= 13)
    }
)


//
//  Gem.NodeWebKit.show_developer_tools
//      Show developer tools
//
if (Gem.NodeWebKit.is_version_012_or_lower) {               //  Show developer tools (nw.js 0.12 or lower)
    Gem.codify(
        function codifier__Gem__NodeWebKit__show_developer_tools() {
            var game_window = require('nw.gui').Window.get()

            return function Gem__NodeWebKit__show_developer_tools() {
                //  Show developer tools (nw.js 0.12 or lower)

                game_window.showDevTools()
            }
        }
    )
} else if (Gem.NodeWebKit.is_version_013_or_higher) {       //  Show developer tools (nw.js 0.13 or higher)
    Gem.codify(
        function codifier__Gem__NodeWebKit__show_developer_tools() {
            var game_window = nw.Window.get()

            return function Gem__NodeWebKit__show_developer_tools() {
                //  Show developer tools (nw.js 0.13 or higher)

                //
                //  NOTE:
                //      You *MUST* pass `false` to `game_window.showDevTools` in version 0.13, or nw.js will simply
                //      exit your program -- which is really really really annoying -- especially the first time,
                //      when you don't know what is happening & it takes you half an hour to find out ...
                //
                game_window.showDevTools(false)
            }
        }
    )
} else {                                                    //  Not using nw.js: Don't show developer tools
    Gem.codify(
        function codifier__Gem__NodeWebKit__show_developer_tools() {
            return function Gem__NodeWebKit__show_developer_tools() {
                //  Not using nw.js: Don't show developer tools
            }
        }
    )
}


//
//  Gem.Script.handle_errors
//
Gem.execute(
    function execute__set__Gem__Script__handle_errors() {
        //
        //  NOTE:
        //      We only handle script events (and thus bring up an alert) if six conditions are met:
        //
        //          1.  This is running in Gem debug mode;
        //          2.  This is running in RPG Maker MV "test" mode;
        //          3.  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.);
        //          4.  The browser has a `.addEventListener`   method (all modern browsers do);
        //          5.  The browser has a `.createElement.bind` method (all modern browsers do); AND
        //          6.  The browser has a `.setAttribute`       method (all modern browsers do).
        //
        if (
                   Gem.Configuration.debug
                && ('Utils' in window) && Utils.isNwjs()
                && Utils.isOptionValid('test')
                && ('addEventListener' in window)
                && ('bind'             in document.createElement)
                && ('setAttribute'     in document.head)
        ) {
            Gem.Script.handle_errors = true
        }
    }
)


//
//  Gem.Script.source_attribute
//      Get unmodified `.src` attribute.
//
//  NOTE:
//      On nw.js:
//          Doing `tag.getAttribute('src')` returns the unmodified `.src` attribute
//
//          However `tag.src` returns the modified `.src` attribute, prefixed with the "origin".
//
//          Yes, its CRAZY, that these two [theoretically identical] ways of accessing `.src` return different values.
//
//      Anyway, if we can use `.getAttribute('src')` we do so; otherwise we do it the crazy backwards compatiable
//      way.
//
if (Gem.Script.handle_errors) {
    if ('getAttribute' in document.head) {
        Gem.codify(
            function codifier__Gem__Script__source_attribute(tag) {
                return function Gem__Script__source_attribute(tag) {
                    //  Get unmodified `.src` attribute

                    return tag.getAttribute('src')          //  Get unmodified `.src` attribute
                }
            }
        )
    } else {
        Gem.codify(
            function codifier__Gem__Script__source_attribute(tag) {
                var origin_slash = location.origin + '/'


                return function Gem__Script__source_attribute(tag) {
                    //  Get unmodified `.src` attribute

                    var source = tag.src                    //  OLD WAY: get [possibly modified] `.src` attribute

                    if (typeof source === 'string' && source.startsWith(origin_slash)) {
                        return source.substring(origin_slash.length)    //  Restore `.src` attribute to original value
                    }

                    return source                           //  Return [ummodified] `.src` attribute
                }
            }
        )
    }
}


//
//  Gem.Script.handle_global_error
//      Handle errors when executing a `<script>` tag
//
if (Gem.Script.handle_errors) {
    Gem.codify(
        function codifier__Gem__Script__handle_global_error() {
            var alert                = window.alert
            var document             = window.document
            var source_attribute     = Gem.Script.source_attribute
            var show_developer_tools = Gem.NodeWebKit.show_developer_tools


            function Gem__Script__handle_global_error(e) {
                //  Handle errors when executing a `<script>` tag

                if ( ! ('currentScript' in document))  {
                    return
                }

                var tag = document.currentScript

                if ( ! tag) {
                    return
                }

                var path = source_attribute(tag)

                alert(
                      path + '#' + e.lineno
                    + ': ' + e.error
                    + '\n' + 'Please see Developer Tools for full error'
                )

                show_developer_tools()
            }


            window.addEventListener('error', Gem__Script__handle_global_error)

            return Gem__Script__handle_global_error
        }
    )
}


//
//  Gem.Script.handle_event
//      Handle events of `<script>` tags
//
if (Gem.Script.handle_errors) {
    Gem.codify(
        function codifier__Gem__Script__handle_event() {
            //
            //  NOTE:
            //      There is no way to get the error message, if there is one, when attempting to load
            //      Gem/Boot/Beryl.js (You can't use try/catch on a `<script>` tag that is inserted into the DOM).
            //
            //      Hence in case of an error, the following is done:
            //
            //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
            //          2)  Force the user to acknowledge the alert box by hitting 'OK';
            //          3)  Then, and only then, bring up Developer tool, so the user can read the rest of the error.
            //
            //  NOTE #2:
            //      The previous note means there is no way to get the loading error messge (i.e.: if the file
            //      does not exist, or there is an error while transferring it HTTP).
            //
            //      Any syntax error (on successful load) can be caught & is caught by `Gem.Script.handle_global_error`
            //      above.
            //
            var alert                = window.alert
            var source_attribute     = Gem.Script.source_attribute
            var show_developer_tools = Gem.NodeWebKit.show_developer_tools
            var script_event_list    = Gem.Script.event_list


            var script_handle_event = function Gem__Script__handle_event(e) {
                //  Handle events of `<script>` tags

                var tag = e.target

                for (var i = 0; i < script_event_list.length; i ++) {
                    var type = script_event_list[i]

                    tag.removeEventListener(type, script_handle_event)
                }

                if (e.type === 'abort' || e.type === 'error') {
                    var path = source_attribute(tag)

                    alert(path + ': Failed to load.  Please see Developer Tools for full error')
                    show_developer_tools()
                }
            }


            return script_handle_event
        }
    )
}


//
//  Gem.Script.gem_scripts
//
Gem.execute(
    function execute__Gem__Script__gem_scripts() {
        var id          = 'gem_scripts'
        var gem_scripts = document.getElementById(id)

        if (gem_scripts === null) {
            gem_scripts = document.createElement('div')

            if ('setAttribute' in gem_scripts) {
                gem_scripts.setAttribute('id', id)
            } else {
                gem_scripts.id = id
            }
        }
    }
)


//
//  Gem.Script.load
//
//  NOTE:
//      Annoyingly enough events on `<script>` tags do not bubble on purpose.
//
//      `<script>` tags fire "simple events" which according to section 7.1.5.3 of
//      https://www.w3.org/TR/html5/webappapis.html#fire-a-simple-event means:
//
//          "Firing a simple event named e means that a trusted event with the name e, which does not bubble"
//
//      Hence we have to set the 'abort', 'error', & 'load' events on each individual `<script>` tag.
//
if (Gem.Script.handle_errors) {
    //
    //  NOTE:
    //      We have tested above that this is modern browser that supports `.createElement.bind`, `.setAttribute` &
    //      `.addEventListener`.
    //
    Gem.codify(
        function codifier__Gem__Script__load() {
            //
            //  Imports
            //
            var create_script_tag   = document.createElement.bind(document, 'script')   //  Creates a `<script>` tag
            var script_event_list   = Gem.Script.event_list
            var script_handle_event = Gem.Script.handle_event
            var script_map          = Gem.Script.script_map


            return function Gem__Script__load(container, path) {
                var tag = script_map[path] = create_script_tag()    //  Create `<script></script>`

                tag.setAttribute('src', path)                       //  Modify to `<script src='path'></script>`

                //
                //  Handle script events 'abort', 'error', & 'load'
                //
                for (var i = 0; i < script_event_list.length; i ++) {
                    var type = script_event_list[i]

                    tag.addEventListener(type, script_handle_event)
                }

                container.appendChild(tag)                      //  Attempt to load 'path' via the `<script>` tag.
            }
        }
    )
} else {
    //
    //  NOTE:
    //      If there is no 'AddEventListener' we could do:
    //
    //          tag.onabort = handle_event           
    //          tag.onerror = handle_event                        //  Alert user if any error happens (alternate method)
    //          tag.onload  = handle_event           
    //
    //      However, all modern browsers have an 'addEventListener', no need to be backwards compatiable with super
    //      super old browsers.
    //
    //      More importantly, we can't test this code -- untested code should not be inplemented.
    //
    //  NOTE #2:
    //      We don't know if this browser supports `.bind`         or not, so just in case ... test for it.
    //      We don't know if this browser supports `.setAttribute` or not, so just in case ... test for it.
    //
    Gem.codify(
        function codifier__Gem__Script__load() {
            //
            //  Imports
            //
            if ('bind' in document.createElement) {
                var create_script_tag = document.createElement.bind(document, 'script') //  Creates a `<script>` tag
            } else {
                var create_script_tag = function OLD_WAY__create_script_tag() {
                    return document.createElement('script')                    //  Old way: Creates a `<script>` tag
                }
            }

            var script_map = Gem.Script.script_map


            return function Gem__Script__load(container, path) {
                var tag = script_map[path] = create_script_tag()

                if ('setAttribute' in tag) {                //  Is this a modern browser?
                    tag.setAttribute('src', path)           //      New way: Modify to `<script src='path`></script>`
                } else {                                    //  Ancient Browser:
                    tag.src = path                          //      Old way: Modify to `<script src='path'></script>`
                }

                container.appendChild(tag)                  //  Attempt to load 'path' via the `<script>` tag.
            }
        }
    )
}


//
//  Cleanup
//
Gem.execute(
    function execute__remove__Gem__Script__event_list() {
        delete Gem.Script.event_list
    }
)


//
//  Load Gem/Beryl/Boot.js
//
Gem.execute(
    function execute__load_next_script() {
        Gem.Script.load(Gem.Script.beryl_boot_path)
    }
)


//
//  The "sources" tab of Developer tools shows what has been loaded into the HTML page:
//
//      However, for a JavaScript file to appear under "sources" it must have at least one function that has not
//      been garbage collected.
//
//      In debug mode, `Gem.sources` is used to make sure that there is least once such function from each JavaScript
//      file that has been loaded in.
//
if (Gem.Configuration.debug) {
    Gem.execute(
        function execute__reference_at_least_one_function_to_avoid_garbage_collection_of_this_source_file() {
            Gem.Source.js_plugins_Beryl = Gem.NodeWebKit.show_developer_tools
        }
    )
}


//
//  At this point, as part of the boot process, `Gem` is now defined as in the original comment above:
//
//      With the exception of Gem.Script.event_list (which has been deleted).
//
//  The two attributes marked [Temporary] are deleted in later code
//


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
