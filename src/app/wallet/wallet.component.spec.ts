import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WalletComponent} from './wallet.component';
import {WalletModule} from './wallet.module';
import {PageObject} from '../../utils/pageObject';
import {DebugElement} from '@angular/core';
import {Purchase} from '../model/purchase';

const purchasesMock: Purchase[] = [
  {
    title: 'Проезд на метро',
    price: 1700,
    date: new Date(2017, 10, 3)
  },
  {
    title: 'IPhone X 256gb',
    price: 91990,
    date: new Date(2017, 10, 3)
  },
  {
    title: 'Лапша "Доширак"',
    price: 40,
    date: new Date(2017, 10, 3)
  }
];

const purchasesMockTotal = purchasesMock.reduce((sum, {price}) => sum + price, 0);

describe('WalletComponent | компонент кошелька', () => {
  class Page extends PageObject<WalletComponent> {
    get title(): DebugElement {
      return this.getByAutomationId('title');
    }

    get subtitle(): DebugElement {
      return this.getByAutomationId('subtitle');
    }

    get togglePurchaseBtn(): DebugElement {
      return this.getByAutomationId('toggle-purchase-btn');
    }

    get newPurchaseForm(): DebugElement {
      return this.getByAutomationId('new-purchase-form');
    }

    get total(): DebugElement {
      return this.getByAutomationId('total');
    }

    getPurchasePreview(i: number): DebugElement {
      return this.getByAutomationId('purchase-preview-' + i);
    }
  }

  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WalletModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('создается', () => {
    expect(component).toBeTruthy();
  });

  describe('при инициализации компонент', () => {
    it('содержит заголовок', () => {
      expect(page.title !== null).toBeTruthy();
      expect(page.text(page.title)).toBe('Мой первый кошелек');
    });

    it('содержит подзаголовок', () => {
      expect(page.subtitle !== null).toBeTruthy();
      expect(page.text(page.subtitle)).toBe('Ваши расходы за последнюю неделю');
    });

    it('содержит кнопку "Добавить"', () => {
      expect(page.togglePurchaseBtn !== null).toBeTruthy();
      expect(page.text(page.togglePurchaseBtn)).toBe('Добавить');
    });

    it('блок добавления покупки скрыт', () => {
      expect(page.newPurchaseForm === null).toBeTruthy();
    });

    describe('клик на "Добавить"', () => {
      beforeEach(() => {
        page.click(page.togglePurchaseBtn);
        fixture.detectChanges();
      });

      it('изменяет текст кнопки на "Отменить"', () => {
        expect(page.text(page.togglePurchaseBtn)).toBe('Отменить');
      });

      it('показывает блок добавления покупки', () => {
        expect(page.newPurchaseForm !== null).toBeTruthy();
      });

      describe('второй клик на кнопку', () => {
        beforeEach(() => {
          page.click(page.togglePurchaseBtn);
          fixture.detectChanges();
        });

        it('изменяет текст кнопки на "Добавить"', () => {
          expect(page.text(page.togglePurchaseBtn)).toBe('Добавить');
        });

        it('скрывает блок добавления покупки', () => {
          expect(page.newPurchaseForm === null).toBeTruthy();
        });
      });
    });

    it('сразу же загружает первые три элемента', () => {
      expect(component.purchases).toEqual(purchasesMock);
    });

    it('сразу же высчитывает общую сумму', () => {
      expect(component.total).toBe(purchasesMockTotal);
    });

    it('отображает сумму в поле Итого', () => {
      component.total = 100;
      fixture.detectChanges();

      expect(page.text(page.total)).toBe(`Итого: ₽100.00`);
    });
  });

  describe('отрисовывает список элементов', () => {
    it('не отрисовывает элементы, если их нет', () => {
      component.purchases = [];
      fixture.detectChanges();

      expect(page.getPurchasePreview(0) === null).toBeTruthy();
    });

    it('отрисовывает один элемент', () => {
      component.purchases = [purchasesMock[0]];
      fixture.detectChanges();

      expect(page.getPurchasePreview(0) !== null).toBeTruthy('1-й элемент не отображен');
      expect(page.getPurchasePreview(1) === null).toBeTruthy('отображено более 1 элемента');
    });

    it('отрисовывает два элемента', () => {
      component.purchases = [purchasesMock[0], purchasesMock[1]];
      fixture.detectChanges();

      expect(page.getPurchasePreview(0) !== null).toBeTruthy('1-й элемент не отображен');
      expect(page.getPurchasePreview(1) !== null).toBeTruthy('2-й элемент не отображен');
      expect(page.getPurchasePreview(2) === null).toBeTruthy('отображено более 2 элементов');
    });
  });

  describe('onAddPurchase | добавление элемента', () => {
    beforeEach(() => {
      page.click(page.togglePurchaseBtn);
      fixture.detectChanges();
      component.onAddPurchase({
        title: 'foo',
        price: 100,
        date: new Date(2017, 10, 3)
      });
      fixture.detectChanges();
    });

    it('добавляет элемент в начало списка', () => {
      expect(component.purchases[0]).toEqual({
        title: 'foo',
        price: 100,
        date: new Date(2017, 10, 3)
      });
    });

    it('пересчитывает общую сумму', () => {
      expect(component.total).toBe(purchasesMockTotal + 100);
    });

    it('скрывает форму добавления', () => {
      expect(page.newPurchaseForm === null).toBeTruthy();
    });
  });
});
