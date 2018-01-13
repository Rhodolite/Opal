//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot3_Dynamic: Boot - Phase 3 - Add & use `Gem.Script.dynamic`.
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//Gem.Configuration.trace = 7


Gem.Boot.Core.execute(
    function execute$setup__Script() {
        Gem.Script = {                                      //  `<script>` handling.
            dynamic : true//,                               //      Set to `true` for a script that can be reloaded.
        }
    }//,
)



//
//  Gem.Boot._.Core.produce_method_common
//      Produce the code for `Gem._.Core.method_common`
//
//  NOTE:
//      The first version of `method_common` is in "js/plugins/Beryl.js".
//
//      This produced version of `method_common` adds the following:
//
//          1.  Can do argument checking;
//          2.  Looks at `Gem.Script.dyanmic`
//          3.  Is produced (i.e.: can be created multiple times, as the boot environment improves).
//          4.  Simplified version of `method_common` in no clarity & no trace mode.
//
Gem.Boot.Core.interim_method(
    Gem.Boot._.Core,
    'produce_method_common',
    "Produce the code for `Gem._.Core.method_common`.",
    function Gem__private__Core__produce_method_common(Node, interim, handle_errors) {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration
        var Gem_Script    = Gem.Script

        var Box = Node.Box

        var constant_property         = Box.constant_property
        var define_property           = Object.defineProperty
        var clarity                   = Configuration.clarity
        var interim_constant_property = Box.interim_constant_property
        var trace                     = Configuration.trace


        //
        //  Implementation
        //
        if ( ! clarity && ! trace) {
            //
            //  Implementation: No clarity & no trace
            //
            return function method_common(instance, interim, who, $what, method) {
                //  Support code to store a [possibly interim] Gem Method.
                //
                //  Ignores parameter `$what` since not in clarity mode.

                if (interim || Gem_Script.dynamic) {
                    /*=*/ {
                        //  interim constant instance.*who = method
                        interim_constant_property.value = method
                        define_property(instance, who, interim_constant_property)
                        interim_constant_property.value = undefined
                    }
                } else {
                    /*=*/ {
                        //  constant instance.*who = method
                        constant_property.value = method
                        define_property(instance, who, constant_property)
                        constant_property.value = undefined
                    }
                }
            }
        }


        //
        //  Imports: clarity and/or trace mode
        //
        var Trace  = Node.Trace

        var cocoon            = Trace.cocoon
        var define_properties = Object.defineProperties

        if (handle_errors) {
            var Throw = Node.throw

            var throw_AttributeError      = Throw.throw_AttributeError
            var throw_call_error          = Throw.throw_call_error
            var throw_must_be_a_string    = Throw.throw_must_be_a_string
            var throw_must_be_an_object   = Throw.throw_must_be_an_object
            var throw_must_be_identifier  = Throw.throw_must_be_identifier
            var throw_wrong_arguments     = Throw.throw_wrong_arguments
        }

        if (clarity) {
            var property_$who         = Box.property_$who
            var property_$what        = Box.property_$what
            var $who_$what_properties = Box.$who_$what_properties
        }


        if (trace) {
            var _Trace  = Node._.Trace
            var Tracing = Node.Tracing

            var function_call   = _Trace.function_call
            var procedure_done  = _Trace.procedure_done
            var trace_attribute = _Trace.trace_attribute
            var wrap_function   = Trace.wrap_function
        }


        //
        //  Implementation: clarity and/or trace mode
        //
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

                if (handle_errors) {
                    if (arguments.length !== 4) {
                        throw_wrong_arguments('Gem.Core.codify_method', 4, arguments.length)
                    }

                    /*instance*/ {
                        if (typeof instance !== 'object') {
                            throw_must_be_an_object('instance', instance)
                        }

                        if (clarity || trace) {
                            if ( ! ('$who' in instance)) {
                                throw_AttributeError(method__who + ': missing `.$who` in object')
                            }
                        }

                        if (clarity) {
                            if ( ! ('_prefix' in instance)) {
                                throw_AttributeError(method__who + ': missing `._prefix` in object')
                            }
                        }
                    }


                    if ( ! (typeof who === 'string' && identifier_test(who))) {
                        throw_must_be_identifier('$who', who)
                    }

                    if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }

                    /*method*/ {
                        if (clarity) {
                            var method_name = instance._prefix + '__' + who

                            if (typeof method !== 'function' || method_name !== method.name) {
                                throw_call_error(
                                        (
                                              'parameter `method` must be a function named `' + method_name + '`'
                                            + '; was instead'
                                        ),
                                        method//,
                                    )
                            }
                        }


                        if ('$trace' in method) {
                            var message = method__who + ': function "' + method.name + '" has a `.$trace` attribute'

                            throw_AttributeError(message)
                        }
                    }
                }

                var function_name = null

                if (trace) {
                    if ('$trace' in method) {
                        var wrapped_method = method
                        var method         = wrapped_method.$trace
                    } else {
                        var function_name  = instance.$who + '.' + who
                        var wrapped_method = wrap_function(method, function_name)
                    }

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

                if (interim || Gem_Script.dynamic) {
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
                        //  constant instance.*who = wrapped_method
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


        return method_common
    }//,
)


Gem.Boot.Core.execute(
    function execute$Gem__private__Core__codify_core_methods() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var _Core = Node._.Core

        var produce_method_common = _Core.produce_method_common
        var codify_core_methods   = _Core.codify_core_methods


        //
        //  Implementation
        //
        var method_common = produce_method_common(Node, false)

        codify_core_methods(Node, true, method_common)
    }//,
)


