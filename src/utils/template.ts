import { obj_getProperty } from 'atma-utils';

export function template_interpolate (template: string, model: any) {
    
    template = template.replace(/%([\w\.\d]+)%/g, (full, property) => {
        return obj_getProperty(model, property);
    });
    return template;
}

export function template_stringifyContent (str: string) {
    return str
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '')
        .replace(/["]/g, '\\"');
}