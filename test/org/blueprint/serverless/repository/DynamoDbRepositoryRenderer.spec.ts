import {expect} from 'chai';
import 'mocha';

class DynamoDbRepositoryRenderer {
    render(dynamoDbRepositoryFeatures: DynamoDbRepositoryFeatures): string {
        return `class ${dynamoDbRepositoryFeatures.className}`;
    }
}

class DynamoDbRepositoryFeatures {
    constructor(public readonly className: string) {
    }
}

describe('DynamoDb Repository Renderer', () => {

    it('should return dynamo db repository with specified class name', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("class ServerlessRepository");
    });
});