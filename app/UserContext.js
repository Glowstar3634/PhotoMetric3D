import React from 'react'
export const UserContext = React.createContext();
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);

    React.useEffect(() => {
        // Only set up the listener if currentUser and currentUser.userID are defined
        if (currentUser?.userID) {
          const userRef = ref(database, `users/${currentUser.userID}`);
    
          // Set up the listener
          const unsubscribe = onValue(userRef, (snapshot) => {
            if (snapshot.exists()) {
              const updatedUserData = snapshot.val();
              setCurrentUser(updatedUserData);
            } else {
              console.log('No user data found!');
              setCurrentUser(null); // Reset to null if no data exists
            }
          });
    
          // Cleanup listener on component unmount
          return () => unsubscribe();
        }
      }, [currentUser?.userID]); // Dependency on currentUser.userID

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
