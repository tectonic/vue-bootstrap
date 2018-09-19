import Vue from 'vue';
import { expect } from 'chai';
import { initVM } from './utils.js';
import Panel from '../src/Panel.vue';

describe('Panel', () => {
  it('renders a panel with heading and footer', (done) => {
    const vm = new Vue({
      template:  `<panel ref="panel">
                    <template slot="heading">Heading</template>
                    This is the content.
                    <template slot="footer">Footer</template>
                  </panel>`,
      components: {
        Panel
      }
    }).$mount();

    const panel = vm.$refs.panel;

    expect(panel.hasHeading).to.be.true;
    expect(panel.hasFooter).to.be.true;
    expect(panel.hasExtra).to.be.false;

    Vue.nextTick(() => {
      expect(panel.$el.querySelector('.panel-heading').textContent).contains('Heading');
      expect(panel.$el.querySelector('.panel-body').textContent).contains('This is the content.');
      expect(panel.$el.querySelector('.panel-footer').textContent).contains('Footer');

      done();
    });
  });
});
