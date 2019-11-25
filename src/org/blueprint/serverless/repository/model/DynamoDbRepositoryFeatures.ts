import {
    FindAllMethodFeatures,
    FindByIdMethodFeatures,
    MethodFeatures
} from "./DynamoDbMethodFeatures";

export class DynamoDbRepositoryFeatures {
    constructor(public readonly className: string,
                public readonly tableName: string,
                public readonly region: string,
                private readonly methodFeatures: Array<MethodFeatures>) {
    }

    static builder(className: string, tableName: string) {
        return new DynamoDbRepositoryFeaturesBuilder(className, tableName)
    }

    supportedFeatures(): MethodFeatures[] {
        return this.methodFeatures.filter(feature => feature.methodSupported)
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
            Array.of(
                new FindAllMethodFeatures(this.findAllMethodSupported,
                    this.findAllMethodName),
                new FindByIdMethodFeatures(this.findByIdMethodSupported,
                    this.findByIdMethodName))
        );
    }
}