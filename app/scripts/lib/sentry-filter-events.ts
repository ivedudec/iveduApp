import { Event as SentryEvent, Integration } from '@sentry/types';

const NAME = 'FilterEvents';

export function filterEvents({
  getMetaMetricsEnabled,
  log,
}: {
  getMetaMetricsEnabled: () => Promise<boolean>;
  log: (message: string) => void;
}): Integration {
  return {
    name: NAME,
    processEvent: async (event: SentryEvent) => {
      const metricsEnabled = await getMetaMetricsEnabled();

      if (!metricsEnabled) {
        log('Event dropped as metrics disabled');
        return null;
      }

      return event;
    },
  };
}
