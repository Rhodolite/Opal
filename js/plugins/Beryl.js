// //  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
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
        'execute$setup_Tracing',                0,
        'Gem.Boot._.Core.constant_attribute',   0,
        'Gem.Boot.Core.constant',               0,
        'Gem.Boot.Core.execute',                0,
        'Gem.Boot.Trace.cocoon',                0,
        'Gem.Boot.Trace.wrap_function',         1,
        'who_what',                             0,
    ],

    Boot : {                                                //  Temporary support code during boot process.
        Box : {                                             //      Boot support code for boxes.
        //  constant_property         : Box                 //          Create a constant attribute.
        //  interim_constant_property : Box                 //          Create an interim constant attribute.
        //  property_$what            : Box                 //          Create `.$what` property (clarity mode only)
        //  property_$who             : Box                 //          Create `.$who` property (clarity or trace ...).
        },

        Core : {                                            //      Boot support code for the Core Gem module.
            execute : function Gem__Core__execute(code) {
                //  Execute code defined in a function.  This allows the use of local variables.

                code()
            }//,

            //  clarity_note          : Function            //          Add a note to a variable or set of variables.
            //  codify_interim_method : Function            //          Create ... an interim method as a closure.
            //  codify_method         : Function            //          Create the code for a method as a closure.
            //  constant              : Function            //          Store a global Gem constant.
            //  interim_method        : Function            //          Define an interim Gem method.
            //  method                : Function            //          Define a Gem method.
            //  qualify_constant      : Function            //          Qualify a global Gem constant.
        },

        Source : {                                          //      Functions to "hold onto" for Developer Tools.
            //  js_plugins_Beryl : Function                 //          Avoid garbage collection of '.../Beryl.js'.
        },

        NodeWebKit: {                                       //      Node WebKit members & methods.
            //  is_NodeWebKit             : false           //          True if using nw.js
            //  is_version_012_or_lower   : false           //          True if using nw.js version 0.12 or lower.
            //  is_version_013_or_greater : false           //          True if using nw.js version 0.13 or greater.
            //  show_developer_tools      : Function        //          Show developer tools window.
        },

        Script : {                                          //      `<script>` handling during boot process.
            event_list : ['abort', 'error', 'load'],        //          List of `<script>` events to listen for.

            //  handle_errors : false,                      //          `true` if handling `<script>` errors.
            //  load          : Function                    //          Load a script using `<script>` tag.

            script_map : {                                  //          Map of all the scripts loaded (or loading).
                //  'Gem/Beryl/Boot2_Manfest.js' : `<script>` tag
            }//,

            //
            //  NOTE:
            //      The rest of attributes are only used if `Gem.Boot.Script.handle_errors` is `true`.
            //
            //  handle_global_error : Function              //          Handle errors when executing a `<script>` tag>.
            //  handle_event        : Function              //          Handle events of `<script>` tags>.
            //  source_attribute    : Function              //          Get unmodified `.src` attribute.
        },

        Trace : {                                           //      Map of functions, methods ... being traced.
    //      //  method_call     : Function          [TODO]  //          Start a trace group for a method call.
    //      //  trace_line      : Function          [MOVE]  //          Start a trace group.
            tracing       : Function,                       //          Returns the trace configuration for a routine.
            trace_call    : Function,                       //          Trace a function call.
            wrap_function : Function//,                     //          Wrap a function with tracing.
        },

        _ : {                                               //      Private members & methods of all Gem modules.
            Core : {                                        //          Private members & ... Boot.Core Gem module.
                //  clarity_mode$global_variable_Gem_changed : []   //  Callbacks to call when `Gem` is changed.
            },

            Trace : {                                       //      Private members & methods of the Trace module.
                depth   : 0,                                //          Current tracing depth.
                pending : []//,                             //          Pending format to start a tracing group.
            //  function_call         : Function            //          Start a trace group for a function call.
            //  function_result       : Function            //          Finish a function with a result
            //  group_stop            : Bound Function      //          Stop a group on the console.
            //  procedure_done        : Function            //          Finish a procedure (no result shown).
            //  trace_value           : Function            //          Show a value for tracing.
            //  zap_pending__1_to_end : Function            //          Internal routine to clean up 'Trace.pending'.
            }//,
        }//,
    }//,
}


