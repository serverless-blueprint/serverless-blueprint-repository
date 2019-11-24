import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import {DynamoDbRepositorySynthesizer} from "../../../../../../src/org/blueprint/serverless/repository/synthesize/DynamoDbRepositorySynthesizer";
import {DynamoDbRepositoryFeatures} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryFeatures";
import {DynamoDbRepositoryTemplate} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplate";

describe('DynamoDb Repository Synthesizer', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should return dynamo db repository with specified class name', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load').callsFake(() => "class {{className}}");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "", "");
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("class ServerlessRepository", "");
    });

    it('should return dynamo db repository with dynamo db client initialized globally', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: '{{region}}'})");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "ap-south-1");
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'})");
    });

    it('should return dynamo db repository with module.exports statement', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "module.exports = {{className}}");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "", "");
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("module.exports = ServerlessRepository");
    });

    it('should return dynamo db repository with findAll method', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "async {{findAllMethodName}}()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "");
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal("async findAll()");
    });

    it('should return dynamo db repository with custom method name for findAll', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "async {{findAllMethodName}}()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "", "scan");
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("async scan()");
    });

    it('should return dynamo db repository with a call to scan method of dynamoDbClient', () => {
        sinon.stub(DynamoDbRepositoryTemplate.prototype, 'load')
            .callsFake(() => "await dynamoDbClient.scan(request).promise()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "", "", "findAll");
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("await dynamoDbClient.scan(request).promise()");
    });
});