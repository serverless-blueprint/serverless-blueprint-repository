export interface DynamoDbRepositoryMethod {
    readonly supported: boolean

    id(): string

    allAttributes(): { [key: string]: any }
}

export class FindAllMethod implements DynamoDbRepositoryMethod {
    constructor(public readonly supported: boolean,
                public readonly methodName: string) {
    }

    id(): string {
        return "findAllMethod";
    }

    allAttributes() {
        return {
            "methodName": this.methodName
        };
    }
}

export class FindByIdMethod implements DynamoDbRepositoryMethod {
    constructor(public readonly supported: boolean,
                public readonly methodName: string) {
    }

    id(): string {
        return "findByIdMethod";
    }

    allAttributes() {
        return {
            "methodName": this.methodName
        }
    }
}