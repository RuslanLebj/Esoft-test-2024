function deepCopy(obj, clonedObjects = new WeakMap()) {
    // Проверяем, не был ли объект уже скопирован ранее
    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    }

    let clone;

    // Обрабатываем особые случаи для определённых типов данных
    if (obj instanceof Date) {
        clone = new Date(obj);
    } else if (obj instanceof Map) {
        clone = new Map(Array.from(obj, ([key, val]) => [key, deepCopy(val, clonedObjects)]));
    } else if (obj instanceof Set) {
        clone = new Set(Array.from(obj, val => deepCopy(val, clonedObjects)));
    } else if (typeof obj === 'object' && obj !== null) {
        // Обрабатываем объекты и массивы
        clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));

        // Запоминаем скопированный объект, чтобы избежать циклических ссылок
        clonedObjects.set(obj, clone);

        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clone[key] = deepCopy(obj[key], clonedObjects);
            }
        }
    } else {
        // По умолчанию просто копируем примитивные типы
        clone = obj;
    }

    return clone;
}