import { ScreenRotatingBoard } from './ScreenRotatingBoard'
import config from './config.json'

const myScreens = myScreens || new ScreenRotatingBoard(config.wrapper, config);
myScreens.start()
