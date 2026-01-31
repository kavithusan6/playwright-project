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

const { test, expect } = require('@playwright/test');

const TEST_CASES = [
  { id: 'Pos_Fun_0001', input: 'naan netru thaan vanthen ', expected: 'நான்  நேற்று  தான்   வந்தான் ' },

  { id: 'Pos_Fun_0002', input: 'naan naalaiku thaan anupuven', expected: 'நான் நாளைக்கு தான் அனுப்புவேன்.' },

  { id: 'Pos_Fun_0003', input: 'ammavum naanum kandy porem. ', expected: 'அம்மாவும் நானும் கண்டி போறேம்.' },

  { id: 'Pos_Fun_0004', input: 'appa   enakku  saikkil  vaangi  thanthaar.', expected: 'அப்பா  எனக்கு சைக்கிள் வாங்கி தந்தார்.' },

  { id: 'Pos_Fun_0005', input: 'naalaiku   padasalai  vidumurai  enpathaal  ellorum  kovilkku  povom  ', expected: 'நாளைக்கு  பாடசாலை விடுமுறை என்பதால் எல்லோரும் கோவிலுக்கு போவோம் ' },

  { id: 'Pos_Fun_0006', input: 'ennaku koncham koncham singalam therium.', expected: 'என்னக்கு கொஞ்சம் கொஞ்சம் சிங்களம்   தெரியும் . ' },

  { id: 'Pos_Fun_0007', input: 'naan naalaiku thaan varuvan', expected: 'நான் நாளைக்கு தான் வருவன் ' },

  { id: 'Pos_Fun_0008', input: 'semma mass na nee', expected: 'செம்ம மாஸ் நா நீ ' },

  { id: 'Pos_Fun_0009', input: 'indaikku nalla mazhai adhunaala mathiyam  thaan  thukkaththil  erunthu  elunthen ', expected: 'இண்டைக்கு  நல்ல  மழை அதுனால  மதியம்   தான்   துக்கத்தில்   இருந்து   எழுந்தேன்   ' },

  { id: 'Pos_Fun_0010', input: 'naan onnum seiya  eyalathu  neenga   vara   thamatham  ayiddu  ', expected: 'நான்  ஒன்னும்  செய்ய   இயலாது   நீங்க    வர    தாமதம்   ஆயிட்டு  ' },

  { id: 'Pos_Fun_0011', input: 'kamal naalai payanam pogiraan', expected: 'கமல் நாளை பயணம் போகிறான்  ' },

  { id: 'Pos_Fun_0012', input: 'ennaku orukka solli tharuveengaloo?', expected: 'என்னக்கு ஒருக்கா சொல்லி தருவீங்களோ ?' },

  { id: 'Pos_Fun_0013', input: 'enakku  udampu  sari  ellai  neeye  sei.', expected: 'எனக்கு உடம்பு சரி இல்லை நீயே செய்  ' },

  { id: 'Pos_Fun_0014', input: 'naan marathuku keela erunthu vilaiyadi kondu erunthen', expected: 'நான்  மரத்துக்கு  கீழ  இருந்து  விளையாடி  கொண்டு  இருந்தேன்   ' },

  { id: 'Pos_Fun_0015', input: 'naanga  pogamadem.', expected: 'நாங்கள் போகமாடோம்' },

  { id: 'Pos_Fun_0016', input: 'naanga seivom', expected: 'நாங்க செய்வாம்   ' },

  { id: 'Pos_Fun_0017', input: 'Kanthan Thirukkural padichu varugiraan', expected: 'கந்தன் திருக்குறள் படித்து வருகிறான்  ' },

  { id: 'Pos_Fun_0018', input: 'En thandhaiyaar ennidam thaam marunaal kaalai varuvaathaai munnaal koorivittu sendraar', expected: 'என் தந்தையார் என்னிடம் தாம் மறுநாள் காலை வருவதாய் முன் நாள் கூறிவிட்டுச் சென்றார்.   ' },

  { id: 'Pos_Fun_0019', input: 'naalaiku colombo poren piraku galle kum poren. ', expected: 'நாளைக்கு கொழும்பு போறேன் பிறகு காலி கும் போறேன் .' },

  { id: 'Pos_Fun_0020', input: 'naankal malaiyel velai seivom ', expected: 'நாங்கள் மலையில் வேலை செய்வோம்  ' },

  { id: 'Pos_Fun_0021', input: 'Pasumai kangalukku kulirchiyai tharum ', expected: 'பசுமை கண்களுக்குக் குளிர்ச்சியைத் தரும்  ' },

  { id: 'Pos_Fun_0022', input: 'Katchi sandai pilavai undaakkugiradhu', expected: 'கட்சிச் சண்டை பிளவை உண்டாக்குகிறது  ' },

  { id: 'Pos_Fun_0023', input: 'Nee velai seiya vendum', expected: 'நீ வேலை செய்ய வேண்டும்' },

  { id: 'Pos_Fun_0024', input: 'eppadii sugamaa?', expected: 'எப்படி சுகமா ?  ' },

  { id: 'Neg_Fun_0025', input: 'naaan nallaaaa irukennnn', expected: 'நான்  நல்ல  இருக்கேன்  ' },

  { id: 'Neg_Fun_0026', input: 'naan 12345 poven', expected: 'நான்  12345 போவேன்  ' },

  { id: 'Neg_Fun_0027', input: 'romba romba romba', expected: 'ரொம்ப  ரொம்ப  ரொம்ப  ' },

  { id: 'Neg_Fun_0028', input: 'appa ennaku oru RS10000 thaangoo? ', expected: 'அப்பா என்னக்கு ஒரு RS10000 தாங்கோவ்?  ' },

  { id: 'Neg_Fun_0029', input: 'naan indaiku class ku pokela', expected: 'நான் இண்டைக்கு class கு போகேல' },

  { id: 'Neg_Fun_0030', input: '11.00 maniku pokavendum', expected: 'எனக்கு 11.00 மணிக்கு போகவேண்டும்' },

  { id: 'Neg_Fun_0031', input: 'naan 5 nemisathila la varuven', expected: 'நான் 5 நிமிசத்தில ல வருவேன்' },

  { id: 'Neg_Fun_0032', input: 'enoda phone number 0768071444', expected: 'என்னோட போன் நம்பர் 0768071444' },

  { id: 'Neg_Fun_0033', input: 'class Zoom laiyoo nadakkum.', expected: 'கிளாஸ் Zoom லையோ நடக்கும் .' },

   { id: 'Neg_Fun_0034', input: 'naalaiku car 10.30 ku kondu varen..', expected: 'நாளைக்கு கார் 10.30 கு கொண்டு வாறேன்.' },


];


