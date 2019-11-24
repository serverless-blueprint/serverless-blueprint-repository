import {expect} from 'chai';
import 'mocha';

class DynamoDbRepositoryRenderer {
    render(dynamoDbRepositoryFeatures: DynamoDbRepositoryFeatures): string {
        return `const dynamo = new AWS.DynamoDB.DocumentClient({region: '${dynamoDbRepositoryFeatures.region}'});`
        + `class ${dynamoDbRepositoryFeatures.className}`;
    }
}

class DynamoDbRepositoryFeatures {
    constructor(public readonly className: string, public readonly region: string) {
    }
}

describe('DynamoDb Repository Renderer', () => {

    it('should return dynamo db repository with specified class name', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "ap-south-1");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("class ServerlessRepository", "");
    });

    it('should return dynamo db repository dynamo db client initialized globally', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "ap-south-1");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("const dynamo = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'});");
    });
});