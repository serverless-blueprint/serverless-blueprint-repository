import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import {DynamoDbRepositoryRenderer} from "../../../../../src/org/blueprint/serverless/repository/DynamoDbRepositoryRenderer";
import {DynamoDbRepositoryFeatures} from "../../../../../src/org/blueprint/serverless/repository/model/DynamoDbFeatures";
import {DynamoDbRepositoryTemplate} from "../../../../../src/org/blueprint/serverless/repository/DynamoDbRepositoryTemplate";

describe('DynamoDb Repository Renderer', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should return dynamo db repository with specified class name', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load').callsFake(() => "class {{className}}");

        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "", "");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("class ServerlessRepository", "");
    });

    it('should return dynamo db repository with dynamo db client initialized globally', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: '{{region}}'})");

        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "ap-south-1");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'})");
    });

    it('should return dynamo db repository with module.exports statement', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "module.exports = {{className}}");

        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "", "");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("module.exports = ServerlessRepository");
    });

    it('should return dynamo db repository with findAll method', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "async {{findAllMethodName}}()");

        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("async findAll()");
    });

    it('should return dynamo db repository with custom method name for findAll', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "async {{findAllMethodName}}()");

        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "", "scan");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("async scan()");
    });

    it('should return dynamo db repository with a call to scan method of dynamoDbClient', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "await dynamoDbClient.scan(request).promise()");

        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "", "findAll");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("await dynamoDbClient.scan(request).promise()");
    });
});