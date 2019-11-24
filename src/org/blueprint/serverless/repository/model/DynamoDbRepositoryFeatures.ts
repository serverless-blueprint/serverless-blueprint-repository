export class DynamoDbRepositoryFeatures {
    constructor(public readonly className: string,
                public readonly tableName: string,
                public readonly region: string,
                public readonly findAllMethodSupported: boolean,
                public readonly findAllMethodName: string,
                public readonly findByIdMethodSupported: boolean,
                public readonly findByIdMethodName: string) {
    }

    static builder(className: string, tableName: string) {
        return new DynamoDbRepositoryFeaturesBuilder(className, tableName)
    }

    isFindAllRequired(): boolean {
        return this.findAllMethodSupported;
    }

    isFindByIdRequired(): boolean {
        return this.findByIdMethodSupported;
    }
}

class DynamoDbRepositoryFeaturesBuilder {
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
        return new DynamoDbRepositoryFeatures(
            this.className,
            this.tableName,
            this.region,
            this.findAllMethodSupported,
            this.findAllMethodName,
            this.findByIdMethodSupported,
            this.findByIdMethodName);
    }
}