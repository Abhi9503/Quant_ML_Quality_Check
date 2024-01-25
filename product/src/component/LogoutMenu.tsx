import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, Button } from "@chakra-ui/react";
import { useFrappeAuth } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";

const UserProfileMenu = () => {
  const { currentUser, logout } = useFrappeAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(); 
    navigate('/Loginpage');
  };

  return (
    <Menu>
      <MenuButton as={Button} colorScheme='pink'>
        {/* Symbol or user icon can be added here */}
        Profile
      </MenuButton>
      <MenuList>
        <MenuGroup>
          <MenuItem>{currentUser}</MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserProfileMenu;
