export function createToken(characterLength: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: characterLength }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
}
