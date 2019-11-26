import * as fs from 'fs';
import * as path from 'path';

export class DynamoDbRepositoryTemplateFinder {

    constructor(private templatePath: string = "../resources/repositoryClass.template") {
    }

    load(templatePath: string = this.templatePath): string {
        const filePath = path.join(__dirname, templatePath);
        return fs.readFileSync(filePath, "utf8");
    }
}