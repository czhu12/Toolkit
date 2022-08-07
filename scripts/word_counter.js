kit.text('# Word counter');
const text = kit.textarea('Your text here', {defaultValue: ""});
kit.alert(`Word count: <b>${text.match(/\S+/g)?.length || 0}</b> | character count: <b>${text.length}</b>`, {alertType: "info"});
