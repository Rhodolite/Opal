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
    Configuration : {                                       //  Gem configuration values.
        box_name      : true,                               //      Name 'box' instances 'Box' in Developer Tools.
        capture_error : false,                              //      Try to capture errors
        clarity       : true,                               //      Set Gem clarity mode to true.
        debug         : true,                               //      Set Gem debug mode to true.
        show_alert    : false,                              //      [Temporary] Use 'alert' to warn of errors
    },

    Beryl : {                                               //  Exports of the Beryl Module.
        //
        //  Gem.Beryl.execute:
        //      Execute code inside a function (to allow local variables)
        //
        //  NOTE:
        //      The reason the function is named `Gem__Beryl__execute` (meaning `Gem.Beryl.execute`) is so that it
        //      shows up in stack traces as the full name `Gem__Beryl__execute` instead of shorter name `execute`
        //      (this is really really helpful when reading stack traces).
        //
        execute : function Gem__Beryl__execute(code) {
            code()
        }//,

        //  clarity_note          : Function                //      Add a note to a variable or set of variables.
        //  codify_method         : Function                //      Create the code for a method as a closure.
        //  constant              : Function                //      Store a global Gem constant.
        //  method                : Function                //      Define a Gem method.
        //  qualify_constant      : Function                //      Qualify a global Gem constant.
        //  throw_type_error      : Function                //      Throw a type error (wrong argument).
        //  throw_wrong_arguments : Function                //      Throw a type error (wrong number of arguments).
    },

    NodeWebKit: {                                           //  Node WebKit members & methods.
        //  is_version_012_or_lower   : false               //      True if using nw.js & it's version 0.12 or lower.
        //  is_version_013_or_greater : false               //      True if using nw.js & it's version 0.13 or greater.
        //  show_developer_tools      : Function            //      Show developer tools window.
    },

    Script : {                                              //  `<script>` handling
        beryl_boot_path : 'Gem/Beryl/Boot.js',              //      Module to load the rest of Gem modules.
        event_list      : ['abort', 'error', 'load'],       //      [Temporary] List of `<script>` events to listen for.

        //  handle_errors : false,                          //      `true` if handling `<script>` errors.
        //  load          : Function                        //      Load a script using `<script>` tag.

        script_map : {                                      //      Map of all the scripts loaded (or loading)>
            //  ['Gem/Beryl/Boot.js'] : `<script>` tag      //          `<script>` tag to load "Gem/Beryl/Boot.js".
        }//,

        //
        //  NOTE:
        //      The rest of attributes are only used if `Gem.Script.handle_errors` is `true`.
        //
        //  handle_global_error : Function                  //      Handle errors when executing a `<script>` tag>
        //  handle_event        : Function                  //      Handle events of `<script>` tags>
        //  source_attribute    : Function                  //      Get unmodified `.src` attribute.
    },

    Source : {                                              //  Functions to "hold onto" for Developer Tools>
        //  js_plugins_Beryl : Function                     //      Avoid garbage collection of 'js/plugins/Beryl.js'>
    },

    _ : {                                                   //  Private members & methods of all Gem modules.
        Beryl : {                                           //      Private members & methods of module Beryl.
        //  clarity_mode$global_variable_Gem_changed : []//,//      Callbacks to call when `Gem` is changed.
        }//,
    },

}


