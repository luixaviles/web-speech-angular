import { ActionStrategy } from './action-strategy';
import { Theme } from '../theme';
import { Action } from '../action';
import { StyleManager } from '../../../../shared/style-manager/style-manager';
import { SpeechSynthesizerService } from '../../../shared/services/speech-synthesizer.service';

export class ChangeColorStrategy extends ActionStrategy {
    private mapStartSignal: Map<string, string> = new Map<string, string>();
    private mapEndSignal: Map<string, string> = new Map<string, string>();
    
    private mapInitResponse: Map<string, string> = new Map<string, string>();
    private mapFinishResponse: Map<string, string> = new Map<string, string>();

    private styleManager: StyleManager = new StyleManager();
    private speechSynthesizer: SpeechSynthesizerService = new SpeechSynthesizerService();

    private themes: Theme[] = [
        {
          keyword: 'deep purple',
          href: 'deeppurple-amber.css'
        },
        {
          keyword: 'indigo',
          href: 'indigo-pink.css'
        },
        {
          keyword: 'pink',
          href: 'pink-bluegrey.css'
        },
        {
          keyword: 'purple',
          href: 'purple-green.css'
        }
      ];

    constructor() {
        super();
        this.mapStartSignal.set('en-US', 'enable color');
        this.mapStartSignal.set('es-ES', 'activar color');
        
        this.mapEndSignal.set('en-US', 'disable color');
        this.mapEndSignal.set('es-ES', 'desactivar color');

        this.mapInitResponse.set('en-US', 'Please, tell me your color.');
        this.mapInitResponse.set('es-ES', 'Por favor, mencione un color de tema.');
        
        this.mapFinishResponse.set('en-US', 'Your action has been completed.');
        this.mapFinishResponse.set('es-ES', 'La accion ha sido finalizada.');
    }
    
    getStartSignal(language: string): string {
        return this.mapStartSignal.get(language);
    }
    
    getEndSignal(language: string): string {
        return this.mapEndSignal.get(language);
    }

    getInitialResponse(language: string): string {
        return this.mapInitResponse.get(language);
    }
    getFinishResponse(language: string): string {
        return this.mapFinishResponse.get(language);
    }

    runAction(input: string): void {
        console.log('runAction. changeTheme', input);
        let theme = this.themes.find((theme) => {
          return input.toLocaleLowerCase() === theme.keyword;
        });
    
        if (theme) { 
          this.styleManager.removeStyle('theme');
          this.styleManager.setStyle('theme', `assets/theme/${theme.href}`);
          this.speechSynthesizer.speak(`Changing Theme of the Application to ${theme.keyword}`);
        }
    }
}