"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLandingPageByIdQueryHandler = void 0;
class GetLandingPageByIdQueryHandler {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(query) {
        return await this.landingPageRepository.getById(query.id_landing);
    }
}
exports.GetLandingPageByIdQueryHandler = GetLandingPageByIdQueryHandler;
