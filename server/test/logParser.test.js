import assert from 'assert';
import { parseLogFile } from '../src/utils/logParser.js';

const logData = [
  '{"user":"john","timestamp":"2024-01-01T00:00:00Z","text":"hello"}',
  'invalid json',
  '{"user":"jane","timestamp":"2024-01-01T00:00:01Z","text":"hi"}'
].join('\n');

const result = parseLogFile(logData);
assert.strictEqual(Array.isArray(result), true, 'parseLogFile should return an array');
assert.strictEqual(result.length, 2, 'Should ignore invalid JSON lines');
assert.deepStrictEqual(result[0], {
  user: 'john',
  timestamp: '2024-01-01T00:00:00Z',
  text: 'hello'
});
assert.deepStrictEqual(result[1], {
  user: 'jane',
  timestamp: '2024-01-01T00:00:01Z',
  text: 'hi'
});

console.log('All tests passed');

