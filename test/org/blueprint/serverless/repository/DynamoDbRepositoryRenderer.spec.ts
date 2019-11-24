import {expect} from 'chai';
import 'mocha';
import {DynamoDbRepositoryRenderer} from "../../../../../src/org/blueprint/serverless/repository/DynamoDbRepositoryRenderer";
import {DynamoDbRepositoryFeatures} from "../../../../../src/org/blueprint/serverless/repository/model/DynamoDbFeatures";

describe('DynamoDb Repository Renderer', () => {

    it('should return dynamo db repository with specified class name', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "ap-south-1");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("class ServerlessRepository", "");
    });

    it('should return dynamo db repository with dynamo db client initialized globally', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "ap-south-1");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("const dynamo = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'})");
    });

    it('should return dynamo db repository with module.exports statement', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("module.exports = ServerlessRepository");
    });

    it('should return dynamo db repository with findAll method', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("async findAll()");
    });

    it('should return dynamo db repository with custom method name for findAll', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "scan");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("async scan()");
    });
});