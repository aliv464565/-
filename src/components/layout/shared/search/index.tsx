'use client';

// React Imports
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// Next Imports
import { useRouter, usePathname } from 'next/navigation';

// MUI Imports
import IconButton from '@mui/material/IconButton';

// Third-party Imports
import classnames from 'classnames';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from 'cmdk';
import { Title, Description } from '@radix-ui/react-dialog';

// Type Imports

// Component Imports
import DefaultSuggestions from './DefaultSuggestions';
import NoResult from './NoResult';

// Hook Imports
import useVerticalNav from '@/@menu/hooks/useVerticalNav';
import { useSettings } from '@/@core/hooks/useSettings';

// Util Imports

// Style Imports
import './styles.css';

// Data Imports
import data from '@/app/data/searchData';
import {
    ArrowDownIcon,
    ArrowTurnDownLeftIcon,
    ArrowUpIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

type Item = {
    id: string;
    name: string;
    url: string;
    excludeLang?: boolean;
    icon: string;
    shortcut?: string;
};

type Section = {
    title: string;
    items: Item[];
};

type SearchItemProps = {
    children: ReactNode;
    shortcut?: string;
    value: string;
    url: string;
    currentPath: string;
    onSelect?: () => void;
};

// Transform the data to group items by their sections
const transformedData = data.reduce((acc: Section[], item) => {
    const existingSection = acc.find(section => section.title === item.section);

    const newItem = {
        id: item.id,
        name: item.name,
        url: item.url,
        excludeLang: item.excludeLang,
        icon: item.icon,
        shortcut: item.shortcut,
    };

    if (existingSection) {
        existingSection.items.push(newItem);
    } else {
        acc.push({ title: item.section, items: [newItem] });
    }

    return acc;
}, []);

// SearchItem Component for introduce the shortcut keys
const SearchItem = ({
    children,
    shortcut,
    value,
    currentPath,
    url,
    onSelect = () => {},
}: SearchItemProps) => {
    return (
        <CommandItem
            onSelect={onSelect}
            value={value}
            className={classnames('mli-2 mbe-px last:mbe-0 rounded', {
                'active-searchItem': currentPath === url,
            })}
        >
            {children}
            {shortcut && (
                <div cmdk-vercel-shortcuts="">
                    {shortcut.split(' ').map(key => {
                        return <kbd key={key}>{key}</kbd>;
                    })}
                </div>
            )}
        </CommandItem>
    );
};

// Helper function to filter and limit results per section based on the number of sections
const getFilteredResults = (sections: Section[]) => {
    const limit = sections.length > 1 ? 3 : 5;

    return sections.map(section => ({
        ...section,
        items: section.items.slice(0, limit),
    }));
};

// Footer component for the search menu
const CommandFooter = () => {
    return (
        <div cmdk-footer="">
            <div className="flex items-center gap-1">
                <kbd>
                    <ArrowUpIcon />
                </kbd>
                <kbd>
                    <ArrowDownIcon />
                </kbd>
                <span>to navigate</span>
            </div>
            <div className="flex items-center gap-1">
                <kbd>
                    <ArrowTurnDownLeftIcon />
                </kbd>
                <span>to open</span>
            </div>
            <div className="flex items-center gap-1">
                <kbd>esc</kbd>
                <span>to close</span>
            </div>
        </div>
    );
};

const NavSearch = () => {
    // States
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    // Hooks
    const router = useRouter();
    const pathName = usePathname();
    const { settings } = useSettings();
    const { isBreakpointReached } = useVerticalNav();

    // When an item is selected from the search results
    const onSearchItemSelect = (item: Item) => {
        item.url.startsWith('http') ? window?.open(item.url, '_blank') : router.push(item.url);
        setOpen(false);
    };

    // Filter the data based on the search query
    const filteredData = (sections: Section[], query: string) => {
        const searchQuery = query.trim().toLowerCase();

        return sections
            .filter(section => {
                const sectionMatches = section.title.toLowerCase().includes(searchQuery);

                const itemsMatch = section.items.some(
                    item =>
                        item.name.toLowerCase().includes(searchQuery) ||
                        (item.shortcut && item.shortcut.toLowerCase().includes(searchQuery))
                );

                return sectionMatches || itemsMatch;
            })
            .map(section => ({
                ...section,
                items: section.items.filter(
                    item =>
                        section.title.toLowerCase().includes(searchQuery) ||
                        item.name.toLowerCase().includes(searchQuery) ||
                        (item.shortcut && item.shortcut.toLowerCase().includes(searchQuery))
                ),
            }));
    };

    const limitedData = getFilteredResults(filteredData(transformedData, searchValue));

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(open => !open);
            }
        };

        document.addEventListener('keydown', down);

        return () => document.removeEventListener('keydown', down);
    }, []);

    // Reset the search value when the menu is closed
    useEffect(() => {
        if (!open && searchValue !== '') {
            setSearchValue('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <>
            {isBreakpointReached || settings.layout === 'horizontal' ? (
                <IconButton className="text-textPrimary" onClick={() => setOpen(true)}>
                    <MagnifyingGlassIcon width={20} />
                </IconButton>
            ) : (
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <IconButton className="text-textPrimary" onClick={() => setOpen(true)}>
                        <MagnifyingGlassIcon width={20} />
                    </IconButton>
                    <div className="whitespace-nowrap select-none text-textDisabled">Search ⌘K</div>
                </div>
            )}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <div className="flex items-center justify-between border-be px-4 py-3 gap-2">
                    <Title hidden />
                    <Description hidden />
                    <MagnifyingGlassIcon width={30} />
                    <CommandInput value={searchValue} onValueChange={setSearchValue} />
                    <span className="text-gray-400">[esc]</span>
                    <XMarkIcon
                        width={30}
                        onClick={() => setOpen(false)}
                        className=" cursor-pointer"
                    />
                </div>
                <CommandList className="px-6 py-8">
                    {searchValue ? (
                        limitedData.length > 0 ? (
                            limitedData.map((section, index) => (
                                <CommandGroup
                                    key={index}
                                    heading={section.title.toUpperCase()}
                                    className="text-"
                                >
                                    {section.items.map((item, index) => {
                                        return (
                                            <SearchItem
                                                shortcut={item.shortcut}
                                                key={index}
                                                currentPath={pathName}
                                                url={'/'}
                                                value={`${item.name} ${section.title} ${item.shortcut}`}
                                                onSelect={() => onSearchItemSelect(item)}
                                            >
                                                {item.icon && (
                                                    <i
                                                        className={classnames('text-xl', item.icon)}
                                                    />
                                                )}
                                                {item.name}
                                            </SearchItem>
                                        );
                                    })}
                                </CommandGroup>
                            ))
                        ) : (
                            <CommandEmpty>
                                <NoResult searchValue={searchValue} setOpen={setOpen} />
                            </CommandEmpty>
                        )
                    ) : (
                        <DefaultSuggestions setOpen={setOpen} />
                    )}
                </CommandList>

                <CommandFooter />
            </CommandDialog>
        </>
    );
};

export default NavSearch;
