kit.text('# Word counter');
const text = kit.textarea('Your text here');
kit.text(`Word count: ${text.match(/\S+/g).length} | character count: ${text.length}`);
