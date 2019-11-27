import * as fs from 'fs';
import * as path from 'path';

export type MethodIdToTemplateMapping = { [key: string]: string };

export class DynamoDbRepositoryTemplateStore {

    private static ref: DynamoDbRepositoryTemplateStore;

    private mapping: MethodIdToTemplateMapping;

    constructor() {
        this.mapping = {
            "findAllMethod": "../resources/findAllMethod.template",
            "findByIdMethod": "../resources/findByIdMethod.template"
        };
    }

    static instance() {
        if (DynamoDbRepositoryTemplateStore.ref == null)
            DynamoDbRepositoryTemplateStore.ref = new DynamoDbRepositoryTemplateStore();

        return DynamoDbRepositoryTemplateStore.ref;
    }

    loadTemplateBy(methodId: string) {
        let templatePath = this.mapping[methodId];
        if (templatePath == undefined) {
            throw new NoTemplatePathRegisteredException(methodId);
        }
        const filePath = path.join(__dirname, templatePath);
        return fs.readFileSync(filePath, "utf8");
    }

    loadRepositoryClassTemplate() {
        const filePath = path.join(__dirname, "../resources/repositoryClass.template");
        return fs.readFileSync(filePath, "utf8");
    }

    addTemplateMapping(mapping: MethodIdToTemplateMapping) {
        this.mapping = {...this.mapping, ...mapping}
    }
}

export class NoTemplatePathRegisteredException extends Error{
    constructor(methodId) {
        super(`No template path found for methodId ${methodId}`)
    }
}