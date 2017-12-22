//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Beryl: Boot Engine, Reliable Yet Limber
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.NodeWebKit.show_developer_tools()


if ('bind' in Function) {
    Gem.codify(
        //
        //  Modern Browser implementation using `Function.prototype.bind`
        //
        function codifier__Gem__Beryl__bind() {
            //
            //  By using `.call.bind` we use the `.call` function to convert the first argument passed to it,
            //  to the `this` argument of `Array.prototype.slice`:
            //
            //      In other words `.slice_call(arguments, 2)` becomes `Array.prototype.slice.call(arguments, 2)`
            //
            //  This suggestion came from:
            //      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
            //
            var call_slice = Array.prototype.slice.call.bind(Array.prototype.slice)

            return function Gem__Beryl__bind(bound_f, bound_this /*, ...*/) {
                if (arguments.length === 2) {
                    return bound_f.bind(bound_this)
                }

                return bound_f.bind.apply(bound_this, call_slice(arguments, 2))
            }
        }
    )
} else {
    Gem.codify(
        //
        //  Backwards compatiable implementation emulating `Function.prototype.bind`
        //
        function codifier__Gem__Beryl__bind() {
            //
            //  NOTE #1:
            //      The use of 'slice' is as recommended at:
            //          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
            //
            //      Since `arguments` may be implemented as a "fake Array" (for JavaScript optimizations), then the
            //      use of `slice.call(arguments)` converts the [possible] "fake Array" to a real `Array`.
            //
            //      Without this, there is at least a theoretical possiblity, that some JavaScript implemention
            //      would reject passing the "fake Array" to `.apply`, or `.concat` (as is done below).
            //
            //  NOTE #2:
            //      Although the use of `slice.call` may be slightly inefficient, this is irrelevant, as this is for
            //      a backwards compatiable implementation.
            //
            //      Any modern browser, would not be using this code anyway, but the real implementation above with
            //      `Function.prototype.bind`.
            //
            var slice = Array.prototype.slice


            return function Gem__Beryl__bind(bound_f, bound_this /*, ...*/) {
                if (arguments.length === 2) {
                    //
                    //  No extra arguments passed in, the simple version ...
                    //
                    return function an_emulation_of_function_binding_for_ancient_browsers(/*...*/) {
                        //  An enumulation of a bound function to [closure arguments] `bound_f` & `bound_this`.

                        if (arguments.length === 0) {
                            //
                            //  No extra arguments (second level) passed in, so a super simple `.call` ...
                            //
                            return bound_f.call(bound_this)
                        }

                        //
                        //  Extra arguments (second level) passed in, so use `.apply` (on the second level arguments)
                        //  ...
                        //
                        return bound_f.apply(bound_this, slice.call(arguments))
                    }
                }


                //
                //  Extra arguments passed in, the more complicated version ...
                //
                var bound_arguments = slice.call(arguments, 2)


                return function an_emulation_of_function_binding_for_ancient_browsers(/*...*/) {
                    //  An enumulation of a bound function to [closure arguments] `bound_f`, `bound_this`,
                    //  and `bound_arguments`.

                    if (arguments.length === 0) {
                        //
                        //  No extra arguments (second level) passed in, so use `.apply` (of the extra
                        //  arguments from the first level)
                        //
                        return bound_f.apply(bound_this, bound_arguments)
                    }

                    //
                    //  Extra arguments passed in (second level), so use `.concat` on both the first & second level
                    //  arguments to create a concatanated array of both set's of arguments, then pass this to
                    //  `.apply`.
                    //
                    return bound_f.apply(bound_this, bound_arguments.concat(slice.call(arguments)))
                }
            }
        }
    )
}


