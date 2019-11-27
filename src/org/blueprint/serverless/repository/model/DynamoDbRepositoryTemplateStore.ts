import * as fs from 'fs';
import * as path from 'path';
import {NoTemplatePathRegisteredException} from "../exception/NoTemplatePathRegisteredException";

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

    private static joinDirectoryPathWith(templatePath): string {
        return path.join(__dirname, templatePath)
    }

    loadTemplateBy(methodId: string) {
        let templatePath = this.mapping[methodId];
        if (templatePath == undefined) {
            throw new NoTemplatePathRegisteredException(methodId);
        }

        const filePath = DynamoDbRepositoryTemplateStore.joinDirectoryPathWith(templatePath);
        return fs.readFileSync(filePath, "utf8");
    }

    loadRepositoryClassTemplate() {
        const filePath = DynamoDbRepositoryTemplateStore
            .joinDirectoryPathWith("../resources/repositoryClass.template");

        return fs.readFileSync(filePath, "utf8");
    }

    addTemplateMapping(mapping: MethodIdToTemplateMapping) {
        this.mapping = {...this.mapping, ...mapping}
    }
}