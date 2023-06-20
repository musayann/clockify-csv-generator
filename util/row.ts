import KebabCase from 'lodash.kebabcase';

export class Row {
    private data: any;

    constructor(data: any) {
        this.data = {};
        Object.keys(data).forEach((key) => {
            this.data[this.convertToKebabCase(key)] = data[key];
        });
    }

    private convertToKebabCase(str: string) {
        const converted = KebabCase(str);
        return converted;
    }

    get(key: string) {
        return this.data[this.convertToKebabCase(key)];
    }
}
