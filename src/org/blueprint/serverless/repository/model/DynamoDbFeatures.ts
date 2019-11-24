export class DynamoDbRepositoryFeatures {
    constructor(public readonly className: string,
                public readonly region: string,
                public readonly tableName: string,
                public readonly findAllMethodName: string = "findAll") {
    }
}