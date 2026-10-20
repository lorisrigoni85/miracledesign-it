/**
 * Grassetto nei testi dei file YAML: `**parola**` diventa <strong>parola</strong>.
 * Il resto del testo viene protetto (niente HTML dai contenuti), quindi si usa con set:html.
 */
export function emphasis(text: string): string {
  const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
