//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Beryl: Boot Engine, Reliable Yet Limber
//
"use strict"                                                //  Strict mode helps catch JavaScript errors, very useful!


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
        sources         : {},                               //  Sources to "hold onto" for Developer Tools -- see below


        //
        //  execute:
        //      Temporary function to execute code inside a function (to allow local variables)
        //
        //      If a function is returned then it is "codified" under it's name, ignoring it's first 5 characters
        //      (i.e.:  ignoring the 'Gem__' prefix).
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
    function extract__node_webkit__version() {
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
//  Gem.beryl_boot_error
//
//  NOTE:
//      We only define `Gem.beryl_boot_error` (and thus bring up an alert) if four conditions are met:
//
//          1)  This is running in Gem debug mode;
//          2)  This is running in RPG Maker MV "test" mode;
//          3)  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.); AND
//          4)  The browser has a `.addEventListener` method (all modern browsers do).
//
if (
       Gem.debug
    && ('Utils' in window) && Utils.isNwjs()
    && Utils.isOptionValid('test')
    && ('addEventListener' in document)
) {
    //
    //  NOTE:
    //      There is no way to get the error message, if there is one, when attempting to load Gem/Boot.Beryl.js
    //      (You can't use try/catch on a <script></script> tag that is inserted into the DOM).
    //
    //      Hence in case of an error, the following is done:
    //
    //          1)  Alert the user with an alert message which says to see Developer Tools for full error;
    //          2)  Force the user to acknowledge the alert box by hitting 'OK';
    //          3)  Then, and only then, bring up Developer tool, so the user can read the rest of the error.
    //
    Gem.execute(
        function codify__Gem__beryl_boot_error() {
            var alert__failed_to_load = window.alert.bind(
                    window,
                    (
                          'Failed to load'
                        + ' ' + Gem.beryl_boot_path
                        + ': please see Developer Tools for full error'
                    )//,
                )

            var show_developer_tools = Gem.show_developer_tools

            return function Gem__beryl_boot_error() {
                alert__failed_to_load()
                show_developer_tools()
            }
        }
    )
}


//
//  Append `<script src='Gem/Beryl/Boot.js'>` to `document.head`
//
Gem.execute(
    function execute__load__beryl_boot_path() {
        var script = Gem.beryl_script = document.createElement('script')  //  Create an element: `<script></script>`

        script.src = Gem.beryl_boot_path                    //  Modify to `<script src='Gem/Beryl/Boot.js></script>`

        if (Gem.beryl_boot_error) {                         //  *IF* four conditions above met, then:
            if (script.addEventListener) {
                script.addEventListener('error', Gem.beryl_boot_error)    //  Alert user if any error happens
            }

            //
            //  Note, we could do:
            //
            //      else {
            //          script.onerror = Gem.beryl_boot_error   //  Alert user if any error happens (alternate method)
            //      }
            //      
            //  However, all modern browsers have an 'addEventListener', no need to be backwards compatiable with
            //  super super old browsers.
            //
            //  More importantly, we can't test this code -- untested code should not be inplemented.
            //
        }

        document.head.appendChild(script)                       //  Attempt to load 'Gem/Beryl/Boot.js' as a module
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
//  NOTE:
//      This code is commented out, as 'Gem.show_developer_tools' is function that does not get garbage collected.
//
if (Gem.debug) {
    //  Gem.sources.js_plugins_Gem = function() {}          //  Not needed due to `Gem.show_develoer_tools` above
}


//
//  Cleanup
//
Gem.execute(
    function execute__cleanup() {
        delete Gem.execute
    }
)


//
//  At this point, as part of the boot process, the following is defined in `Gem`:
//
//      .beryl_boot_error  : function                           Temporary - will be deleted in Gem/Beryl.boot.js
//      .beryl_boot_path   : 'Gem/Beryl/Boot.js'                Temporary - will be deleted in Gem/Beryl.boot.js
//      .beryl_boot_script : <script src='Gem/Beryl/Boot.js'>   Temporary - will be deleted in Gem/Beryl.boot.js
//
//      .clarity                      : true                    Clarity mode
//      .debug                        : true                    Debug mode
//      .is_node_webkit_12_or_lower   : true or false           True if using nw.js & it's version 0.12 or lower
//      .is_node_webkit_13_or_greater : true or false           True if using nw.js & it's version 0.13 or greater
//      .show_developer_tools         : function                Show developer tools window
//      .sources                      : {}                      Sources to "hold onto" for Developer Tools
//


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
