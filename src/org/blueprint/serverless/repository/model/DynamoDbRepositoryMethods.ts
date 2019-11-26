export abstract class DynamoDbRepositoryMethod {
    readonly supported: boolean;

    abstract id(): string

    abstract allAttributes(): { [key: string]: any }

    idToAttributeMapping() {
        return {
            [this.id()]: this.allAttributes()
        }
    }
}

export class FindAllMethod extends DynamoDbRepositoryMethod {
    constructor(public readonly supported: boolean,
                public readonly methodName: string) {
        super();
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

export class FindByIdMethod extends DynamoDbRepositoryMethod {
    constructor(public readonly supported: boolean,
                public readonly methodName: string,
                public readonly keyColumnName: string) {
        super();
    }

    id(): string {
        return "findByIdMethod";
    }

    allAttributes() {
        return {
            "methodName": this.methodName,
            "keyColumnName": this.keyColumnName
        }
    }
}