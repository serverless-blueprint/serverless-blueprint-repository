import {StringTemplate} from "serverless-blueprint-template-engine/src/org/blueprint/serverless/template/engine/StringTemplate";
import {DynamoDbRepositoryAttributes} from "../model/DynamoDbRepositoryAttributes";
import {DynamoDbRepositoryTemplate} from "../model/DynamoDbRepositoryTemplate";

export class DynamoDbRepositorySynthesizer {

    private dbRepositoryTemplate: DynamoDbRepositoryTemplate;

    constructor() {
        this.dbRepositoryTemplate = new DynamoDbRepositoryTemplate();
    }

    synthesize(dynamoDbRepositoryAttributes: DynamoDbRepositoryAttributes): string {

        let allSupportedMethods = dynamoDbRepositoryAttributes.supportedMethods();

        let map = allSupportedMethods
            .map(method => {
                return {
                    [method.id()]: method.allAttributes()
                }
            });

        let combined = Object.assign({}, ...map);
        let data = {
            ...combined, ...{
                className: dynamoDbRepositoryAttributes.className,
                tableName: dynamoDbRepositoryAttributes.tableName,
                region: dynamoDbRepositoryAttributes.region
            }
        };

        let map1 = allSupportedMethods.map(method => {
            return {
                [method.id()]: this
                    .dbRepositoryTemplate
                    .load("../resources/" + method.id() + ".template")
            }
        });
        let includes = Object.assign({}, ...map1);

        let template = this.dbRepositoryTemplate.load();
        return new StringTemplate(template).mergeWith(data, includes);
    }
}