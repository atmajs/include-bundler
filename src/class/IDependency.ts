export interface IDependency {
    url: string
    type: string
    page?: string
    bundle?: string
    module?: string
    pos?: number
};

export interface IDependencies {
    dependencies: IDependency[],
    meta?: {
        includejs?: {
            hasIncludes: boolean,
            hasExports: boolean,
            hasResponseObject: boolean,
            responseAccessors: any
        }
    }
}