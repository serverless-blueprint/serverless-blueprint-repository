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


class DynamoDbRepositoryTemplate {

    load(): string {
        return dynamoDbRepositoryTemplate;
    }
}

export class DynamoDbRepositoryRenderer {

    private dbRepositoryTemplate: DynamoDbRepositoryTemplate;

    constructor() {
        this.dbRepositoryTemplate = new DynamoDbRepositoryTemplate();
    }

    render(dynamoDbRepositoryFeatures: DynamoDbRepositoryFeatures): string {

        let template = this.dbRepositoryTemplate.load();
        return new StringTemplate(template).mergeWith(dynamoDbRepositoryFeatures);
    }
}