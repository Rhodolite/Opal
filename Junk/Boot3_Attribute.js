Gem.Core.codify_method(
    'create_FrozenBoxOfPropertyDescriptors',
    'Create a frozen box of property descriptors (used to create other objects with attributes).',
    function codifier$Gem__Core__create_FrozenBoxOfPropertyDescriptors() {
        //
        //  Imports
        //
        var create_Object = Object.create


        //
        //  Configuration
        //
        var box_mode = {
            //  nw.js 0.12 modes:
            anonymous_box                           : 1,    //  Just make the whole thing totally anonymous
            constructor_attribute                   : 0,    //  use constructor attribute
            constructor_plus_keep_normal_prototype  : 0,    //  use constructor & keep normal prototype
            constructor_plus_keep_1_prototype       : 0,    //  use constructor & keep 1 prototype
            constructor_plus_keep_2_prototypes      : 0,    //  use constructor & keep 2 prototypes
            constructor_plus_keep_3_prototypes      : 0,    //  use constructor & keep 3 prototypes
            constructor_plus_leave_object_prototype : 0,    //  use constructor & leave `Object.prototype`
            constructor_plus_nullify_prototype      : 0,    //  use constructor & nullify the prototype
        }


        if (box_mode.anonymous) {
            if ('bind' in create_Object) {
                var create_AnonymousBox = create_Object.bind(Object, null)
            } else {
                var create_AnonymousBox = function OLD_WAY$create_anonymousBox(properties) {
                    return create_Object(null, properties)
                }
            }


            return function create_FrozenBoxOfPropertyDescriptors(properties) {
                //  Create an anonymous Frozen box of property descriptiors.
                //
                //  Mostly used in "release" mode to create an efficient as possible object.

                var result = create_AnonymousBox(properties)

                freeze(result)

                return result
            }
        }


        if (box_mode.constructor_attribute) {
            //
            //  Imports
            //
            var define_property = Object.defineProperty


            //
            //  Implementation
            //
            var FrozenBoxOfPropertyDescriptors = function FrozenBoxOfPropertyDescriptors() {
                //  An unused fake "constructor" function named 'BoxOfPropertyDescriptors' so that Developer Tools
                //  shows the "class name" of an instance (using this in it's next segment) as
                //  'BoxOfPropertyDescriptors'
            }


            var FrozenInvisibleFakeConstructor = function FrozenInvisibleFakeConstructor() {
                //  An unused fake "constructor" function named 'FrozenInvisibleFakeConstructor' so that
                //  Developer Tools shows the "class name" of an instance (with a `.constructor` attribute set to
                //  this fake constructor) as 'FrozenInvisibleFakeConstructor'.
            }


            //
            //  NOTE #1:
            //      It is quite confusing in Javascript, but a function has two "prototype's":
            //
            //          1.  It's prototype (i.e.: `__proto__`) which is the type of the function, this
            //              typically has the value of `Function.prototype`.
            //
            //          2.  It's `.prototype` member which is the type of the class it creates when used
            //              as a class "constructor".
            //
            //      In the code below, FrozenBoxOfPropertyDescriptors' `.prototype` member (#2) is set to null.
            //      (Also  FrozenInvisibleFakeConstructor's `.prototype` member (#2) is set to null).
            //

            //
            //  NOTE #2:
            //      It actually doesn't help too much (in nw.js 0.12) to set `BoxOfPropertyDescriptors.prototype`
            //      to `null` as above.
            //
            //      In nw.js 0.12 or earlier, it will then give an object created with the constructor a `.__proto__`
            //      of `Object.prototype` (very annoying).
            //
            //      In nw.js 0.13 or later, it will property give an object created with the constuctor a `.__proto__`
            //      of `null`.
            //
            BoxOfPropertyDescriptors      .prototype = null
            FrozenInvisibleFakeConstructor.prototype = null


            var constructor_attribute__set_to__FrozenBoxOfPropertyDescriptors = create_Object(
                    null,
                    {
                        'constructor' : {                    value : FrozenInvisibleFakeConstructor },
                        'value'       : { enumerable : true, value : FrozenBoxOfPropertyDescriptors },
                        'writeable'   : { enumerable : true, value : true                           }//,
                    }//,
                )


            freeze(constructor_attribute__set_to__FrozenBoxOfPropertyDescriptors)


            function create_FrozenBoxOfPropertyDescriptors(properties) {
                var result = create_AnonymousBox(properties)

                define_property(result, 'constructor', constructor_attribute__set_to__FrozenBoxOfPropertyDescriptors)
                freeze(result)

                return result
            }
        }


        //
        //  Imports
        //
        var seal          = Object.seal


        //
        //  Locals
        //
        if (box_mode.constructor_plus_nullify_prototype) {
            var FrozenBoxOfPropertyDescriptors = function FrozenBoxOfPropertyDescriptors(properties) {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  (using this in it's next segment) 'FrozenBoxOfPropertyDescriptors'.
                //
                //  Also nullifies the unwanted `.__proto__` member.

                set_prototype(this, null)
                define_properties(this, properties)
                freeze(this)
            }

        } else if (box_mode.constructor_plus_keep_prototype || box_mode.constructor_plus_leave_unwanted_prototype)
            var FrozenBoxOfPropertyDescriptors = function FrozenBoxOfPropertyDescriptors(properties) {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  (using this in it's next segment) 'FrozenBoxOfPropertyDescriptors'.
                //
                //  Also leaves the unwanted `.__proto__` member.

                define_properties(this, properties)
                freeze(this)
            }


            if (box_mode.constructor_plus_leave_unwanted_prototype) {
                //
                //  NOTE #3:
                //      See NOTES #1 & Note #2 above.
                //
                //      So in nw.js 0.12 or earlier, the below is slightly futile ...
                //
                //      ... however at least it won't use the [original] fake `prototype` but instead use
                //          `Object.prototype`.
                //
                BoxOfPropertyDescriptors.prototype = null
            }
        } else if (box_mode.constructor_attribute)
        }


        function produce_create_SealedBox(named_constructor) {
            named_constructor.prototype = null

            function create_Box(properties)
                var result = new namedConstructor()

                set_prototype(result, null)
                define_properties(result, properties)
                seal(result)

                return result
            }
        }

        var next_segment__BoxOfPropertyDescriptors = create_Object(
                null,
                { constructor : { configurable: true, value : BoxOfPropertyDescriptors, enumerable : false } }//,
            )

        console.log(next_segment__BoxOfPropertyDescriptors)

        window.n = next_segment__BoxOfPropertyDescriptors
    }//,
)
    


