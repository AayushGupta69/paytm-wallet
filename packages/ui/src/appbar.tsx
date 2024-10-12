import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: Fix the types here!
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="ui-flex ui-justify-between ui-border-b ui-px-4 ui-border-slate-300">
      <div className="ui-text-lg ui-flex ui-flex-col ui-justify-center">
        PayTM
      </div>
      <div className="ui-flex ui-flex-col ui-justify-center ui-pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
