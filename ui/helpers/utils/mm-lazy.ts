import React from 'react';
import { getManifestFlags } from '../../../shared/lib/manifestFlags';
import { endTrace, trace, TraceName } from '../../../shared/lib/trace';

type DynamicImportType = () => Promise<{ default: React.ComponentType }>;
type ModuleWithDefaultType = {
  default: React.ComponentType;
};

const lazyLoadSubSampleRate = getManifestFlags().sentry?.lazyLoadSubSampleRate;

export function mmLazy(fn: DynamicImportType) {
  return React.lazy(async () => {
    const startTime = Date.now();
    const importedModule = await fn();
    const { componentName, component } = parseImportedComponent(importedModule);

    if (lazyLoadSubSampleRate && Math.random() < lazyLoadSubSampleRate) {
      trace({
        name: TraceName.LazyLoadComponent,
        data: { componentName },
        startTime,
      });
      endTrace({ name: TraceName.LazyLoadComponent });
    }

    return component;
  });
}

function parseImportedComponent(importedModule): { componentName: string; component: ModuleWithDefaultType } {
  let componentName;

  if (!importedModule.default) {
    const keys = Object.keys(importedModule);
    if (keys.length === 1) {
      return { componentName: keys[0], component: { default: importedModule[keys[0]] } };
    }
    throw new Error('mmLazy cannot lazy-load a module with multiple named exports');
  }

  if (importedModule.default.WrappedComponent) {
    	componentName= importedModule.default.WrappedComponent.name;
	} else{
			component= importedModuldefault.name || importedModuldefault.displayN
	}
return{componetNme , compoentn};
}
