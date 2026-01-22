"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLandingPageService = void 0;
class DeleteLandingPageService {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(id_landing) {
        await this.landingPageRepository.delete(id_landing);
    }
}
exports.DeleteLandingPageService = DeleteLandingPageService;
