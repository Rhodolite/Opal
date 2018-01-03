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
        capture_error : true,                               //      Try to capture errors
        clarity       : 1,                                  //      Set Gem clarity mode to true.
        debug         : true,                               //      Set Gem debug mode to true.
        show_alert    : false,                              //      [Temporary] Use 'alert' to warn of errors.
        trace         : 1,                                  //      Trace function, method & bound method calls.
        unit_test     : 7,                                  //      Run unit tests.
        Box : {                                             //      Box configuration values.
            box_name : 1//,                                 //          Name 'box' instances 'Box' in Developer Tools.
        }//,
    },

    Tracing : [                                             //  Functions, methods, & bound_methods being traced.
        'execute$codify$trace$Gem__Core__execute',  0,
        'execute$setup_Gem',                        0,
        'execute$setup_Tracing',                    0,
        'Gem._.Core.who_what',                      0,
        'Gem.Core.execute',                         0,
        'Gem.Box.create_ModuleExports$Box',         1//,
    ],

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

        script_map : {                                      //      Map of all the scripts loaded (or loading)>.
            //  'Gem/Beryl/Boot2_Manfest.js' : `<script>` tag   //  `<script>` tag to load "Gem/Beryl/Boot.js".
        }//,

        //
        //  NOTE:
        //      The rest of attributes are only used if `Gem.Script.handle_errors` is `true`.
        //
        //  handle_global_error : Function                  //      Handle errors when executing a `<script>` tag>.
        //  handle_event        : Function                  //      Handle events of `<script>` tags>.
        //  source_attribute    : Function                  //      Get unmodified `.src` attribute.
    },

    Source : {                                              //  Functions to "hold onto" for Developer Tools.
        //  js_plugins_Beryl : Function                     //      Avoid garbage collection of 'js/plugins/Beryl.js'>.
    },

    Trace : {                                               //  Map of functions, methods & bound_methods being traced.
//      //  method_call     : Function          [TODO]      //      Start a trace group for a method call.
//      //  trace_line      : Function          [MOVE]      //      Start a trace group.
        tracing       : Function,                           //      Returns the trace configuration for a routine.

        //
        //  The following are used only if `Gem.Configuration.trace` is non-zero
        //
        wrap_function : Function//,                         //      Wrap a function with tracing
    },


    _ : {                                                   //  Private members & methods of all Gem modules.
        Core : {                                            //      Private members & methods of the Core Gem module.
        //  clarity_mode$global_variable_Gem_changed : []   //      Callbacks to call when `Gem` is changed.
        },

        Trace : {                                           //      Private members & methods of the Trace module.
            depth   : 0,                                    //          Current tracing depth.
            pending : []//,                                 //          Pending format to start a tracing group.
        //  function_call         : Function                //          Start a trace group for a function call.
        //  function_result       : Function                //          Finish a function with a result
        //  group_stop            : Bound Function          //          Stop a group on the console.
        //  procedure_done        : Function                //          Finish a procedure (no result shown).
        //  trace_value           : Function                //          Show a value for tracing.
        //  zap_pending__1_to_end : Function                //          Internal routine to clean up 'Trace.pending'.
        }//,
    }//,
}


