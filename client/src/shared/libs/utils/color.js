const colorDarkenLevel = 120;
export function getRandomDarkColor() {
  const r = Math.floor(Math.random() * colorDarkenLevel); // 0–127
  const g = Math.floor(Math.random() * colorDarkenLevel); // 0–127
  const b = Math.floor(Math.random() * colorDarkenLevel); // 0–127
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function getRandomLightColor() {
  const colorLightenLevel = 128; // Add this if not defined elsewhere
  const r = Math.floor(Math.random() * colorLightenLevel) + colorLightenLevel; // 128–255
  const g = Math.floor(Math.random() * colorLightenLevel) + colorLightenLevel; // 128–255
  const b = Math.floor(Math.random() * colorLightenLevel) + colorLightenLevel; // 128–255
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function getContrastDarkColor(baseColor) {
  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3)
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    const num = parseInt(hex, 16);
    return [num >> 16, (num >> 8) & 255, num & 255];
  };

  const rgbToHex = ([r, g, b]) =>
    '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

  const colorDistance = (rgb1, rgb2) => {
    return Math.sqrt(
      Math.pow(rgb1[0] - rgb2[0], 2) +
        Math.pow(rgb1[1] - rgb2[1], 2) +
        Math.pow(rgb1[2] - rgb2[2], 2)
    );
  };

  const getRandomDarkColor = () => {
    const r = Math.floor(Math.random() * colorDarkenLevel);
    const g = Math.floor(Math.random() * colorDarkenLevel);
    const b = Math.floor(Math.random() * colorDarkenLevel);
    return [r, g, b];
  };

  const baseRgb = hexToRgb(baseColor);
  let newRgb;
  let attempts = 0;

  do {
    newRgb = getRandomDarkColor();
    attempts++;
  } while (colorDistance(baseRgb, newRgb) < 100 && attempts < 10);

  return rgbToHex(newRgb);
}
