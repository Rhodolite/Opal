//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Beryl: Boot Engine, Reliable Yet Limber
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.NodeWebKit.show_developer_tools()


Gem.execute(
    function execute__set__Gem__Beryl__Bind() {
        Gem.Beryl.has_bind = ('bind' in Function)

        //
        //  You can change the following `if (0)` to `if (7)` to disable the use of `.bind` directly, and test
        //  the backwards compatability implementation when `.bind` does not exist in the browser.
        //
        if (0) {
            Gem.Beryl.has_bind = false
        }
    }
)


if (Gem.Beryl.has_bind) {
    Gem.Beryl.codify_method(
        'bind',
        'Create a new function with a bound `this` value (and optionally other bound arguments).`',
        //
        //  Modern Browser implementation using `Function.prototype.bind`
        //
        //  NOTE #1:
        //      This version of `Gem.Beryl.bind` is correct.
        //
        //      However, it is really confusing to understand and use it, especially when doing stack traces in
        //      Developer tools.
        //
        //      It is even more confusing, when trying to understand (below) "a factory of factories" which would
        //      use this procedure, recursivly, on itself, if it did use this procedure.
        //
        //      Hence, for ease of understanding [the code & tracing it in developer tools], we really call
        //      `Function.prototype.bind` instead of calling this procedure ...
        //
        //  NOTE #2:
        //      You can enable the `if (0)` [way below] to `if (7)` to enable this function to be called
        //      (see comment there).
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
            var slice_call = Array.prototype.slice.call.bind(Array.prototype.slice)

            return function Gem__Beryl__bind(bound_f, bound_this /*, ...*/) {
                if (arguments.length === 2) {
                    return bound_f.bind(bound_this)
                }

                return bound_f.bind.apply(bound_this, slice_call(arguments, 2))
            }
        }
    )
} else {
    Gem.Beryl.codify_method(
        'bind',
        'Create a new function with a bound `this` value (and optionally other bound arguments).`',
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


//
//  Gem.beryl.bind_create_Object
//      A factory of factories.  The created factories create objects.
//
//      Overview:
//          Factories are superior to `new`, as they are easier to refactor.
//
//          It takes a while to understand factories.
//
//          The concept of a "factory of factories" is a little harder to understand, but becomes clearer over time.
//
//      Summary:
//          A factory of factories.
//
//          The factories returned by `bind_create_Object` are named `create_*` (since they are factories, and
//          factories, in general, begin with a "creation" verb like `create` and end with the name of what they
//          create).
//
//      Details:
//          Returns a bound create_Object (i.e.: a callable verion of `create_Object` with some of it's parameters
//          bound).
//
//          In other words, `bind_create_objects` bind's some paramters to `create_object` and returns a callable
//          function.
//
//          Since `create_object` is a factory then `bind_create_object` returns a factory with some of it's
//          parameters bound.
//
//          Two examples (from below):
//
//              1.  `var create_AnonymousBox = bind_create_Object(null)`
//                      Binds `null` as the first paramater to `create_Object`.
//
//                      Thus this returns a factory that creates "AnonymousBox" objects
//
//                      This factory, is thus, appropriatly named `create_AnonymousBox`.
//
//          2.  `.create__BoxOfPropertyDescriptors = bind_create_Object(next_segment__BoxOfPropertyDescriptors)`
//                      Binds `next_segment__BoxOfPropertyDescriptors` as the first paremater to `create_Object`.
//
//                      Thus this returns a factory that creates "BoxOfPrototypeDescriptors" objects.
//
//                      This factory, is thus, appropriatly named `create__BoxOfPropertyDescriptors`
//
if (Gem.Beryl.has_bind) {
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
            //      the alternate implementation below (the bound function created, is itself a binding function):
            //
            //          Hence the use of `.bind.bind` in the next statement.
            //
            //  NOTE #2:
            //      Read the "overview" above on "a factory of factories."
            //
            //      Once you understand that `bind` is, in some sense, used as a factory, then it becomes clearer that
            //      when creating "a factory of factories" we need to use `bind` twice, as is done below...
            //
            //      To be slightly more accurate `bind` allows us to "modify" a pre-existing function.  When
            //      we "modify" a factory, then we are using `bind` to create a "modified" factory.
            //
            //      Since we are using `bind` on `create_Object` (which is is a factory that creates Objects),
            //      then, in some sense, we are using `bind` to creat a "modified" factory.
            //
            //      So once again, since we are creating a "factory of factories" (using `create_Object` as the
            //      underlying factory), and "`bind` is in some sense, a used as a factory" & we need to call
            //      it `bind` twice.
            //
            //      (Thanks for reading this long comment, lol).
            //
            Gem.Beryl.bind_create_Object = create_Object.bind.bind(create_Object, Object)

            //
            //  NOTE #3:
            //      We deliberatly did *NOT* use the previously defined `Gem.Beryl.bind` here, since that is even more
            //      confusing (you can see the "Pure" implementation below for use of `Gem.Beryl.Bind` and why
            //      it is even more confusing).
            //
            //      If you really want to see `Beryl.bind_create_object` in action, then you can enable the
            //      code below .. which does work ... by changing `if (0)` to `if (7)` & single tracing it.
            //
            if (0) {
                //
                //  This "Pure" implementation NOT used on purpose.  Only here for reference -- to understand other
                //  versions.
                //
                //  This "Pure" implementation -- does work, but way harder to understand
                //
                debugger                                    //  Call debugger to help single trace this code ...

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
                Gem.Beryl.bind_create_Object = Gem.Beryl.bind(  //  First `bind`
                        Gem.Beryl.bind, Gem.Beryl.bind, //  Second & third `bind`: `bound_f` & `bound_this`
                        Gem.Beryl.bind, Gem.Beryl.bind, //  Fourth & fourth `bind`: [nested] `bound_f` & `bound_this`
                        create_Object,
                        Object//,
                    )
            }
        }
    )
} else {
    //
    //  This "mixed" implementation is the easiest to understand:
    //
    //      Although it does the same as the other version, it doesn't really do a double "bind"; but instead
    //      emulates it with a double "closure" (making it easier to understand).
    //
    Gem.Beryl.codify_method(
        'bind_create_Object',
        'A factory of factories.  The created factories create objects.',
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


//
//  Gem.Beryl.produce_create_Box
//      A factory of factories.  The created factories each creates a Box -- an Object with a "class name".
//
if (Gem.Configuration.clarity && Gem.Configuration.box_name) {
    Gem.Beryl.codify_method(
        'produce_create_Box',
        'A factory of factories.  The created factories each creates a Box -- an Object with a "class name".',
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
                //  A factory of factories.  The created factories each creates a Box -- an Object with a "class name".

            
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
    Gem.Beryl.codify_method(
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
        function codifier__Gem__Beryl__produce_create_Box() {
            var create_AnonymousBox = Gem.Beryl.bind_create_Object(null)

            return function Gem__Beryl__produce_create_Box(/*fake_constructor*/) {
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

            Gem.Configuration.$who  = 'Gem.Configuration'
            Gem.Configuration.$what = 'Gem Configuration values'

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


Gem.Beryl.codify_method(
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

                if (k === 'load') {
                    v.configurable = true
                }

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
