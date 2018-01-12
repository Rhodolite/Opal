//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot5_Clarity: Boot - Phase 5 - Add Clarity
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


if (Gem.Configuration.clarity) {
    Gem.Boot.qualify_constant(
        Gem._.Core,
        'attribute_$which',
        'A property used to create a visible (i.e.: enumerable) constant `.$which` attribute.',
        function qualifier$Gem__private__Core__attribute_$which() {
            //
            //  Imports
            //
            var create_Object = Object.create


            //
            //  Implementation
            //
            return create_Object(null, { enumerable : { value : true } })
        }//,
    )
}



//
//  Gem.Boot.Core.codify_bound_method
//      Stub for Gem.Boot.Core.codify_bound_method
//
//  NOTE:
//      See "js/plugin/Beryl.js" for an explanation of why stub's are used.
//      See "Gem/Beryl/Boot6_Methods.js" for full implementation
//
Gem.Boot.Core.codify_method(
    Gem.Boot,
    'codify_bound_method',
    'Stub for Gem.Boot.Core.codify_bound_method',
    function codifier$Gem__Core__codify_bound_method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Node = Gem.Boot

        var _Core         = Gem._.Core
        var Configuration = Gem.Configuration

        var Box                = Node.Box
        var clarity            = Configuration.clarity
        var constant_attribute = _Core.constant_attribute
        var create_Object      = Object.create
        var define_properties  = Object.defineProperties
        var define_property    = Object.defineProperty
        var trace              = Configuration.trace
       

        if (clarity) {
            var _Core = Gem._.Core

            var property_$what = Box.property_$what
            var property_$who  = Box.property_$who
        }


        //
        //  Closures
        //
        if (clarity) {
            var attribute_$which = create_Object(null, { enumerable : { value : true } })

            var $who_$what_$which_attributes = create_Object(
                    null,
                    {
                        '$who'   : { enumerable : true, value : property_$who   },
                        '$what'  : { enumerable : true, value : property_$what  },
                        '$which' : { enumerable : true, value : attribute_$which },
                    }//,
                )

            if (trace) {
                var attribute___trace = create_Object(null)                         //  3 underscores

                var _trace_$who_$what_$which_attributes = create_Object(
                    null,
                    {
                        '_trace' : { enumerable : true, value : attribute___trace  },
                        '$who'   : { enumerable : true, value : property_$who     },
                        '$what'  : { enumerable : true, value : property_$what    },
                        '$which' : { enumerable : true, value : property_$what    },
                    }//,
                )
            }
        }


        //
        //  Implementation
        //
        return function Gem__Core__codify_bound_method(who, $what, $which, codifier, codifier_trace) {
            var bound_method = codifier()

            if (clarity) {
                if ( ! ('$who' in this)) {
                    throw new Error('missing $who in object')
                }

                var full_name = this.$who + '.' + who
            }


            if (clarity) {
                /*=*/ {
                    //  constant bound_method.$who   = full_name
                    //  constant bound_method.$what  = $what
                    //  constant bound_method.$which = $which
                    property_$who  .value = full_name
                    property_$what .value = $what
                    attribute_$which.value = $which

                    define_properties(bound_method, $who_$what_$which_attributes)

                    delete property_$who  .value
                    delete property_$what .value
                    delete attribute_$which.value
                }
            }

            if (codifier_trace && trace) {
                var traced_bound_method = codifier_trace(bound_method)

                /*=*/ {
                    //  constant traced_bound_method._trace = bound_method
                    attribute___trace.value = bound_method

                    if (clarity) {
                        //  constant traced_bound_method.$who   = full_name
                        //  constant traced_bound_method.$what  = 'TRACING: ' + $what
                        //  constant traced_bound_method.$which = 'TRACING: ' + $which
                        property_$who  .value = full_name
                        property_$what .value = 'TRACING: ' + $what
                        attribute_$which.value = 'TRACING: ' + $which

                        define_properties(traced_bound_method, $who_$what_$which_attributes)

                        delete property_$who  .value
                        delete property_$what .value
                        delete attribute_$which.value
                    } else {
                        define_property(traced_bound_method, '_trace', attribute___trace.value)
                    }

                    delete attribute___trace.value
                }

                //  constant this.*who = traced_bound_method
                constant_attribute(this, who, traced_bound_method)
                return
            }

            //  constant this.*who = bound_method
            constant_attribute(this, who, bound_method)
        }
    }//,
)


