const logger = require('./logger'); 

const parseAIResponse = (aiResponse) => {
  let parsed;

  try {
 
    if (typeof aiResponse === 'string') {
      parsed = JSON.parse(aiResponse);
    } else if (typeof aiResponse === 'object') {
      parsed = aiResponse;
    } else {
      throw new Error('AI response is neither string nor object');
    }
  } catch (err) {
 
    logger.error('AI Response JSON parse error', { error: err.message, rawResponse: aiResponse });
    parsed = {}; 
  }
  const standardized = {
    possibleDiagnosis: Array.isArray(parsed.possibleDiagnosis)
      ? parsed.possibleDiagnosis.map(d => ({
          condition: d.condition || 'Unknown condition',
          probability: typeof d.probability === 'number' ? d.probability : 0,
          description: d.description || ''
        }))
      : [{ condition: 'Unknown condition', probability: 0, description: '' }],
    severity: ['low', 'medium', 'high', 'critical'].includes(parsed.severity)
      ? parsed.severity
      : 'medium',
    recommendedActions: Array.isArray(parsed.recommendedActions)
      ? parsed.recommendedActions
      : ['Consult a healthcare professional'],
    notes: parsed.notes || '',
    confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0
  };

  return standardized;
};

module.exports = { parseAIResponse };
