import { SignIn } from "@clerk/clerk-react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Login = () => {
  const location = useLocation();
  const { isLoaded, isSignedIn } = useAuth();
  const from = location.state?.from || "/dashboard";

  // Show loading while Clerk loads
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect to dashboard if already signed in
  if (isSignedIn) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 mt-10">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          fallbackRedirectUrl="/dashboard" // Replaces the deprecated `redirectUrl`
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "rounded-xl shadow-lg bg-white p-6",
              formButtonPrimary:
                "bg-coral-red hover:bg-coral-red/90 font-montserrat text-white rounded-full w-full py-3 text-lg font-semibold",
              formFieldInput:
                "font-montserrat rounded-lg border-slate-200 focus:border-coral-red focus:ring-coral-red w-full py-3 text-base",
              footerActionLink:
                "text-coral-red hover:text-coral-red/90 font-montserrat",
              dividerLine: "bg-slate-200",
              dividerText: "text-slate-400 font-montserrat",
              formFieldLabel: "font-montserrat text-slate-600",
              socialButtonsBlockButton:
                "border-slate-200 hover:bg-slate-50 font-montserrat w-full",
              socialButtonsBlockButtonText: "font-montserrat text-slate-600",
              formFieldWarning: "font-montserrat text-red-500",
              formFieldError: "font-montserrat text-red-500",
              alert: "font-montserrat",
              headerTitle: "font-palanquin text-2xl font-bold",
              headerSubtitle: "font-montserrat text-slate-600",
              formButtonReset: "w-full py-3 rounded-full",
              otpCodeFieldInput: "!w-[45px] h-[45px]",
              logoBox: "hidden",
            },
            variables: {
              colorPrimary: "#FF6452",
              colorText: "#2C2C2C",
              colorTextSecondary: "#6D6D6D",
              colorBackground: "#FFFFFF",
              colorInputText: "#2C2C2C",
              colorInputBackground: "#FFFFFF",
              colorInputBorder: "#E5E5E5",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
