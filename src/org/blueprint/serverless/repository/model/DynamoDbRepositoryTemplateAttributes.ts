import {DynamoDbRepositoryMethod, FindAllMethod, FindByIdMethod} from "./DynamoDbRepositoryMethods";

export class DynamoDbRepositoryTemplateAttributes {
    constructor(public readonly className: string,
                public readonly tableName: string,
                public readonly region: string,
                private readonly methods: Array<DynamoDbRepositoryMethod>) {
    }

    static builder(className: string, tableName: string) {
        return new DynamoDbRepositoryTemplateAttributesBuilder(className, tableName)
    }

    methodsToBeSynthesized(): DynamoDbRepositoryMethod[] {
        return this.methods.filter(method => method.shouldSynthesize)
    }

    get() {
        let idToAttributeMappings = this.methodsToBeSynthesized().map(method => method.idToAttributeMapping());
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

class DynamoDbRepositoryTemplateAttributesBuilder {
    private region: string = "us-east-1";

    private findAllMethod: FindAllMethod = FindAllMethod.doNotSynthesize();
    private findByIdMethod: FindByIdMethod = FindByIdMethod.doNotSynthesize();

    constructor(private className: string, private tableName: string) {
    }

    withRegion(region: string) {
        this.region = region;
        return this;
    }

    findAllMethodBuilder() {
        return new DynamoDbRepositoryFindAllMethodBuilder(this);
    }

    findByIdMethodBuilder() {
        return new DynamoDbRepositoryFindByIdMethodBuilder(this);
    }

    withFindAllMethod(findAllMethod: FindAllMethod) {
        this.findAllMethod = findAllMethod;
    }

    withFindByIdMethod(findByIdMethod: FindByIdMethod) {
        this.findByIdMethod = findByIdMethod;
    }

    build() {
        return new DynamoDbRepositoryTemplateAttributes(
            this.className,
            this.tableName,
            this.region,
            Array.of(this.findAllMethod, this.findByIdMethod));
    }
}

class DynamoDbRepositoryFindAllMethodBuilder {

    private readonly dynamoDbRepositoryTemplateAttributesBuilder: DynamoDbRepositoryTemplateAttributesBuilder;

    private shouldSynthesize: boolean = true;
    private methodName: string = "findAll";

    constructor(dynamoDbRepositoryTemplateAttributesBuilder: DynamoDbRepositoryTemplateAttributesBuilder) {
        this.dynamoDbRepositoryTemplateAttributesBuilder = dynamoDbRepositoryTemplateAttributesBuilder;
    }

    withMethodName(name: string) {
        this.methodName = name;
        return this;
    }

    build() {
        this.dynamoDbRepositoryTemplateAttributesBuilder.withFindAllMethod(
            new FindAllMethod(
                this.shouldSynthesize,
                this.methodName)
        );
        return this.dynamoDbRepositoryTemplateAttributesBuilder;
    }
}

class DynamoDbRepositoryFindByIdMethodBuilder {

    private readonly dynamoDbRepositoryTemplateAttributesBuilder: DynamoDbRepositoryTemplateAttributesBuilder;

    private shouldSynthesize: boolean = true;
    private methodName: string = "findById";
    private keyColumnName: string = "id";

    constructor(dynamoDbRepositoryTemplateAttributesBuilder: DynamoDbRepositoryTemplateAttributesBuilder) {
        this.dynamoDbRepositoryTemplateAttributesBuilder = dynamoDbRepositoryTemplateAttributesBuilder;
    }

    withMethodName(name: string) {
        this.methodName = name;
        return this;
    }

    withKeyColumnName(name: string) {
        this.keyColumnName = name;
        return this;
    }

    build() {
        this.dynamoDbRepositoryTemplateAttributesBuilder.withFindByIdMethod(
            new FindByIdMethod(
                this.shouldSynthesize,
                this.methodName,
                this.keyColumnName)
        );
        return this.dynamoDbRepositoryTemplateAttributesBuilder;
    }
}