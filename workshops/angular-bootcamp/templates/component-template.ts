import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

export type ButtonKind = "primary" | "ghost" | "destructive";

@Component({
  selector: "shared-button",
  standalone: true,
  template: `
    <button
      type="button"
      class="shared-button"
      [class.shared-button--{{ kind }}]="true"
      [attr.aria-disabled]="disabled"
      (click)="handleClick($event)"
    >
      <span class="shared-button__label"><ng-content></ng-content></span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "shared-button-host",
  },
})
export class SharedButtonComponent {
  @Input({ required: true }) kind: ButtonKind = "primary";
  @Input() disabled = false;
  @Output() pressed = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.pressed.emit(event);
  }
}
