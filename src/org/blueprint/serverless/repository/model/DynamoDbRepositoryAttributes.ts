import {DynamoDbRepositoryMethod, FindAllMethod, FindByIdMethod} from "./DynamoDbRepositoryMethods";

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

    repositoryAttributes() {
        let idToAttributeMappings = this.supportedMethods().map(method => method.idToAttributeMapping());
        let reducedIdToAttributeMapping = Object.assign({}, ...idToAttributeMappings);

        return {
            ...reducedIdToAttributeMapping, ...{
                className: this.className,
                tableName: this.tableName,
                region: this.region
            }
        };
    }
}

class DynamoDbRepositoryAttributeBuilder {
    private region: string = "us-east-1";
    private findAllMethodSupported: boolean = false;
    private findAllMethodName: string = "findAll";

    private findByIdMethodSupported: boolean = false;
    private findByIdMethodName: string = "findById";
    private findByIdKeyColumnName: string = "id";

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

    withFindByIdKeyColumnName(name: string) {
        this.findByIdKeyColumnName = name;
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
                    this.findByIdMethodName,
                    this.findByIdKeyColumnName))
        );
    }
}