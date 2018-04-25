import { combineReducers } from 'redux';
import srcImage from './srcImage';
import selections from './selections';
import settings from './settings';
import obfuscatingImage from './obfuscatedImage';

const app = combineReducers({
  srcImage,
  selections,
  settings,
  obfuscatingImage,
});

export default app;

