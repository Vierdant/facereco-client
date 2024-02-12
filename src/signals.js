import { signal } from '@preact/signals-react';
import { updateAuthState } from './auth';

export const authed = signal(false);
updateAuthState();