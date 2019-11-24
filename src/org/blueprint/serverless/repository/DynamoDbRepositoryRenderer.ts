import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryFeatures} from "./model/DynamoDbFeatures";

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


export class DynamoDbRepositoryRenderer {
    render(dynamoDbRepositoryFeatures: DynamoDbRepositoryFeatures): string {
        return new StringTemplate(dynamoDbRepositoryTemplate)
            .mergeWith(dynamoDbRepositoryFeatures);
    }
}