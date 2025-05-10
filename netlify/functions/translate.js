const translate = require('google-translate-api');

exports.handler = async (event) => {
  const { q, source = 'auto', target = 'en' } = JSON.parse(event.body);
  try {
    const res = await translate(q, { from: source, to: target });
    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ translatedText: res.text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};