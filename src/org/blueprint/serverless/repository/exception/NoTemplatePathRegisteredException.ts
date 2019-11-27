export class NoTemplatePathRegisteredException extends Error {
    constructor(methodId) {
        super(`No template path found for methodId ${methodId}`)
    }
}