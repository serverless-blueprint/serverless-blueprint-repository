import {expect} from "chai";
import {DynamoDbRepositoryAttributes} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryAttributes";

describe('DynamoDb Repository Attributes', () => {

    it('should return empty supported methods', () => {
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes
            .builder("ServerlessRepository", "")
            .build();

        let supportedMethods = dynamoDbRepositoryAttributes.supportedMethods();

        expect(supportedMethods).to.be.empty;
    });

    it('should return single supported method', () => {
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes
            .builder("ServerlessRepository", "")
            .supportFindAllMethod()
            .build();

        let supportedMethods = dynamoDbRepositoryAttributes.supportedMethods();

        expect(supportedMethods.length).to.equal(1);
    });

    it('should return single findAll supported method', () => {
        let dynamoDbRepositoryAttributes = DynamoDbRepositoryAttributes
            .builder("ServerlessRepository", "")
            .supportFindAllMethod()
            .build();

        let supportedMethods = dynamoDbRepositoryAttributes.supportedMethods();

        expect(supportedMethods[0].id()).to.equal("findAllMethod");
    });
});