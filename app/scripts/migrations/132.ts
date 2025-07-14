import { isObject } from '@iveduapp/utils';
import { cloneDeep } from 'lodash';

type VersionedData = {
  meta: { version: number };
  data: Record<string, unknown>;
};

export const version = 132;

export async function migrate(
  originalVersionedData: VersionedData,
): Promise<VersionedData> {
  const versionedData = cloneDeep(originalVersionedData);
  versionedData.meta.version = version;
  if (isObject(versionedData.data.PreferencesController) && isObject(versionedData.data.PreferencesController.preferences)) {
    versionedData.data.PreferencesController.preferences.redesignedTransactionsEnabled = true;
  } else if (isObject(versionedData.data.PreferencesController)) {
    versionedData.data.PreferencesController.preferences = { redesignedTransactionsEnabled: true };
  }
  return versionedData;
}
