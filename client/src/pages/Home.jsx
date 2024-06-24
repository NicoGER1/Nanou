import Avatar from "../components/Avatar";
import Calendar from "../components/Calendar";

function home() {
  return (
    <section className="homeComponent">
      <Calendar />
      <Avatar />
    </section>
  );
}

export default home;
