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
        trace         : 7,                                  //      Trace function, method & bound method calls.
        unit_test     : 7,                                  //      Run unit tests.
        Box : {                                             //      Box configuration values.
            box_name : 1//,                                 //          Name 'box' instances 'Box' in Developer Tools.
        }//,
    },

    Tracing : [                                             //  Functions, methods, & bound_methods being traced.
        'codifier$Gem__Core__codify_interim_method',            0,
        'codifier$Gem__NodeWebKit__show_developer_tools',       0,
        'codifier$Gem__Script__error',                          0,
        'codifier$Gem__Script__handle_event',                   0,
        'codifier$Gem__Script__handle_global_error',            0,
        'codifier$Gem__Script__load',                           0,
        'codifier$Gem__Script__source_attribute',               0,
        'constant_$trace_attribute',                            0,
        'constant_$who_attribute',                              0,
        'execute$codify$trace$Gem__Core__execute',              0,
        'execute$setup_Gem',                                    0,
        'execute$setup_Tracing',                                0,
        'Gem._.Core.constant_attribute',                        0,
        'Gem._.Core.who_what',                                  0,
        'Gem._.Trace.store_codifier_wrap_constructor',          0,
        'Gem.Box.create_AnonymousBox',                          0,
        'Gem.Box.create_ModuleExports$Box',                     0,
        'Gem.Core.codify_interim_method',                       0,
        'Gem.Core.codify_method',                               0,
        'Gem.Core.constant',                                    0,
        'Gem.Core.execute',                                     1,
        'Gem.Core.method',                                      0,
        'Gem.Core.qualify_constant',                            0,
        'Gem.NodeWebKit.show_developer_tools',                  0,
        'Gem.Script.codify_load',                               0,
        'Gem.Script.error',                                     0,
        'Gem.Script.handle_event',                              0,
        'Gem.Script.handle_global_error',                       0,
        'Gem.Script.load',                                      0,
        'Gem.Script.source_attribute',                          0,
        'Gem.Trace.wrap_constructor',                           0,
        'Gem.Trace.wrap_function',                              0,
        'interim$Gem__Core__method',                            0,
        'interim_constant_attribute',                           0,
        'ModuleExports$Box',                                    0,
        'qualifier$Gem__Core__invisible_constructor_property',  0,
        'qualifier$Gem__Script__gem_scripts',                   0,
        'traced_method__common',                                0//,
    ],

    Core : {                                                //  Basic support code for the Core Gem module.
        execute : function Gem__Core__execute(code) {       //      Stub#1 for Gem.Core.execute
            //  Execute code defined in a function.  This allows the use of local variables.

            code()
        }

        //  codify_method         : Function                //      Create the code for a method as a closure.
        //  codify_interim_method : Function                //      Create the code for a method as a closure.
        //  clarity_note          : Function                //      Add a note to a variable or set of variables.
        //  constant              : Function                //      Store a global Gem constant.
        //  method                : Function                //      Define a Gem method.
        //  qualify_constant      : Function                //      Qualify a global Gem constant.
    },

    NodeWebKit: {                                           //  Node WebKit members & methods.
        //  is_NodeWebKit             : false               //      True if using nw.js
        //  is_version_012_or_lower   : false               //      True if using nw.js & it's version 0.12 or lower.
        //  is_version_013_or_greater : false               //      True if using nw.js & it's version 0.13 or greater.
        //  show_developer_tools      : Function            //      Show developer tools window.
    },

    Script : {                                              //  `<script>` handling.
        dynamic    : false,                                 //      Whether the current script can be reloaded.
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
        traced_method : Function,                           //      Store a traced Gem method.
        tracing       : Function,                           //      Returns the trace configuration for a routine.
        trace_call    : Function,                           //      Trace a function call.
        wrap_function : Function//,                         //      Wrap a function with tracing.
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
        var Gem     = window.Gem
        var Pattern = window.RegExp

        var _             = Gem._
        var _Core         = _.Core
        var Core          = Gem.Core
        var Configuration = Gem.Configuration
        var Trace         = Gem.Trace

        var clarity            = Configuration.clarity
        var create_Object      = Object.create
        var define_properties  = Object.defineProperties
        var define_property    = Object.defineProperty
        var trace              = Configuration.trace


        //
        //  constant_property
        //
        var BoxOfProperties__enumerable = { enumerable : { value : true } }

        var constant_property = create_Object(null, BoxOfProperties__enumerable)
        var property_$who     = create_Object(null, BoxOfProperties__enumerable)
        var property_$trace   = create_Object(null, BoxOfProperties__enumerable)

        var self_trace_properties = create_Object(
                null,
                {
                    '$trace' : { enumerable: true, value : property_$trace },
                    '$who'   : { enumerable: true, value : property_$who   }//,
                }//,
            )


        //
        //  Define trace functions & trace myself
        //
        if (trace) {
            var console = window.console

            var _Trace = _.Trace

            var pending                     = _Trace.pending
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


            //
            //  Closures
            //
            var carriage_return__pattern = new Pattern('\n', 'g')

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

                    if (s.endsWith('//,') && s.indexOf('\n') === -1) {
                        result__trailer = '(' + s.substr(0, s.length - 3) + ')'
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

                /*interim constant*/ {
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


            if (tracing_execute || tracing_myself) {
                var execute = Core.execute

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


            //
            //  cocoon
            //      Wrap a function around itself for tracing (i.e.: create a self cocoon).
            //
            //      Creates attributes `.$trace` and `.$who` for self traced functions.
            //
            /*cocoon*/ {
                if ( ! ('cocoon' in Tracing)) {
                    Tracing.cocoon = 0
                }


                var cocoon = function cocoon(f, $who) {
                    //  Wrap a function around itself for tracing (i.e.: create a self cocoon).
                    //
                    //  Creates attributes `.$trace` and `.$who` for self traced functions.

                    var trace = Configuration.trace             //  Get newest value of 'trace'

                    var tracing_self = (trace === 7 || (trace && Tracing.cocoon))

                    if (tracing_self) {
                        function_call(cocoon, arguments)
                    }

                    /*=*/ {
                        //  constant f.$trace = f
                        //  constant f.$who   = $who

                        property_$trace.value = f
                        property_$who  .value = $who

                        define_properties(f, self_trace_properties)

                        property_$trace  .value = 
                            property_$who.value = undefined

                        /*trace*/ {
                            if (tracing_self) {
                                trace_attribute('constant', f, '$trace', f)
                                trace_attribute('constant', f, '$who',   $who)
                            }
                        }
                    }

                    if (tracing_self) {
                        function_result(f)
                    }

                    return f
                }


                //  Cocoon myself
                cocoon(cocoon, 'cocoon')
            }


            /*constant_attribute*/ {
                var constant_attribute__$who = 'Gem._.Core.constant_attribute'

                if ( ! (constant_attribute__$who in Tracing)) {
                    Tracing[constant_attribute__$who] = 0
                }


                var constant_attribute = cocoon(
                    function Gem__private__Core__constant_attribute(instance, name, value) {
                        //  Create a (non reconfigurable) constant attribute.

                        var trace = Configuration.trace             //  Get newest value of 'trace'

                        var tracing_self = (trace === 7 || (trace && Tracing[constant_attribute__$who]))

                        if (tracing_self) {
                            function_call(constant_attribute, arguments)
                        }

                        /*=*/ {
                            //  constant instance.*name = value
                            constant_property.value = value
                            define_property(instance, name, constant_property)
                            constant_property.value = undefined

                            /*trace*/ {
                                if (tracing_self) {
                                    trace_attribute('constant', instance, name, value)
                                }
                            }
                        }

                        if (tracing_self) {
                            procedure_done()
                        }
                    },
                    constant_attribute__$who//,
                )
            }


            /*wrap_function*/ {
                var wrap_function__$who = 'Gem.Trace.wrap_function'

                if ( ! (wrap_function__$who in Tracing)) {
                    Tracing[wrap_function__$who] = 0
                }


                //
                //  wrap_function
                //      Wrap a function for tracing.
                //
                //      For clarity, this function self-traces itself (it could instead be made to wrap itself,
                //      but that gets too confusing, especially when using F10/F11 in developer tools).
                //
                var wrap_function = cocoon(
                    function interim$Gem__Trace__wrap_function(f, /*optional*/ function_name) {
                        var trace = Configuration.trace             //  Get newest value of 'trace'

                        var trace_self = (trace === 7 || (trace && Tracing[wrap_function__$who]))

                        if (trace_self) {
                            function_call(wrap_function, arguments)
                        }

                        if (arguments.length === 1) {
                            if ('$who' in f) {
                                var name = f.$who
                            } else {
                                var name = f.name
                            }
                        } else {
                            var name = function_name

                            /*=*/ {
                                //  constant f.$who = name
                                property_$who.value = name
                                define_property(f, '$who', property_$who)
                                property_$who.value = undefined

                                if (trace_self) {
                                    trace_attribute('constant', f, '$who', name)
                                }
                            }
                        }

                        if ( ! (name in Tracing)) {
                            Tracing[name] = 0
                        }


                        if ('$trace' in f) {
                            throw new Error("TraceError: function `" + name + "` already being traced")
                        }


                        var interim$wrap = function interim$wrap(/*...*/) {
                            var trace = Configuration.trace             //  Get newest value of 'trace'

                            if (trace === 7 || (trace && Tracing[name])) {
                                function_call(f, arguments, name)

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


                        /*=*/ {
                            //  constant interim$wrap.$trace = f
                            property_$trace.value = f
                            define_property(interim$wrap, '$trace', property_$trace)
                            property_$trace.value = undefined

                            if (trace_self) {
                                trace_attribute('constant', interim$wrap, '$who', f)
                            }
                        }

                        if (trace_self) {
                            function_result(interim$wrap)
                        }

                        return interim$wrap
                    },
                    wrap_function__$who//,
                )
            }


            //
            //  Private
            //
            _Trace.cocoon                = cocoon
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
            var constant_attribute = function Gem__private__Core__constant_attribute(instance, name, value) {
                //  Create a (non reconfigurable) constant attribute.

                /*=*/ {
                    //  constant instance.*name = value
                    constant_property.value = value
                    define_property(instance, name, constant_property)
                    constant_property.value = undefined
                }
            }


            var trace_call = function interim$Gem__Trace__trace_call(f) {
                return f()
            }


            var tracing = function interim$Gem__Trace__tracing(name) {
                return 0
            }


            var wrap_function = function interim$Gem__Trace__wrap_function(f, /*optional*/ function_name) {
                return f
            }
        }


        if (trace) {
            if (tracing_myself)  { procedure_done() }
            if (tracing_execute) { procedure_done() }
        }


        //
        //  Export
        //
        _Core.constant_property  = constant_property    //  TEMPORARY, deleted later
        _Core.constant_attribute = constant_attribute   //  TEMPORARY as "iterim mutable": Changed below to "constant"

        Trace.trace_call    = trace_call
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

            var _             = Gem._
            var _Core         = _.Core
            var _Trace        = _.Trace
            var Core          = Gem.Core
            var Trace         = Gem.Trace
            var Configuration = Gem.Trace

            var cocoon             = _Trace.cocoon
            var execute            = Core.execute
            var function_call      = _Trace.function_call
            var procedure_done     = _Trace.procedure_done
            var tracing            = Trace.tracing


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


            var tracing_execute = tracing('Gem.Core.execute')
            var tracing_myself  = tracing(myself.name)


            if (tracing_execute) { function_call(execute, [myself]) }
            if (tracing_myself)  { function_call(myself) }


            /*execute*/ {
                var trace$execute__$who = 'Gem.Core.execute'


                debugger

                var trace$execute = cocoon(
                    function trace$Gem__Core__execute(code) {
                        //  Execute code defined in a function.  This allows the use of local variables.

                        var trace = Configuration.trace             //  Get newest value of 'trace'

                        var tracing_execute = (trace === 7 || (trace && Tracing[trace$execute__$who]))
                        var tracing_code    = (trace === 7 || (trace && Tracing[code.name]))

                        if (tracing_execute) { function_call(trace$execute, arguments) }
                        if (tracing_code)    { function_call(code)                     }

                        code()

                        if (tracing_code)    { procedure_done() }
                        if (tracing_execute) { procedure_done() }
                    },
                    trace$execute__$who//,
                )

                Gem.Core.execute = trace$execute    //  TEMPORARY as "iterim mutable": Changed below to "constant"
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
Gem.Core.execute(
    function execute$setup_Gem() {
        //
        //
        //  Imports
        //
        var Gem = window.Gem

        var _             = Gem._
        var _Core         = _.Core
        var _Trace        = _.Trace
        var Configuration = Gem.Configuration
        var Core          = Gem.Core
        var Script        = Gem.Script
        var Trace         = Gem.Trace

        var clarity            = Configuration.clarity
        var constant_attribute = _Core.constant_attribute
        var constant_property  = _Core.constant_property
        var create_Object      = Object.create
        var define_properties  = Object.defineProperties
        var define_property    = Object.defineProperty
        var trace              = Configuration.trace
        var trace_call         = Trace.trace_call
        var wrap_function      = Trace.wrap_function

        if (trace) {
            var _Trace  = Gem._.Trace
            var Tracing = Gem.Tracing

            var function_call   = _Trace.function_call
            var procedure_done  = _Trace.procedure_done
            var trace_attribute = _Trace.trace_attribute
            var trace_value     = _Trace.trace_value
            var tracing         = Trace.tracing
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
            if (trace) {
                var constant_$tracing_property = create_Object(null, { enumerable : { value : true } })
            }

            var constant_$who_property     = create_Object(null, { enumerable : { value : true } })
            var constant_$what_property    = create_Object(null, { enumerable : { value : true } })
            var constant___prefix_property = create_Object(null)                                    //  3 underscores

            var module_properties = create_Object(
                    null,
                    {
                        '$who'    : { enumerable : true, value : constant_$who_property     },
                        '$what'   : { enumerable : true, value : constant_$what_property    },
                        '_prefix' : { enumerable : true, value : constant___prefix_property },
                    }//,
                )

            var $who_$what_properties = create_Object(
                    null,
                    {
                        '$who'  : { enumerable : true, value : constant_$who_property  },
                        '$what' : { enumerable : true, value : constant_$what_property },
                    }//,
                )


            var constant_$who_$what_attributes = wrap_function(
                    function constant_$who_$what_attributes(instance, $who, $what) {
                        /*=*/ {
                            //  constant module.$who  = $who
                            //  constant module.$what = $what
                            constant_$who_property .value = $who
                            constant_$what_property.value = $what

                            define_properties(instance, $who_$what_properties)

                            constant_$who_property     .value =
                                constant_$what_property.value = undefined

                            /*trace*/ {
                                var trace = Configuration.trace             //  Get newest value of 'trace'

                                if (trace === 7 || (trace && Tracing['constant_$who_$what_attributes'])) {
                                    trace_attribute('constant', instance, '$who',  $who)
                                    trace_attribute('constant', instance, '$what', $what)
                                }
                            }
                        }
                    }//,
                )
        }

        var interim_constant_property = create_Object(
                null,
                {
                    configurable : { value : true  },       //  Can be reconfigured (the constant can be changed!).
                    enumerable   : { value : true  },       //  Visible (i.e.: enumerable)
                }//,
            )


        var interim_constant_attribute = wrap_function(
                function interim_constant_attribute(instance, name, value) {
                    //  Create an interim (reconfigurable) constant attribute.

                    /*=*/ {
                        //  interim constant instance.*name = value
                        interim_constant_property.value = value
                        define_property(instance, name, interim_constant_property)
                        interim_constant_property.value = undefined

                        /*trace*/ {
                            var trace = Configuration.trace             //  Get newest value of 'trace'

                            if (trace === 7 || (trace && Tracing['interim_constant_attribute'])) {
                                trace_attribute('interim constant', instance, name, value)
                            }
                        }
                    }
                }//,
            )


        if (clarity || trace) {
            var who_what__who = 'Gem._.Core.who_what'

            //
            //  NOTE:
            //      This interim implementation of `who_what` only replaces a single "." since it does not use
            //      regular expressions with the "g" flag.
            //
            if (clarity) {
                var who_what = function interim$Gem__private__Core__who_what(module, $who, $what, create_prefix) {
                    if (create_prefix) {
                        if ($who.startsWith('Gem._.')) {
                            var _prefix = $who.replace('Gem._.', 'Gem__private__')
                        } else {
                            var _prefix = $who.replace('.', '__')
                        }

                        /*=*/ {
                            //  constant           module.$who    = $who
                            //  constant           module.$what   = $what
                            //  invisible constant module._prefix = _prefix
                            constant_$who_property    .value = $who
                            constant_$what_property   .value = $what
                            constant___prefix_property.value = _prefix

                            define_properties(module, module_properties)

                            constant_$who_property        .value =
                                constant_$what_property   .value =
                                constant___prefix_property.value = undefined

                            /*trace*/ {
                                var trace = Configuration.trace             //  Get newest value of 'trace'

                                if (trace === 7 || (trace && Tracing[who_what__who])) {
                                    trace_attribute('constant',           module, '$who',    $who)
                                    trace_attribute('constant',           module, '$what',   $what)
                                    trace_attribute('invisible constant', module, '_prefix', _prefix)
                                }
                            }
                        }
                    }

                    /*=*/ {
                        //  constant module.$who  = $who
                        //  constant module.$what = $what
                        constant_$who_$what_attributes(module, $who, $what)
                    }
                }
            } else {
                var who_what = function interim$Gem__private__Core__who_what(module, $who, $what, create_prefix) {
                    //
                    //  trace mode without clarity mode: only need `$who`, do *NOT* need `$what` & `__prefix`.
                    // 
                    /*=*/ {
                        //  constant module.$who = $who
                        constant_attribute(module, '$who', $who)
                    }
                }
            }


            if (trace) {
                var original_who_what = who_what


                //
                //  trace$interim$Gem__private__Core__who_what
                //      This special version of tracing has to set `module.$who` before calling `function_call`,
                //      so that `function_call` can properly identify `module`.
                //
                var who_what = function trace$interim$Gem__private__Core__who_what(module, $who, $what, create_prefix) {
                    if ( ! tracing(who_what__who)) {
                        original_who_what(module, $who, $what, create_prefix)
                        return
                    }

                    //
                    //  ... Must do this first before calling `function_call` ...
                    //
                    /*first*/ {
                        //  constant module.$who = $who
                        constant_attribute(module, '$who', $who)
                    }

                    function_call(original_who_what, arguments)
                    original_who_what(module, $who, $what, create_prefix)
                    procedure_done()
                }

                interim_constant_attribute(original_who_what, '$who',   who_what__who)
                interim_constant_attribute(who_what,          '$trace', original_who_what)
            }


            who_what(Gem,            'Gem',            'The only global variable used by Gem.',             false)
            who_what(Gem.Core,       'Gem.Core',       'Basic support code for the Core Gem module.',       true)
            who_what(Gem.Script,     'Gem.Script',     "`<script>` handling.",                              true)
            who_what(Gem.NodeWebKit, 'Gem.NodeWebKit', 'Node WebKit members & methods.',                    true)
            who_what(Gem.Trace,      'Gem.Trace',      'Exports the Trace module.',                         true)
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
        //


        //
        //  method__no_trace
        //      Common code to define a method with no tracing.
        //
        //  NOTE:
        //      Due to the use of `Script.dynamic` this method is only valid *UNTIL* `Gem` is rewritten (in clarity
        //      mode), after which this method is invalid.
        //
        var method__no_trace = wrap_function(
                function interim$Gem__private__Core__method__no_trace(instance, interim, who, $what, method) {
                    //  Common code to define a method with no tracing.
                    //
                    //  NOTE:
                    //      Due to the call of `Script.dynamic` this method is only valid *UNTIL* `Gem` is
                    //      rewritten, after which this method is invalid.

                    if ('$trace' in method) {
                        throw new Error('method_no_trace: function "' + method.name + '" has a `.$trace` attribute')
                    }

                    if (clarity) {
                        if ( ! ('$who' in instance)) {
                            throw new Error('method_no_trace: missing $who in object')
                        }

                        var function_name = instance.$who + '.' + who

                        /*=*/ {
                            //  constant method.$who  = function_name
                            //  constant method.$what = $what
                            constant_$who_$what_attributes(method, function_name, $what)
                        }
                    }

                    if (interim || Script.dynamic) {                            //  See NOTE above
                        //  interim constant instance.*who = method
                        interim_constant_attribute(instance, who, method)
                    } else {
                        //  constant instance.*who = method
                        constant_attribute(instance, who, method)
                    }
                },
                'Gem._.Core.method__no_trace'//,
            )


        if (trace) {
            //
            //  local traced_method__common
            //      Common code to define a traced method
            //
            //  NOTE:
            //      Due to the use of `Script.dynamic` this method is only valid *UNTIL* `Gem` is rewritten (in clarity
            //      mode), after which this method is invalid.
            //
            var traced_method__common = wrap_function(
                    function interim$Gem__private__Trace__traced_method__common(
                            instance, interim, who, $what, wrapped_method//,
                    ) {
                        //  Common code to define a traced method
                        //
                        //  NOTE:
                        //      Due to the use of `Script.dynamic` this method is only valid *UNTIL* `Gem` is
                        //      rewritten (in clarity mode), after which this method is invalid.

                        if (clarity) {
                            var method = wrapped_method.$trace

                            /*=*/ {
                                //  constant method.$what = $what
                                constant_attribute(method, '$what', $what)
                            }

                            if (method === wrapped_method) {
                                if ( ! ('$who' in method)) {
                                    throw new Error(
                                            (
                                                  'method'
                                                + ' "' + method.name + '"'
                                                + ' (that traces itself) must have a `.$who` attribute'
                                            )//,
                                        )
                                }
                            } else {
                                /*=*/ {
                                    //  constant wrapped_method.$who  = 'TRACED: ' + method.$who
                                    //  constant wrapped_method.$what = 'TRACED: ' + $what
                                    constant_$who_$what_attributes(
                                            wrapped_method,
                                            'TRACED: ' + method.$who,
                                            'TRACED: ' + $what//,
                                        )
                                }
                            }
                        }

                        if (interim || Script.dynamic) {                            //  See NOTE above
                            //  interim constant instance.*who = wrapped_method
                            interim_constant_attribute(instance, who, wrapped_method)
                        } else {
                            //  constant instance.*who = wrapped_method
                            constant_attribute(instance, who, wrapped_method)
                        }
                    },
                    'Gem._.Trace.traced_method__common'//,
                )


            var interim_method = wrap_function(
                    function interim$Gem__Core__interim_method(instance, who, $what, method) {
                        if ( ! ('$who' in instance)) {
                            throw new Error('Gem.Core.interim_method: missing $who in object')
                        }

                        var function_name  = instance.$who + '.' + who
                        var wrapped_method = wrap_function(method, function_name)

                        traced_method__common(instance, true, who, $what, wrapped_method)
                    },
                    'Gem.Core.interim_method'//,
                )

            var method = wrap_function(
                    function interim$Gem__Core__method(instance, who, $what, method) {
                        if ( ! ('$who' in instance)) {
                            throw new Error('Gem.Core.method: missing $who in object')
                        }

                        var function_name  = instance.$who + '.' + who
                        var wrapped_method = wrap_function(method, function_name)

                        traced_method__common(instance, false, who, $what, wrapped_method)
                    },
                    'Gem.Core.method'//,
                )

            var traced_method = wrap_function(
                    function interim$Gem__Trace__traced_method(instance, who, $what, wrapped_method) {
                        if ( ! ('$trace' in wrapped_method)) {
                            throw new Error(
                                    'traced_method: missing `.$trace` in function "' + wrapped_method.name + '"'//,
                                )
                        }

                        traced_method__common(instance, false, who, $what, wrapped_method)
                    },
                    'Gem.Trace.traced_method'//,
                )
        } else {
            var interim_method = function interim$Gem__Core__interim_method(instance, who, $what, method) {
                method__no_trace(instance, true, who, $what, method)
            }

            var method = function interim$Gem__Core__method(instance, who, $what, method) {
                method__no_trace(instance, false, who, $what, method)
            }


            //
            //  NOTE:
            //      Without tracing this is identicial to `Gem.Core.Method`
            //
            //      (However, different functions are used, so then can each acquire their unique `.$who` and
            //      `.$what` attributes in clarity mode).
            //
            var traced_method = function interim$Gem__Trace__traced_method(instance, who, $what, wrapped_method) {
                method__no_trace(instance, false, who, $what, wrapped_method)
            }
        }


        //
        //  Gem.Core.clarity_note
        //
        method(
            Core,
            'clarity_note',
            'Interim method for Gem.Core.clarity_note',
            function interim$Gem__Core__clarity_note(instance, who, $what) {
                //TODO: FIX TO USE SCRIPT.DYNAMIC
                if (clarity) {
                    /*=*/ {
                        //  instance[who + '$NOTE'] = $what
                        constant_attribute(instance, who + '$NOTE', $what)
                    }
                }
            }
        )


        //
        //  Gem.Core.codify_method
        //
        method(
            Core,
            'codify_method',
            'Interim method for Gem.Core.codify_method',
            function interim$Gem__Core__codify_method(instance, who, $what, codifier) {
                var codified_method = trace_call(codifier)

                //
                //  Since this is just an iterim implementation of `Gem.Core.codify_method`, we'll be super lazy
                //  and just call `method` ...
                //
                //      (As a small downside: this makes the "tracing" a bit more nested, but it doesn't matter that
                //      much).
                //
                //      (The real implementation of `Gem.core.codify_method` is not as lazy).
                //
                method(instance, who, $what, codified_method)       
            }
        )


        //
        //  Gem.Core.constant
        //
        method(
            Core,
            'constant',
            'Interim method for Gem.Core.constant',
            (
                clarity
                    //TODO: FIX TO USE SCRIPT.DYNAMIC
                    ? function interim$Gem__Core__constant(instance, who, $what, value) {
                          /*=*/ {
                              //  constant instance.*who = value
                              constant_attribute(instance, who, value)
                          }

                          /*=*/ {
                              //  constant instance[who + '$'] = $what
                              constant_attribute(instance, who + '$', $what)
                          }
                      }
                    : function interim$Gem__Core__constant(instance, who, $what, value) {
                          /*=*/ {
                              //  constant instance.*who = value
                              constant_attribute(instance, who, value)
                          }
                      }
            )//,
        )


        //
        //  Gem.Core.method
        //
        traced_method(
            Core,
            'interim_method',
            'Interim method for Gem.Core.interim_method',
            interim_method//,
        )


        //
        //  Gem.Core.method
        //
        traced_method(
            Core,
            'method',
            'Interim method for Gem.Core.method',
            method//,
        )


        //
        //  Gem.Core.qualify_constant
        //
        method(
            Core,
            'qualify_constant',
            'Interim method for Gem.Core.qualify_constant',
            function interim$Gem__Core__qualify_constant(who, $what, qualifier) {
                var value = trace_call(qualifier)

                //FIX THIS to use multiple properties
                constant_property.value = value
                define_property(this, who, constant_property)

                if (clarity) {
                    constant_property.value = $what
                    define_property(this, who + '$', constant_property)
                }

                constant_property.value = undefined
            }
        )


        //
        //  Gem.Trace.traced_method
        //
        traced_method(
            Trace,
            'traced_method',
            'Interim method for Gem.Trace.traced_method',
            traced_method//,
        ) 


        if (0) {
            //RESTORE THIS LATER? -- When moving constant_attribute?
            //
            //  Gem._.Core.constant_attribute
            //
            //  NOTE:
            //      This was set above as a "visible_mutable", change it now to a "constant".
            //
            traced_method(
                _Core,
                'constant_attribute',
                'Create a [non reconfigurable] visible constant attribute.',
                constant_attribute//,
            )
        }


        //
        //  Gem._.Core.interim_constant_attribute
        //
        traced_method(
            _Core,
            'interim_constant_attribute',
            'Create an iterim (i.e.: reconfigurable) visible constant attribute.',
            interim_constant_attribute//,
        )


        //
        //  Gem._.Core.method__no_trace
        //
        traced_method(
            _Core,
            'method__no_trace',
            'Interim common helper code to create a method with no tracing.',
            method__no_trace//,
        )


        //
        //  Gem._.Core.who_what
        //
        if (trace || clarity) {
            traced_method(
                _Core,
                'who_what',
                (
                    clarity
                        ? "Interim method to set `.$who`, `.$what`, & `prefix` on a module."
                        : "Interim method to set `.$who` on a module (`$what` is ignored in non clarity mode)."
                ),
                who_what//,
            )
        }


        //
        //  Gem._.Trace.traced_method__common
        //
        if (trace) {
            traced_method(
                _Trace,
                'traced_method__common',
                (
                      'Common code to define a traced method.\n'
                    + '\n'
                    + 'NOTE:\n'
                    + "    to the use of `Script.dynamic` this method is only valid *UNTIL* `Gem` is rewritten"
                    + ' (in clarity mode), after which this method is invalid.'
                ),
                traced_method__common//,
            )
        }
//  </stubs>                                                //   End of stubs


        if (clarity) {
            //
            //  constant_$what_property
            //      A property used to create a visible (i.e.: enumerable) constant `.$what` attribute.
            //
            Gem.Core.constant(
                _Core,
                'constant_$what_property',
                "A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.",
                constant_$what_property//,
            )


            //
            //  constant_$who_property
            //      A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.
            //
            Gem.Core.constant(
                _Core,
                'constant_$who_property',
                "A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.",
                constant_$who_property//,
            )
        }
    }
)


//
//  Gem.Core.constant_attribute
//      Create a (non reconfigurable) constant attribute.
//      
//
Gem.Trace.traced_method(
    Gem._.Core,
    'constant_attribute',
    'Create a (non reconfigurable) constant attribute.',
    Gem._.Core.constant_attribute//,
)


//
//  Gem.Core.execute
//      Create a (non reconfigurable) constant attribute.
//      
//  NOTE:
//      This was set above as a "visible_mutable", change it now to a "constant".
//
Gem.Trace.traced_method(
    Gem.Core,
    'execute',
    'Execute code defined in a function.  This allows the use of local variables.',
    Gem.Core.execute//,
)


//
//  Gem.Core.codify_interim_method
//      Interim method for Gem.Core.codify_interim_method
//
Gem.Core.codify_method(
    Gem.Core,
    'codify_interim_method',
    'Interim method for Gem.Core.codify_interim_method',
    function codifier$Gem__Core__codify_interim_method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration

        var trace = Configuration.trace


        //
        //  Implementation
        //
        if ( ! trace) {
            //
            //  Imports: No tracing version
            //
            var _Core = Gem._.Core

            var method__no_trace = _Core.method__no_trace

            //
            //  Implementation: No tracing version
            //
            return function interim$Gem__Core__codify_interim_method(instance, who, $what, codifier) {
                var method = codifier()

                method__no_trace(instance, true, who, $what, method)
            }
        }


        //
        //  Imports: Tracing version
        //
        var Error = window.Error

        var _Trace = Gem._.Trace
        var Trace  = Gem.Trace

        var trace_call            = Trace.trace_call
        var traced_method__common = _Trace.traced_method__common
        var wrap_function         = Trace.wrap_function


        //
        //  Implementation: Tracing version
        //
        return function interim$Gem__Core__codify_interim_method(instance, who, $what, codifier) {
            if ( ! ('$who' in instance)) {
                throw new Error('missing $who in object')
            }

            var method         = trace_call(codifier)
            var function_name  = instance.$who + '.' + who
            var wrapped_method = wrap_function(method, function_name)

            traced_method__common(instance, true, who, $what, wrapped_method)
        }
    }
)


//
//  Gem._.Core.gem_changed
//      Array of callback's when `Gem` is changed (clarity mode only).
//
if (Gem.Configuration.clarity) {
    Gem.Core.constant(
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
        Gem.Core.constant(
            Gem.NodeWebKit,
            'is_NodeWebKit',
            "`Gem.NodeWebKit.is_nodeWebKit` is `true` if using nw.js",
            major >= 0//,
        )


        Gem.Core.constant(
            Gem.NodeWebKit,
            'is_version_012_or_lower',
            "`Gem.NodeWebKit.is_version_012_or_lower` is `true` if using nw.js & it's version 0.12 or lower.",
            (major === 0 && minor <= 12)//,
        )

        Gem.Core.constant(
            Gem.NodeWebKit,
            'is_version_013_or_higher',
            "`Gem.NodeWebKit.is_version_013_or_higher` is `true` if using nw.js & it's version 0.13 or greater.",
            (major >  0 || minor >= 13)//,
        )

        Gem.Core.clarity_note(
            Gem.NodeWebKit,
            'is_version_{012_or_lower,013_or_higher}',
            (
                  "If not using nw.js, then both `Gem.NodeWebkit.is_version_{012_or_lower,013_or_higher}`"
                + " will be `false`."
            )//,
        )
    }
)


//
//  Gem.NodeWebKit.show_developer_tools
//      Show developer tools.
//
if (Gem.NodeWebKit.is_version_012_or_lower) {               //  Show developer tools (nw.js 0.12 or lower)
    Gem.Core.codify_method(
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
    Gem.Core.codify_method(
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
    Gem.Core.method(
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
//      We only handle script events (and thus bring up an alert) if five conditions are met:
//
//          1.  Configured to capture errors (i.e.: `Gem.Configuration.capture_error` is set);
//          2.  This is running under nw.js (i.e.: not a normal browser like Firefox, etc.);
//          3.  This is running in RPG Maker MV "test" mode;
//          4.  The browser has a `.addEventListener` method (all modern browsers do);
//          5.  The browser has a `.setAttribute`     method (all modern browsers do).
//
Gem.Core.constant(
    Gem.Script,
    'handle_errors',
    "`Gem.Script.handle_errors` is `true` if handling `<script>` errors.",
    (
           Gem.Configuration.capture_error                  //  1.  Configured to capture errors;
        && Gem.NodeWebKit.is_NodeWebKit                     //  2.  This is running under nw.js;
        && (                                                
                  ('Utils' in window)                       //  3.  This is running in RPG Maker MV ...
               && Utils.isOptionValid('test')               //      ... "test" mode;
           )
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
    Gem.Core.codify_method(
        Gem.Script,
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
    //  Gem.Script.error
    //      Show an error (either with `alert` or `console.error`).
    //
    Gem.Core.codify_method(
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
    Gem.Core.codify_method(
        Gem.Script,
        'handle_global_error',
        "Handle errors when executing a `<script>` tag.",
        function codifier$Gem__Script__handle_global_error() {
            //
            //  Imports
            //
            var document = window.document

            var Gem = window.Gem

            var Script = Gem.Script

            var error            = Script.error
            var source_attribute = Script.source_attribute


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

                error(e.error.stack)
            }


            window.addEventListener('error', handle_global_error)

            return handle_global_error
        }
    )


    //
    //  Gem.Script.codify_handle_event
    //      Codify method `Gem.Script.handle_event`.
    //
    //      This routine can be called multiple times:
    //
    //          1.  Here;
    //          2.  Again, in clarity mode, after `Gem` is replaced.
    //
    Gem.Core.codify_interim_method(
        Gem.Script,
        'codify_handle_event',
        (
              "Codify method `Gem.Script.handle_event`.\n"
            + '\n'
            + 'This routine can be called multiple times:\n'
            + '\n'
            + '    1.  Here;\n'
            + "    2.  Again, in Clarity mode, after global variable `Gem` is replaced."
        ),
        function codifier$interim$Gem__Script__codify_handle_event() {
            //
            //  Imports
            //
            var Gem = window.Gem

            var Script = Gem.Script

            var script_event_list = Script.event_list
            var source_attribute  = Script.source_attribute


            //
            //  Implementation
            //
            return function interim$Gem__Script__codify_handle_event(interim) {
                //
                //  Imports
                //
                var Gem = window.Gem                                    //  Reload latest `Gem`

                var Script = Gem.Script                                 //  Reload lastest `Gem.Script`


                //
                //  Implementation
                //

                //
                //  NOTE #1:
                //      `handle_event` has to refer to itself; hence it has to be stored in variable
                //      `script_handle_event`.
                //
                //  NOTE #1:
                //      There is no way to get the error message, if there is one, when attempting to load
                //      a script (You can't use try/catch on a `<script>` tag that is inserted into the DOM).
                //
                //      Hence in case of an error, the following is done:
                //
                //          1.  Alert the user with an alert message which says to see Developer Tools for full error;
                //          2.  Force the user to acknowledge the alert box by hitting 'OK';
                //          3.  Then, and only then, bring up Developer tool, so the user can read the rest of the
                //              error.
                //
                //  NOTE #3:
                //      The previous note means there is no way to get the loading error messge (i.e.: if the
                //      file does not exist, or there is an error while transferring it HTTP).
                //
                //      Any syntax error (on successful load) can be caught & is caught by
                //      `Gem.Script.handle_global_error` above.
                //
                var script_handle_event = function Gem__Script__handle_event(e) {
                    //  Handle events of `<script>` tags

                    Script.dynamic = false                                      //  Script done, reset `.dynamic`

                    var tag = e.target

                    for (var i = 0; i < script_event_list.length; i ++) {
                        var type = script_event_list[i]

                        tag.removeEventListener(type, script_handle_event)      //  Refer to myself. See NOTE #1 above.
                    }

                    if (e.type === 'abort' || e.type === 'error') {
                        error(source_attribute(tag) + ': Failed to load')
                    }
                }


                //
                //  Gem.Script.handle_event
                //      Handle events of `<script>` tags.
                //
                var method = (interim ?  Gem.Core.interim_method : Gem.Core.method)

                method(
                    Gem.Script,
                    'handle_event',
                    "Handle events of `<script>` tags.",
                    script_handle_event//,
                )
            }
        }//,
    )
}


//
//  Gem.Script.gem_scripts
//
Gem.Core.qualify_constant.call(
    Gem.Script,
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
//  Gem.Script.codify_load
//      Codify method `Gem.Script.load`.
//
//      This routine can be called multiple times:
//
//          1.  Here;
//          2.  Again, in clarity mode, after `Gem` is replaced.
//
Gem.Core.codify_interim_method(
    Gem.Script,
    'codify_load',
    (
          "Codify method `Gem.Script.load`.\n"
        + '\n'
        + 'This routine can be called multiple times:\n'
        + '\n'
        + '    1.  Here;\n'
        + "    2.  Again, in Clarity mode, after global variable `Gem` is replaced."
    ),
    function codifier$Gem__Script__codify_load() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Script = Gem.Script

        var gem_scripts       = Script.gem_scripts
        var handle_errors     = Script.handle_errors
        var script_event_list = Script.event_list
//      var script_map        = Script.script_map           //  Not valid here -- *MUST* be done below


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
            return function interim$Gem__Script__codify_load(interim) {
                //
                //  Imports
                //       If Gem has changed in clarity mode, we need to reload a few variables ...
                //
                var Gem = window.Gem                                    //  Reload latest `Gem`

                var Core   = Gem.Core
                var Script = Gem.Script                                 //  Reload latest `Gem.Script`

                var script_map          = Gem.Script.script_map         //  Reload latest `Gem.Script.script_map`
                var script_handle_event = Gem.Script.handle_event       //  Reload latest `Gem.script.handle_event`


                //
                //  Implementation
                //
                var method = (interim ? Core.interim_method : Core.method)


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
                method(
                    Gem.Script,
                    'load',
                    (
                          "Load JavaScript code using a `<script>` tag.\n"
                        + '(Version for a modern browser).'
                    ),
                    function Gem__Script__load(path) {
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


        return function Gem__Script__codify_load(interim) {
            //
            //  Imports
            //       If Gem has changed in clarity mode, we need to reload a few variables ...
            //
            var Gem = window.Gem                                    //  Reload latest `Gem`

            var Core   = Gem.Core
            var Script = Gem.Script                                 //  Reload latest `Gem.Script`

            var script_map = Gem.Script.script_map                  //  Reload latest `Gem.Script.script_map`


            //
            //  Implementation
            //
            var method = (interim ? Core.interim_method : Core.method)


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
            method(
                Gem.Script,
                'load',
                (
                      "Load JavaScript code using a `<script>` tag.\n"
                    + '(NO ERROR HANDLING VERSION -- for an ancient browser).'
                ),
                function Gem__Script__load(path) {
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
//      1.  Codify Gem.Script.handle_event (if handling `<script>` errors);
//      2.  Codify Gem.Script.load;
//      3.  Cleanup unused attributes;
//      4.  Protect this file from garbage collection (debug mode only);
//      5.  Load next script file: "Gem/Beryl/Boot2_Manifest.js"
//
Gem.Core.execute(
    function execute$finish() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core         = Gem._.Core
        var Configuration = Gem.Configuration
        var Source        = Gem.Source
        var Script        = Gem.Script

        var clarity = Configuration.clarity
        var debug   = Configuration.debug
//      var load    = Script.load                           //  Must be done below after `codify_load`
        var trace   = Configuration.trace


        //
        //  Execute a codify of:
        //      Gem.Script.load
        //
        //  NOTE #1:
        //      Also does cleanup of `Gem.Script.codify_load` if not in clarity mode.
        //          Load JavaScript code using a `<script>` tag.
        //
        //  NOTE #2:
        //      Read `/*section*/` as just enclosing a set of common code together
        //
        /*section*/ {
            //
            //  Imports
            //
            var handle_errors = Script.handle_errors
            var codify_load   = Script.codify_load

            if (handle_errors) {
                var codify_handle_event = Script.codify_handle_event
            }

            //
            //  Implementation
            //
            if (handle_errors) {
                codify_handle_event(clarity)            //  Call first time here ...
            }

            codify_load(clarity)                        //  Call first time here ...

            if (clarity) {
                //  Clarity mode will call `codify_handle_error` and `codify_load` again later.
            } else {
                if (handle_errors) {
                    delete Gem.Script.codify_handle_error   //  Not clarity mode -- don't need to keep this around
                }

                delete Gem.Script.codify_load               //  Not clarity mode -- don't need to keep this around
            }
        }


        //
        //  Cleanup unused attributes
        //
        /*section*/ {
            delete _Core        .constant_property
            delete Configuration.show_alert
            delete Script       .event_list
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
        if (debug) {
            Source.js_plugins_Beryl = Gem.NodeWebKit.show_developer_tools
        }


        //
        //  Load next script
        //
        var load = Script.load                              //  Must be done after `codify_load` above

        load('Gem/Beryl/Boot2_Manifest.js')
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
