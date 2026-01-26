import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Vehicle } from '../../models/vehicle.model';

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
      this.form.patchValue(this.vehicle);
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

    this.save.emit({
      ...this.form.value,
      id: this.vehicle?.id
    });

    setTimeout(() => {
      this.cancel.emit();
    }, 1000);
  }

}
