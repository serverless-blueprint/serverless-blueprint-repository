import {MethodIds} from "./MethodIds";

export abstract class DynamoDbRepositoryMethod {
    readonly shouldSynthesize: boolean;

    abstract id(): string

    abstract allAttributes(): { [key: string]: any }

    idToAttributeMapping() {
        return {
            [this.id()]: this.allAttributes()
        }
    }
}

export class FindAllMethod extends DynamoDbRepositoryMethod {
    constructor(public readonly shouldSynthesize: boolean,
                public readonly methodName: string) {
        super();
    }

    static doNotSynthesize() {
        return new FindAllMethod(false, "findAll");
    }

    id(): string {
        return MethodIds.FindAll;
    }

    allAttributes() {
        return {
            "methodName": this.methodName
        };
    }
}

export class FindByIdMethod extends DynamoDbRepositoryMethod {
    constructor(public readonly shouldSynthesize: boolean,
                public readonly methodName: string,
                public readonly keyColumnName: string) {
        super();
    }

    static doNotSynthesize() {
        return new FindByIdMethod(false, "findAll", "id");
    }

    id(): string {
        return MethodIds.FindById;
    }

    allAttributes() {
        return {
            "methodName": this.methodName,
            "keyColumnName": this.keyColumnName
        }
    }
}