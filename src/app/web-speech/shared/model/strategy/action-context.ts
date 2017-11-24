import { ActionStrategy } from '../strategy/action-strategy';
import { ChangeColorStrategy } from '../strategy/change-color-strategy';
import { SpeechSynthesizerService } from '../../services/speech-synthesizer.service';

export class ActionContext {
    private currentStrategy: ActionStrategy;
    private changeColorStrategy = new ChangeColorStrategy();
    private speechSynthesizer: SpeechSynthesizerService;

    processMessage(message: string, language: string) {
        if (message === this.changeColorStrategy.getStartSignal(language)) {
            this.setStrategy(this.changeColorStrategy);
            this.speechSynthesizer.speak(this.currentStrategy.getInitialResponse(language));
        }
        else if (message === this.changeColorStrategy.getEndSignal(language)) {
          this.speechSynthesizer.speak(this.currentStrategy.getFinishResponse(language));
          this.setStrategy(null);
        }
    }

    runAction(input: string) {
        if(this.currentStrategy) {
            this.currentStrategy.runAction(input);
        }
    }

    setStrategy(strategy: ActionStrategy) {
        this.currentStrategy = strategy;
    }
}