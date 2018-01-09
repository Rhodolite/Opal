//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot3_TraceConstructor: Boot - Phase 3 - Trace a constructor
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.codify_method(
    Gem._.Trace,
    'store_codifier_wrap_constructor',
    (
          'Private method used to store a function to codify a wrapper to a constructor.\n'
        + '\n'
        + 'This is used to pass values into and out of an `eval`.  The wrapper has to be created inside an `eval` so\n'
        + ' it can dynamically be assigned the same name as the constructor it is wraping.'
    ),
    function codifier$Gem__Private__Trace__store_codifier_wrap_constructor() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Trace = Gem._.Trace


        //
        //  Implementation: No tracing
        //
        return function Gem__Private__Trace__store_codifier_wrap_constructor(codifier_wrap_constructor) {
            //  Private method used to store a function to codify a wrapper to a constructor.
            //
            //  This is used to pass values into and out of an `eval`.  The wrapper has to be created inside an `eval`
            //  so  it can dynamically be assigned the same name as the constructor it is wraping.

            _Trace.codifier_wrap_constructor = codifier_wrap_constructor
        }
    }//,
)


Gem.Boot.Core.codify_untraced_method(
    Gem._.Trace,
    'trace_constructor',
    (
          'Private method used to help trace a constructor.\n'
        + '\n'
        + 'This is a helper function, so that the wrapper around a constructor can be kept to a minimal size'
        + ' (since the wrapper has to be created inside an `eval`).'
    ),
    function codifier$Gem__Private__Trace__trace_constructor() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration
        var Tracing       = Gem.Tracing
        var _Trace        = Gem._.Trace

        var function_call   = _Trace.function_call
        var function_result = _Trace.function_result
        var procedure_done  = _Trace.procedure_done


        //
        //  Implementation
        //
        return function Gem__Private__Trace__trace_constructor(constructor, instance, constructor_arguments) {
            //  Private method used to help trace a constructor.
            //
            //  This is a helper function, so that the wrapper around a constructor can be kept to a minimal size
            //  (since the wrapper has to be created inside an `eval`).

            var trace = Configuration.trace             //  Get newest value of 'trace'
            var name  = constructor.name

            if ( ! (name in Tracing)) {
                Tracing[name] = 0
            }

            if (trace === 7 || (trace && Tracing[name])) {
                function_call(constructor, constructor_arguments, 'new ' + constructor.name)

                var result = constructor.apply(instance, constructor_arguments)

                if (result !== undefined) {
                    function_result(result)
                    return result
                }

                function_result(instance)
                return
            }

            result = constructor.apply(instance, constructor_arguments)

            if (result !== undefined) {
                return result
            }

            return instance
        }
    }//,
)


Gem.Boot.Core.codify_method(
    Gem.Trace,
    'wrap_constructor',
    'Create a trace wrapper around a constructor.',
    function codifier$Gem__Trace__wrap_constructor() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration

        var trace = Configuration.trace


        //
        //  Implementation: No tracing
        //
        if ( ! trace) {
            return function Gem__Trace__wrap_constructor(constructor) {
                //  Do nothing -- `Gem.Configuration.trace` not set.
                //  
                //  NOTE:
                //      If `Gem.Configuration.trace` is set to any "truthy" value (i.e.: a value that evaluates to
                //      `true` when used in a boolean context) then this would generate a trace wrapper around the
                //      constructor.

                return constructor
            }
        }


        //
        //  Imports: tracing version
        //
        var _Trace = Gem._.Trace

        var trace_constructor = _Trace.trace_constructor


        //
        //  Implementation: tracing version
        //
        return function Gem__Trace__wrap_constructor(constructor) {
            //  Trace a call to a constructor.

            var name = constructor.name

            eval(
                      'Gem._.Trace.store_codifier_wrap_constructor(\n'
                    + '    function codifier_wrap_constructor(trace_constructor, constructor) {\n'
                    + '        //  A codifier to create a closure around a wrapper for constructor ' + name + '.\n'
                    + '\n'
                    + '       return function ' + name + '() {\n'
                    + '           // A tracing wrapper around constructor ' + name + '.\n'
                    + '\n'
                    + '           return trace_constructor(constructor, this, arguments)\n'
                    + '       }\n'
                    + '   }\n'
                    + ')\n'
                )

            var result = _Trace.codifier_wrap_constructor(trace_constructor, constructor)

            delete _Trace.codifier_wrap_constructor

            return result
        }
    }//,
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
