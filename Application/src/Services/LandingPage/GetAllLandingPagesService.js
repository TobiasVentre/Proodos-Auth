"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLandingPagesService = void 0;
class GetAllLandingPagesService {
    constructor(landingPageRepository, logger) {
        this.landingPageRepository = landingPageRepository;
        this.logger = logger;
    }
    async execute() {
        this.logger.info("[Service] GetAllLandingPagesService.execute()");
        return await this.landingPageRepository.getAll();
    }
}
exports.GetAllLandingPagesService = GetAllLandingPagesService;
