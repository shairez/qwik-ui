import { component$, useComputed$, useSignal, useStyles$ } from '@builder.io/qwik';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as headlessVersion } from '../../../../../packages/kit-headless/package.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useLocation } from '@builder.io/qwik-city';
import { KitName } from '~/_state/kit-name.type';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useSelectedKit } from '~/routes/docs/use-selected-kit';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { version as styledKitVersion } from '../../../../../packages/kit-styled/package.json';
import { CloseIcon } from '../icons/CloseIcon';
import { GitHubIcon } from '../icons/GitHubIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { SunIcon } from '../icons/SunIcon';
import { Logo } from '../icons/logo';

import { useTheme } from 'qwik-themes';
import MakeItYours from '../make-it-yours/make-it-yours';
import { Modal, ModalContent, ModalHeader } from '@qwik-ui/headless';
import { useAppState } from '~/_state/use-app-state';
import { LuX } from '@qwikest/icons/lucide';
import { DocsNavigation } from '../navigation-docs/navigation-docs';
import { useKitMenuItems } from '~/routes/layout';
import { cn } from '@qwik-ui/utils';

export interface HeaderProps {
  showVersion?: boolean;
  showBottomBorder?: boolean;
}

export default component$(({ showVersion = false }: HeaderProps) => {
  useStyles$(`
    .sidebar-mobile::backdrop {
      background: rgba(0,0,0,0.02);
    }
  
    .sidebar-mobile {
      animation: sidebarOpen 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile::backdrop {
      animation: sidebarFadeIn 0.75s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile.modal-closing {
      animation: sidebarClose 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }
  
    .sidebar-mobile.modal-closing::backdrop {
      animation: sidebarFadeOut 0.35s forwards cubic-bezier(0.6, 0.6, 0, 1);
    }

    @keyframes sidebarOpen {
      from {
        opacity: 0;
        transform: translateX(-100%);
      }
      to {
        opacity: 1;
        transform: translateX(0%);
      }
    }
  
    @keyframes sidebarClose {
      from {
        opacity: 1;
        transform: translateX(0%);
      }
      to {
        opacity: 0;
        transform: translateX(-100%);
      }
    }
  
    @keyframes sidebarFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  
    @keyframes sidebarFadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
    `);

  const { menuItemsGroups } = useKitMenuItems();

  const rootStore = useAppState();
  const isSidebarOpenedSig = useSignal(false);
  const selectedKitSig = useSelectedKit();
  const location = useLocation();

  const isRouteActive = (href: string) => {
    const isLinkActive = location.url.pathname.startsWith(href);
    return `
        transition-color ease-step duration-300 ${isLinkActive ? 'font-bold' : ''}`;
  };

  const isDocsActive = (baseHref: string) => {
    const isLinkActive = location.url.pathname.startsWith(baseHref);
    return `
        transition-color ease-step duration-300 ${isLinkActive ? 'font-bold' : ''}`;
  };

  const kitSignal = useComputed$(() => {
    if (selectedKitSig.value === KitName.HEADLESS) {
      return {
        name: 'Headless',
        version: headlessVersion,
      };
    }
    if (selectedKitSig.value === KitName.STYLED) {
      return {
        name: 'Styled',
        version: styledKitVersion,
      };
    }
  });

  const { theme, setTheme } = useTheme();

  return (
    <div
      class={cn(
        'bg-background sticky top-0 z-10 flex h-16 justify-center border-b',
        theme?.includes('brutalist') && 'border-b-2',
      )}
    >
      <header class="xs:gap-8 flex w-full max-w-screen-2xl items-center gap-6">
        <section class="mr-auto flex flex-col gap-1 md:flex-row md:gap-8">
          <a href="/" aria-label="Qwik UI Logo" class="lg:ml-8">
            <Logo />
          </a>
          {showVersion && (
            <div data-tip="Qwik-UI Version" class="mr-auto">
              <div class="ml-2 flex flex-row gap-1 text-xs md:mt-1 md:flex-col md:text-sm">
                <span> {kitSignal.value?.name} Kit </span>
                <span>
                  {' '}
                  <span>v{kitSignal.value?.version}</span>{' '}
                </span>
              </div>
            </div>
          )}
        </section>

        <nav class="hidden gap-4 lg:flex">
          <a class={isRouteActive('/about')} href="/about">
            About
          </a>
          <a class={isDocsActive('/docs/headless/')} href="/docs/headless/introduction">
            Headless Kit
          </a>
          {rootStore.featureFlags?.showStyled && (
            <a class={isDocsActive('/docs/styled/')} href="/docs/styled/introduction">
              Styled Kit
            </a>
          )}
          <a
            class={isRouteActive('https://discord.gg/PVWUUejrez')}
            href="https://discord.gg/PVWUUejrez"
            target="_blank"
          >
            Community
          </a>
          {/* <a href="/contact">Contact</a> */}
        </nav>
        <MakeItYours />
        <button
          type="button"
          aria-label="Toggle dark mode"
          onClick$={() => {
            theme?.includes('light') ? setTheme('dark') : setTheme('light');
          }}
        >
          <div class="hidden dark:block">
            <MoonIcon />
          </div>
          <div class="block dark:hidden">
            <SunIcon />
          </div>
        </button>
        <a
          target="_blank"
          href="https://github.com/qwikifiers/qwik-ui"
          aria-label="Qwik-UI GitHub repository"
          class="sm:mr-8"
        >
          <GitHubIcon />
        </a>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick$={() => {
            isSidebarOpenedSig.value = !isSidebarOpenedSig.value;
          }}
          class="mr-4 block lg:hidden"
        >
          {isSidebarOpenedSig.value ? <CloseIcon /> : <MenuIcon />}
        </button>
        <Modal
          bind:show={isSidebarOpenedSig}
          class="sidebar-mobile bg-background text-foreground rounded-base ml-0 mr-auto h-screen max-w-lg border-0 p-8 shadow-md"
        >
          <ModalHeader>
            <h2 class="text-lg font-bold">Copy config</h2>
            <p>
              Copy and paste the following code into your global.css file to apply the
              styles.
            </p>
          </ModalHeader>
          <ModalContent class="mb-2 pb-4 pt-2">
            <DocsNavigation
              linksGroups={menuItemsGroups}
              class="bg-background  max-w-80 overflow-auto"
            />
          </ModalContent>
          <button
            onClick$={() => (isSidebarOpenedSig.value = false)}
            class="absolute right-6 top-[26px]"
          >
            <LuX class="h-8 w-8" />
          </button>
        </Modal>
      </header>
    </div>
  );
});
