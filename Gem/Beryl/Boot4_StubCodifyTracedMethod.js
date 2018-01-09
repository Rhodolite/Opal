//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot4_StubCodifyUntracedMethod.js: Boot - Phase 4 - Create a stub to codify an untraced method
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.codify_method(
    Gem.Trace,
    'codify_untraced_method',
    'Interim stub for `Gem.Trace.codify_untraced_method`',
    function codifier$Gem__Trace__codify_untraced_method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core = Gem._.Core
        var Trace = Gem.Trace

        var trace_call       = Trace.trace_call
        var method__no_trace = _Core.method__no_trace


        return function interim$Gem__Trace__codify_untraced_method(who, $what, codifier) {
            //  Interim stub for `Gem.Trace.codify_untraced_method`

            var method = trace_call(codifier)

            method__no_trace(instance, false, who, $what, method)
        }
    }//,
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
