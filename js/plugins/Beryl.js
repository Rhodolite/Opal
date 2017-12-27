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
        capture_error : true,                               //      Try to capture errors
        clarity       : true,                               //      Set Gem clarity mode to true.
        debug         : true,                               //      Set Gem debug mode to true.
        show_alert    : false,                              //      [Temporary] Use 'alert' to warn of errors
        trace         : true,                               //      Trace function, method & bound method calls.
    },

    Core : {                                                //  Basic support code for the Core Gem module.
        execute : function Gem__Core__execute(code) {       //      Stub#1 for Gem.Core.execute
            code()
        }

        //  codify_method    : Function                     //      Create the code for a method as a closure.
        //  clarity_note     : Function                     //      Add a note to a variable or set of variables.
        //  constant         : Function                     //      Store a global Gem constant.
        //  method           : Function                     //      Define a Gem method.
        //  qualify_constant : Function                     //      Qualify a global Gem constant.
    },

    NodeWebKit: {                                           //  Node WebKit members & methods.
        //  is_version_012_or_lower   : false               //      True if using nw.js & it's version 0.12 or lower.
        //  is_version_013_or_greater : false               //      True if using nw.js & it's version 0.13 or greater.
        //  show_developer_tools      : Function            //      Show developer tools window.
    },

    Script : {                                              //  `<script>` handling.
        event_list : ['abort', 'error', 'load'],            //      [Temporary] List of `<script>` events to listen for.

        //  handle_errors : false,                          //      `true` if handling `<script>` errors.
        //  load          : Function                        //      Load a script using `<script>` tag.

        script_map : {                                      //      Map of all the scripts loaded (or loading)>
            //  'Gem/Beryl/Boot2_Manfest.js' : `<script>` tag   //  `<script>` tag to load "Gem/Beryl/Boot.js".
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

    Trace : {                                               //  Map of functions, methods & bound_methods being traced.
        depth   : 0,                                        //      Current tracing depth.
        pending : [],                                       //      Current pending format to start a tracing group.

        //  trace_line  : Function                          //      Start a trace group
        //  trace_start : Function                          //      Start a closed trace group
        //  trace_stop  : Function                          //      End a trace group
    },

    Tracing : {                                             //  Map of functions, methods & bound_methods being traced.
        //  Defined below to allow quoted strings to be used in JavaScript 5.0
    },

    _ : {                                                   //  Private members & methods of all Gem modules.
        Core : {                                            //      Private members & methods of the Core Gem module.
        //  clarity_mode$global_variable_Gem_changed : []   //      Callbacks to call when `Gem` is changed.
        }//,
    }//,
}


Gem.Core.execute(
    function execute$setup_Tracing() {
        //
        //  Configure Tracing
        //
        var Tracing = Gem.Tracing

        Tracing['Gem.Core.execute']                     = 7
        Tracing.execute$setup_Tracing                   = 7
        Tracing.execute$codify$trace$Gem__Core__execute = 7
        Tracing.execute$setup_Gem                       = 7
        Tracing.execute$setup_Gem$who_what              = 7


        //
        //  Define trace functions & trace myself
        //
        if (Gem.Configuration.trace) {
            var Trace = Gem.Trace

            var pending = Trace.pending

            var unbound__group_start_closed = console.groupCollapsed
            var unbound__group_stop         = console.groupEnd
            var unbound__line               = console.log
            var unbound__push               = pending.push
            var unbound__slice              = Array.prototype.slice             //  NOTE: slice *WITHOUT* a 'p'
            var unbound__SPLICE             = Array.prototype.splice            //  NOTE: splice *WITH* a 'p'


            if ('bind' in unbound__group_stop) {
                var group_stop = unbound__group_stop.bind(console)
            } else {
                var group_stop = function OLD_WAY$group_stop(/*...*/) {
                    console.groupEnd()
                }
            }


            if ('bind' in unbound__push) {
                var push_color_blue   = unbound__push.bind(pending, 'color:blue')
                var push_color_green  = unbound__push.bind(pending, 'color:green')
                var push_color_none   = unbound__push.bind(pending, 'color:none')
                var push_color_orange = unbound__push.bind(pending, 'color: #EEA500')
                var push_color_pink   = unbound__push.bind(pending, 'color: #FF1493')       //  Actually: DeepPink
                var push_color_purple = unbound__push.bind(pending, 'color:purple')
                var push_color_red    = unbound__push.bind(pending, 'color:red')
                var push_color_teal   = unbound__push.bind(pending, 'color:teal')
                var push_object       = unbound__push.bind(pending)
            } else {
                var push_color_blue   = function OLD_WAY$push_color_blue()     { pending.push('color:blue')     }
                var push_color_green  = function OLD_WAY$push_color_green()    { pending.push('color:green')    }
                var push_color_none   = function OLD_WAY$push_color_none()     { pending.push('color:none')     }
                var push_color_orange = function OLD_WAY$push_color_orange()   { pending.push('color: #EEA500') }
                var push_color_pink   = function OLD_WAY$push_color_orange()   { pending.push('color: #FF1493') }
                var push_color_purple = function OLD_WAY$push_color_orange()   { pending.push('color:purple')   }
                var push_color_red    = function OLD_WAY$push_color_orange()   { pending.push('color:red')      }
                var push_color_teal   = function OLD_WAY$push_color_orange()   { pending.push('color:teal')     }
                var push_object       = function OLD_WAY$push_object(instance) { pending.push(instance)         }
            }


            var push_string = push_object


            if ('bind' in unbound__slice) {
                //
                //  By using `.call.bind` we use the `.call` function to convert the first argument passed to it,
                //  to the `this` argument of `Array.prototype.slice`:
                //
                //      In other words `.slice_call(arguments)` becomes `Array.prototype.slice.call(arguments)`
                //
                //  This suggestion came from:
                //      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
                //
                var slice_call = unbound__slice.call.bind(unbound__slice)
            } else {
                var slice_call = false                          //  Can't implement `slice.call`, do it old way.
            }


            if ('bind' in unbound__SPLICE) {
                var zap_pending = unbound__SPLICE.bind(pending, 0)
            } else {
                var zap_pending = function OLD_WAY$zap_pending() {
                    pending.splice(0)                                               //  NOTE: splice *WITH* a 'p'
                }
            }


            //
            //  Implementaion
            //
            var trace_execute = ('Gem.Core.execute'      in Tracing)
            var trace_myself  = ('execute$setup_Tracing' in Tracing)
            var COLOR_PINK    = push_color_pink


            var trace_start = function Gem__Trace__trace_start(f, /*optional*/ argument_list) {
                //  Begin a function call to queue a pending new closed trace group.
                //
                //  NOTE #1:
                //      If there are lines inside the group, then this is [later] flushed as a closed trace group.
                //
                //      If there is no lines inside the group, then this is [later] converted to a normal line.
                //
                //  NOTE #2:
                //      If this is the first line inside [an outer] closed group, then the [previously pending]
                //      closed group is first flushed (i.e.: actually output as a closed group).

                if (pending.length) {
                    unbound__group_start_closed.apply(console, pending)
                    zap_pending()
                }

                Trace.depth += 1

                if (argument_list === undefined) {
                    push_string('%c' + f.name + '%c()')
                    push_color_green()
                    push_color_none()
                    return
                }

                var format = '%c' + f.name + '%c('

                push_string(format)
                push_color_green()
                push_color_none()

                var argument_total = argument_list.length

                for (var i = 0; i < argument_total; i ++) {
                    var v     = argument_list[i]
                    var comma = (i ? ', ' : '')

                    if (v === COLOR_PINK) {
                        i += 1

                        v = (i < argument_total && argument_list[i])

                        if (typeof v !== 'string') {
                            throw new Error(
                                      'trace_start: programming error:'
                                    + ': special symbol COLOR_PINK must be followed by a string'
                                )
                        }

                        format += comma + '%c%s%c'
                        COLOR_PINK()
                        push_string(v)
                        push_color_none()
                        continue
                    }

                    var v_type = typeof v

                    if (v_type === 'boolean') {
                        format += comma + (v ? '%ctrue%c' : '%cfalse%c')
                        push_color_blue()
                        push_color_none()
                        continue
                    }

                    if (v_type === 'function') {
                        if (v.name === '') {
                            format += comma + '%cunnamed function%c ()'
                            push_color_blue()
                            push_color_none()
                            continue
                        }

                        var s = v.toString()

                        if (s.substr(-18) === ' { [native code] }') {       //  `substr` allows negative indexes
                            format += comma + '%cfunction%c %c%s%c() { [native code] }'
                            push_color_blue()
                            push_color_none()
                            push_color_orange()
                            push_string(s.substring(9, s.length - 29))      //  Cheating a bit: 9..-29 = function name
                            push_color_none()
                            continue
                        }

                        var open_left_parenthesis = s.indexOf('(')
                        var open_left_brace       = s.indexOf('{')
                        var open_left_brace__m1   = open_left_brace - 1

                        if (
                               (0 < open_left_parenthesis && open_left_parenthesis < open_left_brace__m1)
                            && s[open_left_brace__m1] === ' '
                        ) {
                            format += comma + '%cfunction%c %c%s%c%s'
                            push_color_blue()
                            push_color_none()
                            push_color_orange()
                            push_string(s.substring(9, open_left_parenthesis))
                            push_color_none()
                            push_string(s.substring(open_left_parenthesis, open_left_brace__m1))
                            continue
                        }

                        format += comma + '%cfunction%c %s()'
                        push_color_blue()
                        push_color_none()
                        push_color_orange()
                        push_string(v.name)
                        push_color_none()
                        continue
                    }

                    if (v_type === 'number') {
                        format += comma + '%c' + v.toString() + '%c'
                        push_color_teal()
                        push_color_none()
                        continue
                    }

                    if (v_type === 'string') {
                        format += comma + '%c"%s"%c'
                        push_color_purple()
                        push_string(v)
                        push_color_none()
                        continue
                    }

                    if (v_type === 'symbol') {
                        format += comma + '%c' + v.toString() + '%c'
                        push_color_blue()
                        push_color_none()
                        continue
                    }

                    if (v_type === 'null') {
                        if (v === null) {
                            format += comma + '%cnull%c'
                            push_color_blue()
                            push_color_none()
                            continue
                        }

                        format += comma + '%c%o%c'
                        push_color_orange()
                        push_object(v)
                        push_color_none()
                        continue
                    }

                    if (v_type === 'undefined') {
                        format += comma + '%cundefined%c'
                        push_color_red()
                        push_color_none()
                        continue
                    }

                    format += comma + '%c%o%c'
                    push_color_yellow()
                    push_object(v)
                    push_color_none()
                }

                pending[0] = format + ')'
            }



            if (trace_execute || trace_myself) {
                //
                //  NOTE:
                //      We use a fake `execute$setup_Tracing` here, as we don't have the real one (ourselves).
                //
                //      This is safer than use `arguments.callee` which is very STRONGLY deprecated.
                //
                var myself = function execute$setup_Tracing() {
                }


                if (trace_execute) { trace_start(Gem.Core.execute, [myself]) }
                if (trace_myself)  { trace_start(myself)                     }
            }


            var trace_stop = function Gem__Trace__trace_stop() {
                //  End a closed trace group.
                //
                //  NOTE:
                //      If there are lines inside the group, then the group is closed.
                //
                //      If there is no lines inside the group, then the [previously pending] closed group is
                //      converted to a normal line.

                if (pending.length) {
                    unbound__line.apply(console, pending)
                    zap_pending()
                } else {
                    group_stop()
                }

                Trace.depth -= 1
            }


            if (slice_call) {
                var trace_line = function Gem__Trace__trace_line(/*arguments*/) {
                    //  Output a line of text in trace mode.
                    //
                    //  NOTE:
                    //      If this is the first line inside the group, then the [previously pending] closed group is
                    //      flushed (i.e.: actualy output as a closed group).

                    if (pending.length) {
                        unbound__group_start_closed.apply(console, pending)
                        zap_pending()
                    }

                    unbound__line.apply(console, slice_call(arguments))
                }
            } else {
                var trace_line = function OLD_WAY$Gem__Trace__trace_line(/*arguments*/) {
                    if (pending.length) {
                        unbound__group_start_closed.apply(console, pending)
                        zap_pending()
                    }

                    unbound__line.apply(console, slice.call(arguments))        //  OLD WAY: `slice.call`
                }
            }


            if (trace_myself)  { trace_stop() }
            if (trace_execute) { trace_stop() }


            //
            //  Exports
            //
            Trace.COLOR_PINK  = COLOR_PINK
            Trace.trace_line  = trace_line
            Trace.trace_start = trace_start
            Trace.trace_stop  = trace_stop
        }
    }
)


//
//  Gem.Core.execute:
//      Execute code inside a function (to allow local variables)
//
//  NOTE:
//      The reason the function is named `Gem__Core__execute` (meaning `Gem.Core.execute`) is so that it
//      shows up in stack traces as the full name `Gem__Core__execute` instead of shorter name `execute`
//      (this is really really helpful when reading stack traces).
//
if (Gem.Configuration.trace) {
    Gem.Core.execute(
        function execute$codify$trace$Gem__Core__execute() {
            //
            //  NOTE:
            //      We use a fake `execute$setup_Tracing` here, as we don't have the real one (ourselves).
            //
            //      This is safer than use `arguments.callee` which is very STRONGLY deprecated.
            //
            var myself = function execute$codify$trace$Gem__Core__execute() {
            }

            var Trace   = Gem.Trace
            var Tracing = Gem.Tracing

            var trace_start = Trace.trace_start
            var trace_stop  = Trace.trace_stop

            //
            //  Tracing `execute` and myself
            //
            //  NOTE:
            //      Here we both trace *THIS* call to `Gem.Core.execute` ...
            //          ... and then in *FUTURE* calls we also trace calls to `Gem.Core.execute`
            //              (i.e.: `trace$Gem__Core__execute`).
            //
            //
            var execute = Gem.Core.execute                  //  Original version we are tracing

            var trace_execute = ('Gem.Core.execute' in Tracing)
            var trace_myself  = (myself.name        in Tracing)

            if (trace_execute) { trace_start(execute$codify$trace$Gem__Core__execute, [ myself ]) }
            if (trace_myself)  { trace_start(myself) }


            Gem.Core.execute = function trace$Gem__Core__execute(code) {
                var trace_code = (code.name in Tracing)

                if (trace_execute) { trace_start(execute, arguments) }
                if (trace_code)    { trace_start(code)               }

                execute(code)

                if (trace_code)    { trace_stop() }
                if (trace_execute) { trace_stop() }
            }


            if (trace_myself)  { trace_stop() }
            if (trace_execute) { trace_stop() }
        }
    )
}


//
//  Stubs for:
//      Gem.Core.{clarity_note,codify_method,constant,method,qualify_constant}
//
//  Also:
//      Gem.Core.visible_constant_attribute
//
Gem.Core.execute(
    function execute$setup__Gem() {
        //
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
            var who_what = function execute$setup_Gem$who_what(module, $who, $what) {
                visible_constant_attribute.value = $who
                define_property(module, '$who', visible_constant_attribute)

                visible_constant_attribute.value = $what
                define_property(module, '$what', visible_constant_attribute)

                delete visible_constant_attribute.value
            }


            if (Gem.Configuration.trace) {
                var Tracing = Gem.Tracing

                if ('execute$setup_Gem$who_what' in Tracing) {
                    var Trace = Gem.Trace

                    var COLOR_PINK  = Trace.COLOR_PINK
                    var trace_start = Trace.trace_start
                    var trace_stop  = Trace.trace_stop

                    var original_who_what = who_what

                    var who_what = function trace$execute$setup_Gem$who_what(module, $who, $what) {
                        trace_start(who_what, [COLOR_PINK, "`window." + $who, $who, $what])

                        original_who_what(module, $who, $what)

                        trace_stop()
                    }
                }
            }


            who_what(Gem,            'Gem',            'The only global variable used by Gem.')
            who_what(Gem.Core,       'Gem.Core',       'Basic support code for the Core Gem module.')
            who_what(Gem.Script,     'Gem.Script',     '`<script>` handling.')
            who_what(Gem.NodeWebKit, 'Gem.NodeWebKit', 'Node WebKit members & methods')
        }


//  <stubs>                                                 //  Start of stubs
        //
        //  Stubs:
        //      See "Gem/Beryl/Boot5_Methods.js" for full implementation
        //
        //  NOTE:
        //      These stubs are ~100 lines long ...
        //
        //      ... With full error handling, in clarity mode, they are ~600 lines long (plus another ~200 lines
        //          of extra error handling code) in "Gem/Beryl/Boot5_Methods.js ...
        //
        //      ... Thus, the full implementation, was moved to a separate file, for readability ...
        //
        //      ... Even though unforunatly this:
        //
        //              1.  *BAD*   Violates the DRY principle ("Do not Repeat Yourself); AND
        //
        //              2.  *BAD*   This is the WET coding pratice ("Write Everything Twice") ...
        //
        //      ... In this special case, as boot code, it was decided to do this both for initial readability and
        //          to shorten the boot code in thie file ...
        //
        //      The reason the code split up is "initially more readabile" is the other way (all the code here) is
        //      a lot of contortions have to be done to define the procedures in the "proper order", and it's hard
        //      to follow so much contorted code ...
        //
        //      (Was not an easy choice to create the stubs, hopefully was the right one).
        //
        var method = function Gem__Core__method(who, $what, method) {
            visible_constant_attribute.value = method
            define_property(this, who, visible_constant_attribute)

            if (clarity) {
                visible_constant_attribute.value = this.$who + '.' + who
                define_property(method, '$who', visible_constant_attribute)

                visible_constant_attribute.value = $what
                define_property(method, '$what', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }


        method.call(                                        //   Use `method` on itself ...
            Gem.Core,
            'method',
            'Temporary stub for Gem.Core.method',
            method//,
        )


        Gem.Core.method(
            'clarity_note',
            'Temporary stub for Gem.Core.clarity_note',
            function Gem__Core__clarity_note(who, $what) {
                if (clarity) {
                    visible_constant_attribute.value = $what
                    define_property(this, who + '$NOTE', visible_constant_attribute)
                    delete visible_constant_attribute.value
                }
            }
        )


        Gem.Core.method(
            'codify_method',
            'Temporary stub for Gem.Core.codify_method',
            function Gem__Core__codify_method(who, $what, codifier) {
                var method = codifier()

                visible_constant_attribute.value = method
                define_property(this, who, visible_constant_attribute)

                if (clarity) {
                    visible_constant_attribute.value = this.$who + '.' + who
                    define_property(method, '$who', visible_constant_attribute)

                    visible_constant_attribute.value = $what
                    define_property(method, '$what', visible_constant_attribute)
                }

                delete visible_constant_attribute.value
            }
        )


        Gem.Core.method(
            'constant',
            'Temporary stub for Gem.Core.constant',
            function Gem__Core__constant(who, $what, constant) {
                visible_constant_attribute.value = constant
                define_property(this, who, visible_constant_attribute)

                if (clarity) {
                    visible_constant_attribute.value = $what
                    define_property(this, who + '$', visible_constant_attribute)
                }

                delete visible_constant_attribute.value
            }
        )


        Gem.Core.method(
            'qualify_constant',
            'Temporary stub for Gem.Core.qualify_constant',
            function Gem__Core__qualify_constant(who, $what, qualifier) {
                visible_constant_attribute.value = qualifier()
                define_property(this, who, visible_constant_attribute)

                if (clarity) {
                    visible_constant_attribute.value = $what
                    define_property(this, who + '$', visible_constant_attribute)
                }

                delete visible_constant_attribute.value
            }
        )
//  </stubs>                                                //   End of stubs


        //
        //  visible_constant_attribute
        //      A property used to create visible (i.e.: enumerable) constant attributes
        //
        Gem.Core.constant(
            'visible_constant_attribute',
            'A property used to create visible (i.e.: enumerable) constant attributes.',
            visible_constant_attribute//,
        )
    }
)


//
//  Gem._.Core.gem_changed
//      Array of callback's when `Gem` is changed (clarity mode only).
//
if (Gem.Configuration.clarity) {
    Gem.Core.constant.call(
        Gem._.Core,
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
Gem.Core.execute(
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

        if (typeof version === 'string') {
            var version_list = version.split('.')

            if (version_list.length > 0) { major = parse_integer__or__NaN(version_list[0]) }
            if (version_list.length > 1) { minor = parse_integer__or__NaN(version_list[1]) }
        }


        //
        //  Exports
        //
        Gem.Core.constant.call(
            Gem.NodeWebKit,
            'is_version_012_or_lower',
            "`true` if using nw.js & it's version 0.12 or lower.",
            (major === 0 && minor <= 12)//,
        )

        Gem.Core.constant.call(
            Gem.NodeWebKit,
            'is_version_013_or_higher',
            "`true` if using nw.js & it's version 0.13 or greater.",
            (major >  0 || minor >= 13)//,
        )

        Gem.Core.clarity_note.call(
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
    Gem.Core.codify_method.call(
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
    Gem.Core.codify_method.call(
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
    Gem.Core.method.call(
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
Gem.Core.constant.call(
    Gem.Script,
    'handle_errors',
    '`Gem.Script.handle_errors` is `true` if handling `<script>` errors.',
    (
           Gem.Configuration.capture_error                  //  1.  Configured to capture errors;
        && ('Utils' in window) && Utils.isNwjs()            //  2.  This is running under nw.js;
        && Utils.isOptionValid('test')                      //  3.  This is running in RPG Maker MV "test" mode;
        && ('addEventListener' in window)                   //  4.  The browser has a `.addEventListener` method; AND
        && ('setAttribute'     in document.head)            //  5.  The browser has a `.setAttribute`     method.
    )//,
)


if (Gem.Script.handle_errors) {
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
    //          Yes, its CRAZY, that these two [theoretically identical] ways of accessing `.src` return different
    //          values.
    //
    //      Anyway, if we can use `.getAttribute('src')` we do so; otherwise we do it the crazy backwards compatiable
    //      way.
    //
    Gem.Core.codify_method.call(
        Gem.Script,
        'source_attribute',
        'Get an unmodified `.src` attribute from a DOM (domain object model) element.',
        function codifier$Gem__Script__source_attribute(tag) {
            //
            //  Modern Browser version
            //
            if ('getAttribute' in document.head) {
                return function Gem__Script__source_attribute(tag) {
                    //  Get unmodified `.src` attribute

                    return tag.getAttribute('src')          //  Get unmodified `.src` attribute
                }
            }


            //
            //  Ancient Browser version
            //
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


    //
    //  Gem.Script.error
    //      Show an error (either with `alert` or `console.error`).
    //
    Gem.Core.codify_method.call(
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
                var console_error = function OLD_WAY$console_error(message) {
                    console.error(message)
                }
            }

            return function Gem__Script__error(message) {
                show_developer_tools()
                console_error(message)
            }
        }//,
    )


    //
    //  Gem.Script.handle_global_error
    //      Handle errors when executing a `<script>` tag.
    //
    Gem.Core.codify_method.call(
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

                error(e.error.stack)
            }


            window.addEventListener('error', Gem__Script__handle_global_error)

            return Gem__Script__handle_global_error
        }
    )


    //
    //  Gem.Script.handle_event
    //      Handle events of `<script>` tags.
    //
    Gem.Core.codify_method.call(
        Gem.Script,
        'handle_event',
        'Handle events of `<script>` tags.',
        function codifier$Gem__Script__handle_event() {
            //
            //  NOTE:
            //      There is no way to get the error message, if there is one, when attempting to load
            //      a script (You can't use try/catch on a `<script>` tag that is inserted into the DOM).
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
Gem.Core.qualify_constant.call(
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
//          2.  Again, in clarity mode, after `Gem` is replaced.
//
Gem.Core.codify_method.call(
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
            var append_child = function OLD_WAY$append_child(tag) {
                gem_scripts.appendChild(tag)                                //  Old way: Append to `gem_scripts`
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
            var create_script_tag = function OLD_WAY$create_script_tag() {
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
        //          2.  Again, in clarity mode, after `Gem` is replaced.
        //
        if (handle_errors) {
            return function Gem__Script__codify_method_load() {
                Gem.Core.codify_method.call(            //  `Gem.Script.codify_method` might not exist; so use `.call`
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
            Gem.Core.codify_method.call(
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
//  Finish:
//      1.  Codify Gem.Script.load;
//      2.  Cleanup unused attributes;
//      3.  Protect this file from garbage collection (debug mode only);
//      4.  Load next script file: "Gem/Beryl/Boot2_Manifest.js"
//
Gem.Core.execute(
    function execute$finish() {
        //
        //  Execute a codify of:
        //      Gem.Script.load
        //
        //  NOTE #1:
        //      Also does cleanup of `Gem.Script.codify_method_load` if not in clarity mode.
        //          Load JavaScript code using a `<script>` tag.
        //
        //  NOTE #2:
        //      Read `/*section*/` as just enclosing a set of common code together
        //
        /*section*/ {
            //
            //  Imports
            //
            var clarity            = Gem.Configuration.clarity
            var codify_method_load = Gem.Script.codify_method_load

            codify_method_load()                                //  Call first time here ...

            if (clarity) {
                //  Clarity mode will call `codify_method_load` again later.
            } else {
                delete Gem.Script.codify_method_load            //  Not clarity mode -- don't need to keep this around
            }
        }


        //
        //  Cleanup unused attributes
        //
        /*section*/ {
            delete Gem.Configuration.show_alert
            delete Gem.Script       .event_list
        }


        //
        //  The "sources" tab of Developer tools shows what has been loaded into the HTML page:
        //
        //      However, for a JavaScript file to appear under "sources" it must have at least one function that has
        //      not been garbage collected.
        //
        //      In debug mode, `Gem.sources` is used to make sure that there is least once such function from each
        //      JavaScript file that has been loaded in.
        //
        if (Gem.Configuration.debug) {
            Gem.Source.js_plugins_Beryl = Gem.NodeWebKit.show_developer_tools
        }


        //
        //  Load next script
        //
        Gem.Script.load('Gem/Beryl/Boot2_Manifest.js')
    }//,
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
