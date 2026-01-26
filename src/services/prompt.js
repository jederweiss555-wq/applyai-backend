export function buildPrompt(cv, job) {
  return `
Lebenslauf:
${cv}

Stellenanzeige:
${job}

Erstelle:
1. Anschreiben
2. Kurzprofil
3. Kernkompetenzen (Bulletpoints)
4. Motivationsabsatz
5. Interviewfragen (5)
6. Gehaltsargumentation

Sprache: Deutsch
Stil: professionell, modern, überzeugend
`;
}
