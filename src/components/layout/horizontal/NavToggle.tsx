// Hook Imports
import useVerticalNav from '@/@menu/hooks/useVerticalNav';
import useHorizontalNav from '@/@menu/hooks/useHorizontalNav';
import { Bars2Icon } from '@heroicons/react/24/outline';

const NavToggle = () => {
    // Hooks
    const { toggleVerticalNav } = useVerticalNav();
    const { isBreakpointReached } = useHorizontalNav();

    // Toggle Vertical Nav
    const handleClick = () => {
        toggleVerticalNav();
    };

    return (
        <>
            {isBreakpointReached && <Bars2Icon className=" cursor-pointer" onClick={handleClick} />}
        </>
    );
};

export default NavToggle;