Gem.Core.execute(
    function execute$setup_Tracing() {
        //
        //  Imports
        //
        var Configuration = Gem.Configuration

        var clarity            = Gem.Configuration.clarity
        var get_property_names = Object.getOwnPropertyNames
        var Pattern            = window.RegExp
        var trace              = Gem.Configuration.trace


        //
        //  Adjust keys, changing the array to an object.
        //
        //  NOTE2:
        //      This is done so this code can work in JavaScript 5.0, which does not allow the following syntax:
        //
        //          Tracing : {
        //              ['Gem.Core.execute'] : 7,
        //          }
        //
        var tracing_list  = Gem.Tracing
        var tracing_total = tracing_list.length

        var Tracing     =
            Gem.Tracing = {}


        for (var i = 0; i < tracing_total; i += 2) {
            var k = tracing_list[i]
            var v = tracing_list[i + 1]

            Tracing[k] = v
        }


        //
        //  Clarity
        //
        if (clarity || trace) {
            Gem.Core.execute.$who = 'Gem.Core.execute'
        }


        //
        //  Define trace functions & trace myself
        //
        if (trace) {
            var _Trace = Gem._.Trace
            var Trace  = Gem.Trace

            var pending = _Trace.pending

//          var unbound__group_start_closed = console.groupCollapsed
            var unbound__group_start_open   = console.group
            var unbound__group_stop         = console.groupEnd
            var unbound__line               = console.log
            var unbound__push               = pending.push
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
                var push_color_pink   = function OLD_WAY$push_color_pink()     { pending.push('color: #FF1493') }
                var push_color_purple = function OLD_WAY$push_color_purple()   { pending.push('color:purple')   }
                var push_color_red    = function OLD_WAY$push_color_red()      { pending.push('color:red')      }
                var push_color_teal   = function OLD_WAY$push_color_teal()     { pending.push('color:teal')     }
                var push_object       = function OLD_WAY$push_object(instance) { pending.push(instance)         }
            }


            var push_string = push_object


            if ('bind' in unbound__SPLICE) {
                var zap_pending__1_to_end = unbound__SPLICE.bind(pending, 1)
            } else {
                var zap_pending__1_to_end = function OLD_WAY$zap_pending() {
                    pending.splice(1)                                               //  NOTE: splice *WITH* a 'p'
                }
            }


            //
            //  Implementaion
            //
            var carriage_return__pattern = new Pattern('\n', 'g')


            //
            //  Gem.Tracing.trace
            //      Return the trace value for function `name`.
            //
            //  Algorithm:
            //      If `Gem.Configuration.trace` is either 0 (off) or 7 (on always):
            //              Then return `Gem.Configuration.trace`;
            //
            //      Otherwise, return the value of Tracing[name] (if it exists);
            //
            //      Otherwise, return 0 (tracing off).
            //
            var tracing = function Gem__Trace__tracing(name) {
                var trace = Configuration.trace             //  Get newest value of 'trace'

                if (trace === 0 || trace === 7) {
                    return trace
                }

                if (name in Tracing) {
                    return Tracing[name]
                }

                return 0
            }


            var tracing_execute = tracing('Gem.Core.execute')
            var tracing_myself  = tracing('execute$setup_Tracing')


            //
            //  Reserve first elements of `pending` & [later] use `format` to replace `pending[0]`
            //
            push_object(null)

            var format


            var trace_value = function trace_value(v) {
                var v_type = typeof v

                if (v_type === 'string') {
                    push_color_purple()
                    push_string(v)
                    push_color_none()
                    return '%c"%s"%c'
                }

                if (v_type === 'number') {
                    push_color_teal()
                    push_color_none()
                    return '%c' + v.toString() + '%c'
                }

                if (v_type === 'boolean') {
                    push_color_blue()
                    push_color_none()
                    return (v ? '%ctrue%c' : '%cfalse%c')
                }

                if (v_type === 'object') {
                    if (v === null) {
                        push_color_blue()
                        push_color_none()
                        return '%cnull%c'
                    }

                    if ('$who' in v) {
                        push_color_pink()
                        push_color_none()
                        push_object(v)
                        return "`%c" + v.$who + "`%c %o"
                    }

                    push_object(v)
                    return '%o'
                }

                if (v_type === 'function') {
                    if (v.name === '') {
                        push_color_blue()
                        push_color_none()
                        return '%cunnamed function%c ()'
                    }

                    var s = v.toString()

                    if (s.substr(-18) === ' { [native code] }') {       //  `substr` allows negative indexes
                        push_color_blue()
                        push_color_none()
                        push_color_orange()
                        push_string(s.substring(9, s.length - 29))      //  Cheating a bit: 9..-29 = function name
                        push_color_none()
                        return '%cfunction%c %c%s%c() { [native code] }'
                    }

                    var open_left_parenthesis = s.indexOf('(')
                    var open_left_brace       = s.indexOf('{')
                    var open_left_brace__m1   = open_left_brace - 1

                    if (
                           (0 < open_left_parenthesis && open_left_parenthesis < open_left_brace__m1)
                        && s[open_left_brace__m1] === ' '
                    ) {
                        push_color_blue()
                        push_color_none()
                        push_color_orange()
                        push_string(s.substring(9, open_left_parenthesis))
                        push_color_none()
                        push_string(s.substring(open_left_parenthesis, open_left_brace__m1))
                        return '%cfunction%c %c%s%c%s'
                    }

                    push_color_blue()
                    push_color_none()
                    push_color_orange()
                    push_string(v.name)
                    push_color_none()
                    return '%cfunction%c %s()'
                }

                if (v_type === 'symbol') {
                    push_color_blue()
                    push_color_none()
                    return '%c' + v.toString() + '%c'
                }

                if (v_type === 'undefined') {
                    push_color_red()
                    push_color_none()
                    return '%cundefined%c'
                }


                push_color_red()
                push_color_none()
                push_object(v)
                return '%c<v_type:' + v_type + '>%c %o'
            }


            var function_call = function Gem__Trace__function_call(f, /*optional*/ argument_list, function_name) {
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

                if (pending.length > 1) {
                    unbound__group_start_open.apply(console, pending)
                    zap_pending__1_to_end()
                }

                _Trace.depth += 1

                push_color_green()
                push_color_none()

                if (arguments.length === 3) {
                    var green_function_name = '%c' + function_name + '%c'
                } else if ('$who' in f) {
                    var green_function_name = '%c' + f.$who + '%c'
                } else {
                    var green_function_name = '%c' + f.name + '%c'
                }

                if (argument_list === undefined) {
                    pending[0] = (green_function_name + '()')
                    return
                }

                var argument_total = argument_list.length

                if ( ! argument_total) {
                    pending[0] = (green_function_name + '()')
                    return
                }

                for (var i = 0; i < argument_total; i ++) {
                    var v = argument_list[i]

                    if (typeof v === 'string' && v.indexOf('\n') != -1) {
                        //
                        //  A string has a '\n' in it:
                        //      Output each argument on a separate line
                        //

                        format = green_function_name + '(\n'/*)*/

                        for (var i = 0; i < argument_total; i ++) {
                            var v = argument_list[i]

                            if (typeof v === 'string' && v.indexOf('\n') != -1) {
                                push_color_purple()
                                push_string(v.replace(carriage_return__pattern, '\n    '))
                                push_color_none()
                                format += '    %c"%s"%c,\n'
                                continue
                            }

                            format += '    ' + trace_value(v) + ',\n'
                        }

                        pending[0] = format + ')'

                        return
                    }
                }

                format = green_function_name + '('/*)*/

                for (var i = 0; i < argument_total; i ++) {
                    var v = argument_list[i]

                    if (i) {
                        format += ', ' + trace_value(v)
                    } else {
                        format += trace_value(v)
                    }
                }

                pending[0] = format + ')'
            }


            if (tracing_execute || tracing_myself) {
                //
                //  NOTE:
                //      We use a fake `execute$setup_Tracing` here, as we don't have the real one (ourselves).
                //
                //      This is safer than use `arguments.callee` which is very STRONGLY deprecated.
                //
                var myself = function execute$setup_Tracing() {
                }


                if (tracing_execute) { function_call(Gem.Core.execute, [myself]) }
                if (tracing_myself)  { function_call(myself)                     }
            }


            var procedure_done = function Gem__Trace__procedure_done() {
                //  End a closed trace group.
                //
                //  NOTE:
                //      If there are lines inside the group, then the group is closed.
                //
                //      If there is no lines inside the group, then the [previously pending] closed group is
                //      converted to a normal line.

                if (pending.length > 1) {
                    unbound__line.apply(console, pending)
                    zap_pending__1_to_end()
                } else {
                    group_stop()
                }

                _Trace.depth -= 1
            }


            var function_result = function Gem__Trace__function_result(v) {
                //  End a closed trace group with a result (i.e.: function return value).
                //
                //  NOTE:
                //      If there are lines inside the group, then the group is closed.
                //
                //      If there is no lines inside the group, then the [previously pending] closed group is
                //      converted to a normal line.

                if (pending.length > 1) {
                    pending[0] += ' => '
                } else {
                    group_stop()
                    pending[0] = '=> '
                }

                pending[0] += trace_value(v)
                unbound__line.apply(console, pending)
                zap_pending__1_to_end()

                _Trace.depth -= 1
            }


            var wrap_function = function Gem__Trace__wrap_function(f, /*optional*/ name) {
                if (arguments.length === 1) {
                    if ('$who' in f) {
                        var function_name = f.$who
                    } else {
                        var function_name = f.name
                    }
                } else {
                    var function_name = name
                }
                    

                if ( ! (function_name in Tracing)) {
                    Tracing[function_name] = 0
                }


                return function STUB$trace_wrapper(/*...*/) {
                    var trace = Configuration.trace             //  Get newest value of 'trace'

                    if (trace === 7 || (trace && Tracing[function_name])) {
                        function_call(f, arguments, function_name)

                        var r = f.apply(this, arguments)

                        if (r !== undefined) {
                            function_result(r)
                            return r
                        }

                        procedure_done()
                        return
                    }

                    return f.apply(this, arguments)
                }
            }


            if (tracing_myself)  { procedure_done() }
            if (tracing_execute) { procedure_done() }


            //
            //  Private
            //
            _Trace.function_call         = function_call
            _Trace.function_result       = function_result
            _Trace.group_stop            = group_stop
            _Trace.procedure_done        = procedure_done
            _Trace.trace_value           = trace_value
            _Trace.zap_pending__1_to_end = zap_pending__1_to_end
        } else {
            var tracing = function Gem__Trace__tracing(name) {
                return 0
            }

            var wrap_function = function Gem__Trace__wrap_function(f, /*optional*/ name) {
                return f
            }
        }


        //
        //  Export
        //
        Trace.tracing       = tracing
        Trace.wrap_function = wrap_function
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
            //  Imports
            //
            var Gem = window.Gem

            var _Trace = Gem._.Trace
            var Trace  = Gem.Trace

            var function_call  = _Trace.function_call
            var procedure_done = _Trace.procedure_done
            var tracing        = Trace.tracing


            //
            //  Tracing `execute` and myself
            //
            //  NOTE:
            //      Here we both trace *THIS* call to `Gem.Core.execute` ...
            //          ... and then in *FUTURE* calls we also trace calls to `Gem.Core.execute`
            //              (i.e.: `trace$Gem__Core__execute`).
            //

            //
            //  NOTE:
            //      We use a fake `execute$setup_Tracing` here, as we don't have the real one (ourselves).
            //
            //      This is safer than using `arguments.callee` which is very STRONGLY deprecated.
            //
            var myself = function execute$codify$trace$Gem__Core__execute() {
            }


            var execute = Gem.Core.execute                  //  Original version we are tracing

            var tracing_execute = tracing('Gem.Core.execute')
            var tracing_myself  = tracing(myself.name)

            if (tracing_execute) { function_call(execute, [myself]) }
            if (tracing_myself)  { function_call(myself) }


            Gem.Core.execute = function trace$Gem__Core__execute(code) {
                var trace_code = tracing(code.name)

                if (tracing_execute) { function_call(execute, arguments) }
                if (trace_code)      { function_call(code)               }

                execute(code)

                if (trace_code)    { procedure_done() }
                if (tracing_execute) { procedure_done() }
            }


            if (tracing_myself)  { procedure_done() }
            if (tracing_execute) { procedure_done() }
        }
    )
}


