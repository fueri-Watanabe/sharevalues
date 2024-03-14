import { ModeToggle } from "@/components/tools/modeToggle";
import PostModal from "../parts/modal/postModal";
import UserModal from "../parts/modal/userModal";
import ResetLocalStorageButton from "../tools/resetLocalStorage";

const Header = () => {
  return (
    <header className="container flex justify-between sticky top-0 bg-background/90 backdrop-blur-sm z-50 items-center h-16 gap-2">
      <div>
        <p>sharevalues</p>
      </div>
      <div className="flex items-center gap-6">
        <UserModal />
        <PostModal />
        {/* <ResetLocalStorageButton /> */}
        <ModeToggle />
      </div>
    </header>
  );
};
export default Header;
