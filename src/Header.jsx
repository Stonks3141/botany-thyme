import { useState } from 'preact/hooks';
import {
  Header as BaseHeader, Content, HeaderName, HeaderGlobalBar, HeaderGlobalAction,
  ExpandableSearch,
} from '@carbon/react';
import { Close } from '@carbon/react/icons';
import { hideSmall, offsetButton } from './Header.module.css';

export function Header() {
  const [expanded, setExpanded] = useState(false);
  return (
    <BaseHeader aria-label="Botany Thyme">
      <div class={expanded ? hideSmall : ''}>
        <HeaderName href="/" prefix="">Botany Thyme</HeaderName>
      </div>
      <HeaderGlobalBar>
        <ExpandableSearch
          isExpanded={expanded}
          onExpand={() => setExpanded(e => !e)}
          size="lg"
          labelText="Search for plants"
          placeholder="Search for plants"
        />
        <div hidden={!expanded} className={offsetButton}>
          <HeaderGlobalAction aria-label="Close" onClick={() => setExpanded(false)}>
            <Close />
          </HeaderGlobalAction>
        </div>
        <div class={expanded ? hideSmall : ''}>
          <HeaderGlobalAction aria-label="Github repo" tooltipAlignment="end">
            <a target="_blank" href="https://github.com/Stonks3141/botany-thyme">
              <svg width="25" height="24" viewBox="0 0 98 96"><path fill="#24292f" d="M49 0a49 49 0 0 0-15 96c2 0 3-1 3-2V84c-14 3-17-5-17-5-2-6-5-8-5-8-5-3 0-3 0-3 5 1 8 5 8 5 4 8 11 6 14 4 0-3 2-5 3-6-11-1-22-5-22-24 0-6 2-10 5-14-1-1-2-6 0-13 0 0 4-1 14 5a47 47 0 0 1 12-1l12 1c9-6 13-5 13-5 3 7 1 12 1 13 3 4 5 8 5 14 0 19-11 23-22 24 1 1 3 4 3 9v14c0 1 1 2 3 2 20-7 34-25 34-47C98 22 76 0 49 0z"/></svg>
            </a>
          </HeaderGlobalAction>
        </div>
      </HeaderGlobalBar>
    </BaseHeader>
  );
}
