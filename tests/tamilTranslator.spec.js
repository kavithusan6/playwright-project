const { test, expect } = require('@playwright/test');

const TEST_CASES = [
  { id: 'Pos_Fun_0001', input: 'naan  netru  thaan   vanthanan ', expected: 'நான்  நேற்று  தான்   வந்தான் ' },

  { id: 'Pos_Fun_0002', input: 'nee naalakku kandi poviya?', expected: 'நீ நாளைக்கு கண்டி போவியா?' },

  { id: 'Pos_Fun_0003', input: 'indaiku naan office mudinju sapida poram ', expected: 'இண்டைக்கு நான் ஆபீஸ் முடிஞ்சு சாப்பிட போறம் ' },

  { id: 'Pos_Fun_0004', input: 'naan padippen appuram vela seiven', expected: 'நான்  படிப்பேன்  அப்புறம்  வேல  செய்வேன் ' },

  { id: 'Pos_Fun_0005', input: 'indaiku weather nallaa irukku adhaan naan veliya ponen', expected: 'இண்டைக்கு  வெஅத்தேர்  நல்லா  இருக்கு  அதான்  நான்  வெளிய  போனேன் ' },

  { id: 'Pos_Fun_0006', input: 'Diltan arumai uncle ien makan', expected: 'தில்தான்  அருமை  அங்கிள்  இன்  மகன்  ' },

  { id: 'Pos_Fun_0007', input: 'Shiromy romba azhaga irukkaa', expected: 'ஷிரோமி ரொம்ப அழகா இருக்கா' },

  { id: 'Pos_Fun_0008', input: 'Nee eppo assignment submit seiyappogirai?', expected: 'நீ எப்போ அச்சிஞ்மேங்ட் சப்மிட் செய்யப்போகிறாய்?' },

  { id: 'Pos_Fun_0009', input: 'naan maama voda kadalukku poren', expected: 'நான்  மாமா  வோட  கடலுக்கு  போறேன்  ' },

  { id: 'Pos_Fun_0010', input: 'Athithya enai nesikum oru anpu sakothari', expected: 'ஆதித்ய  என்னை  நேசிக்கும்  ஒரு  அன்பு  சகோதரி ' },

  { id: 'Pos_Fun_0011', input: 'naan indaiku oru kadaila saapiden', expected: 'நான்  இண்டைக்கு  ஒரு  கடைல  சாப்பிட்டேன்  ' },

  { id: 'Pos_Fun_0012', input: 'Neengal kaalaiyil Eththanai manikku elumbugireergal?', expected: 'நீங்கள் காலையில் எத்தனை மணிக்கு எழும்புகிறீர்கள்?' },

  { id: 'Pos_Fun_0013', input: 'konjam help panraiya?', expected: 'கொஞ்சம்  ஹெல்ப்  பண்றியா?' },

  { id: 'Pos_Fun_0014', input: 'Avan naalai payanam pogiraan', expected: 'அவன்  நாளை  பயணம்  போகிறான் ' },

  { id: 'Pos_Fun_0015', input: 'Nee enka pora', expected: 'நீ என்க போற' },

  { id: 'Pos_Fun_0016', input: 'enaku athu vendam', expected: 'எனக்கு  அது  வேண்டாம்   ' },

  { id: 'Pos_Fun_0017', input: 'indaiku  kapal varukenrathu', expected: 'இண்டைக்கு  கப்பல் வருகின்றது    ' },

  { id: 'Pos_Fun_0018', input: 'epdi iruka?', expected: 'எப்படி  இருக்க     ' },

  { id: 'Pos_Fun_0019', input: 'nalaku class Eththanai maniku ', expected: 'நாளைக்கு கிளாஸ் எத்தனை மணிக்கு' },

  { id: 'Pos_Fun_0020', input: 'naan oru manavan ', expected: 'நான் ஒரு மாணவன்  ' },

  { id: 'Pos_Fun_0021', input: 'Neenkal eaan epadi pakurenkal? ', expected: 'நீங்கள் ஏன் எப்படி பாக்குறீங்கள்?  ' },

  { id: 'Pos_Fun_0022', input: 'Saran epovum sapiduvan', expected: 'சரண் எப்போவும் சாப்பிடுவான்  ' },

  { id: 'Pos_Fun_0023', input: 'kovil mani kekum ', expected: 'கோவில் மணி கேக்கும்  ' },

  { id: 'Pos_Fun_0024', input: 'nalaiku padasalai vedumurai', expected: 'நாளைக்கு பாடசாலை விடுமுறை  ' },

  { id: 'Neg_Fun_0025', input: 'indaiku kapal varukenrathu', expected: 'இண்டைக்கு கப்பல் வருகிறது ' },

  { id: 'Neg_Fun_0026', input: 'enna seyyanum', expected: 'என்ன செய்யவேண்டும் ' },

  { id: 'Neg_Fun_0027', input: 'avanga office poganum', expected: 'அவர்கள் ஆபீசுக்கு போகனும்  ' },

  { id: 'Neg_Fun_0028', input: 'avan pazhaya car vaangiRaan ', expected: 'அவன் பழைய கார்வாங்கிறான்  ' },

  { id: 'Neg_Fun_0029', input: 'enna samayal seivathu', expected: 'என்ன சமையல் செய்ய்வது' },

  { id: 'Neg_Fun_0030', input: 'neenga ready ah irukkeenga', expected: 'நீங்கள் ரெடி ஆ இருக்கீங்கா' },

  { id: 'Neg_Fun_0031', input: 'avan vanga book?', expected: 'அவன் வாங்கும் புத்தகம்!' },

  { id: 'Neg_Fun_0032', input: 'naan tea kudikkiren', expected: 'நான் டீ குடிக்கிறேன்!' },

  { id: 'Neg_Fun_0033', input: 'unga veedu periya veedu', expected: 'உங்க வீடு பெரிய வீடு aa' },

   { id: 'Neg_Fun_0034', input: 'ennai marandhutaanga', expected: 'என்னை மறந்துடாங்க' },










];

async function runTest(page, testInfo, inputText, expected) {
  await page.goto('https://tamil.changathi.com');
  const input = page.locator('textarea, input[type="text"]').first();
  await input.fill('');
  // Type character-by-character with delay to emulate user typing
  await input.type(inputText, { delay: 75 });
  // Press space to trigger transliteration
  await page.keyboard.press('Space');

  // Poll for conversion
  const attempts = 8;
  const waitMs = 800;
  let output = '';
  for (let i = 0; i < attempts; i++) {
    output = await input.inputValue();
    if (output && output.includes(expected)) break;
    await page.waitForTimeout(waitMs);
  }

  // Attach test data for reporters
  await testInfo.attach('test-data', { body: Buffer.from(JSON.stringify({ input: inputText, expected, output })), contentType: 'application/json' });

  const normalize = (s) => (s || '').replace(/\s+/g, ' ').trim();
  expect(normalize(output)).toContain(normalize(expected));
}

for (const tc of TEST_CASES) {
  test(tc.id + ' - ' + tc.input, async ({ page }, testInfo) => {
    await runTest(page, testInfo, tc.input, tc.expected);
  });
}
