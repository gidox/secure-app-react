import { Auth0Error, Auth0UserProfile } from "auth0-js";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function Profile(): React.ReactElement | null {
  const [profile, setProfile] = useState<Auth0UserProfile | null>(null);
  const [error, setError] = useState<Auth0Error | null | undefined>(null);
  const auth = useAuth();

  useEffect(() => {
    const loadProfile = () => {
      auth.getProfile((profile, error) => {
        setProfile(profile);
        setError(error);
      })
    }
    loadProfile();
  }, [auth])
  if (!profile) {
    return null;
  }
  return (
    <>
      <h1>Profile  Screen</h1>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="profilepicture"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}
