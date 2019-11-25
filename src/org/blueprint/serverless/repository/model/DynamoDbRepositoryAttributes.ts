import {
    FindAllMethod,
    FindByIdMethod,
    DynamoDbRepositoryMethod
} from "./DynamoDbRepositoryMethods";

export class DynamoDbRepositoryAttributes {
    constructor(public readonly className: string,
                public readonly tableName: string,
                public readonly region: string,
                private readonly methods: Array<DynamoDbRepositoryMethod>) {
    }

    static builder(className: string, tableName: string) {
        return new DynamoDbRepositoryAttributeBuilder(className, tableName)
    }

    supportedMethods(): DynamoDbRepositoryMethod[] {
        return this.methods.filter(method => method.supported)
    }
}

class DynamoDbRepositoryAttributeBuilder {
    private region: string = "us-east-1";
    private findAllMethodName: string = "findAll";
    private findByIdMethodName: string = "findById";
    private findAllMethodSupported: boolean = false;
    private findByIdMethodSupported: boolean = false;

    constructor(private className: string, private tableName: string) {
    }

    withRegion(region: string) {
        this.region = region;
        return this;
    }

    supportFindAllMethod() {
        this.findAllMethodSupported = true;
        return this;
    }

    supportFindByIdMethod() {
        this.findByIdMethodSupported = true;
        return this;
    }

    withFindAllMethodName(name: string) {
        this.findAllMethodName = name;
        return this;
    }

    withFindByIdMethodName(name: string) {
        this.findByIdMethodName = name;
        return this;
    }

    build() {
        return new DynamoDbRepositoryAttributes(
            this.className,
            this.tableName,
            this.region,
            Array.of(
                new FindAllMethod(this.findAllMethodSupported,
                    this.findAllMethodName),
                new FindByIdMethod(this.findByIdMethodSupported,
                    this.findByIdMethodName))
        );
    }
}