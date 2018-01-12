//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot6_Methods: Boot - Phase 6 - Add Methods
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Gem.Boot.Core.visible_mutable_attribute
//
//      A visible mutable attribute (i.e.: a normal member).
//
//      Read 'visible' to mean 'enumerable'.
//
//  NOTE:
//      Enumerable properties are shown better in Developer Tools (at the top of the list, and not grayed out),
//      for this reason `$what`, `$which`, `$who`, and '*$' are all shown as visibile instead of invisible.
//
Gem.Boot.qualify_constant(
    Gem.Boot.Core,
    'visible_mutable_attribute',
    (
          'A visible mutable attribute (i.e.: a normal member).\n'
        + '\n'
        + "Read 'visible' to mean 'enumerable'."
    ),
    function qualifier$Gem__Core__visible_mutable_attribute() {
        //
        //  Imports
        //
        var create_Object = Object.create

        return create_Object(
                null,
                {
                //  configurable : { value : false },       //  Default value, no need to set
                    configurable : { value : true  },       //  TEMPORARY!
                    enumerable   : { value : true  },       //  Visible (i.e.: enumerable)
                    writable     : { value : true  }//,     //  Mutable attribute (i.e.: writable)
                }
            )
    }//,
)



//
//  Gem.Boot.Core.clarity_note
//      Add a note to a variable or set of variables (clarity mode only).
//
Gem.Boot.Core.codify_method(
    Gem.Core,
    'clarity_note',
    'Add a note to a variable or set of variables (clarity mode only).',
    function codifier$Gem__Core__clarity_note() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration

        var clarity = Configuration.clarity


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            return function Gem__Core__clarity_note(/*instance, who, $what*/) {
                //  Nothing to do, not in clarity mode
            }
        }


        //
        //  Imports: Clarity version
        //
        var _Core = Gem._.Core
        var Core  = Gem.Boot.Core
        var Throw = Gem.Throw

        var constant_property        = _Core.constant_property
        var define_property          = Object.defineProperty
        var identifier_test          = Core.identifier_test
        var throw_must_be_a_string   = Throw.throw_must_be_a_string
        var throw_must_be_an_object  = Throw.throw_must_be_an_object
        var throw_must_be_identifier = Throw.throw_must_be_identifier
        var throw_wrong_arguments    = Throw.throw_wrong_arguments


        //
        //  Implementation: Clarity version
        //
        return function Gem__Core__clarity_note(instance, who, $what) {
            //  Add a note to a variable or set of variables (clarity mode only).:

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.clarity_note', 3, arguments.length)
                }

                if (typeof who !== 'object') {
                    throw_must_be_an_object('instance', instance)
                }

                if ( ! (typeof who === 'string' && identifier_test(who))) {
                    throw_must_be_identifier('$who', who)
                }

                if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }
            }

            /*=*/ {
                //  constant instance[who + '$NOTE'] = $what
                constant_property(instance, who + '$NOTE', $what)
            }
        }
    }
)


