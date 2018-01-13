//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License.
//
    var core = function() {                                 //  Core module Gem (stored in 'window.Gem')
        Gem.create_Map = create_Map
    }

///
    var find__prototype = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').get

///
    //  Apple
    var Apple


    function create_class_Apple()
    {
        var class_Apple = GemClass(
                'Example of a class named Apple',
                function Apple(name) {
                    return create_Object(class_Apple, { name : { value : name } })
                },
            )

        Apple = class_Apple.constructor

        console.log(Apple('green'))

        class Cherry extends GemClass.constructor {
            constructor(name) {
                return create_Object(Cherry.prototype, { name : { value : name } })
            }
        }

        console.log(new Cherry('red'))
    }



    var GemPrivate = GemGlobal.modules
                 || (GemGlobal.modules = new (function GemModules() {})()) //  Create a fake "GemModules" class name
    //      2.  At least one function from within 'js/plugins/Jasper.js' is required to be "live" for
    //          'js/plugins/Jasper.js' to appear under 'Sources' in Developer tools.


            var object_like_prototype = Object.create(
                null,
                {
//                  constructor : { value : Object },
//                  hasOwnProperty : { value : Object.prototype.hasOwnProperty },
//                  isPrototypeOf : { value : Object.prototype.isPrototypeOf },
//                  propertyIsEnumerable : { value : Object.prototype.propertyIsEnumerable },
//                  toLocaleString : { value : Object.prototype.toLocaleString },
//                  toString : { value : Object.prototype.toString },
//                  valueOf : { value : Object.prototype.valueOf },
//                  __defineGetter__ : { value : Object.prototype.__defineGetter__ },
//                  __defineSetter__ : { value : Object.prototype.__defineSetter__ },
//                  __lookupGetter__ : { value : Object.prototype.__lookupGetter__ },
//                  __lookupSetter__ : { value : Object.prototype.__lookupSetter__ },
                }
            )
            if (path in script_map) {
                var script = script_map[path]
                var tag    = script.tag

                if ('handle_load_error' in script) {
                    tag.removeEventListener('event', script.handle_load_error)

                    delete script.handle_load_error
                }

                tag.remove()

                delete script.tag
            } else {


//
//  Bootstrap `Gem.codify`
//      [Temporary Bootstrap] to codify code to Gem.Beryl
//
Gem.codify(
    'Gem.Beryl.codify',
    '[Temporary Bootstrap] to codify code to Gem.Beryl',
    function codifier__Gem__Beryl__codify() {
        //
        //  NOTE:
        //      Since this is temporary code, we don't need to recalculate `Beryl` and `$Beryl` when `Gem` is
        //      changed (since this code will be thrown away before `Gem` is changed).
        //
        var Beryl = Gem.Beryl

        if (Gem.Configuration.clarity) {
            var $Beryl = Gem.$.Beryl

            return function Gem__Beryl__codify(name, $what, codifier) {
                //  [Temporary Bootstrap] to codify code to `Gem.Beryl` (and an introspection to `Gem.$.Beryl`)

                Beryl[name] = codifier()
                $Beryl[name] = { $who : name, $what : $what, $code : Gem.Beryl[name] }
            }
        }

        return function Gem__Beryl__codify(name, $what, codifier) {
            //  [Temporary Bootstrap] to codify code to `Gem.Beryl`

            Beryl[name] = codifier()
        }
    }
)


//
//  Properly define `Gem.Beryl.codify` like all other functions will be defined:
//
//      One time only: Uses previously defined bootstrap version of `Gem.Beryl.codify`.
//
Gem.Beryl.codify(
    'produce_codify',
    (
          'Produce a "codify" function for a specific module'
        + '.  A "codify" function creates the code for a function or procedure'
        + ', typically as a closure to avoid the use of any global variables'
        + '.'
    ),
    function codifier__Beryl__produce_codify() {
        if (Gem.Configuration.clarity) {
            var $who    = '<closure for Gem.$.ModuleName.produce_codify>'
            var $what = (
                      'The closure for `Gem.$.ModuleName.produce_codify`'
                    + '.  Contains all closure variables *EXCEPT* `exports` & `$`'
                    + ' (`exports` & `$` are created in a different closure)'
                    + '.'
                )

            function _force_$who_and_$what_to_appear_in_the_closure() { return $who + $what }
        }


        //
        //  Imports
        //
        var create_object = Object.create


        //
        //  NOTE:
        //      There are two *different* uses of `enumerable` here.
        //
        //      Here is what `Gem.Beryl.codify.properties` will look like when used:
        //
        //          properties = {
        //              $$who  : 'Gem.Beryl.codify.properties', //  #1: `.$who__`  is *NOT* enumerable
        //              $$what : 'Property descriptor ...',     //  #1: `.$$what` is *NOT* enumerable
        //              $who : {                                //  #1: `.$who` is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //              //  enumerable : false,             //  #2. `.$who` creates a `.$who` that is NOT enumerable
        //                  value      : To-Be-Determined
        //              },
        //              $what : {                           //  #1: `.$what` is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //              //  enumerable : false,             //  #2. `.$what` creates a `.$what` that is NOT enumerable
        //                  value      : To-Be-Determined
        //              },
        //              $code : {                           //  #1: `.$code` is enumerable
        //                  $who       : 'Gem.codifiy.properties.$who',
        //                  $what      : 'Property descriptor ...',
        //              //  enumerable : false,             //  #2. `.$code` creates a `.$code` that is enumerable
        //                  value      : To-Be-Determined
        //              },
        //          }
        //
        //      Thus the attributes #1 are marked with enumerable as follows:
        //
        //          A.  *NOT* enumerable -- documentation only of `properties`, does *NOT* create attributes when
        //                                  `properties` is used to create attributes.
        //          B.  enumerable       -- create a attribute when `properties` is used to create attributes.
        //
        //      For those attributes #1 that are marked enumerable, there is a [default] #2 enumerable that means:
        //
        //          C.  The attribute that is being created, that attribute itself is *NOT* enumerable.
        //
        //  Thus `Gem.Beryl.codify.properties` has 5 members, but only 3 are enumerable:
        //
        //      Two members `.$$who` & `.$$what` are to document `Gem.Beryl.codify.properties`, and are thus
        //      *NOT* enumerable.
        //
        //      Three members `.$who`, `.$what`, and `.$code` are to be used to create other attributes, and
        //      thus are enumerable.
        //
        //      Thus when `Gem.Beryl.codify.properties` is used to add attributes to an object, it only adds the
        //      three enumerable attributes (i.e.: `.$who`, `.$what`, and `.$code`).
        //
        //      Since these three members do not each have a (nested) enumerable property
        //      (i.e.: `.$who.enumerable`, `.$what.enumerable`, and `.$code.enumerable` all default to `false`)
        //      then the attributes created when `Gem.Beryl.codify.properties` is used are all notk enumerable.
        //
        //  Thus *IF* we wanted to create an enumerable attribute (not that we do, but if we did) say called
        //  `.visible`, we would have to mark it as follows:
        //
        //      #1.  Make `.visible` (itself) enumerable, so it creates a `.visible` attribute when
        //           `Gem.Beryl.codify.properties` is used to create attributes; and
        //
        //      #2.  Make (the nested value of) `.visible.enumerable` to `true`, so it creates a enumerable
        //           `.visible` attribute
        //
        //  Finally in comments below, #1 or #2 refers to the same #1 & #2 as in this comment; i.e.:
        //
        //      #1.  Means create an attribute; and
        //      #2.  Means the attribute created will be enumerable.
        //
        function _create_non_enumerable_property_with_uninitialized_value($who) {
            return create_object(
                    null,
                    {
                        $who : {
                                value : 'Gem.Beryl.codify.properties.' + $who//,
                                //enumerable : false//, //  Only to document `properties_$*`, hence not enumerable
                            },

                        $what : {
                                value : (
                                          'Property descriptor used to initialize the `.' + $who + '`'
                                         + ' attribute of a new member of `Gem.$.ModuleName`.'
                                    )//,
                                //enumerable : false//, //  Only to document `properties_$*`, hence not enumerable
                            }//,

                        //value      : { value : uninitialized }//  `.value` is set below
                        //enumerable : { value : false }//,     //  #2: Attributes that are created will be enumerable
                    }//,
                )
        }


        var property_$who  = _create_non_enumerable_property_with_uninitialized_value('$who')
        var property_$what = _create_non_enumerable_property_with_uninitialized_value('$what')
        var property_$code = _create_non_enumerable_property_with_uninitialized_value('$code')

        var properties = create_object(
                null,
                {
                    $$who : {
                            value        : 'Gem.Beryl.codify.properties'//,
                            //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                        },

                    $$what : {
                            value : (
                                      'Property descriptors used to initialize'
                                     + ' a new member of `Gem.$.ModuleName`.'
                                )//,
                            //enumerable : false//,     //  Only to document `properties`, hence not enumerable
                        },

                    $who  : { value : property_$who,  enumerable : true },  //  #1: create a `.$who` attribute
                    $what : { value : property_$what, enumerable : true },  //  #1: create a `.$what` attribute
                    $code : { value : property_$code, enumerable : true }//,//  #1: create a `.$code` attribute
                }//,
            )


        return function Beryl__produce_codify(exports, $) {
            if (Gem.Configuration.clarity) {
                var $who  = '<closure Gem.$.ModuleName.codify>'
                var $what = (
                          'The closure for `Gem.$.ModuleName.codify`'
                        + '.  Contains `exports` which is where the code is exported to'
                        + ' (Also contains `$` which is the introspection for the module this codify function'
                        + ' is specificaly for)'
                        + '.'
                    )

                function _force_$who_and_$what_to_appear_in_the_closure() { return $who + $what }
            }


            return function Beryl__codify(name, $what, codifier) {
                //  Create the code for a function or procedure, typically as a closure to avoid the use of any global
                //  variables.

                var $code = exports[name] = codifier()

                property_$who .value = name
                property_$what.value = $what
                property_$code.value = $code

                $[name] = create_object(null, properties)

                //
                //  Delete these unused attributes, for two reasons:
                //
                //      1.  So they do not appear when introspecting in Developer Tools; AND
                //      2.  So the can be properly garbage collected if `exports[name]` is deleted.
                //
                delete property_$who .value
                delete property_$what.value
                delete property_$code.value
            }
        }
    }
)


//
//  Now run `Gem.Beryl.codify` on `Gem.Beryl.produce_codify` & `Gem.Beryl.codify`
//  (so it uses it's newly defined itself on itself).
//
if (Gem.Configuration.clarity) {
    Gem.Beryl.codify(
        Gem.$.Beryl.produce_codify.$who,
        Gem.$.Beryl.produce_codify.$what,
        function codifier__Beryl__produce_codify() {
            return Gem.$.Beryl.produce_codify.$code
        }
    )
}


Gem.Beryl.codify(
    'codify',
    (
          'Create the code for a function or procedure'
        + ', typically as a closure to avoid the use of any global variables.'
    ),
    function codifier__Beryl__codify() {
        return Gem.Beryl.produce_codify(Gem.Beryl, Gem.$.Beryl)
    }
)
        //      `Gem.Script.event_list` is deleted later in this file; so make sure to grab a copy now, so
        //      it is available, later, if `codifier__Gem__Script__load` is called a second time
            'Return `true` if a function, method, or bound method with name `name` is being traced.',
        //
        //  Imports: Other
        //
        var clarity = Gem.Configuration.clarity
        var tracing = clarity && Gem.Core.tracing('identifier_test')


//                  if (v === COLOR_PINK) {
//                      i += 1
//
//                      v = (i < argument_total && argument_list[i])
//
//                      if (typeof v !== 'string') {
//                          throw new Error(
//                                    'trace_start: programming error:'
//                                  + ': special symbol COLOR_PINK must be followed by a string'
//                              )
//                      }
//
//                      format += comma + '%c%s%c'
//                      COLOR_PINK()
//                      push_string(v)
//                      push_color_none()
//                      continue
//                  }

Gem.Core.execute(
    function execute$Gem__add_tracing() {
        var Trace   = Gem.Trace
        var Tracing = Gem.Tracing


        Gem.Core.method.call(
            Trace,
            'tracing',
            'Stub for Gem.Trace.Tracing.',
            function tracing(name) {
                return (name in Trace) && (Trace[name])
            }
        )
    }
)
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

    function codifier$trace$Gem__Core__identifier_test(Gem__Core__identifier_test) {
        var _Trace = Gem._.Trace

        var function_call   = _Trace.function_call
        var function_result = _Trace.function_result


        return function trace$Gem__Core__identifier_test(s) {
            //  Trace Gem.Core.identifier_test.

            function_call(Gem__Core__identifier_test, arguments)

            var r = Gem__Core__identifier_test(s)

            function_result(r)

            return r
        }
    }//,
        if (0 && tracing) {
            var attribute___name = create_Object(null)                                          //  3 underscores

            define_property(attribute_module, '__name__', { enumerable : true, value : attribute___name})
        }


        //
        //  Adjust keys, changing '__' to '.'
        //
        //  NOTE #1:
        //      Only if the key does not have a '$' in it, keys with '$' are left alone.
        //
        //  NOTE #2:
        //      This is done so this code can work in JavaScript 5.0, which does not allow the following syntax:
        //
        //          Tracing : {
        //              ['Gem.Core.execute'] : 7,
        //          }
        //
        //      So to be compatiable with JavaScript 5.0, we do the following instead:
        //
        //          Tracing : {
        //              Gem__Core__execute : 7//,
        //          }
        //
        //      And then convert the key 'Gem__Core__execute' to 'Gem.Core.execute'.
        //
        //  NOTE #2:
        //      Since we are deleting elements from `Tracing`, we can do a `for (k in Tracing)` as you are
        //      not allowed to delete elements inside an iteration.
        //
        //      Hence we use `get_property_names(Tracing).sort` to first get the keys, then we can copy/delete
        //      keys in the loops safetly.
        //
        var keys = get_property_names(Tracing).sort()    //  `sort` makes the for loop deterministic

        var double_underscore__pattern = new Pattern('__', 'g')



        for (var i = keys.length - 1; i >= 0; i --) {
            var k = keys[i]

            if (k.startsWith('Gem__private__')) {
                var dotted = k.replace('Gem__private__', 'Gem._.').replace('__', '.')

                Tracing[dotted] = Tracing[k]

                delete Tracing[k]
            } else if ((k.indexOf('__') !== -1) && (k.indexOf('$') === -1)) {
                var dotted = k.replace(double_underscore__pattern, '.')

                Tracing[dotted] = Tracing[k]

                delete Tracing[k]
            }
        }
        //
        //  Gem._.Core.method__common
        //      Common code to define a method.
        //
        //  NOTE:
        //      Due to the use of `Script.dynamic` this method is only valid *UNTIL* `Gem` is rewritten (in clarity
        //      mode), after which this method is invalid.
        //
        var method__common = wrap_function(
                function interim$Gem__private__Core__method__common(instance, interim, who, method) {
                    //  Common code to define a method.
                    //
                    //  NOTE:
                    //      Due to the use of `Script.dynamic` this method is only valid *UNTIL* `Gem` is rewritten
                    //      (in clarity mode), after which this method is invalid.

                    if (interim || Script.dynamic) {                            //  See NOTE above
                        //  interim constant instance.*who = method
                        interim_constant_attribute(instance, who, method)
                    } else {
                        //  constant instance.*who = method
                        constant_attribute(instance, who, method)
                    }
                },
                'Gem._.Core.method__common'//,
            )


        //
        //  Gem._.Core.method__common
        //
        traced_method(
            Gem._.Core,
            'method__common',
            'Interim common helper code to create a method.',
            method__common//,
        )


Gem.Script.dynamic = true                                   //  Allow this `<script>` to be reloaded


//
//  Gem.Boot.Core.codify_interim_method
//      Create the code for an interim method as a closure to avoid the use of any global variables.
//
//  "An iterim method" means the method may be later replaced with another method.
//
//  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
//
//  NOTE
//      This is the interim boot version of `codify_iterim_method`."
//
Gem.Boot.Core.codify_method(
    Gem.Boot.Core,
    'codify_interim_method',
    (
          'Create the code for an interim method as a closure to avoid the use of any global variables.\n'
        + '\n'
        + '"An iterim method" means the method may be later replaced with another method.\n'
        + '\n'
        + 'Also in clarity mode adds a `.$who` and `.$what` attributes to the function.'
        + '\n'
        + 'NOTE:\n'
        + "    This is the interim boot version of `codify_iterim_method`."
    ),
    function codifier$Gem__Boot__Core__codify_interim_method() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration

        var trace = Configuration.trace


        //
        //  Implementation
        //
        if ( ! trace) {
            //
            //  Imports: No tracing version
            //
            var _Boot_Core = Gem.Boot._.Core

            var method__no_trace = _Boot_Core.method__no_trace

            //
            //  Implementation: No tracing version
            //
            return function interim$Gem__Boot__Core__codify_interim_method(instance, who, $what, codifier) {
                //  Create the code for an interim method as a closure to avoid the use of any global variables.
                //
                //  "An iterim method" means the method may be later replaced with another method.
                //
                //  Also in clarity mode adds a `.$who` and `.$what` attributes to the function.
                //
                //  NOTE
                //      This is the interim boot version of `codify_iterim_method`."

                var method = codifier()

                method__no_trace(instance, true, who, $what, method)
            }
        }


        //
        //  Imports: Tracing version
        //
        var Error = window.Error

        var Boot        = Gem.Boot
        var _Boot_Trace = Boot._.Trace
        var Boot_Trace  = Boot.Trace

        var trace_call            = Boot_Trace.trace_call
        var traced_method__common = _Boot_Trace.traced_method__common
        var wrap_function         = Boot_Trace.wrap_function


        //
        //  Implementation: Tracing version
        //
        return function interim$Gem__Boot__Core__codify_interim_method(instance, who, $what, codifier) {
            //  Create the code for an interim method as a closure to avoid the use of any global variables.
            //
            //  "An iterim method" means the method may be later replaced with another method.
            //
            //  Ignores parameter `$what` since not in clarity mode.
            //
            //  NOTE
            //      This is the interim boot version of `codify_iterim_method`."

            if ( ! ('$who' in instance)) {
                throw new Error('missing $who in object')
            }

            var method         = trace_call(codifier)
            var function_name  = instance.$who + '.' + who
            var wrapped_method = wrap_function(method, function_name)

            traced_method__common(instance, true, who, $what, wrapped_method)
        }
    }
)




            //
            //  property_$who
            //      A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.
            //
            Core.constant(
                _Core,
                'property_$who
                "A property used to create a visible (i.e.: enumerable) constant `.$who` attribute.",
                property_$who//,
            )
        if (clarity || trace) {
            //
            //  property_$who = Box{ constant enumerable : true }
            //
            //      This is used to create a property:
            //
            //          1.  "permenant" (i.e.: not reconfigurable);
            //          2.  "visible" (i.e.: enumerable);
            //          3.  "constant" (i.e.: not writable);
            //          4.  with a "value" to be determined later.
            //
            var property_$who = forge_Crate(box_of_properties__enumerable_true)
        }


        //
        //  property__constant__value_true = Box{
        //      constant enumerable : true,
        //      constant value      : true,
        //  }
        //
        //      This is used to create a property:
        //
        //          1.  "permenant" (i.e.: not reconfigurable);
        //          2.  "visible" (i.e.: enumerable);
        //          3.  "constant" (i.e.: not writable);
        //          4.  with a "value" of `true`
        //
        if (clarity) {
debugger
            //
            //  Remake `property__constant__value_true` using itself.
            //
            property__constant__value_true = freeze(
                create_Object(
                    null,
                    {
                        $who : {
                            configurable : false,                               //  Default value, shown for clarity
                            enumerable   : true,
                            writable     : false,                               //  Default value, shown for clarity
                            value        : property__constant__value_true.$who//,
                        },

                        $what : {
                            configurable : false,                               //  Default value, shown for clarity
                            enumerable   : true,
                            writable     : false,                               //  Default value, shown for clarity
                            value        : property__constant__value_true.$what//,
                        },

                        configurable : property__constant__value_false,         //  Default value, shown for clarity
                        enumerable   : property__constant__value_true,
                        writable     : property__constant__value_false,         //  Default value, shown for clarity
                        value        : property__constant__value_false,
                    }//,
                )//,
            )
        } else {
            var property__constant__value_true = freeze(
                create_Object(
                    null,
                    {
                        enumerable : { enumerable: true, value : true },
                        value      : { enumerable: true, value : true }//,
                    }//,
                )//,
            )
        }


            var property_$what = forge_Crate(
                {
                    $who : {
                        configurable : false,
                        enumerable   : true,
                        writable     : false,
                        value        : 'Gem.Box.property_$what',
                    },

                    $what : {
                        configurable : false,
                        enumerable   : true,
                        writable     : false,
                        value        : "`Gem.Box.property_$what` is used to create a `.$what` attribute",
                    },

                    configurable : property__constant__value_false,     //  Default value, shown for clarity
                    enumerable   : property__constant__value_true,
                    writable     : property__constant__value_false,     //  Default value, shown for clarity
                    value        : property__mutable__value_undefined//,
                }//,
            )

            /*property_$who*/ {
                property_$what.value = "`Gem.Box.property_$who` is used to create a `.$who` attribute"

                var property_$who = forge_Crate(
                    {
                        $who : {
                            configurable : false,
                            enumerable   : true,
                            writable     : false,
                            value        : 'Gem.Box.property_$who',
                        },

                        $what        : property_$what,
                        configurable : property__constant__value_false,     //  Default value, shown for clarity
                        enumerable   : property__constant__value_true,
                        writable     : property__constant__value_false,     //  Default value, shown for clarity
                        value        : property__mutable__value_undefined//,
                    }//,
                )

                property_$what.value = undefined
            }


            //
            //  NOTE:
            //      `.$$who` and `.$what` are invisible:
            //
            //          They are used to document `box_of_properties__enumerable_true`:
            //
            //          They are *NOT USED TO CREATE* attributes when `box_of_properties__enumerable_true` is used to
            //          create attributes.
            //
            //      `.$who` and `.$what` are visible:
            //
            //          They are used to CREATE `.$who` and `.$what` when `box_of_properties__enumerable_true` is used
            //          to create attributes.
            //
            var box_of_properties__enumerable_true = freeze(
                create_Object(
                    null,
                    {
                        $$who : {
                            configurable : false,                               //  Default value, shown for clarity
                            enumerable   : false,   //  Must be *INVISIBLE*     //  Default value, shown for clarity
                            writable     : false,                               //  Default value, shown for clarity
                            value        : 'Gem.Box.box_of_properties__enumerable_true'//,
                        },

                        $$what : {
                            configurable : false,                               //  Default value, shown for clarity
                            enumerable   : false,   //  Must be *INVISIBLE*     //  Default value, shown for clarity
                            writable     : false,                               //  Default value, shown for clarity
                            value        : 'A box of properties to create an enumerable attribute.'
                        },

                        $who : {
                            configurable : false,                               //  Default value, shown for clarity 
                            enumerable   : true,
                            writable     : true,
                            value        : property_$who//,
                        },

                        $what : {
                            configurable : false,                               //  Default value, shown for clarity 
                            enumerable   : true,
                            writable     : true,
                            value        : property_$what//,
                        },

                        configurable : {
                            configurable : false,                               //  Default value, shown for clarity 
                            enumerable   : true,
                            writable     : false,                               //  Default value, shown for clarity
                            value        : property__constant__value_false//,
                        },

                        enumerable : {
                            configurable : false,                               //  Default value, shown for clarity 
                            enumerable   : true,
                            writable     : false,                               //  Default value, shown for clarity
                            value        : property__constant__value_true//,
                        },

                        writable : {
                            configurable : false,                               //  Default value, shown for clarity 
                            enumerable   : true,
                            writable     : false,                               //  Default value, shown for clarity
                            value        : property__constant__value_false//,
                        },

                        value : {
                            configurable : false,                               //  Default value, shown for clarity 
                            enumerable   : true,
                            writable     : true,
                            value        : property__mutable__value_undefined//,
                        }//,
                    }//,
                )//,
            )
        //
        //  This is named `forge_Crate` instead of the `create_Crate` since `create_Crate` is too confusing:
        //
        //      So in this unique case we use the "forge" verb instead of the "create" verb for clarity.
        //

        /*forge_Crate*/ {
            var forge_Crate__$who = 'Gem.Box.forge_Crate'


            if (trace) {
                if ( ! (forge_Crate__$who in Tracing)) {
                    Tracing[forge_Crate__$who] = 0
                }

                var forge_Crate = function forge_Crate(properties) {
                    var trace        = Configuration.trace             //  Get newest value of 'trace'
                    var tracing_self = (trace === 7 || (trace && Tracing[forge_Crate__$who]))

                    if (tracing_self) {
                        function_call(forge_Crate, properties)

                        var result = seal(create_Object(null, properties))

                        function_result(result)

                        return result
                    }

                    return seal(create_Object(null, properties))
                }

                /*=*/ {
                    //  TEMPORARY as "iterim mutable": Changed below to "constant" when `cocoon` is called

                    //  interim mutable forge_Crate.$trace = forge_Crate
                    //  interim mutable forge_Crate.$who   = forge_Crate__$who
                    forge_Crate.$trace = forge_Crate
                    forge_Crate.$who   = forge_Crate__$who
                }
            } else {
                var forge_Crate = function forge_Crate(properties) {
                    return seal(create_Object(null, properties))
                }
            }
        }


        //
        //  box_of_properties__enumerable_true = Box{
        //
        //      This box of properties is used to create two properties:
        //
        //          A. property "enumerable" as follows:
        //
        //              1.  "permenant" (i.e.: not reconfigurable);
        //              2.  "visible" (i.e.: enumerable);
        //              3.  "constant" (i.e.: not writable)
        //              4.  With a value of `true`.
        //
        //          B. property "value" as follows:
        //
        //              1.  "permenant" (i.e.: not reconfigurable);
        //              2.  "visible" (i.e.: enumerable);
        //              3.  "mutable" (i.e.: writable)
        //              4.  With a value of `undefined`.
        //
        //              The `undefined` value is changed later (which is why it is mutable).
        //
        //
        //  NOTE:
        //      `.$$who` and `.$what` are invisible:
        //
        //          They are used to document `box_of_properties__enumerable_true`:
        //
        //          They are *NOT USED TO CREATE* attributes when `box_of_properties__enumerable_true` is used to
        //          create attributes.
        //
        //      `.$who` and `.$what` are visible:
        //
        //          They are used to CREATE `.$who` and `.$what` when `box_of_properties__enumerable_true` is used
        //          to create attributes.
        //
        var box_of_properties__enumerable_true = {
            $who         : property_$who,
            $who         : property_$what,
            configurable : property__constant__value_false,                 //  Default value, shown for clarity 
            enumerable   : property__constant__value_true,
            writable     : property__constant__value_false,                 //  Default value, shown for clarity 
            value        : property__mutable__value_undefined//,
        }


            //
            //  *INITIAL* values of:
            //
            //      1.  `property__constant__value_false`
            //      2.  `property__constant__value_false`
            //      3.  `property_$who`
            //      3.  `property_$what`
            //
            //  Changed later to be Boxes, Crates & IceCubes.
            //
            var property__constant__value_false = {
                $who         : 'Gem.Box.property__constant__value_false',
                $what        : "A property to create a \"permenant visible constant\" attribute with value `false`.",
                configurable : false,                               //  Default value, shown for clarity
                enumerable   : true,
                writable     : false,                               //  Default value, shown for clarity
                value        : false,
            }

            var property__constant__value_true = {
                $who         : 'Gem.Box.property__constant__value_true',
                $what        : "A property to create a \"permenant visible constant\" attribute with value `true`.",
                configurable : false,                               //  Default value, shown for clarity
                enumerable   : true,
                writable     : false,                               //  Default value, shown for clarity
                value        : true,
            }

            //
            //  property__mutable__value_undefined
            //
            //      This is used to create a property:
            //
            //          1.  "permenant" (i.e.: not reconfigurable);
            //          2.  "visible" (i.e.: enumerable);
            //          3.  "mutable" (i.e.: writable);
            //          4.  with a "value" of `undefined`
            //
            //      The `undefined` value is changed later (which is why it is mutable).
            //
            var property__mutable__value_undefined = {
                $who : 'Gem.Box.property__mutable__value_undefined',

                $what : (
                       "`Gem.Box.property__mutable__value_undefined`"
                    + "is used to create a mutable property with an initial `undefined` value."
                ),

                configurable : false,                               //  Default value, shown for clarity
                enumerable   : true,
                writable     : false,                               //  Default value, shown for clarity
                value        : undefined//,
            }

//                  if (typeof instance !== 'object' && typeof instance !== 'function') {
//                      debugger
//                  }

        //
        //  method__no_trace
        //      Common code to define a method with no tracing.
        //
        var method__no_trace = wrap_function(
            function Gem__private__Core__method__no_trace(instance, interim, who, $what, method) {
                //  Common code to define a method with no tracing.

                if ('$trace' in method) {
                    throw new Error('method_no_trace: function "' + method.name + '" has a `.$trace` attribute')
                }

                if (clarity) {
                    if ( ! ('$who' in instance)) {
                        throw new Error('method_no_trace: missing $who in object')
                    }

                    var function_name = instance.$who + '.' + who

                    /*=*/ {
                        //  constant method.$who  = function_name
                        //  constant method.$what = $what
                        constant_$who_$what_attributes(method, function_name, $what)
                    }
                }

                if (interim) {
                    //  interim constant instance.*who = method
                    interim_constant_attribute(instance, who, method)
                } else {
                    //  constant instance.*who = method
                    constant_attribute(instance, who, method)
                }
            },
            'Gem.Boot._.Core.method__no_trace'//,
        )
        //
        //  Stubs:
        //      See "Gem/Beryl/Boot6_Methods.js" for full implementation
        //
        //  NOTE:
        //      These stubs are ~100 lines long ...
        //
        //      ... With full error handling, in clarity mode, they are ~600 lines long (plus another ~200 lines
        //          of extra error handling code) in "Gem/Beryl/Boot6_Methods.js ...
        //
        //      ... Thus, the full implementation, was moved to a separate file, for readability ...
        //
        //      ... Even though unforunatly this:
        //
        //              1.  *BAD*   Violates the DRY principle ("Do not Repeat Yourself); AND
        //
        //              2.  *BAD*   This is the WET coding pratice ("Write Everything Twice") ...
        //
        //      ... In this special case, as boot code, it was decided to do this both for initial readability and
        //          to shorten the boot code in thie file ...
        //
        //      The reason the code split up is "initially more readabile" is the other way (all the code here) is
        //      a lot of contortions have to be done to define the procedures in the "proper order", and it's hard
        //      to follow so much contorted code ...
        //
        //      (Was not an easy choice to create the stubs, hopefully was the right one).
        //
//
//  At this point, as part of the boot process, `Gem` is now defined as in the original comment above:
//
//      With the exception of:
//
//          `Gem.Configuration.show_alert`  (which has been deleted); and
//          `Gem.Script.event_list`         (which has been deleted).
//


