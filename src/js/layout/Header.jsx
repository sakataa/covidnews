import React, { useState, useContext } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getText } from '../resources/resourceManager';
import { language, flagBylanguage } from '../utils/constants';
import { LanguageContext } from '../utils/context';

const Header = (props) => {
  const { setCurrentLanguage } = props;
  const [dropdownOpen, setOpen] = useState(false);

  const selectedLanguage = useContext(LanguageContext);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div>
      <Navbar color="secondary" light>
        <NavbarBrand className="text-white" href="/">Covid-19</NavbarBrand>
        <Nav className="mr-auto">
          <Dropdown nav inNavbar isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle nav caret className="text-white">
              <span className="pr-2">{getText(selectedLanguage, 'language')}</span>
              <span className={'flag-icon flag-icon-' + flagBylanguage[selectedLanguage]}></span> {getText(selectedLanguage, language[selectedLanguage])}
            </DropdownToggle>
            <DropdownMenu>
              {Object.keys(language).filter(k => k !== selectedLanguage).map(item => {
                return (
                  <DropdownItem key={item} onClick={() => setCurrentLanguage(item)}>
                    <span className={'mr-2 flag-icon flag-icon-' + flagBylanguage[item]}></span>{getText(selectedLanguage, language[item])}
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;