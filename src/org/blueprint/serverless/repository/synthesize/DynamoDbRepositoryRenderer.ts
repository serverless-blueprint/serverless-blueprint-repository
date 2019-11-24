import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryFeatures} from "../model/DynamoDbRepositoryFeatures";
import {DynamoDbRepositoryTemplate} from "../model/DynamoDbRepositoryTemplate";

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