Gem.Boot.Core.execute(
    function execute$setup_Box_and_Tracing() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var Box           = Node.Box
        var Trace         = Node.Trace
        var Configuration = Gem.Configuration

        var clarity = Configuration.clarity
        var trace   = Configuration.trace

        if (trace) {
            var define_properties = Object.defineProperties
        }


        //
        //  Implementation: Box
        //
        if (clarity || trace) {
            var property_$who = {
                $who         : 'Gem.Box.property_$who',
                $what        : "`Gem.Box.property_$who` is used to create a `.$who` attribute",
                configurable : false,                               //  Default value, shown for clarity
                enumerable   : true,
                writable     : false,                               //  Default value, shown for clarity
                value        : undefined//,
            }
        }

        if (trace) {
            var property_$trace = {
                $who         : 'Gem.Box.property_$trace',
                $what        : "`Gem.Box.property_$trace` is used to create a `.$trace` attribute",
                configurable : false,                               //  Default value, shown for clarity
                enumerable   : true,
                writable     : false,                               //  Default value, shown for clarity
                value        : undefined//,
            }
        }

        if (clarity) {
            var property_$what = {
                $who         : 'Gem.Box.property_$what',
                $what        : "`Gem.Box.property_$what` is used to create a `.$what` attribute",
                configurable : false,                               //  Default value, shown for clarity
                enumerable   : true,
                writable     : false,                               //  Default value, shown for clarity
                value        : undefined//,
            }
        }


        if (trace) {
            var self_trace_properties = {
                $trace : property_$trace,
                $who   : property_$who//,
            }


            if (clarity) {
                //
                //  NOTE:
                //      `.$$who` & `.$$what` have to be defined to be invisible (not enumerable), so they don't create
                //      attributes when used.
                //
                define_properties(
                    self_trace_properties,
                    {
                        '$$who' : {
                            configurable : false,                               //  Default value, shown for clarity
                            enumerable   : false,                               //  Default value, shown for clarity
                            writable     : false,                               //  Default value, shown for clarity
                            value        : 'Gem.Box.self_trace_properties'//,
                        },

                        '$$what' : {
                            configurable : false,                               //  Default value, shown for clarity
                            enumerable   : false,                               //  Default value, shown for clarity
                            writable     : false,                               //  Default value, shown for clarity

                            value : "`Gem.Box.self_trace_properties` is used to create"
                                  + " `.$trace` & `.$who` attributes."
                        }//,
                    }//,
                )
            }
        }


        //
        //  Implementation: Trace
        //
        if (trace) {
            //
            //  Imports: Trace version
            //
            var console = window.console
            var Pattern = window.RegExp

            var _Trace = Node._.Trace
            var Core   = Node.Core

            var define_property             = Object.defineProperty
            var pending                     = _Trace.pending
//          var unbound__group_start_closed = console.groupCollapsed
            var unbound__group_start_open   = console.group
            var unbound__group_stop         = console.groupEnd
            var unbound__line               = console.log
            var unbound__push               = pending.push
            var unbound__SPLICE             = Array.prototype.splice            //  NOTE: splice *WITH* a 'p'


            //
            //  Closures
            //
            var carriage_return__pattern        = new Pattern('\n', 'g')
            var carriage_return__space__pattern = new Pattern('\n *', 'g')

            if ('bind' in unbound__group_stop) {
                var group_stop = unbound__group_stop.bind(console)
            } else {
                var group_stop = function OLD_WAY$group_stop(/*...*/) {
                    console.groupEnd()
                }
            }

            if ('bind' in unbound__push) {
                var push_color_bold_cyanish = unbound__push.bind(pending, 'font-weight: bold; color: #00AAFF')
                var push_color_blue         = unbound__push.bind(pending, 'color:blue')
                var push_color_green        = unbound__push.bind(pending, 'color:green')
                var push_color_none         = unbound__push.bind(pending, 'color:none')
                var push_color_normal_none  = unbound__push.bind(pending, 'font-weight: none; color: none')
                var push_color_orange       = unbound__push.bind(pending, 'color: #EEA500')
                var push_color_pink         = unbound__push.bind(pending, 'color: #FF1493')     //  Actually: DeepPink
                var push_color_purple       = unbound__push.bind(pending, 'color:purple')
                var push_color_red          = unbound__push.bind(pending, 'color:red')
                var push_color_teal         = unbound__push.bind(pending, 'color:teal')
                var push_object             = unbound__push.bind(pending)
            } else {
                var push_color_bold_cyanish = function OLD_WAY$push_color_bold_cyanish() {
                    pending.push('font-weight: bold; color: #00AAFF')
                }

                var push_color_blue  = function OLD_WAY$push_color_blue()  { pending.push('color:blue')  }
                var push_color_green = function OLD_WAY$push_color_green() { pending.push('color:green') }
                var push_color_none  = function OLD_WAY$push_color_none()  { pending.push('color:none')  }

                var push_color_normal_none = function OLD_WAY$push_color_normal_none() {
                    pending.push('font-weight: none; color:none')
                }

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

            //
            //
            //  Adjust keys, changing the array to an object.
            //
            //  NOTE2:
            //      This is done so this code can work in JavaScript 5.0, which does not allow the following syntax:
            //
            //          Tracing : {
            //              ['Gem.Boot.Core.execute'] : 7,
            //          }
            //
            var tracing_list  = Gem.Tracing
            var tracing_total = tracing_list.length

            var Tracing      =
                Node.Tracing = {}


            for (var i = 0; i < tracing_total; i += 2) {
                var k = tracing_list[i]
                var v = tracing_list[i + 1]

                Tracing[k] = v
            }


            //
            //  Gem.Boot.Trace.tracing
            //      Return the trace value for function `name`.
            //
            //  Algorithm:
            //      If `Gem.Tracing[name] does not exist, set it to 0`
            //      (this is done first, before testing for `trace === 7` to help catch all possible tracable names)
            //
            //      If `Gem.Configuration.trace` is either 0 (off) or 7 (on always):
            //              Then return `Gem.Configuration.trace`;
            //
            //      Otherwise, return the value of `Gem.Tracing[name]`
            //
            var tracing = function Gem__Boot__Trace__tracing(name) {
                var trace = Configuration.trace             //  Get newest value of 'trace'

                if ( ! (name in Tracing)) {
                    Tracing[name] = 0
                }

                if (trace === 0 || trace === 7) {
                    return trace
                }

                return Tracing[name]
            }


            //
            //  parse_function
            //
            var result__keyword
            var result__name
            var result__trailer


            var parse_function = function parse_function(f, /*optional*/  trace) {
                if ('$who' in f) {
                    result__name = f.$who
                } else {
                    result__name = f.name
                }

                if (result__name == '') {
                    if (trace) {
                        if (trace === 'tracing') {
                            result__keyword = trace
                        } else {
                            result__keyword = 'tracing-unnamed-function'
                        }
                    } else {
                        result__keyword = 'unnamed-function'
                    }

                    result__trailer = ''
                    return
                }

                if (trace) {
                    result__keyword = trace
                } else {
                    result__keyword = 'function'
                }

                var s = f.toString()

                if (s.substr(-18) === ' { [native code] }') {           //  `substr` allows negative indexes
                    result__trailer = '() { [native code] }'
                    return
                }

                var open_left_parenthesis  = s.indexOf('(')
                var open_right_parenthesis = s.indexOf(')')

                if (0 < open_left_parenthesis && open_left_parenthesis < open_right_parenthesis) {
                    var open_left_parenthesis__p1 = open_left_parenthesis + 1

                    s = s.substring(open_left_parenthesis, open_right_parenthesis + 1)

                    var carriage_return = s.indexOf('\n')

                    if (carriage_return === -1) {
                        result__trailer = s
                        return
                    }

                    s = s.substr(1, s.length - 2).trim()

                    if (s.endsWith('//,')) {
                        result__trailer = '('
                                        + s.substr(0, s.length - 3).replace(carriage_return__space__pattern, ' ')
                                        + ')'

                        return
                    }
                }

                result__trailer = ''
            }


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
                        return "%c`" + v.$who + "`%c %o"
                    }

                    push_object(v)
                    return '%o'
                }

                if (v_type === 'function') {
                    if ('$trace' in v) {
                        var $trace = v.$trace

                        parse_function($trace, 'tracing')

                        if ('$who' in $trace) {
                            var who = $trace.$who
                        } else {
                            var who = false
                        }
                    } else {
                        parse_function(v)

                        if ('$who' in v) {
                            var who = v.$who
                        } else {
                            var who = false
                        }
                    }

                    push_color_blue()
                    push_color_none()

                    if (result__name === '') {
                        return '%c' + result__keyword + '%c'
                    }

                    push_color_orange()
                    push_color_none()
                    push_string(result__trailer)

                    return '%c' + result__keyword + '%c %c' + (who || result__name) + '%c%s'
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


            var trace_attribute = function trace_attribute(keyword, instance, name, value) {
                if (pending.length > 1) {
                    unbound__group_start_open.apply(console, pending)
                    zap_pending__1_to_end()
                }

                /*[interim] constant*/ {
                    var format = '%c' + keyword + '%c '
                    push_color_blue()
                    push_color_none()
                }

                /*instance*/ {
                    var instance_type = typeof instance

                    if (instance_type === 'object' && instance !== null && ('$who' in instance)) {
                        format += "%c`" + instance.$who + "`%c"
                        push_color_pink()
                        push_color_none()
                    } else if (instance_type === 'function' && instance.name) {
                        parse_function(instance)

                        format += "%c`%c%c" + result__keyword + "%c %c" + result__name + "%c"
                        push_color_pink()
                        push_color_none()
                        push_color_blue()
                        push_color_none()
                        push_color_pink()
                        push_color_none()

                        if ('$trace' in instance) {
                            var $trace = instance.$trace

                            if ('$who' in $trace) {
                                var who = $trace.$who
                            } else {
                                var who = false
                            }

                            format += " %ctracing%c %c" + (who || $trace.name) + "%c"
                            push_color_blue()
                            push_color_none()
                            push_color_pink()
                            push_color_none()
                        }

                        format += "%c`%c"
                        push_color_pink()
                        push_color_none()
                    } else {
                        format += "%c`%c"
                        push_color_pink()
                        push_color_none()

                        format += trace_value(instance)

                        format += "%c`%c"
                        push_color_pink()
                        push_color_none()
                    }
                }

                /*.name*/ {
                    format += '%c.%c%c' + name + '%c'

                    push_color_blue()       //  .
                    push_color_none()
                    push_color_green()      //  name
                    push_color_none()
                }

                /*=*/ {
                    format += ' %c=%c '
                    push_color_blue()
                    push_color_none()
                }

                /*value*/ {
                    format += trace_value(value)
                }

                pending[0] = format

                unbound__line.apply(console, pending)
                zap_pending__1_to_end()
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

                if (arguments.length === 3) {
                    var colored_function_name = '%c' + function_name + '%c'

                    if (function_name.startsWith('new ')) {
                        push_color_bold_cyanish()
                        push_color_normal_none()
                    } else {
                        push_color_green()
                        push_color_none()
                    }
                } else if ('$who' in f) {
                    var colored_function_name = '%c' + f.$who + '%c'

                    push_color_green()
                    push_color_none()
                } else {
                    var colored_function_name = '%c' + f.name + '%c'

                    push_color_green()
                    push_color_none()
                }


                if (argument_list === undefined) {
                    pending[0] = (colored_function_name + '()')
                    return
                }

                var argument_total = argument_list.length

                if ( ! argument_total) {
                    pending[0] = (colored_function_name + '()')
                    return
                }

                for (var i = 0; i < argument_total; i ++) {
                    var v = argument_list[i]

                    if (typeof v === 'string' && v.indexOf('\n') != -1) {
                        //
                        //  A string has a '\n' in it:
                        //      Output each argument on a separate line
                        //

                        format = colored_function_name + '(\n'/*)*/

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

                format = colored_function_name + '('

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


            /*self-trace*/ {
                var trace$execute__$who = 'Gem.Boot.Core.execute'

                var tracing_execute = tracing(trace$execute__$who)
                var tracing_myself  = tracing('execute$setup_Tracing')


                if (tracing_execute || tracing_myself) {
                    var execute = Core.execute

                    execute.$who = trace$execute__$who

                    //
                    //  NOTE:
                    //      We use a fake `execute$setup_Tracing` here, as we don't have the real one (ourselves).
                    //
                    //      This is safer than use `arguments.callee` which is very STRONGLY deprecated.
                    //
                    var myself = function execute$setup_Tracing() {
                    }


                    if (tracing_execute) { function_call(execute, [myself]) }
                    if (tracing_myself)  { function_call(myself)            }
                }
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
                    pending[0] += ' => ' + trace_value(v)
                    unbound__line.apply(console, pending)
                    zap_pending__1_to_end()

                    //  *NO* group_stop here, as group was never started ...
                } else {
                    pending[0] = '=> ' + trace_value(v)
                    unbound__line.apply(console, pending)
                    zap_pending__1_to_end()

                    group_stop()
                }


                _Trace.depth -= 1
            }


            var trace_call = function interim$Gem__Trace__trace_call(f) {
                var trace = Configuration.trace             //  Get newest value of 'trace'
                var name  = f.name

                if ( ! (name in Tracing)) {
                    Tracing[name] = 0
                }

                if (trace === 7 || (trace && Tracing[name])) {
                    function_call(f)

                    var result = f()

                    function_result(result)

                    return result
                }

                return f()
            }


            /*cocoon*/ {
                var cocoon__$who = 'Gem.Boot.Trace.cocoon'

                //
                //  cocoon
                //      Wrap a function around itself for tracing (i.e.: create a self cocoon).
                //
                //      Creates attributes `.$trace` and `.$who` for self traced functions.
                //
                /*cocoon*/ {
                    var cocoon = function Gem__Trace__cocoon(f, /*optional*/ who) {
                        //  Wrap a function around itself for tracing (i.e.: create a self cocoon).
                        //
                        //  Creates attributes `.$trace` and `.$who` for self traced functions.

                        if (arguments.length === 1) {
                            var function_name = f.name
                        } else {
                            var function_name = who
                        }

                        if ( ! (function_name in Tracing)) {
                            //
                            //  Do this first before `Tracing.cocoon` below, to make sure to define `Tracing.cocoon`
                            //  if not already defined.
                            //
                            Tracing[function_name] = 0
                        }

                        var trace = Configuration.trace             //  Get newest value of 'trace'

                        var tracing_self = (trace === 7 || (trace && Tracing[cocoon__$who]))

                        if (tracing_self) {
                            if (tracing_self === 2) {
                                Configuration.trace = 7                     //  Nested trace
                            }

                            function_call(cocoon, arguments)
                        }

                        /*=*/ {
                            //  constant f.$trace = f
                            //  constant f.$who   = function_name

                            property_$trace.value = f
                            property_$who  .value = function_name

                            define_properties(f, self_trace_properties)

                            property_$trace  .value =
                                property_$who.value = undefined

                            /*trace*/ {
                                if (tracing_self) {
                                    trace_attribute('constant', f, '$trace', f)
                                    trace_attribute('constant', f, '$who',   function_name)
                                }
                            }
                        }

                        if (tracing_self) {
                            function_result(f)

                            if (tracing_self === 2) {
                                Configuration.trace = trace                 //  Restore trace
                            }
                        }

                        return f
                    }


                    //  Cocoon myself
                    {
                        //
                        //  Must set `cocoon.$who` temporarly before calling `function_call` inside `cocoon`
                        //      (Reset inside cocooning myself to a permenant constant)
                        //
                        /*=*/ {
                            //  interim mutable cocoon.$who = cocoon__$who
                            cocoon.$who = cocoon__$who
                        }

                        cocoon(cocoon, cocoon__$who)
                    }
                }
            }


            /*wrap_function*/ {
                var wrap_function__$who = 'Gem.Boot.Trace.wrap_function'


                //
                //  wrap_function
                //      Wrap a function for tracing.
                //
                //      For clarity, this function self-traces itself (it could instead be made to wrap itself,
                //      but that gets too confusing, especially when using F10/F11 in developer tools).
                //
                var wrap_function = cocoon(
                    function Gem__Boot__Trace__wrap_function(f, /*optional*/ who) {
                        var trace = Configuration.trace             //  Get newest value of 'trace'

                        var tracing_self = (trace === 7 || (trace && Tracing[wrap_function__$who]))

                        if (tracing_self) {
                            if (tracing_self === 2) {
                                Configuration.trace = 7                     //  Nested trace
                            }

                            function_call(wrap_function, arguments)
                        }

                        if (arguments.length === 1) {
                            if ('$who' in f) {
                                var function_name = f.$who
                            } else {
                                var function_name = f.name
                            }
                        } else {
                            var function_name = who

                            /*=*/ {
                                //  constant f.$who = function_name
                                property_$who.value = function_name
                                define_property(f, '$who', property_$who)
                                property_$who.value = undefined

                                if (tracing_self) {
                                    trace_attribute('constant', f, '$who', function_name)
                                }
                            }
                        }

                        if ( ! (function_name in Tracing)) {
                            Tracing[function_name] = 0
                        }

                        if ('$trace' in f) {
                            throw new Error("TraceError: function `" + function_name + "` already being traced")
                        }


                        var interim$wrap = function interim$wrap(/*...*/) {
                            var trace        = Configuration.trace              //  Get newest value of 'trace'
                            var tracing_self = (trace === 7 || (trace && Tracing[function_name]))

                            if (tracing_self) {
                                if (tracing_self === 2) {
                                    Configuration.trace = 7                     //  Nested trace
                                }

                                function_call(f, arguments, function_name)

                                var r = f.apply(this, arguments)

                                if (r !== undefined) {
                                    function_result(r)

                                    if (tracing_self === 2) {
                                        Configuration.trace = trace             //  Restore trace
                                    }

                                    return r
                                }

                                procedure_done()

                                if (tracing_self === 2) {
                                    Configuration.trace = trace                 //  Restore trace
                                }

                                return
                            }

                            return f.apply(this, arguments)
                        }


                        /*=*/ {
                            //  constant interim$wrap.$trace = f
                            property_$trace.value = f
                            define_property(interim$wrap, '$trace', property_$trace)
                            property_$trace.value = undefined

                            if (tracing_self) {
                                trace_attribute('constant', interim$wrap, '$trace', f)
                            }
                        }

                        if (tracing_self) {
                            function_result(interim$wrap)

                            if (tracing_self === 2) {
                                Configuration.trace = trace                     //  Restore trace
                            }
                        }

                        return interim$wrap
                    },
                    wrap_function__$who//,
                )
            }


            //
            //  Private
            //
            _Trace.function_call         = function_call
            _Trace.function_result       = function_result
            _Trace.group_stop            = group_stop
            _Trace.procedure_done        = procedure_done
            _Trace.push_color_green      = push_color_green
            _Trace.push_color_blue       = push_color_blue
            _Trace.push_color_none       = push_color_none
            _Trace.trace_attribute       = trace_attribute
            _Trace.trace_value           = trace_value
            _Trace.zap_pending__1_to_end = zap_pending__1_to_end
        } else {
            //
            //  Implementation: non trace version
            //
            var cocoon = function interim$Gem__Trace__cocoon(f, /*optional*/ who) {
                return f
            }

            var trace_call = function interim$Gem__Trace__trace_call(f) {
                return f()
            }


            var tracing = function interim$Gem__Trace__tracing(name) {
                return 0
            }


            var wrap_function = function interim$Gem__Trace__wrap_function(f, /*optional*/ who) {
                return f
            }
        }


        //
        //  Cleanup
        //
        delete Gem.Tracing


        //
        //  Export: Box
        //
        if (clarity) {
            Box.property_$what = property_$what
        }

        if (clarity || trace) {
            Box.property_$who  = property_$who
        }


        //
        //  Export: Trace
        //
        Trace.cocoon        = cocoon
        Trace.trace_call    = trace_call
        Trace.tracing       = tracing
        Trace.wrap_function = wrap_function


        //
        //  Finish tracing execute & myself
        //
        /*self-trace*/ {
            if (tracing_execute) { procedure_done() }
            if (tracing_myself)  { procedure_done() }
        }
    }//,
)


//
//  Gem.Boot.Core.execute:
//      Execute code inside a function (to allow local variables)
//
//  NOTE:
//      The reason the function is named `trace$Gem__Boot__Core__execute` (meaning "tracing" version of
//      `Gem.Boot.Core.execute`) is so that it shows up in stack traces as the full name
//      `trace$Gem__Boot__Core__execute` instead of shorter name `execute` (this is really really helpful when
//      reading stack traces).
//
if (Gem.Configuration.trace) {
    Gem.Boot.Core.execute(
        function execute$codify$trace$Gem__Core__execute() {
            //
            //  Imports
            //
            var Gem = window.Gem

            var Node = Gem.Boot

            var _Trace        = Node._.Trace
            var Configuration = Gem.Configuration
            var Core          = Node.Core
            var Trace         = Node.Trace
            var Tracing       = Node.Tracing

            var cocoon         = Trace.cocoon
            var execute        = Core.execute
            var function_call  = _Trace.function_call
            var procedure_done = _Trace.procedure_done
            var tracing        = Trace.tracing


            //
            //  Tracing `execute` and myself
            //
            //  NOTE:
            //      Here we both trace *THIS* call to `Gem.Boot.Core.execute` ...
            //          ... and then in *FUTURE* calls we also trace calls to `Gem.Boot.Core.execute`
            //              (i.e.: `trace$Gem__Core__execute`).
            //

            //
            //  NOTE:
            //      We use a fake `execute$setup_Tracing` here, as we don't have the real one (ourselves).
            //
            //      This is safer than using `arguments.callee` which is very STRONGLY deprecated.
            //
            var myself              = function execute$codify$trace$Gem__Core__execute() {}
            var trace$execute__$who = 'Gem.Boot.Core.execute'


            var tracing_execute = tracing(trace$execute__$who)
            var tracing_myself  = tracing(myself.name)


            if (tracing_execute) { function_call(execute, [myself]) }
            if (tracing_myself)  { function_call(myself) }


            /*execute*/ {
                var trace$execute = cocoon(
                    function trace$Gem__Core__execute(code) {
                        //  Self-tracing version of:
                        //      Execute code defined in a function.  This allows the use of local variables.

                        var trace = Configuration.trace             //  Get newest value of 'trace'

                        var tracing_execute = (trace === 7 || (trace && Tracing[trace$execute__$who]))

                        if ( ! (code.name in Tracing)) {
                            Tracing[code.name] = 0
                        }

                        var tracing_code = (trace === 7 || tracing_execute === 2 || (trace && Tracing[code.name]))

                        if (tracing_execute) {
                            if (tracing_execute === 2) {
                                Configuration.trace = 7                     //  Nested trace
                            }

                            function_call(trace$execute, arguments)
                        }

                        if (tracing_code) {
                            if (tracing_code === 2) {
                                Configuration.trace = 7                     //  Nested trace
                            }

                            function_call(code)
                        }

                        code()

                        if (tracing_code) {
                            procedure_done()

                            if (tracing_code === 2) {
                                Configuration.trace = trace                 //  Restore trace
                            }
                        }

                        if (tracing_execute) {
                            procedure_done()

                            if (tracing_execute === 2) {
                                Configuration.trace = trace                 //  Restore trace
                            }
                        }
                    },
                    trace$execute__$who//,
                )

                Core.execute = trace$execute       //  TEMPORARY as "iterim mutable": Changed below to "constant"
            }


            if (tracing_myself)  { procedure_done() }
            if (tracing_execute) { procedure_done() }
        }//,
    )
}


Gem.Boot.Core.execute(
    function execute$setup$Gem__private__Core__codify_core_methods() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var _Core = Node._.Core
        var Trace = Node.Trace

        var wrap_function = Trace.wrap_function


        //
        //  Implementation
        //
        var codify_core_methods = wrap_function(
            function Gem__private__Core__codify_core_methods(Node, interim, method_common) {
                //
                //  Imports
                //
                var _Core = Node._.Core
                var Core  = Node.Core
                var Trace = Node.Trace

                var produce_method_common = _Core.produce_method_common
                var trace_call            = Trace.trace_call


                //
                //  Implementation
                //
                var method = function Gem__Core__method(instance, who, $what, method) {
                    //  Store a method.
                    //
                    //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                    //
                    //  NOTE:
                    //      This is the [second] interim boot version of `method`.

                    method_common(instance, false, who, $what, method)
                }


                var interim_method = function Gem__Core__interim_method(instance, who, $what, method) {
                    //  Store an interim method.
                    //
                    //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                    //
                    //  NOTE:
                    //      This is the [second] interim boot version of `interim_method`.

                    method_common(instance, true, who, $what, method)
                }


                if (interim) {
                    var duration_method = interim_method
                } else {
                    var duration_method = method
                }


                //
                //  Gem.Boot.Core.codify_interim_method
                //      Create the code for an interim method as a closure to avoid the use of any global variables.
                //
                //      Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                //
                //      NOTE:
                //          This is the [second] interim boot version of `codify_interim_method`.
                //
                duration_method(
                    Core,
                    'codify_interim_method',
                    (
                          'Create the code for an interim method as a closure to avoid the use of any global'
                        + ' variables.\n'
                        + '\n'
                        + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the function.'
                        + '\n'
                        + 'NOTE:\n'
                        + "    This is the [second] interim boot version of `codify_interim_method`."
                    ),
                    function Gem__Core__codify_interim_method(instance, who, $what, codifier) {
                        //  Create the code for an interim method as a closure to avoid the use of any global variables.
                        //
                        //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                        //
                        //  NOTE:
                        //      This is the [second] interim boot version of `codify_interim_method`.

                        var codified_method = trace_call(codifier)

                        method_common(instance, true, who, $what, codified_method)
                    }//,
                )


                //
                //  Gem.Boot.Core.codify_method
                //      Create the code for a method as a closure to avoid the use of any global variables.
                //
                //      Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                //
                //      NOTE:
                //          This is the [second] interim boot version of `codify_method`.
                //
                duration_method(
                    Core,
                    'codify_method',
                    (
                          'Create the code for a method as a closure to avoid the use of any global variables.\n'
                        + '\n'
                        + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the function.'
                        + '\n'
                        + 'NOTE:\n'
                        + "    This is the [second] interim boot version of `codify_method`."
                    ),
                    function Gem__Core__codify_method(instance, who, $what, codifier) {
                        //  Create the code for a method as a closure to avoid the use of any global variables.
                        //
                        //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                        //
                        //  NOTE:
                        //      This is the [second] interim boot version of `codify_interim_method`.

                        var codified_method = trace_call(codifier)

                        method_common(instance, false, who, $what, codified_method)
                    }//,
                )


                //
                //  Gem.Boot.Core.interim_method
                //      Store an interim method.
                //
                //      Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                //
                //      NOTE:
                //          This is the [second] interim boot version of `interim_method`.
                //
                duration_method(
                    Core,
                    'interim_method',
                    (
                          'Store an interim method (i.e.: the method can be replace later).\n'
                        + '\n'
                        + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the function.'
                        + '\n'
                        + 'NOTE:\n'
                        + "    This is the [second] interim boot version of `interim_method`."
                    ),
                    interim_method//,
                )


                //
                //  Gem.Boot.Core.method
                //      Store a method.
                //
                //      Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                //
                //      NOTE:
                //          This is the [second] interim boot version of `method`.
                //
                duration_method(
                    Core,
                    'method',
                    (
                          'Store a method.\n'
                        + '\n'
                        + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the function.'
                        + '\n'
                        + 'NOTE:\n'
                        + "    This is the [second] interim boot version of `method`."
                    ),
                    method//,
                )
            },
            'Gem.Boot._.Core.codify_core_methods'//,
        )


        _Core.codify_core_methods = codify_core_methods
    }//,
)


