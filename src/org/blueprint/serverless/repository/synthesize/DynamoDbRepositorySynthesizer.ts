import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryFeatures} from "../model/DynamoDbRepositoryFeatures";
import {DynamoDbRepositoryTemplate} from "../model/DynamoDbRepositoryTemplate";

export class DynamoDbRepositorySynthesizer {

    private dbRepositoryTemplate: DynamoDbRepositoryTemplate;

    constructor() {
        this.dbRepositoryTemplate = new DynamoDbRepositoryTemplate();
    }

    synthesize(dynamoDbRepositoryFeatures: DynamoDbRepositoryFeatures): string {

        let allSupportedFeatures = dynamoDbRepositoryFeatures.supportedFeatures();

        let map = allSupportedFeatures
            .map(feature => {
                return {
                    [feature.featureId()]: feature.all()
                }
            });

        let combined = Object.assign({}, ...map);
        let data = {
            ...combined, ...{
                className: dynamoDbRepositoryFeatures.className,
                tableName: dynamoDbRepositoryFeatures.tableName,
                region: dynamoDbRepositoryFeatures.region
            }
        };

        let map1 = allSupportedFeatures.map(feature => {
            return {
                [feature.featureId()]: this
                    .dbRepositoryTemplate
                    .load("../resources/" + feature.featureId() + ".template")
            }
        });
        let includes = Object.assign({}, ...map1);

        let template = this.dbRepositoryTemplate.load();
        return new StringTemplate(template).mergeWith(data, includes);
    }
}