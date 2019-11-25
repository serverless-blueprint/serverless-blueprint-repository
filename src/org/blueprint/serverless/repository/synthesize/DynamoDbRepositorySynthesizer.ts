import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryAttributes} from "../model/DynamoDbRepositoryAttributes";
import {DynamoDbRepositoryTemplate} from "../model/DynamoDbRepositoryTemplate";

export class DynamoDbRepositorySynthesizer {

    private dbRepositoryTemplate: DynamoDbRepositoryTemplate;

    constructor() {
        this.dbRepositoryTemplate = new DynamoDbRepositoryTemplate();
    }

    synthesize(dynamoDbRepositoryAttributes: DynamoDbRepositoryAttributes): string {

        let template = this.dbRepositoryTemplate.load();
        let placeholders = dynamoDbRepositoryAttributes.repositoryAttributes();

        let includes = this.findSubTemplatesFor(dynamoDbRepositoryAttributes.supportedMethods());
        return new StringTemplate(template).mergeWith(placeholders, includes);
    }

    private findSubTemplatesFor(supportedMethods) {
        let methodIdToTemplateContentMappings = supportedMethods.map(method => {
            return {
                [method.id()]: this.dbRepositoryTemplate.load(`../resources/${method.id()}.template`)
            }
        });
        return Object.assign({}, ...methodIdToTemplateContentMappings);
    }
}