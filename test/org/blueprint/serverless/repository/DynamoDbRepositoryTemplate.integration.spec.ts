import {expect} from 'chai';
import 'mocha';

import {DynamoDbRepositoryTemplate} from "../../../../../src/org/blueprint/serverless/repository/DynamoDbRepositoryTemplate";

describe('DynamoDb Repository Template', () => {

    it('should load the template give template path', () => {
        let dynamoDbRepositoryTemplate =
            new DynamoDbRepositoryTemplate("../../../../../test/org/blueprint/serverless/repository/resources/integration-test.template");

        let template = dynamoDbRepositoryTemplate.load();
        expect(template).to.equal("Integration test template");
    });
});