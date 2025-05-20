export function mapLatestTimestamps(apiData) {
  if (!apiData?.channels || typeof apiData.channels !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(apiData.channels).map(([channel, timestamp]) => [
      channel,
      new Date(timestamp).toISOString()
    ])
  );
}
