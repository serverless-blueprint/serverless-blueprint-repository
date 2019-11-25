import {expect} from 'chai';
import 'mocha';

import {DynamoDbRepositorySynthesizer} from "../../../../../../src/org/blueprint/serverless/repository/synthesize/DynamoDbRepositorySynthesizer";
import {DynamoDbRepositoryAttributes} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryAttributes";

describe('DynamoDb Repository Synthesizer (Integration Test)', () => {

    const codeWithFindAll = `
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
class ServerlessRepository {

    async findAll() {
        const request = {
            TableName: "serverless-table"
        };
        const promise = await dynamoDbClient.scan(request).promise();
        return promise.Items;
    }
}

module.exports = ServerlessRepository;`.trim();

    const codeWithFindById = `
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
class ServerlessRepository {

    async findById(id) {
        const request = {
            TableName: "serverless-table",
            Key: {
                "id": id
            }
        };
        const promise = await dynamoDbClient.get(request).promise();
        return promise.Items;
    }
}

module.exports = ServerlessRepository;`.trim();

    it('should return dynamo db repository code with find all method', function () {
        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes
            .builder("ServerlessRepository", "serverless-table")
            .supportFindAllMethod()
            .withFindAllMethodName( "findAll").build();

        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal(codeWithFindAll)
    });

    it('should return dynamo db repository code with find by id method', function () {
        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes
            .builder("ServerlessRepository", "serverless-table")
            .supportFindByIdMethod()
            .withFindByIdMethodName( "findById").build();

        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryAttributes);

        expect(repositoryCode).to.equal(codeWithFindById)
    });
});