import pdf from 'pdf-parse';

export async function parsePDF(buffer) {
  const data = await pdf(buffer);
  return data.text;
}
