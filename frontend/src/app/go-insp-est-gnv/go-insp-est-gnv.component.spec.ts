import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoInspEstGnvComponent } from './go-insp-est-gnv.component';

describe('GoInspEstGnvComponent', () => {
  let component: GoInspEstGnvComponent;
  let fixture: ComponentFixture<GoInspEstGnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoInspEstGnvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoInspEstGnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
