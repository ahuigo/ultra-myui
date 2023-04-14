export interface DropdownProps {
  children: React.ReactNode;
  overlay: React.ReactElement;
}
export default function Dropdown({ children, overlay }: DropdownProps) {
  return (
    <>
      <style>
        {`
    .dropdown {
      position: relative;
      display: inline-block;
    }
    
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 10px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      padding: 12px;
    }
    
    .dropdown:hover .dropdown-content {
      display: block;
    }
    `}
      </style>
      <div className="dropdown">
        <div>{children}</div>
        <div className="dropdown-content">{overlay}</div>
      </div>
    </>
  );
}
