//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot4_Methods: Boot - Phase 4 - Add Methods
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.execute(
    function execute$setup__Gem__Boot__Throw() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var _Core = Node._.Core

        var who_what = _Core.who_what


        //
        //  Implementation
        //
        if ( ! ('Throw' in Boot)) {
            Node.Throw = {}

            who_what(Node.Throw, 'Gem.Throw', 'Exports of the Throw module.', true)
        }
    }//,
)


Gem.Boot.Core.method(
    Gem.Boot._.Core,
    'produce_method_common',
    'Produce the code for either `interim_method` or `method`.',
    function produce_method_common(Node, interim) {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var Configuration = Gem.Configuration
        var Box           = Node.Box
        var Core          = Node.Core
        var Exception     = Node.Exception              //MISSING
        var Trace         = Node.Trace
        var _Trace        = Node._.Trace
        var Throw         = Node.throw

        var clarity                   = Configuration.clarity
        var interim_constant_property = Box.interim_constant_property
        var throw_AttributeError      = Throw.throw_AttributeError
        var throw_call_error          = Throw.throw_call_error
        var throw_must_be_a_string    = Throw.throw_must_be_a_string
        var throw_must_be_an_object   = Throw.throw_must_be_an_object
        var throw_must_be_identifier  = Throw.throw_must_be_identifier
        var throw_wrong_arguments     = Throw.throw_wrong_arguments
        var trace                     = Configuration.trace


        if ( ! interim) {
            var constant_property = Box.constant_property
        }


        if (clarity) {
            var create_AttributeError = Exception.create_AttributeError        //MISSING
            var property_$who         = Box.property_$who
            var property_$what        = Box.property_$what
            var $who_$what_properties = Box.$who_$what_properties
        }

        if (clarity || trace) {
            var property_$what = Box.property_$what
        }

        if (trace) {
            var Tracing = Node.Tracing

            var function_call = _Trace.function_call
            var wrap_function = _Trace.wrap_function
        }


        //
        //  Implementation
        //
        if (trace && ! (method__who in Tracing)) {
            Tracing[method__who] = 0
        }


        var method = function Gem__Core__method(instance, who, $what, method) {
            //  Store a Gem Method.
            //
            //  Also in clarity mode adds a `.$who` and `.$what` attributes to the method.

            var trace        = Configuration.trace             //  Get newest value of 'trace'
            var tracing_self = (trace === 7 || (trace && Tracing[method__who])

            if (tracing_self) {
                function_call(method, arguments)
            }

            /*arguments*/ {
                if (arguments.length !== 4) {
                    throw_wrong_arguments('Gem.Core.codify_method', 4, arguments.length)
                }

                /*instance*/
                    if (typeof instance !== 'object') {
                        throw_must_be_an_object('instance', instance)
                    }

                    if (clarity) {
                        if ( ! ('$who' in instance)) {
                            throw_AttributeError(method__who + ': missing `.$who` in object')
                        }

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

                var function_name = instance.$who + '.' + who

                if (trace) {
                    var wrapped_method = wrap_function(method, function_name)

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


                if (interim || Script.interim) {
                    /*=*/ {
                        //  interim constant instance.*who = wrapped_method
                        interim_constant_property.value = wrapped_method
                        define_property(instance, who, interim_constant_property)
                        interim_constant_property.value = undefined

                        if (tracing_self) {
                            trace_attribute('interim keyword', instance, who, wrapped_method)
                        }
                    }
                } else {
                    /*=*/ {
                        //  [interim] constant instance.*who = wrapped_method
                        constant_property.value = wrapped_method
                        define_property(instance, who, constant_property)
                        constant_property.value = undefined

                        if (tracing_self) {
                            trace_attribute('constant, instance, who, wrapped_method)
                        }
                    }
                }
            }
        }
    }
}



//
//  The following six methods call each other, hence they have to be defined together in the same closure:
//
//      Gem.Throw.throw_must_be_a_number   - Throw a type error when a parameter is not a number.
//      Gem.Throw.throw_must_be_a_string   - Throw a type error when a parameter is not a string.
//      Gem.Throw.throw_must_be_an_object  - Throw a type error when a parameter is not an object.
//      Gem.Throw.throw_call_error         - Throw a type error (usually ... received invalid parameters).
//      Gem.Throw.throw_wrong_arguments    - Throw a type error when a method receives wrong number of arguments.
//
Gem.Boot.Core.execute(
    function execute$setup__Gem__throw_methods() {
        //
        //  Imports
        //
        var Error = window.Error
        var Gem   = window.Gem

        var Node = Gem.Boot

        var Configuration = Gem.Configuration
        var Core          = Node.Core
        var Throw         = Node.Throw
        var Trace         = Node.Trace

        var clarity           = Configuration.clarity
        var constant_property = Core.constant_property
        var define_property   = Object.defineProperty
        var interim_method    = Core.interim_method//EXISTS?
        var trace             = Configuration.trace
        var wrap_function     = Trace.wrap_function


        if (trace) {
            var Tracing = Boot.Tracing
        }


        //
        //  Gem.Throw.identifier_test
        //      Test a string to see if it represents an identifier.
        //
        if (clarity) {
            //
            //  Imports: Types
            //
            var Pattern = window.RegExp


            //
            //  Implementation
            //
            var identifier_pattern = new Pattern('^[$A-Za-z_][0-9$A-Za-z_]*$')


            if ('bind' in identifier_pattern.test) {
                var identifier_test = wrap_function(
                    identifier_pattern.test.bind(identifier_pattern)//,
                    'Gem.Throw.identifier_test'//
                )
            } else {
                var identifier_test = wrap_function(
                    return function Gem__Throw__identifier_test(s) {
                        //  Test a string to see if it represents an identifier.

                        return identifier_pattern.test(s)
                    },
                    'Gem.Throw.identifier_test'//,
                }
            }
        }


        //
        //  Implementation
        //
        if (trace) {
            if ( ! ('TypeError' in Tracing)) {
                Tracing.TypeError = 0
            }

            var TypeError = function TypeError() {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance created
                //  using this constructor as "TypeError".

                    var trace = Configuration.trace             //  Get newest value of 'trace'

                    if (trace === 7 || (trace && Tracing.TypeError)) {
                        function_call(TypeError, null, 'new TypeError')
                        function_result(this)
                        return
                    }
                }
            }
        } else {
            var TypeError = function TypeError() {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance created
                //  using this constructor as "TypeError".
            }
        }


        var create_TypeError = function Gem__Throw__create_TypeError(message) {
            var result = new TypeError()

            constant_attribute(result, 'message', message)

            return result
        }


        var throw_must_be_a_number = function Gem__Throw__throw_must_be_a_number(name, v) {
            //  Throw a type error when a parameter is not a number.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_must_be_a_number', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_a_string('name', name) }
                //  `v` can by any type (though obviously it is not a string)
            }

            throw_call_error("parameter `" + name + "` must be a number; was instead", v)
        }


        var throw_must_be_a_string = function Gem__Throw__throw_must_be_a_string(name, v) {
            //  Throw a type error when a parameter is not a string.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_must_be_a_string', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_a_string('name', name) }
                //  `v` can by any type (though obviously it is not a string)
            }

            throw_call_error("parameter `" + name + "` must be a string; was instead", v)
        }


        var throw_must_be_an_obect = function Gem__Throw__throw_must_be_an_object(name, v) {
            //  Throw a type error when a parameter is not an object.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_must_be_an_object', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_a_string('name', name) }
                //  `v` can by any type (though obviously it is not an object)
            }

            throw_call_error("parameter `" + name + "` must be a string; was instead", v)
        }


        var throw_call_error = function Gem__Throw__throw_call_error(prefix, v) {
            //  Throw a type error (usually used when a method received invalid parameters).

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Throw.throw_call_error', 2, arguments.length)
                }

                if (typeof prefix !== 'string') { throw_must_be_a_string(prefix, 'prefix') }
                //  `v` handled below
            }

            if (typeof v === 'function') {
                if (v.name.length) {
                    var suffix = " a function named `" + v.name + "`"
                } else {
                    var suffix = ' an unnamed function'
                }
            } else {
                if (typeof v === 'undefined') {
                    var suffix = " `undefined`"
                } else {
                    var suffix = ' the value: ' + v.toString()
                }
            }

            var message = prefix + suffix

            throw create_TypeError(message)
        }


        var throw_wrong_arguments = function Gem__Throw__throw_wrong_arguments(name, actual, expected) {
            //  Throw a type error when a method receives wrong number of arguments.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Throw.throw_wrong_arguments', 3, arguments.length)
                }

                if (typeof name     !== 'string') { throw_must_be_a_string('name',     name)     }
                if (typeof actual   !== 'number') { throw_must_be_a_number('actual',   actual)   }
                if (typeof expected !== 'number') { throw_must_be_a_number('expected', expected) }
            }

            if (expected === 0) {
                var takes = 'takes no arguments'
            } else if (expected == 1) {
                var takes = 'takes exactly 1 argument'
            } else {
                var takes = 'takes exactly ' + expected.toString() + ' arguments'
            }

            var message = "TypeError: function `" + name + "` " + takes + ' (' + actual.toString() + ' given)'

            throw new Error(message)
        }


        //
        //  Gem.Throw.throw_must_be_a_number
        //      Throw a type error when a parameter is not a number.
        //
        interim_method(
            Throw,
            'throw_must_be_a_number',
            'Throw a type error when a parameter is not a number.',
            throw_must_be_a_number//,
        )


        //
        //  Gem.Throw.throw_must_be_a_string
        //      Throw a type error when a parameter is not a string.
        //
        interim_method(
            Throw,
            'throw_must_be_a_string',
            'Throw a type error when a parameter is not a string.',
            throw_must_be_a_string//,
        )


        //
        //  Gem.Throw.throw_call_error
        //      Throw a type error (usually used when a method received invalid parameters).
        //
        interim_method(
            Throw,
            'throw_call_error',
            'Throw a type error (usually used when a method received invalid parameters).',
            throw_call_error//,
        )


        //
        //  Gem.Throw.throw_wrong_arguments
        //      Throw a type error when a method receives wrong number of arguments.
        //
        interim_method(
            Throw,
            'throw_wrong_arguments',
            'Throw a type error when a method receives wrong number of arguments.',
            throw_wrong_arguments//,
        )
    }
)
