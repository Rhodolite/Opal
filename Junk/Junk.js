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