//
//  Gem.Boot.Core.codify_bound_method:
//      Codify a global Gem bound method.
//
//      Also in clarity mode adds a `.$who`, `.$what`, and `.$which` attributes to the bound method.
//
//  NOTE:
//      A "bound method" is in some sense a "constant", thus this routine bears a lot of similiarity to
//      `Gem.Core.qualify_constant`.
//
//      The main difference is the error checking in clairty mode, to verify that it really is a "bound method".
//
Gem.Boot.Core.codify_method(
    Gem.Boot,
    'codify_bound_method',
    (
          'Codify a global Gem bound method.\n'
        + '\n'
        + 'Also in clarity mode adds a `.$who`, `.$what`, and `.$which` attributes to the bound method.'
    ),
    function codifier$Gem__Core__codify_bound_method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var _Core         = Gem._.Core
        var Configuration = Gem.Configuration
        var Core          = Gem.Boot.Core

        var clarity            = Configuration.clarity
        var constant_attribute = _Core.constant_attribute
        var constant_property  = Core.constant_property
        var define_property    = Object.defineProperty


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            //
            //  NOTE:
            //      The implementation of this method is identical to `Gem.codify_constant`.
            //
            //      (Although this method has an extra `$which` parameter, so we can't substitute
            //      `Gem.codify_constant` for this method).
            //
            return function Gem__Core__codify_bound_method(who, $what, $which, codifier) {
                //  Codify a global Gem bound method.
                //
                //  Ignores the `$what` & `$which` parameters, which are only used in clarity mode.

                /*=*/ {
                    //  constant this.*who = codifier()
                    constant_attribute(this, who, codifier())
                }
            }
        }


        //
        //  Implementation: Clarity version
        //
        var Throw = Gem.Throw

        var identifier_test          = Core.identifier_test
        var throw_must_be_a_string   = Throw.throw_must_be_a_string
        var throw_must_be_identifier = Throw.throw_must_be_identifier
        var throw_type_error         = Throw.throw_type_error
        var throw_wrong_arguments    = Throw.throw_wrong_arguments


        return function Gem__Core__codify_bound_method(who, $what, $which, codifier) {
            //  Codify a global Gem bound method.
            //
            //  Also in clarity mode adds a `.$who` and `.$what` attributes to the bound method.

            /*arguments*/ {
                if (arguments.length !== 4) {
                    throw_wrong_arguments('Gem.Boot.Core.codify_bound_method', 4, arguments.length)
                }

                if ( ! (typeof who === 'string' && identifier_test(who))) {
                    throw_must_be_identifier('$who', who)
                }

                if (typeof $what  !== 'string') { throw_must_be_a_string('$what',  $what) }
                if (typeof $which !== 'string') { throw_must_be_a_string('$which', $which) }

                /*codifier*/ {
                    var codifier_name = 'codifier$' + this.$who.replace('.', '__') + '__' + who

                    if (typeof codifier !== 'function' || codifier_name !== codifier.name) {
                        throw_type_error(
                                (
                                      'parameter `codifier` must be a function named `' + codifier_name + '`'
                                    + '; was instead'
                                ),
                                codifier//,
                            )
                    }
                }
            }

            var bound_method = codifier()

            /*verify*/ {
                if (
                       typeof bound_method === 'function'
                    && (
                              (
                                  //
                                  //  JavaScript 6.0: Bound methods begin with the the prefix "bound "
                                  //
                                  bound_method.name.startsWith('bound ')
                              )
                           || (
                                  //
                                  //  JavaScript 5.0: Bound methods have a blank name & also do not have a `prototype`
                                  //
                                  (bound_method.name.length === 0) && ( ! ('prototype' in bound_method))
                              )
                           || (
                                  //
                                  //  Our brower is so old it doesn't even have bound methods ...
                                  //      ... So accept anything (presumably an emulation function) ...
                                  //
/*FIX THIS*/                      ( ! Gem.Boot.Core.has_bind)
                              )
                       )
                ) {
                    //
                    //  ... It kind of looks like a bound method (to the best of our abilities to determine) ...
                    //      so we'll accept it ...
                    //
                    //  ... Unfortunatly there is no way to really determine if it is a bound method or not ...
                    //
                } else {
                    throw_type_error(
                            'codifier `' + codifier_name + '`' + ' must return a bound method; instead returned',
                            bound_method//,
                        )
                }
            }

            /*=*/ {
                //  constant this.*who = codifier()
                constant_attribute(this, who, codifier())
            }

            /*clarity*/ {
                constant_property.value = this.$who + '.' + who
                define_property(bound_method, '$who', constant_property)

                constant_property.value = $what
                define_property(bound_method, '$what', constant_property)

                constant_property.value = $which
                define_property(bound_method, '$which', constant_property)

                delete constant_property.value
            }
        }
    }//,
)


