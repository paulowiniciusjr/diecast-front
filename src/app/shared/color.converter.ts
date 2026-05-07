export class ColorConverter {
  private static readonly COLOR_MAP: Record<string, string> = {
    // Português
    vermelho: '#e74c3c',
    vermelhoescuro: '#c0392b',
    azul: '#3498db',
    azulesacuro: '#2980b9',
    verde: '#2ecc71',
    verdeescuro: '#27ae60',
    amarelo: '#f1c40f',
    amareloclaro: '#f39c12',
    laranja: '#e67e22',
    laranjaescuro: '#d35400',
    roxo: '#9b59b6',
    roxoescuro: '#8e44ad',
    rosa: '#e91e63',
    cinza: '#95a5a6',
    cinzaclaro: '#bdc3c7',
    cinzaescuro: '#7f8c8d',
    preto: '#000000',
    branco: '#ffffff',
    marrom: '#8b4513',
    menta: '#1abc9c',
    ouro: '#c9a84c',
    prata: '#c0c0c0',

    // English
    red: '#e74c3c',
    darkred: '#c0392b',
    blue: '#3498db',
    darkblue: '#2980b9',
    green: '#2ecc71',
    darkgreen: '#27ae60',
    yellow: '#f1c40f',
    lightyellow: '#f39c12',
    orange: '#e67e22',
    darkorange: '#d35400',
    purple: '#9b59b6',
    darkpurple: '#8e44ad',
    pink: '#e91e63',
    gray: '#95a5a6',
    lightgray: '#bdc3c7',
    darkgray: '#7f8c8d',
    black: '#000000',
    white: '#ffffff',
    brown: '#8b4513',
    mint: '#1abc9c',
    gold: '#c9a84c',
    silver: '#c0c0c0',
  };

  static parse(value: string): string {
    if (!value) return '#888888';

    const trimmed = value.trim().toLowerCase().replace(/\s+/g, '');

    // Check if it's a valid hex color
    if (/^#[0-9a-f]{6}$/i.test(value.trim())) {
      return value.trim();
    }

    // Check if it's in the color map
    if (this.COLOR_MAP[trimmed]) {
      return this.COLOR_MAP[trimmed];
    }

    // If not recognized, return gray
    return '#888888';
  }

  static getColorName(hex: string): string {
    const normalized = hex.toLowerCase();
    for (const [name, color] of Object.entries(this.COLOR_MAP)) {
      if (color.toLowerCase() === normalized) {
        return name;
      }
    }
    return hex;
  }
}
