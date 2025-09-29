import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "shared-form-field",
  standalone: true,
  template: `
    <label class="shared-form-field" [class.shared-form-field--error]="errorMessage">
      <span class="shared-form-field__label">
        <ng-container *ngIf="labelTemplate; else defaultLabel">
          <ng-container *ngTemplateOutlet="labelTemplate"></ng-container>
        </ng-container>
        <ng-template #defaultLabel>{{ label }}</ng-template>
      </span>
      <ng-content></ng-content>
      <p *ngIf="hint" class="shared-form-field__hint" id="{{ id }}-hint">{{ hint }}</p>
      <p *ngIf="errorMessage" class="shared-form-field__error" id="{{ id }}-error" role="alert">
        {{ errorMessage }}
      </p>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SharedFormFieldComponent,
      multi: true,
    },
  ],
})
export class SharedFormFieldComponent implements ControlValueAccessor {
  @Input({ required: true }) id!: string;
  @Input() label = "";
  @Input() hint = "";
  @Input() errorMessage = "";
  @ContentChild("label", { read: TemplateRef }) labelTemplate?: TemplateRef<unknown>;

  private onChange: (value: unknown) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(): void {}
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(): void {}
}
