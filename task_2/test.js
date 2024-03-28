const deepCopy = require('./deepCopy'); // Подключаем функцию deepCopy из файла deepCopy.js

describe('deepCopy', () => {
    // Тест для проверки глубокого копирования примитивных типов
    test('should deep copy primitive types', () => {
        expect(deepCopy(42)).toEqual(42); // Проверяем глубокое копирование числа
        expect(deepCopy('hello')).toEqual('hello'); // Проверяем глубокое копирование строки
        expect(deepCopy(true)).toEqual(true); // Проверяем глубокое копирование булевого значения
        expect(deepCopy(null)).toEqual(null); // Проверяем глубокое копирование значения null
        expect(deepCopy(undefined)).toEqual(undefined); // Проверяем глубокое копирование значения undefined
    });

    // Тест для проверки глубокого копирования массивов
    test('should deep copy arrays', () => {
        const arr = [1, [2, 3], { a: 4 }];
        const copy = deepCopy(arr);
        expect(copy).toEqual(arr); // Проверяем, что копия равна оригиналу
        expect(copy).not.toBe(arr); // Проверяем, что это разные объекты
        expect(copy[1]).not.toBe(arr[1]); // Проверяем, что вложенный массив также скопирован
        expect(copy[2]).not.toBe(arr[2]); // Проверяем, что вложенный объект также скопирован
    });

    // Тест для проверки глубокого копирования объектов
    test('should deep copy objects', () => {
        const obj = { a: 1, b: { c: 2 } };
        const copy = deepCopy(obj);
        expect(copy).toEqual(obj); // Проверяем, что копия равна оригиналу
        expect(copy).not.toBe(obj); // Проверяем, что это разные объекты
        expect(copy.b).not.toBe(obj.b); // Проверяем, что вложенный объект также скопирован
    });

    // Тест для проверки глубокого копирования дат
    test('should deep copy Dates', () => {
        const date = new Date();
        const copy = deepCopy(date);
        expect(copy).toEqual(date); // Проверяем, что копия равна оригиналу
        expect(copy).not.toBe(date); // Проверяем, что это разные даты
    });

    // Тест для проверки глубокого копирования Map
    test('should deep copy Maps', () => {
        const map = new Map([[1, 'one'], [2, 'two']]);
        const copy = deepCopy(map);
        expect(copy).toEqual(map); // Проверяем, что копия равна оригиналу
        expect(copy).not.toBe(map); // Проверяем, что это разные Maps
        expect(copy.get(1)).toEqual('one'); // Проверяем, что значения скопированы
        expect(copy.get(2)).toEqual('two'); // Проверяем, что значения скопированы
    });

    // Тест для проверки глубокого копирования Set
    test('should deep copy Sets', () => {
        const set = new Set([1, 2, 3]);
        const copy = deepCopy(set);
        expect(copy).toEqual(set); // Проверяем, что копия равна оригиналу
        expect(copy).not.toBe(set); // Проверяем, что это разные Sets
        expect(copy.has(1)).toEqual(true); // Проверяем, что значения скопированы
        expect(copy.has(2)).toEqual(true); // Проверяем, что значения скопированы
        expect(copy.has(3)).toEqual(true); // Проверяем, что значения скопированы
    });
});