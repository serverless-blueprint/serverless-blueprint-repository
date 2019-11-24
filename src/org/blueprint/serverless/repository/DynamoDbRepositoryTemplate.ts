const dynamoDbRepositoryTemplate = `
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({region: '{{region}}'});

class {{className}} {

    async {{findAllMethodName}}() {
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

export class DynamoDbRepositoryTemplate {

    load(): string {
        return dynamoDbRepositoryTemplate;
    }
}