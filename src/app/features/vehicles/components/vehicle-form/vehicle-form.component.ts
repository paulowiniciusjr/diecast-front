import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehicle } from '../../models/vehicle.model';
import { ColorConverter } from '../../../../shared/color.converter';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class VehicleFormComponent implements OnChanges {

  @Input() vehicle?: Vehicle;

  @Output() save = new EventEmitter<Vehicle>();
  @Output() cancel = new EventEmitter<void>();

  @Input() submitting = false;
  @Input() mode: 'view' | 'edit' | 'create' = 'create';

  form!: FormGroup;
  colorSuggestions: string[] = [];
  showSuggestions = false;
  ColorConverter = ColorConverter;

  private colorNames = [
    // Português
    'vermelho', 'vermelho escuro', 'azul', 'azul escuro', 'verde', 'verde escuro',
    'amarelo', 'amarelo claro', 'laranja', 'laranja escuro', 'roxo', 'roxo escuro',
    'rosa', 'cinza', 'cinza claro', 'cinza escuro', 'preto', 'branco', 'marrom',
    'menta', 'ouro', 'prata',
    // English
    'red', 'dark red', 'blue', 'dark blue', 'green', 'dark green',
    'yellow', 'light yellow', 'orange', 'dark orange', 'purple', 'dark purple',
    'pink', 'gray', 'light gray', 'dark gray', 'black', 'white', 'brown',
    'mint', 'gold', 'silver'
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      scale: ['', Validators.required],
      vehicleBrand: ['', Validators.required],
      vehicleDiecastBrand: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnChanges() {
    if (this.vehicle) {
      const colorName = ColorConverter.getColorName(this.vehicle.color);
      this.form.patchValue({
        ...this.vehicle,
        color: colorName
      });
    } else {
      this.form.reset();
    }

    if (this.mode === 'view') {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const colorValue = this.form.value.color;
    const hexColor = /^#[0-9a-f]{6}$/i.test(colorValue) ? colorValue : ColorConverter.parse(colorValue);

    this.save.emit({
      ...this.form.value,
      color: hexColor,
      id: this.vehicle?.id
    });

    setTimeout(() => {
      this.cancel.emit();
    }, 1000);
  }

  onColorInput(value: string): void {
    const trimmed = value.trim().toLowerCase();

    if (!trimmed) {
      this.showSuggestions = false;
      return;
    }

    this.colorSuggestions = this.colorNames.filter(color =>
      color.toLowerCase().includes(trimmed)
    );
    this.showSuggestions = this.colorSuggestions.length > 0;
  }

  selectColor(colorName: string): void {
    this.form.patchValue({ color: colorName });
    this.showSuggestions = false;
  }

  onColorKeypress(event: KeyboardEvent, inputValue: string): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      const trimmed = inputValue.trim().toLowerCase().replace(/\s+/g, '');
      const validColor = this.colorNames.find(c => c.toLowerCase().replace(/\s+/g, '') === trimmed);

      if (validColor) {
        this.form.patchValue({ color: validColor });
      } else {
        this.form.patchValue({ color: inputValue });
      }
      this.showSuggestions = false;
    }
  }

  getColorPreview(): string {
    const colorValue = this.form.get('color')?.value;
    if (!colorValue) return '#888888';

    const hex = /^#[0-9a-f]{6}$/i.test(colorValue) ? colorValue : ColorConverter.parse(colorValue);
    return hex;
  }
}
