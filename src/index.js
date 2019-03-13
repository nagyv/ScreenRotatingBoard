import { ScreenRotatingBoard } from './ScreenRotatingBoard'

const myScreens = myScreens || new ScreenRotatingBoard(ScreenRotatingBoardConfig.wrapper, ScreenRotatingBoardConfig);
myScreens.start()
