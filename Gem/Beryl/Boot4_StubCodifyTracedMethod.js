//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot4_StubCodifyTracedMethod.js: Boot - Phase 4 - Create a stub to codify a traced method
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Core.codify_method(
    Gem.Trace,
    'codify_untraced_method',
    'Temporary stub for `Gem.Trace.codify_untraced_method`',
    function codifier$Gem__Trace__codify_traced_method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core = Gem._.Core
        var Trace = Gem.Trace

        var method__no_trace = _Core.method__no_trace
        var tracing          = Trace.tracing


        //
        //  Implementation
        //
        return function Gem__Trace__codify_untraced_method(who, $what, codifier) {
            //  Temporary stub for `Gem.Trace.codify_untraced_method`

            if (tracing(codifier.name)) {
                function_call(codifier)

                var method = codifier()

                function_result(method)
            } else {
                var method = codifier()
            }

            method__no_trace(instance, false, who, $what, method)
        }
    }
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
