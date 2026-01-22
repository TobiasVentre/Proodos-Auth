"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLandingPageByIdService = void 0;
class GetLandingPageByIdService {
    constructor(landingPageRepository, logger) {
        this.landingPageRepository = landingPageRepository;
        this.logger = logger;
    }
    async execute(id_landing) {
        this.logger.info("[Service] GetLandingPageByIdService.execute()", { id_landing });
        return await this.landingPageRepository.getById(id_landing);
    }
}
exports.GetLandingPageByIdService = GetLandingPageByIdService;
