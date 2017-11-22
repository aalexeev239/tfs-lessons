import {ComponentFixture} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

export class PageObject<T> {
  constructor(protected fixture: ComponentFixture<T>) {
  }

  getByAutomationId(id: string): DebugElement {
    return this.fixture.debugElement.query(By.css(`[automation-id=${id}]`));
  }

  getAllByAutomationId(id: string): DebugElement[] {
    return this.fixture.debugElement.queryAll(By.css(`[automation-id^=${id}]`));
  }

  click(selector: string | DebugElement) {
    const element = this.resolveSelector(selector);

    element.triggerEventHandler('click', null);
    this.fixture.detectChanges();
  }

  text(selector: string | DebugElement): string {
    const element = this.resolveSelector(selector);
    return element.nativeElement.textContent.trim();
  }

  inputText(selector: string | DebugElement): string {
    const element = this.resolveSelector(selector);
    return element.nativeElement.value.trim();
  }

  private resolveSelector(selector: string | DebugElement): DebugElement {
    return typeof selector === 'string'
      ? this.getByAutomationId(selector as string)
      : selector as DebugElement;
  }
}
