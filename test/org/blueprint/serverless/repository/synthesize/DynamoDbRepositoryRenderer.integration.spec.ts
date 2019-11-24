import {expect} from 'chai';
import 'mocha';

import {DynamoDbRepositoryRenderer} from "../../../../../../src/org/blueprint/serverless/repository/synthesize/DynamoDbRepositoryRenderer";
import {DynamoDbRepositoryFeatures} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryFeatures";

describe('DynamoDb Repository Renderer (Integration Test)', () => {

    const expectedCode = `
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

    it('should return dynamo db repository code', function () {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "serverless-table", "us-east-1", "findAll");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal(expectedCode)
    });
});