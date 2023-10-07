import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { toggleTheme } from "../../features/theme/themeSlice";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeSwitchButton = () => {
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(
    (state: RootState) => state.theme.isDarkMode
  );

  const handleTooggleTheme = () => {
    dispatch(toggleTheme());
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };
  return (
    <div className="absolute right-10 top-5" onClick={handleTooggleTheme}>
      {!isDarkMode ? <CiLight size={25} /> : <CiDark size={25} color="white" />}
    </div>
  );
};

export default ThemeSwitchButton;
