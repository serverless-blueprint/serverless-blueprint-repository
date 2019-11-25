import * as fs from 'fs';
import * as path from 'path';

export class DynamoDbRepositoryTemplate {

    constructor(private templatePath: string = "../resources/code.template") {
    }

    load(templatePath: string = this.templatePath): string {
        const filePath = path.join(__dirname, templatePath);
        return fs.readFileSync(filePath, "utf8");
    }
}