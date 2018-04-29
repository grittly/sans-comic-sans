import { combineReducers } from 'redux';
import srcImage from './srcImage';
import selections from './selections';
import settings from './settings';
import obfuscatedImage from './obfuscatedImage';

const app = combineReducers({
  srcImage,
  selections,
  settings,
  obfuscatedImage,
});

export default app;

