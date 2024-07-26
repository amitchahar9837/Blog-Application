import { Avatar, Button, Dropdown, DropdownItem, Navbar, TextInput } from "flowbite-react";
import { Link,useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import {useSelector} from 'react-redux';

const Header = () => {
      const path = useLocation().pathname;
      const {currentUser} = useSelector((state) => state.user);

  return (
    <Navbar className="border-b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center"
      >
        <span className="px-2 py-1 bg-gradient-to-r from from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white flex items-center">
          Nexus
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        className="w-12 h-10 lg:hidden flex items-center"
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 items-center md:order-2">
        <Button
          className="w-12 h-10 hidden sm:flex items-center"
          color={"gray"}
          pill
        >
          <FaMoon />
        </Button>
        {
          currentUser ? (
              <Dropdown
                arrowIcon= {false}
                inline 
                label = {
                  <Avatar 
                    alt="user"
                    img= {currentUser.profilePicture}
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                  <Dropdown.Item>
                    Profile
                  </Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
          ) : (
            <Link to={"/sign-in"}>
              <Button className="flex items-center" gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )
        }
        <Navbar.Toggle/>
      </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}  >
                  <Link to={'/'}>Home</Link>
            </Navbar.Link>            
            <Navbar.Link active={path === '/about'}  as={'div'} >
                  <Link to={'/about'}>About</Link>
            </Navbar.Link>            
        </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
