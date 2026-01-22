"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLandingPageCommandHandler = void 0;
const LandingPageMapper_1 = require("./LandingPageMapper");
class UpdateLandingPageCommandHandler {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(command) {
        const landing = LandingPageMapper_1.LandingPageMapper.fromUpdateCommand(command);
        return await this.landingPageRepository.update(landing);
    }
}
exports.UpdateLandingPageCommandHandler = UpdateLandingPageCommandHandler;