//
//  Stubs for:
//      Gem.Boot.Core.{clarity_note,codify_interim_method,codify_method,constant,interim_method,method,qualify_constant}
//
Gem.Boot.Core.execute(
    function execute$setup_Gem() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var _             = Node._
        var _Core         = _.Core
        var Box           = Node.Box
        var Core          = Node.Core
        var Script        = Node.Script
        var Trace         = Node.Trace
        var Configuration = Gem.Configuration

        var clarity             = Configuration.clarity
        var cocoon              = Trace.cocoon
        var codify_core_methods = _Core.codify_core_methods
        var create_Object       = Object.create
        var define_properties   = Object.defineProperties
        var define_property     = Object.defineProperty
        var seal                = Object.seal
        var trace               = Configuration.trace
        var trace_call          = Trace.trace_call
        var tracing             = Trace.tracing
        var wrap_function       = Trace.wrap_function

        if (clarity) {
            var property_$what = Box.property_$what 
        }

        if (clarity || trace) {
            var property_$who = Box.property_$who
        }

        if (trace) {
            var _Trace  = _.Trace
            var Tracing = Node.Tracing

            var function_call   = _Trace.function_call
            var procedure_done  = _Trace.procedure_done
            var trace_attribute = _Trace.trace_attribute
            var trace_value     = _Trace.trace_value
        }



        //
        //  Closures
        //      Read 'invisible' to mean 'not enumerable'.
        //      Read 'visible' to mean 'enumerable'.
        //
        //      Enumerable properties are shown better in Developer Tools (at the top of the list,
        //      and not grayed out).
        //
        //
        if (clarity) {
            var property___prefix = {
                $who         : 'Gem.Box.property___prefix',
                $what        : "`Gem.Box.property___prefix` is used to create a `._prefix` attribute",
                configurable : false,                               //  Default value, shown for clarity
                enumerable   : true,
                writable     : false,                               //  Default value, shown for clarity
                value        : undefined//,
            }

            var module_properties = create_Object(
                null,
                {
                    '$who'    : { enumerable : true, value : property_$who     },
                    '$what'   : { enumerable : true, value : property_$what    },
                    '_prefix' : { enumerable : true, value : property___prefix },
                }//,
            )

            var $who_$what_properties = create_Object(
                null,
                {
                    '$who'  : { enumerable : true, value : property_$who  },
                    '$what' : { enumerable : true, value : property_$what },
                }//,
            )
        }


        //
        //  constant_property
        //
        //      This is used to create an attribute:
        //
        //          1.  "permenant" (i.e.: not reconfigurable);
        //          2.  "visible" (i.e.: enumerable);
        //          3.  "constant" (i.e.: not writable)
        //          4.  with a value to be determined later
        //
        var constant_property = {
            $who         : 'Gem.Box.constant_property',
            $what        : "`Gem.Box.constant_property` is used to create constant attributes",
            configurable : false,                               //  Default value, shown for clarity
            enumerable   : true,
            writable     : false,                               //  Default value, shown for clarity
            value        : undefined//,
        }

        if (clarity) {
            var constant_constant$_attributes = {
            //  [name]       : constant_property
            //  [name + '$'] : property_$what
            }
        }


        //
        //  interim_constant_property
        //
        //      This is used to create an attribute:
        //
        //      This is used to create a property:
        //
        //          1.  "interim" (i.e.: reconfigurable);
        //          2.  "visible" (i.e.: enumerable);
        //          3.  "constant" (i.e.: not writable)
        //          4.  with a value to be determined later
        //
        var interim_constant_property =  {
            $who         : 'Gem.Box.interim_constant_property',
            $what        : "`Gem.Box.interi_constant_property` is used to create interim constant attributes",
            configurable : true,
            enumerable   : true,
            writable     : false,                               //  Default value, shown for clarity
            value        : undefined//,
        }


        //
        //  Implementation
        //
        /*constant_attribute*/ {
            var constant_attribute__$who = 'Gem.Boot._.Core.constant_attribute'


            var constant_attribute = wrap_function(
                function Gem__private__Core__constant_attribute(instance, name, value) {
                    //  Create a (non reconfigurable) constant attribute.

                    /*=*/ {
                        //  constant instance.*name = value
                        constant_property.value = value
                        define_property(instance, name, constant_property)
                        constant_property.value = undefined

                        if (tracing(constant_attribute__$who)) {
                            trace_attribute('constant', instance, name, value)
                        }
                    }
                },
                constant_attribute__$who//,
            )
        }


        var interim_constant_attribute = wrap_function(
            function interim_constant_attribute(instance, name, value) {
                //  Create an interim (reconfigurable) constant attribute.

                /*=*/ {
                    //  interim constant instance.*name = value
                    interim_constant_property.value = value
                    define_property(instance, name, interim_constant_property)
                    interim_constant_property.value = undefined

                    if (tracing('interim_constant_attribute')) {
                        trace_attribute('interim constant', instance, name, value)
                    }
                }
            }//,
        )


        if (clarity || trace) {
            //
            //  produce_who_what
            //      Produce a `who_what` function that:
            //          Set the `.$who`, `.$what`, & `._prefix' of a Gem Modules.
            //
            var produce_who_what = wrap_function(
                function Gem__private__Core__produce_who_what(
                    dot_pattern, duration_property_$who, duration_property_$what, duration_property___prefix,
                    duration_module_properties, duration_$who_$what_properties//,
                ) {
                    return cocoon(
                        function who_what(module, $who, $what, create_prefix) {
                            //  who_what
                            //      Set the `.$who`, `.$what`, & `._prefix' of a Gem Modules.
                            var trace = Configuration.trace             //  Get newest value of 'trace'

                            var tracing_self = (trace === 7 || (trace && Tracing.who_what))

                            if (tracing_self) {
                                if (tracing_self === 2) {
                                    Configuration.trace = 7                     //  Nested trace
                                }

                                //
                                //  Must set `module.$who` temporarly before calling `function_call`
                                //      (Reset below to a [possibly] permenant constant)
                                //
                                /*=*/ {
                                     //  interim constant module.$who = $who
                                     interim_constant_property.value = $who
                                     define_property(module, '$who', interim_constant_property)
                                     interim_constant_property.value = undefined
                                }

                                function_call(who_what, arguments)
                            }

                            if (clarity && create_prefix) {
                                if ($who.startsWith('Gem.Boot._.')) {
                                    var _prefix = $who.replace('Gem.Boot._.', 'Gem__private__')
                                } else if ($who.startsWith('Gem.Boot.')) {
                                    var _prefix = $who.replace('Gem.Boot.', 'Gem__')
                                } else {
                                    var _prefix = $who
                                }

                                var _prefix = _prefix.replace(dot_pattern, '__')
                            }

                            /*=*/ {
                                //  constant            module.$who    = $who
                                //  [constant           module.$what   = $what]         //  Optional
                                //  [invisible constant module._prefix = _prefix]       //  Optional
                                property_$who.value = $who

                                if (clarity) {
                                    property_$what.value = $what

                                    if (create_prefix) {
                                        property___prefix.value = _prefix
                                        define_properties(module, module_properties)
                                        property___prefix.value = undefined
                                    } else {
                                        define_properties(module, $who_$what_properties)
                                    }

                                    property_$what.value = undefined
                                } else {
                                    //
                                    //  trace mode without clarity mode: only need `$who`, do *NOT* need `$what` &
                                    //  `__prefix`.
                                    //
                                    define_property(module, '$who', property_$who)
                                }

                                property_$who.value = undefined

                                if (tracing_self) {
                                    trace_attribute('constant', module, '$who', $who)

                                    if (clarity) {
                                        trace_attribute('constant', module, '$what', $what)

                                        if (create_prefix) {
                                            trace_attribute('invisible constant', module, '_prefix', _prefix)
                                        }
                                    }
                                }
                            }

                            if (tracing_self) {
                                procedure_done()

                                if (tracing_self === 2) {
                                    Configuration.trace = trace                 //  Restore trace
                                }
                            }
                        }//,
                    )
                }//,
            )

            //
            //  who_what
            //      Set the `.$who`, `.$what`, & `._prefix' of a Gem Modules.
            //
            //  NOTE:
            //      This interim implementation of `who_what` only replaces a single "." since it does not use
            //      regular expressions with the "g" flag.
            //
            //      Also it does not pay attention to `Gem.Script.dynamic`.
            //
            //      See updated version in "Gem/Boot/Boot4_WhoWhat.js".
            //
            var who_what = produce_who_what(
                '.', property_$who, property_$what, property___prefix, module_properties, $who_$what_properties//,
            )

            who_what(Gem,      'Gem',      'The only global variable used by Gem.',       false)
            who_what(Gem.Boot, 'Gem.Boot', 'Temporary support code during boot process.', true)

            who_what(Gem.Boot.Box,        'Gem.Boot.Box',        'Exports of the Boot.Box module.',          true)
            who_what(Gem.Boot.Core,       'Gem.Boot.Core',       'Exports of the Boot.Core module.',         true)
            who_what(Gem.Boot.NodeWebKit, 'Gem.Boot.NodeWebKit', 'Exports of the Boot.NodeWebKit module.',   true)
            who_what(Gem.Boot.Script,     'Gem.Boot.Script',     "`<script>` handling during boot process.", false)
            who_what(Gem.Boot.Trace,      'Gem.Boot.Trace',      'Exports of the Boot.Trace module.',        true)

            who_what(
                Gem.Boot._.Core,
                'Gem.Boot._.Core',
                'Private members & methods of the Boot.Core Gem module.',
                true//,
            )

            Gem.Boot._.Core.produce_who_what = produce_who_what
        }


        //
        //  Stubs:
        //      See "Gem/Beryl/Boot2_Dyanmic.js" for full implementation of `method_common`
        //
        /*method_common*/ {
            if (trace && ! ('method_common' in Tracing)) {
                Tracing.method_common = 0
            }

            //
            //  variable `method_common` is needed as the method refers to itself when tracing.
            //
            var method_common = cocoon(
                function method_common(instance, interim, who, $what, method) {
                    //  Support code to store a [possibly interim] Gem Method.
                    //
                    //  Also in clarity mode adds a `.$who` and `.$what` attributes to the method.

                    var trace        = Configuration.trace             //  Get newest value of 'trace'
                    var tracing_self = (trace === 7 || (trace && Tracing.method_common))

                    if (tracing_self) {
                        if (tracing_self === 2) {
                            Configuration.trace = 7                     //  Nested trace
                        }

                        function_call(method_common, arguments)
                    }

                    var function_name = null

                    if (trace) {
                        if ('$trace' in method) {
                            var wrapped_method = method
                        } else {
                            var function_name  = instance.$who + '.' + who
                            var wrapped_method = wrap_function(method, function_name)

                            if (clarity) {
                                /*=*/ {
                                    //  constant method.$who  = function_name
                                    //  constant method.$what = $what
                                    property_$who .value = 'TRACE: ' + function_name
                                    property_$what.value = 'TRACE: ' + $what

                                    define_properties(wrapped_method, $who_$what_properties)

                                    property_$who     .value =
                                        property_$what.value = undefined

                                    if (tracing_self) {
                                        trace_attribute('constant', wrapped_method, '$who',  'TRACE: ' + function_name)
                                        trace_attribute('constant', wrapped_method, '$what', 'TRACE: ' + $what)
                                    }
                                }
                            }
                        }
                    } else {
                        var wrapped_method = method
                    }

                    if (clarity) {
                        if (function_name === null) {
                            function_name = instance.$who + '.' + who
                        }

                        /*=*/ {
                            //  constant method.$who  = function_name
                            //  constant method.$what = $what
                            property_$who .value = function_name
                            property_$what.value = $what

                            define_properties(method, $who_$what_properties)

                            property_$who     .value =
                                property_$what.value = undefined

                            if (tracing_self) {
                                trace_attribute('constant', method, '$who',  function_name)
                                trace_attribute('constant', method, '$what', $what)
                            }
                        }
                    }

                    if (interim) {
                        /*=*/ {
                            //  interim constant instance.*who = wrapped_method
                            interim_constant_property.value = wrapped_method
                            define_property(instance, who, interim_constant_property)
                            interim_constant_property.value = undefined

                            if (tracing_self) {
                                trace_attribute('interim constant', instance, who, wrapped_method)
                            }
                        }
                    } else {
                        /*=*/ {
                            //  [interim] constant instance.*who = wrapped_method
                            constant_property.value = wrapped_method
                            define_property(instance, who, constant_property)
                            constant_property.value = undefined

                            if (tracing_self) {
                                trace_attribute('constant', instance, who, wrapped_method)
                            }
                        }
                    }

                    if (tracing_self) {
                        procedure_done()

                        if (tracing_self === 2) {
                            Configuration.trace = trace                 //  Restore trace
                        }
                    }
                }//,
            )
        }


        //
        //  Gem.Boot.Core.{codify_interim_method,codify_method,interim_method,method}
        //
        codify_core_methods(Node, true, method_common)


        //
        //  Import: Recently created `method`
        //
        var method = Core.method


//  <stubs: constant, qualify_constant>                     //  Start of stubs #2
        //
        //  Gem.Core.constant
        //      Store a global Gem constant.
        //
        //      Also in clarity mode adds an explanation of what the constant does.
        //
        var constant = wrap_function(
            function Gem__Core__constant(instance, who, $what, value) {
                //  Store a global Gem constant.
                //
                //  Also in clarity mode adds an explanation of what the constant does.
                //
                //  NOTE:
                //      This is the interim boot version of `constant`.
                //
                if (clarity) {
                    var who$ = who + '$'

                    /*=*/ {
                        //  constant instance.*who       = value
                        //  constant instance[who + '$'] = $what
                        constant_property.value = value
                        property_$what   .value = $what

                        constant_constant$_attributes[who ] = constant_property
                        constant_constant$_attributes[who$] = property_$what

                        define_properties(instance, constant_constant$_attributes)

                        delete constant_constant$_attributes[who ]
                        delete constant_constant$_attributes[who$]

                        constant_property .value =
                            property_$what.value = undefined

                        if (tracing('Gem.Boot.Core.constant')) {
                            trace_attribute('constant', instance, who,  value)
                            trace_attribute('constant', instance, who$, $what)
                        }
                    }
                } else {
                    /*=*/ {
                        //  constant instance.*who = value
                        constant_attribute(instance, who, value)
                    }
                }
            },
            'Gem.Boot.Core.Constant'//,
        )


        //
        //  Gem.Boot.Core.constant
        //
        method(
            Core,
            'constant',
            (
                  'Store a global Gem constant.\n'
                + '\n'
                + 'Also in clarity mode adds an explanation of what the constant does.\n'
                + '\n'
                + 'NOTE:\n'
                + "    This is the interim boot version of `constant`."
            ),
            constant//,
        )


        //
        //  Gem.Boot.Core.qualify_constant
        //
        method(
            Core,
            'qualify_constant',
            (
                  'Qualify a global Gem constant.\n'
                + '\n'
                + "The `qualifier` argument is a function that returns the value of the constant."
                + '\n'
                + 'Also in clarity mode adds an explanation of what the constant does.'
                + '\n'
                + 'NOTE:\n'
                + "    This is the interim boot version of `qualify_method`."
            ),
            function Gem__Core__qualify_constant(instance, who, $what, qualifier) {
                //  Qualify a global Gem constant.
                //
                //  The `qualifier` argument is a function that returns the value of the constant.
                //
                //  Also in clarity mode adds an explanation of what the variable does.
                //
                //  NOTE:
                //      This is the interim boot version of `qualify_constant`.

                var value = trace_call(qualifier)

                constant(instance, who, $what, value)
            }//,
        )


        //
        //  Gem.Boot.Box.$who_$what_properties
        //      A box of properties to create a `.$who`, `.$what`, and `._prefix` attributes.
        //
        constant(
            Box,
            '$who_$what_properties',
            "A box of properties to create a `.$who`, `.$what`, and `._prefix` attriutes.",
            $who_$what_properties//,
        )


        //
        //  Gem.Boot.Box.constant_attribute
        //
        //  NOTE:
        //      This was set above as a "visible_mutable", change it now to a "constant".
        //
        method(
            Box,
            'constant_attribute',
            'Create a [non reconfigurable] visible constant attribute.',
            constant_attribute//,
        )


        //
        //  Gem.Boot.Box.constant_property
        //      A property used to create a constant attribute.
        //
        constant(
            Box,
            'constant_property',
            "A property used to create a constant attribute.",
            constant_property//,
        )

        //
        //  Gem.Boot.Box.interim_constant_attribute
        //
        method(
            Box,
            'interim_constant_attribute',
            'Create an iterim (i.e.: reconfigurable) visible constant attribute.',
            interim_constant_attribute//,
        )


        //
        //  Gem.Boot.Box.interim_constant_property
        //      A property used to create an iterim constant attribute.
        //
        constant(
            Box,
            'interim_constant_property',
            "A property used to create an interim constant attribute.",
            interim_constant_property//,
        )


        //
        //  Gem.Boot.Box.module_properties
        //      A box of properties to create a `.$who` and `.$what` attributes.
        //
        constant(
            Box,
            'module_properties',
            "A box of properties to create a `.$who` and `.$what` attriutes.",
            $who_$what_properties//,
        )


        //
        //  Gem.Boot.Box.property___prefix
        //      A property used to create a `._prefix` attribute
        //
        constant(
            Box,
            'property___prefix',
            "A property used to create a `._prefix` attribute.",
            property___prefix//,
        )


        //
        //  Gem.Boot.Core.clarity_note
        //
        method(
            Core,
            'clarity_note',
            (
                  'Add a note to a variable or set of variables (clarity mode only).'
                + '\n'
                + 'NOTE:\n'
                + "    This is the interim boot version of `clarity_note`."
            ),
            function Gem__Core__clarity_note(instance, who, $what) {
                //  Add a note to a variable or set of variables (clarity mode only).
                //
                //  NOTE:
                //      This is the interim boot version of `clarity_note`.

                if (clarity) {
                    /*=*/ {
                        //  instance[who + '$NOTE'] = $what
                        constant_attribute(instance, who + '$NOTE', $what)
                    }
                }
            }
        )
    }
)


