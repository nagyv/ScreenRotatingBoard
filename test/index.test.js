import 'jsdom-global/register'
import { expect } from 'chai';
import sinon from 'sinon';
import { ScreenRotatingBoard, ImageHandler, HTMLHandler, YoutubeHandler } from '../src';

describe('ScreenRotatingBoard', () => {
  let oldDocument

  beforeEach(() => {
    sinon.spy(document, "getElementById");
  })
  afterEach(() => {
    document.getElementById.restore()
  })

  it('has widgets defined', () => {
    expect(ScreenRotatingBoard.widgets.image).to.equal(ImageHandler);
    expect(ScreenRotatingBoard.widgets.html).to.equal(HTMLHandler);
    expect(ScreenRotatingBoard.widgets.youtube).to.equal(YoutubeHandler);
  });
  it('is constructed with a content element ID', () => {
    const tmp = new ScreenRotatingBoard('testID')
    expect(document.getElementById.callCount).to.equal(1)
    expect(document.getElementById.getCall(0).args[0]).to.equal('testID')
  })
  it('starts with the first active index', () => {
    const tmp = new ScreenRotatingBoard('testID', {
      screens: [{ type: 'image' }]
    })
    sinon.stub(tmp, '_renderWidget')
    tmp.start()
    expect(tmp._activeWidgetIdx).to.equal(0)
    expect(tmp._renderWidget.callCount).to.equal(1)
  })
  it('rotates with its next call', () => {
    const tmp = new ScreenRotatingBoard('testID', {
      screens: [{ type: 'image' }, {type: 'image'}]
    })
    sinon.stub(tmp, '_renderWidget')
    tmp.start()
    expect(tmp._activeWidgetIdx).to.equal(0)
    tmp.next()
    expect(tmp._activeWidgetIdx).to.equal(1)
    expect(tmp._renderWidget.callCount).to.equal(2)
    tmp.next()
    expect(tmp._activeWidgetIdx).to.equal(0)
    expect(tmp._renderWidget.callCount).to.equal(3)
  })
});
