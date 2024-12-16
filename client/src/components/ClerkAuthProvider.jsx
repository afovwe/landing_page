import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUser, useAuth } from '@clerk/clerk-react';
import { setUser, clearUser, setError } from '../state/authSlice';
import { api } from '../state/api';

const ClerkAuthProvider = ({ children }) => {
  const { isLoaded: isUserLoaded, user } = useUser();
  const { isLoaded: isAuthLoaded, isSignedIn } = useAuth();
  const dispatch = useDispatch();
  const [createUser] = api.useCreateUserMutation();

  useEffect(() => {
    const syncUserWithDatabase = async () => {
      if (!isUserLoaded || !isAuthLoaded) return;

      if (isSignedIn && user) {
        // If user doesn't have a role yet, set it to 'user'
        if (!user.publicMetadata.role) {
          try {
            await user.update({
              publicMetadata: { 
                ...user.publicMetadata,
                role: 'user'
              }
            });
          } catch (error) {
            console.error('Error setting user role:', error);
          }
        }

        const userData = {
          name: `${user.firstName} ${user.lastName}`,
          email: user.primaryEmailAddress?.emailAddress,
          password: user.id, // Using Clerk's user ID as password since auth is handled by Clerk
          role: user.publicMetadata.role || 'user',
          occupation: user.publicMetadata.occupation || 'Not specified',
          city: user.publicMetadata.city || '',
          state: user.publicMetadata.state || '',
          country: user.publicMetadata.country || '',
          phoneNumber: user.publicMetadata.phoneNumber || ''
        };

        try {
          // Create user in MongoDB
          const result = await createUser(userData).unwrap();
          
          // Update Redux state with MongoDB user data
          dispatch(setUser({
            ...result,
            id: user.id,
            imageUrl: user.imageUrl,
            role: user.publicMetadata.role || 'user',
            isEmailVerified: user.emailAddresses?.[0]?.verification?.status === 'verified'
          }));
        } catch (error) {
          // If user already exists, just update Redux state
          if (error.status === 409) {
            dispatch(setUser({
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              name: `${user.firstName} ${user.lastName}`,
              imageUrl: user.imageUrl,
              role: user.publicMetadata.role || 'user',
              isEmailVerified: user.emailAddresses?.[0]?.verification?.status === 'verified'
            }));
          } else {
            console.error('Error syncing user with database:', error);
            dispatch(setError('Failed to sync user data'));
          }
        }
      } else if (isSignedIn === false) {
        dispatch(clearUser());
      }
    };

    syncUserWithDatabase();
  }, [isUserLoaded, isAuthLoaded, isSignedIn, user, dispatch, createUser]);

  // Don't show loading state here, let the PrivateRoute handle it
  return children;
};

export default ClerkAuthProvider;
