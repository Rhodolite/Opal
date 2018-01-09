//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot4_Tracing: Boot - Phase 4 - Add Tracing
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  In Gem tracing mode, *every* function, method & bound_method call is traced.
//


//
//  Gem._.Trace.wrap_function
//      Trace a function, method, or bound method.
//
Gem.Boot.Core.codify_method(
    Gem._.Trace,
    'wrap_function',
    'Trace a function, method, or bound method.',
    function codifier$Gem__Trace__wrap_function() {
        //
        //  Imports
        //
        var _Trace = Gem._.Trace

        var function_call         = _Trace.function_call
        var group_stop            = _Trace.group_stop
        var pending               = _Trace.pending
        var trace_value           = _Trace.trace_value
        var unbound__line         = console.log
        var zap_pending__1_to_end = _Trace.zap_pending__1_to_end


        return function Gem__Trace__wrap_function(f) {
            return function trace_wrapper(/*...*/) {
                function_call(f, arguments)

                var r = f.apply(this, arguments)

                if (r === undefined) {
                    if (pending.length > 1) {
                        unbound__line.apply(console, pending)
                        zap_pending__1_to_end()
                    } else {
                        group_stop()
                    }
                } else {
                    if (pending.length > 1) {
                        pending[0] += ' => '
                    } else {
                        group_stop()
                        pending[0] = '=> '
                    }

                    pending[0] += trace_value(v)
                    unbound__line.apply(console, pending)
                    zap_pending__1_to_end()
                }

                _Trace.depth -= 1
            }
        }
    }//,
)


//
//  Gem._.Trace.trace_line
//
//  Output a line of text in trace mode.
//
//  NOTE:
//      If this is the first line inside the group, then the [previously pending] closed group is flushed
//      (i.e.: actually output as a closed group).
//
Gem.Boot.Core.codify_method(
    Gem._.Trace,
    'trace_line',
    (
          'Output a line of text in trace mode.\n'
        + '\n'
        + 'NOTE:\n'
        + '    If this is the first line inside the group, then the [previously pending] closed group is flushed'
        + ' (i.e.: actually output as a closed group)'
        + '.'
    ),
    function codifier$Gem__Trace__trace_line() {
        //
        //  Imports
        //
        var _Trace  = Gem._.Trace

        var console                   = window.console
        var pending                   = _Trace.pending
        var unbound__group_start_open = console.group
        var unbound__line             = console.log
        var zap_pending__1_to_end     = _Trace.zap_pending__1_to_end


        //
        //  Implementation
        //
        return function Gem__Trace__trace_line(/*arguments*/) {
            //  Output a line of text in trace mode.
            //
            //  NOTE:
            //      If this is the first line inside the group, then the [previously pending] closed group is
            //      flushed (i.e.: actually output as a closed group).

            if (pending.length > 1) {
                unbound__group_start_open.apply(console, pending)
                zap_pending__1_to_end()
            }

            unbound__line.apply(console, arguments)
        }
    }//,
)


//
//  Gem._.Trace.function_result
//      End a closed trace group with a result (i.e.: function return value).
//
//  NOTE:
//      If there are lines inside the group, then the group is closed.
//
//      If there is no lines inside the group, then the [previously pending] closed group is
//      converted to a normal line.
//
Gem.Boot.Core.codify_method(
    Gem._.Trace,
    'function_result',
    (
          'End a closed trace group with a result (i.e.: function return value).\n'
        + '\n'
        + 'NOTE:\n'
        + '    If there are lines inside the group, then the group is closed.\n'
        + '\n'
        + '    If there is no lines inside the group, then the [previously pending] closed group is converted to a'
        + ' normal line'
        + '.'
    ),
    function codifier$Gem__Trace__function_result() {
        //
        //  Imports
        //
        var _Trace = Gem._.Trace

        var pending                   = _Trace.pending
        var trace_value               = _Trace.trace_value
        var unbound__line             = console.log
        var zap_pending__1_to_end     = _Trace.zap_pending__1_to_end


        return function Gem__Trace__function_result(v) {
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
    }//,
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
