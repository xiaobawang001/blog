export function toIconSvg(raw: string, size = 16) {
  return raw
    .replace(/<\?xml[\s\S]*?\?>/, '')
    .replace(/<!DOCTYPE[\s\S]*?>/, '')
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/\s(width|height)="[^"]*"/g, '')
    .replace('<svg', `<svg width="${size}" height="${size}" aria-hidden="true"`)
}
