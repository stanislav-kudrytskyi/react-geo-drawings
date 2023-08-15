interface MenuItemProps {
    label: string;
    onClick: () => void;
}

const MenuItem = ({
    label,
    onClick,
}: MenuItemProps): JSX.Element => (
    <div
        className="delete-menu-item"
        role="presentation"
        onClick={onClick}
        onKeyDown={onClick}
    >
        {label}
    </div>
);

export default MenuItem;
