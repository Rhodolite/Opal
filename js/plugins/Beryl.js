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
        beryl_boot_path : 'Gem/Beryl/Boot.js',              //  Module to load the rest of Gem modules
        clarity         : true,                             //  Set Gem clarity mode to true
        debug           : true,                             //  Set Gem debug mode to true
        scripts         : {},                               //  Map of all the scripts loaded (or loading)
        sources         : {},                               //  Sources to "hold onto" for Developer Tools -- see below


        //
        //  execute:
        //      Temporary bootstrap function to execute code inside a function (to allow local variables)
        //
        //  codify: (alternative usage)
        //      If a function is returned then it is "codified" under it's name, ignoring it's first 5 characters
        //      (i.e.:  ignoring the 'Gem__' prefix).
        //
        //  NOTE:
        //      The reason the function is named `Gem__execute` (meaning `Gem.execute`) is so that it shows
        //      up in stack traces as the full name `Gem__execute` instead of shorter name `execute`
        //      (this is really really helpful when reading stack traces).
        //
        execute : function Gem__execute(codifier) {
            var code = codifier()

            if (code) {
                Gem[code.name.substring(5)] = code
            }
        }//,
    }


//
//  Gem.is_node_webkit_12_or_lower          - True if using nw.js & it's version 0.12 or lower
//  Gem.is_node_webkit_13_or_greater        - True if using nw.js & it's version 0.13 or greater
//
//  NOTE:
//      If not using nw.js, then both `Gem.is_node_webkit_12_or_lower` & `Gem.is_node_webkit_13_or_higher` will be
//      `false`.
//
Gem.execute(
    function execute__extract__node_webkit__version() {
        //
        //  Imports
        //
        var parse_integer__or__NaN = Number.parseInt


        //
        //  Calculate Node WebKit version
        //
        var node_webkit__major = NaN
        var node_webkit__minor = NaN

        var node_webkit__version = (
                   ('process'  in window)
                && ('versions' in process)
                && process.versions['node-webkit']
            )

        if (typeof node_webkit__version == 'string') {
            var version_list = node_webkit__version.split('.')

            if (version_list.length > 0) { node_webkit__major = parse_integer__or__NaN(version_list[0]) }
            if (version_list.length > 1) { node_webkit__minor = parse_integer__or__NaN(version_list[1]) }
        }

        Gem.is_node_webkit_12_or_lower  = (node_webkit__major === 0 && node_webkit__minor <= 12)
        Gem.is_node_webkit_13_or_higher = (node_webkit__major >   0 || node_webkit__minor >= 13)
    }
)


//
//  Gem.show_developer_tools
//
if (Gem.is_node_webkit_12_or_lower) {                       //  Show developer tools (nw.js 0.12 or lower)
    Gem.execute(
        function codify__Gem__show_developer_tools() {
            var game_window = require('nw.gui').Window.get()

            return function Gem__show_developer_tools() {
                game_window.showDevTools()
            }
        }
    )
} else if (Gem.is_node_webkit_13_or_higher) {               //  Show developer tools (nw.js 0.13 or higher)
    Gem.execute(
        function codify__Gem__show_developer_tools() {
            var game_window = nw.Window.get()

            return function Gem__show_developer_tools() {
                //
                //  NOTE:
                //      You *MUST* past `false` to `game_window.showDevTools` in version 0.13, or nw.js will
                //      simply exit your program -- which is like really really really annoying -- espeically
                //      the first time, when you don't know what is happening.
                //
                game_window.showDevTools(false)
            }
        }
    )
} else {                                                    //  Not using nw.js: Don't show developer tools
    Gem.execute(
        function codify__Gem__show_developer_tools() {
            return function Gem__show_developer_tools() {
                //  Not using nw.js: Don't show developer tools
            }
        }
    )
}


//
//  Gem.produce_handle_load_error
//
Gem.execute(
    function codify__Gem__produce_handle_load_error() {
        //
        //  NOTE:
        //      We only define `Gem.produce_handle_load_error` (and thus bring up an alert) if six conditions are met:
        //
        //          1)  This is running in Gem debug mode;
        //          2)  This is running in RPG Maker MV "test" mode;
        //          3)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.);
        //          4)  The browser has a `.addEventListener`   method (all modern browsers do);
        //          5)  The browser has a `.createElement.bind` method (all modern browsers do); AND
        //          6)  The browser has a `.setAttribute`       method (all modern browsers do).
        if (
               Gem.debug
            && ('Utils' in window) && Utils.isNwjs()
            && Utils.isOptionValid('test')
            && ('addEventListener' in document)
            && ('bind'             in document.createElement)
            && ('setAttribute'     in document.head)
        ) {
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
            var alert                = window.alert
            var show_developer_tools = Gem.show_developer_tools

            return function Gem__produce_handle_load_error(path) {
                return function handle_load_error() {
                    alert('Failed to load ' + path + ': please see Developer Tools for full error')
                    show_developer_tools()
                }
            }
        }

        //
        //  Otherwise:
        //      We set `produce_handle_load_error` to `false`, to indicate we can't handle load errors
        //
        Gem.produce_handle_load_error = false
    }
)