//
//  Stubs for:
//      Gem.Core.{clarity_note,codify_method,constant,method,qualify_constant}
//
//  Also:
//      Gem.Core.constant_property
//
Gem.Core.execute(
    function execute$setup_Gem() {
        //
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration

        var clarity           = Configuration.clarity
        var create_Object     = Object.create
        var define_properties = Object.defineProperties
        var define_property   = Object.defineProperty
        var trace             = Configuration.trace

        if (trace) {
            var Trace         = Gem.Trace
            var _Trace        = Gem._.Trace

            var function_call  = _Trace.function_call
            var procedure_done = _Trace.procedure_done
            var tracing        = Trace.tracing
            var wrap_function  = Trace.wrap_function
        }


        //
        //  Closures
        //      Read 'invisible' to mean 'not enumerable'.
        //      Read 'visible' to mean 'enumerable'.
        //
        //      Enumerable properties are shown better in Developer Tools (at the top of the list,
        //      and not grayed out).
        //
        if (clarity) {
            var attribute_$who     = create_Object(null, { enumerable : { value : true } })
            var attribute_$what    = create_Object(null, { enumerable : { value : true } })
            var attribute___prefix = create_Object(null)                                    //  3 underscores

            var module_attributes = create_Object(
                    null,
                    {
                        '$who'    : { enumerable : true, value : attribute_$who     },
                        '$what'   : { enumerable : true, value : attribute_$what    },
                        '_prefix' : { enumerable : true, value : attribute___prefix },
                    }//,
                )

            var who_what_attributes = create_Object(
                    null,
                    {
                        '$who'  : { enumerable : true, value : attribute_$who  },
                        '$what' : { enumerable : true, value : attribute_$what },
                    }//,
                )


            var save_who_what = function save_who_what(instance, $who, $what) {
                /*=*/ {
                    //
                    //  constant module.$who  = $who
                    //  constant module.$what = $what
                    //
                    attribute_$who .value = $who
                    attribute_$what.value = $what

                    define_properties(instance, who_what_attributes)

                    delete attribute_$who .value
                    delete attribute_$what.value
                }
            }
        }

        var interim_constant_attribute = create_Object(
                null,
                {
                    configurable : { value : true  },       //  Can be reconfigured (the constant can be changed!).
                    enumerable   : { value : true  },       //  Visible (i.e.: enumerable)
                //  writable     : { value : false }//,     //  Default value, no need to set
                }//,
            )

        var constant_property = create_Object(
                null,
                {
                //  configurable : { value : false },       //  Default value, no need to set
                    configurable : { value : true  },       //  FIXING THIS: TEMPORARY!
                    enumerable   : { value : true  },       //  Visible (i.e.: enumerable)
                //  writable     : { value : false }//,     //  Default value, no need to set
                }//,
            )

        var invisible_constant_attribute = create_Object(
                null,
                {
                //  configurable : { value : false },       //  Default value, no need to set
                    configurable : { value : true  },       //  TEMPORARY!
                //  enumerable   : { value : false },       //  Default value: invisible (i.e.: not enumerable)
                //  writable     : { value : false }//,     //  Default value, no need to set
                }//,
            )


        function _save_interim_constant(instance, name, value) {
            //  interim constant instance.*name = value
            interim_constant_attribute.value = value
            define_property(instance, name, interim_constant_attribute)
            delete interim_constant_attribute.value
        }


        function constant_attribute(instance, name, value) {
            //  constant instance.*name = value
            constant_property.value = value
            define_property(instance, name, constant_property)
            delete constant_property.value
        }


        if (clarity || trace) {
            //
            //  NOTE:
            //      This stub implementation of `who_what` only replaces a single "." since it does not use
            //      regular expressions with the "g" flag.
            //
            var who_what = function Gem__private__who_what(module, $who, $what, create_prefix) {
                if (clarity) {
                    if (create_prefix) {
                        if ($who.startsWith('Gem._.')) {
                            var _prefix = $who.replace('Gem._.', 'Gem__private__')
                        } else {
                            var _prefix = $who.replace('.', '__')
                        }


                        /*=*/ {
                            //
                            //  constant           module.$who    = $who
                            //  constant           module.$what   = $what
                            //  invisible constant module._prefix = $who.replace('.', '__')
                            //
                            attribute_$who    .value = $who
                            attribute_$what   .value = $what
                            attribute___prefix.value = _prefix

                            define_properties(module, module_attributes)

                            delete attribute_$who    .value
                            delete attribute_$what   .value
                            delete attribute___prefix.value
                        }

                        return
                    }

                    /*=*/
                    {
                        //  constant module.$who  = $who
                        //  constant module.$what = $what
                        save_who_what(module, $who, $what)
                    }

                    return
                }


                //
                //  trace mode without clarity mode: only need `$who`, do *NOT* need `$what` & `__prefix`.
                // 

                //  constant module.$who = $who
                constant_attribute(module, '$who', $who)
            }


            if (trace && tracing('Gem._.who_what')) {
                var original_who_what = who_what


                //
                //  Trace execute$setup_Gem$STUB$who_what:
                //      This special version of tracing has to set `module.$who` before calling `function_call`,
                //      so that `function_call` can properly identify `module`.
                //
                var who_what = function trace$Gem__private__Core__who_what(module, $who, $what) {
                    //
                    //  ... Must do this first before calling `function_call` ...
                    //
                    /*first*/ {
                        //  constant module.$who = $who
                        constant_attribute(module, '$who', $who)
                    }

                    function_call(original_who_what, arguments)

                    original_who_what(module, $who, $what)

                    procedure_done()
                }
            }


            who_what(Gem,            'Gem',            'The only global variable used by Gem.',             false)
            who_what(Gem.Core,       'Gem.Core',       'Basic support code for the Core Gem module.',       true)
            who_what(Gem.Script,     'Gem.Script',     '`<script>` handling.',                              true)
            who_what(Gem.NodeWebKit, 'Gem.NodeWebKit', 'Node WebKit members & methods.',                    true)
            who_what(Gem._.Core,     'Gem._.Core',     'Private members & methods of the Core Gem module.', true)
        }


//  <stubs>                                                 //  Start of stubs
        //
        //  Stubs:
        //      See "Gem/Beryl/Boot6_Methods.js" for full implementation
        //
        //  NOTE:
        //      These stubs are ~100 lines long ...
        //
        //      ... With full error handling, in clarity mode, they are ~600 lines long (plus another ~200 lines
        //          of extra error handling code) in "Gem/Beryl/Boot6_Methods.js ...
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

        if ( ! clarity && ! trace) {
            //
            //  _method__simple
            //      Common code to define a method.
            //
            //      Super simple version: No clarity or trace mode.
            //
            var _method__simple = function _method__simple(instance, who, method) {
                constant_property.value = method
                define_property(instance, who, constant_property)
                delete constant_property.value
            }
        } else {
            //
            //  _method__complex
            //      Common code to define a method.
            //
            //      More complicated version: clarity and/or trace mode
            //
            var _method__complex = function __method__complex(instance, who, $what, method, function_name) {
                if (clarity) {
                    if (trace) {
                        //
                        //  Version with clarity & tracing.
                        //
                        constant_property.value = function_name
                        define_property(method, '$who', constant_property)

                        constant_property.value = $what
                        define_property(method, '$what', constant_property)

                        var traced_method = wrap_function(method)

                        constant_property.value = traced_method
                        define_property(instance, who, constant_property)

                        constant_property.value = method
                        define_property(traced_method, '$tracing', constant_property)

                        constant_property.value = 'TRACED: ' + function_name
                        define_property(traced_method, '$who', constant_property)

                        constant_property.value = 'TRACED: ' + $what
                        define_property(traced_method, '$what', constant_property)

                        delete constant_property.value
                        return
                    }


                    //
                    //  Version with clarity (but without tracing).
                    //
                    /*=*/ {
                        //
                        //  constant method.$who  = who
                        //  constant method.$what = $what
                        //
                        attribute_$who .value = who
                        attribute_$what.value = $what

                        define_properties(method, who_what_attributes)

                        delete attribute_$who .value
                        delete attribute_$what.value
                    }

                    //  interim constant instance.*who = method
                    _save_interim_constant(instance, who, method)
                    return
                }

                //
                //  trace mode without clarity mode:
                //      Only need `$who` (on `method`)
                //
                //      Do *NOT* need `$what` (on `method`)
                //
                /*=*/ {
                    //
                    //  NOTE:
                    //      This assignment is needed first, as `wrap_function` below needs `method[$who]` defined.
                    //

                    //  constant method.$who = function_name
                    constant_property.value = function_name
                    define_property(method, '$who', constant_property)
                //  delete constant_property.value         //  Done below
                }

                var traced_method = wrap_function(method)
                
                /*=*/ {
                    //  constant instance.*who = traced_method

                    constant_property.value = traced_method
                    define_property(instance, who, constant_property)
                //  delete constant_property.value         //  Done below
                }


                //
                //  trace mode without clarity mode:
                //      Only need `$tracing` (on `traced_method`)
                //
                //      Do *NOT* need `$who` & `$what` (on `traced_method`)
                //
                /*=*/ {
                    //  constant traced_method.$tracing = method

                    constant_property.value = method
                    define_property(traced_method, '$tracing', constant_property)
                //  delete constant_property.value         //  Done below
                }

                delete constant_property.value
            }
        }


        var method = function STUB$Gem__Core__method(who, $what, method) {
            if ( ! clarity && ! trace) {
                _method__simple(this, who, method)
                return
            }

            if ( ! ('$who' in this)) {
                throw new Error('missing $who in object')
            }

            var function_name = this.$who + '.' + who

            _method__complex(this, who, $what, method, function_name)
        }


        //
        //  The next ';' is one of the few times we really need a ';' in JavaScript ...
        //      To avoid a leading '(' the next statement being combined with the previous statement.
        //
        ;(trace ? wrap_function(method) : method).call(         //  Use 'method' on itself
            Gem.Core,
            'method',
            'Temporary stub for Gem.Core.method',
            method//,
        )


        Gem.Core.method(
            'clarity_note',
            'Temporary stub for Gem.Core.clarity_note',
            function STUB$Gem__Core__clarity_note(who, $what) {
                if (clarity) {
                    constant_property.value = $what
                    define_property(this, who + '$NOTE', constant_property)
                    delete constant_property.value
                }
            }
        )


        Gem.Core.method(
            'codify_method',
            'Temporary stub for Gem.Core.codify_method',
            function STUB$Gem__Core__codify_method(who, $what, codifier) {
                if ( ! clarity && ! trace) {
                    _method__simple(this, who, codifier())
                    return
                }

                if ( ! ('$who' in this)) {
                    throw new Error('missing $who in object')
                }

                var function_name = this.$who + '.' + who

                if (trace) {
                    codifier = wrap_function(codifier, function_name)
                }

                _method__complex(this, who, $what, codifier(), function_name)
            }
        )


        Gem.Core.method(
            'constant',
            'Temporary stub for Gem.Core.constant',
            function STUB$Gem__Core__constant(who, $what, constant) {
                constant_property.value = constant
                define_property(this, who, constant_property)

                if (clarity) {
                    constant_property.value = $what
                    define_property(this, who + '$', constant_property)
                }

                delete constant_property.value
            }
        )


        Gem.Core.method(
            'qualify_constant',
            'Temporary stub for Gem.Core.qualify_constant',
            function STUB$Gem__Core__qualify_constant(who, $what, qualifier) {
                constant_property.value = (trace ? wrap_function(qualifier) : qualifier)()
                define_property(this, who, constant_property)

                if (clarity) {
                    constant_property.value = $what
                    define_property(this, who + '$', constant_property)
                }

                delete constant_property.value
            }
        )

        Gem.Core.method.call(
                Gem._.Core,
                'constant_attribute',
                'Create a [non reconfigurable] visible constant attribute.',
                constant_attribute//,
            )


        if (clarity || trace) {
            Gem.Core.method.call(
                    Gem._.Core,
                    'who_what',
                    (
                        clarity
                            ? 'Temporary stub to set `.$who`, `.$what`, & `prefix` on a module.'
                            : 'Temporary stub to set `.$who` on a module (`$what` is ignored in non clarity mode).'
                    ),
                    who_what//,
                )
        }
//  </stubs>                                                //   End of stubs


        if (clarity) {
            //
            //  attribute_$what
            //      A property used to create a visible (i.e.: enumerable) constant `.$what` attribute.
            //
            Gem.Core.constant.call(
                Gem._.Core,
                'attribute_$what',
                'A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.',
                attribute_$what//,
            )


            //
            //  attribute_$who
            //      A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.
            //
            Gem.Core.constant.call(
                Gem._.Core,
                'attribute_$who',
                'A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.',
                attribute_$who//,
            )
        }


        //
        //  constant_property
        //      A property used to create a visible (i.e.: enumerable) constant attributes
        //
        Gem.Core.constant(
            'constant_property',
            'A property used to create  visible (i.e.: enumerable) constant attributes.',
            constant_property//,
        )


        //
        //  invisible_constant_attribute
        //      A property used to create invisible (i.e.: NOT enumerable) constant attributes
        //
        Gem.Core.constant(
            'invisible_constant_attribute',
            'A property used to create invisible (i.e.: not enumerable) constant attributes.',
            invisible_constant_attribute//,
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
        function codifier$Gem__Script__source_attribute() {
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
          'Codify method `Gem.Script.load`.\n'
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
