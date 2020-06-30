export function obj_deepDefaults (target: any, defaults: any) {
    if (target == null) {
        return defaults;
    }
    if (defaults == null) {
        return target;
    }
    if (typeof target !== 'object' || typeof defaults !== 'object') {
        return target ?? defaults;
    }
    for (let key in defaults) {
        if (target[key] == null) {
            target[key] = defaults[key];
            continue;
        }
        if (typeof target[key] === 'object' && defaults[key] != null && typeof defaults[key] === 'object') {
            obj_deepDefaults(target[key], defaults[key]);
        }
    }
    return target;
}

export function obj_deepExtend (target: any, source: any) {
    if (target == null || source == null) {
        return target || obj_deepExtend({}, source);
    }
    for (let key in source) {
        let targetValue = target[key];
        let sourceValue = source[key];
        if (sourceValue != null && targetValue != null
            && typeof targetValue === 'object'
            && typeof sourceValue === 'object'
            && false === Array.isArray(targetValue)
            && false === Array.isArray(sourceValue)) {

            obj_deepExtend(targetValue, sourceValue);
            continue;
        }
        target[key] = sourceValue;

    }
    return target;
}