//
//  Gem.Boot.Core.execute
//      Create a (non reconfigurable) constant attribute.
//
//  NOTE:
//      This was set above as a "visible_mutable", change it now to a "constant".
//
Gem.Boot.Core.method(
    Gem.Boot.Core,
    'execute',
    'Execute code defined in a function.  This allows the use of local variables.',
    Gem.Boot.Core.execute//,
)


//
//  Gem.Boot._.Core.gem_changed
//      Array of callback's when `Gem` is changed (clarity mode only).
//
if (Gem.Configuration.clarity) {
    Gem.Boot.Core.constant(
        Gem.Boot._.Core,
        'clarity_mode$global_variable_Gem_changed',
        "Array of callback's when `Gem` is changed (clarity mode only).",
        []//,
    )
}


//
//  Gem.Boot.NodeWebKit.is_version_012_or_lower         - `true` if using nw.js & it's version 0.12 or lower.
//  Gem.Boot.NodeWebKit.is_version_013_or_greater       - `true` if using nw.js & it's version 0.13 or greater.
//
//  NOTE:
//      If not using nw.js, then both `Gem.Boot.NodeWebKit.is_version_{12_or_lower,13_or_higher}` will be `false`.
//
Gem.Boot.Core.execute(
    function execute$qualify__Gem__Boot__NodeWebKit__version() {
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
        Gem.Boot.Core.constant(
            Gem.Boot.NodeWebKit,
            'is_NodeWebKit',
            "`Gem.Boot.NodeWebKit.is_nodeWebKit` is `true` if using nw.js",
            major >= 0//,
        )


        Gem.Boot.Core.constant(
            Gem.Boot.NodeWebKit,
            'is_version_012_or_lower',
            "`Gem.NodeWebKit.is_version_012_or_lower` is `true` if using nw.js & it's version 0.12 or lower.",
            (major === 0 && minor <= 12)//,
        )

        Gem.Boot.Core.constant(
            Gem.Boot.NodeWebKit,
            'is_version_013_or_higher',
            "`Gem.Boot.NodeWebKit.is_version_013_or_higher` is `true` if using nw.js & it's version 0.13 or greater.",
            (major >  0 || minor >= 13)//,
        )

        Gem.Boot.Core.clarity_note(
            Gem.Boot.NodeWebKit,
            'is_version_{012_or_lower,013_or_higher}',
            (
                  "If not using nw.js, then both `Gem.Boot.NodeWebkit.is_version_{012_or_lower,013_or_higher}`"
                + " will be `false`."
            )//,
        )
    }
)