if (0) {
    Gem.Core.execute(
        function execute$codify__Gem__Core__create_BoxOfPropertyDescriptors() {
            //
            //  Imports
            //
            var create_Object      = Object.create
            var bind_create_Object = Gem.Core.bind_create_Object


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
                BoxOfPropertyDescriptors.prototype = null


                var next_segment__BoxOfPropertyDescriptors = create_Object(
                        null,
                        { constructor : { value : BoxOfPropertyDescriptors, enumerable : true } }//,
                    )
            } else {
                var next_segment__BoxOfPropertyDescriptors = null
            }

            Gem.Core.create__BoxOfPropertyDescriptors = bind_create_Object(next_segment__BoxOfPropertyDescriptors)
        }//,
    )


    //
    //  Gem.Core.produce_create_Box
    //      A factory of factories.  The created factories each creates a Box -- an Object with a "class name".
    //
    if (Gem.Configuration.clarity && Gem.Configuration.box_name) {
        Gem.Core.codify_method(
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
                var bind_create_Object  = Gem.Core.bind_create_Object
                var single_step_binding = Gem.Core.single_step_binding

                //
                //  Locals
                //
                var property__constructor = { enumerable  : true }

                var property_descriptors = Gem.Core.create__BoxOfPropertyDescriptors(
                        { constructor : { value : property__constructor, enumerable : true } }//,
                    )

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
                    named_constructor.prototype = null
                    property__constructor.value = named_constructor

                    var prototype_with__named_constructor = create_AnonymousBox_using_property_descriptors()

                    delete property__constructor.value

                    return bind_create_Object(prototype_with__named_constructor)
                }
            }
        )
    } else {
        Gem.Core.codify_method(
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
                var create_AnonymousBox = Gem.Core.bind_create_Object(null)
            }

            return function create_FrozenBoxOfPropertyDescriptors(properties) {
                //  Create an anonymous Frozen box of property descriptiors.
                //
                //  Mostly used in "release" mode to create an efficient as possible object.

                var result = create_Object(null, properties)

                freeze(result)

                return result
            }
        }



        var set_prototype = Object.setPrototypeOf
        var seal          = Object.seal


        //
        //  Locals
        //
        if (box_mode.constructor_plus_nullify_prototype) {
            var FrozenBoxOfPropertyDescriptors = function FrozenBoxOfPropertyDescriptors(properties) {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  (using this in it's next segment) 'FrozenBoxOfPropertyDescriptors'.
                //
                //  Also nullifies the unwanted `.__proto__` member.

                set_prototype(this, null)
                define_properties(this, properties)
                freeze(this)
            }

            //
            //  NOTE #1:
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
            BoxOfPropertyDescriptors.prototype = null

            //
            //  NOTE #2:
            //      It actually doesn't help too much (in nw.js 0.12) to set `BoxOfPropertyDescriptors.prototype`
            //      to `null` as above.
            //
            //      In nw.js 0.12 or earlier, it will then give an object created with the constructor a `.__proto__`
            //      of `Object.prototype` (very annoying).
            //
            //      In nw.js 0.13 or later, it will property give an object created with the constuctor a `.__proto__`
            //      of `null`.
            //
        } else if (box_mode.constructor_plus_keep_prototype || box_mode.constructor_plus_leave_unwanted_prototype)
            var FrozenBoxOfPropertyDescriptors = function FrozenBoxOfPropertyDescriptors(properties) {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  (using this in it's next segment) 'FrozenBoxOfPropertyDescriptors'.
                //
                //  Also leaves the unwanted `.__proto__` member.

                define_properties(this, properties)
                freeze(this)
            }


            if (box_mode.constructor_plus_leave_unwanted_prototype) {
                //
                //  NOTE #3:
                //      See NOTES #1 & Note #2 above.
                //
                //      So in nw.js 0.12 or earlier, the below is slightly futile ...
                //
                //      ... however at least it won't use the [original] fake `prototype` but instead use
                //          `Object.prototype`.
                //
                BoxOfPropertyDescriptors.prototype = null
            }
        } else if (box_mode.constructor_attribute)
            var FrozenBoxOfPropertyDescriptors = function FrozenBoxOfPropertyDescriptors() {
                //  An unused fake "constructor" function named 'BoxOfPropertyDescriptors' so that Developer Tools
                //  shows the "class name" of an instance (using this in it's next segment) as
                //  'BoxOfPropertyDescriptors'
            }

            BoxOfPropertyDescriptors.prototype = null
        }


        if (box_mode.constructor_attribute) {
            function create_FrozenBoxOfPropertyDescriptors(properties) {
            }
        }


        function produce_create_SealedBox(named_constructor) {
            named_constructor.prototype = null

            function create_Box(properties)
                var result = new namedConstructor()

                set_prototype(result, null)
                define_properties(result, properties)
                seal(result)

                return result
            }
        }

        var next_segment__BoxOfPropertyDescriptors = create_Object(
                null,
                { constructor : { configurable: true, value : BoxOfPropertyDescriptors, enumerable : false } }//,
            )

        console.log(next_segment__BoxOfPropertyDescriptors)

        window.n = next_segment__BoxOfPropertyDescriptors
    }//,
)
    


