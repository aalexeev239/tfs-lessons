import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PurchasePreviewComponent} from './purchase-preview.component';
import {PageObject} from '../../../utils/pageObject';
import {DebugElement} from '@angular/core';
import {CommonModule} from '@angular/common';

describe('PurchasePreviewComponent | компонент превьюшки покупки', () => {
  class Page extends PageObject<PurchasePreviewComponent> {
    get header(): DebugElement {
      return this.getByAutomationId('header');
    }

    get price(): DebugElement {
      return this.getByAutomationId('price');
    }

    get previewBody(): DebugElement {
      return this.getByAutomationId('preview-body');
    }

    get date(): DebugElement {
      return this.getByAutomationId('date');
    }

    get comment(): DebugElement {
      return this.getByAutomationId('comment');
    }
  }

  let component: PurchasePreviewComponent;
  let fixture: ComponentFixture<PurchasePreviewComponent>;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [PurchasePreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasePreviewComponent);
    component = fixture.componentInstance;
    component.purchase = {
      title: 'foo',
      price: 100,
      date: new Date(2017, 10, 3)
    };
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('создается', () => {
    expect(component).toBeTruthy();
  });

  describe('инициализация', () => {
    it('выводит название покупки', () => {
      expect(page.text(page.header).indexOf('foo') > -1).toBe(true);
    });

    it('выводит стоимость покупки', () => {
      expect(page.text(page.price)).toBe('₽100.00');
    });

    it('блок с подробностями скрыт при isOpen === false', () => {
      component.isOpen = false;
      fixture.detectChanges();

      expect(page.previewBody).toBeNull();
    });

    it('блок с подробностями скрыт при isOpen === true', () => {
      component.isOpen = true;
      fixture.detectChanges();

      expect(page.previewBody).not.toBeNull();
    });

    it('клик на верхнюю часть создает внешнее событие клика', () => {
      let result = 0;
      component.previewClick.subscribe(() => {
        result++;
      });
      page.click(page.header);
      fixture.detectChanges();

      expect(result).toBe(1);
    });
  });

  describe('подробности', () => {
    beforeEach(() => {
      component.isOpen = true;
      fixture.detectChanges();
    });

    it('выводит дату', () => {
      expect(page.text(page.date)).toBe('November 3, 2017');
    });

    it('выводит комментарий, если он передан', () => {
      component.purchase.comment = 'foo';
      fixture.detectChanges();

      expect(page.text(page.comment)).toBe('foo');
    });

    it('не отображает комментарий, если он не передан', () => {
      delete component.purchase.comment;
      fixture.detectChanges();

      expect(page.comment).toBeNull();
    });
  });
});
