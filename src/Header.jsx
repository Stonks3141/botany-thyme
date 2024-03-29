import { useSignal } from '@preact/signals';
import { route } from 'preact-router';
import {
  Header as BaseHeader, Content, HeaderName, HeaderGlobalBar, HeaderGlobalAction,
  ExpandableSearch,
} from '@carbon/react';
import { Close } from '@carbon/react/icons';
import { hideSmall, offsetButton } from './Header.module.css';

export function Header({ query }) {
  const expanded = useSignal(false);

  if (query.value) {
    expanded.value = true;
  }

  function onSearchClose() {
    query.value = '';
    expanded.value = false;
  }

  function onKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        route(import.meta.env.BASE_URL + '/search/' + query.value);
        break;
      case 'Escape':
        if (!query.value) {
          event.preventDefault();
          query.value = '';
          expanded.value = false;
        }
        break;
    }
  }

  return (
    <BaseHeader aria-label="Botanical Thyme">
      <div class={expanded.value ? hideSmall : ''}>
        <HeaderName href={import.meta.env.BASE_URL} prefix="">Botanical Thyme</HeaderName>
      </div>
      <HeaderGlobalBar>
        <ExpandableSearch
          isExpanded={expanded.value}
          onExpand={() => expanded.value = !expanded.value}
          value={query.value}
          onChange={e => query.value = e.target.value}
          onKeyDown={onKeyDown}
          size="lg"
          labelText="Search for plants"
          placeholder="Search for plants"
        />
        <div hidden={!expanded.value} className={offsetButton}>
          <HeaderGlobalAction aria-label="Close" onClick={onSearchClose}>
            <Close />
          </HeaderGlobalAction>
        </div>
        <div class={expanded.value ? hideSmall : ''}>
          <HeaderGlobalAction aria-label="Github" tooltipAlignment="end">
            <a target="_blank" href="https://github.com/Stonks3141/botany-thyme">
              <svg width="25" height="24" viewBox="0 0 98 96"><path fill="#24292f" d="M49 0a49 49 0 0 0-15 96c2 0 3-1 3-2V84c-14 3-17-5-17-5-2-6-5-8-5-8-5-3 0-3 0-3 5 1 8 5 8 5 4 8 11 6 14 4 0-3 2-5 3-6-11-1-22-5-22-24 0-6 2-10 5-14-1-1-2-6 0-13 0 0 4-1 14 5a47 47 0 0 1 12-1l12 1c9-6 13-5 13-5 3 7 1 12 1 13 3 4 5 8 5 14 0 19-11 23-22 24 1 1 3 4 3 9v14c0 1 1 2 3 2 20-7 34-25 34-47C98 22 76 0 49 0z"/></svg>
            </a>
          </HeaderGlobalAction>
        </div>
      </HeaderGlobalBar>
    </BaseHeader>
  );
}