if ('bind' in Function) {
    Gem.execute(
        function execute__codify__Gem__Beryl__bind_create_Object() {
            //
            //  Imports
            //
            var create_Object = Object.create

            //
            //  NOTE #1:
            //      So the following is probably confusing ...
            //
            //          It means the same as the two alternate implementations below.
            //
            //      In other words we bind 'create_Object.bind', to create a bound function, with the same behavior as
            //      the alternate implementation below (the bound function created, is itsef a binding function):
            //
            //          Hence the use of `.bind.bind` in the next statement.
            //
            Gem.Beryl.bind_create_Object = create_Object.bind.bind(create_Object, Object)
        }
    )
} else if (7) {                                             //  `if (7)` means use this implementation ...
    Gem.codify(
        function codifier__Gem__Beryl__bind_create_Object() {
            return function Gem__Beryl__bind_create_Object(prototype, /*optional*/ properties) {
                //  Return a bound version of `Object.create`.
                //
                //  In the bound function, the `prototype` parameter is passed as the first parameter to
                //  `Object.create`.
                //
                //  Also, optionally, in the bound function, the `properties` parameter is passed as the second
                //  parameter to `Object.create`

                if (arguments.length === 1) {
                    //
                    //  `properties` argument not passed in; hence accept a *NEW* `properties` arguments to
                    //  `bound_create_Object`
                    //
                    return function bound_create_Object(properties) {
                        return Object.create(prototype, properties)
                    }
                }

                //
                //  `properties` argument passed in; hence use the already passed in `properties` arguments to
                //  `Gem.Beryl.bind_create_Object`
                //
                return function bound_create_Object() {
                    return Object.create(prototype, properties)
                }
            }
        }
    )
} else {
    //
    //  This "Pure" implementation NOT used on purpose.  Only here for reference -- to understand other versions.
    //
    Gem.execute(
        function execute__codify__Gem__Beryl__bind_create_Object() {
            //
            //  "Pure" implementation -- does work, but way harder to understand
            //
            var create_Object = Object.create
            var bind          = Gem.Beryl.bind

            //
            //  Hmm, so there are five bind's here ...
            //      
            //      ... which is correct ... As the comment about states "but way harder to understand" ...
            //
            //      The first bind, is to call the function `bind`.
            //
            //      The second bind is the `bound_f` (i.e.: the function to bind; i.e.: `bind`)
            //
            //      The third bind is the `bound_this` of `bound_f` (i.e.: the function to bind; i.e.: `bind`)
            //
            //      The fourth bind is the `bound_f` of the nested bind function being called.
            //
            //      The fifth bind is the `bound_this` of `bound_f` of the nested bind function being called.
            //
            //      After that follow the third & fourth argument of the nested bind function being called
            //      (i.e.: `create_Object` & `Object`).
            //
            Gem.Beryl.bind_create_Object = bind(bind, bind, bind, bind, create_Object, Object)
        }
    )
}


Gem.execute(
    function execute__codify__Gem__Beryl__create_BoxOfPropertyDescriptors() {
        //
        //  Imports
        //
        var create_Object      = Object.create
        var bind_create_Object = Gem.Beryl.bind_create_Object


        if (Gem.Configuration.clarity && Gem.Configuration.box_name) {
            //
            //  Locals
            //
            function BoxOfPropertyDescriptors() {
                //  An unused fake "constructor" function named 'BoxOfPropertyDescriptors' so that Developer Tools
                //  shows the "class name" of an instance (using this in it's next segment) as
                //  'BoxOfPropertyDescriptors'
            }


            //
            //  NOTE #2:
            //      It is quite confusing in Javascript, but a function has two "prototype's":
            //
            //          1.  It's prototype (i.e.: `__proto__`) which is the type of the function, this
            //              typically has the value of `Function.prototype`.
            //
            //          2.  It's `.prototype` member which is the type of the class it creates when used
            //              as a class "constructor".
            //
            //      In the code below, Box's `.prototype` member (#2) is set to null.
            //
            BoxOfPropertyDescriptors.prototype  = null


            var next_segment__BoxOfPropertyDescriptors = create_Object(
                    null, 
                    { constructor : { value : BoxOfPropertyDescriptors, enumerable : true } }//,
                )
        } else {
            var next_segment__BoxOfPropertyDescriptors = null
        }

        Gem.Beryl.create__BoxOfPropertyDescriptors = bind_create_Object(next_segment__BoxOfPropertyDescriptors)
    }
)


