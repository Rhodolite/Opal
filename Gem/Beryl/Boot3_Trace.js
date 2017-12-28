//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot3_Tracing: Boot - Phase 3 - Add Tracing
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  In Gem tracing mode, *every* function, method & bound_method call is traced.
//


//
//  Gem.Trace.trace_line
//
//  Output a line of text in trace mode.
//
//  NOTE:
//      If this is the first line inside the group, then the [previously pending] closed group is flushed
//      (i.e.: actually output as a closed group).
//
Gem.Core.codify_method.call(
    Gem.Trace,
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
        var Trace = Gem.Trace

        var console                   = window.console
        var pending                   = Trace.pending
        var unbound__group_start_open = console.group
        var unbound__line             = console.log
        var zap_pending__1_to_end     = Trace.zap_pending__1_to_end


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
//  Gem.Trace.trace_result
//      End a closed trace group with a result (i.e.: function return value).
//
//  NOTE:
//      If there are lines inside the group, then the group is closed.
//
//      If there is no lines inside the group, then the [previously pending] closed group is
//      converted to a normal line.
//
Gem.Core.codify_method.call(
    Gem.Trace,
    'trace_result',
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
    function codifier$Gem__Trace__trace_line() {
        //
        //  Imports
        //
        var Trace = Gem.Trace

        var pending                   = Trace.pending
        var trace_value               = Trace.trace_value
        var unbound__line             = console.log
        var zap_pending__1_to_end     = Trace.zap_pending__1_to_end


        return function Gem__Trace__trace_result(v) {
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

            Trace.depth -= 1
        }
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