//
//  Gem.Boot.Core.identifier_test
//      Test a string to see if it represents an identifier.
//
Gem.Boot.Core.codify_bound_method(
    'identifier_test',
    'Test a string to see if it represents an identifier.',
    'Binding of an identifier pattern (Regular expression for an identifier) to `RegExp.prototype.exec`.',
    function qualifier$Gem__Core__identifier_test() {
        //
        //  Imports: Types
        //
        var Pattern = window.RegExp


        //
        //  Implementation
        //
        var identifier_pattern = new Pattern('^[$A-Za-z_][0-9$A-Za-z_]*$')


        if ('bind' in identifier_pattern.test) {
            return identifier_pattern.test.bind(identifier_pattern)
        }

        return function OLD_WAY$Gem__Core__identifier_test(s) {
            //  Test a string to see if it represents an identifier.

            return identifier_pattern.test(s)
        }
    }//,
)


//
//  Gem.Boot.Core.throw_must_be_identifier
//      Throw a type error when a parameter is not a string representing an identifier.
//
Gem.Boot.Core.codify_method(
    Gem.Core,
    'throw_must_be_identifier',
    'Throw a type error when a parameter is not a string representing an identifier.',
    function codifier$Gem__Core__throw_must_be_identifier() {
        //
        //  Imports
        //
        var escape = window.escape
        var Error  = window.Error
        var Gem    = window.Gem

        var Configuration = Gem.Configuration
        var Throw         = Gem.Throw


        //
        //  Implementation
        //
        var throw_must_be_a_string = Throw.throw_must_be_a_string
        var throw_type_error       = Throw.throw_type_error
        var throw_wrong_arguments  = Throw.throw_wrong_arguments


        return function Gem__Core__throw_must_be_identifier(name, v) {
            //  Throw a type error when a parameter is not a string representing an identifier.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Boot.Core.throw_must_be_identifier', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_a_string('name', name) }
                //  `v` can by any type
            }


            //
            //  Simple message if the parameter is not a string
            //
            if (typeof v !== 'string') {
                throw_type_error(
                        'parameter `' + name + '` must be a string representing an identifier; was instead',
                        v//,
                    )
            }


            //
            //  More detailed message if the parameter is a string, but does not represent an identifier
            //
            var prefix = 'parameter `' + name + '` must be a string representing an identifier'
                       + '; was instead the string ' + escape(v) + ' which does not look like an identifier'
                       + ".  An identifier must begin with one of '$', a letter, or '_' and can be followed"
                       + "  by any number of '$', a number, a letter, or '_'"

            var message = 'TypeError: ' + prefix

            throw new Error(message)
        }
    }//,
)


//
//  Push for a later callback, a recodify of:
//      Gem.Script.load
//          Load JavaScript code using a `<script>` tag.
//
Gem.Boot.Core.execute(
    function execute$push_to_callback_later$recodify$Gem__Script__load() {
        if ( ! ('codify_load' in Gem.Script)) {
            //
            //  This file is being reloaded by itself, so there is no `Gem.Script.codify_load` since
            //  it was deleted earlier (and has not been recreated by reloading the original file).
            //
            return
        }


        //  Imports
        var clarity_mode$global_variable_Gem_changed = Gem._.Core.clarity_mode$global_variable_Gem_changed
        var codify_load                              = Gem.Script.codify_load


        //
        //  Callback to recodify `Gem.Script.load` (and also delete `Gem.Script.codify_load`
        //
        function callback$recodify$Gem__Script__load() {
            codify_load()

            //
            //  Delayed deletion (instead of now):
            //      This allows the user to introspect `Gem.Script.codify_load` until it is used & deleted.
            //
            //  NOTE:
            //      We have to use the global `Gem` here, as we want to delete it from the currently modified `Gem`.
            //
            delete window.Gem.Script.codify_load
        }


        //
        //  Push the callback to be executed when global variable `Gem` is changed.
        //
        clarity_mode$global_variable_Gem_changed.push(callback$recodify$Gem__Script__load)
    }
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