//
//  Gem.Boot.Core.codify_method:
//      Create the code for a method as a closure to avoid the use of any global variables.
//
//      Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
//
Gem.Boot.Core.codify_method(
    Gem.Core,
    'codify_method',
    (
          'Create the code for a method as a closure to avoid the use of any global variables.\n'
        + '\n'
        + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the function.'
    ),
    function codifier$Gem__Core__codify_method(who, $what, codifier) {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration
        var Core          = Gem.Boot.Core

        var constant_property = Core.constant_property
        var define_property   = Object.defineProperty
        var clarity           = Configuration.clarity


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            return function Gem__Core__codify_method(who, $what, codifier) {
                //  Create the code for a method as a closure to avoid the use of any global variables.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                constant_property.value = codifier()
                define_property(this, who, constant_property)
                delete constant_property.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var Throw = Gem.Throw

        var identifier_test          = Core.identifier_test
        var throw_must_be_identifier = Throw.throw_must_be_identifier
        var throw_must_be_a_string   = Throw.throw_must_be_a_string
        var throw_wrong_arguments    = Throw.throw_wrong_arguments
        var throw_type_error         = Throw.throw_type_error


        return function Gem__Core__codify_method(who, $what, codifier) {
            //  Create the code for a method as a closure to avoid the use of any global variables.
            //
            //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.codify_method', 3, arguments.length)
                }

                if ( ! (typeof who === 'string' && identifier_test(who))) {
                    throw_must_be_identifier('$who', who)
                }

                if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }

                /*codifier*/ {
                    var middle        = this.$who.replace('.', '__')
                    var codifier_name = 'codifier$' + middle + '__' + who

                    if (typeof codifier !== 'function' || codifier_name !== codifier.name) {
                        throw_type_error(
                                (
                                      'parameter `codifier` must be a function named `' + codifier_name + '`'
                                    + '; was instead'
                                ),
                                codifier//,
                            )
                    }
                }
            }

            var method      = codifier()
            var method_name = middle + '__' + who       //  `middle` is calculated above in the /*codifier*/ section

            if (typeof method !== 'function' || method_name !== method.name) {
                throw_type_error(
                        (
                              'codifier `' + codifier_name + '`'
                            + ' must return a function named `'  + method_name + '`'
                            + '; instead returned'
                        ),
                        method//,
                    )
            }

            constant_property.value = method
            define_property(this, who, constant_property)

            /*clarity*/ {
                constant_property.value = this.$who + '.' + who
                define_property(method, '$who', constant_property)

                constant_property.value = $what
                define_property(method, '$what', constant_property)
            }

            delete constant_property.value
        }
    }
)


//
//  Gem.Core.constant
//      Store a global Gem constant.
//
//      Also in clarity mode adds an explanation of what the constant does.
//
Gem.Boot.Core.codify_method(
    Gem.Core,
    'constant',
    (
          'Store a global Gem constant.\n'
        + '\n'
        + 'Also in clarity mode adds an explanation of what the variable does.'
    ),
    function codifier$Gem__Core__constant() {
        //
        //  Imports
        //
        var Gem = window.Ge

        var Configuration = Gem.Configuration
        var Core          = Gem.Boot.Core

        var constant_property = Core.constant_property
        var define_property   = Object.defineProperty
        var clarity           = Configuration.clarity


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            return function Gem__Core__constant(instanc, who, $what, constant) {
                //  Store a global Gem constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                constant_property.value = constant
                define_property(instance, who, constant_property)
                delete constant_property.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var Throw = Gem.Throw

        var identifier_test          = Core.identifier_test
        var throw_must_be_identifier = Throw.throw_must_be_identifier
        var throw_must_be_a_string   = Throw.throw_must_be_a_string
        var throw_type_error         = Throw.throw_type_error
        var throw_wrong_arguments    = Throw.throw_wrong_arguments


        //
        //  Implementation
        //
        return function Gem__Core__constant(instance, who, $what, constant) {
            //  Store a global Gem constant.
            //
            //  Also in clarity mode adds an explanation of what the constant does.

            /*arguments*/ {
                if (arguments.length !== 4) {
                    throw_wrong_arguments('Gem.Core.constant', 4, arguments.length)
                }

                if (typeof instance !== 'object') {
                    throw_must_be_an_object('instance', instance)
                }

                if ( ! (typeof who === 'string' && identifier_test(who))) {
                    throw_must_be_identifier('$who', who)
                }

                if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }

                /*constant*/ {
                    var typeof_constant = typeof constant

                    if (typeof_constant === 'undefined' || typeof_constant === 'function') {
                        throw_type_error(
                                'parameter `constant` must be a value; was instead',
                                constant//,
                            )
                    }
                }
            }

            // FIX THIS
            constant_property.value = constant
            define_property(instance, who, constant_property)

            /*clarity*/ {
                constant_property.value = $what
                define_property(instance, who + '$', constant_property)
            }

            delete constant_property.value
        }
    }//,
)


