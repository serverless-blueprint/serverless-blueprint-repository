import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryTemplateAttributes} from "../model/DynamoDbRepositoryTemplateAttributes";
import {DynamoDbRepositoryTemplateFinder} from "../model/DynamoDbRepositoryTemplateFinder";

export class DynamoDbRepositorySynthesizer {

    private dynamoDbRepositoryTemplateFinder: DynamoDbRepositoryTemplateFinder;

    constructor() {
        this.dynamoDbRepositoryTemplateFinder = new DynamoDbRepositoryTemplateFinder();
    }

    synthesize(dynamoDbRepositoryTemplateAttributes: DynamoDbRepositoryTemplateAttributes): string {

        let template = this.dynamoDbRepositoryTemplateFinder.load();
        let attributes = dynamoDbRepositoryTemplateAttributes.get();

        let includes = this.findSubTemplatesFor(dynamoDbRepositoryTemplateAttributes.supportedMethods());
        return new StringTemplate(template).mergeWith(attributes, includes);
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