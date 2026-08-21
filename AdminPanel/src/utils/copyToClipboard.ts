/**
 * Robust cross-browser & LAN-friendly text copy utility.
 * Handles both secure (HTTPS) and non-secure (HTTP LAN IP) contexts.
 */
export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  if (!text) return false;

  // 1. Try modern Async Clipboard API if available in secure context
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to execCommand fallback
    }
  }

  // 2. Legacy / HTTP LAN IP Fallback (execCommand)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
};
