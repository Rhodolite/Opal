//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Beryl: Boot Engine, Reliable Yet Limber
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.mutable(
    'single_step_binding',
    (
          '`Gem.Boot.Core.trace_binding` can be set to true, to single step in Developer Tools'
        + ' the backwards compatability implementation when `.bind` does not exist in the browser.'
    ),
    //
    //  WARNING: Changing the following to `true` or `6` ... might, temporarily, turn your mind into a PRETZEL.
    //
    //      `true` means use real     Gem.Boot.Core.bind & single step through it
    //      `6`    means use EMULATED Gem.Boot.Core.bind & single step through it
    //
    false//,                                        //  Change to `true` or `6` to single step in Developer Tools ...
)


Gem.Core.constant(
    Gem.Core,
    'has_bind',
    '`Gem.Boot.Core.has_bind` is `true` when `Function.prototype.bind` exists (which it does in all modern browsers).',
    ('bind' in Function) && (Gem.Boot.Core.single_step_binding !== 6)//,
)


//
//  Gem.Boot.Core.bind
//      Create a new function with a bound `this` value (and optionally other bound arguments).
//
if (Gem.Boot.Core.has_bind) {
    //
    //  Modern Browser implementation using `Function.prototype.bind`
    //
    //  NOTE #1:
    //      This version of `Gem.Boot.Core.bind` method *IS* correct & really does work ...
    //
    //      ... However, it is really confusing to understand and use it, especially when doing stack traces in
    //          Developer tools ...
    //
    //      ... It is even more confusing, when trying to understand (below) "a factory of factories" which would
    //          use this procedure, recursivly, on itself ...
    //
    //      ... Hence, for ease of understanding [the code & tracing it in developer tools], we usually call
    //          the normal `Function.prototype.bind` method directly instead of calling this method ...
    //
    //  NOTE #2:
    //      ... If you really want to see how this procedure works ...
    //
    //      ... You can enable the `Gem.Boot.Core.single_step_binding` to enable this function to be called ...
    //
    //      ... Otherwise, it is too confusing to use this method & is not actually used ...
    //
    if (Gem.Boot.Core.single_step_binding) {
        Gem.Boot.Core.codify_method(
            Gem.Core,
            'bind',
            'Create a new function with a bound `this` value (and optionally other bound arguments).`',
            function codifier$Gem__Core__bind() {
                //
                //  By using `.call.bind` we use the `.call` function to convert the first argument passed to it,
                //  to the `this` argument of `Array.prototype.slice`:
                //
                //      In other words `.slice_call(arguments, 2)` becomes `Array.prototype.slice.call(arguments, 2)`
                //
                //  This suggestion came from:
                //      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
                //
                var slice_call = Array.prototype.slice.call.bind(Array.prototype.slice)

                return function Gem__Core__bind(bound_f, bound_this /*, ...*/) {
                    if (arguments.length === 2) {
                        return bound_f.bind(bound_this)
                    }

                    return bound_f.bind.apply(bound_this, slice_call(arguments, 2))
                }
            }
        )
    }
} else {
    Gem.Boot.Core.codify_method(
        Gem.Core,
        'bind',
        'Create a new function with a bound `this` value (and optionally other bound arguments).`',
        //
        //  Backwards compatiable implementation emulating `Function.prototype.bind`
        //
        function codifier$Gem__Core__bind() {
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
            //      [Obviously we do not use `slice_call` as above, as in with this ancient brower we do not
            //      have `.bind` functionality to implement `slice_call`].
            //
            //  NOTE #2:
            //      Although the use of `slice.call` may be slightly inefficient, this is irrelevant, as this is for
            //      a backwards compatiable implementation.
            //
            //      Any modern browser, would not be using this code anyway, but the real implementation above with
            //      `Function.prototype.bind`.
            //
            var slice = Array.prototype.slice


            return function Gem__Core__bind(bound_f, bound_this /*, ...*/) {
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


//
//  Gem.Boot.Core.bind_create_Object
//      A factory of factories.  The created factories create objects.
//
//  Overview:
//      Factories are superior to `new`, as they are easier to refactor.
//
//      It takes a while to understand factories.
//
//      The concept of a "factory of factories" is a little harder to understand, but becomes clearer over time.
//
//  Summary:
//      A factory of factories.
//
//      The factories returned by `bind_create_Object` are named "create_*" (since they are factories, and factories,
//      in general, begin with a "creation" verb like "create" and end with the name of what they create).
//
//  Details:
//      Returns a bound create_Object (i.e.: a callable verion of `create_Object` with some of it's parameters bound).
//
//      In other words, `bind_create_Object` bind's some paramters to `create_object` and returns a callable function.
//
//      Since `create_object` is a factory then `bind_create_object` returns a factory with some of it's parameters
//      bound.
//
//      Two examples (from below):
//
//          1.  `var create_AnonymousBox = bind_create_Object(null)`
//
//                  Binds `null` as the first paramater to `create_Object`.
//
//                  Thus this returns a factory that creates "AnonymousBox" objects
//
//                  This factory, is thus, appropriatly named "create_AnonymousBox".
//
//          2.  `.create__BoxOfPropertyDescriptors = bind_create_Object(next_segment__BoxOfPropertyDescriptors)`
//
//                  Binds `next_segment__BoxOfPropertyDescriptors` as the first parameter to `create_Object`.
//
//                  Thus this returns a factory that creates "BoxOfPrototypeDescriptors" objects.
//
//                  This factory, is thus, appropriatly named "create__BoxOfPropertyDescriptors".
//
if (Gem.Boot.Core.has_bind) {
    Gem.Boot.Core.codify_bound_method(
        'bind_create_Object',
        'A factory of factories.  The created factories create objects.',
        'A binding of `Function.prototype.bind` to `Function.prototype.bind` (i.e.: a binding of `bind` to `bind).',
        function codifier$Gem__Core__bind_create_Object() {
            //
            //  Imports
            //
            var create_Object       = Object.create
            var single_step_binding = Gem.Boot.Core.single_step_binding

            if ( ! Gem.Boot.Core.single_step_binding) {
                return create_Object.bind.bind(create_Object, Object)   //  One line quick & efficient implementation

                //
                //  NOTE #1:
                //      So the previous expression is probably confusing ...
                //
                //          It means the same as the two alternate implementations below.
                //
                //      In other words we bind `create_Object`, to create a bound function, with the same
                //      behavior as the alternate implementation below (the bound function created, is itself
                //      a binding function):
                //
                //          Hence the use of `.bind.bind` in the previous expression.
                //

                //
                //  NOTE #2:
                //      Read the "overview" above on "a factory of factories." ...
                //
                //      ... Once you understand that `bind` is, in some sense, used as a factory, then it becomes
                //          clearer that when creating "a factory of factories" we need to use `bind` twice,
                //          as is done above ...
                //
                //      ... To be slightly more accurate `bind` allows us to "modify" a pre-existing function.  When
                //          we "modify" a factory, then we are using `bind` to create a "modified" factory ...
                //
                //      ... Since we are using `bind` on `create_Object` (which is is a factory that creates Objects),
                //          then, in some sense, we are using `bind` to create a "modified" factory.
                //
                //      So once again, since we are creating a "factory of factories" (using `create_Object` as the
                //          underlying factory), and "`bind` is, in some sense, a used as a factory" ...
                //
                //      ... we need to call `bind` twice.
                //
                //      (Thanks for reading this long comment, lol).
                //
            }

            //
            //  NOTE #4:
            //      We deliberately did *NOT* use the previously defined `Gem.Boot.Core.bind` above, since that is way
            //      harder to understand.
            //
            //      You can see the "Pure" implementation below for really using `Gem.Boot.Core.Bind` and why
            //      it is even more confusing.
            //
            //      This "Pure" implementation is only here for reference -- to understand other versions.
            //      (and to allow single stepping in Developer Tools).
            //

            //
            //  This "Pure" implementation -- does work, but way harder to understand
            //

                                //--------------------------------------------------------------+
                                //  WARNING: PRETZEL CODE AHEAD - Part 1                        |
                                //      Single step starts here, to "understand" this code ...  |
                                //--------------------------------------------------------------+

            debugger                                    //  Call debugger to help single trace this PRETZEL code ...

                                //-----------------------------------------------------------+
                                //  ***README***                                             |
                                //      When single stepping:                                |
                                //      =====>>>  HIT F11  <<<===== to single step           |
                                //      Keep doing this until you hit the next ***README***  |
                                //-----------------------------------------------------------+

            single_step_binding = 'STEP 1 - START'

            var bind = Gem.Boot.Core.bind               //  Our "internal" implementation of `Function.prototype.bind`


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
            //      After that are the third & fourth argument of the nested bind function being called
            //      (i.e.: `create_Object` & `Object`).
            //
            var result = bind(          //  First `bind`
                bind, bind,             //  Second & third  `bind`: `bound_f` & `bound_this` (i.e.: binding `bind`)
                bind, bind,             //  Fourth & fourth `bind`: [nested] `bound_f` & `bound_this`
                create_Object,
                Object//,
            )

                                //------------------------------------------------------------------+
                                //  ***README***                                                    |
                                //      When single stepping:                                       |
                                //                                                                  |
                                //      EXAMINE & EXPAND `result` in Developer tools:               |
                                //          1.  Look at `[[TargetFunction]]`                        |
                                //          2.  Look at `[[BoundThis]]`                             |
                                //          3.  Look at `[[BoundArgs]]`                             |
                                //                                                                  |
                                //      This will show you it is a binding on itself, with three    |
                                //      bound arguments [for the nested] bind all                   |
                                //------------------------------------------------------------------+

            single_step_binding = 'STEP 1 - COMPLETE'

                                //------------------------------------------------------------------+
                                //  ***README***                                                    |
                                //      When single stepping:                                       |
                                //      =====>>>  HIT F8  <<<===== to CONTINUE in Developer tools.  |
                                //      It will STOP again later with another 'debugger' statement  |
                                //------------------------------------------------------------------+

            return result
        }//,
    )
} else {
    //
    //  This "mixed" implementation is the easiest to understand:
    //
    //      Although it does the same as the other version, it doesn't really do a double "bind"; but instead
    //      emulates it with a double "closure" (making it easier to understand).
    //
    Gem.Boot.Core.method(
        Gem.Boot.Core,
        'bind_create_Object',
        (
              'A factory of factories.  The created factories create objects.\n'
            + '\n'
            + 'EMULATION: This implementation emulates `.bind` (which is not supported in this browser).\n'
            + '\n'
            + 'Return a bound version of `Object.create`.\n'
            + '\n'
            + 'In the bound function, the `prototype` parameter is passed as the first parameter to `Object.create`.\n'
            + '\n'
            + 'Also, optionally, in the bound function, the `properties` parameter is passed as the second'
            + ' parameter to `Object.create`.'
        ),
        function Gem__Core__bind_create_Object(prototype, /*optional*/ properties) {
            //  A factory of factories.  The created factories create objects.
            //
            //  EMULATION: This implementation emulates `.bind` (which is not supported in this browser).
            //
            //  Return a bound version of `Object.create`.
            //
            //  In the bound function, the `prototype` parameter is passed as the first parameter to
            //  `Object.create`.
            //
            //  Also, optionally, in the bound function, the `properties` parameter is passed as the second
            //  parameter to `Object.create`
            //
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
            //  `Gem.Boot.Core.bind_create_Object`
            //
            return function bound_create_Object() {
                return Object.create(prototype, properties)
            }
        }
    )
}


Gem.Boot.Core.execute(
    function execute$codify__Gem__Core__create_BoxOfPropertyDescriptors() {
        //
        //  Imports
        //
        var create_Object      = Object.create
        var bind_create_Object = Gem.Boot.Core.bind_create_Object


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

        var single_step_binding = Gem.Boot.Core.single_step_binding

        if ( ! single_step_binding) {
            Gem.Boot.Core.create__BoxOfPropertyDescriptors = bind_create_Object(next_segment__BoxOfPropertyDescriptors)
            return
        }

                            //-----------------------------------------------------------------+
                            //  WARNING: PRETZEL CODE AHEAD -- PART #2                         |
                            //      Single step CONTINUES here, to "understand" this code ...  |
                            //-----------------------------------------------------------------+

        debugger                                    //  Call debugger to help single trace this PRETZEL code ...

                            //-----------------------------------------------------------+
                            //  ***README***                                             |
                            //      When single stepping:                                |
                            //      =====>>>  HIT F11  <<<===== to single step           |
                            //      Keep doing this until you hit the next ***README***  |
                            //-----------------------------------------------------------+

        single_step_binding = 'STEP 2 - START'

        var create__BoxOfPropertyDescriptors
            = Gem.Boot.Core.create__BoxOfPropertyDescriptors
            = bind_create_Object(next_segment__BoxOfPropertyDescriptors)

                            //------------------------------------------------------------+
                            //  ***README***                                              |
                            //      When single stepping:                                 |
                            //                                                            |
                            //      EXAMINE & EXPAND `create__BoxOfPropertyDescriptors`   |
                            //          1.  Look at `[[TargetFunction]]`                  |
                            //          2.  Look at `[[BoundThis]]`                       |
                            //          3.  Look at `[[BoundArgs]]`                       |
                            //                                                            |
                            //      This will show you it is a binding on Object.Create,  |
                            //      with one bound argument in `[[BoundArgs]]`            |
                            //      (i.e.: next_segment__BoxOfPropertyDescriptors)        |
                            //------------------------------------------------------------+

        single_step_binding = 'STEP 2 - COMPLETE'

                            //------------------------------------------------------------------+
                            //  ***README***                                                    |
                            //      When single stepping:                                       |
                            //      =====>>>  HIT F8  <<<===== to CONTINUE in Developer tools.  |
                            //      It will STOP again later with another 'debugger' statement  |
                            //------------------------------------------------------------------+
    }
)


//
//  Gem.Boot.Core.produce_create_Box
//      A factory of factories.  The created factories each creates a Box -- an Object with a "class name".
//
if (Gem.Configuration.clarity && Gem.Configuration.box_name) {
    Gem.Boot.Core.codify_method(
        Gem.Core,
        'produce_create_Box',
        (
              'A factory of factories.  The created factories each creates a Box -- an Object with a "class name".\n'
            + '\n'
            + 'The "class name" comes from the name of parameter `named_constructor` (i.e.: `named_constructor.name`).'
        ),
        function codifier$Gem__Core__produce_create_Box() {
            //
            //  Imports
            //
            var bind_create_Object  = Gem.Boot.Core.bind_create_Object
            var single_step_binding = Gem.Boot.Core.single_step_binding

            //
            //  Locals
            //
            var property__constructor = { enumerable  : true }

            if (single_step_binding) {
                            //-----------------------------------------------------------------+
                            //  WARNING: PRETZEL CODE AHEAD -- PART #3                         |
                            //      Single step CONTINUES here, to "understand" this code ...  |
                            //-----------------------------------------------------------------+

                debugger                                    //  Call debugger to help single trace this PRETZEL code ...

                            //-----------------------------------------------------------+
                            //  ***README***                                             |
                            //      When single stepping:                                |
                            //      =====>>>  HIT F11  <<<===== to single step           |
                            //      Keep doing this until you hit the next ***README***  |
                            //-----------------------------------------------------------+

                single_step_binding = 'STEP 3 - START'
            }

            var property_descriptors = Gem.Boot.Core.create__BoxOfPropertyDescriptors(
                    { constructor : { value : property__constructor, enumerable : true } }//,
                )

            if (single_step_binding) {
                            //-------------------------------------------------------+
                            //  ***README***                                         |
                            //      When single stepping:                            |
                            //                                                       |
                            //      EXAMINE & EXPAND `property_descriptors`          |
                            //                                                       |
                            //      This will show you it is a normal object with a  |
                            //      `__proto__` of `BoxOfPropertyDescriptors`        |
                            //                                                       |
                            //      Congratulations -- Success :)                    |
                            //-------------------------------------------------------+

                single_step_binding = 'SINGLE STEPPING COMPLETE'

                            //---------------------------------------------------------------------+
                            //  ***README***                                                       |
                            //      When single stepping:                                          |
                            //      You are done -- Congratulations! :)                            |
                            //      =====>>>  HIT F8  <<<===== to CONTINUE in Developer tools ...  |
                            //      ... *HOPEFULLY* that was eduational ...                        |
                            //---------------------------------------------------------------------+
            }


            var create_AnonymousBox_using_property_descriptors = bind_create_Object(null, property_descriptors)


            return function Gem__Core__produce_create_Box(named_constructor) {
                //  A factory of factories.  The created factories each creates a Box -- an Object with a "class name".
                //
                //  The "class name" comes from the name of parameter `named_constructor`
                //  (i.e.: `named_constructor.name`).'


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
    Gem.Boot.Core.codify_method(
        Gem.Boot,
        'produce_create_Box',
        (
              'A factory of factories.\n'
            + '\n'
            + 'Since this is non clarity mode, in this simplified version'
            + ', each created factory is really `create_AnonymousBox`'
            + ' (which creates very simple Objects with no prototype; and hence no "class name").\n'
            + '\n'
            + 'In clarity mode, instead the created factories each creates a Box -- an Object with a "class name".'
        ),
        function codifier$Gem__Core__produce_create_Box() {
            var create_AnonymousBox = Gem.Boot.Core.bind_create_Object(null)

            return function Gem__Core__produce_create_Box(/*named_constructor*/) {
                //      A factory of factories.
                //
                //      Since this is non clarity mode, in this simplified version, each created factory is really
                //      `create_AnonymousBox` (which creates very simple Objects with no prototype; and hence no
                //      "class name").
                //
                //      In clarity mode, instead the created factories each creates a Box -- an Object with a
                //      "class name"'.

                return create_AnonymousBox
            }
        }
    )
}


Gem.Boot.Core.codify_bound_method(
    'create_Box',
    'Create an object with a "class name" of "Box" in Developer Tools.',
    'A binding of `create_Object` to `Box` (i.e.: A binding of `Object.create` to `Box`).',
    function codifier$Gem__Core__create_Box() {
        function Box() {
            //  An unused fake "constructor" function named 'Box' so that Developer Tools shows the "class name"
            //  of an instance using this prototype as 'Box'
        }

        return Gem.Boot.Core.produce_create_Box(Box)
    }//,
)


Gem.Boot.Core.codify_method(
    Gem.Core,
    'deep_copy_with_adjustments',
    (
          'Create a deep copy of an object -- with various adjustments.\n'
        + '\n'
        + 'Adjustments:\n'
        + '   1. Convert all it\'s objects that use Object.prototype to "named classes" for Developer Tools.\n'
        + '   2. Make objects named `load` configurable (so they can be overwritten).\n'
        + '\n'
        + 'This makes it easier to examine the object in Developer Tools with less "junk".'
    ),
    function codifier$Gem__Core__deep_copy_with_adjustments() {
        //  Create a deep copy of an object -- with various adjustments
        //
        //  Adjustments:
        //     1. Convert all it\'s objects that use Object.prototype to "named classes" for Developer Tools.
        //     2. Make objects named `load` configurable (so they can be overwritten).
        //
        //  This makes it easier to examine the object in Developer Tools with less "junk".
        //
        //  NOTE:
        //      Prototype's other than Object.prototype are not removed, as they are meaningful & neccessary.
        //
        //      For example `Gem.Script.script_map['Gem/Beryl/Boot.js']` has a prototype of `HTMLScriptELement`,
        //      this prototype is meaningful & necessary, and therefore is not removed.

        var create_Box        = Gem.Boot.Core.create_Box
        var object__prototype = Object.prototype
        var get_prototype_of  = Object.getPrototypeOf

        if ('getOwnPropertyDescriptors' in Object) {
            //
            //  JavaScript 6.0
            //
            var enumerable_keys              = Object.keys
            var get_all_property_descriptors = Object.getOwnPropertyDescriptors //  with a trailing 's'

            var deep_copy_with_adjustments = function Gem__Core__deep_copy_with_adjustments(instance) {
                if (7) {
                    //
                    //  JavaScript 6.0:
                    //      Actually we could also use `get_property_names` in JavaScript 6.0; however it seems
                    //      "cleaner" to use `enumable_keys(properties)` since we already created `properites`.
                    //
                    var properties = get_all_property_descriptors(instance)
                    var keys       = enumerable_keys(properties).sort() //  `sort` makes the deep copy deterministic
                }

                for (var i = 0; i < keys.length; i ++) {
                    var k = keys[i]

                    if (7) {
                        //
                        //  JavaScript 6.0 -- we can just use the previous `properties`
                        //
                        var v = properties[k]
                    }

                    if (k === 'load') {
                        v.configurable = true
                    }

                    if ('value' in v) {
                        var value = v.value

                        if (typeof value === 'object' && get_prototype_of(value) === object__prototype) {
                            v.value = deep_copy_with_adjustments(value)
                        }
                    }
                }

                return create_Box(properties)
            }

            return deep_copy_with_adjustments
        }

        //
        //  JavaScript 5.0
        //
        var get_property_names             = Object.getOwnPropertyNames
        var get_single_property_descriptor = Object.getOwnPropertyDescriptor    //  *NO* trailing 's'

        var deep_copy_with_adjustments = function Gem__Core__deep_copy_with_adjustments(instance) {
            if (7) {
                //
                //  JavaScript 5.0 does not have `Object.getOwnPropertyDescriptors` (with a trailing 's')
                //      Hence use `get_property_names`, and we have to build our own `properties` object
                //
                var properties = create_Box()
                var keys       = get_property_names(instance).sort()    //  `sort` makes the deep copy deterministic
            }

            for (var i = 0; i < keys.length; i ++) {
                var k = keys[i]

                if (7) {
                    //
                    //  JavaScript 5.0 does not have `Object.getOwnPropertyDescriptors` (with a trailing 's').
                    //      So we have to get each property one by one.
                    //
                    //      *ALSO* we build our own `properties` object.
                    //
                    var v = get_single_property_descriptor(instance, k)

                    properties[k] = v                                   //  Build our own `properties` object.
                }

                if (k === 'load') {
                    v.configurable = true
                }

                if ('value' in v) {
                    var value = v.value

                    if (typeof value === 'object' && get_prototype_of(value) === object__prototype) {
                        v.value = deep_copy_with_adjustments(value)
                    }
                }
            }

            return create_Box(properties)
        }


        return deep_copy_with_adjustments
    }//,
)


if (Gem.Configuration.clarity) {
    Gem.Boot.Core.execute(
        function execute$deep_copy__Gem__without_object_prototypes() {
            window.Gem = Gem.Boot.Core.deep_copy_with_adjustments(Gem)

            //
            //  Now do callback's informing them that `Gem` has changed
            //
            var clarity_mode$global_variable_Gem_changed  = Gem._.Core.clarity_mode$global_variable_Gem_changed

            for (var i = 0; i < clarity_mode$global_variable_Gem_changed .length; i ++) {
                var callback = clarity_mode$global_variable_Gem_changed [i]

                callback()
            }
        }//,
    )
}
