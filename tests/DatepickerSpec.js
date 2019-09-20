import Vue from 'vue';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Datepicker from '../src/Datepicker.vue';

describe('Datepicker', () => {
  it('has a created hook', () => {
    expect(typeof Datepicker.created).to.equal('function');
  });

  it('initialises with default data', () => {
    expect(typeof Datepicker.data).to.equal('function');

    const data = Datepicker.data();

    expect(data.view).to.equal('calendar');
    expect(data.isOpen).to.be.false;
    expect(data.date).to.be.null;
  });

  it('sets dateInput when created', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        value: '2017-02-01'
      }
    });

    expect(datepicker.vm.dateInput).to.equal('2017-02-01');
  });

  it('should select all days in a month', () => {
    const datepicker = shallowMount(Datepicker);

    const days = datepicker.vm.daysInMonth(1, 2017);

    expect(days).to.be.an('array');
    expect(days.length).to.equal(28);
    expect(days[0]).to.be.a('date');
  });

  it('should select all past days until it reaches first day of the week', () => {
    const datepicker = shallowMount(Datepicker);

    const pastDays = datepicker.vm.pastDays(datepicker.vm.daysInMonth(1, 2017));

    expect(pastDays).to.be.an('array');
    expect(pastDays.length).to.equal(3);
    expect(pastDays[0].getDay()).to.equal(0); // Sunday
  });

  it('should select all future days until it reaches last day of the week', () => {
    const datepicker = shallowMount(Datepicker);

    const futureDays = datepicker.vm.futureDays(datepicker.vm.daysInMonth(1, 2017));

    expect(futureDays).to.be.an('array');
    expect(futureDays.length).to.equal(4);
    expect(futureDays[futureDays.length - 1].getDay()).to.equal(6); // Saturday
  });

  it('should format date', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        mode: 'datetime'
      }
    });

    const date = new Date(2017, 1, 1, 12, 10, 10);

    expect(datepicker.vm.formatDate(date)).to.equal('2017-02-01');
    expect(datepicker.vm.formatTime(date)).to.equal('12:10');
    expect(datepicker.vm.formatDateTime(date)).to.equal('2017-02-01 12:10');
  });

  it('should recognise a date within current month', () => {
    const datepicker = shallowMount(Datepicker);

    datepicker.vm.month = 1;
    datepicker.vm.year = 2017;

    const date1 = new Date(2017, 1, 1, 12, 10, 10);
    const date2 = new Date(2017, 5, 1, 12, 10, 10);

    expect(datepicker.vm.isWithinCurrentMonth(date1)).to.be.true;
    expect(datepicker.vm.isWithinCurrentMonth(date2)).to.be.false;
  });

  it('should validate date format', () => {
    const datepicker = shallowMount(Datepicker);

    const date1 = '2017-02-21';
    const date2 = '2017-02-21 12:10';
    const date3 = '2017/02/21 12.10';

    expect(datepicker.vm.validFormat(date1)).to.be.true;
    expect(datepicker.vm.validFormat(date2)).to.be.true;
    expect(datepicker.vm.validFormat(date3)).to.be.false;
  });

  it('should parse date', () => {
    const datepicker = shallowMount(Datepicker);

    const parsedDate = datepicker.vm.parseDate('2017-02-21');

    expect(parsedDate).to.be.a('date');

    expect(parsedDate.getFullYear()).to.equal(2017);
    expect(parsedDate.getMonth()).to.equal(1);
    expect(parsedDate.getDate()).to.equal(21);
  });

  it('should pad a value', () => {
    const datepicker = shallowMount(Datepicker);

    const paddedValue = datepicker.vm.pad(1);

    expect(paddedValue).to.equal('01');
  });

  it('should detect today', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        value: '2019-08-01'
      }
    });

    expect(datepicker.vm.isToday(new Date(2012, 10, 1))).to.equal(false);
    expect(datepicker.vm.isToday(new Date())).to.equal(true);
  });

  it('should flush the input', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        value: '2019-08-01'
      }
    });

    datepicker.vm.clearDateSelected();

    expect(datepicker.vm.dateInput).to.equal('');
  });

  it('formats date', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        value: '2019-08-01 14:05'
      }
    });

    expect(datepicker.vm.formatDate(datepicker.vm.date)).to.equal('2019-08-01');
  });

  it('formats time', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        value: '2019-08-01 14:05'
      }
    });

    expect(datepicker.vm.formatTime(datepicker.vm.date)).to.equal('14:05');
  });

  it('set hour', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        value: '2019-08-01 14:30',
        mode: 'datetime'
      }
    });

    datepicker.vm.setHour('08');

    expect(datepicker.vm.dateInput).to.equal('2019-08-01 08:30');
  });

  it('set minutes', () => {
    const datepicker = shallowMount(Datepicker, {
      propsData: {
        value: '2019-08-01 14:30',
        mode: 'datetime'
      }
    });

    datepicker.vm.setMinutes('05');

    expect(datepicker.vm.dateInput).to.equal('2019-08-01 14:05');
  });
});
