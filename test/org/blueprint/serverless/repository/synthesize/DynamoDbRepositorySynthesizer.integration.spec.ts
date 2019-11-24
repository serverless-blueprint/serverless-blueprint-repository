import {expect} from 'chai';
import 'mocha';

import {DynamoDbRepositorySynthesizer} from "../../../../../../src/org/blueprint/serverless/repository/synthesize/DynamoDbRepositorySynthesizer";
import {DynamoDbRepositoryFeatures} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryFeatures";

describe('DynamoDb Repository Synthesizer (Integration Test)', () => {

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
        let dynamoDbRepositorySynthesizer = new DynamoDbRepositorySynthesizer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("ServerlessRepository", "serverless-table", "us-east-1", "findAll");
        let repositoryCode = dynamoDbRepositorySynthesizer.synthesize(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.equal(expectedCode)
    });
});