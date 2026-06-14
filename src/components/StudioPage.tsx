import React from 'react';
import { Studio } from 'sanity';
import sanityConfig from '../../sanity.config';

export function StudioPage() {
  return (
    <div className="w-screen h-screen min-h-screen bg-slate-900 text-white" id="sanity-studio">
      <Studio config={sanityConfig} />
    </div>
  );
}
