import * as chai from 'chai';
import {expect} from 'chai';
import 'mocha';

import {
    DynamoDbRepositoryTemplateStore,
    NoTemplatePathRegisteredException
} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryTemplateStore";

describe('DynamoDb Repository Template Store', () => {

    it('should load the template give method id', () => {
        let instance = DynamoDbRepositoryTemplateStore.instance();

        instance
            .addTemplateMapping(
                {
                    "mock": "../../../../../../test/org/blueprint/serverless/repository/resources/mock.template"
                });

        let template = instance.loadTemplateBy("mock");
        expect(template).to.equal("Integration test template");
    });

    it('should throw an exception given method id not found in the mapping', () => {
        let instance = DynamoDbRepositoryTemplateStore.instance();

        instance
            .addTemplateMapping(
                {
                    "mock": ""
                });

        chai.expect(() => instance.loadTemplateBy("mock-non-existent"))
            .to
            .throw(NoTemplatePathRegisteredException);
    });
});