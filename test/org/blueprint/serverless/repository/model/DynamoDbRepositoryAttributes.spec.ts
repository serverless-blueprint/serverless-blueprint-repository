import {expect} from "chai";
import {DynamoDbRepositoryTemplateAttributes} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplateAttributes";

describe('DynamoDb Repository Attributes', () => {

    it('should return empty supported methods', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "")
            .build();

        let supportedMethods = dynamoDbRepositoryTemplateAttributes.supportedMethods();

        expect(supportedMethods).to.be.empty;
    });

    it('should return single supported method', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "")
            .supportFindAllMethod()
            .build();

        let supportedMethods = dynamoDbRepositoryTemplateAttributes.supportedMethods();

        expect(supportedMethods.length).to.equal(1);
    });

    it('should return single findAll supported method', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "")
            .supportFindAllMethod()
            .build();

        let supportedMethods = dynamoDbRepositoryTemplateAttributes.supportedMethods();

        expect(supportedMethods[0].id()).to.equal("findAllMethod");
    });

    it('should return repository attributes for generating repository code', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "table")
            .supportFindAllMethod()
            .withFindAllMethodName("scan")
            .withRegion("us-west-1")
            .build();

        let attributes = dynamoDbRepositoryTemplateAttributes.get();
        const expectedRepositoryAttributes = {
            "findAllMethod": {
                "methodName": "scan"
            },
            "className": "ServerlessRepository",
            "tableName": "table",
            "region": "us-west-1"
        };

        expect(attributes).to.deep.equal(expectedRepositoryAttributes);
    });
});