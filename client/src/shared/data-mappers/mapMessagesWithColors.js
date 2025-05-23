import {
  getContrastDarkColor,
  getRandomDarkColor,
  getRandomLightColor
} from '@/shared/libs/utils/color.js';

export function mapMessagesWithColors(rawMessages = [], isDark) {
  const youColor = isDark ? getRandomLightColor() : getRandomDarkColor();
  const respondentColor = getContrastDarkColor(youColor);

  return rawMessages.map((msg, idx) => ({
    ...msg,
    color: idx % 2 === 0 ? respondentColor : youColor
  }));
}