//
//  Gem.Core.codify_method
//      Store a Gem Method.
//
//      Also in clarity mode adds a `.$who` and `.$what` attributes to the method.
//
Gem.Boot.Core.codify_method(
    Gem.Core,
    'method',
    (
          'Store a Gem Method.\n'
        + '\n'
        + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the method.'
    ),
    function codifier$Gem__Core__method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Core          = Gem.Boot.Core
        var Configuration = Gem.Configuration

        var clarity           = Configuration.clarity
        var constant_property = Core.constant_property
        var define_property   = Object.defineProperty


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            var method = function Gem__Core__method(instance, who, $what, method) {
                //  Store a Gem Method.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                constant_property.value = method
                define_property(instance, who, constant_property)
                delete constant_property.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var Throw = Gem.Throw

        var identifier_test          = Core.identifier_test
        var throw_must_be_a_string   = Throw.throw_must_be_a_string
        var throw_must_be_an_object  = Throw.throw_must_be_an_object
        var throw_must_be_identifier = Core.throw_must_be_identifier
        var throw_type_error         = Throw.throw_type_error
        var throw_wrong_arguments    = Throw.throw_wrong_arguments


        return function Gem__Core__method(instance, who, $what, method) {
            //  Store a Gem Method.
            //
            //  Also in clarity mode adds a `.$who` and `.$what` attributes to the method.

            /*arguments*/ {
                if (arguments.length !== 4) {
                    throw_wrong_arguments('Gem.Boot.Core.codify_method', 4, arguments.length)
                }

                if (typeof instance !== 'object')) {
                    throw_must_be_an_object('instance', instance)
                }

                if ( ! (typeof who === 'string' && identifier_test(who))) {
                    throw_must_be_identifier('$who', who)
                }

                if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }

                /*method*/ {
                    var method_name = instance.$who.replace('.', '__') + '__' + who

                    if (typeof method !== 'function' || method_name !== method.name) {
                        throw_type_error(
                                (
                                      'parameter `method` must be a function named `' + method_name + '`'
                                    + '; was instead'
                                ),
                                method//,
                            )
                    }
                }
            }

            constant_property.value = method
            define_property(instance, who, constant_property)

            /*clarity*/ {
                constant_property.value = instance.$who + '.' + who
                define_property(method, '$who', constant_property)

                constant_property.value = $what
                define_property(method, '$what', constant_property)
            }

            delete constant_property.value
        }
    }
)


