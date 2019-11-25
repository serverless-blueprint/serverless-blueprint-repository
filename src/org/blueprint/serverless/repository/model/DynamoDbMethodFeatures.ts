export interface MethodFeatures {
    readonly methodSupported: boolean

    featureId(): string

    all(): { [key: string]: any }
}

export class FindAllMethodFeatures implements MethodFeatures {
    constructor(public readonly methodSupported: boolean,
                public readonly methodName: string) {
    }

    featureId(): string {
        return "findAllMethod";
    }

    all() {
        return {
            "methodName": this.methodName
        };
    }
}

export class FindByIdMethodFeatures implements MethodFeatures {
    constructor(public readonly methodSupported: boolean,
                public readonly methodName: string) {
    }

    featureId(): string {
        return "findByIdMethod";
    }

    all() {
        return {
            "methodName": this.methodName
        }
    }
}