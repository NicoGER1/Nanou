import child1 from "../assets/images/child_5.png";
import child2 from "../assets/images/child_3.png";
import child3 from "../assets/images/child_2.png";
import child4 from "../assets/images/child_6.png";

function Avatar() {
  return (
    <section className="AvatarComponent">
      <div className="Avatar-Pic">
        <img src={child1} alt="avatar enfant 1" />
        <p className="avatarName">Mace</p>
      </div>
      <div className="Avatar-Pic">
        <img src={child2} alt="avatar enfant 2" />
        <p className="avatarName">Padme</p>
      </div>
      <div className="Avatar-Pic">
        <img src={child3} alt="avatar enfant 3" />
        <p className="avatarName">Luke</p>
      </div>
      <div className="Avatar-Pic">
        <img src={child4} alt="avatar enfant 4" />
        <p className="avatarName">Leia</p>
      </div>
    </section>
  );
}

export default Avatar;
