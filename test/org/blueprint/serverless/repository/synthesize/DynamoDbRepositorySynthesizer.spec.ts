import {expect} from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import {DynamoDbRepositorySynthesizer} from "../../../../../../src/org/blueprint/serverless/repository/synthesize/DynamoDbRepositorySynthesizer";
import {DynamoDbRepositoryAttributes} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryAttributes";
import {DynamoDbRepositoryTemplateFinder} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplateFinder";

describe('DynamoDb Repository Synthesizer', () => {

    afterEach(() => {
        sinon.restore();
    });

    it('should return dynamo db repository with specified class name', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load').callsFake(() => "class {{className}}");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("ServerlessRepository", "").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("class ServerlessRepository", "");
    });

    it('should return dynamo db repository with dynamo db client initialized globally', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: '{{region}}'})");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "").withRegion("ap-south-1").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'})");
    });

    it('should return dynamo db repository with module.exports statement', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "module.exports = {{className}}");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("ServerlessRepository", "").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("module.exports = ServerlessRepository");
    });

    it('should return dynamo db repository with findAll method', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "async {{findAllMethod.methodName}}()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "")
            .supportFindAllMethod()
            .withFindAllMethodName("findAll")
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("async findAll()");
    });

    it('should return dynamo db repository with custom method name for findAll', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "async {{findAllMethod.methodName}}()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "")
            .supportFindAllMethod()
            .withFindAllMethodName("scan")
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("async scan()");
    });

    it('should return dynamo db repository with findById method', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "async {{findByIdMethod.methodName}}()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "")
            .supportFindByIdMethod()
            .withFindByIdMethodName("findById")
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("async findById()");
    });

    it('should return dynamo db repository with custom method name for findById', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "async {{findByIdMethod.methodName}}()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "")
            .supportFindByIdMethod()
            .withFindByIdMethodName("findByAnId")
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("async findByAnId()");
    });

    it('should return dynamo db repository with custom key column name for findById', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "{{findByIdMethod.keyColumnName}}: id");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "")
            .supportFindByIdMethod()
            .withFindByIdMethodName("findByAnId")
            .withFindByIdKeyColumnName("repositoryId")
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("repositoryId: id");
    });

    it('should return dynamo db repository with default key column name for findById', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "{{findByIdMethod.keyColumnName}}: id");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "")
            .supportFindByIdMethod()
            .withFindByIdMethodName("findByAnId")
            .build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("id: id");
    });

    it('should return dynamo db repository with a call to scan method of dynamoDbClient', () => {
        sinon.stub(DynamoDbRepositoryTemplateFinder.prototype, 'load')
            .callsFake(() => "await dynamoDbClient.scan(request).promise()");

        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes.builder("", "").build();
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal("await dynamoDbClient.scan(request).promise()");
    });
});