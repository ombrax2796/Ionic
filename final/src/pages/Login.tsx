import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { logoFigma } from 'ionicons/icons';
import AppContext from "../data/app-context";
import React, { useContext, useState } from 'react'
import firebase from '../firebase'
import "firebase/auth";
import "firebase/firestore";
import { logoGoogle } from "ionicons/icons";
import { useHistory } from 'react-router';

interface UserData {
    email: string;
    password: string;
}

const Connexion: React.FC = () => {
    const appCtx = useContext(AppContext);
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [password, setPassword] = useState<string>('');
    const [values, setValues] = useState<UserData>({
        email: "",
        password: ""
    });

    const handleChange = (event: CustomEvent) => {
        const tar = (event.target as HTMLInputElement)
        setValues(values => ({
            ...values,
            [tar.name]: tar.value
        }));
    }

    const handleSubmit = (event: any) => {
        console.log(values)
        event.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                appCtx.setUser(res);
                console.log(res, 'res')
                history.push('map');
            })
            .catch(error => {
                setErrorMessage(error.message)
                setShowAlert(true)
            });
    }

    const handleClick = () => {
        console.log('test')
        history.push('signup');
    }
    
    const handleWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }


    return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
            <IonTitle>Welcome</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
                <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ flexGrow: 1 }} />
                        <div style={{ textAlign: 'center' }}>
                            <h1>Login</h1>
                            <form onSubmit={handleSubmit}>
                                <IonList>
                                    <IonItem>
                                        <IonLabel position="floating">Email</IonLabel>
                                        <IonInput type="text" name="email" value={values.email} onIonChange={handleChange}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput type="password" name="password" value={values.password} onIonChange={handleChange} ></IonInput>
                                    </IonItem>
                                </IonList>
                                <div style={{ marginTop: "1em" }}>
                                    <IonButton expand="full" onClick={handleSubmit}>Login</IonButton>
                                </div>
                                <div style={{ marginTop: "1em", paddingTop: "1em", borderTop: "1px solid grey" }}>
                                    <IonButton expand="full" color="danger" onClick={handleWithGoogle}>
                                        <IonIcon icon={logoGoogle} slot="start" />
                                        Login with Google
                                        </IonButton>
                                </div>
                                <div>
                                    <p style={{ margin: "0", marginTop: "2em" }}>
                                        Not logged in yet?
                                    </p>
                                    <IonButton onClick={handleClick} fill="clear">SignUp</IonButton>
                                </div>
                            </form>
                        </div>
                        <div style={{ flexGrow: 1 }} />
                    </div>
                    <div style={{ flexGrow: 1 }} />
                </div>
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                header={errorMessage}
                onDidDismiss={() => { setErrorMessage(""); setShowAlert(false) }}
                buttons={[
                    {
                        text: 'Ok'
                    }
                ]}
            />
    </IonPage>
    );
}

export default Connexion;