if (Gem.Configuration.clarity && Gem.Configuration.box_name) {
    Gem.codify(
        function codifier__Gem__Beryl__produce_create_Box() {
            //
            //  Imports
            //
            var bind_create_Object = Gem.Beryl.bind_create_Object

            //
            //  Locals
            //
            var property__constructor = { enumerable  : true }

            var property_descriptors = Gem.Beryl.create__BoxOfPropertyDescriptors(
                    { constructor : { value : property__constructor, enumerable : true } }//,
                )

            var create_AnonymousBox_using_property_descriptors = bind_create_Object(null, property_descriptors)


            return function Gem__Beryl__produce_create_Box(named_constructor) {
                //  Produce a create function to create Objects with `named_constructor` as their constructor
                //  which gives them the "class name" of `named_constructor` in Developer Tools (for clarity)

            
                //
                //  NOTE #2:
                //      It is quite confusing in Javascript, but a function has two "prototype's":
                //
                //          1.  It's prototype (i.e.: `__proto__`) which is the type of the function, this
                //              typically has the value of `Function.prototype`.
                //
                //          2.  It's `.prototype` member which is the type of the class it creates when used
                //              as a class "constructor".
                //
                //      In the code below, Box's `.prototype` member (#2) is set to null.
                //
                named_constructor.prototype  = null
                property__constructor.value = named_constructor

                var prototype_with__named_constructor = create_AnonymousBox_using_property_descriptors()

                delete property__constructor.value

                return bind_create_Object(prototype_with__named_constructor)
            }
        }
    )
} else {
    Gem.Codify(
        function codifier__Gem__Beryl__produce_create_Box() {
            var create_AnonymousBox = bind_create_Object(null)

            return function Gem__Beryl__produce_create_Box(/*fake_constructor*/) {
                //  Produce a create function to create anonymous boxes.
                //  The 'fake_constuctor' argument is ignored, as it is only used when creating named Boxes.

                return create_AnonymousBox
            }
        }
    )
}


Gem.execute(
    function execute__codify__Gem__Beryl__create_Box() {
        function Box() {
            //  An unused fake "constructor" function named 'Box' so that Developer Tools shows the "class name"
            //  of an instance using this prototype as 'Box'
        }

        Gem.Beryl.create_Box = Gem.Beryl.produce_create_Box(Box)
    }
)


//
//  In Gem "clarity" mode, *every* object created has a `.$who` and `.$what` member to help introspect the object
//  in developer tools:
//
//      This makes it a lot clearer what the object is used for.
//
//      All "clarity" objects begin with `$` (see below for an exeption, when instead `.$$who`
//      or `.$$what` is used to avoid conflicts).  //
//      Also each module appears in `Gem.$.ModuleName`, with each member of that module having a
//      `.$who` & `.$what` members.
//
//      By *every* object this includes all closure objects that are used.  This make it very easy to examine
//      the `.[[Scopes]]` member of a function and introspect the value of each of it's closure objects.
//
//      When an object uses `.$who` or `.$what` members for it's own purposes, then the extra members created
//      are named `.$$who` and `.$$what` to avoid conflicts.
//
if (Gem.Configuration.clarity) {
    Gem.execute(
        function execute__Gem__add_clarity() {
            var create_Box = Gem.Beryl.create_Box

            Gem.$who  = 'Gem'                                       //  Name of this variable.
            Gem.$what = 'The only global variable used by Gem.'     //  What `Gem` is used for.

            if ( ! ('$' in Gem)) {
                Gem.$ = create_Box({                                //  Map of introspection of all the Gem modules
                    $who  : { value : 'Gem.$' },
                    $what : { value : 'Map of introspection of all the Gem modules.' },
                    Beryl : {
                        value : create_Box({
                            $who  : { value : 'Gem.$.Beryl' },
                            $what : { value : 'An introspection of the Beryl module.' }//,
                        })//,
                    }//,
                })
            }

            Gem.Beryl.$who  = 'Gem.Beryl'
            Gem.Beryl.$what = 'Exports of the Beryl module.'

            Gem.Configuration.$who  = 'Gem.Configuration'
            Gem.Configuration.$what = 'Gem Configuration values'

            Gem.NodeWebKit.$who  = 'Gem.NodeWebKit'
            Gem.NodeWebKit.$what = 'Node WebKit members & methods'

            Gem.Script.$who  = 'Gem.Script'
            Gem.Script.$what = '`<script>` handling'

            Gem.Script.script_map.$who  = 'Gem.Script.script_map'
            Gem.Script.script_map.$what = 'Map of all the scripts loaded (or loading).'

            Gem.Source.$who  = 'Gem.Source'
            Gem.Source.$what = 'A map, for each `<script>` tag, a function from the source file to "hold onto"'
                             + ' to avoid garbage collection of all functions from that source file,'
                             + ' which causes the source file to disappear from the "Sources" tab of Developer Tools'

            Gem._.$who  = 'Gem._'
            Gem._.$what = 'Private members & methods of all Gem modules.'

            Gem._.Beryl.$who  = 'Gem._.Beryl'
            Gem._.Beryl.$what = 'Private members & methods of the Beryl module.'
        }
    )
}


