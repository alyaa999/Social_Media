import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tailwind-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tailwind-test.component.html',
  styleUrls: ['./tailwind-test.component.css']
})
export class TailwindTestComponent {
  colorPalette = [
    // Base colors
    'base-black', 'base-white', 'redis-red', 'hyper-04', 'hyper-05', 'hyper-07', 'hyper-09', 'hyper-10',
    'black-90', 'black-70', 'black-60', 'black-50', 'black-30', 'black-10',
    'grey-50', 'grey-20', 'grey-10', 'light-gray',
    'midnight', 'dusk', 'dusk-01', 'dusk-09', 'dusk-90', 'dusk-70', 'dusk-50', 'dusk-30', 'dusk-10',
    'violet', 'violet-90', 'violet-50', 'violet-10',
    'sky-blue', 'sky-blue-50', 'sky-blue-10', 'light-blue',
    'yellow', 'yellow-06', 'yellow-08', 'yellow-50', 'yellow-10',
    // Semantic keys
    'primary-button-bg', 'primary-button-bg-hover', 'primary-button-border', 'primary-button-border-hover',
    'primary-button-fg', 'primary-button-fg-hover', 'primary-button-border-active', 'primary-button-bg-active', 'primary-button-fg-active',
    'secondary-button-bg', 'secondary-button-bg-hover', 'secondary-button-border', 'secondary-button-border-hover',
    'secondary-button-fg', 'secondary-button-fg-hover', 'secondary-button-border-active', 'secondary-button-bg-active', 'secondary-button-fg-active',
    'tertiary-button-bg', 'tertiary-button-bg-hover', 'tertiary-button-fg', 'tertiary-button-fg-hover', 'tertiary-button-bg-active', 'tertiary-button-fg-active',
    'bg-default-hover', 'bg-default', 'bg-muted', 'bg-subtle',
    'fg-tagline', 'fg-default', 'fg-body', 'fg-brand', 'fg-muted',
    'border', 'stroke-divider', 'marketo-form-border', 'toggle-bg', 'toggle-fg',
    'form-input-bg', 'form-input-placeholder', 'form-input-fg', 'form-input-border', 'form-input-focused-border'
  ];

  getBgClass(color: string): string[] {
    if (color === 'transparent' || color.includes('transparent')) {
      return ['bg-white', 'border', 'border-dashed', 'border-black-30'];
    }
    return ['bg-' + color];
  }
}