//
//  Gem.Boot.Core.mutable:
//      Initialize a global Gem mutable value.
//
//      Also in clarity mode adds an explanation of what the mutable value does.
//
Gem.Boot.Core.codify_method(
    Gem.Core,
    'mutable',
    (
          'Initialize a global Gem mutable value.\n'
        + '\n'
        + 'Also in clarity mode adds an explanation of what the value does.'
    ),
    function codifier$Gem__Core__mutable() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration
        var Core          = Gem.Boot.Core
        var Throw         = Gem.Throw

        var constant_property         = Core.constant_property
        var define_property           = Object.defineProperty
        var clarity                   = Configuration.clarity
        var visible_mutable_attribute = Core.visible_mutable_attribute


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            return function Gem__Core__mutable(who, $what, value) {
                //  Initialize a global Gem mutable value.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_mutable_attribute.value = value
                define_property(this, who, visible_mutable_attribute)
                delete visible_mutable_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var identifier_test          = Core.identifier_test
        var throw_must_be_identifier = Throw.throw_must_be_identifier
        var throw_must_be_a_string   = Throw.throw_must_be_a_string
        var throw_wrong_arguments    = Throw.throw_wrong_arguments
        var throw_type_error         = Throw.throw_type_error


        return function Gem__Core__mutable(who, $what, value) {
            //  Initialize a global Gem mutable value.
            //
            //  Also in clarity mode adds an explanation of what the mutable value does.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Boot.Core.mutable', 3, arguments.length)
                }

                if ( ! (typeof who === 'string' && identifier_test(who))) {
                    throw_must_be_identifier('$who', who)
                }

                if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }

                /*value*/ {
                    var typeof_value = typeof value

                    if (typeof_value === 'undefined' || typeof_value === 'function') {
                        throw_type_error(
                                'parameter `value` must be a value; was instead',
                                value//,
                        )
                    }
                }
            }

            visible_mutable_attribute.value = value
            define_property(this, who, visible_mutable_attribute)
            delete visible_mutable_attribute.value

            /*clarity*/ {
                constant_property.value = $what
                define_property(this, who + '$', constant_property)
                delete constant_property.value
            }
        }
    }//,
)


//
//  Gem.Core.qualify_constant
//      Qualify a global Gem constant.
//
//      The `qualifier` argument is a function that returns the value of the constant.
//
//      Also in clarity mode adds an explanation of what the variable does.
//
Gem.Boot.Core.codify_method(
    Gem.Core,
    'qualify_constant',
    (
          'Qualify a global Gem constant.\n'
        + '\n'
        + 'The `qualifier` argument is a function that returns the value of the constant.'
        + '\n'
        + 'Also in clarity mode adds an explanation of what the constant does.'
    ),
    function codifier$Gem__Core__qualify_constant() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration
        var Core          = Gem.Boot.Core
        var Throw         = Gem.Throw

        var clarity           = Configuration.clarity
        var constant_property = Core.constant_property
        var define_property   = Object.defineProperty


        //
        //  Implementation: Simple version
        //
        if ( ! clarity) {
            return function Gem__Core__qualify_constant(who, $what, qualifier) {
                //  Qualify a global Gem constant.
                //
                //  The `qualifier` argument is a function that returns the value of the constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                constant_property.value = qualifier()
                define_property(this, who, constant_property)
                delete constant_property.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_must_be_a_string = Throw.throw_must_be_a_string
        var throw_type_error       = Throw.throw_type_error
        var throw_wrong_arguments  = Throw.throw_wrong_arguments


        return function Gem__Core__qualify_constant(who, $what, qualifier) {
            //  Qualify a global Gem variable.
            //
            //  The `qualifier` argument is a function that returns the value of the constant.
            //
            //  Also in clarity mode adds an explanation of what the variable does.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.qualify_constant', 3, arguments.length)
                }

                if (typeof name  !== 'string') { throw_must_be_a_string('name',  name) }
                if (typeof $what !== 'string') { throw_must_be_a_string('$what', $what) }

                /*qualifier*/ {
                    var middle         = this.$who.replace('.', '__')
                    var qualifier_name = 'qualifier$' + middle + '__' + who

                    if (typeof qualifier !== 'function' || qualifier_name !== qualifier.name) {
                        throw_type_error(
                                (
                                      'qualifier must be a function named `' + qualifier_name + '`'
                                    + '; was instead'
                                ),
                                qualifier//,
                            )
                    }
                }
            }

            var constant = qualifier()

            /*verify*/ {
                var typeof_constant = typeof constant

                if (typeof_constant === 'undefined' || typeof_constant === 'function') {
                    throw_type_error(
                            (
                                  'qualifier `' + qualifier_name + '` did not return a constant'
                                + '; instead returned'
                            ),
                            value//,
                        )
                }
            }

            constant_property.value = constant
            define_property(this, who, constant_property)

            /*clarity*/ {
                constant_property.value = $what
                define_property(this, who + '$', constant_property)
            }

            delete constant_property.value
        }
    }
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
