import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryFeatures} from "../model/DynamoDbRepositoryFeatures";
import {DynamoDbRepositoryTemplate} from "../model/DynamoDbRepositoryTemplate";

export class DynamoDbRepositorySynthesizer {

    private dbRepositoryTemplate: DynamoDbRepositoryTemplate;

    constructor() {
        this.dbRepositoryTemplate = new DynamoDbRepositoryTemplate();
    }

    synthesize(dynamoDbRepositoryFeatures: DynamoDbRepositoryFeatures): string {

        let template = this.dbRepositoryTemplate.load();
        let includes = {};
        if (dynamoDbRepositoryFeatures.isFindAllRequired()) {
            includes = {
                "findAllMethod": this
                    .dbRepositoryTemplate
                    .load("../resources/findAllMethod.template")
            };
        }
        if (dynamoDbRepositoryFeatures.isFindByIdRequired()) {
            includes = {
                ...includes, ...{
                    "findByIdMethod": this
                        .dbRepositoryTemplate
                        .load("../resources/findByIdMethod.template")
                }
            };
        }

        return new StringTemplate(template).mergeWith(dynamoDbRepositoryFeatures, includes);
    }
}