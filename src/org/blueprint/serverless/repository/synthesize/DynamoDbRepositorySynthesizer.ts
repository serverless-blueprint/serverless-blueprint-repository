import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryAttributes} from "../model/DynamoDbRepositoryAttributes";
import {DynamoDbRepositoryTemplateFinder} from "../model/DynamoDbRepositoryTemplateFinder";

export class DynamoDbRepositorySynthesizer {

    private dynamoDbRepositoryTemplateFinder: DynamoDbRepositoryTemplateFinder;

    constructor() {
        this.dynamoDbRepositoryTemplateFinder = new DynamoDbRepositoryTemplateFinder();
    }

    synthesize(dynamoDbRepositoryAttributes: DynamoDbRepositoryAttributes): string {

        let template = this.dynamoDbRepositoryTemplateFinder.load();
        let placeholders = dynamoDbRepositoryAttributes.repositoryAttributes();

        let includes = this.findSubTemplatesFor(dynamoDbRepositoryAttributes.supportedMethods());
        return new StringTemplate(template).mergeWith(placeholders, includes);
    }

    private findSubTemplatesFor(supportedMethods) {
        let methodIdToTemplateContentMappings = supportedMethods.map(method => {
            return {
                [method.id()]: this.dynamoDbRepositoryTemplateFinder.load(`../resources/${method.id()}.template`)
            }
        });
        return Object.assign({}, ...methodIdToTemplateContentMappings);
    }
}