//
//  Bootstrap `Gem.codify`
//      [Temporary Bootstrap] to codify code to Gem.Beryl
//
Gem.codify(
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
//  Properly define `Gem.codify` like all other functions will be defined:
//
//      One time only: Uses previously defined bootstrap version of `Gem.codify`.
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
        //      Here is what `Gem.codify.properties` will look like when used:
        //
        //          properties = {
        //              $$who  : 'Gem.codify.properties',   //  #1: `.$who__`  is *NOT* enumerable
        //              $$what : 'Property ...'             //  #1: `.$$what` is *NOT* enumerable
        //              $who : {                            //  #1: `.$who` is enumerable
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
        //  Thus `Gem.codify.properties` has 5 members, but only 3 are enumerable:
        //
        //      Two members `.$$who` & `.$$what` are to document `Gem.codify.properties`, and are thus
        //      *NOT* enumerable.
        //
        //      Three members `.$who`, `.$what`, and `.$code` are to be used to create other attributes, and
        //      thus are enumerable.
        //
        //      Thus when `Gem.codify.properties` is used to add attributes to an object, it only adds the
        //      three enumerable attributes (i.e.: `.$who`, `.$what`, and `.$code`).
        //
        //      Since these three members do not each have a (nested) enumerable property
        //      (i.e.: `.$who.enumerable`, `.$what.enumerable`, and `.$code.enumerable` all default to `false`)
        //      then the attributes created when `Gem.codify.properties` is used are all notk enumerable.
        //
        //  Thus *IF* we wanted to create an enumerable attribute (not that we do, but if we did) say called
        //  `.visible`, we would have to mark it as follows:
        //
        //      #1.  Make `.visible` (itself) enumerable, so it creates a `.visible` attribute when
        //           `Gem.codify.properties` is used to create attributes; and
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
                                value : 'Gem.codify.properties.' + $who//,
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
                            value        : 'Gem.codify.properties'//,
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


Gem.Beryl.codify(
    'deep_copy_without_object_prototypes',
    (
          "Create a deep copy of an object -- removing all it's prototypes that are Object.prototype"
        + '; This makes it easier to examine the object in Developer Tools with less "junk"'
    ),
    function codifier__Gem__Beryl__deep_copy_without_object_prototypes() {
        //  Create a deep copy of an object -- removing all it's prototypes that are Object.prototype;
        //  This makes it easier to examine the object in Developer Tools with less "junk"'
        //
        //  NOTE:
        //      Prototype's other than Object.prototype are not removed, as they are meaningful & neccessary.
        //
        //      For example `Gem.Script.script_map['Gem/Beryl/Boot.js']` has a prototype of `HTMLScriptELement`,
        //      this prototype is meaningful & necessary, and therefore is not removed.

        var create_Box               = Gem.Beryl.create_Box
        var object__prototype        = Object.prototype
        var enumerable_keys          = Object.keys
        var get_property_descriptors = Object.getOwnPropertyDescriptors
        var get_prototype_of         = Object.getPrototypeOf


        var deep_copy_without_object_prototypes = function Gem__Beryl__deep_copy_without_object_prototypes(instance) {
            var properties = get_property_descriptors(instance)
            var keys       = enumerable_keys(properties).sort()     //  `sort` makes the deep copy deterministic

            for (var i = 0; i < keys.length; i ++) {
                var k = keys[i]
                var v = properties[k]

                if ('value' in v) {
                    var value = v.value

                    if (typeof value === 'object' && get_prototype_of(value) === object__prototype) {
                        v.value = deep_copy_without_object_prototypes(value)
                    }
                }
            }

            return create_Box(properties)
        }


        return deep_copy_without_object_prototypes
    }
)


if (Gem.Configuration.clarity) {
    Gem.execute(
        function execute__deep_copy__Gem__without_object_prototypes() {
            window.Gem = Gem.Beryl.deep_copy_without_object_prototypes(Gem)

            //
            //  Now do callback's informing them that `Gem` has changed
            //
            var clarity_mode__gem_changed = Gem._.Beryl.clarity_mode__gem_changed

            for (var i = 0; i < clarity_mode__gem_changed.length; i ++) {
                var callback = clarity_mode__gem_changed[i]

                callback()
            }
        }
    )
}


Gem.execute(
    function execute__Gem__clear__and__log_Gem() {
        console.clear()
        console.log('%o', Gem)
    }
)
