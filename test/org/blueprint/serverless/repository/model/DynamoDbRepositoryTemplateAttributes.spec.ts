import {expect} from "chai";
import {DynamoDbRepositoryTemplateAttributes} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplateAttributes";

describe('DynamoDb Repository Template Attributes', () => {

    it('should return zero methods to be synthesized', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "")
            .build();

        let methodsToBeSynthesized = dynamoDbRepositoryTemplateAttributes.methodsToBeSynthesized();

        expect(methodsToBeSynthesized).to.be.empty;
    });

    it('should return single method to be synthesized', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "")
            .findAllMethodBuilder().withMethodName("findAll").build()
            .build();

        let methodsToBeSynthesized = dynamoDbRepositoryTemplateAttributes.methodsToBeSynthesized();

        expect(methodsToBeSynthesized.length).to.equal(1);
    });

    it('should return single findAll method to be synthesized', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "").findAllMethodBuilder().withMethodName("findAll").build()
            .build();

        let methodsToBeSynthesized = dynamoDbRepositoryTemplateAttributes.methodsToBeSynthesized();

        expect(methodsToBeSynthesized[0].id()).to.equal("findAllMethod");
    });

    it('should return repository attributes for generating repository code', () => {
        let dynamoDbRepositoryTemplateAttributes = DynamoDbRepositoryTemplateAttributes
            .builder("ServerlessRepository", "table")
            .findAllMethodBuilder().withMethodName("scan").build()
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