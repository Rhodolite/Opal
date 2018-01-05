//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot4_StubCodifyTracedMethod.js: Boot - Phase 4 - Create a stub to codify a traced method
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Core.codify_method.call(
    Gem.Trace,
    'codify_untraced_method',
    'Temporary stub for `Gem.Trace.codify_untraced_method`',
    function codifier$Gem__Trace__codify_traced_method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core         = Gem._.Core
        var Configuration = Gem.Configuration
        var Trace         = Gem.Trace

        var clarity       = Configuration.clarity
        var create_Object = Object.create
        var tracing       = Trace.tracing

        if (clarity) {
            var method__clarity_no_trace = Core.method__clarity_no_trace
        } else {
            var constant_attribute       = _Core.constant_attribute
        }


        //
        //  Implementation
        //
        return function Gem__Trace__codify_untraced_method(who, $what, codifier_method) {
            //  Temporary stub for `Gem.Trace.codify_untraced_method`

            /*method*/ {
                var trace = Configuration.trace                                     //  Get newest value of 'trace'

                if (trace && tracing(codifier_method.name)) {
                    var wrapped_codifier_method = wrap_function(codifier_method)
                } else {
                    var wrapped_codifier_method = codifier_method
                }

                var method = wrapped_codifier_method()
            }

            if (clarity) {
                method__clarity_no_trace(instance, who, $what, method)
                return
            }

            /*=*/ {
                //  constant instance.*who = value
                constant_attribute(instance, who, method)
            }
        }
    }
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
