import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryTemplateAttributes} from "../model/DynamoDbRepositoryTemplateAttributes";
import {DynamoDbRepositoryTemplateStore} from "../model/DynamoDbRepositoryTemplateStore";

export class DynamoDbRepositorySynthesizer {

    private dynamoDbRepositoryTemplateStore: DynamoDbRepositoryTemplateStore;

    constructor() {
        this.dynamoDbRepositoryTemplateStore = DynamoDbRepositoryTemplateStore.instance();
    }

    synthesize(dynamoDbRepositoryTemplateAttributes: DynamoDbRepositoryTemplateAttributes): string {

        let template = this.dynamoDbRepositoryTemplateStore.loadRepositoryClassTemplate();
        let includes = this.findSubTemplatesFor(dynamoDbRepositoryTemplateAttributes.methodsToBeSynthesized());
        let attributes = dynamoDbRepositoryTemplateAttributes.get();

        return new StringTemplate(template).mergeWith(attributes, includes);
    }

    private findSubTemplatesFor(methods) {
        let methodIdToTemplateContentMappings = methods.map(method => {
            return {
                [method.id()]: this.dynamoDbRepositoryTemplateStore.loadTemplateBy(method.id())
            }
        });
        return Object.assign({}, ...methodIdToTemplateContentMappings);
    }
}