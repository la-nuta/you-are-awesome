
const createEnumerableProperty = (propertyName) => {

    return {propertyName};
};


const createNotEnumerableProperty = (propertyName) => {
    Object.defineProperty(Object.prototype, propertyName, {
        get() {
            return propertyName;
        },
        set(propertyValue) {
            propertyName = propertyValue;
        }
    });

    return propertyName;
};


const createProtoMagicObject = () => {
    let object = function F() {};
    object.prototype = Object.getPrototypeOf(object);

    return object;
};


const incrementor = () => {
    incrementor.number = incrementor.number === undefined ? 0 : incrementor.number;
    incrementor.number++;
    Object.getPrototypeOf(incrementor).valueOf = () => {
        return incrementor.number;
    };

    return incrementor;
};


const asyncIncrementor = () => {
    asyncIncrementor.number = asyncIncrementor.number === undefined ? 1 : asyncIncrementor.number;

    Object.getPrototypeOf(asyncIncrementor).valueOf = () => {
        return asyncIncrementor.number;
    };

    return new Promise(resolve = () => {return asyncIncrementor.number}), Promise.resolve(asyncIncrementor.number++);
};


const createIncrementer = () => {
    createIncrementer.number = createIncrementer.number === undefined ? 1 : createIncrementer.number;

    Object.getPrototypeOf(createIncrementer).valueOf =  function () {
        return createIncrementer.number;
    };

    Object.getPrototypeOf(createIncrementer).next = function () {
        return {value: createIncrementer.number++, done: false};
    };

    Object.getPrototypeOf(createIncrementer)[Symbol.iterator] = () => {
        return createIncrementer;
    };

    return createIncrementer;
};


// // return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (param) => {

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(param);
        }, 1000);
    });
};


const getDeepPropertiesCount = (object) => {
    let count = 0;
    for (; object != null; object = Object.getPrototypeOf(object)) {
        let objectProperties = Object.getOwnPropertyNames(object);
        count = count + objectProperties.length;
    }

    return count;
};


const createSerializedObject = () => {
    let object = {};

    JSON.parse = function (string) {
        return object;
    };

    return object;
};

const toBuffer = () => {};

const sortByProto = (array) => {
    array.sort((a, b) => {
        return Object.getPrototypeOf(a) > Object.getPrototypeOf(b) ? 1 : -1;
    });

    return array;
};

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;
