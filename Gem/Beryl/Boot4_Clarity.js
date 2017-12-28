//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot4_Clarity: Boot - Phase 4 - Add Clarity
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  In Gem clarity mode, *every* object created has a `.$who` and `.$what` member to help introspect the object
//  in developer tools:
//
//      This makes it a lot clearer what the object is used for.
//
//      All "clarity" objects begin with `$` (see below for an exeption, when instead `.$$who` or `.$$what` is used to
//      avoid conflicts).
//
//      Also each module appears in `Gem.$.ModuleName`, with each member of that module having a `.$who` & `.$what`
//      members.
//
//      By *every* object this includes all closure objects that are used.  This make it very easy to examine
//      the `.[[Scopes]]` member of a function and introspect the value of each of it's closure objects.
//
//  Minor Exception:
//
//      When an object uses `.$who` or `.$what` members for it's own purposes, then the extra members created
//      are named `.$$who` and `.$$what` to avoid conflicts.
//
Gem.Core.execute(
    function execute$Gem__add_clarity() {
        if ( ! ('$' in Gem)) {
            Gem.$ = {                                           //  Map of introspection of all the Gem modules
                $who  : 'Gem.$',
                $what : 'Map of introspection of all the Gem modules.',
                Beryl : {
                    $who  : 'Gem.$.Beryl',
                    $what : 'An introspection of the Beryl module.'//,
                }//,
            }
        }

        Gem.Configuration.$who  = 'Gem.Configuration'
        Gem.Configuration.$what = 'Gem Configuration values'

        Gem.Script.script_map.$who  = 'Gem.Script.script_map'
        Gem.Script.script_map.$what = 'Map of all the scripts loaded (or loading).'

        Gem.Source.$who  = 'Gem.Source'
        Gem.Source.$what = 'A map, for each `<script>` tag, a function from the source file to "hold onto"'
                         + ' to avoid garbage collection of all functions from that source file,'
                         + ' which causes the source file to disappear from the "Sources" tab of Developer Tools'

        Gem.Trace.$who  = 'Gem.Trace'
        Gem.Trace.$what = 'Map of functions, methods & bound_methods being traced.'

        Gem._.$who  = 'Gem._'
        Gem._.$what = 'Private members & methods of all Gem modules.'

        Gem._.Core.$who  = 'Gem._.Core'
        Gem._.Core.$what = 'Private members & methods of the Core Gem module.'
    }
)


//
//  The following four methods call each other, hence they have to be defined together in the same closure:
//
//      Gem.Core.throw_must_be_a_number    - Throw a type error when a parameter is not a number.
//      Gem.Core.throw_must_be_a_string    - Throw a type error when a parameter is not a string.
//      Gem.Core.throw_type_error          - Throw a type error (usually ... received invalid parameters).
//      Gem.Core.throw_wrong_arguments     - Throw a type error when a method receives wrong number of arguments.
//
Gem.Core.execute(
    function execute$setup__Gem__throw_methods() {
        //
        //  Imports
        //
        var Error = window.Error


        //
        //  Implementation
        //
        var throw_must_be_number = function Gem__Core__throw_must_be_number(name, v) {
            //  Throw a type error when a parameter is not a number.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.throw_must_be_number', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_string('name', name) }
                //  `v` can by any type (though obviously is not a string)
            }

            throw_type_error('parameter `' + name + '` must be a number; was instead', v)
        }


        var throw_must_be_string = function Gem__Core__throw_must_be_string(name, v) {
            //  Throw a type error when a parameter is not a string.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.throw_must_be_string', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_string('name', name) }
                //  `v` can by any type (though obviously is not a number)
            }

            throw_type_error('parameter `' + name + '` must be a string; was instead', v)
        }


        var throw_type_error = function Gem__Core__throw_type_error(prefix, v) {
            //  Throw a type error (usually used when a method received invalid parameters).

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.throw_type_error', 2, arguments.length)
                }

                if (typeof prefix !== 'string') { throw_must_be_string(prefix, 'prefix') }
                //  `v` handled below
            }

            if (typeof v === 'function') {
                if (v.name.length) {
                    var suffix = ' a function named `' + v.name + '`'
                } else {
                    var suffix = ' an unnamed function'
                }
            } else {
                if (typeof v === 'undefined') {
                    var suffix = ' `undefined`'
                } else {
                    var suffix = ' the value: ' + v.toString()
                }
            }

            var message = 'TypeError: ' + prefix + suffix

            throw new Error(message)
        }


        var throw_wrong_arguments = function Gem__Core__throw_wrong_arguments(name, actual, expected) {
            //  Throw a type error when a method receives wrong number of arguments.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.throw_wrong_arguments', 3, arguments.length)
                }

                if (typeof name     !== 'string') { throw_must_be_string('name',     name)     }
                if (typeof actual   !== 'number') { throw_must_be_number('actual',   actual)   }
                if (typeof expected !== 'number') { throw_must_be_number('expected', expected) }
            }

            if (expected === 0) {
                var takes = 'takes no arguments'
            } else if (expected == 1) {
                var takes = 'takes exactly 1 argument'
            } else {
                var takes = 'takes exactly ' + expected.toString() + ' arguments'
            }

            var message = 'TypeError: function `' + name + '` ' + takes + ' (' + actual.toString() + ' given)'

            throw new Error(message)
        }


        //
        //  Gem.Core.throw_must_be_number
        //      Throw a type error when a parameter is not a number.
        //
        Gem.Core.method(
            'throw_must_be_number',
            'Throw a type error when a parameter is not a number.',
            throw_must_be_number//,
        )


        //
        //  Gem.Core.throw_must_be_string
        //      Throw a type error when a parameter is not a string.
        //
        Gem.Core.method(
            'throw_must_be_string',
            'Throw a type error when a parameter is not a string.',
            throw_must_be_string//,
        )


        //
        //  Gem.Core.throw_type_error
        //      Throw a type error (usually used when a method received invalid parameters).
        //
        Gem.Core.method(
            'throw_type_error',
            'Throw a type error (usually used when a method received invalid parameters).',
            throw_type_error//,
        )


        //
        //  Gem.Core.throw_wrong_arguments
        //      Throw a type error when a method receives wrong number of arguments.
        //
        Gem.Core.method(
            'throw_wrong_arguments',
            'Throw a type error when a method receives wrong number of arguments.',
            throw_wrong_arguments//,
        )
    }
)


