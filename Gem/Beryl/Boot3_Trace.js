//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot3_Tracing: Boot - Phase 3 - Add Tracing
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  In Gem tracing mode, *every* function, method & bound_method call is traced.
//
Gem.Core.execute(
    function execute$Gem__add_tracing() {
        var Trace   = Gem.Trace
        var Tracing = Gem.Tracing


        Tracing.identifier_test = 7


        Gem.Core.method(
            'tracing',
            'Stub for Gem.Trace.Tracing.',
            function tracing(name) {
                return (name in Trace) && (Trace[name])
            }
        )
    }
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
