# Solution — Exercice 02 (Typed forms & CVA)

## Implémentation CVA
```ts
@Component({
  selector: 'shared-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shared-select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SharedSelectComponent),
      multi: true,
    },
  ],
})
export class SharedSelectComponent<T> implements ControlValueAccessor {
  @Input({ required: true }) options: ReadonlyArray<{ label: string; value: T }> = [];
  @Input() placeholder = 'Sélectionner';

  protected value: T | null = null;
  protected disabled = false;

  private onChange: (value: T | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  select(option: T): void {
    if (this.disabled) return;
    this.value = option;
    this.onChange(option);
    this.onTouched();
  }
}
```

## Template + a11y
```html
<div
  class="shared-select"
  role="listbox"
  [attr.aria-disabled]="disabled"
  [attr.aria-activedescendant]="value ? 'option-' + value : null"
>
  <button type="button" (click)="toggle()" class="shared-select__trigger" aria-haspopup="listbox">
    {{ value ? getLabel(value) : placeholder }}
  </button>
  <ul *ngIf="opened">
    <li
      *ngFor="let option of options"
      role="option"
      [id]="'option-' + option.value"
      [attr.aria-selected]="option.value === value"
      (click)="select(option.value)"
    >
      {{ option.label }}
    </li>
  </ul>
</div>
```

## Formulaire typé (extrait)
```ts
readonly form = this.fb.nonNullable.group({
  email: this.fb.control<string>('', { validators: [Validators.required, Validators.email] }),
  country: this.fb.control<string | null>(null, Validators.required),
});
```

## Tests essentiels
```ts
it('should propagate value changes', () => {
  component.registerOnChange(spy);
  component.select('FR');
  expect(spy).toHaveBeenCalledWith('FR');
});

it('sets aria-invalid when control invalid', () => {
  control.setErrors({ required: true });
  control.markAsTouched();
  fixture.detectChanges();
  expect(fieldElement.getAttribute('aria-invalid')).toBe('true');
});
```

## Pitfalls & contournements
- **Generic T** : utiliser `trackBy` + `JSON.stringify` si objets complexes.
- **Focus management** : ajouter `@ViewChild` + `focus()` lors de l’ouverture du menu.
- **Accessibility** : prévoir navigation clavier (flèches + enter + esc).
