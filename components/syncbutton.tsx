'use client';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './icon';
import api from '@/lib/api';

export function SyncButton() {
  return (
    <button
      onClick={() => {
        api('/api/sync');
      }}
      className="button border border-primary bg-white text-primary"
    >
      <Icon icon={faSync} className="mr-2" />
      Sync
    </button>
  );
}
