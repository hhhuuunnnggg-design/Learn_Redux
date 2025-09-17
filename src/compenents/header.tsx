import { useAppSelector } from "../redux/hooks";

const Header = () => {
  const users = useAppSelector((state) => state.user.listUser);
  return (
    <header>
      <h1>User Management</h1>
      <p>Total users: {users.length}</p>
    </header>
  );
};

export default Header;
