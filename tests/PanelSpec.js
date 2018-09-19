import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import Panel from '../src/Panel.vue';

describe('Panel', () => {
  it('renders a panel with heading and footer', (done) => {
    const vm = new Vue({
      template:  `<panel ref="panel">
                    <div slot="heading">Heading</div>
                    This is the content.
                    <div slot="footer">Footer</div>
                  </panel>`,
      components: {
        Panel
      }
    }).$mount();

    const panel = vm.$refs.panel;

    expect(panel.hasHeading).to.be.true;
    expect(panel.hasFooter).to.be.true;

    Vue.nextTick(() => {
      expect(panel.$el.querySelector('.panel-heading').textContent).to.equal('Heading');
      expect(panel.$el.querySelector('.panel-body').textContent).contains('This is the content.');
      expect(panel.$el.querySelector('.panel-footer').textContent).to.equal('Footer');

      done();
    });
  });
});
