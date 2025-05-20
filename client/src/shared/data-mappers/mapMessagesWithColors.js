import { getContrastDarkColor, getRandomDarkColor } from '@/shared/libs/utils/color.js';

export function mapMessagesWithColors(rawMessages = []) {
  const youColor = getRandomDarkColor();
  const respondentColor = getContrastDarkColor(youColor);

  return rawMessages.map((msg, idx) => ({
    ...msg,
    color: idx % 2 === 0 ? respondentColor : youColor
  }));
}
