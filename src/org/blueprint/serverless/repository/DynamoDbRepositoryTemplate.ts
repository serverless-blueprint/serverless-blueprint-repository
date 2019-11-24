import * as fs from 'fs';
import * as path from 'path';

export class DynamoDbRepositoryTemplate {

    constructor(private templatePath: string = "/resources/code.template") {
    }

    load(): string {
        const filePath = path.join(__dirname, this.templatePath);
        return fs.readFileSync(filePath, "utf8");
    }
}