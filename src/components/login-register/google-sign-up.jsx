import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// internal
import google_icon from "@assets/img/icon/login/google.svg";
import { useFirebaseAuth } from "@/firebase/useFirebaseAuth";
import { notifyError, notifySuccess } from "@/utils/toast";

const GoogleSignUp = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { loginWithGoogle } = useFirebaseAuth();

  // handleGoogleSignIn
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      notifySuccess("Login successful!");
      router.push(redirect || "/");
    } catch (error) {
      notifyError(error.message);
    }
  };

  return (
    <button 
      type="button"
      onClick={handleGoogleSignIn}
      className="tp-login-google-btn w-100"
    >
      <Image src={google_icon} alt="google" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignUp;
        <a
          className="cursor-pointer"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <Image src={google_icon} alt="google_icon" />
          Sign in with google
        </a>
      )}
      onSuccess={handleGoogleSignIn}
      onFailure={(err) =>
        notifyError(err?.message || "Something wrong on your auth setup!")
      }
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleSignUp;
