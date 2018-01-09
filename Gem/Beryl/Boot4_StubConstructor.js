//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot3_StubConstructor: Boot - Phase 3 - Stub to create a constructor
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.codify_method(
    Gem.Core,
    'store_function_from_evaluate',
    (
          'Store a function created inside an eval.\n'
        + '\n'
        + 'This is used to pass values into and out of an `eval`.'
    ),
    function codifier$Gem__Core__store_function_from_evaluate() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core = Gem._.Core


        //
        //  Implementation: No tracing
        //
        return function Gem__Core__store_function_from_evaluate(function_from_evaluate) {
            //  Private method used to store a function created inside `eval`.
            //
            //  This is used to pass values into and out of an `eval`.

            _Core.function_from_evaluate = function_from_evaluate
        }
    }//,
)


if (Gem.Configuration.trace) {
    Gem.Boot.Core.codify_untraced_method(
        Gem.Trace,
        'trace_constructor',
        'Private method used to trace a constructor.\n',
        function codifier$Gem__Trace__trace_constructor() {
            //
            //  Imports
            //
            var Gem     = window.Gem
            var console = window.console

            var Configuration = Gem.Configuration
            var Tracing       = Gem.Tracing
            var _Trace        = Gem._.Trace

            var pending                   = _Trace.pending
            var trace_value               = _Trace.trace_value
            var unbound__group_start_open = console.group
            var unbound__line             = console.log
            var unbound__push             = pending.push
            var zap_pending__1_to_end     = _Trace.zap_pending__1_to_end


            if ('bind' in unbound__push) {
                var push_color_bold_cyanish = unbound__push.bind(pending, 'font-weight: bold; color: #00AAFF')
                var push_color_normal_none  = unbound__push.bind(pending, 'font-weight: none; color: none')
            } else {
                var push_color_bold_cyanish = function OLD_WAY$push_color_bold_cyanish() {
                    pending.push('font-weight: bold; color: #00AAFF')
                } 

                var push_color_normal_none = function OLD_WAY$push_color_normal_none() {
                    pending.push('font-weight: none; color:none')
                }
            }


            //
            //  Implementation
            //
            return function Gem__Trace__trace_constructor(name, instance) {
                //  Private method used to trace a constructor.

                var trace = Configuration.trace             //  Get newest value of 'trace'

                if (trace === 7 || (trace && Tracing[name])) {
                    if (pending.length > 1) {
                        unbound__group_start_open.apply(console, pending)
                        zap_pending__1_to_end()
                    }

                    push_color_bold_cyanish()
                    push_color_normal_none()
                    pending[0] = '%cnew ' + name + '%c() => ' + trace_value(instance)
                    unbound__line.apply(console, pending)
                    zap_pending__1_to_end()

                    return
                }
            }
        }//,
    )
}


Gem.Boot.Core.codify_method(
    Gem.Core,
    'create_constructor',
    'Create a constructor.',
    function codifier$Gem__Trace__create_constructor() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core         = Gem._.Core
        var Configuration = Gem.Configuration

        var trace = Configuration.trace


        //
        //  Implementation
        //
        if ( ! trace) 
        {
            //
            //  Implementation: Non tracing version
            //
            return function Gem__Trace__create_constructor(name) {
                //  Create a constructor.

                eval(
                          'Gem._.Core.store_function_from_evaluate(\n'
                        + '   function ' + name + '() {\n'
                        + '       //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name"\n'
                        + '       //  of an instance created using this constructor as "' + name + '".\n'
                        + '   }\n'
                        + ')\n'
                    )

                var result = _Core.function_from_evaluate

                delete _Core.function_from_evaluate

                return result
            }
        }


        //
        //  Imports: Tracing version
        //
        var Trace = Gem.Trace

        var trace_constructor = Trace.trace_constructor


        //
        //  Implementation: Tracing version
        //
        return function Gem__Trace__create_constructor(name) {
            //  Create a constructor.

            eval(
                      'Gem.Boot.Core.store_function_from_evaluate(\n'
                    + '    function codifier_constructor(trace_constructor) {\n'
                    + '        //  A codifier to create a closure around constructor ' + name + '.\n'
                    + '\n'
                    + '        return function ' + name + '() {\n'
                    + '            //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name"\n'
                    + '            //  of an instance created using this constructor as "' + name + '".\n'
                    + '\n'
                    + '            trace_constructor("' + name + '")\n'
                    + '        }\n'
                    + '    }\n'
                    + ')\n'
                )

            var codifier = _Core.function_from_evaluate

            delete _Core.function_from_evaluate

            return codifier(trace_constructor)
        }
    }//,
)


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
