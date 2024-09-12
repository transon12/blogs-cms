import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import * as layoutConstants from '../constants/layout';

// All layouts/containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/horizontal';
import LayoutDefaut from '../layouts/LayoutDefault';
import LoginPage from '../layouts/loginPage';

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes, publicLoginPage } from './index';
const Routes = (props) => {
    const { layout, user } = useSelector((state) => ({
        layout: state.Layout,
        user: state.Auth.user,
    }));

    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_VERTICAL:
                layoutCls = VerticalLayout;
                break;
            default:
                layoutCls = DetachedLayout;
                break;
        }
        return layoutCls;
    };

    let Layout = getLayout();

    return (
        <BrowserRouter>
            <Switch>
                <Route path={authProtectedFlattenRoutes.map((r) => r['path'])}>
                    <DetachedLayout {...props}>
                        <Switch>
                            {authProtectedFlattenRoutes.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    )
                                );
                            })}
                        </Switch>
                    </DetachedLayout>
                </Route>

                <Route path={publicProtectedFlattenRoutes.map((r) => r['path'])}>
                    <LayoutDefaut {...props} layout={layout} user={user}>
                        <Switch>
                            {publicProtectedFlattenRoutes.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    )
                                );
                            })}
                        </Switch>
                    </LayoutDefaut>
                </Route>
                <Route path={publicLoginPage.map((r) => r['path'])}>
                    <LoginPage {...props} layout={layout} user={user}>
                        <Switch>
                            {publicLoginPage.map((route, index) => {
                                return (
                                    !route.children && (
                                        <route.route
                                            key={index}
                                            path={route.path}
                                            roles={route.roles}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    )
                                );
                            })}
                        </Switch>
                    </LoginPage>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
