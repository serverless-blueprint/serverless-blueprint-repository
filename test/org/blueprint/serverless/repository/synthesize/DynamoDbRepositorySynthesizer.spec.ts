import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import {DynamoDbRepositorySynthesizer} from "../../../../../../src/org/blueprint/serverless/repository/synthesize/DynamoDbRepositorySynthesizer";
import {DynamoDbRepositoryTemplateAttributes} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplateAttributes";
import {DynamoDbRepositoryTemplateStore} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplateStore";

describe('DynamoDb Repository Synthesizer', () => {

    let dynamoDbRepositoryTemplateStoreInstance;
    let mock;

    beforeEach(() => {
        dynamoDbRepositoryTemplateStoreInstance = DynamoDbRepositoryTemplateStore.instance();
        mock = sinon.mock(dynamoDbRepositoryTemplateStoreInstance);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return dynamo db repository with specified class name', () => {

        mock.expects("loadRepositoryClassTemplate").returns("class {{className}}");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("ServerlessRepository", "").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("class ServerlessRepository");
    });

    it('should return dynamo db repository with dynamo db client initialized globally', () => {
        mock.expects("loadRepositoryClassTemplate")
            .returns("const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: '{{region}}'})");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "").withRegion("ap-south-1").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'})");
    });

    it('should return dynamo db repository with module.exports statement', () => {
        mock.expects("loadRepositoryClassTemplate").returns("module.exports = {{className}}");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("ServerlessRepository", "").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("module.exports = ServerlessRepository");
    });

    it('should return dynamo db repository with findAll method', () => {
        mock.expects("loadRepositoryClassTemplate").returns("async {{findAll.methodName}}()");
        mock.expects("loadTemplateBy").returns("");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "")
            .findAllMethodBuilder()
            .withMethodName("findAll").build()
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("async findAll()");
    });

    it('should return dynamo db repository with custom method name for findAll', () => {
        mock.expects("loadRepositoryClassTemplate").returns("async {{findAll.methodName}}()");
        mock.expects("loadTemplateBy").returns("");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "")
            .findAllMethodBuilder()
            .withMethodName("scan").build()
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("async scan()");
    });

    it('should return dynamo db repository with findById method', () => {
        mock.expects("loadRepositoryClassTemplate").returns("async {{findById.methodName}}()");
        mock.expects("loadTemplateBy").returns("");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "")
            .findByIdMethodBuilder()
            .withMethodName("findById").build()
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("async findById()");
    });

    it('should return dynamo db repository with custom method name for findById', () => {
        mock.expects("loadRepositoryClassTemplate").returns("async {{findById.methodName}}()");
        mock.expects("loadTemplateBy").returns("");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "")
            .findByIdMethodBuilder()
            .withMethodName("findByAnId").build()
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("async findByAnId()");
    });

    it('should return dynamo db repository with custom key column name for findById', () => {
        mock.expects("loadRepositoryClassTemplate").returns("{{findById.keyColumnName}}: id");
        mock.expects("loadTemplateBy").returns("");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "")
            .findByIdMethodBuilder()
            .withMethodName("findByAnId")
            .withKeyColumnName("repositoryId").build()
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("repositoryId: id");
    });

    it('should return dynamo db repository with default key column name for findById', () => {
        mock.expects("loadRepositoryClassTemplate").returns("{{findById.keyColumnName}}: id");
        mock.expects("loadTemplateBy").returns("");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "")
            .findByIdMethodBuilder()
            .withMethodName("findByAnId").build()
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("id: id");
    });

    it('should return dynamo db repository with a call to scan method of dynamoDbClient', () => {
        mock.expects("loadRepositoryClassTemplate").returns("await dynamoDbClient.scan(request).promise()");
        mock.expects("loadTemplateBy").returns("");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes.builder("", "").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryTemplateAttributes);

        expect(repositoryCode).to.equal("await dynamoDbClient.scan(request).promise()");
    });
});