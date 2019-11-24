import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryFeatures} from "./model/DynamoDbFeatures";
import {DynamoDbRepositoryTemplate} from "./DynamoDbRepositoryTemplate";

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