import {expect} from 'chai';
import 'mocha';

import {DynamoDbRepositoryTemplateFinder} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplateFinder";

describe('DynamoDb Repository Template', () => {

    it('should load the template give template path', () => {
        let dynamoDbRepositoryTemplateFinder =
            new DynamoDbRepositoryTemplateFinder("../../../../../../test/org/blueprint/serverless/repository/resources/mock.template");

        let template = dynamoDbRepositoryTemplateFinder.load();
        expect(template).to.equal("Integration test template");
    });
});