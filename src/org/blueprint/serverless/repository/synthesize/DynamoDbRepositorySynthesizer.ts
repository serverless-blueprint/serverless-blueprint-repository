import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryTemplateAttributes} from "../model/DynamoDbRepositoryTemplateAttributes";
import {DynamoDbRepositoryMethodIdTemplatePathMapping} from "../model/DynamoDbRepositoryMethodIdTemplatePathMapping";

export class DynamoDbRepositorySynthesizer {

    private dynamoDbRepositoryMethodIdTemplatePathMapping: DynamoDbRepositoryMethodIdTemplatePathMapping;

    constructor() {
        this.dynamoDbRepositoryMethodIdTemplatePathMapping = DynamoDbRepositoryMethodIdTemplatePathMapping.instance();
    }

    synthesize(dynamoDbRepositoryTemplateAttributes: DynamoDbRepositoryTemplateAttributes): string {

        let template = this.dynamoDbRepositoryMethodIdTemplatePathMapping.loadRepositoryClassTemplate();
        let attributes = dynamoDbRepositoryTemplateAttributes.get();

        let includes = this.findSubTemplatesFor(dynamoDbRepositoryTemplateAttributes.supportedMethods());
        return new StringTemplate(template).mergeWith(attributes, includes);
    }

    private findSubTemplatesFor(supportedMethods) {
        let methodIdToTemplateContentMappings = supportedMethods.map(method => {
            return {
                [method.id()]: this.dynamoDbRepositoryMethodIdTemplatePathMapping.loadTemplateBy(method.id())
            }
        });
        return Object.assign({}, ...methodIdToTemplateContentMappings);
    }
}