//
//  Gem.load_script
//
if (Gem.produce_handle_load_error) {
    //
    //  NOTE:
    //      We have tested above that this is modern browser that supports `.createElement.bind`, `.setAttribute` &
    //      `.addEventListener`.
    //
    Gem.execute(
        function codify__Gem__load_script() {
            //
            //  Imports
            //
            var create_script_tag         = document.createElement.bind(document, 'script')//  Creates a `<script>` tag
            var produce_handle_load_error = Gem.produce_handle_load_error
            var scripts                   = Gem.scripts


            return function Gem__load_script(container, path) {
                var script_data       = scripts[path]                 = {}
                var tag               = script_data.tag               = create_script_tag()
                var handle_load_error = script_data.handle_load_error = produce_handle_load_error(path)

                tag.setAttribute('src', path)                   //  Modify to `<script src='path`></script>`
                tag.addEventListener('error', handle_load_error)//  Handle any load errors

                container.appendChild(tag)                      //  Attempt to load 'path' via the `<script>` tag.
            }
        }
    )
} else {
    //
    //  NOTE:
    //      If there is no 'AddEventListener' we could do:
    //
    //          tag.onerror = handle_load_error                 //  Alert user if any error happens (alternate method)
    //
    //      However, all modern browsers have an 'addEventListener', no need to be backwards compatiable with super
    //      super old browsers.
    //
    //      More importantly, we can't test this code -- untested code should not be inplemented.
    //
    //  NOTE #2:
    //      We don't know if this browser supports `.setAttribute` or not, so just in case ... test for it.
    //
    Gem.execute(
        function codify__Gem__load_script() {
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

            var scripts = Gem.scripts


            return function Gem__load_script(container, path) {
                var script_data = scripts[path]   = {}
                var tag         = script_data.tag = create_script_tag()

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
//  Load Gem/Beryl/Boot.js
//
//  NOTE:
//      Temporarily inserted into `document.head` -- will be moved later.
//
Gem.execute(
    function execute__load_next_script() {
        Gem.load_script(document.head, Gem.beryl_boot_path)
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
if (Gem.debug) {
    Gem.execute(
        function execute__reference_at_least_one_function_to_avoid_garbage_collection_of_this_source_file() {
            Gem.sources.js_plugins_Beryl = Gem.show_developer_tools
        }
    )
}


//
//  At this point, as part of the boot process, the following is defined in `Gem`:
//
//      .clarity                      : true                    Clarity mode
//      .debug                        : true                    Debug mode
//      .is_node_webkit_12_or_lower   : true or false           True if using nw.js & it's version 0.12 or lower
//      .is_node_webkit_13_or_greater : true or false           True if using nw.js & it's version 0.13 or greater
//      .load_script                  : function                Load a script using `<script>` tag.
//      .produce_handle_load_error    : function                Produce code to handle load errors of `<script>` tags
//
//      .scripts : {                                            Map of all the scripts loaded (or loading)
//          ['Gem/Beryl/Boot.js'] : {                               Currently loading "Gem/Beryl/Boot.js"
//              tag               : <script src='Gem/Beryl/Boot.js'>    `<script>` tag to load "Gem/Beryl/Boot.js".
//              handle_load_error : function                            Handle any load errors from 'Gem/Beryl/boot.js"
//          }
//      }
//
//      .show_developer_tools : function                        Show developer tools window
//
//      .sources : {                                            Sources to "hold onto" for Developer Tools
//          js_plugins_Beryl : function                             Avoid garbage collection of 'js/plugins/Beryl.js'
//      }
//
//  Also the following temporary members of `Gem` exist, which will be deleted in Gem/Beryl/boot.js:
//
//      .beryl_boot_path         : 'Gem/Beryl/Boot.js'          Next file to load
//      .execute                 : function                     Bootstrap function to execute code
//


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
