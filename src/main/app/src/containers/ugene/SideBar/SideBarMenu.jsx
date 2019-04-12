import React, { Component } from 'react';

import { Accordion, Menu, Divider } from 'semantic-ui-react';

import { LeftMenu } from "./LeftMenu";
import "./SideBarMenu.css"

class SideBarMenu extends Component {
    state = {
        activeIndex: [0, -1],
        menu: null
    };

    constructor(props) {
        super(props);

        const menu = this.jsonToAccordion(LeftMenu, this.state.activeIndex);

        this.state = {
            ...this.state,
            menu: menu
        };
    }

    jsonToAccordion = (json, activeIndex) => {
        const mostDeep = this.findMostDeep(json, activeIndex, [-1]);
        const menu = this.jsonToAccordion2(json, activeIndex, [-1], mostDeep);

        return(menu);
    };

    jsonToAccordion2 = (json, activeIndex, level, mostDeep) => {
        let menu = [];
        if (json.menu && json.menu.length > 0) {
            menu = json.menu;
        }
        else {
            return <div />
        }

        const accordion = menu.map((item, index) => {
            const newlevel = level.concat( [index] );
            newlevel[0]++;
            const key = newlevel.toString();

            if (item.menu) {
                const submenu = this.jsonToAccordion2(item, activeIndex, newlevel, mostDeep);
                const isactive = this.isActive(activeIndex, newlevel);

                return (
                    <Menu.Item key={key}>
                        <Accordion.Title
                            active={isactive}
                            content={item.title}
                            index={key}
                            index2={newlevel}
                            onClick={this.handleClick}
                            className={'ugene-side-bar-accordion-menu-item-accordion-title'}
                        />
                        <Accordion.Content
                            active={isactive}
                            className={'ugene-side-bar-accordion-menu-item-accordion-content'}
                        >
                            {submenu}
                        </Accordion.Content>
                    </Menu.Item>
                );
            }
            else if (item.divider) {
                return (
                    <Divider key={key}
                             index2={newlevel}
                             className={'ugene-side-bar-accordion-menu-divider'}/>
                );
            }
            else {
                return (
                    <Menu.Item key={key}
                               name={item.name ? item.name : "unknownName"}
                               action={item.action ? item.action : "unknownAction"}
                               index2={newlevel}
                               onClick={this.handleClickMenu.bind(this)}
                               className={'ugene-side-bar-accordion-menu-item'}
                    >
                        {item.title}
                    </Menu.Item>
                );
            }
        });
        return (
            <Accordion as={Menu}
                       borderless
                       vertical
                       className={JSON.stringify(mostDeep) === JSON.stringify(level)
                           ? 'ugene-side-bar-accordion-menu ugene-border'
                           : 'ugene-side-bar-accordion-menu'}
            >
                {accordion}
            </Accordion>
        );
    };

    findMostDeep = (json, activeIndex, level, arr = [0]) => {
        let menu = [];
        if (json.menu && json.menu.length > 0) {
            menu = json.menu;
        }
        else {
            return [0]
        }
        let mostDeep = arr;

        menu.map((item, index) => {
            const newlevel = level.concat( [index] );
            newlevel[0]++;

            if (item.menu) {
                mostDeep = this.findMostDeep(item, activeIndex, newlevel, mostDeep);
                const isactive = this.isActive(activeIndex, newlevel);
                if (isactive && newlevel.length > mostDeep.length) {
                    mostDeep = newlevel;
                }
            }
            return mostDeep;
        });
        return mostDeep;
    };

    handleClick = (e, props) => {
        const {index2} = props;
        const newIndex = this.isActive(this.state.activeIndex, index2)
            ? [-1]
            : index2;

        const menu = this.jsonToAccordion(LeftMenu, newIndex);

        this.setState({
            activeIndex: newIndex,
            menu: menu
        });
    };

    handleClickMenu = (e, props) => {
        let { index2, name, action } = props;
        index2.pop();
        const newIndex = index2;

        const menu = this.jsonToAccordion(LeftMenu, newIndex);

        this.setState({
            activeIndex: newIndex,
            menu: menu
        });

        this.props.onClickMenu(e, { name, action });
    };

    isActive = (activeIndex, newIndex) =>  {
        if (newIndex[0] === 0
            && activeIndex[1] === newIndex[1]) return true;
        if (newIndex[0] === 1 && activeIndex[0] > 0
            && activeIndex[1] === newIndex[1]
            && activeIndex[2] === newIndex[2]) return true;

        if (newIndex[0] === activeIndex[0]) {
            if (newIndex[1] === activeIndex[1]) {
                if (newIndex[0] === 0) {
                    return true;
                }
                else {
                    if (newIndex[2] === activeIndex[2]) {
                        if (newIndex[0] === 1) {
                            return true;
                        }
                        else {
                            if (newIndex[3] === activeIndex[3]) {
                                if (newIndex[0] === 2) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    };

    render() {
        return (
            this.state.menu
        );
    }
}

export default SideBarMenu;

/* https://stackblitz.com/edit/nested-accordion-semantic-ui?file=index.js */
