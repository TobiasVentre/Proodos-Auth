"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLandingPageService = void 0;
class CreateLandingPageService {
    constructor(landingPageRepository, logger) {
        this.landingPageRepository = landingPageRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreateLandingPageService.execute()");
        return await this.landingPageRepository.create(dto);
    }
}
exports.CreateLandingPageService = CreateLandingPageService;
