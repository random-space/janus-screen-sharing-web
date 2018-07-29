import React, { ReactNode } from "react";
import {
    BrowserRouter,
    Route,
    Switch,
    RouteProps,
} from "react-router-dom";
import TopPage from "./components/TopPage";

export default () => (
    <BrowserRouter>
        <Root>
            <ComposingSwitch>
                <ComposingRoute
                    path="/"
                    component={TopPage}
                    exact={true}
                />
            </ComposingSwitch>
        </Root>
    </BrowserRouter>
);

const Root = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => <div {...props}/>;

const ComposingRoute = (
    {
        component,
        path,
        ...props
    }: RouteProps
) => {
    const Component = component as React.ComponentClass<any>;
    return (
        <Route
            path={path}
            // tslint:disable-next-line:jsx-no-lambda
            render={x => <Component {...x} {...props} />}
        />
    );
};

const ComposingSwitch = (
    {
        children,
        ...props
    }: { children: ReactNode; }
) => (
    <Switch>
        {React.Children.toArray(children).map(
            (x: any) => React.cloneElement(
                x,
                {
                    ...props,
                    ...x.props
                }
            )
        )}
    </Switch>
);
