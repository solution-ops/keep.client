import { useState } from 'react';
import { Link } from 'react-router-dom';

// @elastic/eui dependencies
import {
  EuiCollapsibleNav,
  EuiCollapsibleNavGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiListGroupItem,
  EuiPage,
  EuiPortal,
  EuiShowFor,
  EuiText,
  EuiTitle,
  EuiFlexGroup,
} from '@elastic/eui';

// Local Dependencies
import { Search } from './Search';
import { UserMenu } from './UserMenu';
import { routes } from 'src/router/routes';

const Navigation = () => {
  /**
   * Collapsible Nav
   */
  const [navIsOpen, setNavIsOpen] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false,
  );
  const [navIsDocked, setNavIsDocked] = useState(
    JSON.parse(String(localStorage.getItem('navIsDocked'))) || false,
  );
  const collapsibleNav = (
    <EuiCollapsibleNav
      id="guideHeaderCollapsibleNavExample"
      aria-label="Main navigation"
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <EuiHeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={() => setNavIsOpen(!navIsOpen)}
        >
          <EuiIcon type={'menu'} size="m" aria-hidden="true" />
        </EuiHeaderSectionItemButton>
      }
      onClose={() => setNavIsOpen(false)}
    >
      <EuiFlexItem className="eui-yScroll">
        {/* Docs callout */}
        <EuiCollapsibleNavGroup background="none" title="EuiCollapsibleNav">
          <EuiText size="s" color="subdued" style={{ padding: '0 8px 8px' }}>
            <p>
              Please see the component page for{' '}
              <Link to="/navigation/collapsible-nav">
                <strong>EuiCollapsibleNav</strong>
              </Link>{' '}
              on how to configure your navigation.
            </p>
          </EuiText>
        </EuiCollapsibleNavGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {/* Docking button only for larger screens that can support it*/}
        <EuiShowFor sizes={['l', 'xl']}>
          <EuiCollapsibleNavGroup>
            <EuiListGroupItem
              size="xs"
              color="subdued"
              label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
              onClick={() => {
                setNavIsDocked(!navIsDocked);
                localStorage.setItem(
                  'navIsDocked',
                  JSON.stringify(!navIsDocked),
                );
              }}
              iconType={navIsDocked ? 'lock' : 'lockOpen'}
            />
          </EuiCollapsibleNavGroup>
        </EuiShowFor>
      </EuiFlexItem>
    </EuiCollapsibleNav>
  );

  /**
   * Header Alerts
   */
  const [isAlertFlyoutVisible, setIsAlertFlyoutVisible] = useState(false);
  const headerAlerts = (
    <EuiPortal>
      <EuiFlyout
        onClose={() => setIsAlertFlyoutVisible(false)}
        size="s"
        id="guideHeaderAlertExample"
        aria-labelledby="guideHeaderAlertExampleTitle"
      >
        <EuiFlyoutHeader hasBorder>
          <EuiTitle size="s">
            <h2 id="guideHeaderAlertExampleTitle">EuiHeaderAlert</h2>
          </EuiTitle>
        </EuiFlyoutHeader>
        <EuiFlyoutBody>
          <EuiText size="s" color="subdued">
            <p>
              Please see the component page for{' '}
              <Link to="/layout/header">
                <strong>EuiHeaderAlert</strong>
              </Link>{' '}
              on how to configure your alerts.
            </p>
          </EuiText>
        </EuiFlyoutBody>
      </EuiFlyout>
    </EuiPortal>
  );

  return (
    <EuiFlexGroup
      className="guideFullScreenOverlay"
      gutterSize="none"
      direction="column"
    >
      <EuiHeader
        theme="dark"
        position="fixed"
        sections={[
          {
            items: [
              <EuiHeaderLogo iconType="dashboardApp" href="">
                Keep
              </EuiHeaderLogo>,
              collapsibleNav,
            ],
            borders: 'none',
          },
          {
            items: [
              <EuiShowFor sizes={['m', 'l', 'xl']}>
                <Search />
              </EuiShowFor>,
            ],
            borders: 'none',
          },
          {
            items: [
              <EuiShowFor sizes={['xs', 's']}>
                <Search />
              </EuiShowFor>,
              <EuiHeaderLinks
                popoverProps={{
                  repositionOnScroll: true, // Necessary when placing search in a fixed component
                }}
              >
                {routes
                  .filter((route) => {
                    return route.private;
                  })
                  .map((route) => {
                    return (
                      <Link to={route.path}>
                        <EuiHeaderLink color="primary">
                          {route.label}
                        </EuiHeaderLink>
                      </Link>
                    );
                  })}
                {/* <EuiHeaderLink color="primary">Share</EuiHeaderLink>
                <EuiHeaderLink color="primary">Clone</EuiHeaderLink> */}
              </EuiHeaderLinks>,
              <EuiHeaderSectionItemButton
                notification={true}
                aria-label="Notifications: Updates available"
                onClick={() => setIsAlertFlyoutVisible(!isAlertFlyoutVisible)}
              >
                <EuiIcon type="cheer" size="m" />
              </EuiHeaderSectionItemButton>,
              <UserMenu />,
            ],
            borders: 'none',
          },
        ]}
      />

      {isAlertFlyoutVisible ? headerAlerts : null}

      <EuiPage />
    </EuiFlexGroup>
  );
};

export default Navigation;