//
//  Gem.Beryl.{clarity_note,codify_method,constant,method,qualify_constant}
//
//  OLD NOTE: can be executed twice in clarity mode.  (Need this?)
//
Gem.Beryl.execute(
    function execute$setup__Gem() {
        //
        //  Imports
        //
        var clarity         = Gem.Configuration.clarity
        var create_Object   = Object.create
        var define_property = Object.defineProperty


        //
        //  Closures
        //      Read 'visible' to mean 'enumerable'.
        //
        //      Enumerable properties are shown better in Developer Tools (at the top of the list,
        //      and not grayed out).
        //
        var visible_constant_attribute = create_Object(
                null,
                {
                //  configurable : { value : false },       //  Default value, no need to set
                    configurable : { value : true  },       //  TEMPORARY!
                    enumerable   : { value : true  },       //  Visible (i.e.: enumerable)
                //  writable     : { value : false }//,     //  Default value, no need to set
                }//,
            )


        if (clarity) {
            //
            //  `if (7)` means "always".
            //
            //      Used to enclose a section of code in '{' ... '}' to make it group the statements together, and
            //      make the code easier to read.
            //
            if (7) {
                function who_what(module, $who, $what) {
                    visible_constant_attribute.value = $who
                    define_property(module, '$who', visible_constant_attribute)

                    visible_constant_attribute.value = $what
                    define_property(module, '$what', visible_constant_attribute)

                    delete visible_constant_attribute.value
                }

                who_what(Gem,            'Gem',            'The only global variable used by Gem.')
                who_what(Gem.Beryl,      'Gem.Beryl',      'Exports of the Beryl module.')
                who_what(Gem.Script,     'Gem.Script',     '`<script>` handling')
                who_what(Gem.NodeWebKit, 'Gem.NodeWebKit', 'Node WebKit members & methods')
            }


            var throw_must_be_number = function Gem__Beryl__throw_must_be_number(name, v) {
                //  Throw a type error when a parameter is not a number.

                if (7) {
                    if (arguments.length !== 2) {
                        throw_wrong_arguments('Gem.Beryl.throw_must_be_number', 2, arguments.length)
                    }

                    if (typeof name !== 'string') { throw_must_be_string('name', name) }
                    //  `v` can by any type (though obviously is not a string)
                }

                throw_type_error('parameter `' + name + '` must be a number; was instead', v)
            }


            var throw_must_be_string = function Gem__Beryl__throw_must_be_string(name, v) {
                //  Throw a type error when a parameter is not a string.

                if (7) {
                    if (arguments.length !== 2) {
                        throw_wrong_arguments('Gem.Beryl.throw_must_be_string', 2, arguments.length)
                    }

                    if (typeof name !== 'string') { throw_must_be_string('name', name) }
                    //  `v` can by any type (though obviously is not a number)
                }

                throw_type_error('parameter `' + name + '` must be a string; was instead', v)
            }


            var throw_type_error = function Gem__Beryl__throw_type_error(prefix, v) {
                //  Throw a type error (usually used when a method received invalid parameters).

                if (7) {
                    if (arguments.length !== 2) {
                        throw_wrong_arguments('Gem.Beryl.throw_type_error', 2, arguments.length)
                    }

                    if (typeof prefix !== 'string') { throw_must_be_string(prefix, 'prefix') }
                    //  `v` handled below
                }

                if (typeof v === 'function') {
                    if (v.name.length) {
                        var suffix = ' a function named `' + v.name + '`'
                    } else {
                        var suffix = ' an unnamed function'
                    }
                } else {
                    if (typeof v === 'undefined') {
                        var suffix = ' `undefined`'
                    } else {
                        var suffix = ' the value: ' + v.toString()
                    }
                }

                var message = 'TypeError: ' + prefix + suffix

                throw new Error(message)
            }


            var throw_wrong_arguments = function Gem__Beryl__throw_wrong_arguments(name, actual, expected) {
                //  Throw a type error when a method receives wrong number of arguments.

                if (7) {
                    if (arguments.length !== 3) {
                        throw_wrong_arguments('Gem.Beryl.throw_wrong_arguments', 3, arguments.length)
                    }

                    if (typeof name     !== 'string') { throw_must_be_string('name',     name)     }
                    if (typeof actual   !== 'number') { throw_must_be_number('actual',   actual)   }
                    if (typeof expected !== 'number') { throw_must_be_number('expected', expected) }
                }

                if (expected === 0) {
                    var takes = 'takes no arguments'
                } else if (expected == 1) {
                    var takes = 'takes exactly 1 argument'
                } else {
                    var takes = 'takes exactly ' + expected.toString() + ' arguments'
                }

                var message = 'TypeError: function `' + name + '` ' + takes + ' (' + actual.toString() + ' given)'

                throw new Error(message)
            }
        }


        //
        //  Gem.Beryl.method
        //      Store a Gem Method.
        //
        //      Also in clarity mode adds a `.$who` and `.$what` attributes to the method.
        //
        if (clarity) {
            var method = function Gem__Beryl__method(who, $what, method) {
                //  Store a Gem Method.
                //
                //  Also in clarity mode adds a `.$who` and `.$what` attributes to the method.

                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Beryl.method', 3, arguments.length)
                }

                var method_name = this.$who.replace('.', '__') + '__' + who

                if (typeof method !== 'function' || method_name !== method.name) {
                    throw_type_error(
                            (
                                  'parameter `method` must be a function named `' + method_name + '`'
                                + '; was instead'
                            ),
                            method//,
                        )
                }

                visible_constant_attribute.value = method
                define_property(this, who, visible_constant_attribute)

                if (7) {
                    visible_constant_attribute.value = this.$who + '.' + who
                    define_property(method, '$who', visible_constant_attribute)

                    visible_constant_attribute.value = $what
                    define_property(method, '$what', visible_constant_attribute)
                }

                delete visible_constant_attribute.value
            }


            //
            //   Use `method` on itself ...
            //
            method.call(
                Gem.Beryl,
                'method',
                (
                       'Store a Gem Method.\n'
                     + '\n'
                     + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the method.'
                ),
                method//,
            )
        } else {
            var method = function Gem__Beryl__method(who, $what, method) {
                //  Store a Gem Method.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = method
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }

            method.call(Gem.Beryl, 'method', null, method)  //   Use `method` on itself ...
        }


        //
        //  Gem.Beryl.clarity_note
        //      Add a note to a variable or set of variables (clarity mode only).
        //
        if (Gem.Configuration.clarity) {
            Gem.Beryl.method(
                'clarity_note',
                'Add a note to a variable or set of variables (clarity mode only).',
                function Gem__Beryl__clarity_note(who, $what) {
                    //  Add a note to a variable or set of variables (clarity mode only)

                    if (arguments.length !== 2) {
                        throw_wrong_arguments('Gem.Beryl.clarity_note', 2, arguments.length)
                    }

                    visible_constant_attribute.value = $what
                    define_property(this, who + '$NOTE', visible_constant_attribute)
                    delete visible_constant_attribute.value
                }
            )
        } else {
            Gem.Beryl.method(
                'clarity_note',
                'Empty function -- nothing to do, not in clarity mode',
                function Gem__Beryl__clarity_note(/*who, $what*/) {
                    //  Nothing to do, not in clarity mode
                }
            )
        }


        //
        //  Gem.Beryl.codify_method:
        //      Create the code for a method as a closure to avoid the use of any global variables.
        //
        //      Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
        //
        if (clarity) {
            Gem.Beryl.method(
                'codify_method',
                (
                      'Create the code for a method as a closure to avoid the use of any global variables.\n'
                    + '\n'
                    + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the function.'
                ),
                function Gem__Beryl__codify_method(who, $what, codifier) {
                    //  Create the code for a method as a closure to avoid the use of any global variables.
                    //
                    //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.

                    var middle        = this.$who.replace('.', '__')
                    var codifier_name = 'codifier$' + middle + '__' + who
                    var method_name   =                middle + '__' + who

                    if (arguments.length !== 3) {
                        throw_wrong_arguments('Gem.Beryl.codify_method', 3, arguments.length)
                    }

                    if (typeof codifier !== 'function' || codifier_name !== codifier.name) {
                        throw_type_error(
                                (
                                      'parameter `codifier` must be a function named `' + codifier_name + '`'
                                    + '; was instead'
                                ),
                                codifier//,
                            )
                    }

                    var method = codifier()

                    if (typeof method !== 'function' || method_name !== method.name) {
                        throw_type_error(
                                (
                                      'codifier `' + codifier_name + '`'
                                    + ' must return a function named `'  + method_name + '`'
                                    + '; instead returned'
                                ),
                                method//,
                            )
                    }

                    visible_constant_attribute.value = method
                    define_property(this, who, visible_constant_attribute)

                    if (7) {
                        visible_constant_attribute.value = this.$who + '.' + who
                        define_property(method, '$who', visible_constant_attribute)

                        visible_constant_attribute.value = $what
                        define_property(method, '$what', visible_constant_attribute)
                    }

                    delete visible_constant_attribute.value
                }
            )
        } else {
            Gem.Beryl.method(
                'codify_method',
                null,
                function Gem__Beryl__codify_method(who, $what, codifier) {
                    //  Create the code for a method as a closure to avoid the use of any global variables.
                    //
                    //  Ignores the `$what` parameter, which is only used in clarity mode.

                    visible_constant_attribute.value = codifier()
                    define_property(this, who, visible_constant_attribute)
                    delete visible_constant_attribute.value
                }
            )
        }


        //
        //  Gem.Beryl.constant:
        //      Store a global Gem constant.
        //
        //      Ignores the `$what` parameter, which is only used in clarity mode.
        //
        Gem.Beryl.method(
            'constant',
            null,
            function Gem__Beryl__constant(who, $what, constant) {
                //  Store a global Gem constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = constant
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        )


        if (clarity) {
            var simple$constant = Gem.Beryl.constant

            Gem.Beryl.method(
                'constant',
                null,
                function Gem__Beryl__constant(who, $what, qualifier) {
                    //  Brief temporary version --  See "Gem/Beryl/Boot2_Clarity.js" for the real version.

                    simple$constant.call(this, who, $what, qualifier)

                    if (7) {
                        visible_constant_attribute.value = $what
                        define_property(this, who + '$', visible_constant_attribute)
                        delete visible_constant_attribute.value
                    }
                }
            )
        }


        //
        //  Gem.Beryl.qualify_constant
        //      Qualify a global Gem constant.
        //
        //      The `qualifier` argument is a function that returns the value of the constant.
        //
        //      Ignores the `$what` parameter, which is only used in clarity mode.
        //
        Gem.Beryl.method(
            'qualify_constant',
            null,
            function Gem__Beryl__qualify_constant(who, $what, qualifier) {
                //  Qualify a global Gem constant.
                //
                //  The `qualifier` argument is a function that returns the value of the constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = qualifier()
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        )


        if (clarity) {
            var simple$qualify_constant = Gem.Beryl.qualify_constant

            Gem.Beryl.method(
                'qualify_constant',
                null,
                function Gem__Beryl__qualify_constant(who, $what, qualifier) {
                    //  Brief temporary version --  See "Gem/Beryl/Boot2_Clarity.js" for the real version.

                    simple$qualify_constant.call(this, who, $what, qualifier)

                    if (7) {
                        visible_constant_attribute.value = $what
                        define_property(this, who + '$', visible_constant_attribute)
                        delete visible_constant_attribute.value
                    }
                }
            )
        }


        //
        //  visible_constant_attribute
        //      A property used to create visible (i.e.: enumerable) constant attributes
        //
        Gem.Beryl.constant(
            'visible_constant_attribute',
            'A property used to create visible (i.e.: enumerable) constant attributes.',
            visible_constant_attribute//,
        )
    }
)


//
//  Gem._.Beryl.gem_changed
//      Array of callback's when `Gem` is changed (clarity mode only).
//
if (Gem.Configuration.clarity) {
    Gem.Beryl.constant.call(
        Gem._.Beryl,
        'clarity_mode$global_variable_Gem_changed',
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
Gem.Beryl.execute(
    function execute$qualify__Gem__NodeWebKit__version() {
        //
        //  Imports
        //
        var parse_integer__or__NaN = Number.parseInt


        //
        //  Calculate Node WebKit version
        //
        var major = NaN
        var minor = NaN
        var version = (('process' in window) && ('versions' in process) && (process.versions['node-webkit']))

        if (typeof version == 'string') {
            var version_list = version.split('.')

            if (version_list.length > 0) { major = parse_integer__or__NaN(version_list[0]) }
            if (version_list.length > 1) { minor = parse_integer__or__NaN(version_list[1]) }
        }


        //
        //  Exports
        //
        Gem.Beryl.constant.call(
            Gem.NodeWebKit,
            'is_version_012_or_lower',
            "`true` if using nw.js & it's version 0.12 or lower.",
            (major === 0 && minor <= 12)//,
        )

        Gem.Beryl.constant.call(
            Gem.NodeWebKit,
            'is_version_013_or_higher',
            "`true` if using nw.js & it's version 0.13 or greater.",
            (major >  0 || minor >= 13)//,
        )

        Gem.Beryl.clarity_note.call(
            Gem.NodeWebKit,
            'is_version_{012_or_lower,013_or_higher}',
            'If not using nw.js, then both `.is_version_{012_or_lower,013_or_higher}` will be `false`.'//,
        )
    }
)


//
//  Gem.NodeWebKit.show_developer_tools
//      Show developer tools.
//
if (Gem.NodeWebKit.is_version_012_or_lower) {               //  Show developer tools (nw.js 0.12 or lower)
    Gem.Beryl.codify_method.call(
        Gem.NodeWebKit,
        'show_developer_tools',
        'Show developer tools (nw.js 0.12 or lower).',
        function codifier$Gem__NodeWebKit__show_developer_tools() {
            var game_window = require('nw.gui').Window.get()

            return function Gem__NodeWebKit__show_developer_tools() {
                //  Show developer tools (nw.js 0.12 or lower).

                game_window.showDevTools()
            }
        }
    )
} else if (Gem.NodeWebKit.is_version_013_or_higher) {       //  Show developer tools (nw.js 0.13 or higher)
    Gem.Beryl.codify_method.call(
        Gem.NodeWebKit,
        'show_developer_tools',
        'Show developer tools (nw.js 0.13 or higher).',
        function codifier$Gem__NodeWebKit__show_developer_tools() {
            var game_window = nw.Window.get()

            return function Gem__NodeWebKit__show_developer_tools() {
                //  Show developer tools (nw.js 0.13 or higher).

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
    Gem.Beryl.method.call(
        Gem.NodeWebKit,
        'show_developer_tools',
        "Empty function -- Not using nw.js: Don't show developer tools.",
        function Gem__NodeWebKit__show_developer_tools() {
            //  Empty function -- Not using nw.js: Don't show developer tools.
        }
    )
}


//
//  Gem.Script.handle_errors
//
//  NOTE:
//      We only handle script events (and thus bring up an alert) if six conditions are met:
//
//          1.  Configured to capture errors (i.e.: `Gem.Configuration.capture_error` is set);
//          2.  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.);
//          3.  This is running in RPG Maker MV "test" mode;
//          4.  The browser has a `.addEventListener` method (all modern browsers do);
//          5.  The browser has a `.setAttribute`     method (all modern browsers do).
//
Gem.Beryl.constant.call(
    Gem.Script,
    'handle_errors',
    '`true` if handling `<script>` errors.',
    (
           Gem.Configuration.capture_error                  //  1.  Configured to capture errors;
        && ('Utils' in window) && Utils.isNwjs()            //  2.  This is running under nw.js;
        && Utils.isOptionValid('test')                      //  3.  This is running in RPG Maker MV "test" mode;
        && ('addEventListener' in window)                   //  4.  The browser has a `.addEventListener` method; AND
        && ('setAttribute'     in document.head)            //  5.  The browser has a `.setAttribute`     method.
    )//,
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
        Gem.Beryl.method.call(
            Gem.Script,
            'source_attribute',
            'Get an unmodified `.src` attribute from a DOM (domain object model) element.',
            function Gem__Script__source_attribute(tag) {
                //  Get unmodified `.src` attribute

                return tag.getAttribute('src')          //  Get unmodified `.src` attribute
            }
        )
    } else {
        Gem.Beryl.codify_method.call(
            Gem.Script,
            'source_attribute',
            'Get an unmodified `.src` attribute from a DOM (domain object model) element.',
            function codifier$Gem__Script__source_attribute() {
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
//  Gem.Script.error
//      Show an error (either with `alert` or `console.error`).
//
if (Gem.Script.handle_errors) {
    Gem.Beryl.codify_method.call(
        Gem.Script,
        'error',
        'Show an error (either with alert or console.error).',
        function codifier$Gem__Script__error() {
            var show_developer_tools = Gem.NodeWebKit.show_developer_tools


            if (Gem.Configuration.show_alert) {
                var alert = window.alert

                return function Gem__Script__error(message) {
                    alert(message + '\n' + 'Please see Developer Tools for full error')
                    show_developer_tools()
                }
            }


            if ('bind' in console.error) {
                var console_error = console.error.bind(console)
            } else {
                var console_error = function OLD_WAY__console_error(message) {
                    console.error(message)
                }
            }

            return function Gem__Script__error(message) {
                console_error(message)
                show_developer_tools()
            }
        }//,
    )
}


//
//  Gem.Script.handle_global_error
//      Handle errors when executing a `<script>` tag.
//
if (Gem.Script.handle_errors) {
    Gem.Beryl.codify_method.call(
        Gem.Script,
        'handle_global_error',
        'Handle errors when executing a `<script>` tag.',
        function codifier$Gem__Script__handle_global_error() {
            //
            //  Imports
            //
            var document             = window.document
            var source_attribute     = Gem.Script.source_attribute
            var error                = Gem.Script.error


            function Gem__Script__handle_global_error(e) {
                //  Handle errors when executing a `<script>` tag

                if ( ! ('currentScript' in document))  {
                    return
                }

                var tag = document.currentScript

                if ( ! tag) {
                    return
                }

                error(source_attribute(tag) + '#' + e.lineno + ': ' + e.error)
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
    Gem.Beryl.codify_method.call(
        Gem.Script,
        'handle_event',
        'Handle events of `<script>` tags.',
        function codifier$Gem__Script__handle_event() {
            //
            //  NOTE:
            //      There is no way to get the error message, if there is one, when attempting to load
            //      Gem/Boot/Beryl.js (You can't use try/catch on a `<script>` tag that is inserted into the DOM).
            //
            //      Hence in case of an error, the following is done:
            //
            //          1.  Alert the user with an alert message which says to see Developer Tools for full error;
            //          2.  Force the user to acknowledge the alert box by hitting 'OK';
            //          3.  Then, and only then, bring up Developer tool, so the user can read the rest of the error.
            //
            //  NOTE #2:
            //      The previous note means there is no way to get the loading error messge (i.e.: if the file
            //      does not exist, or there is an error while transferring it HTTP).
            //
            //      Any syntax error (on successful load) can be caught & is caught by `Gem.Script.handle_global_error`
            //      above.
            //
            var error             = Gem.Script.error
            var source_attribute  = Gem.Script.source_attribute
            var script_event_list = Gem.Script.event_list


            var script_handle_event = function Gem__Script__handle_event(e) {
                //  Handle events of `<script>` tags

                var tag = e.target

                for (var i = 0; i < script_event_list.length; i ++) {
                    var type = script_event_list[i]

                    tag.removeEventListener(type, script_handle_event)
                }

                if (e.type === 'abort' || e.type === 'error') {
                    error(source_attribute(tag) + ': Failed to load')
                }
            }


            return script_handle_event
        }
    )
}


//
//  Gem.Script.gem_scripts
//
Gem.Beryl.qualify_constant.call(
    Gem.Script,
    'gem_scripts',
    '`div#gem_scripts` is the parent of all Gem `<script>` tags and is inserted into `document.head`.',
    function qualifier$Gem__Script__gem_scripts() {
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

        return gem_scripts
    }
)


//
//  Gem.Script.codify_load
//      Codify method `Gem.Script.load`.
//
//      This routine can be called multiple times:
//
//          1.  Here;
//          2.  Again, in clarity mode in 'Gem/Beryl/Boot2_Clarity.js' (REALLY -- VERIFY THIS?)
//          3.  Again, in clarity mode, after `Gem` is replaced.
//
Gem.Beryl.codify_method.call(
    Gem.Script,
    'codify_method_load',
    (
          'Codify method `Gem.Script.load`.\n',
        + '\n'
        + 'This routine can be called multiple times:\n'
        + '\n'
        + '    1.  Here;\n'
        + '    2.  Again, in Clarity mode, after global variable `Gem` is replaced.'
    ),
    function codifier$Gem__Script__codify_method_load() {
        //
        //  Imports
        //
        var gem_scripts       = Gem.Script.gem_scripts
        var handle_errors     = Gem.Script.handle_errors
        var script_event_list = Gem.Script.event_list
//      var script_map        = Gem.Script.script_map       //  Not valid here -- *MUST* be done below

        if (handle_errors) {
            var script_handle_event = Gem.Script.handle_event
        }


        //
        //  Closures
        //
        if ('bind' in gem_scripts.appendChild) {
            var append_child = gem_scripts.appendChild.bind(gem_scripts)    //  Append to `gem_scripts`
        } else {
            var append_child = function OLD_WAY__append_child(tag) {
                gem_scripts.appendChild(tag)                       //  Old way: Append to `gem_scripts`
            }
        }


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


        //
        //  Gem.Script.codify_load
        //      Codify method `Gem.Script.load`.
        //
        //      This routine can be called multiple times:
        //
        //          1.  Here;
        //          2.  Again, in clarity mode in 'Gem/Beryl/Boot2_Clarity.js' (REALLY -- VERIFY THIS?)
        //          3.  Again, in clarity mode, after `Gem` is replaced.
        //
        if (handle_errors) {
            return function Gem__Script__codify_method_load() {
                Gem.Beryl.codify_method.call(           //  `Gem.Script.codify_method` might not exist; so use `.call`
                    Gem.Script,
                    'load',
                    (
                          'Load JavaScript code using a `<script>` tag.\n'
                        + '(Version for a modern browser).'
                    ),
                    function codifier$Gem__Script__load() {
                        //
                        //  Grab "newest" version of `Gem.Script.gem_scripts`
                        //  (Needed if global variable `Gem` has changed in clarity mode).
                        //
                        var script_map = Gem.Script.script_map


                        //
                        //  Gem.Script.load
                        //      Load JavaScript code using a `<script>` tag.
                        //      (Version for a modern browser).
                        //
                        //  NOTE #1:
                        //      We have tested above that this is modern browser that supports both `.setAttribute` &
                        //      `.addEventListener`.
                        //
                        //  NOTE #2:
                        //      Annoyingly enough events on `<script>` tags do not bubble on purpose.
                        //
                        //      `<script>` tags fire "simple events" which according to section 7.1.5.3 of
                        //      https://www.w3.org/TR/html5/webappapis.html#fire-a-simple-event means:
                        //
                        //          "Firing a simple event named e means that a trusted event with the name e, which
                        //          does not bubble"
                        //
                        //          Hence we have to set the 'abort', 'error', & 'load' events on each individual
                        //          `<script>` tag.
                        //
                        return function Gem__Script__load(path) {
                            //  Load JavaScript code using a `<script>` tag.
                            //  (Version for a modern browser).

                            var tag = script_map[path] = create_script_tag()    //  Create `<script></script>`

                            tag.setAttribute('src', path)               //  Modify to `<script src='path'></script>`

                            //
                            //  Handle script events 'abort', 'error', & 'load'
                            //
                            for (var i = 0; i < script_event_list.length; i ++) {
                                var type = script_event_list[i]

                                tag.addEventListener(type, script_handle_event)
                            }

                            append_child(tag)                   //  Attempt to load 'path' via the `<script>` tag.
                        }
                    }
                )
            }
        }


        return function Gem__Script__codify_method_load() {
            Gem.Beryl.codify_method.call(
                Gem.Script,
                'load',
                (
                      'Load JavaScript code using a `<script>` tag.\n'
                    + '(NO ERROR HANDLING VERSION -- for an ancient browser).'
                ),
                function codifier$Gem__Script__load() {
                    var script_map = Gem.Script.script_map      //  See comment above on Grab "newest" ...


                    //
                    //  Gem.Script.load:
                    //      Load JavaScript code using a `<script>` tag
                    //      (NO ERROR HANDLING VERSION -- for an ancient browser).
                    //
                    //  NOTE:
                    //      This is not a modern browser.  If there is no 'AddEventListener' we could do:
                    //
                    //          tag.onabort = handle_event
                    //          tag.onerror = handle_event      //  Alert user if any error happens (alternate method)
                    //          tag.onload  = handle_event
                    //
                    //      However, all modern browsers have an 'addEventListener', no need to be backwards
                    //      compatiable with super super old browsers.
                    //
                    //      More importantly, we can't test this code -- untested code should not be inplemented.
                    //
                    //  NOTE #2:
                    //      We don't know if this browser supports `.setAttribute` or not, so just in case ... test
                    //      for it.
                    //
                    return function Gem__Script__load(path) {
                        //  Load JavaScript code using a `<script>` tag
                        //  (NO ERROR HANDLING VERSION -- for an ancient browser).

                        var tag = script_map[path] = create_script_tag()

                        if ('setAttribute' in tag) {        //  Is this a modern browser?
                            tag.setAttribute('src', path)   //      New way: Modify to `<script src='path`></script>`
                        } else {                            //  Ancient Browser:
                            tag.src = path                  //      Old way: Modify to `<script src='path'></script>`
                        }

                        append_child(tag)                   //  Attempt to load 'path' via the `<script>` tag.
                    }
                }
            )
        }
    }//,
)


//
//  Execute a codify of:
//      Gem.Script.load
//          Load JavaScript code using a `<script>` tag.
//
//  NOTE:
//      Also does cleanup of `Gem.Script.codify_method_load` if not in clarity mode.
//
Gem.Beryl.execute(
    function execute$execute_and_cleanup$codify_method_load() {
        //  Imports
        var clarity            = Gem.Configuration.clarity
        var codify_method_load = Gem.Script.codify_method_load

        codify_method_load()                                //  Call first time here ...

        if (clarity) {
            //  Clarity mode will call `codify_method_load` again later.
        } else {
            delete Gem.Script.codify_method_load            //  Not clarity mode -- don't need to keep this around
        }
    }
)


//
//  Cleanup
//
Gem.Beryl.execute(
    function execute$cleanup__Gem() {
        delete Gem.Configuration.show_alert
        delete Gem.Script       .event_list
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
    Gem.Beryl.execute(
        function execute$reference_at_least_one_function_to_avoid_garbage_collection_of_this_source_file() {
            Gem.Source.js_plugins_Beryl = Gem.NodeWebKit.show_developer_tools
        }
    )
}


//
//  Load either:
//      Gem/Beryl/Boot2_Clarity.js      -- Clairty mode
//      Gem/Beryl/Boot.js               -- Non Clarity mode
//
Gem.Beryl.execute(
    function execute$load_next_script() {
        //
        //  Imports
        var clarity = Gem.Configuration.clarity


        //
        //  Load next script
        //
        if (clarity) {
            Gem.Script.load('Gem/Beryl/Boot2_Clarity.js')
        } else {
            Gem.Script.load('Gem/Beryl/Boot.js')
        }
    }
)


//
//  At this point, as part of the boot process, `Gem` is now defined as in the original comment above:
//
//      With the exception of:
//
//          `Gem.Configuration.show_alert`  (which has been deleted); and
//          `Gem.Script.event_list`         (which has been deleted).
//


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
