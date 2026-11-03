import { TestBed } from '@angular/core/testing';
import { DiceRoller } from './dice-roller';

describe('DiceRoller', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const rollWith = (random: number) => {
    vi.spyOn(Math, 'random').mockReturnValue(random);
    const fixture = TestBed.createComponent(DiceRoller);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    vi.advanceTimersByTime(1000);
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.die').getAttribute('aria-label');
  };

  it('shows a six-pip die before rolling', () => {
    const fixture = TestBed.createComponent(DiceRoller);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.pip.on').length).toBe(6);
  });

  it('rolls a 1 at the low bound', () => {
    expect(rollWith(0)).toBe('Rolled 1');
  });

  it('rolls a 6 at the high bound', () => {
    expect(rollWith(0.999)).toBe('Rolled 6');
  });
});


