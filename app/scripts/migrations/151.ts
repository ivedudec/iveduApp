import { cloneDeep } from 'lodash';

type VersionedData = {
  meta: { version: number };
  data: Record<string, unknown>;
};

export const version = 151;

export async function migrate(
  originalVersionedData: VersionedData,
): Promise<VersionedData> {
  const versionedData = cloneDeep(originalVersionedData);
  versionedData.meta.version = version;
  Object.values(versionedData.data).forEach((controller) => {
    if (controller.PreferencesController) delete controller.PreferencesController.incomingTransactionsPreferences;
    if (controller.preferencesEnabled && controller.PreferencesController) delete controller.PreferencesController.petnamesEnabled;
  });
 return versionedData;
}
