import { CoordinatorGuard } from "./Login/Guards/coordinator.guard"
import { HeadGuard } from "./Login/Guards/head.guard"
import { ReviewerGuard } from "./Login/Guards/reviewer.guard"
import { TraineeGuard } from "./Login/Guards/trainee.guard"
import { TrainerGuard } from "./Login/Guards/trainer.guard"

export const GUARD = {
    co: CoordinatorGuard,
    head: HeadGuard,
    trainer: TrainerGuard,
    trainee: TraineeGuard,
    reviewer: ReviewerGuard
}