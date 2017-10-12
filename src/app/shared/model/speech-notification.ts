import { SpeechError } from './speech-error';
export interface SpeechNotification {
    info?: string;
    error?: SpeechError;
    content?:any;
}