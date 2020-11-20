import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Friends from './pages/Friends';
import Map from './pages/Map';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AppContext from "./data/app-context";
import PrivateRoute from './nav/PrivateRoutes';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tabs from './nav/Tabs';

const App: React.FC = () => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    appCtx.initContext();
  }, [])
  
  return (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <PrivateRoute path="/tabs/" component={Tabs} />
            <Route path="/signup" component={Signup} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
          </Switch>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
