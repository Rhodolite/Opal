//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//  Boot4_Methods: Boot - Phase 4 - Add Methods
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


//
//  Gem.Core.visible_mutable_attribute
//
//      A visible mutable attribute (i.e.: a normal member).
//
//      Read 'visible' to mean 'enumerable'.
//
//  NOTE:
//      Enumerable properties are shown better in Developer Tools (at the top of the list, and not grayed out),
//      for this reason `$what`, `$which`, `$who`, and '*$' are all shown as visibile instead of invisible.
//
Gem.Core.qualify_constant(
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
//  Gem.Core.clarity_note
//      Add a note to a variable or set of variables (clarity mode only).
//
Gem.Core.codify_method(
    'clarity_note',
    'Add a note to a variable or set of variables (clarity mode only).',
    function codifier$Gem__Core__clarity_note() {
        //
        //  Imports
        //
        var simple = ( ! Gem.Configuration.clarity)


        //
        //  Implementation: Simple version
        //
        if (simple) {
            return function Gem__Core__clarity_note(/*who, $what*/) {
                //  Nothing to do, not in clarity mode
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_must_be_string       = Gem.Core.throw_must_be_string
        var throw_wrong_arguments      = Gem.Core.throw_wrong_arguments
        var throw_type_error           = Gem.Core.throw_type_error
        var visible_constant_attribute = Gem.Core.visible_constant_attribute


        return function Gem__Core__clarity_note(who, $what) {
            //  Add a note to a variable or set of variables (clarity mode only)

            /*arguments*/ {
                if (arguments.length !== 2) {
                    throw_wrong_arguments('Gem.Core.clarity_note', 2, arguments.length)
                }

                if (typeof who   !== 'string') { throw_must_be_string('who',   who)   }
                if (typeof $what !== 'string') { throw_must_be_string('$what', $what) }
            }

            visible_constant_attribute.value = $what
            define_property(this, who + '$NOTE', visible_constant_attribute)
            delete visible_constant_attribute.value
        }
    }
)


//
//  Gem.Core.codify_bound_method:
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
Gem.Core.codify_method(
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
        var simple                     = ( ! Gem.Configuration.clarity)
        var define_property            = Object.defineProperty
        var visible_constant_attribute = Gem.Core.visible_constant_attribute


        //
        //  Implementation: Simple version
        //
        if (simple) {
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

                visible_constant_attribute.value = codifier()
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_must_be_string  = Gem.Core.throw_must_be_string
        var throw_wrong_arguments = Gem.Core.throw_wrong_arguments
        var throw_type_error      = Gem.Core.throw_type_error


        return function Gem__Core__codify_bound_method(who, $what, $which, codifier) {
            //  Codify a global Gem bound method.
            //
            //  Also in clarity mode adds a `.$who` and `.$what` attributes to the bound method.

            /*arguments*/ {
                if (arguments.length !== 4) {
                    throw_wrong_arguments('Gem.Core.codify_bound_method', 4, arguments.length)
                }

                if (typeof who    !== 'string') { throw_must_be_string('who',    who)   }
                if (typeof $what  !== 'string') { throw_must_be_string('$what',  $what) }
                if (typeof $which !== 'string') { throw_must_be_string('$which', $which) }

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
/*FIX THIS*/                      ( ! Gem.Core.has_bind)
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

            visible_constant_attribute.value = bound_method
            define_property(this, who, visible_constant_attribute)

            /*clarity*/ {
                visible_constant_attribute.value = this.$who + '.' + who
                define_property(bound_method, '$who', visible_constant_attribute)

                visible_constant_attribute.value = $what
                define_property(bound_method, '$what', visible_constant_attribute)

                visible_constant_attribute.value = $which
                define_property(bound_method, '$which', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }
    }//,
)


//
//  Gem.Core.codify_method:
//      Create the code for a method as a closure to avoid the use of any global variables.
//
//      Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
//
Gem.Core.codify_method(
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
        var simple                     = ( ! Gem.Configuration.clarity)
        var define_property            = Object.defineProperty
        var visible_constant_attribute = Gem.Core.visible_constant_attribute


        //
        //  Implementation: Simple version
        //
        if (simple) {
            return function Gem__Core__codify_method(who, $what, codifier) {
                //  Create the code for a method as a closure to avoid the use of any global variables.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = codifier()
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_must_be_string  = Gem.Core.throw_must_be_string
        var throw_wrong_arguments = Gem.Core.throw_wrong_arguments
        var throw_type_error      = Gem.Core.throw_type_error


        return function Gem__Core__codify_method(who, $what, codifier) {
            //  Create the code for a method as a closure to avoid the use of any global variables.
            //
            //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.codify_method', 3, arguments.length)
                }

                if (typeof who   !== 'string') { throw_must_be_string('who',   who)   }
                if (typeof $what !== 'string') { throw_must_be_string('$what', $what) }

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

            visible_constant_attribute.value = method
            define_property(this, who, visible_constant_attribute)

            /*clarity*/ {
                visible_constant_attribute.value = this.$who + '.' + who
                define_property(method, '$who', visible_constant_attribute)

                visible_constant_attribute.value = $what
                define_property(method, '$what', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }
    }
)


//
//  Gem.Core.constant
//      Store a global Gem constant.
//
//      Also in clarity mode adds an explanation of what the constant does.
//
Gem.Core.codify_method(
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
        var simple                     = ( ! Gem.Configuration.clarity)
        var define_property            = Object.defineProperty
        var visible_constant_attribute = Gem.Core.visible_constant_attribute


        //
        //  Implementation: Simple version
        //
        if (simple) {
            return function Gem__Core__constant(who, $what, constant) {
                //  Store a global Gem constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = constant
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_must_be_string  = Gem.Core.throw_must_be_string
        var throw_type_error      = Gem.Core.throw_type_error
        var throw_wrong_arguments = Gem.Core.throw_wrong_arguments


        //
        //  Implementation
        //
        return function Gem__Core__constant(who, $what, constant) {
            //  Store a global Gem constant.
            //
            //  Also in clarity mode adds an explanation of what the constant does.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.constant', 3, arguments.length)
                }

                if (typeof who   !== 'string') { throw_must_be_string('who',   who)   }
                if (typeof $what !== 'string') { throw_must_be_string('$what', $what) }

                if (typeof constant === 'undefined' || typeof constant === 'function') {
                    throw_type_error(
                            'parameter `constant` must be a value; was instead',
                            constant//,
                        )
                }
            }

            visible_constant_attribute.value = constant
            define_property(this, who, visible_constant_attribute)

            /*clarity*/ {
                visible_constant_attribute.value = $what
                define_property(this, who + '$', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }
    }//,
)


//
//  Gem.Core.method
//      Store a Gem Method.
//
//      Also in clarity mode adds a `.$who` and `.$what` attributes to the method.
//
Gem.Core.codify_method(
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
        var simple                     = ( ! Gem.Configuration.clarity)
        var define_property            = Object.defineProperty
        var visible_constant_attribute = Gem.Core.visible_constant_attribute


        //
        //  Implementation: Simple version
        //
        if (simple) {
            var method = function Gem__Core__method(who, $what, method) {
                //  Store a Gem Method.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = method
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_must_be_string  = Gem.Core.throw_must_be_string
        var throw_wrong_arguments = Gem.Core.throw_wrong_arguments
        var throw_type_error      = Gem.Core.throw_type_error


        return function Gem__Core__method(who, $what, method) {
            //  Store a Gem Method.
            //
            //  Also in clarity mode adds a `.$who` and `.$what` attributes to the method.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.method', 3, arguments.length)
                }

                if (typeof who   !== 'string') { throw_must_be_string('who',   who)   }
                if (typeof $what !== 'string') { throw_must_be_string('$what', $what) }

                /*method*/ {
                    var method_name = this.$who.replace('.', '__') + '__' + who

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

            visible_constant_attribute.value = method
            define_property(this, who, visible_constant_attribute)

            /*clarity*/ {
                visible_constant_attribute.value = this.$who + '.' + who
                define_property(method, '$who', visible_constant_attribute)

                visible_constant_attribute.value = $what
                define_property(method, '$what', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }
    }
)


//
//  Gem.Core.mutable:
//      Initialize a global Gem mutable value.
//
//      Also in clarity mode adds an explanation of what the mutable value does.
//
Gem.Core.codify_method(
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
        var define_property            = Object.defineProperty
        var simple                     = ( ! Gem.Configuration.clarity)
        var visible_constant_attribute = Gem.Core.visible_constant_attribute
        var visible_mutable_attribute  = Gem.Core.visible_mutable_attribute


        //
        //  Implementation: Simple version
        //
        if (simple) {
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
        var throw_must_be_string  = Gem.Core.throw_must_be_string
        var throw_wrong_arguments = Gem.Core.throw_wrong_arguments
        var throw_type_error      = Gem.Core.throw_type_error


        return function Gem__Core__mutable(who, $what, value) {
            //  Initialize a global Gem mutable value.
            //
            //  Also in clarity mode adds an explanation of what the mutable value does.

            /*arguments*/ {
                if (arguments.length !== 3) {
                    throw_wrong_arguments('Gem.Core.mutable', 3, arguments.length)
                }

                if (typeof who   !== 'string') { throw_must_be_string('who',   who)   }
                if (typeof $what !== 'string') { throw_must_be_string('$what', $what) }

                if (typeof value === 'undefined' || typeof value === 'function') {
                    throw_type_error(
                            'parameter `value` must be a value; was instead',
                            value//,
                        )
                }
            }

            visible_mutable_attribute.value = value
            define_property(this, who, visible_mutable_attribute)
            delete visible_mutable_attribute.value

            /*clarity*/ {
                visible_constant_attribute.value = $what
                define_property(this, who + '$', visible_constant_attribute)
                delete visible_constant_attribute.value
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
Gem.Core.codify_method(
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
        var simple                     = ( ! Gem.Configuration.clarity)
        var define_property            = Object.defineProperty
        var visible_constant_attribute = Gem.Core.visible_constant_attribute


        //
        //  Implementation: Simple version
        //
        if (simple) {
            return function Gem__Core__qualify_constant(who, $what, qualifier) {
                //  Qualify a global Gem constant.
                //
                //  The `qualifier` argument is a function that returns the value of the constant.
                //
                //  Ignores the `$what` parameter, which is only used in clarity mode.

                visible_constant_attribute.value = qualifier()
                define_property(this, who, visible_constant_attribute)
                delete visible_constant_attribute.value
            }
        }


        //
        //  Implementation: Clarity version
        //
        var throw_must_be_string  = Gem.Core.throw_must_be_string
        var throw_type_error      = Gem.Core.throw_type_error
        var throw_wrong_arguments = Gem.Core.throw_wrong_arguments


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

                if (typeof name  !== 'string') { throw_must_be_string('name',  name) }
                if (typeof $what !== 'string') { throw_must_be_string('$what', $what) }

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
                if (typeof constant === 'undefined' || typeof constant === 'function') {
                    throw_type_error(
                            (
                                  'qualifier `' + qualifier_name + '` did not return a constant'
                                + '; instead returned'
                            ),
                            value//,
                        )
                }
            }

            visible_constant_attribute.value = constant
            define_property(this, who, visible_constant_attribute)

            /*clarity*/ {
                visible_constant_attribute.value = $what
                define_property(this, who + '$', visible_constant_attribute)
            }

            delete visible_constant_attribute.value
        }
    }
)


//--------------------------------------------------------+
//  This code is formatted for clarity.                   |
//  Hence this code does not use unnecessary semicolons.  |
//  Reasoning: https://mislav.net/2010/05/semicolons/     |
//--------------------------------------------------------+


//  The full MIT License is available here: https://github.com/Rhodolite/Opal/blob/master/LICENSE
