import github from "../assets/images/github.png";

function Footer() {
  return (
    <section className="footerComponent">
      <p>Copyright © - 2024 - Nicolas Gerin</p>
      <a
        href="https://github.com/NicoGER1"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <img src={github} alt="GitHub Logo" className="github-logo" />
      </a>
    </section>
  );
}

export default Footer;
