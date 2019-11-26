import * as chai from 'chai';
import {expect} from 'chai';
import 'mocha';

import {
    DynamoDbRepositoryMethodIdTemplatePathMapping,
    NoTemplatePathRegisteredException
} from "../../../../../../src/org/blueprint/serverless/repository/model/DynamoDbRepositoryMethodIdTemplatePathMapping";

describe('DynamoDb Repository Method Id Template Path Mapping', () => {

    it('should load the template give method id', () => {
        let instance = DynamoDbRepositoryMethodIdTemplatePathMapping.instance();

        instance
            .addTemplateMapping(
                {
                    "mock": "../../../../../../test/org/blueprint/serverless/repository/resources/mock.template"
                });

        let template = instance.loadTemplateBy("mock");
        expect(template).to.equal("Integration test template");
    });

    it('should throw an exception given method id not found in the mapping', () => {
        let instance = DynamoDbRepositoryMethodIdTemplatePathMapping.instance();

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