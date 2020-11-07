import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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
import { list, person } from 'ionicons/icons';
import Live from './pages/live';
import Profile from './pages/profile';

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


import AppContextProvider from './data/AppContextProvider';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppContextProvider>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/live" component={Live} exact={true} />
            <Route path="/profile" component={Profile} exact={true} />
            <Route path="/" render={() => <Redirect to="/live" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Live" href="/live">
              <IonIcon icon={list} />
              <IonLabel>Live</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Profile" href="/profile">
              <IonIcon icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </AppContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;