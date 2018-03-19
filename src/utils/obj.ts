export function obj_deepDefaults (target: any, defaults: any) {
    if (target == null) {
        return defaults;
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