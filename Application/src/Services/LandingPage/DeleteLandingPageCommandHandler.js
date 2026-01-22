"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLandingPageCommandHandler = void 0;
class DeleteLandingPageCommandHandler {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(command) {
        await this.landingPageRepository.delete(command.id_landing);
    }
}
exports.DeleteLandingPageCommandHandler = DeleteLandingPageCommandHandler;
