const isDevelopment = process.env.NODE_ENV === 'development';

const log = (level, message, meta = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,       
    message,
    ...meta
  };

  if (isDevelopment) {
    
    console.log(JSON.stringify(logEntry, null, 2));
  } else {
  
    console.log(JSON.stringify(logEntry));
  }
};

module.exports = {
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  info: (message, meta) => log('info', message, meta)
};
