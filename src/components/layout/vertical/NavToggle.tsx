'use client';

// Hook Imports
import useVerticalNav from '@/@menu/hooks/useVerticalNav';
import { Bars2Icon } from '@heroicons/react/24/outline';

const NavToggle = () => {
    // Hooks
    const { toggleVerticalNav, isBreakpointReached } = useVerticalNav();
    const handleClick = () => {
        toggleVerticalNav();
    };

    return <>{isBreakpointReached && <Bars2Icon width={20} onClick={handleClick} />}</>;
};

export default NavToggle;
