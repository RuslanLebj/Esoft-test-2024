function deepCopy(obj, clonedObjects = new WeakMap()) {
    // Проверяем, не был ли объект уже скопирован ранее
    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    }

    let clone;

    // Обрабатываем особые случаи для определённых типов данных
    if (obj instanceof Date) {
        // Если obj является экземпляром Date, создаем новый экземпляр Date с тем же значением
        clone = new Date(obj);
    } else if (obj instanceof Map) {
        // Если obj является экземпляром Map, создаем новый Map и рекурсивно копируем его элементы
        clone = new Map(Array.from(obj, ([key, val]) => [key, deepCopy(val, clonedObjects)]));
    } else if (obj instanceof Set) {
        // Если obj является экземпляром Set, создаем новый Set и рекурсивно копируем его элементы
        clone = new Set(Array.from(obj, val => deepCopy(val, clonedObjects)));
    } else if (typeof obj === 'object' && obj !== null) {
        // Обрабатываем объекты и массивы
        clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

        // Запоминаем скопированный объект, чтобы избежать циклических ссылок
        clonedObjects.set(obj, clone);

        // Рекурсивно копируем свойства объекта или элементы массива
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = deepCopy(obj[key], clonedObjects);
            }
        }
    } else {
        // Если obj не является объектом, массивом, датой, Map или Set, просто копируем его
        clone = obj;
    }

    return clone;
};

module.exports = deepCopy;