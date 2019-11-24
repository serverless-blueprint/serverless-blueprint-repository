import {expect} from 'chai';
import 'mocha';
import {StringTemplate} from 'serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate.js'

const dynamoDbRepositoryTemplate = `
const dynamo = new AWS.DynamoDB.DocumentClient({region: '{{region}}'});

class {{className}} {

    async {{scanMethodName}}() {
        const tableName = "{{tableName}}"
        const request = {
            TableName: {{tableName}}
        };
        const promise = await dynamoDbClient.scan(request).promise();
        return promise.Items;
    }
}

 module.exports = {{className}};
`;

class DynamoDbRepositoryRenderer {
    render(dynamoDbRepositoryFeatures: DynamoDbRepositoryFeatures): string {
        return new StringTemplate(dynamoDbRepositoryTemplate)
            .mergeWith(dynamoDbRepositoryFeatures);
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

        console.log(repositoryCode);

        expect(repositoryCode).to.contains("class ServerlessRepository", "");
    });

    it('should return dynamo db repository dynamo db client initialized globally', () => {
        let dynamoDbRepositoryRenderer = new DynamoDbRepositoryRenderer();
        let dynamoDbRepositoryFeatures = new DynamoDbRepositoryFeatures("", "ap-south-1");
        let repositoryCode = dynamoDbRepositoryRenderer.render(dynamoDbRepositoryFeatures);

        expect(repositoryCode).to.contains("const dynamo = new AWS.DynamoDB.DocumentClient({region: 'ap-south-1'});");
    });
});