if (0) {
    Gem.Core.execute(
        function execute$codify__Gem__Core__create_BoxOfPropertyDescriptors() {
            //
            //  Imports
            //
            var create_Object      = Object.create
            var bind_create_Object = Gem.Core.bind_create_Object


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
                BoxOfPropertyDescriptors.prototype = null


                var next_segment__BoxOfPropertyDescriptors = create_Object(
                        null,
                        { constructor : { value : BoxOfPropertyDescriptors, enumerable : true } }//,
                    )
            } else {
                var next_segment__BoxOfPropertyDescriptors = null
            }

            Gem.Core.create__BoxOfPropertyDescriptors = bind_create_Object(next_segment__BoxOfPropertyDescriptors)
        }//,
    )


    //
    //  Gem.Core.produce_create_Box
    //      A factory of factories.  The created factories each creates a Box -- an Object with a "class name".
    //
    if (Gem.Configuration.clarity && Gem.Configuration.box_name) {
        Gem.Core.codify_method(
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
                var bind_create_Object  = Gem.Core.bind_create_Object
                var single_step_binding = Gem.Core.single_step_binding

                //
                //  Locals
                //
                var property__constructor = { enumerable  : true }

                var property_descriptors = Gem.Core.create__BoxOfPropertyDescriptors(
                        { constructor : { value : property__constructor, enumerable : true } }//,
                    )

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
                    named_constructor.prototype = null
                    property__constructor.value = named_constructor

                    var prototype_with__named_constructor = create_AnonymousBox_using_property_descriptors()

                    delete property__constructor.value

                    return bind_create_Object(prototype_with__named_constructor)
                }
            }
        )
    } else {
        Gem.Core.codify_method(
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
                var create_AnonymousBox = Gem.Core.bind_create_Object(null)

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
}
