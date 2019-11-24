export class DynamoDbRepositoryFeatures {
    constructor(public readonly className: string,
                public readonly tableName: string,
                public readonly region: string,
                public readonly findAllMethodName: string) {
    }

    static builder(className: string, tableName: string) {
        return new DynamoDbRepositoryFeaturesBuilder(className, tableName)
    }
}

class DynamoDbRepositoryFeaturesBuilder {
    private region: string = "us-east-1";
    private findAllMethodName: string = "findAll";

    constructor(private className: string, private tableName: string) {
    }

    withRegion(region: string) {
        this.region = region;
        return this;
    }

    withFindAllMethodName(name: string) {
        this.findAllMethodName = name;
        return this;
    }

    build() {
        return new DynamoDbRepositoryFeatures(this.className,
            this.tableName, this.region, this.findAllMethodName);
    }
}