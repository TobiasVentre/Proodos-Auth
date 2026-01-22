"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLandingPagesQueryHandler = void 0;
class GetAllLandingPagesQueryHandler {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(_query) {
        return await this.landingPageRepository.getAll();
    }
}
exports.GetAllLandingPagesQueryHandler = GetAllLandingPagesQueryHandler;
