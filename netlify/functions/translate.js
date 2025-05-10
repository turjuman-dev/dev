const translate = require('@vitalets/google-translate-api');

exports.handler = async (event) => {
  // Allow CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const { q, source = 'auto', target = 'en' } = JSON.parse(event.body);
    const res = await translate(q, { from: source, to: target });
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ translatedText: res.text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};