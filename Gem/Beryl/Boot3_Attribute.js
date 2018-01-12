//
//  Copyright (c) 2017 Joy Diamond.  Licensed under the MIT License
//  Boot3_Attribute: Boot - Phase 3 - Add Attributes
//
'use strict'                                                //  Strict mode helps catch JavaScript errors, very useful!


Gem.Boot.Core.codify_method(
    Gem.Core,
    'produce_create_FrozenBox__keep_normal_prototype',
    (
          'A factory of factories.  The created factories each creates a Frozen Box -- a frozen object with'
        + ' a "class name".\n'
        + '\n'
        + 'The "class name" comes from the name of parameter `named_constructor` (i.e.: `named_constructor.name`).\n'
        + '\n'
        + 'In Developer tools for nw.js 0.12, when an object is created using `new`, it permenantly acquires'
        + ' "class name" from the constructor to display in Developer Tools -- even if the object is no longer linked'
        + ' to the constructor when displayed.  This code uses this "feature" of Developer Tools for nw.js 0.12.'
    ),
    function codifier$Gem__Core__produce_create_FrozenBox__keep_normal_prototype() {
        //
        //  Imports
        //
        var define_properties = Object.defineProperties
        var freeze            = Object.freeze


        //
        //  Implementation
        //
        return function Gem__Core__produce_create_FrozenBox__keep_normal_prototype(named_constructor) {
            //  A factory of factories.  The created factories each creates a Frozen Box -- a frozen Object with
            //  a "class name".
            //
            //  The "class name" comes from the name of parameter `named_constructor`
            //  (i.e.: `named_constructor.name`).
            //
            //  In Developer tools for nw.js 0.12, when an object is created using `new`, it permenantly acquires
            //  a "class name" from the constructor to display in Developer Tools -- even if the object is no longer
            //  linked to the constructor when displayed.  This code uses this "feature" of Developer Tools for
            //  nw.js 0.12.

            return function create_FrozenBox__keep_normal_prototype(properties) {
                var result = new named_constructor()

                define_properties(result, properties)
                freeze(result)

                return result
            }
        }
    }//,
)


Gem.Boot.Core.codify_method(
    Gem.Core,
    'produce_create_FrozenBox__nullify_012_prototype',
    (
          'A factory of factories.  The created factories each creates a Frozen Box -- a frozen object with'
        + ' a "class name".\n'
        + '\n'
        + 'The "class name" comes from the name of parameter `named_constructor` (i.e.: `named_constructor.name`).\n'
        + '\n'
        + 'The `.__proto__` attribute is set to null after the frozen Box object is created (due to a "bug" in'
        + ' nw.js 0.12 an object cannot be created with it\'s `.__proto__` member set to null).'
        + '\n'
        + 'In Developer tools for nw.js 0.12, when an object is created using `new`, it permenantly acquires'
        + ' "class name" from the constructor to display in Developer Tools -- even if the object is no longer linked'
        + ' to the constructor when displayed.  This code uses this "feature" of Developer Tools for nw.js 0.12.'
    ),
    function codifier$Gem__Core__produce_create_FrozenBox__nullify_012_prototype() {
        //
        //  Imports
        //
        var define_properties = Object.defineProperties
        var freeze            = Object.freeze
        var set_prototype     = Object.setPrototypeOf


        //
        //  Implementation
        //
        return function Gem__Core__produce_create_FrozenBox__nullify_012_prototype(named_constructor) {
            //  A factory of factories.  The created factories each creates a Frozen Box -- a frozen Object with
            //  a "class name".
            //
            //  The "class name" comes from the name of parameter `named_constructor`
            //  (i.e.: `named_constructor.name`).
            //
            //  The `.__proto__` attribute is set to null after the frozen Box object is created (due to a "bug" in
            //  nw.js 0.12 an object cannot be created with it's `.__proto__` member set to null).
            //
            //  In Developer tools for nw.js 0.12, when an object is created using `new`, it permenantly acquires
            //  a "class name" from the constructor to display in Developer Tools -- even if the object is no longer
            //  linked to the constructor when displayed.  This code uses this "feature" of Developer Tools for
            //  nw.js 0.12.

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
            named_constructor.prototype = null


            return function create_FrozenBox__nullify_012_prototype(properties) {
                var result = new named_constructor()

                set_prototype(result, null)
                define_properties(result, properties)
                freeze(result)

                return result
            }
        }
    }//,
)


