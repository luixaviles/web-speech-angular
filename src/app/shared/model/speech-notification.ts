import { SpeechError } from './speech-error';
import { SpeechEvent } from './speech-event';

export interface SpeechNotification<T> {
    event?: SpeechEvent;
    error?: SpeechError;
    content?: T;
}