//
//  Gem.Boot.NodeWebKit.show_developer_tools
//      Show developer tools.
//
if (Gem.Boot.NodeWebKit.is_version_012_or_lower) {              //  Show developer tools (nw.js 0.12 or lower)
    Gem.Boot.Core.codify_method(
        Gem.Boot.NodeWebKit,
        'show_developer_tools',
        'Show developer tools (nw.js 0.12 or lower).',
        function codifier$Gem__Boot__NodeWebKit__show_developer_tools() {
            var game_window = require('nw.gui').Window.get()

            return function Gem__Boot__NodeWebKit__show_developer_tools() {
                //  Show developer tools (nw.js 0.12 or lower).

                game_window.showDevTools()
            }
        }
    )
} else if (Gem.Boot.NodeWebKit.is_version_013_or_higher) {      //  Show developer tools (nw.js 0.13 or higher)
    Gem.Boot.Core.codify_method(
        Gem.Boot.NodeWebKit,
        'show_developer_tools',
        'Show developer tools (nw.js 0.13 or higher).',
        function codifier$Gem__Boot__NodeWebKit__show_developer_tools() {
            var game_window = nw.Window.get()

            return function Gem__Boot__NodeWebKit__show_developer_tools() {
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
    Gem.Boot.Core.method(
        Gem.Boot.NodeWebKit,
        'show_developer_tools',
        "Empty function -- Not using nw.js: Don't show developer tools.",
        function Gem__Boot__NodeWebKit__show_developer_tools() {
            //  Empty function -- Not using nw.js: Don't show developer tools.
        }
    )
}


//
//  Gem.Boot.Script.handle_errors
//
//  NOTE:
//      We only handle script events (and thus bring up an alert) if five conditions are met:
//
//          1.  Configured to capture errors (i.e.: `Gem.Configuration.capture_error` is set);
//          2.  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.);
//          3.  This is running in RPG Maker MV "test" mode;
//          4.  The browser has a `.addEventListener` method (all modern browsers do);
//          5.  The browser has a `.setAttribute`     method (all modern browsers do).
//
Gem.Boot.Core.constant(
    Gem.Boot.Script,
    'handle_errors',
    "`Gem.Boot.Script.handle_errors` is `true` if handling `<script>` errors.",
    (
           Gem.Configuration.capture_error                  //  1.  Configured to capture errors;
        && Gem.Boot.NodeWebKit.is_NodeWebKit                //  2.  This is running under nw.js;
        && (
                  ('Utils' in window)                       //  3.  This is running in RPG Maker MV ...
               && Utils.isOptionValid('test')               //      ... "test" mode;
           )
        && ('addEventListener' in window)                   //  4.  The browser has a `.addEventListener` method; AND
        && ('setAttribute'     in document.head)            //  5.  The browser has a `.setAttribute`     method.
    )//,
)


if (Gem.Boot.Script.handle_errors) {
    //
    //  Gem.Boot.Script.source_attribute
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
    Gem.Boot.Core.codify_method(
        Gem.Boot.Script,
        'source_attribute',
        "Get an unmodified `.src` attribute from a DOM (domain object model) element.",
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
    //  Gem.Boot.Script.error
    //      Show an error (either with `alert` or `console.error`).
    //
    Gem.Boot.Core.codify_method(
        Gem.Boot.Script,
        'script_error',
        'Show an error (either with alert or console.error).',
        function codifier$Gem__Script__script_error() {
            //
            //  Imports
            //
            var Gem = window.Gem

            var Boot_NodeWebKit = Gem.Boot.NodeWebKit
            var Configuration   = Gem.Configuration

            var show_alert           = Configuration.show_alert
            var show_developer_tools = Boot_NodeWebKit.show_developer_tools
            var trace                = Configuration.trace


            //
            //  Implementation
            //
            if (show_alert) {
                //
                //  Imports: alert version
                //
                var alert = window.alert

                //
                //  Implementation: alert version
                //
                return function Gem__Script__error(message) {
                    alert(message + '\n' + 'Please see Developer Tools for full error')
                    show_developer_tools()
                }
            }


            //
            //  Import: console version
            //
            var console = window.console

            //
            //  Implementation: console version
            //
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
    //  Gem.Boot.Script.handle_global_error
    //      Handle errors when executing a `<script>` tag.
    //
    Gem.Boot.Core.codify_method(
        Gem.Boot.Script,
        'handle_global_error',
        "Handle errors when executing a `<script>` tag.",
        function codifier$Gem__Script__handle_global_error() {
            //
            //  Imports
            //
            var document = window.document
            var Gem      = window.Gem

            var Boot_Script = Gem.Boot.Script

            var script_error     = Boot_Script.script_error
            var source_attribute = Boot_Script.source_attribute


            //
            //  Implementation
            //
            var handle_global_error = function Gem__Script__handle_global_error(e) {
                //  Handle errors when executing a `<script>` tag

                if ( ! ('currentScript' in document))  {
                    debugger                                    //  QUESTION: Is this even possible?
                    return
                }

                var tag = document.currentScript

                if ( ! tag) {
                    return
                }

                script_error(e.error.stack)
            }


            window.addEventListener('error', handle_global_error)

            return handle_global_error
        }
    )


    //
    //  Gem.Script.handle_event
    //      Handle events of `<script>` tags
    //
    Gem.Boot.Core.codify_interim_method(
        Gem.Boot.Script,
        'handle_event',
        "Handle events of `<script>` tags",
        function codifier$Gem__Script__handle_event() {
            //
            //  Imports
            //
            var Gem = window.Gem

            var Node = Gem.Boot

            var Script = Node.Script

            var script_error      = Script.script_error
            var script_event_list = Script.event_list
            var source_attribute  = Script.source_attribute


            //
            //  Implementation
            //

            //
            //  NOTES #1, #2, & #3:
            //      See the NOTE #1, #2 & #3 in "Gem/Boot/Boot2_Dynamic.js"
            //
            var handle_event = function Gem__Script__handle_event(e) {
                //  Handle events of `<script>` tags

                var tag = e.target

                for (var i = 0; i < script_event_list.length; i ++) {
                    var type = script_event_list[i]

                    //
                    //  Refer to myself using 'handle_event'.  See NOTE #1 in "Gem/Boot/Boot2_Dynamic.js"
                    //
                    tag.removeEventListener(type, handle_event)
                }

                if (e.type === 'abort' || e.type === 'error') {
                    script_error(source_attribute(tag) + ': Failed to load')
                }
            }


            return handle_event
        }//,
    )
}


//
//  Gem.Boot.Script.gem_scripts
//
Gem.Boot.Core.qualify_constant(
    Gem.Boot.Script,
    'gem_scripts',
    "`div#gem_scripts` is the parent of all Gem `<script>` tags and is inserted into `document.head`.",
    function qualifier$Gem__Script__gem_scripts() {
        var id          = 'gem_scripts'
        var gem_scripts = document.getElementById(id)

        if (gem_scripts === null) {
            gem_scripts = document.createElement('div')

            if ('setAttribute' in gem_scripts) {
                gem_scripts.setAttribute('id', id)              //  Modern browser: set `gem_scripts`.id
            } else {
                gem_scripts.id = id                             //  Ancient browser: set `gem_scripts`.id
            }
        }

        document.head.appendChild(gem_scripts)

        return gem_scripts
    }
)


//
//  Gem.Boot.Script.codify_load
//      Codify method `Gem.Boot.Script.load`.
//
//      This routine can be called multiple times:
//
//          1.  Initially;
//          2.  Again, in clarity mode, after `Gem` is replaced.
//
Gem.Boot.Core.codify_method(
    Gem.Boot.Script,
    'codify_load',
    (
          "Codify method `Gem.Boot.Script.load`.\n"
        + '\n'
        + 'This routine can be called multiple times:\n'
        + '\n'
        + '    1.  Initially;\n'
        + "    2.  Again, in Clarity mode, after global variable `Gem` is replaced."
    ),
    function codifier$Gem__Boot__Script__codify_load() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Boot_Script = Gem.Boot.Script

        var gem_scripts       = Boot_Script.gem_scripts
        var handle_errors     = Boot_Script.handle_errors
        var script_event_list = Boot_Script.event_list
//      var script_map        = Boot_Script.script_map           //  Not valid here -- *MUST* be done below


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


        if (handle_errors) {
            return function Gem__Boot__Script__codify_load(Node, duration_method) {
                //  Codify method `Gem.Boot.Script.load`.
                //
                //  This routine can be called multiple times:
                //
                //      1.  Initially;
                //      2.  Again, in clarity mode, after `Gem` is replaced.

                //
                //  Imports
                //
                var Script = Node.Script
                var Core   = Node.Core

                var script_map          = Script.script_map    //  Reload latest `Gem.Boot.Script.script_map`
                var script_handle_event = Script.handle_event  //  Reload latest `Gem.Boot.Script.handle_event`


                //
                //  Implementation
                //

                //
                //  Gem.Boot.Script.load
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
                duration_method(
                    Script,
                    'load',
                    (
                          "Load JavaScript code using a `<script>` tag.\n"
                        + '(Version for a modern browser).'
                    ),
                    function Gem__Boot__Script__load(path) {
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
                    }//,
                )
            }
        }


        return function Gem__Script__codify_load(Node, duration_method) {
            //  Codify method `Gem.Boot.Script.load`.
            //
            //  This routine can be called multiple times:
            //
            //      1.  Initially;
            //      2.  Again, in clarity mode, after `Gem` is replaced.

            //
            //  Imports
            //
            var Script = Node.Script

            var script_map = Script.script_map             //  Reload latest `Gem.*.Script.script_map`


            //
            //  Gem.Boot.Script.load:
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
            duration_method(
                Script,
                'load',
                (
                      "Load JavaScript code using a `<script>` tag.\n"
                    + '(NO ERROR HANDLING VERSION -- for an ancient browser).'
                ),
                function Gem__Boot__Script__load(path) {
                    //  Load JavaScript code using a `<script>` tag
                    //  (NO ERROR HANDLING VERSION -- for an ancient browser).

                    var tag = script_map[path] = create_script_tag()

                    if ('setAttribute' in tag) {        //  Is this a modern browser?
                        tag.setAttribute('src', path)   //      New way: Modify to `<script src='path`></script>`
                    } else {                            //  Ancient Browser:
                        tag.src = path                  //      Old way: Modify to `<script src='path'></script>`
                    }

                    append_child(tag)                   //  Attempt to load 'path' via the `<script>` tag.
                }//,
            )
        }
    }//,
)


//
//  Finish:
//      1.  Codify Gem.Boot.Script.load;
//      2.  Cleanup unused attributes;
//      3.  Protect this file from garbage collection (debug mode only);
//      4.  Load next script file: "Gem/Beryl/Boot2_Dynamic.js"
//
Gem.Boot.Core.execute(
    function execute$finish() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var Configuration = Gem.Configuration
        var Core          = Node.Core
        var NodeWebKit    = Node.NodeWebKit
        var Script        = Node.Script
        var Source        = Node.Source

        var clarity        = Configuration.clarity
        var codify_load    = Script.codify_load
        var debug          = Configuration.debug
        var interim_method = Core.interim_method
        var trace          = Configuration.trace
//      var load           = Script.load                //  Must be done below after `codify_load`


        //
        //  Execute a codify of:
        //      Gem.Boot.Script.load
        //
        codify_load(Node, interim_method)


        //
        //  Cleanup unused attributes
        //
        delete Configuration.show_alert


        //
        //  The "sources" tab of Developer tools shows what has been loaded into the HTML page:
        //
        //      However, for a JavaScript file to appear under "sources" it must have at least one function that has
        //      not been garbage collected.
        //
        //      In debug mode, `Gem.sources` is used to make sure that there is least once such function from each
        //      JavaScript file that has been loaded in.
        //
        if (debug) {
            Source.js_plugins_Beryl = NodeWebKit.show_developer_tools
        }


        //
        //  Load next script
        //
        var load = Script.load                          //  Must be done after `codify_load` above

        load('Gem/Beryl/Boot2_Dynamic.js')
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
/*: @plugindesc Boot Engine, Reliable Yet Limber */
