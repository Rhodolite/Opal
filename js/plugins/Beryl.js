//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Beryl: Boot Engine, Reliable Yet Limber
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Create global variable `Gem`
//
//  NOTE:
//      Later `Gem` will be replaced with a proper instance of box "TheOnlyGlobalVariableUsedByGem".
//
window.Gem = {
    Beryl : {                                               //  Exports of Beryl module
    },

    Configuration : {                                       //  Gem configuration values
        box_name : true,                                    //      Name 'box' instances 'Box' in Developer Tools.
        clarity  : true,                                    //      Set Gem clarity mode to true
        debug    : true,                                    //      Set Gem debug mode to true
    },

    NodeWebKit: {                                           //  Node WebKit members & methods
        //  is_version_012_or_lower   : false               //      True if using nw.js & it's version 0.12 or lower
        //  is_version_013_or_greater : false               //      True if using nw.js & it's version 0.13 or greater
        //  show_developer_tools      : Function            //      Show developer tools window
    },

    Script : {                                              //  `<script>` handling
        beryl_boot_path : 'Gem/Beryl/Boot.js',              //      [Temporary] Module to load the rest of Gem modules
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

    _ : {                                                   //  Private members & methods of all Gem modules
        Beryl : {                                           //      Private members & methods of module Beryl
        //  clarity_mode__gem_changed : []//,               //          Callbacks to call when `Gem` is changed
        }//,
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
//  Gem.codify, Gem.qualify, & Gem.qualification_note (can be executed twice in clarity mode)
//
Gem.execute(
    function execute__setup__Gem() {
        //
        //  Imports
        //
        var clarity = Gem.Configuration.clarity
        var Pattern = RegExp


        //
        //  Closures
        //
        var name_pattern = new Pattern(
                  '^Gem'
                +    '\.([A-Za-z_][0-9A-Za-z_]*)'
                + '(?:\.([A-Za-z_][0-9A-Za-z_]*))?'
                + '(?:\.([A-Za-z_][0-9A-Za-z_]*))?'
                + '$'
            )


        if ('bind' in name_pattern.exec) {
            var name_match = name_pattern.exec.bind(name_pattern)
        } else {
            var name_match = function OLD_WAY__name_match(s) {
                return name_pattern.exec(s)
            }
        }


        if (clarity) {
            //
            //  Imports
            //
            var create_Object   = Object.create
            var define_property = Object.defineProperty


            //
            //  Closures
            //      Read 'concealed' to mean 'not enumerable'.
            //
            var concealed_constant_property = create_Object(
                    null//,
                    //{
                    //  configurable : { value : false },               //  Default value, no need to set
                    //  enumerable   : { value : false },               //  Default value, no need to set
                    //  writeable    : { value : false }//,             //  Default value, no need to set
                    //}//,
                )
        }


        //
        //  Gem.codify:
        //      Temporary bootstrap function to create the code for a function or procedure, typically as a closure to
        //      avoid the use of any global variables.
        //
        function codifier__Gem__codify() {
            //
            //  Imports
            //
            var Gem = window.Gem


            return function Gem__codify(who, $what, codifier) {
                //  Temporary bootstrap function to create the code for a function or procedure, typically as a
                //  closure to avoid the use of any global variables.

                var m = name_match(who)

                if ( ! m) {
                    throw Error('Unknown name to codify: ' + who)
                }

                var module = m[1]
                var first  = m[2]
                var second = m[3]

                var codifier_name = 'codifier__Gem__' + module
                var code_name     =           'Gem__' + module

                if (first !== undefined) {
                    codifier_name += '__' + first
                    code_name     += '__' + first
                }

                if (second !== undefined) {
                    codifier_name += '__' + second
                    code_name     += '__' + second
                }

                if (codifier_name !== codifier.name) {
                    throw Error(
                            (
                                  "Codifier must be named '" + codifier_name + "'"
                                + "; was instead named: '"   + codifier.name + "'"
                            )//,
                        )
                }

                var code = codifier()

                if (typeof code === 'undefined') {
                    throw Error(
                            (
                                  'Codifier `' + codifier_name + '`'
                                + ' did not return a function; returned `undefined` instead'
                            )//,
                        )
                }

                if (code_name !== code.name) {
                    throw Error(
                            (
                                  "Codifier `" + codifier_name + "`"
                                +       " must return a function named '"  + code_name + "'"
                                + "; instead returned a function named: '" + code.name + "'"
                            )//,
                        )
                }

                if (clarity) {
                    concealed_constant_property.value = who

                    define_property(code, '$who', concealed_constant_property)

                    concealed_constant_property.value = $what

                    define_property(code, '$what', concealed_constant_property)

                    delete concealed_constant_property.value
                }

                if (first === undefined) {
                    Gem[module] = code

                    return
                }

                if (second === undefined) {
                    Gem[module][first] = code

                    return
                }

                Gem[module][first][second] = code
            }
        }


        var temporary__Gem__codify = codifier__Gem__codify()    //  Grab a temporary copy of `Gem.codify` ...


        temporary__Gem__codify(                         //  ... And use the temporary `Gem.codify` to codify itself ...
            'Gem.codify',
            (
                  'Temporary bootstrap function to create the code for a function or procedure, typically as a'
                + ' closure to avoid the use of any global variables'
                + '.'
            ),
            codifier__Gem__codify//,
        )


        //
        //  Gem.qualify:
        //      Temporary bootstrap function to qualify a global Gem variable
        //      (in clarity mode also adds an explanation of what the variable does).
        //
        //  NOTE #1:
        //      We are using [the less well known secondary] meaning of "qualify", as in the sentence:
        //
        //          `Gem.qualify` is used to "qualify" a value, by making sure it is ready to be used and
        //          is adequate (i.e.: "qualified") for the task.
        //
        //  NOTE #2:
        //      Meaning of "qualify" - a verb (used with object) meaning:
        //
        //          To provide, with attributes neccessary for a task ...
        //
        //          "To qualify oneself for a job"
        //
        //      See: https://www.vocabulary.com/dictionary/qualify
        //           (Explains the two meaning's of "qualify", we are using the second meaning of "qualify")
        //
        //      See also: http://www.dictionary.com/browse/qualify
        //
        //      See also: https://www.merriam-webster.com/dictionary/qualify/
        //
        Gem.codify(
            'Gem.qualify',
            'Qualify a global Gem variable (in clarity mode also adds an explanation of what the variable does).',
            function codifier__Gem__qualify() {
                //
                //  Imports
                //
                var Gem = window.Gem


                return function Gem__qualify(who, $what, value) {
                    //  Qualify a global Gem variable (in clarity mode also adds an explanation of what the variable
                    //  does).

                    var m = name_match(who)

                    if ( ! m) {
                        throw Error('Unknown name to qualify: ' + who)
                    }

                    var module = m[1]
                    var first  = m[2]

                    if (first === undefined) {
                        Gem[module] = value

                        if (clarity) {
                            concealed_constant_property.value = $what

                            define_property(Gem, module + '$', concealed_constant_property)

                            delete concealed_constant_property.value

                            return
                        }

                        return
                    }

                    var second = m[3]

                    if (second === undefined) {
                        Gem[module][first] = value

                        if (clarity) {
                            concealed_constant_property.value = $what

                            define_property(Gem[module], first + '$', concealed_constant_property)

                            delete concealed_constant_property.value

                            return
                        }

                        return
                    }
                    
                    Gem[module][first][second] = value

                    if (clarity) {
                        concealed_constant_property.value = $what

                        define_property(Gem[module][first], second + '$', concealed_constant_property)

                        delete concealed_constant_property.value

                        return
                    }
                }
            }
        )


        //
        //  Gem.qualification_note
        //      Add a qualification note to a variable or set of variables (clarity mode only).
        //
        if (Gem.Configuration.clarity) {
            Gem.codify(
                'Gem.qualification_note',
                'Add a qualification note to a variable or set of variables (clarity mode only).',
                function codifier__Gem__qualification_note() {
                    //
                    //  Imports
                    //
                    var Gem = window.Gem

                    //
                    //  Closures
                    //
                    var note_pattern = new Pattern(
                              '^Gem'
                            +    '\.([A-Za-z_](?:[0-9A-Za-z_]|{[0-9,A-Za-z_]+})*)'
                            + '(?:\.([A-Za-z_](?:[0-9A-Za-z_]|{[0-9,A-Za-z_]+})*))?'
                            + '(?:\.([A-Za-z_](?:[0-9A-Za-z_]|{[0-9,A-Za-z_]+})*))?'
                            + '$'
                        )


                    if ('bind' in note_pattern.exec) {
                        var note_match = note_pattern.exec.bind(note_pattern)
                    } else {
                        var note_match = function OLD_WAY__note_match(s) {
                            return note_pattern.exec(s)
                        }
                    }


                    return function Gem__qualification_note(who, $what) {
                        //  Add a qualification note to a variable or set of variables (clarity mode only)

                        var m = note_match(who)

                        if ( ! m) {
                            throw Error('Unknown name to qualification_note: ' + who)
                        }

                        var module = m[1]
                        var first  = m[2]

                        if (first === undefined) {
                            concealed_constant_property.value = $what

                            define_property(Gem, module + '$NOTE', concealed_constant_property)

                            delete concealed_constant_property.value

                            return
                        }

                        var second = m[3]

                        if (second === undefined) {
                            concealed_constant_property.value = $what

                            define_property(Gem[module], first + '$NOTE', concealed_constant_property)

                            delete concealed_constant_property.value

                            return
                        }
                        
                        concealed_constant_property.value = $what

                        define_property(Gem[module][first], second + '$NOTE', concealed_constant_property)

                        delete concealed_constant_property.value
                    }
                }
            )
        } else {
            Gem.codify(
                'Gem.qualification_note',
                'Empty function -- nothing to do, not in `Gem.Configuration.clarity` mode',
                function codifier__Gem__qualification_note() {
                    return function Gem__qualification_note(/*who, $what*/) {
                        //  Nothing to do, not in `Gem.Configuration.clarity` mode
                    }
                }
            )
        }
    }
)




//
//  Gem._.Beryl.gem_changed
//      Array of callback's when `Gem` is changed (clarity mode only).
//
if (Gem.Configuration.clarity) {
    Gem.qualify(
        'Gem._.Beryl.clarity_mode__gem_changed',
        "Array of callback's when `Gem` is changed (clarity mode only).",
        []//,
    )
}


//
//  Gem.NodeWebKit.is_version_012_or_lower                  - `true` if using nw.js & it's version 0.12 or lower.
//  Gem.NodeWebKit.is_version_013_or_greater                - `true` if using nw.js & it's version 0.13 or greater.
//
//  NOTE:
//      If not using nw.js, then both `Gem.NodeWebKit.is_version_{12_or_lower,13_or_higher}` will be `false`.
//
Gem.execute(
    function execute__qualify__Gem__NodeWebKit__version() {
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


        //
        //  Exports
        //
        Gem.qualify(
            'Gem.NodeWebKit.is_version_012_or_lower',
            "`true` if using nw.js & it's version 0.12 or lower.",
            (major === 0 && minor <= 12)//,
        )

        Gem.qualify(
            'Gem.NodeWebKit.is_version_013_or_higher',
            "`true` if using nw.js & it's version 0.13 or greater.",
            (major >   0 || minor >= 13)//,
        )

        Gem.qualification_note(
            'Gem.NodeWebKit.is_version_{012_or_lower,013_or_higher}',
            'If not using nw.js, then both `.is_version_{012_or_lower,013_or_higher}` will be `false`.',
        )
    }
)


//
//  Gem.NodeWebKit.show_developer_tools
//      Show developer tools
//
if (Gem.NodeWebKit.is_version_012_or_lower) {               //  Show developer tools (nw.js 0.12 or lower)
    Gem.codify(
        'Gem.NodeWebKit.show_developer_tools',
        'Show developer tools (nw.js 0.12 or lower)',
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
        'Gem.NodeWebKit.show_developer_tools',
        'Show developer tools (nw.js 0.13 or higher)',
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
        'Gem.NodeWebKit.show_developer_tools',
        "Empty function -- Not using nw.js: Don't show developer tools",
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
        //      We only handle script events (and thus bring up an alert) if five conditions are met:
        //
        //          1.  This is running in Gem debug mode;
        //          2.  This is running in RPG Maker MV "test" mode;
        //          3.  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.);
        //          4.  The browser has a `.addEventListener`   method (all modern browsers do);
        //          5.  The browser has a `.setAttribute`       method (all modern browsers do).
        //
        if (
                   Gem.Configuration.debug
                && ('Utils' in window) && Utils.isNwjs()
                && Utils.isOptionValid('test')
                && ('addEventListener' in window)
                && ('setAttribute'     in document.head)
        ) {
            //
            //  Exports
            //
            Gem.Script.handle_errors = true
        }
    }
)


//
//  Gem.Script.source_attribute
//      Get an unmodified `.src` attribute from a DOM (domain object model) element.
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
            'Gem.Script.source_attribute',
            'Get an unmodified `.src` attribute from a DOM (domain object model) element.',
            function codifier__Gem__Script__source_attribute(tag) {
                return function Gem__Script__source_attribute(tag) {
                    //  Get unmodified `.src` attribute

                    return tag.getAttribute('src')          //  Get unmodified `.src` attribute
                }
            }
        )
    } else {
        Gem.codify(
            'Gem.Script.source_attribute',
            'Get an unmodified `.src` attribute from a DOM (domain object model) element.',
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
//      Handle errors when executing a `<script>` tag.
//
if (Gem.Script.handle_errors) {
    Gem.codify(
        'Gem.Script.handle_global_error',
        'Handle errors when executing a `<script>` tag.',
        function codifier__Gem__Script__handle_global_error() {
            //
            //  Imports
            //
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
//      Handle events of `<script>` tags.
//
if (Gem.Script.handle_errors) {
    Gem.codify(
        'Gem.Script.handle_event',
        'Handle events of `<script>` tags.',
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


        document.head.appendChild(gem_scripts)


        //
        //  Export
        //
        Gem.Script.gem_scripts = gem_scripts
    }
)


//
//  Gem.Script.load
//      Load JavaScript code using a `<script>` tag.
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
Gem.execute(
    function execute__codify__Gem__Script__load() {
        //
        //  NOTE:
        //      `Gem.Script.event_list` is deleted later in this file; so make sure to grab a copy now, so
        //      it is available, later, if `codifier__Gem__Script__load` is called a second time
        //
        var script_event_list = Gem.Script.event_list


        function codifier__Gem__Script__load() {
            //
            //  Imports
            //
            if ('bind' in document.createElement) {
                //
                //  New way: Creates a `<script>` tag
                //
                var create_script_tag = document.createElement.bind(document, 'script')
            } else {
                //
                //  Old way: Creates a `<script>` tag
                //
                var create_script_tag = function OLD_WAY__create_script_tag() {
                    return document.createElement('script')
                }
            }


            var gem_scripts = Gem.Script.gem_scripts


            if ('bind' in gem_scripts.appendChild) {
                var append_child = gem_scripts.appendChild.bind(gem_scripts)    //  Append to `gem_scripts`
            } else {
                var append_child = function OLD_WAY__append_child(tag) {
                    gem_scripts.appendChild(tag)                       //  Old way: Append to `gem_scripts`
                }
            }


            var script_map = Gem.Script.script_map


            if (Gem.Script.handle_errors) {
                //
                //  NOTE:
                //      We have tested above that this is modern browser that supports both `.setAttribute` &
                //      `.addEventListener`.
                //
                var script_handle_event = Gem.Script.handle_event


                return function Gem__Script__load(path) {
                    //  Load JavaScript code using a `<script>` tag.

                    var tag = script_map[path] = create_script_tag()    //  Create `<script></script>`

                    tag.setAttribute('src', path)                       //  Modify to `<script src='path'></script>`

                    //
                    //  Handle script events 'abort', 'error', & 'load'
                    //
                    for (var i = 0; i < script_event_list.length; i ++) {
                        var type = script_event_list[i]

                        tag.addEventListener(type, script_handle_event)
                    }

                    append_child(tag)                           //  Attempt to load 'path' via the `<script>` tag.
                }
            }


            //
            //  NOTE:
            //      This is not a modern browser.  If there is no 'AddEventListener' we could do:
            //
            //          tag.onabort = handle_event           
            //          tag.onerror = handle_event              //  Alert user if any error happens (alternate method)
            //          tag.onload  = handle_event           
            //
            //      However, all modern browsers have an 'addEventListener', no need to be backwards compatiable
            //      with super super old browsers.
            //
            //      More importantly, we can't test this code -- untested code should not be inplemented.
            //
            //  NOTE #2:
            //      We don't know if this browser supports `.setAttribute` or not, so just in case ... test for it.
            //
            return function Gem__Script__load(path) {
                //  Load JavaScript code using a `<script>` tag.

                var tag = script_map[path] = create_script_tag()

                if ('setAttribute' in tag) {                //  Is this a modern browser?
                    tag.setAttribute('src', path)           //      New way: Modify to `<script src='path`></script>`
                } else {                                    //  Ancient Browser:
                    tag.src = path                          //      Old way: Modify to `<script src='path'></script>`
                }

                append_child(tag)                           //  Attempt to load 'path' via the `<script>` tag.
            }
        }


        Gem.codify(
            'Gem.Script.load',
            'Load JavaScript code using a `<script>` tag.',
            codifier__Gem__Script__load//,
        )


        if (Gem.Configuration.clarity) {
            //
            //  Save callback to recalculate `Gem.Script.load`
            //
            //  NOTE:
            //      When this callback is called later, `Gem.codify` no longer exists.
            //      Hence we do the assignment to `Gem.Script.load` directly.
            //
            Gem._.Beryl.clarity_mode__gem_changed.push(
                function recodify__Gem__Script__load() {
                    Gem.Script.load = codifier__Gem__Script__load()
                }
            )
        }
    }
)


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
