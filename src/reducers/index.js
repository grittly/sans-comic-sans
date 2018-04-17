import { combineReducers } from 'redux';
import srcImage from './srcImage';
import selections from './selections';

const app = combineReducers({
  srcImage,
  selections,
})

export default app;