if (Gem.Boot.Script.handle_errors) {
    Gem.Boot.Core.codify_interim_method(
        Gem.Boot.Script,
        'update_handle_event',
        "Update the `handle_event` function attached to a `<script>` tag.",
        function codifier$Gem__Script__update_handle_event() {
            //
            //  Imports
            //
            var document = window.document
            var Gem      = window.Gem

            var Node = Gem.Boot

            var Script = Node.Script

            var script_event_list = Script.event_list


            //
            //  Implementation
            //
            return function Gem__Script__update_handle_event(handle_event) {
                if ( ! ('currentScript' in document))  {
                    throw new Error("Gem.Script.update_handle_event: `document.current_script` does not exist")
                }

                var tag              = document.currentScript
                var old_handle_event = Script.handle_event

                for (var i = 0; i < script_event_list.length; i ++) {
                    var type = script_event_list[i]

                    tag.removeEventListener(type, old_handle_event)
                    tag.addEventListener   (type, handle_event)
                }
            }
        }//,
    )
}


if (Gem.Boot.Script.handle_errors) {
    Gem.Boot.Core.method(
        Gem.Boot.Script,
        'produce_handle_event',
        (
              "Produce method `Gem.Script.handle_event`.\n"
            + '\n'
            + 'This routine can be called multiple times:\n'
            + '\n'
            + '    1.  Here;\n'
            + "    2.  Again, in Clarity mode, after global variable `Gem` is replaced."
        ),
        function Gem__Script__produce_handle_event(Node_Script) {
            //
            //  Imports
            //
            var Gem = window.Gem

            var Gem_Script  = Gem.Script

            var script_error        = Node_Script.script_error
            var script_event_list   = Node_Script.event_list
            var source_attribute    = Node_Script.source_attribute


            //
            //  Implementation
            //

            //
            //  NOTE #1:
            //      `handle_event` has to refer to itself; hence it has to be stored in variable
            //      `script_handle_event`.
            //
            //  NOTE #2:
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
            var handle_event = function Gem__Script__handle_event(e) {
                //  Handle events of `<script>` tags.

                Gem_Script.dynamic = false                                 //  Script done, reset `Gem.Script.dynamic`.

                var tag = e.target

                for (var i = 0; i < script_event_list.length; i ++) {
                    var type = script_event_list[i]

                    tag.removeEventListener(type, handle_event)             //  Refer to myself. See NOTE #1 above.
                }

                if (e.type === 'abort' || e.type === 'error') {
                    script_error(source_attribute(tag) + ': Failed to load')
                }
            }


            return handle_event
        }//,
    )
}


Gem.Boot.Core.execute(
    function execute$finish__Gem__Boot2__Dynamic() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var Core   = Node.Core
        var Script = Node.Script

        var codify_load    = Script.codify_load
        var handle_errors  = Script.handle_errors
        var interim_method = Core.interim_method
//      var load           = Script.load                //  Must be done below after `codify_load`


        //
        //  Implementation: handle_event
        //
        if (handle_errors) {
            //
            //  Imports: handle_event
            //
            var interim_script       = Core.interim_script
            var produce_handle_event = Script.produce_handle_event
            var update_handle_event  = Script.update_handle_event


            //
            //  Implementation: handle_event
            //
            var handle_event         = produce_handle_event(Script)

            update_handle_event(handle_event)

            interim_method(
                Script,
                'handle_event',
                "Handle events of `<script>` tags.",
                handle_event//,
            )
        }


        //
        //  Implementation: codify_load
        //
        codify_load(Node, interim_method)


        //
        //  Load next script
        //
        var load = Script.load                          //  Must be done after `codify_load` above

        load('Gem/Beryl/Boot3_Manifest.js')
    }//,
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
