import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { validColorValidator } from 'ngx-colors';
import { Platform, UpdatePlatformRequestBody } from '@activepieces/ee-shared';
import { Observable, map, tap } from 'rxjs';
import {
  AuthenticationService,
  PlatformService,
} from '@activepieces/ui/common';
import { ActivatedRoute } from '@angular/router';

interface AppearanceForm {
  name: FormControl<string>;
  fullLogoUrl: FormControl<string>;
  logoIconUrl: FormControl<string>;
  favIconUrl: FormControl<string>;
  primaryColor: FormControl<string>;
  pickerCtrl: FormControl<string>;
}
@Component({
  selector: 'app-platform-appearance',
  templateUrl: './platform-appearance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformAppearanceComponent implements OnInit {
  logoFileExtensions: string[] = ['.png', '.jpeg', '.jpg', '.svg', '.webp'];
  formGroup: FormGroup<AppearanceForm>;
  loading = false;
  updatePlatform$?: Observable<void>;
  title = $localize`Appearance`;
  @Input({ required: true }) platform!: Platform;
  constructor(
    private fb: FormBuilder,
    private platformService: PlatformService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.fb.group({
      name: this.fb.control(
        {
          disabled: false,
          value: '',
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      favIconUrl: this.fb.control(
        {
          disabled: false,
          value: '',
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      logoIconUrl: this.fb.control(
        {
          disabled: false,
          value: '',
        },
        {
          validators: [Validators.required],
          nonNullable: true,
        }
      ),
      fullLogoUrl: this.fb.control(
        {
          disabled: false,
          value: '',
        },
        {
          validators: [Validators.required],
          nonNullable: true,
        }
      ),
      primaryColor: this.fb.control(
        {
          disabled: false,
          value: '#6e41e2',
        },
        {
          validators: [Validators.required, validColorValidator],
          nonNullable: true,
        }
      ),
      pickerCtrl: this.fb.control(
        {
          disabled: false,
          value: '#6e41e2',
        },
        { nonNullable: true }
      ),
    });
  }
  ngOnInit(): void {
    this.platform = this.route.snapshot.data['platform'];
    this.formGroup.patchValue({
      ...this.platform,
      pickerCtrl: this.platform.primaryColor,
    });
  }
  save() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid && !this.loading) {
      this.loading = true;
      const request: UpdatePlatformRequestBody = {
        favIconUrl: this.formGroup.value.favIconUrl,
        fullLogoUrl: this.formGroup.value.fullLogoUrl,
        logoIconUrl: this.formGroup.value.logoIconUrl,
        name: this.formGroup.value.name,
        primaryColor: this.formGroup.value.primaryColor,
      };
      request;
      this.platformService;
      const platformId = this.authenticationService.getPlatformId();
      if (!platformId) {
        console.error('no platform in localstorage or it is invalid');
        return;
      }
      this.updatePlatform$ = this.platformService
        .updatePlatform(request, platformId)
        .pipe(
          tap(() => {
            this.loading = false;
            window.location.reload();
          }),
          map(() => void 0)
        );
    }
  }
}
