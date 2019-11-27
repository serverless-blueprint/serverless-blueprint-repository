import {NoTemplatePathRegisteredException} from "../../../../../../src/org/blueprint/serverless/repository/exception/NoTemplatePathRegisteredException";
import {expect} from "chai";

describe('NoTemplatePathRegisteredException', () => {

    it("should return the exception message given method id", () => {
        let exception = new NoTemplatePathRegisteredException("method0");
        expect(exception.message).to.equal("No template path found for methodId method0");
    });
});