//
//  Gem.Core.codify_bound_method
//      Stub for Gem.Core.codify_bound_method
//
//  NOTE:
//      See "js/plugin/Beryl.js" for an explanation of why stub's are used.
//      See "Gem/Beryl/Boot5_Methods.js" for full implementation
//
Gem.Core.codify_method(
    'codify_bound_method',
    'Stub for Gem.Core.codify_bound_method',
    function codifier$Gem__Core__codify_bound_method() {
        var clarity                    = Gem.Configuration.clarity
        var define_property            = Object.defineProperty
        var visible_constant_attribute = Gem.Core.visible_constant_attribute


        return function Gem__Core__codify_bound_method(who, $what, $which, codifier, codifier_trace) {
            var bound_method = codifier()

            if (clarity) {
                var full_name = (
                        visible_constant_attribute.value = this.$who + '.' + who
                    )

                define_property(bound_method, '$who', visible_constant_attribute)

                visible_constant_attribute.value = $what
                define_property(bound_method, '$what', visible_constant_attribute)

                visible_constant_attribute.value = $which
                define_property(bound_method, '$which', visible_constant_attribute)
            }

            if (codifier_trace) {
                bound_method = codifier_trace(bound_method)

                if (clarity) {
                    visible_constant_attribute.value = full_name
                    define_property(bound_method, '$who', visible_constant_attribute)

                    visible_constant_attribute.value = 'Trace: ' + full_name
                    define_property(bound_method, '$what', visible_constant_attribute)

                    visible_constant_attribute.value = 'Trace: ' + $which
                    define_property(bound_method, '$which', visible_constant_attribute)
                }
            }

            visible_constant_attribute.value = bound_method
            define_property(this, who, visible_constant_attribute)
            delete visible_constant_attribute.value
        }
    }//,
)


//
//  Gem.Core.identifier_test
//      Test a string to see if it represents an identifier.
//
Gem.Core.codify_bound_method(
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
    },
    function codifier$trace$Gem__Core__identifier_test(Gem__Core__identifier_test) {
        var Trace = Gem.Trace

        var trace_start  = Trace.trace_start
        var trace_result = Trace.trace_result


        return function trace$Gem__Core__identifier_test(s) {
            //  Trace Gem.Core.identifier_test.

            trace_start(Gem__Core__identifier_test, arguments)

            var r = Gem__Core__identifier_test(s)

            trace_result(r)

            return r
        }
    }//,
)


//
//  Gem.Core.throw_must_be_identifier
//      Throw a type error when a parameter is not a string representing an identifier.
//
Gem.Core.codify_method(
    'throw_must_be_identifier',
    'Throw a type error when a parameter is not a string representing an identifier.',
    function codifier$Gem__Core__throw_must_be_identifier() {
        //
        //  Imports
        //
        var escape                = window.escape
        var Error                 = window.Error
        var throw_must_be_string  = Gem.Core.throw_must_be_string
        var throw_type_error      = Gem.Core.throw_type_error
        var throw_wrong_arguments = Gem.Core.throw_wrong_arguments


        return function Gem__Core__throw_must_be_identifier(name, v) {
            //  Throw a type error when a parameter is not a string representing an identifier.

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.throw_must_be_identifier', 2, arguments.length)
                }

                if (typeof name !== 'string') { throw_must_be_string('name', name) }
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
Gem.Core.execute(
    function execute$push_to_callback_later$recodify$Gem__Script__load() {
        if ( ! ('codify_method_load' in Gem.Script)) {
            //
            //  This file is being reloaded by itself, so there is no `Gem.Script.codify_method_load` since
            //  it was deleted earlier (and has not been recreated by reloading the original file).
            //
            return
        }


        //  Imports
        var clarity_mode$global_variable_Gem_changed = Gem._.Core.clarity_mode$global_variable_Gem_changed
        var codify_method_load                       = Gem.Script.codify_method_load


        //
        //  Callback to recodify `Gem.Script.load` (and also delete `Gem.Script.codify_method_load`
        //
        function callback$recodify$Gem__Script__load() {
            codify_method_load()

            //
            //  Delayed deletion (instead of now):
            //      This allows the user to introspect `Gem.Script.codify_method_load` until it is used & deleted.
            //
            //  NOTE:
            //      We have to use the global `Gem` here, as we want to delete it from the currently modified `Gem`.
            //
            delete window.Gem.Script.codify_method_load
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
