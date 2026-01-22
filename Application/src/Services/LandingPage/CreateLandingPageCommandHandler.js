"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLandingPageCommandHandler = void 0;
const LandingPageMapper_1 = require("./LandingPageMapper");
class CreateLandingPageCommandHandler {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(command) {
        const landing = LandingPageMapper_1.LandingPageMapper.fromCreateCommand(command);
        return await this.landingPageRepository.create(landing);
    }
}
exports.CreateLandingPageCommandHandler = CreateLandingPageCommandHandler;