Gem.Core.codify_method(
    Gem.Boot,
    'create_InvisibleConstantAttributeBox',
    (
          'Create a sealed object with a class name of "InvisibleConstantAttributeBox" (used for creating invisible'
        + ' constant attributes).'
    ),
    function codifier$Gem__Core__create_InvisibleConstantAttributeBox() {
        var define_properties = Object.defineProperties
        var seal              = Object.seal


        function InvisibleConstantAttributeBox() {
            //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
            //  created using this constructor as "InvisibleConstantAttributeBox".
        }


        InvisibleConstantAttributeBox.prototype = null


        return function Gem__Core__create_InvisibleConstantAttributeBox(properties) {
            //  Create a sealed object named "InvisibleConstantAttributeBox" (used for creating invisible constant
            //  attributes).

            var result = new InvisibleConstantAttributeBox()

            define_properties(result, properties)
            seal(result)

            return result
        }
    }
)


Gem.Boot.qualify_constant(
    Gem.Boot.Core,
    'attribute_constructor',
    'A property to create an invisible constant `.constructor` attribute',
    function qualifier$Gem__Core__attribute_constructor() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Configuration = Gem.Configuration

        var clarity = Configuration.clarity


        //
        //  Implementation
        //
        if (clarity) {
            return Gem.Boot.Core.create_InvisibleConstantAttributeBox(
                {
                    $what : { value : 'A property to create an invisible constant `.constructor` attribute' },
                    value : { value : undefined, writable: true }//,
                }//
            )
        }

        return Gem.Boot.Core.create_InvisibleConstantAttributeBox(
            {
                value : { value : undefined }//,
            }//,
        )
    }
)


Gem.Boot.Core.codify_method(
    Gem.Core,
    'create_RootPrototype',
    'Create a root prototype box.',
    function codifier$Gem__Core__create_RootPrototype() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Core = Gem.Boot.Core

        var attribute_constructor    = Core.attribute_constructor
        var produce_create_FrozenBox = Core.produce_create_FrozenBox__keep_normal_prototype


        //
        //  Closures
        //
        function RootPrototype() {
            //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
            //  (using this in it's next segment) as 'RootPrototype'.
        }

        RootPrototype.prototype = null

        var create__FrozenBox__RootPrototype = produce_create_FrozenBox(RootPrototype)


        //
        //  Implementation
        //
        return function Gem__Core__create_RootPrototype(constructor) {
            attribute_constructor.value = constructor

            var result = create__FrozenBox__RootPrototype(
                    {
                        constructor : attribute_constructor//,
                    }//,
                )

            attribute_constructor.value = undefined

            return result
        }
    }//,
)


Gem.Boot.Core.codify_method(
    Gem.Core,
    'test1',
    'Test 1 of produce_create_FrozenBox__nullify_012_prototype',
    function codifier$Gem__Core__test1() {
        //
        //  Imports
        //
        var Gem = window.Gem

        var Core = Gem.Boot.Core

        var create__RootPrototype = Core.create_RootPrototype


        //
        //  Implementation
        //
        return function Gem__Core__test1() {
            function BoxPrototype() {
                //  A constructor for nw.js 0.12 so that Developer Tools shows the "class name" of an instance
                //  (using this in it's next segment) as 'BoxPrototype'.
            }


            BoxPrototype.prototype = create__RootPrototype(BoxPrototype)

            return BoxPrototype
        }
    }//,
)


window.z = Gem.Boot.Core.test1


console.log('%o', z().prototype)
